import axios from "axios";
import { Login } from "./LogIn";

export function LogoutLink() {
  const handleClick = (event) => {
    event.preventDefault();
    delete axios.defaults.headers.common["Authorization"];
    localStorage.removeItem("jwt");
    window.location.href = "/login";
  };

  return (
    <a href="/login" onClick={handleClick}>
      Log Out
    </a>
  );
}
