import React, { ChangeEvent, useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useAppDispatch } from 'Src/hooks';
import { addToEditEmp, Employee } from 'Src/models/actions';
import { ModalProps } from '../ModalProps';
import { ModalError } from '../ModalError';
import s from '../modal.module.scss';

interface Props extends ModalProps {
  emp: Employee;
}

export const RedEmployeeModal: React.FC<Props> = ({ isOpen, setIsOpen, emp }) => {
  const dispatch = useAppDispatch();
  const [error, setError] = useState(false);
  const [data, setData] = useState({
    FIO: emp.FIO,
    address: emp.address,
    position: emp.position,
  });
  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    data[e.target.name] = e.target.value;
    setData({ ...data });
  };
  const onRedClick = () => {
    const editedEmp: Employee = { ...data, id: emp.id, id_division: emp.id_division };
    if (editedEmp.FIO === '' || editedEmp.address === '' || editedEmp.position === '') {
      setError(true);
      return;
    }
    dispatch(addToEditEmp(editedEmp));
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
        <h1>Edit Employee</h1>
      </div>
      {error && <ModalError />}
      <div className={s.modalMid}>
        <div className={s.first}>
          <p>Full Name</p>
          <input name="FIO" onChange={onInputChange} value={data.FIO} />
        </div>
        <div>
          <p>Employee Address</p>
          <input name="address" onChange={onInputChange} value={data.address} />
        </div>
        <div className={s.last}>
          <p>Employee&#39;s Position</p>
          <input name="phone" onChange={onInputChange} value={data.position} />
        </div>
      </div>
      <div className={s.modalBot}>
        <div>
          <button type="button" onClick={onCancelClick} className={s.cancel}>
            Cancel
          </button>
          <button type="button" className={s.add} onClick={onRedClick}>
            Edit
          </button>
        </div>
      </div>
    </Modal>
  );
};
