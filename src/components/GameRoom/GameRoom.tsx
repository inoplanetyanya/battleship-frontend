import React from "react";
import styles from "./GameRoom.module.scss";
import Chat from "@/components/Chat/Chat";

export interface Props {}

const GameRoom: React.FC<Props> = (props) => {
	return (
		<div className={styles.GameRoom}>
			<Chat></Chat>
		</div>
	);
};

export default GameRoom;
