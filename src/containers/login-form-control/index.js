import React, { useState, useCallback, useEffect } from "react";
import PageLayout from "../../components/page-layout";
import LoginForm from "../../components/login-form";
import useStore from "../../hooks/use-store";
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";

function LoginFormControl() {
  const store = useStore();
  const { t } = useTranslate();

  const select = useSelector((state) => ({
    user: state.authentication.user,
    token: state.authentication.token,
    isAuth: state.authentication.isAuth,
    errorMessage: state.authentication.errorMessage,
    waiting: state.authentication.waiting,
  }));

  const [fields, setFields] = useState({
    login: "test_1",
    password: "123456",
  });

  const callbacks = {
    onChangeLogin: useCallback(
      (value) => {
        setFields({ ...fields, login: value });
      },
      [fields]
    ),
    onChangePassword: useCallback(
      (value) => {
        setFields({ ...fields, password: value });
      },
      [fields]
    ),
    handleFetchLogin: useCallback(() => {
      if (fields.login && fields.password) {
        store.actions.authentication.signIn(fields.login, fields.password);
      }
    }, [fields]),
  };

   useEffect(() => {
     store.actions.authentication.clearErrorMessage();
   }, []);

  return (
    //<PageLayout>
    <LoginForm
      onChangeLogin={callbacks.onChangeLogin}
      onChangePassword={callbacks.onChangePassword}
      handleFetchLogin={callbacks.handleFetchLogin}
      errorMessage={select.errorMessage}
      t={t}
    />
    // </PageLayout>
  );
}

export default React.memo(LoginFormControl);
