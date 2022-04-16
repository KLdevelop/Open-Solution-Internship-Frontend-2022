import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'Src/hooks';
import { addToDeleteEmp, fetchEmployees, Employee } from 'Src/models/actions';
import { Header } from './components/Header';
import { AddEmployeeModal, RedEmployeeModal, AcceptModal } from './components/Modals';
import { Table } from './components/Table';
import { arrowBack, addBttn } from './assets';
import s from './style.module.scss';

export const EmployeesPage: React.FC = () => {
  const navigate = useNavigate();
  const dispath = useAppDispatch();
  const { employees } = useAppSelector((state) => state.employees);
  const { deleteProcesses, postProcesses, editProcesses, deleteArr } = useAppSelector(
    (state) => state.empInProcess,
  );
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isRedModalOpen, setIsRedModalOpen] = useState(false);
  const [isAcceptModalOpen, setIsAcceptModalOpen] = useState(false);
  const { orgid, divid } = useParams();
  const someDiv: Employee = { id: 0, id_division: +divid!, FIO: '', address: '', position: '' };
  const [curEmp, setCurEmp] = useState(someDiv);
  const [curId, setCurId] = useState(0);
  const onAddClick = () => {
    setIsAddModalOpen(true);
  };
  const onBackClick = () => {
    navigate(`/organizations/${orgid}`);
  };
  const onRedClick = (div: Employee) => {
    setCurEmp(div);
    setIsRedModalOpen(true);
  };
  const onDeleteClick = (id: number) => {
    setCurId(id);
    setIsAcceptModalOpen(true);
  };
  const deleteOrg = () => {
    dispath(addToDeleteEmp(curId));
  };
  useEffect(() => {
    document.title = 'Employees';
    dispath(fetchEmployees(+divid!));
  }, [dispath, divid]);
  return (
    <div className={s.orgscontainer}>
      {isAddModalOpen && (
        <AddEmployeeModal
          isOpen={isAddModalOpen}
          setIsOpen={setIsAddModalOpen}
          idDivision={+divid!}
        />
      )}
      {isRedModalOpen && (
        <RedEmployeeModal isOpen={isRedModalOpen} setIsOpen={setIsRedModalOpen} emp={curEmp} />
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
        <button type="button" className={s.back} onClick={onBackClick}>
          <img src={arrowBack} alt="" />
          Back
        </button>
        <button type="button" className={s.add} onClick={onAddClick}>
          <img src={addBttn} alt="" />
          Add Employee
        </button>
      </div>
      <Table
        tablehead={['id', 'id_division', 'FIO', 'address', 'position', 'Actions']}
        tablelist={employees}
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
