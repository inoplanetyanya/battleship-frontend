import React from "react";
import styles from "./Chat.module.scss";
import useChat from "./useChat";
import User from "@/store/user";
import { observer } from "mobx-react-lite";
import store_window from "@/store/window";

export interface Props {}

const Chat: React.FC<Props> = observer((props) => {
	const hook = useChat();

	return (
		<div
			className={styles.Chat}
			style={{ height: `${store_window.height}px` }}
		>
			<div
				className={styles.history}
				ref={hook.scroll.ref}
				onScroll={hook.scroll.onScroll}
			>
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
					placeholder={"Type your message here..."}
					onChange={hook.onChange}
					value={hook.message}
					rows={3}
					onKeyDown={hook.onTextAreaKeyDown}
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
