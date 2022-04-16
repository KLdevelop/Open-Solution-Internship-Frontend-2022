import React, { ChangeEvent, useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useAppDispatch, useAppSelector } from 'Src/hooks';
import { addToPostEmp, Employee } from 'Src/models/actions';
import { ModalProps } from '../ModalProps';
import s from '../modal.module.scss';
import { ModalError } from '../ModalError';

interface Props extends ModalProps {
  idDivision: number;
}

export const AddEmployeeModal: React.FC<Props> = ({ isOpen, setIsOpen, idDivision }) => {
  const dispatch = useAppDispatch();
  const emps = useAppSelector((state) => state.employees.employees);
  const [error, setError] = useState(false);
  const [data, setData] = useState({
    FIO: '',
    address: '',
    position: '',
  });
  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    data[e.target.name] = e.target.value;
    setData({ ...data });
  };
  const onAddClick = () => {
    const newEmp: Employee = {
      id: 111,
      id_division: idDivision,
      ...data,
    };
    if (newEmp.FIO === '' || newEmp.address === '' || newEmp.position === '') {
      setError(true);
      return;
    }
    dispatch(addToPostEmp(newEmp));
    setIsOpen(false);
  };
  const onCancelClick = () => {
    setIsOpen(false);
  };
  useEffect(() => {
    Modal.setAppElement('#root');
  }, []);
  return (
    <Modal className={s.modal} overlayClassName={s.overlayModal} isOpen={isOpen}>
      <div className={s.modalTop}>
        <h1>Add Employee</h1>
      </div>
      {error && <ModalError />}
      <div className={s.modalMid}>
        <div className={s.first}>
          <p>Full Name</p>
          <input name="FIO" onChange={onInputChange} />
        </div>
        <div>
          <p>Employee Address</p>
          <input name="address" onChange={onInputChange} />
        </div>
        <div className={s.last}>
          <p>Employee&#39;s Position</p>
          <input name="position" onChange={onInputChange} />
        </div>
      </div>
      <div className={s.modalBot}>
        <div>
          <button type="button" onClick={onCancelClick} className={s.cancel}>
            Cancel
          </button>
          <button type="button" className={s.add} onClick={onAddClick}>
            Add
          </button>
        </div>
      </div>
    </Modal>
  );
};
