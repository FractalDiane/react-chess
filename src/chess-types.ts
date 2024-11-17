export enum PieceType {
	None,
	Pawn,
	Knight,
	Bishop,
	Rook,
	Queen,
	King,
}

export enum PieceColor {
	White,
	Black,
}

export const PIECE_LETTERS = [
	"-", "P", "N", "B", "R", "Q", "K"
];

export const RANK_LETTERS = [
	"a", "b", "c", "d", "e", "f", "g", "h"
];

export interface Piece {
	type: PieceType;
	color: PieceColor;
	tileHighlighted: boolean;
}

export interface Vector2 {
	x: number;
	y: number;
}

export enum CastleType {
	None,
	KingSide,
	QueenSide,
}

export enum CheckType {
	None,
	Check,
	Checkmate,
}

export interface ChessMove {
	originSpace: Vector2;
	targetSpace: Vector2;
	piece: Piece;

	capturedPiece: Piece;
	isEnPassant: boolean;

	castleType: CastleType;
	checkType: CheckType;
}

export function makeChessMove(originSpace: Vector2, targetSpace: Vector2, piece: Piece): ChessMove {
	return {
		originSpace: {...originSpace},
		targetSpace: {...targetSpace},
		piece: {...piece},

		capturedPiece: {type: PieceType.None, color: PieceColor.White, tileHighlighted: false},
		isEnPassant: false,

		castleType: CastleType.None,
		checkType: CheckType.None,
	};
}

export const STARTING_BOARD: Piece[][] = [
	[
		{type: PieceType.Rook, color: PieceColor.Black, tileHighlighted: false},
		{type: PieceType.Pawn, color: PieceColor.Black, tileHighlighted: false},
		{type: PieceType.None, color: PieceColor.Black, tileHighlighted: false},
		{type: PieceType.None, color: PieceColor.Black, tileHighlighted: false},
		{type: PieceType.None, color: PieceColor.Black, tileHighlighted: false},
		{type: PieceType.None, color: PieceColor.Black, tileHighlighted: false},
		{type: PieceType.Pawn, color: PieceColor.White, tileHighlighted: false},
		{type: PieceType.Rook, color: PieceColor.White, tileHighlighted: false},
	],
	[
		{type: PieceType.Knight, color: PieceColor.Black, tileHighlighted: false},
		{type: PieceType.Pawn, color: PieceColor.Black, tileHighlighted: false},
		{type: PieceType.None, color: PieceColor.Black, tileHighlighted: false},
		{type: PieceType.None, color: PieceColor.Black, tileHighlighted: false},
		{type: PieceType.None, color: PieceColor.Black, tileHighlighted: false},
		{type: PieceType.None, color: PieceColor.Black, tileHighlighted: false},
		{type: PieceType.Pawn, color: PieceColor.White, tileHighlighted: false},
		{type: PieceType.Knight, color: PieceColor.White, tileHighlighted: false},
	],
	[
		{type: PieceType.Bishop, color: PieceColor.Black, tileHighlighted: false},
		{type: PieceType.Pawn, color: PieceColor.Black, tileHighlighted: false},
		{type: PieceType.None, color: PieceColor.Black, tileHighlighted: false},
		{type: PieceType.None, color: PieceColor.Black, tileHighlighted: false},
		{type: PieceType.None, color: PieceColor.Black, tileHighlighted: false},
		{type: PieceType.None, color: PieceColor.Black, tileHighlighted: false},
		{type: PieceType.Pawn, color: PieceColor.White, tileHighlighted: false},
		{type: PieceType.Bishop, color: PieceColor.White, tileHighlighted: false},
	],
	[
		{type: PieceType.Queen, color: PieceColor.Black, tileHighlighted: false},
		{type: PieceType.Pawn, color: PieceColor.Black, tileHighlighted: false},
		{type: PieceType.None, color: PieceColor.Black, tileHighlighted: false},
		{type: PieceType.None, color: PieceColor.Black, tileHighlighted: false},
		{type: PieceType.None, color: PieceColor.Black, tileHighlighted: false},
		{type: PieceType.None, color: PieceColor.Black, tileHighlighted: false},
		{type: PieceType.Pawn, color: PieceColor.White, tileHighlighted: false},
		{type: PieceType.Queen, color: PieceColor.White, tileHighlighted: false},
	],
	[
		{type: PieceType.King, color: PieceColor.Black, tileHighlighted: false},
		{type: PieceType.Pawn, color: PieceColor.Black, tileHighlighted: false},
		{type: PieceType.None, color: PieceColor.Black, tileHighlighted: false},
		{type: PieceType.None, color: PieceColor.Black, tileHighlighted: false},
		{type: PieceType.None, color: PieceColor.Black, tileHighlighted: false},
		{type: PieceType.None, color: PieceColor.Black, tileHighlighted: false},
		{type: PieceType.Pawn, color: PieceColor.White, tileHighlighted: false},
		{type: PieceType.King, color: PieceColor.White, tileHighlighted: false},
	],
	[
		{type: PieceType.Bishop, color: PieceColor.Black, tileHighlighted: false},
		{type: PieceType.Pawn, color: PieceColor.Black, tileHighlighted: false},
		{type: PieceType.None, color: PieceColor.Black, tileHighlighted: false},
		{type: PieceType.None, color: PieceColor.Black, tileHighlighted: false},
		{type: PieceType.None, color: PieceColor.Black, tileHighlighted: false},
		{type: PieceType.None, color: PieceColor.Black, tileHighlighted: false},
		{type: PieceType.Pawn, color: PieceColor.White, tileHighlighted: false},
		{type: PieceType.Bishop, color: PieceColor.White, tileHighlighted: false},
	],
	[
		{type: PieceType.Knight, color: PieceColor.Black, tileHighlighted: false},
		{type: PieceType.Pawn, color: PieceColor.Black, tileHighlighted: false},
		{type: PieceType.None, color: PieceColor.Black, tileHighlighted: false},
		{type: PieceType.None, color: PieceColor.Black, tileHighlighted: false},
		{type: PieceType.None, color: PieceColor.Black, tileHighlighted: false},
		{type: PieceType.None, color: PieceColor.Black, tileHighlighted: false},
		{type: PieceType.Pawn, color: PieceColor.White, tileHighlighted: false},
		{type: PieceType.Knight, color: PieceColor.White, tileHighlighted: false},
	],
	[
		{type: PieceType.Rook, color: PieceColor.Black, tileHighlighted: false},
		{type: PieceType.Pawn, color: PieceColor.Black, tileHighlighted: false},
		{type: PieceType.None, color: PieceColor.Black, tileHighlighted: false},
		{type: PieceType.None, color: PieceColor.Black, tileHighlighted: false},
		{type: PieceType.None, color: PieceColor.Black, tileHighlighted: false},
		{type: PieceType.None, color: PieceColor.Black, tileHighlighted: false},
		{type: PieceType.Pawn, color: PieceColor.White, tileHighlighted: false},
		{type: PieceType.Rook, color: PieceColor.White, tileHighlighted: false},
	],
];
