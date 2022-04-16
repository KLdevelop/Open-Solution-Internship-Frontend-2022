import React, { ChangeEvent, useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useAppDispatch } from 'Src/hooks';
import { addToEditOrg, Organization } from 'Src/models/actions';
import { ModalProps } from '../ModalProps';
import { ModalError } from '../ModalError';
import s from '../modal.module.scss';

interface Props extends ModalProps {
  org: Organization;
}

export const RedOrganizationModal: React.FC<Props> = ({ isOpen, setIsOpen, org }) => {
  const dispatch = useAppDispatch();
  const [error, setError] = useState(false);
  const [data, setData] = useState({
    name: org.name,
    address: org.address,
    INN: org.INN,
  });
  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    data[e.target.name] = e.target.value;
    setData({ ...data });
  };
  const onRedClick = () => {
    const editedOrg: Organization = { ...data, id: org.id };
    if (
      editedOrg.name === '' ||
      editedOrg.address === '' ||
      editedOrg.INN === 0 ||
      Number.isNaN(editedOrg.INN)
    ) {
      setError(true);
      return;
    }
    dispatch(addToEditOrg(editedOrg));
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
        <h1>Edit Organization</h1>
      </div>
      {error && <ModalError />}
      <div className={s.modalMid}>
        <div className={s.first}>
          <p>Organization Name</p>
          <input name="name" onChange={onInputChange} value={data.name} />
        </div>
        <div>
          <p>Organization Address</p>
          <input name="address" onChange={onInputChange} value={data.address} />
        </div>
        <div className={s.last}>
          <p>Organization&#39;s INN</p>
          <input name="INN" onChange={onInputChange} value={data.INN} />
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
