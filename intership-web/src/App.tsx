import React from 'react';
import { Route, Routes, BrowserRouter as Router, Navigate } from 'react-router-dom';

import { OrganizationsPage, AuthPage, DivisionsPage } from 'Common/Pages';
import { CheckForAuth } from './components';
import s from './App.module.scss';
import { EmployeesPage } from './pages/Organizations';

export const App: React.FC = () => {
  return (
    <div className={s.app}>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/organizations" />} />
          <Route
            path="/organizations"
            element={
              <CheckForAuth>
                <OrganizationsPage />
              </CheckForAuth>
            }
          />
          <Route
            path="/organizations/:orgid"
            element={
              <CheckForAuth>
                <DivisionsPage />
              </CheckForAuth>
            }
          />
          <Route
            path="/organizations/:orgid/:divid"
            element={
              <CheckForAuth>
                <EmployeesPage />
              </CheckForAuth>
            }
          />
          <Route path="/auth" element={<AuthPage />} />
        </Routes>
      </Router>
    </div>
  );
};
