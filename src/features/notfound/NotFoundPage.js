import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { HOME, SIGNIN } from '../../constants/ROUTES';

export const NotFoundPage = () => {
  const { sessionObj } = useSelector((state) => state.userSession);

  const navigate = useNavigate();

  useEffect(() => {
    if (sessionObj.isVerified) {
      navigate(HOME);
    } else {
      navigate(SIGNIN);
    }
  }, [navigate, sessionObj.isVerified]);

  return <main className="pageNotFound">Loading ...</main>;
};
