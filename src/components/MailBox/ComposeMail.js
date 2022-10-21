import { useRef } from "react";
import { Editor } from "react-draft-wysiwyg";
import classes from "./ComposeMail.module.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux/es/exports";
import { useHistory } from "react-router-dom";

const ComposeMail = () => {
  const history = useHistory();

  const loginEmail = useSelector((state) => state.auth.loginEmail);

  console.log("loggedin Email:", loginEmail);

  const enteredToInputRef = useRef();
  const enteredSubjectInputRef = useRef();
  let bodyText;

  const onEditorStateChange = (event) => {
    bodyText = event.getCurrentContent().getPlainText();
  };

  const onSendClickHandler = async () => {
    const enteredTo = enteredToInputRef.current.value;
    const enteredSubject = enteredSubjectInputRef.current.value;

    const inboxMailDataObj = {
      from: loginEmail,
      subject: enteredSubject,
      body: bodyText,
      read: false,
    };
    const sentMailDataObj = {
      to: enteredTo,
      subject: enteredSubject,
      body: bodyText,
    };
    //This regular expression replaces all starting and trailing non alphanumeric characters from the string.

    const toFormattedEmail = enteredTo.replace(/[^a-zA-Z0-9]/g, "");

    try {
      const response = await axios.post(
        `https://mailboxclient-9815a-default-rtdb.firebaseio.com/${toFormattedEmail}/Inbox.json`,
        inboxMailDataObj
      );

      console.log(response);

      const formattedLoggedInEmail = loginEmail.replace(/[^a-zA-Z0-9]/g, "");

      const sentResponse = await axios.post(
        `https://mailboxclient-9815a-default-rtdb.firebaseio.com/${formattedLoggedInEmail}/SentMail.json`,
        sentMailDataObj
      );

      console.log(sentResponse);
    } catch (err) {
      console.log(err);
    }
    enteredToInputRef.current.value = null;
    enteredSubjectInputRef.current.value = null;
    alert("Email-Sent Successfully!!");

    history.replace("/mail-page");
  };
  return (
    <>
      <section>
        <div className={classes.control}>
          <span>
            To
            <input type="email" ref={enteredToInputRef} />
          </span>
        </div>
        <hr />

        <div className={classes.control}>
          <input
            type="text"
            placeholder="subject"
            ref={enteredSubjectInputRef}
          />
        </div>
        <hr />
        <div className={classes.editor}>
          <Editor onEditorStateChange={onEditorStateChange} />
        </div>
        <hr />
        <div className={classes.actions}>
          <button onClick={onSendClickHandler}>Send</button>
        </div>
      </section>
    </>
  );
};

export default ComposeMail;
