import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'Src/hooks';
import { addToDeleteOrg, fetchOrganizations, Organization } from 'Src/models/actions';
import { Header } from './components/Header';
import { arrowBack, addBttn, arrowTo, deleteBttn, editBttn } from './assets';
import { AddOrganizationModal, RedOrganizationModal, AcceptModal } from './components/Modals';
import s from './style.module.scss';

export const OrganizationsPage: React.FC = () => {
  const dispath = useAppDispatch();
  const { organizations, isLoaded } = useAppSelector((state) => state.organizations);
  const { deleteProcesses, postProcesses, editProcesses } = useAppSelector(
    (state) => state.inProcess,
  );
  const { deleteArr } = useAppSelector((state) => state.inProcess);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isRedModalOpen, setIsRedModalOpen] = useState(false);
  const [isAcceptModalOpen, setIsAcceptModalOpen] = useState(false);
  const someOrg: Organization = { id: 0, name: '', address: '', INN: 0 };
  const [curOrg, setCurOrg] = useState(someOrg);
  const [curId, setCurId] = useState(0);
  const onAddClick = () => {
    setIsAddModalOpen(true);
  };
  const onRedClick = (org: Organization) => {
    setCurOrg(org);
    setIsRedModalOpen(true);
  };
  const onDeleteClick = (id: number) => {
    setCurId(id);
    setIsAcceptModalOpen(true);
  };
  const deleteOrg = () => {
    dispath(addToDeleteOrg(curId));
  };
  useEffect(() => {
    document.title = 'Organizations';
    if (!isLoaded) dispath(fetchOrganizations());
  }, [dispath, isLoaded]);
  return (
    <div className={s.orgscontainer} id="orgspage">
      {isAddModalOpen && (
        <AddOrganizationModal
          isOpen={isAddModalOpen}
          setIsOpen={setIsAddModalOpen}
          contId="#orgspage"
        />
      )}
      {isRedModalOpen && (
        <RedOrganizationModal
          isOpen={isRedModalOpen}
          setIsOpen={setIsRedModalOpen}
          contId="#orgspage"
          org={curOrg}
        />
      )}
      {isAcceptModalOpen && (
        <AcceptModal
          isOpen={isAcceptModalOpen}
          setIsOpen={setIsAcceptModalOpen}
          contId="#orgspage"
          action={deleteOrg}
        />
      )}
      <Header />
      <div className={s.buttons}>
        <button type="button" className={s.back}>
          <img src={arrowBack} alt="" />
          Back
        </button>
        <button type="button" className={s.add} onClick={onAddClick}>
          <img src={addBttn} alt="" />
          Add Organization
        </button>
      </div>
      <div className={s.table}>
        <div className={s.headtable}>
          <p>id</p>
          <p>name</p>
          <p>address</p>
          <p>INN</p>
          <p>Actions</p>
        </div>
        {organizations.map((org) => (
          <div key={org.id} className={deleteArr.includes(org.id) ? s.toDelete : ''}>
            <p>{org.id}</p>
            <p>{org.name}</p>
            <p>{org.address}</p>
            <p>{org.INN}</p>
            <p>
              <button type="button">
                <img src={arrowTo} alt="" />
              </button>
              <button type="button" onClick={() => onRedClick(org)}>
                <img src={editBttn} alt="" />
              </button>
              <button onClick={() => onDeleteClick(org.id)} type="button">
                <img src={deleteBttn} alt="" />
              </button>
            </p>
          </div>
        ))}
      </div>
      {postProcesses + deleteProcesses + editProcesses > 0 && (
        <div className={s.inProcess}>
          {postProcesses > 0 && <p>{`Posting posts: ${postProcesses}`}</p>}
          {deleteProcesses > 0 && <p>{`Deleting posts: ${deleteProcesses}`}</p>}
          {editProcesses > 0 && <p>{`Editing posts: ${editProcesses}`}</p>}
        </div>
      )}
    </div>
  );
};
