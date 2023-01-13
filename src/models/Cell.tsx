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
    if (this.y !== target.y) {
      return false
    }

    const min = Math.min(this.x, target.x)
    const max = Math.max(this.x, target.x)

    for (let x = min + 1; x < max; x++) {
      if (!this.board.getCell(x, this.y).isEmpty()) {
        return false
      }
    }
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

  isEmptyDiagonal(target: Cell): boolean {
    // разница по модулю между текущей коорд и таргетом для определния диагональ это или нет
    // при диагонали разница между коордами всегда равна 1
    const absX = Math.abs(target.x - this.x)
    const absY = Math.abs(target.y - this.y)

    // отсекли проверкой НЕ диагонали
    if (absY !== absX) return false

    // получили направление если текущая коорда меньше таргета то 1 и наоборот
    const directionX = this.x < target.x ? 1 : -1
    const directionY = this.y < target.y ? 1 : -1

    // в цикле бежим по кол-ву ячеек, возможным для перемещения
    // в данном случае кол-во ячеек это absY, так как мы отсекли все не диагонали ранее
    // получаем коорды нужных ячеек при помощи getCell и проверяем их на пустоту isEmpty()
    for (let i = 1; i < absY; i++) {
      if (!this.board.getCell(this.x + directionX * i, this.y + directionY * i).isEmpty()) {
        return false
      }
    }
    return true
  }

}