import { makeAutoObservable } from "mobx";

class Window {
  private _height: number = window.visualViewport?.height || 0;

  constructor() {
    makeAutoObservable(this);
  }

  public get height(): number {
    return this._height;
  }
  public set height(value: number) {
    this._height = value;
  }
}

export default new Window();
