import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import MailStartingPage from './MailStartingPage';
import { Link } from 'react-router-dom';

const Layout = (props) => {
const isAuth = useSelector((state) => state.auth.isAuthenticated);
  return (
    <Fragment>
        
      {isAuth && 
     <MailStartingPage />
      }
      <main>{props.children}</main>
    </Fragment>
  );
};

export default Layout;