import React, { ChangeEvent, useEffect, useState } from 'react';
import Modal from 'react-modal';
import { useAppDispatch } from 'Src/hooks';
import { addToEditDiv, Division } from 'Src/models/actions';
import { ModalProps } from '../ModalProps';
import { ModalError } from '../ModalError';
import s from '../modal.module.scss';

interface Props extends ModalProps {
  div: Division;
}

export const RedDivisionModal: React.FC<Props> = ({ isOpen, setIsOpen, div }) => {
  const dispatch = useAppDispatch();
  const [error, setError] = useState(false);
  const [data, setData] = useState({
    name: div.name,
    phone: div.phone,
  });
  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    data[e.target.name] = e.target.value;
    setData({ ...data });
  };
  const onRedClick = () => {
    const editedDiv: Division = { ...data, id: div.id, id_organization: div.id_organization };
    if (editedDiv.name === '' || editedDiv.phone === 0 || Number.isNaN(editedDiv.phone)) {
      setError(true);
      return;
    }
    dispatch(addToEditDiv(editedDiv));
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
        <h1>Edit Division</h1>
      </div>
      {error && <ModalError />}
      <div className={s.modalMid}>
        <div className={s.first}>
          <p>Division Name</p>
          <input name="name" onChange={onInputChange} value={data.name} />
        </div>
        <div className={s.last}>
          <p>Division&#39;s Phone</p>
          <input name="phone" onChange={onInputChange} value={data.phone} />
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
