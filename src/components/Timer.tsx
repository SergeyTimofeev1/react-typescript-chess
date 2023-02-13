import { FC, useEffect, useRef, useState } from 'react'
import { Colors } from '../models/Colors'
import { Player } from '../models/Player'
interface timerProps {
  currentPlayer: Player | null
  restart: () => void
}

const Timer: FC<timerProps> = ({ currentPlayer, restart }) => {
  const [blackTime, setBlackTime] = useState(300)
  const [whiteTime, setWhiteTime] = useState(300)
  const timer = useRef<null | ReturnType<typeof setInterval>>(null)

  useEffect(() => {
    startTimer()
  }, [currentPlayer])

  function startTimer() {
    if (timer.current) {
      clearInterval(timer.current)
    }
    const callback =
      currentPlayer?.color === Colors.BLACK ? decrementBlackTimer : decrementWhiteTimer
    timer.current = setInterval(callback, 1000)
  }

  function decrementWhiteTimer() {
    setWhiteTime(prev => prev - 1)
  }

  function decrementBlackTimer() {
    setBlackTime(prev => prev - 1)
  }

  const handleRestart = () => {
    setBlackTime(300)
    setWhiteTime(300)
    restart()
  }

  return (
    <div>
      <div>
        <button onClick={handleRestart}>Перезапустить игру</button>
      </div>
      <h2>Белые {whiteTime}</h2>
      <h2>Черные {blackTime}</h2>
    </div>
  )
}

export default Timer
