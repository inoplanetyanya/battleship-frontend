import React from "react";
import styles from "./Chat.module.scss";
import useChat from "./useChat";
import User from "@/store/user";
import { observer } from "mobx-react-lite";

export interface Props {}

const Chat: React.FC<Props> = observer((props) => {
	const hook = useChat();

	return (
		<div className={styles.Chat}>
			<div className={styles.history}>
				{hook.history.map((el, idx) => (
					<div
						className={styles.message}
						key={`mgs-${idx}`}
					>
						<span
							className={[
								styles.from,
								el.from === User.username ? styles.fromMe : "",
							]
								.join(" ")
								.trim()}
						>
							{el.from}:{" "}
						</span>
						<span className={styles.message}>{el.message}</span>
					</div>
				))}
			</div>
			<div className={styles.input}>
				<textarea
					className={styles.textarea}
					onChange={hook.onChange}
					value={hook.message}
					rows={3}
				></textarea>
				<button
					className={styles.buttonSend}
					onClick={hook.sendMessage}
				>
					Send
				</button>
			</div>
		</div>
	);
});

export default Chat;
