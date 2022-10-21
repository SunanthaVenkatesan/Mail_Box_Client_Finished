import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import classes from "./InboxDetail.module.css";
import {  useHistory, Link } from "react-router-dom";
import { sentActions } from "../../store/redux/sentSlice";

const SentMailDetail = (props) => {
  //console.log(`inside inboxdetailed`);
  const dispatch = useDispatch();
 

  const emails = useSelector((state) => state.sent.emails);
  const loginEmail = useSelector((state) => state.auth.loginEmail);

  const emailDetailKey = props.emailDetails.emailDetail;

  dispatch(sentActions.onEmailRead(emailDetailKey));

  //console.log(emails[emailDetailKey]);

  useEffect(() => {
    const formattedLoggedInEmail = loginEmail.replace(/[^a-zA-Z0-9]/g, "");
    //console.log(formattedLoggedInEmail)
    const emailRead = async () => {
      try {
        const response = await axios.put(
          `https://mailboxclient-9815a-default-rtdb.firebaseio.com/${formattedLoggedInEmail}/SentMail/${emailDetailKey}.json`,
          emails[emailDetailKey]
        );
        //console.log(emails[emailDetailKey]);
        //console.log(response)
      } catch (err) {
        console.log(`error occurred`, err);
      }
    };

    emailRead();
  }, [emailDetailKey]);

  return (
    <>
      <Link to="/mail-page">Back</Link>
      <section className={classes.detail}>
        <div className={classes.div}>To: {emails[emailDetailKey].to}</div>
        <div className={classes.div}>
          Subject: {emails[emailDetailKey].subject}
        </div>
        <div
          style={{
            textAlign: "center",
            marginTop: "4rem",
            color: "black",
            fontSize: "20px",
          }}
        >
          {emails[emailDetailKey].body}
        </div>
      </section>
    </>
  );
};

export default SentMailDetail;
