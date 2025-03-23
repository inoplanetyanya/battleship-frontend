import { makeAutoObservable, observable, ObservableMap } from "mobx";
import {
	CellState,
	GameField as TypeGameField,
	сreateEmptyGameField,
} from "@/components/GameField/utils";
import { ReactNode } from "react";

class GameField {
	private _field: TypeGameField<10> = сreateEmptyGameField(10);
	private _cells: ObservableMap<string, ReactNode> = observable.map();

	constructor() {
		makeAutoObservable(this);
	}

	public cellsSet(key: string, value: ReactNode): Map<string, ReactNode> {
		const splited = key.split("-");
		const ridx = Number.parseInt(splited[1]);
		const cidx = Number.parseInt(splited[2]);
		this._field[ridx][cidx] = CellState.SHIP;

		this._cells.set(key, value);
		return this._cells;
	}

	public get field(): TypeGameField<10> {
		return this._field;
	}

	public set field(value: TypeGameField<10>) {
		this._field = value;
	}

	public get cells(): ObservableMap<string, ReactNode> {
		return this._cells;
	}

	public set cells(value: ObservableMap<string, ReactNode>) {
		this._cells = value;
	}
}

export default new GameField();
