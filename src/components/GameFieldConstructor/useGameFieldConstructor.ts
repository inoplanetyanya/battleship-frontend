import { useCallback, useEffect, useMemo, useState } from "react";
import useDnd from "./useDnd";

export interface Ship {
	size: number;
	index: number;
}

export default function useGameFieldConstructor() {
	const defaultShipsSet = useMemo(() => {
		const sd = [
			[4, 1],
			[3, 2],
			[3, 3],
			[2, 4],
			[2, 5],
			[2, 6],
			[1, 7],
			[1, 8],
			[1, 9],
			[1, 10],
		];
		const ships = sd.map((el) => {
			return {
				size: el[0],
				index: el[1],
			};
		});

		ships.reverse();

		return ships;
	}, []);

	const [ships, setShips] = useState<Array<Ship>>(defaultShipsSet);

	const popShip = useCallback(() => {
		setShips((prev) => {
			const newShips = prev.slice(0, -1);
			return newShips;
		});
	}, [ships]);

	const currentShip = useMemo(() => {
		return ships[ships.length - 1];
	}, [ships]);

	const dnd = useDnd({
		onSuccessShipPlace: popShip,
		currentShipSize: currentShip?.size || 0,
	});

	return {
		dnd,
		ships: {
			value: ships,
			setValue: setShips,
		},
		popShip,
		currentShip,
	};
}
