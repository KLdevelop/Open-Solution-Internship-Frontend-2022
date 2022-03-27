import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';

import { HomePage, CounterPage, TodosPage, AuthPage } from 'Common/Pages';
import { CheckForAuth } from './components';
import s from './App.module.scss';

export const App: React.FC = () => {
  return (
    <div className={s.app}>
      <Router>
        <CheckForAuth />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/counter" element={<CounterPage />} />
          <Route path="/todos" element={<TodosPage />} />
          <Route path="/auth" element={<AuthPage />} />
        </Routes>
      </Router>
    </div>
  );
};
