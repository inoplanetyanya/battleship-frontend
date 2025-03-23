import React from "react";
import styles from "./ShipSelection.module.scss";
import useShipSelection from "./useShipSelection";
import Ship from "./Ship/Ship";
import { Ship as ShipProps } from "../GameFieldConstructor/useGameFieldConstructor";

export interface Props {
	currentShip: ShipProps;
}

const ShipSelection: React.FC<Props> = (props) => {
	const hook = useShipSelection();

	return (
		<div className={styles.ShipSelection}>
			<Ship
				size={props.currentShip.size}
				index={props.currentShip.index}
			/>
		</div>
	);
};

export default ShipSelection;
