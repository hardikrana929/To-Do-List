import "./App.css";
import Todos from "./components/Todos";
import { ToastContainer } from "react-toastify";
function App() {
  return (
    <div className="container-fluid">
      <ToastContainer />
      <div className="row">
        {/* <div className="col-12">
          <img
            src="https://codeua.com/wp-content/uploads/2025/09/dizajn-bez-nazvi-7.png"
            alt="To-Do-Logo"
            className="image-logo"
          />
        </div> */}
        <div className="col-12">
          <Todos />
        </div>
      </div>
    </div>
  );
}

export default App;
