import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'Src/hooks';
import { addToDeleteDiv, fetchDivisions, Division } from 'Src/models/actions';
import {
  AddDivisionModal,
  RedDivisionModal,
  AcceptModal,
  Header,
  Table,
  TrackProcesses,
  HeadButtons,
} from './components';
import s from './style.module.scss';

export const DivisionsPage: React.FC = () => {
  const navigate = useNavigate();
  const dispath = useAppDispatch();
  const { divisions } = useAppSelector((state) => state.divisions);
  const { deleteProcesses, postProcesses, editProcesses, deleteArr } = useAppSelector(
    (state) => state.divInProcess,
  );
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isRedModalOpen, setIsRedModalOpen] = useState(false);
  const [isAcceptModalOpen, setIsAcceptModalOpen] = useState(false);
  const { orgid } = useParams();
  const someDiv: Division = { id: 0, id_organization: +orgid!, name: '', phone: 0 };
  const [curDiv, setCurDiv] = useState(someDiv);
  const [curId, setCurId] = useState(0);
  const onAddClick = () => {
    setIsAddModalOpen(true);
  };
  const onBackClick = () => {
    navigate('/organizations');
  };
  const onRedClick = (div: Division) => {
    setCurDiv(div);
    setIsRedModalOpen(true);
  };
  const onDeleteClick = (id: number) => {
    setCurId(id);
    setIsAcceptModalOpen(true);
  };
  const deleteOrg = () => {
    dispath(addToDeleteDiv(curId));
  };
  useEffect(() => {
    document.title = 'Divisions';
    dispath(fetchDivisions(+orgid!));
  }, [dispath, orgid]);
  return (
    <div className={s.orgscontainer}>
      {isAddModalOpen && (
        <AddDivisionModal
          isOpen={isAddModalOpen}
          setIsOpen={setIsAddModalOpen}
          idOrganization={+orgid!}
        />
      )}
      {isRedModalOpen && (
        <RedDivisionModal isOpen={isRedModalOpen} setIsOpen={setIsRedModalOpen} div={curDiv} />
      )}
      {isAcceptModalOpen && (
        <AcceptModal
          isOpen={isAcceptModalOpen}
          setIsOpen={setIsAcceptModalOpen}
          action={deleteOrg}
        />
      )}
      <Header past="Organizations" title="Divisions" next="Employees" />
      <HeadButtons onAddClick={onAddClick} onBackClick={onBackClick} addItem="Division" />
      <Table
        tablehead={['id', 'id_organization', 'name', 'phone', 'Actions']}
        tablelist={divisions}
        deleteArr={deleteArr}
        onRedClick={onRedClick}
        onDeleteClick={onDeleteClick}
      />
      <TrackProcesses
        postProcesses={postProcesses}
        deleteProcesses={deleteProcesses}
        editProcesses={editProcesses}
      />
    </div>
  );
};
