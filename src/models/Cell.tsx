import { Board } from './Board';
import { Colors } from './Colors'
import { Figure } from './figures/Figure';

export class Cell {
  readonly x: number;
  readonly y: number;
  readonly color: Colors;
  figure: Figure | null;
  board: Board;
  available: boolean;
  id: number; // реакт ключи

  constructor(board: Board, x: number, y: number, color: Colors, figure: Figure | null) {
    this.board = board
    this.x = x
    this.y = y
    this.color = color
    this.figure = figure
    this.available = false
    this.id = Math.random()
  }

  // из-за кольцевой зависимости ячейки и фигуры, при ходе в конкретную ячейку
  // надо указать явно фигуру которая встает в ячейку , а у фигуры указать ячейку, в которую она встает
  setFigure(figure: Figure) {
    this.figure = figure
    this.figure.cell = this
  }

  // target это возможные варианты хода для каждой фигуры
  moveFigure(target: Cell) {
    if (this.figure && this.figure?.canMove(target)) {
      this.figure.moveFigure(target)
      target.setFigure(this.figure)
      this.figure = null
    }
  }

  isEmpty(): boolean {
    return this.figure === null
  }

  isEmptyHorizontal(target: Cell): boolean {
    return true
  }

  isEmptyVertical(target: Cell): boolean {

    if (this.x !== target.x) {
      return false
    }

    const min = Math.min(this.y, target.y)
    const max = Math.max(this.y, target.y)

    for (let y = min + 1; y < max; y++) {
      if (!this.board.getCell(this.x, y).isEmpty()) {
        return false
      }
    }
    return true
  }

  isEmptyDiagonal(): boolean {
    return true
  }

}