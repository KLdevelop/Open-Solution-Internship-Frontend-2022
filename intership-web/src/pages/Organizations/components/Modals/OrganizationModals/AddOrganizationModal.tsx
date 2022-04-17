import React, { ChangeEvent, useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useAppDispatch } from 'Src/hooks';
import { addToPostOrg, Organization } from 'Src/models/actions';
import { ModalProps } from '../ModalProps';
import { ModalError } from '../ModalError';
import s from '../modal.module.scss';

export const AddOrganizationModal: React.FC<ModalProps> = ({ isOpen, setIsOpen }) => {
  const dispatch = useAppDispatch();
  const [error, setError] = useState(false);
  const [data, setData] = useState({
    name: '',
    address: '',
    INN: '',
  });
  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    data[e.target.name] = e.target.value;
    setData({ ...data });
  };
  const onAddClick = () => {
    const newOrg: Organization = {
      id: 111,
      name: data.name,
      address: data.address,
      INN: +data.INN,
    };
    if (
      newOrg.name === '' ||
      newOrg.address === '' ||
      newOrg.INN === 0 ||
      Number.isNaN(newOrg.INN)
    ) {
      setError(true);
      return;
    }
    dispatch(addToPostOrg(newOrg));
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
        <h1>Add Organization</h1>
      </div>
      {error && <ModalError />}
      <div className={s.modalMid}>
        <div className={s.first}>
          <p>Organization Name</p>
          <input name="name" onChange={onInputChange} />
        </div>
        <div>
          <p>Organization Address</p>
          <input name="address" onChange={onInputChange} />
        </div>
        <div className={s.last}>
          <p>Organization&#39;s INN</p>
          <input name="INN" onChange={onInputChange} />
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
