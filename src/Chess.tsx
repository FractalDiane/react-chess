import { MouseEventHandler, useState } from "react";
import { PieceType, PieceColor, Piece, Vector2, STARTING_BOARD } from "./chess-types";

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

/*function getMovesForDirections(coords: Vector2, attacker: Piece, board: Piece[][], directions: Vector2[]): Array<Vector2> {
	const result = new Array<Vector2>();
	
}*/

function getValidMoves(piece: Piece, coords: Vector2, board: Piece[][]): Array<Vector2> {
	const result = new Array<Vector2>();
	switch (piece.type) {
		case PieceType.Pawn: {
			const forwardSpace = new Vector2(coords.x, piece.color === PieceColor.White ? coords.y - 1 : coords.y + 1);
			if (!isOnBoard(forwardSpace)) {
				break;
			}

			if (isSpaceBlocked(forwardSpace, piece, board) === SpaceBlockedResult.BlockedByOwnTeam) {
				break;
			}

			result.push(forwardSpace);
			if (coords.y === (piece.color === PieceColor.White ? 6 : 1)) {
				const forwardSpace2 = new Vector2(forwardSpace.x, forwardSpace.y);
				forwardSpace2.y += piece.color === PieceColor.White ? -1 : 1;
				result.push(forwardSpace2);
			}
		} break;

		case PieceType.Knight: {
			const spaceOffsets = [
				new Vector2(-1, -2),
				new Vector2(1, -2),
				new Vector2(2, -1),
				new Vector2(2, 1),
				new Vector2(1, 2),
				new Vector2(-1, 2),
				new Vector2(-2, 1),
				new Vector2(-2, -1),
			];

			for (const offset of spaceOffsets) {
				const sum = new Vector2(coords.x + offset.x, coords.y + offset.y);
				if (isOnBoard(sum) && isSpaceBlocked(sum, piece, board) != SpaceBlockedResult.BlockedByOwnTeam) {
					result.push(sum);
				}
			}
		} break;

		case PieceType.Bishop: {
			const directions = [
				new Vector2(-1, 1),
				new Vector2(1, -1),
				new Vector2(1, 1),
				new Vector2(-1, -1),
			];

			for (const dir of directions) {
				const currentSpace = coords;
				currentSpace.x += dir.x;
				currentSpace.y += dir.y;
				while (isOnBoard(currentSpace)) {
					const spaceBlocked = isSpaceBlocked(currentSpace, piece, board);
					if (spaceBlocked === SpaceBlockedResult.BlockedByOwnTeam) {
						break;
					}

					result.push(currentSpace);
					if (spaceBlocked === SpaceBlockedResult.BlockedByOtherTeam) {
						break;
					}

					currentSpace.x += dir.x;
					currentSpace.y += dir.y;
				}
			}
		} break;

		case PieceType.Rook: {
			const directions = [
				new Vector2(-1, 0),
				new Vector2(1, 0),
				new Vector2(0, 1),
				new Vector2(0, -1),
			];

			for (const dir of directions) {
				const currentSpace = coords;
				currentSpace.x += dir.x;
				currentSpace.y += dir.y;
				while (isOnBoard(currentSpace)) {
					const spaceBlocked = isSpaceBlocked(currentSpace, piece, board);
					if (spaceBlocked === SpaceBlockedResult.BlockedByOwnTeam) {
						break;
					}

					result.push(currentSpace);
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
				new Vector2(-1, 1),
				new Vector2(1, -1),
				new Vector2(1, 1),
				new Vector2(-1, -1),
				new Vector2(-1, 0),
				new Vector2(1, 0),
				new Vector2(0, 1),
				new Vector2(0, -1),
			];

			for (const dir of directions) {
				const currentSpace = coords;
				currentSpace.x += dir.x;
				currentSpace.y += dir.y;
				while (isOnBoard(currentSpace)) {
					const spaceBlocked = isSpaceBlocked(currentSpace, piece, board);
					if (spaceBlocked === SpaceBlockedResult.BlockedByOwnTeam) {
						break;
					}

					result.push(currentSpace);
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
				new Vector2(-1, 1),
				new Vector2(1, -1),
				new Vector2(1, 1),
				new Vector2(-1, -1),
				new Vector2(-1, 0),
				new Vector2(1, 0),
				new Vector2(0, 1),
				new Vector2(0, -1),
			];

			for (const offset of spaceOffsets) {
				const sum = new Vector2(coords.x + offset.x, coords.y + offset.y);
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
	const PIECE_TEXT = [
		"-", "P", "N", "B", "R", "Q", "K"
	];

	return <button className="tile" onClick={props.onClickCallback} style={{backgroundColor: props.piece.tileHighlighted ? "pink" : "grey", color: props.piece.color === PieceColor.White ? "white" : "black"}}><b>{PIECE_TEXT[props.piece.type]}</b></button>
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
			cols.push(<Tile piece={props.board[x][y]} onClickCallback={() => props.onClickCallback(new Vector2(x, y))} />);
		}

		rows.push(<div>{cols}</div>);
	}

	return <>{rows}</>
}

export default function Chess() {
	const [board, setBoard] = useState<Piece[][]>(STARTING_BOARD);

	const [selectingMove, setSelectingMove] = useState(false);
	const [selectedPieceTile, setSelectedPieceTile] = useState(new Vector2(0, 0));

	function onClickTile(tile: Vector2) {
		const tilePiece = board[tile.x][tile.y];
		if (!selectingMove) {
			if (tilePiece.type !== PieceType.None) {
				const newBoard = [...board];
				const validMoves = getValidMoves(tilePiece, tile, board);
				if (validMoves.length > 0) {
					for (const move of validMoves) {
						newBoard[move.x][move.y].tileHighlighted = true;
					}
	
					setBoard(newBoard);
					setSelectingMove(true);
					setSelectedPieceTile(tile);
				}
			}
		} else {
			if (tilePiece.tileHighlighted) {
				const newBoard = [...board];
				for (const row of newBoard) {
					for (const tile of row) {
						tile.tileHighlighted = false;
					}
				}

				const movedPiece = newBoard[selectedPieceTile.x][selectedPieceTile.y];
				console.log(movedPiece);
				newBoard[tile.x][tile.y] = new Piece(movedPiece.type, movedPiece.color, false);
				newBoard[selectedPieceTile.x][selectedPieceTile.y].type = PieceType.None;

				setBoard(newBoard);
				setSelectingMove(false);
			}
		}
	}

	return <div><GameBoard board={board} onClickCallback={onClickTile} /></div>
}
