import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { sentActions } from "../../store/redux/sentSlice";

import classes from "./SentMail.module.css";
import SentMailDetail from "./SentMailDetail";

const Inbox = () => {   
  const history = useHistory();
  const [emailDetail, setEmailDetail] = useState(false);

  const loginEmail = useSelector((state) => state.auth.loginEmail);

  const formattedLoggedInEmail = loginEmail.replace(/[^a-zA-Z0-9]/g, "");

  const emails = useSelector((state) => state.sent.emails);

  const dispatch = useDispatch();

  const getEmails = useCallback(async () => {
    try {
      const response = await axios.get(
        `https://mailboxclient-9815a-default-rtdb.firebaseio.com/${formattedLoggedInEmail}/SentMail.json`
      );

      //console.log(response.data);

      dispatch(sentActions.onEmailSend(response.data));
    } catch (err) {
      console.log(err);
    }
  }, [dispatch, formattedLoggedInEmail]);
  useEffect(() => {
    getEmails();
  }, [getEmails]);
  const onSingleEmailClickHandler = (email) => {
    setEmailDetail(email);
  };

  const deleteEmailHandler = async (email) => {
    console.log(email);
    alert("Are you sure in deleting???");

    try {
      const res = await axios.delete(
        `https://mailboxclient-9815a-default-rtdb.firebaseio.com/${formattedLoggedInEmail}/SentMail/${email}.json`
      );

      console.log(res);
      getEmails();
      alert("E-mail successfully deleted");
      history.replace("/mail-page");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className={classes.sent}>
        <h2>Sent Items</h2>
        <hr />
        <ul>
          {!emailDetail && emails !== null &&
            Object.keys(emails).map((email) => {
              let read = false;
              if (emails[email].read !== false) {
                read = true;
              }
              return (
                <div onClick={() => onSingleEmailClickHandler(email)}>
                  <li key={email.id}>
                    <span>
                      <span
                        style={{
                          marginRight: "1rem",
                          color: "purple",
                          fontWeight: "bolder",
                          textDecoration: "underline",
                        }}
                      >
                        {" "}
                        {emails[email].to}
                      </span>
                      <span
                        style={{
                          marginRight: "1rem",
                          color: "#rgb(57, 53, 53)",
                          fontWeight: "normal",
                        }}
                      >
                        {emails[email].subject}
                      </span>
                      <span style={{ color: "#777", fontWeight: "normal" }}>
                        {emails[email].body}
                      </span>
                    </span>
                    <button onClick={() => deleteEmailHandler(email)}>X</button>
                  </li>
                  <hr />
                </div>
              );
            })}
            {emailDetail && (
           
           <SentMailDetail emailDetails={{ emailDetail, emails }} />
          
         )}

          {emails === null && <p style={{textAlign:'center'}}>No emails found</p>}
        </ul>
      </div>
    </>
  );
};

export default Inbox;
