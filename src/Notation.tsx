//import { useState } from "react";
import { PIECE_LETTERS, RANK_LETTERS, CastleType, CheckType, ChessMove, PieceType } from "./chess-types";

interface NotationEntryProps {
	text: string;
}

function NotationEntry(props: NotationEntryProps) {
	return <div className="notationEntry">{props.text}</div>
}

function getMoveNotation(move: ChessMove, index: number): string {
	if (move.castleType === CastleType.KingSide) {
		return "0-0";
	} else if (move.castleType === CastleType.QueenSide) {
		return "0-0-0";
	}

	const lhs = `${PIECE_LETTERS[move.piece.type]}${RANK_LETTERS[move.originSpace.x]}${8 - move.originSpace.y}`;
	const rhs = `${RANK_LETTERS[move.targetSpace.x]}${8 - move.targetSpace.y}`;
	const suffix = `${move.isEnPassant ? " e.p." : ""}${move.checkType === CheckType.Checkmate ? "#" : move.checkType === CheckType.Check ? "+" : ""}`;
	return `${index + 1}. ${lhs}${move.capturedPiece.type !== PieceType.None ? "x" : "-"}${rhs}${suffix}`;
}

interface NotationLogProps {
	allMoves: ChessMove[];
}

export default function NotationLog(props: NotationLogProps) {
	const entries = [];
	for (let i = 0; i < props.allMoves.length; ++i) {
		entries.push(<NotationEntry key={i} text={getMoveNotation(props.allMoves[i], i)} />);
	}

	return <div className="notationLog">
		{entries}
	</div>;
}
