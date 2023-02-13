import { FC } from 'react'
import { Figure } from '../models/figures/Figure'

interface lostFiguresProps {
  title: string
  figures: Figure[]
}

const LostFigures: FC<lostFiguresProps> = ({ title, figures }) => {
  return (
    <div className="lost">
      <h3>{title}</h3>
      {figures.map(f => (
        <div key={f.id}>
          {f.name} {f.logo && <img src={f.logo} height={20} width={20} alt="" />}
        </div>
      ))}
    </div>
  )
}

export default LostFigures
