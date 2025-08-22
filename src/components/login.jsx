// src/components/Login.js
import { useState } from "react";
import { LiaEyeSlashSolid, LiaEyeSolid } from "react-icons/lia";
import { useDispatch } from "react-redux";
import { login } from "../redux/actions/authActions";

function Login() {
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  function handleClick() {
    setOpen((prev) => !prev);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (username && password) {
      // Lưu username vào sessionStorage
      sessionStorage.setItem("username", username);
      // Dispatch action login
      dispatch(login(username));
    } else {
      alert("Vui lòng nhập tên và mật khẩu!");
    }
  }

  return (
    <div className="login">
      <h1>Đăng nhập</h1>
      <form className="form-container" onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="text"
            placeholder="Nhập tên"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="input-group password-group">
          <input
            type={open ? "text" : "password"}
            placeholder="Nhập mật khẩu"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="button" className="btn-open-password" onClick={handleClick}>
            {open ? <LiaEyeSlashSolid /> : <LiaEyeSolid />}
          </button>
        </div>
        <button type="submit" className="btn-submit">
          Đăng nhập
        </button>
      </form>
    </div>
  );
}

export default Login;