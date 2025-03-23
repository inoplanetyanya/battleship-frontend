import React, { ReactNode } from "react";
import styles from "./Cell.module.scss";
import { useDroppable } from "@dnd-kit/core";

export interface Props {
	id: string;
	children: ReactNode;
}

type DefaultDivProps = React.DetailedHTMLProps<
	React.HTMLAttributes<HTMLDivElement>,
	HTMLDivElement
>;

const Cell: React.FC<Props & DefaultDivProps> = (props) => {
	const { setNodeRef } = useDroppable({
		id: props.id,
	});

	return (
		<div
			className={[styles.Cell, props.className].join(" ").trim()}
			ref={setNodeRef}
			style={props.style}
		>
			{props.children}
		</div>
	);
};

export default Cell;
