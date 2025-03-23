import React from "react";
import styles from "./GameField.module.scss";
import useGameField from "./useGameField";
import { CellState } from "./utils";
import { useDroppable } from "@dnd-kit/core";
import Cell from "./Cell/Cell";
import gameField from "@/store/gameField";
import { observer } from "mobx-react-lite";
import { toJS } from "mobx";

export interface Props {
	overIds?: Array<any>;
}

const GameField: React.FC<Props> = observer((props) => {
	const hook = useGameField();

	// regular space breaks dnd-kit collision
	const emptyCellContent = "\u00A0";
	// const emptyCellContent = "🌊"

	const emptyCell = <div className={styles.cell}>{emptyCellContent}</div>;

	const { setNodeRef } = useDroppable({
		id: "GameField",
	});

	return (
		<div
			className={styles.GameField}
			ref={setNodeRef}
		>
			{gameField.field.map((row, ridx) => (
				<div
					key={`row-${ridx}`}
					className={styles.row}
				>
					{row.map((column, cidx) => (
						<Cell
							id={`cell-${ridx}-${cidx}`}
							key={`cell-${ridx}-${cidx}`}
							className={styles.cellContainer}
							style={{
								backgroundColor: props.overIds?.includes(`cell-${ridx}-${cidx}`)
									? "black"
									: "",
							}}
						>
							{column === CellState.EMPTY && emptyCell}
							{column === CellState.MISS && "❌"}
							{column === CellState.SHIP &&
								toJS(gameField.cells.get(`cell-${ridx}-${cidx}`))}
							{column === CellState.HIT && "💥"}
						</Cell>
					))}
				</div>
			))}
		</div>
	);
});

export default GameField;
