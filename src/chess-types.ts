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

export class Piece {
	public type: PieceType;
	public color: PieceColor;
	public tileHighlighted: boolean;

	constructor(type: PieceType, color: PieceColor, highlighted: boolean) {
		this.type = type;
		this.color = color;
		this.tileHighlighted = highlighted;
	}
}

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
		new Piece(PieceType.Rook, PieceColor.Black, false),
		new Piece(PieceType.Pawn, PieceColor.Black, false),
		new Piece(PieceType.None, PieceColor.White, false),
		new Piece(PieceType.None, PieceColor.White, false),
		new Piece(PieceType.None, PieceColor.White, false),
		new Piece(PieceType.None, PieceColor.White, false),
		new Piece(PieceType.Pawn, PieceColor.White, false),
		new Piece(PieceType.Rook, PieceColor.White, false),
	],
	[
		new Piece(PieceType.Knight, PieceColor.Black, false),
		new Piece(PieceType.Pawn, PieceColor.Black, false),
		new Piece(PieceType.None, PieceColor.White, false),
		new Piece(PieceType.None, PieceColor.White, false),
		new Piece(PieceType.None, PieceColor.White, false),
		new Piece(PieceType.None, PieceColor.White, false),
		new Piece(PieceType.Pawn, PieceColor.White, false),
		new Piece(PieceType.Knight, PieceColor.White, false),
	],
	[
		new Piece(PieceType.Bishop, PieceColor.Black, false),
		new Piece(PieceType.Pawn, PieceColor.Black, false),
		new Piece(PieceType.None, PieceColor.White, false),
		new Piece(PieceType.None, PieceColor.White, false),
		new Piece(PieceType.None, PieceColor.White, false),
		new Piece(PieceType.None, PieceColor.White, false),
		new Piece(PieceType.Pawn, PieceColor.White, false),
		new Piece(PieceType.Bishop, PieceColor.White, false),
	],
	[
		new Piece(PieceType.Queen, PieceColor.Black, false),
		new Piece(PieceType.Pawn, PieceColor.Black, false),
		new Piece(PieceType.None, PieceColor.White, false),
		new Piece(PieceType.None, PieceColor.White, false),
		new Piece(PieceType.None, PieceColor.White, false),
		new Piece(PieceType.None, PieceColor.White, false),
		new Piece(PieceType.Pawn, PieceColor.White, false),
		new Piece(PieceType.Queen, PieceColor.White, false),
	],
	[
		new Piece(PieceType.King, PieceColor.Black, false),
		new Piece(PieceType.Pawn, PieceColor.Black, false),
		new Piece(PieceType.None, PieceColor.White, false),
		new Piece(PieceType.None, PieceColor.White, false),
		new Piece(PieceType.None, PieceColor.White, false),
		new Piece(PieceType.None, PieceColor.White, false),
		new Piece(PieceType.Pawn, PieceColor.White, false),
		new Piece(PieceType.King, PieceColor.White, false),
	],
	[
		new Piece(PieceType.Bishop, PieceColor.Black, false),
		new Piece(PieceType.Pawn, PieceColor.Black, false),
		new Piece(PieceType.None, PieceColor.White, false),
		new Piece(PieceType.None, PieceColor.White, false),
		new Piece(PieceType.None, PieceColor.White, false),
		new Piece(PieceType.None, PieceColor.White, false),
		new Piece(PieceType.Pawn, PieceColor.White, false),
		new Piece(PieceType.Bishop, PieceColor.White, false),
	],
	[
		new Piece(PieceType.Knight, PieceColor.Black, false),
		new Piece(PieceType.Pawn, PieceColor.Black, false),
		new Piece(PieceType.None, PieceColor.White, false),
		new Piece(PieceType.None, PieceColor.White, false),
		new Piece(PieceType.None, PieceColor.White, false),
		new Piece(PieceType.None, PieceColor.White, false),
		new Piece(PieceType.Pawn, PieceColor.White, false),
		new Piece(PieceType.Knight, PieceColor.White, false),
	],
	[
		new Piece(PieceType.Rook, PieceColor.Black, false),
		new Piece(PieceType.Pawn, PieceColor.Black, false),
		new Piece(PieceType.None, PieceColor.White, false),
		new Piece(PieceType.None, PieceColor.White, false),
		new Piece(PieceType.None, PieceColor.White, false),
		new Piece(PieceType.None, PieceColor.White, false),
		new Piece(PieceType.Pawn, PieceColor.White, false),
		new Piece(PieceType.Rook, PieceColor.White, false),
	],
];
