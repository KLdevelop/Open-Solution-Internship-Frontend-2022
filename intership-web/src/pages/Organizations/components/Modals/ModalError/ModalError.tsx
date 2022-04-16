import React from 'react';
import s from './error.module.scss';

export const ModalError: React.FC = () => {
  return (
    <div className={s.error}>
      <h1>Please, Provide valid detials!</h1>
    </div>
  );
};
