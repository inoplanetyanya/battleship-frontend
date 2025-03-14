import Socket from "@/store/socket";

export default function useGameRoom() {
	return {
		socket: Socket.socket,
	};
}
