import React, { useEffect, useRef } from "react";
import styles from "./Ship.module.scss";
import useShip from "./useShip";
import { Orientation } from "./utils";
import { useDraggable, useDroppable } from "@dnd-kit/core";

export interface Props {
	size: number;
	index: number;
}

const Ship: React.FC<Props> = (props) => {
	const hook = useShip();

	const cells = Array.from({ length: props.size }, (_, i) => (
		<div
			className={styles.cell}
			key={`ship-${props.size}-index-${props.index}-cell-${i}`}
		/>
	));

	const cellsCopy = Array.from({ length: props.size }, (_, i) => {
		if (hook.orientation.value === Orientation.HORIZONTAL) {
			return (
				<div
					style={{
						width: "calc(2rem - 6px)",
						height: "calc(2rem - 6px)",
						border: "2px solid black",
						borderRight: "2px solid black",
						flexGrow: "1",
						boxSizing: "border-box",
						zIndex: "1",
						margin: "-1px",
					}}
					key={`ship-${props.size}-index-${props.index}-cell-${i}--another`}
				/>
			);
		} else if (hook.orientation.value === Orientation.VERTICAL) {
			return (
				<div
					style={{
						width: "calc(2rem - 6px)",
						height: "calc(2rem - 6px)",
						border: "2px solid black",
						borderBottom: "2px solid black",
						flexGrow: "1",
						boxSizing: "border-box",
						zIndex: "1",
						margin: "-1px",
					}}
					key={`ship-${props.size}-index-${props.index}-cell-${i}--another`}
				/>
			);
		}
	});

	const { attributes, listeners, setNodeRef, transform, isDragging } =
		useDraggable({
			id: "draggable",
			data: [...cellsCopy],
		});
	const style = transform
		? {
				transform: `translate3d(${transform.x}px, ${transform.y}px, 0) scale(0.5)`,
				opacity: 0.5,
			}
		: undefined;

	return (
		<div className={styles.Ship}>
			<div
				className={[
					styles.cells,
					hook.orientation.value === Orientation.HORIZONTAL
						? styles.horizontal
						: styles.vertical,
				]
					.join(" ")
					.trim()}
				ref={setNodeRef}
				style={style}
				{...listeners}
				{...attributes}
			>
				{cells}
			</div>
			<div className={styles.buttonContainer}>
				<button
					className={styles.buttonRotate}
					onClick={hook.rotate}
				>
					{"🔃"}
				</button>
			</div>
		</div>
	);
};

export default Ship;
