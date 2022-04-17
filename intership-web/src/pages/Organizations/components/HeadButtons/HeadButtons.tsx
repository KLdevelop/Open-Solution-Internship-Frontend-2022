import React from 'react';
import { arrowBack, addBttn } from '../../assets';
import s from './buttons.module.scss';

interface Props {
  onBackClick?: () => void;
  onAddClick: () => void;
  addItem: string;
}

export const HeadButtons: React.FC<Props> = ({ onBackClick, onAddClick, addItem }) => {
  return (
    <div className={s.buttons}>
      <button type="button" className={s.back} onClick={onBackClick}>
        <img src={arrowBack} alt="" />
        Back
      </button>
      <button type="button" className={s.add} onClick={onAddClick}>
        <img src={addBttn} alt="" />
        {`Add ${addItem}`}
      </button>
    </div>
  );
};
