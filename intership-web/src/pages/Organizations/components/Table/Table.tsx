import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Division, Employee, Organization } from 'Src/models/actions';
import { arrowTo, deleteBttn, editBttn } from '../../assets';
import s from './table.module.scss';

interface Props {
  tablehead: string[];
  tablelist: Array<Organization | Division | Employee>;
  deleteArr: number[];
  onRedClick: (el) => void;
  onDeleteClick: (id: number) => void;
}

export const Table: React.FC<Props> = ({
  tablehead,
  tablelist,
  deleteArr,
  onRedClick,
  onDeleteClick,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isEmployeesPage = tablehead.length === 6;
  const onNextClick = (id: number) => {
    navigate(`${location.pathname}/${id}`);
  };
  return (
    <div className={isEmployeesPage ? s.empTable : s.table}>
      <div className={s.headtable}>
        {tablehead.map((h) => (
          <p key={h}>{h}</p>
        ))}
      </div>
      {tablelist.map((el) => (
        <div key={el.id} className={deleteArr.includes(el.id) ? s.toDelete : ''}>
          <p>{el.id}</p>
          <p>{el[tablehead[1]]}</p>
          <p>{el[tablehead[2]]}</p>
          <p>{el[tablehead[3]]}</p>
          {isEmployeesPage && <p>{el[tablehead[4]]}</p>}
          <p className={s.actions}>
            {!isEmployeesPage && (
              <button type="button" onClick={() => onNextClick(el.id)}>
                <img src={arrowTo} alt="" />
              </button>
            )}
            <button type="button" onClick={() => onRedClick(el)}>
              <img src={editBttn} alt="" />
            </button>
            <button onClick={() => onDeleteClick(el.id)} type="button">
              <img src={deleteBttn} alt="" />
            </button>
          </p>
        </div>
      ))}
    </div>
  );
};
