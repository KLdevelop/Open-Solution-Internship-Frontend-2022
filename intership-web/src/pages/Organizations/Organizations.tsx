import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'Src/hooks';
import { addToDeleteOrg, fetchOrganizations, Organization } from 'Src/models/actions';
import { Header } from './components/Header';
import { AddOrganizationModal, RedOrganizationModal, AcceptModal } from './components/Modals';
import { Table } from './components/Table';
import { arrowBack, addBttn } from './assets';
import s from './style.module.scss';

export const OrganizationsPage: React.FC = () => {
  const dispath = useAppDispatch();
  const { organizations, isLoaded } = useAppSelector((state) => state.organizations);
  const { deleteProcesses, postProcesses, editProcesses, deleteArr } = useAppSelector(
    (state) => state.orgInProcess,
  );
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
    <div className={s.orgscontainer}>
      {isAddModalOpen && (
        <AddOrganizationModal isOpen={isAddModalOpen} setIsOpen={setIsAddModalOpen} />
      )}
      {isRedModalOpen && (
        <RedOrganizationModal isOpen={isRedModalOpen} setIsOpen={setIsRedModalOpen} org={curOrg} />
      )}
      {isAcceptModalOpen && (
        <AcceptModal
          isOpen={isAcceptModalOpen}
          setIsOpen={setIsAcceptModalOpen}
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
      <Table
        tablehead={['id', 'name', 'address', 'INN', 'Actions']}
        tablelist={organizations}
        deleteArr={deleteArr}
        onRedClick={onRedClick}
        onDeleteClick={onDeleteClick}
      />
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
