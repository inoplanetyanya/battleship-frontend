import Socket from "@/store/socket";
import { useCallback, useEffect, useRef, useState } from "react";
import useDivScroll from "./useDivScroll";

export default function useChat() {
	type Message = {
		from: string;
		message: string;
	};
	const [history, setHistory] = useState<Array<Message>>([]);

	
	const scroll = useDivScroll();
	useEffect(scroll.maintainScrollPosition , [history])

	const onSocketMessage = (event: MessageEvent<any>) => {
		const data = JSON.parse(event.data);
		if (data.from && data.message) {
			setHistory((prev) => [...prev, data]);
		}
	};

	useEffect(() => {
		Socket.socket?.addEventListener("message", onSocketMessage);
		return () => {
			Socket.socket?.removeEventListener("message", onSocketMessage);
		};
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

	const onTextAreaKeyDown = useCallback(
		(event: React.KeyboardEvent<HTMLTextAreaElement>) => {
			if (event.key === "Enter") {
				sendMessage();
				event.preventDefault();
				event.stopPropagation();
			}
		},
		[sendMessage],
	);

	return {
		sendMessage,
		onChange,
		onTextAreaKeyDown,
		history,
		scroll,
		message,
	};
}
