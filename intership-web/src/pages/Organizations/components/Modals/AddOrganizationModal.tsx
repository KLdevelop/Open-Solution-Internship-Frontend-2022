import React, { ChangeEvent, useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useAppDispatch, useAppSelector } from 'Src/hooks';
import { addToPostOrg, Organization } from 'Src/models/actions';
import { ModalProps } from './ModalProps';
import s from './modal.module.scss';

export const AddOrganizationModal: React.FC<ModalProps> = ({ isOpen, setIsOpen, contId }) => {
  const dispatch = useAppDispatch();
  const orgs = useAppSelector((state) => state.organizations.organizations);
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
    const id = orgs[orgs.length - 1].id + 1;
    const newOrg: Organization = {
      id,
      name: data.name,
      address: data.address,
      INN: +data.INN,
    };
    dispatch(addToPostOrg(newOrg));
    setIsOpen(false);
  };
  const onCancelClick = () => {
    setIsOpen(false);
  };
  useEffect(() => {
    Modal.setAppElement(contId);
  }, [contId]);
  return (
    <Modal className={s.modal} overlayClassName={s.overlayModal} isOpen={isOpen}>
      <div className={s.modalTop}>
        <h1>Add Organization</h1>
      </div>
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
