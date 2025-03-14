import { makeAutoObservable } from "mobx";

type NoArgVoid = { (): void };
type onMessageFunc = { (event: MessageEvent<any>): any | null };

class Socket {
	private _socket: WebSocket | undefined = undefined;
	private _beforeClose: NoArgVoid = () => {};
	private _onMessage: Array<onMessageFunc> = [];

	constructor() {
		makeAutoObservable(this);
	}

	public get socket(): WebSocket | undefined {
		return this._socket;
	}

	public set socket(value: WebSocket) {
		const bc = this._beforeClose;
		if (bc) {
			bc();
		}
		this._socket?.close();
		this._socket = value;
		this._socket.onmessage = (event) => {
			this._onMessage.forEach((func) => func(event));
		};
	}

	public get beforeClose(): NoArgVoid {
		return this._beforeClose;
	}

	public set beforeClose(value: NoArgVoid) {
		this._beforeClose = value;
	}
}

export default new Socket();
