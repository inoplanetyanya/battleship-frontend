export const enum CellState {
	EMPTY = 0,
	MISS = 1,
	SHIP = 2,
	HIT = 3,
}

export type FixedLengthArray<T, N extends number> = [T, ...T[]] & { length: N };
export type GameField<Size extends number> = FixedLengthArray<
	FixedLengthArray<CellState, Size>,
	Size
>;

/**
 * Returns FixedLengthArray with size ySize x xSize
 *
 * @param size positive number
 */
export function сreateEmptyGameField<Size extends number>(
	size: Size,
): GameField<typeof size> {
	if (size < 0) {
		throw new Error("Field sizes shuld be positive");
	}

	return new Array(size).fill(
		new Array(size).fill(CellState.EMPTY),
	) as GameField<Size>;
}
