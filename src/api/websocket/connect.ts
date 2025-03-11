import { wsulr } from "@/api/baseurl";

export function CreateWS() {
	const socket = new WebSocket(`${wsulr}/ws`);

	return socket;
}
