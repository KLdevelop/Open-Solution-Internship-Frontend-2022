import React, { ChangeEvent, useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useAppDispatch, useAppSelector } from 'Src/hooks';
import { addToPostDiv, Division } from 'Src/models/actions';
import { ModalProps } from '../ModalProps';
import s from '../modal.module.scss';
import { ModalError } from '../ModalError';

interface Props extends ModalProps {
  idOrganization: number;
}

export const AddDivisionModal: React.FC<Props> = ({ isOpen, setIsOpen, idOrganization }) => {
  const dispatch = useAppDispatch();
  const divs = useAppSelector((state) => state.divisions.divisions);
  const [error, setError] = useState(false);
  const [data, setData] = useState({
    name: '',
    phone: '',
  });
  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    data[e.target.name] = e.target.value;
    setData({ ...data });
  };
  const onAddClick = () => {
    const newDiv: Division = {
      id: 111,
      id_organization: idOrganization,
      name: data.name,
      phone: +data.phone,
    };
    if (newDiv.name === '' || newDiv.phone === 0 || Number.isNaN(newDiv.phone)) {
      setError(true);
      return;
    }
    dispatch(addToPostDiv(newDiv));
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
        <h1>Add Division</h1>
      </div>
      {error && <ModalError />}
      <div className={s.modalMid}>
        <div className={s.first}>
          <p>Division Name</p>
          <input name="name" onChange={onInputChange} />
        </div>
        <div className={s.last}>
          <p>Division&#39;s Phone</p>
          <input name="phone" onChange={onInputChange} />
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
