import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'Src/hooks';
import { fetchOrganizations, Organization } from 'Src/models/actions';
import { Header } from './components/Header';
import { arrowBack, addBttn, arrowTo, deleteBttn, editBttn } from './assets';
import s from './style.module.scss';

export const OrganizationsPage: React.FC = () => {
  const dispath = useAppDispatch();
  const organizations: Organization[] = useAppSelector(
    (state) => state.organizations.organizations,
  );
  useEffect(() => {
    document.title = 'Organizations';
    dispath(fetchOrganizations());
  }, [dispath]);
  return (
    <div className={s.orgscontainer}>
      <Header />
      <div className={s.buttons}>
        <button type="button" className={s.back}>
          <img src={arrowBack} alt="" />
          Back
        </button>
        <button type="button" className={s.add}>
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
          <div key={org.id}>
            <p>{org.id}</p>
            <p>{org.name}</p>
            <p>{org.address}</p>
            <p>{org.INN}</p>
            <p>
              <img src={arrowTo} alt="" />
              <img src={editBttn} alt="" />
              <img src={deleteBttn} alt="" />
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
