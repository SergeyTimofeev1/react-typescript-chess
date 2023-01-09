
import { FC } from 'react';
import { Cell } from '../models/Cell';

interface CellProps {
  cell: Cell,
  key: number,
  selected: boolean,
  click: (cell: Cell) => void
}
const CellComponent: FC<CellProps> = ({cell, selected, click}) => {
  return (
    <div 
      className={['cell', cell.color, selected ? 'selected' : ''].join(' ')}
      onClick={() => click(cell)}  
      style={{background:  cell.available && cell.figure ? 'green' : ''}}
    >
      {cell.available && !cell.figure && <div className="available"></div>}
      {cell.figure?.logo && <img src={cell.figure.logo} alt='figure'></img>}
    </div>
  );
}

export default CellComponent; 
