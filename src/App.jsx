// src/App.js
import "./itemcar.css"; // Giữ nguyên import CSS
import Itemcart from "./components/Itemcart";
import Login from "./components/login";
import { useSelector } from "react-redux"; // Sử dụng react-redux để connect
import "./login.css";
function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  return <>{!isLoggedIn ? <Login /> : <Itemcart />}</>;
}

export default App;
