import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { inboxActions } from "../../store/redux/inboxSlice";
import classes from "./InboxDetail.module.css";
import { Redirect, useHistory, Link } from "react-router-dom";

const InboxDetail = (props) => {
  //console.log(`inside inboxdetailed`);
  const dispatch = useDispatch();
  const history = useHistory();

  const emails = useSelector((state) => state.inbox.emails);
  const loginEmail = useSelector((state) => state.auth.loginEmail);

  const emailDetailKey = props.emailDetails.emailDetail;

  dispatch(inboxActions.onEmailRead(emailDetailKey));

  //console.log(emails[emailDetailKey]);

  useEffect(() => {
    const formattedLoggedInEmail = loginEmail.replace(/[^a-zA-Z0-9]/g, "");
    //console.log(formattedLoggedInEmail)
    const emailRead = async () => {
      try {
        const response = await axios.put(
          `https://mailboxclient-9815a-default-rtdb.firebaseio.com/${formattedLoggedInEmail}/Inbox/${emailDetailKey}.json`,
          emails[emailDetailKey]
        );
        //console.log(emails[emailDetailKey]);
        //console.log(response)
      } catch (err) {
        console.log(`error occurred`, err);
      }
    };

    emailRead();
  }, []);

  return (
    <>
      <Link to="/mail-page">Back</Link>
      <section className={classes.detail}>
        <div className={classes.div}>From: {emails[emailDetailKey].from}</div>
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

export default InboxDetail;
