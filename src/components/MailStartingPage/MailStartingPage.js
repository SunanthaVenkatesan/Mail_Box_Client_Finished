import React, { useState,useEffect } from "react";
import { Link, Route } from "react-router-dom";
import classes from "./MailStartingPage.module.css";
import { useDispatch, useSelector } from "react-redux/es/exports";
import { useHistory } from "react-router-dom";
import { authActions } from "../../store/redux/authSlice";

const MailStartingPage = () => {
    const loginEmail=useSelector((state)=>state.auth.loginEmail)
    console.log(loginEmail)
  
    const [unRead,setUnRead]=useState(0)

  const history = useHistory();
  const dispatch = useDispatch();
  //logout handler
  const logoutClickHandler = (event) => {
    event.preventDefault();
    
    dispatch(authActions.logout());
    history.replace("/auth");
  };
  //unread email count
  const emails=useSelector((state)=>state.inbox.emails)
  useEffect(() => {
    
    if (emails>0 ) {
      let count = 0;
      Object.keys(emails.emails).map((email) => {
        if (emails.emails[email].read === false) {
          count = count + 1;
          setUnRead(count);
        }
      
      });
    }
  }, [emails]);



  return (
    <>
      <header className="centered">
        <h2 className={classes.h2}>Mail<p style={{textDecoration:"underline"}}>{loginEmail}</p></h2>
        <hr />

       <button className={classes.button} onClick={logoutClickHandler}>
          LogOut
        </button>
      </header>
      <div className={classes.vl}>
        <section className={classes.mail}>
          <div>
            <h3 style={{ backgroundColor: "#777", padding: ".40rem" }}>
              <Link style={{ textDecoration: "none" }} to="/compose-mail">
                Compose
              </Link>
            </h3>
          </div>

          <div>
            <h4>
              <Link style={{ textDecoration: "none" }} to="/inbox">
                {/* Inbox ({unRead}) */}
                Inbox
              </Link>
             
            </h4>
           
          </div>
          <div>
            <h4>
              <Link style={{ textDecoration: "none" }} to="/sent-mail">
                Sent Items
              </Link>
            </h4>
          </div>
        </section>
      </div>
    </>
  );

  //return isAuth && history.replace("/compose-mail");
};

export default MailStartingPage;
