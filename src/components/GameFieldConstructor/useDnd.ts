import gameField from "@/store/gameField";
import {
	DragEndEvent,
	DragMoveEvent,
	Collision,
	Active,
	DroppableContainer,
	rectIntersection,
	ClientRect,
} from "@dnd-kit/core";
import { RectMap } from "@dnd-kit/core/dist/store";
import { Coordinates } from "@dnd-kit/core/dist/types";
import { useState } from "react";

interface Args {
	onSuccessShipPlace: () => void;
	currentShipSize: number;
}

export default function useDnd(hargs: Args) {
	const [overIds, setOverIds] = useState<string[]>([]);

	const handleDragMove = (event: DragMoveEvent) => {
		const { collisions } = event;

		if (!collisions) return;

		const newOverIds = collisions.map((collision) => collision.id.toString());
		setOverIds(newOverIds);
	};

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, collisions } = event;

		if (!collisions) {
			setOverIds([]);
			return;
		}

		const collisionIds = collisions.map((collision) => collision.id.toString());
		const gameFieldIndex = collisionIds.indexOf("GameField");
		if (gameFieldIndex >= 0) {
			collisionIds.splice(gameFieldIndex, 1);
		}

		let isValid = true;

		if (collisionIds.length !== hargs.currentShipSize) {
			console.error("Number of cells does not match ship size");
			isValid = false;
		}

		const cellsToReplace = collisionIds.map((id) => gameField.cells.get(id));
		if (!cellsToReplace.every((cell) => !cell)) {
			console.error("Some cells are already occupied");
			isValid = false;
		}

		const isHorizontal = checkOrientation(collisionIds);
		if (!isHorizontal && !checkOrientation(collisionIds, false)) {
			console.error("Ship must be either horizontal or vertical");
			isValid = false;
		}

		if (isShipTouchingAnother(collisionIds)) {
			console.error("Ship is touching another ship");
			isValid = false;
		}

		if (isValid) {
			collisionIds.forEach((id, index) => {
				const cellId = id.toString();
				const cellValue = active.data.current?.at(index);
				gameField.cellsSet(cellId, cellValue);
			});

			hargs.onSuccessShipPlace();
		}

		setOverIds([]);
	};

	const checkOrientation = (
		cellIds: string[],
		isHorizontal = true,
	): boolean => {
		const [firstCell, ...remainingCells] = cellIds;
		const [firstRow, firstCol] = firstCell.split("-").slice(1).map(Number);

		for (const cellId of remainingCells) {
			const [row, col] = cellId.split("-").slice(1).map(Number);
			if (isHorizontal && row !== firstRow) return false;
			if (!isHorizontal && col !== firstCol) return false;
		}

		return true;
	};

	const isShipTouchingAnother = (cellIds: string[]): boolean => {
		for (const cellId of cellIds) {
			const [row, col] = cellId.split("-").slice(1).map(Number);

			for (let i = -1; i <= 1; i++) {
				for (let j = -1; j <= 1; j++) {
					if (i === 0 && j === 0) continue;

					const neighborRow = row + i;
					const neighborCol = col + j;

					if (
						neighborRow >= 0 &&
						neighborRow < gameField.field.length &&
						neighborCol >= 0 &&
						neighborCol < gameField.field.length
					) {
						const neighborCellId = `cell-${neighborRow}-${neighborCol}`;
						if (
							!cellIds.includes(neighborCellId) &&
							gameField.cells.get(neighborCellId)
						) {
							return true;
						}
					}
				}
			}
		}

		return false;
	};

	const customCollisionDetection = (args: {
		active: Active;
		collisionRect: ClientRect;
		droppableRects: RectMap;
		droppableContainers: DroppableContainer[];
		pointerCoordinates: Coordinates | null;
	}): Collision[] => {
		let result = rectIntersection(args);

		const gameFieldIndex = result.findIndex((el) => el.id === "GameField");
		if (gameFieldIndex >= 0) {
			result.splice(gameFieldIndex, 1);
		}

		const initialWidth = args.active.rect.current.initial?.width || 0;
		const initialHeight = args.active.rect.current.initial?.height || 0;

		const isHorizontal = initialWidth > initialHeight;

		if (isHorizontal) {
			const rows: { [key: string]: Collision[] } = {};
			result.forEach((collision) => {
				const [_, row] = collision.id.toString().split("-");
				if (!rows[row]) {
					rows[row] = [];
				}
				rows[row].push(collision);
			});

			const rowValues = Object.values(rows);
			let selectedRow: Collision[] = [];
			if (rowValues.length) {
				selectedRow = rowValues.reduce((max, row) =>
					row.length > max.length ? row : max,
				);
			}

			result = selectedRow.slice(0, hargs.currentShipSize);
		} else {
			const columns: { [key: string]: Collision[] } = {};
			result.forEach((collision) => {
				const [_, __, column] = collision.id.toString().split("-");
				if (!columns[column]) {
					columns[column] = [];
				}
				columns[column].push(collision);
			});

			const columnValues = Object.values(columns);
			let selectedColumn: Collision[] = [];
			if (columnValues.length) {
				selectedColumn = columnValues.reduce((max, column) =>
					column.length > max.length ? column : max,
				);
			}

			result = selectedColumn.slice(0, hargs.currentShipSize);
		}

		return result;
	};

	return {
		handleDragEnd,
		handleDragMove,
		customCollisionDetection,
		overIds,
	};
}
