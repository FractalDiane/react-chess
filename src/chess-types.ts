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

export type Piece = [PieceType, PieceColor, boolean];
export const TYPE = 0;
export const COLOR = 1;
export const HIGHTLIGHTED = 2;

export class Vector2 {
	x: number;
	y: number;

	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}
}

export const STARTING_BOARD: Piece[][] = [
	[
		[PieceType.Rook, PieceColor.Black, false],
		[PieceType.Pawn, PieceColor.Black, false],
		[PieceType.None, PieceColor.White, false],
		[PieceType.None, PieceColor.White, false],
		[PieceType.None, PieceColor.White, false],
		[PieceType.None, PieceColor.White, false],
		[PieceType.Pawn, PieceColor.White, false],
		[PieceType.Rook, PieceColor.White, false],
	],
	[
		[PieceType.Knight, PieceColor.Black, false],
		[PieceType.Pawn, PieceColor.Black, false],
		[PieceType.None, PieceColor.White, false],
		[PieceType.None, PieceColor.White, false],
		[PieceType.None, PieceColor.White, false],
		[PieceType.None, PieceColor.White, false],
		[PieceType.Pawn, PieceColor.White, false],
		[PieceType.Knight, PieceColor.White, false],
	],
	[
		[PieceType.Bishop, PieceColor.Black, false],
		[PieceType.Pawn, PieceColor.Black, false],
		[PieceType.None, PieceColor.White, false],
		[PieceType.None, PieceColor.White, false],
		[PieceType.None, PieceColor.White, false],
		[PieceType.None, PieceColor.White, false],
		[PieceType.Pawn, PieceColor.White, false],
		[PieceType.Bishop, PieceColor.White, false],
	],
	[
		[PieceType.Queen, PieceColor.Black, false],
		[PieceType.Pawn, PieceColor.Black, false],
		[PieceType.None, PieceColor.White, false],
		[PieceType.None, PieceColor.White, false],
		[PieceType.None, PieceColor.White, false],
		[PieceType.None, PieceColor.White, false],
		[PieceType.Pawn, PieceColor.White, false],
		[PieceType.Queen, PieceColor.White, false],
	],
	[
		[PieceType.King, PieceColor.Black, false],
		[PieceType.Pawn, PieceColor.Black, false],
		[PieceType.None, PieceColor.White, false],
		[PieceType.None, PieceColor.White, false],
		[PieceType.None, PieceColor.White, false],
		[PieceType.None, PieceColor.White, false],
		[PieceType.Pawn, PieceColor.White, false],
		[PieceType.King, PieceColor.White, false],
	],
	[
		[PieceType.Bishop, PieceColor.Black, false],
		[PieceType.Pawn, PieceColor.Black, false],
		[PieceType.None, PieceColor.White, false],
		[PieceType.None, PieceColor.White, false],
		[PieceType.None, PieceColor.White, false],
		[PieceType.None, PieceColor.White, false],
		[PieceType.Pawn, PieceColor.White, false],
		[PieceType.Bishop, PieceColor.White, false],
	],
	[
		[PieceType.Knight, PieceColor.Black, false],
		[PieceType.Pawn, PieceColor.Black, false],
		[PieceType.None, PieceColor.White, false],
		[PieceType.None, PieceColor.White, false],
		[PieceType.None, PieceColor.White, false],
		[PieceType.None, PieceColor.White, false],
		[PieceType.Pawn, PieceColor.White, false],
		[PieceType.Knight, PieceColor.White, false],
	],
	[
		[PieceType.Rook, PieceColor.Black, false],
		[PieceType.Pawn, PieceColor.Black, false],
		[PieceType.None, PieceColor.White, false],
		[PieceType.None, PieceColor.White, false],
		[PieceType.None, PieceColor.White, false],
		[PieceType.None, PieceColor.White, false],
		[PieceType.Pawn, PieceColor.White, false],
		[PieceType.Rook, PieceColor.White, false],
	],
];
