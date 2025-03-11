import { makeAutoObservable } from "mobx";

class User {
	private _username: string = "";

	constructor() {
		makeAutoObservable(this);
	}

	public get username(): string {
		return this._username;
	}

	public set username(value: string) {
		this._username = value;
	}
}

export default new User();
