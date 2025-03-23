import React from "react";
import styles from "./GameFieldConstructor.module.scss";
import ShipSelection from "../ShipSelection/ShipSelection";
import GameField from "../GameField/GameField";
import { DndContext } from "@dnd-kit/core";
import useGameFieldConstructor from "./useGameFieldConstructor";

export interface Props {}

const GameFieldConstructor: React.FC<Props> = (props) => {
	const hook = useGameFieldConstructor();

	return (
		<DndContext
			onDragEnd={hook.dnd.handleDragEnd}
			onDragMove={hook.dnd.handleDragMove}
			collisionDetection={hook.dnd.customCollisionDetection}
		>
			<div className={styles.GameFieldConstructor}>
				{hook.currentShip && <ShipSelection currentShip={hook.currentShip} />}
				<GameField overIds={hook.dnd.overIds} />
			</div>
		</DndContext>
	);
};

export default GameFieldConstructor;
