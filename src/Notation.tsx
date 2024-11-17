//import { useState } from "react";
import { PIECE_LETTERS, RANK_LETTERS, CastleType, CheckType, ChessMove, PieceType } from "./chess-types";

interface NotationEntryProps {
	text: string;
}

function NotationEntry(props: NotationEntryProps) {
	return <div className="notationEntry">{props.text}</div>
}

function getMoveNotation(move: ChessMove): string {
	if (move.castleType === CastleType.KingSide) {
		return "0-0";
	} else if (move.castleType === CastleType.QueenSide) {
		return "0-0-0";
	}

	const lhs = `${PIECE_LETTERS[move.piece.type]}${RANK_LETTERS[move.originSpace.x]}${move.originSpace.y + 1}`;
	const rhs = `${RANK_LETTERS[move.targetSpace.x]}${move.targetSpace.y + 1}`;
	const suffix = `${move.isEnPassant ? "e.p." : ""} ${move.checkType === CheckType.Checkmate ? "#" : move.checkType === CheckType.Check ? "+" : ""}`;
	return `${lhs}${move.capturedPiece.type !== PieceType.None ? "x" : "-"}${rhs} ${suffix}`;
}

interface NotationLogProps {
	allMoves: ChessMove[];
}

export default function NotationLog(props: NotationLogProps) {
	//const [entries, setEntries] = useState<string[]>();
	const entries = [];
	for (const entry of props.allMoves) {
		entries.push(<NotationEntry text={getMoveNotation(entry)} />);
	}

	return <div className="notationLog">
		{entries}
	</div>;
}
