import Socket from "@/store/socket";
import { useCallback, useEffect, useState } from "react";

export default function useChat() {
	type Message = {
		from: string;
		message: string;
	};
	const [history, setHistory] = useState<Array<Message>>([]);

	useEffect(() => {
		console.log(history);
	}, [history]);

	const onSocketMessage = (event: MessageEvent<any>) => {
		const data = JSON.parse(event.data);
		if (data.from && data.message) {
			setHistory((prev) => [...prev, data]);
		}
	};

	useEffect(() => {
		Socket.socket?.addEventListener("message", onSocketMessage);
	}, []);

	const [message, setMessage] = useState<string>("");
	const onChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setMessage((prev) => e.target.value);
	}, []);

	const sendMessage = useCallback(() => {
		if (!message) {
			console.error("no message");
			return;
		}

		Socket.socket?.send(`/chat ${message}`);
		setMessage("");
	}, [message]);

	return {
		sendMessage,
		onChange,
		history,
		message,
	};
}
