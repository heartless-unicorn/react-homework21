import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import style from "./styles/Login.module.css";

export default function LogIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [isLoged, setIsLoged] = useState(true);

  function handleSubmit(event) {
    event.preventDefault();
    const isStored = localStorage.getItem(email);
    const isValid = localStorage.getItem(`Password${email}`);
    if (JSON.parse(isStored) === null && isValid === password) {
      setIsLoged(false);
    } else {
      navigate("/userid");
    }
  }

  return (
    <div className={style.LogIn}>
      <div className={style.loginBox}>
        <div>
          <h1>Log in</h1>
        </div>
        <div>
          <form onSubmit={handleSubmit} className={style.form}>
            <input
              type="email"
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Email"
            ></input>
            <input
              type="password"
              minLength="8"
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Password"
            />

            <input type="submit" value="Log in" className={style.submit} />
          </form>
        </div>
        <div className={style.warning}>
          {isLoged ? null : <div> Invalid email or password</div>}
        </div>
        <div className={style.signup}>
          <Link to="/signup">Don`t have an account? Sign up</Link>
        </div>
      </div>
    </div>
  );
}
