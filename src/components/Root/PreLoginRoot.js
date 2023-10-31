import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { HOME } from '../../constants/ROUTES';
import { Toast } from '../Toast/Toast';

export function PreLoginRoot() {
  const { sessionObj } = useSelector((state) => state.userSession);

  const navigate = useNavigate();

  useEffect(() => {
    if (sessionObj.isVerified) {
      navigate(HOME);
    }
  }, [navigate, sessionObj.isVerified]);
  return (
    <>
      <Toast />
      <Outlet />
    </>
  );
}
