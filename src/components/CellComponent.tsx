
import { FC } from 'react';
import { Cell } from '../models/Cell';

interface CellProps {
  cell: Cell,
  key: number,
}
const CellComponent: FC<CellProps> = ({cell}) => {
  return (
    <div className={['cell', cell.color].join(' ')}>

    </div>
  );
}

export default CellComponent;
