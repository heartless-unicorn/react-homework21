import { Route, Navigate, Routes as InitialRoutes } from "react-router-dom";
import LogIn from "../components/LogIn";
import LoggedUser from "../components/LoggedUser";
import SignUp from "../components/SignUp";
export default function Routes() {
  return (
    <div>
      <InitialRoutes>
        <Route path="/" element={<Navigate to="/login" />}></Route>
        <Route path="/login" element={<LogIn />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/userid" element={<LoggedUser />}></Route>
      </InitialRoutes>
    </div>
  );
}
