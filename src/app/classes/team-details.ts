export class TeamDetails {
  constructor(
    private _win: number,
    private _lost: number,
    private _draw: number
  ) {
  }

  get totalMatch(): number {
    return this._win + this._lost + this._draw;
  }

  set win(value: number) {
    this._win = value;
  }

  get win(): number {
    return this._win;
  }

  set lost(value: number) {
    this._lost++;
  }

  get lost(): number {
    return this._lost;
  }

  get draw(): number {
    return this._draw;
  }

  set draw(value: number) {
    this._draw = value;
  }
}
