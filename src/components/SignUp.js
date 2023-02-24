import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import style from "./styles/SignUp.module.css";
export default function SignUp() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [isSigned, setisSigned] = useState(false);
  const validName = /^[a-zA-Z0-9А-Яа-я]{3,}$/;
  const validPassword = /^(?=.*[a-z]+.*)(?=.*[A-Z]+.*)[0-9a-zA-Z]{8,}$/;
  const validEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,}$/;

  function handleSubmit(event) {
    event.preventDefault();
    const isEverythingValid =
      validPassword.test(password) &&
      validName.test(firstName) &&
      validName.test(lastName) &&
      validEmail.test(email);

    const isStored = localStorage.getItem(email);

    if (isEverythingValid) {
      if (JSON.parse(isStored) === null) {
        localStorage.setItem(email, JSON.stringify(email));
        localStorage.setItem(`Password${email}`, JSON.stringify(password));
        localStorage.setItem(`FirstName${email}`, JSON.stringify(firstName));
        localStorage.setItem(`LastName${email}`, JSON.stringify(lastName));
      } else {
        setisSigned(true);
        return;
      }

      navigate("/userid");
    }
  }

  return (
    <div className={style.SignUp}>
      <div className={style["signup-box"]}>
        <div>
          <h1>Create account</h1>
        </div>
        <div>
          <form onSubmit={handleSubmit} className={style.form}>
            <label>
              <input
                placeholder="First name"
                type="text"
                onChange={(event) => setFirstName(event.target.value)}
                className={
                  firstName.length < 1
                    ? style["default"]
                    : validName.test(firstName)
                    ? style["valid"]
                    : style["not-valid"]
                }
              />
              {firstName.length > 1 && !validName.test(firstName) ? (
                <span>Name should have at least 3 characters</span>
              ) : null}
            </label>
            <label>
              <input
                placeholder="Last name"
                type="text"
                onChange={(event) => setLastName(event.target.value)}
                className={
                  lastName.length < 1
                    ? style["default"]
                    : validName.test(lastName)
                    ? style["valid"]
                    : style["not-valid"]
                }
              />
              {lastName.length > 1 && !validName.test(lastName) ? (
                <span>Name should have at least 3 characters</span>
              ) : null}
            </label>
            <label>
              <input
                placeholder="Email adress"
                type="email"
                onChange={(event) => setEmail(event.target.value)}
                className={
                  email === null
                    ? style["default"]
                    : validEmail.test(email)
                    ? style["valid"]
                    : style["not-valid"]
                }
              />
              {email && !validEmail.test(email) ? (
                <span>Invalid email</span>
              ) : null}
            </label>
            <label>
              <input
                placeholder=" Password"
                type="password"
                minLength="8"
                onChange={(event) => setPassword(event.target.value)}
                className={
                  password === null
                    ? style["default"]
                    : validPassword.test(password)
                    ? style["valid"]
                    : style["not-valid"]
                }
              />
              {password && !validPassword.test(password) ? (
                <span>
                  Password shoud be at least 8 digit long and have an uppercase
                  and lowercase letter
                </span>
              ) : null}
            </label>

            <input type="submit" value="Sign up" className={style.submit} />
          </form>
        </div>
        <div className={style.warning}>
          {isSigned ? <div>This email already exists</div> : null}
        </div>
        <div className={style.login}>
          <Link to="/login">Already have an account? Log in</Link>
        </div>
      </div>
    </div>
  );
}
