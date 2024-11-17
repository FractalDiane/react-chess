import { MouseEventHandler, useState } from "react";
import NotationLog from "./Notation"
import { PieceType, PieceColor, Piece, Vector2, ChessMove, STARTING_BOARD, PIECE_LETTERS, makeChessMove } from "./chess-types";

const BOARD_HEIGHT = 8;
const BOARD_WIDTH = 8;

function isOnBoard(coords: Vector2): boolean {
	return coords.x >= 0 && coords.x < BOARD_WIDTH && coords.y >= 0 && coords.y < BOARD_HEIGHT;
}

enum SpaceBlockedResult {
	Unoccupied,
	BlockedByOtherTeam,
	BlockedByOwnTeam,
}

function isSpaceBlocked(coords: Vector2, attacker: Piece, board: Piece[][]): SpaceBlockedResult {
	const targetPiece = board[coords.x][coords.y];
	if (targetPiece.type === PieceType.None) {
		return SpaceBlockedResult.Unoccupied;
	}

	return targetPiece.color === attacker.color ? SpaceBlockedResult.BlockedByOwnTeam : SpaceBlockedResult.BlockedByOtherTeam;
}

function getValidMoves(piece: Piece, coords: Vector2, board: Piece[][]): Array<Vector2> {
	const result = new Array<Vector2>();
	switch (piece.type) {
		case PieceType.Pawn: {
			const forwardYDir = piece.color === PieceColor.White ? -1 : 1;
			const forwardSpace = {x: coords.x, y: coords.y + forwardYDir};
			if (!isOnBoard(forwardSpace)) {
				break;
			}

			if (isSpaceBlocked(forwardSpace, piece, board) === SpaceBlockedResult.Unoccupied) {
				result.push(forwardSpace);

				if (coords.y === (piece.color === PieceColor.White ? 6 : 1)) {
					const forwardSpace2: Vector2 = {...forwardSpace};
					if (isSpaceBlocked(forwardSpace2, piece, board) === SpaceBlockedResult.Unoccupied) {
						forwardSpace2.y += forwardYDir;
						result.push(forwardSpace2);
					}
				}
			}

			const forwardDiagonals = [
				{x: coords.x - 1, y: coords.y + forwardYDir},
				{x: coords.x + 1, y: coords.y + forwardYDir},
			];

			for (const attackSpace of forwardDiagonals) {
				if (isOnBoard(attackSpace) && isSpaceBlocked(attackSpace, piece, board) === SpaceBlockedResult.BlockedByOtherTeam) {
					result.push(attackSpace);
				}
			}
		} break;

		case PieceType.Knight: {
			const spaceOffsets: Vector2[] = [
				{x: -1, y: -2},
				{x: 1, y: -2},
				{x: 2, y: -1},
				{x: 2, y: 1},
				{x: 1, y: 2},
				{x: -1, y: 2},
				{x: -2, y: 1},
				{x: -2, y: -1},
			];

			for (const offset of spaceOffsets) {
				const sum: Vector2 = {x: coords.x + offset.x, y: coords.y + offset.y};
				if (isOnBoard(sum) && isSpaceBlocked(sum, piece, board) != SpaceBlockedResult.BlockedByOwnTeam) {
					result.push(sum);
				}
			}
		} break;

		case PieceType.Bishop: {
			const directions: Vector2[] = [
				{x: -1, y: 1},
				{x: 1, y: -1},
				{x: 1, y: 1},
				{x: -1, y: -1},
			];

			for (const dir of directions) {
				const currentSpace: Vector2 = {...coords};
				currentSpace.x += dir.x;
				currentSpace.y += dir.y;
				while (isOnBoard(currentSpace)) {
					const spaceBlocked = isSpaceBlocked(currentSpace, piece, board);
					if (spaceBlocked === SpaceBlockedResult.BlockedByOwnTeam) {
						break;
					}

					result.push({...currentSpace});
					if (spaceBlocked === SpaceBlockedResult.BlockedByOtherTeam) {
						break;
					}

					currentSpace.x += dir.x;
					currentSpace.y += dir.y;
				}
			}
		} break;

		case PieceType.Rook: {
			const directions: Vector2[] = [
				{x: -1, y: 0},
				{x: 1, y: 0},
				{x: 0, y: 1},
				{x: 0, y: -1},
			];

			for (const dir of directions) {
				const currentSpace: Vector2 = {...coords};
				currentSpace.x += dir.x;
				currentSpace.y += dir.y;
				while (isOnBoard(currentSpace)) {
					const spaceBlocked = isSpaceBlocked(currentSpace, piece, board);
					if (spaceBlocked === SpaceBlockedResult.BlockedByOwnTeam) {
						break;
					}

					result.push({...currentSpace});
					if (spaceBlocked === SpaceBlockedResult.BlockedByOtherTeam) {
						break;
					}

					currentSpace.x += dir.x;
					currentSpace.y += dir.y;
				}
			}
		} break;

		case PieceType.Queen: {
			const directions = [
				{x: -1, y: 1},
				{x: 1, y: -1},
				{x: 1, y: 1},
				{x: -1, y: -1},
				{x: -1, y: 0},
				{x: 1, y: 0},
				{x: 0, y: 1},
				{x: 0, y: -1},
			];

			for (const dir of directions) {
				const currentSpace: Vector2 = {...coords};
				currentSpace.x += dir.x;
				currentSpace.y += dir.y;
				while (isOnBoard(currentSpace)) {
					const spaceBlocked = isSpaceBlocked(currentSpace, piece, board);
					if (spaceBlocked === SpaceBlockedResult.BlockedByOwnTeam) {
						break;
					}

					result.push({...currentSpace});
					if (spaceBlocked === SpaceBlockedResult.BlockedByOtherTeam) {
						break;
					}

					currentSpace.x += dir.x;
					currentSpace.y += dir.y;
				}
			}
		} break;

		case PieceType.King: {
			const spaceOffsets = [
				{x: -1, y: 1},
				{x: 1, y: -1},
				{x: 1, y: 1},
				{x: -1, y: -1},
				{x: -1, y: 0},
				{x: 1, y: 0},
				{x: 0, y: 1},
				{x: 0, y: -1},
			];

			for (const offset of spaceOffsets) {
				const sum: Vector2 = {x: coords.x + offset.x, y: coords.y + offset.y};
				if (isOnBoard(sum) && isSpaceBlocked(sum, piece, board) != SpaceBlockedResult.BlockedByOwnTeam) {
					result.push(sum);
				}
			}
		} break;
		
		default: break;
	}

	return result;
}

