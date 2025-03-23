import { useCallback, useState } from "react";
import { Orientation } from "./utils";

export default function useShip() {
	const [orientation, setOrientation] = useState<Orientation>(
		Orientation.HORIZONTAL,
	);

	const rotate = useCallback(() => {
		if (orientation === Orientation.HORIZONTAL) {
			setOrientation(Orientation.VERTICAL);
			return;
		}

		if (orientation === Orientation.VERTICAL) {
			setOrientation(Orientation.HORIZONTAL);
			return;
		}
	}, [orientation]);

	return {
		orientation: {
			value: orientation,
			setValue: setOrientation,
		},
		rotate,
	};
}
