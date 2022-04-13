import React, { useEffect } from 'react';
import Modal from 'react-modal';
import { ModalProps } from './ModalProps';
import s from './modal.module.scss';

interface Props extends ModalProps {
  action: () => any;
}

export const AcceptModal: React.FC<Props> = ({ isOpen, setIsOpen, contId, action }) => {
  const onNoClick = () => {
    setIsOpen(false);
  };
  const onYesClick = () => {
    action();
    setIsOpen(false);
  };
  useEffect(() => {
    Modal.setAppElement(contId);
  }, [contId]);
  return (
    <Modal className={s.modal} overlayClassName={s.overlayModal} isOpen={isOpen}>
      <div className={s.modalTop}>
        <h1>Are you sure?</h1>
      </div>
      <div className={s.modalBot}>
        <div>
          <button className={s.cancel} type="button" onClick={onNoClick}>
            No
          </button>
          <button className={s.add} type="button" onClick={onYesClick}>
            Yes
          </button>
        </div>
      </div>
    </Modal>
  );
};