///////////////////////////////////////////////////////////////////////////////////////////////////

interface TileProps {
	piece: Piece;
	onClickCallback: MouseEventHandler,
}

function Tile(props: TileProps) {
	return <button className="tile" onClick={props.onClickCallback} style={{backgroundColor: props.piece.tileHighlighted ? "pink" : "grey", color: props.piece.color === PieceColor.White ? "white" : "black"}}><b>{PIECE_LETTERS[props.piece.type]}</b></button>
}

interface GameBoardProps {
	board: Piece[][],
	onClickCallback: (tile: Vector2) => void,
}

function GameBoard(props: GameBoardProps) {
	const rows = [];
	for (let y = 0; y < BOARD_HEIGHT; ++y) {
		const cols = [];
		for (let x = 0; x < BOARD_WIDTH; ++x) {
			cols.push(<Tile piece={props.board[x][y]} onClickCallback={() => props.onClickCallback({x: x, y: y})} />);
		}

		rows.push(<div>{cols}</div>);
	}

	return <>{rows}</>
}

export default function Chess() {
	const [board, setBoard] = useState<Piece[][]>(STARTING_BOARD);

	const [currentTurn, setCurrentTurn] = useState(PieceColor.White);
	const [selectingMove, setSelectingMove] = useState(false);
	const [selectedPieceTile, setSelectedPieceTile] = useState<Vector2>({x: 0, y: 0});
	const [movesLog, setMovesLog] = useState<ChessMove[]>([]);

	function selectPiece(tile: Vector2, piece: Piece) {
		const newBoard = [...board];
		const validMoves = getValidMoves(piece, tile, board);
		if (validMoves.length > 0) {
			for (const move of validMoves) {
				newBoard[move.x][move.y].tileHighlighted = true;
			}

			setBoard(newBoard);
			setSelectingMove(true);
			setSelectedPieceTile(tile);
		}
	}

	function clearBoardHighlights(board: Piece[][]) {
		for (const row of board) {
			for (const tile of row) {
				tile.tileHighlighted = false;
			}
		}
	}

	function changeTurn() {
		setCurrentTurn((currentTurn + 1) % 2);
	}

	function onClickTile(tile: Vector2) {
		const tilePiece = board[tile.x][tile.y];

		if (!selectingMove) {
			if (tilePiece.type !== PieceType.None && tilePiece.color === currentTurn) {
				selectPiece(tile, tilePiece);
			}
		} else {
			if (tilePiece.tileHighlighted) {
				const newBoard = [...board];
				clearBoardHighlights(newBoard);

				const movedPiece = {...newBoard[selectedPieceTile.x][selectedPieceTile.y]};
				const move = makeChessMove(selectedPieceTile, tile, movedPiece);
				console.log(move);

				const capturedPiece = {...newBoard[tile.x][tile.y]};
				newBoard[tile.x][tile.y] = {type: movedPiece.type, color: movedPiece.color, tileHighlighted: false};

				if (capturedPiece.type !== PieceType.None) {
					move.capturedPiece = {...capturedPiece};
				}

				newBoard[selectedPieceTile.x][selectedPieceTile.y].type = PieceType.None;

				const newMovesLog = [...movesLog];
				newMovesLog.push(move);
				setMovesLog(newMovesLog);

				changeTurn();
				setBoard(newBoard);
				setSelectingMove(false);
			} else if (tilePiece.color === board[selectedPieceTile.x][selectedPieceTile.y].color) {
				const newBoard = [...board];
				clearBoardHighlights(newBoard);
				setBoard(newBoard);
				selectPiece(tile, board[tile.x][tile.y]);
			} else {
				const newBoard = [...board];
				clearBoardHighlights(newBoard);
				setBoard(newBoard);
			}
		}
	}

	return <div className="mainContainer">
		<div><NotationLog allMoves={movesLog}/></div>
		<div><GameBoard board={board} onClickCallback={onClickTile} /></div>
	</div>
}
