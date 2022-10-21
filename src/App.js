import React from "react";
import ForgotPassword from "./components/Auth/ForgotPassword";
import { Redirect, Route, Switch } from "react-router-dom";
import Auth from "./components/Auth/Auth";
import { useSelector, useDispatch } from "react-redux";
import ComposeMail from "./components/MailBox/ComposeMail";
import MailStartingPage from "./components/MailStartingPage/MailStartingPage";
import Inbox from "./components/MailBox/Inbox";
import SentMail from "./components/MailBox/SentMail";
import Layout from "./components/MailStartingPage/Layout";
import InboxDetail from "./components/MailBox/InboxDetail";
import { authActions } from "./store/redux/authSlice";

const App = () => {
  const dispatch = useDispatch();
  dispatch(authActions.isLoginAuthenticated());
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  return (
    <Switch>
      <Route path="/auth" exact>
        <Auth />
      </Route>
      <Route path="/forgot-password">
        <ForgotPassword />
      </Route>
      {!isAuth && (
        <Route path="/">
          <Redirect to="/auth" />
        </Route>
      )}
      {isAuth && <Layout>
        <Route path="/compose-mail">
          <ComposeMail />
        </Route>

        <Route path="/inbox">
          <Inbox />
        </Route>

        <Route path="/sent-mail">
          <SentMail />
        </Route>
      </Layout>}
      ÷
    </Switch>
  );
};

export default App;
