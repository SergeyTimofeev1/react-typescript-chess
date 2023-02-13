import { useEffect, useState } from 'react'
import './App.css'
import BoardComponent from './components/BoardComponent'
import { Board } from './models/Board'
import { Colors } from './models/Colors'
import { Player } from './models/Player'
import LostFigures from './components/LostFigures'
import Timer from './components/Timer'

export function App() {
  const [board, setBoard] = useState(new Board())
  const [whitePlayer, setWhitePlayer] = useState(new Player(Colors.WHITE))
  const [blackPlayer, setblackPlayer] = useState(new Player(Colors.BLACK))
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null)

  useEffect(() => {
    restart()
    setCurrentPlayer(whitePlayer)
  }, [])

  function restart() {
    const newBoard = new Board()
    newBoard.initCells()
    newBoard.addFigures()
    setBoard(newBoard)
  }

  function swapPlayer() {
    setCurrentPlayer(currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer)
  }

  return (
    <div className="App">
      <Timer currentPlayer={currentPlayer} restart={restart} />
      <BoardComponent
        board={board}
        setBoard={setBoard}
        swapPlayer={swapPlayer}
        currentPlayer={currentPlayer}
      />
      <div>
        <LostFigures figures={board.lostBlackFigures} title={'Черные фигуры'} />
      </div>
      <div>
        <LostFigures figures={board.lostWhiteFigures} title={'Белые фигуры'} />
      </div>
    </div>
  )
}
