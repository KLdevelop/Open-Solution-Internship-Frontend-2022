import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from 'Src/hooks';

export function CheckForAuth({ children }: { children: JSX.Element }) {
  const { isLogin } = useAppSelector((state) => state.auth);

  if (!isLogin) {
    return <Navigate to="/auth" />;
  }

  return children;
}
