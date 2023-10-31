import { Route, BrowserRouter, Routes } from 'react-router-dom';
import React from 'react';
import { NotFoundPage } from '../../features/notfound/NotFoundPage';
import { Root } from '../Root/Root';
import { CounterNum } from '../../features/counter-num/Counter';
import { SignInPage } from '../../features/prelogin/SignInPage';
import { HomePage } from '../../features/home/HomePage';
import { StoresPage } from '../../features/store/StoresPage';
import { BranchesPage } from '../../features/branch/BranchesPage';
import { TodoApp } from '../../features/todo/Todo';
import { ForgotPassPage } from '../../features/forgot-pass/ForgotPassPage';
import { RegistrationPage } from '../../features/registration/RegistrationPage';
import { ResetPassPage } from '../../features/reset-pass/ResetPassPage';
import { PreLoginRoot } from '../Root/PreLoginRoot';
import {
  BRANCHES,
  COUNTERNUM,
  FORGOTPASS,
  HOME,
  PRELOGIN,
  REGISTER,
  RESETPASS,
  SIGNIN,
  STORES,
  TODO,
} from '../../constants/ROUTES';
import { TestPage } from '../../features/test/TestPage';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Root />}>
          <Route path={HOME} element={<HomePage />} />
          <Route path={COUNTERNUM} element={<CounterNum />} />
          <Route path={TODO} element={<TodoApp />} />
          <Route path={STORES} element={<StoresPage />} />
          <Route
            path={`${STORES}/:storeId${BRANCHES}`}
            element={<BranchesPage />}
          />
          <Route path={RESETPASS} element={<ResetPassPage />} />
        </Route>
        <Route path={PRELOGIN} element={<PreLoginRoot />}>
          <Route path={PRELOGIN} element={<SignInPage />} />
          <Route path={SIGNIN} element={<SignInPage />} />
          <Route path={FORGOTPASS} element={<ForgotPassPage />} />
          <Route path={REGISTER} element={<RegistrationPage />} />
        </Route>
        <Route path="/test" element={<TestPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
