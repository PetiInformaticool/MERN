import { toast } from 'react-toastify';
import { logout } from '.'

export const catchHandler = (navigate, e) => {
  console.log(e.msg)
  toast(e.msg);
  if (e.msg === "Authentication token expired") {
    logout();
    navigate("/login")
  }
}
