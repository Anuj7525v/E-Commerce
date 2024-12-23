import {Outlet} from "react-router-dom";
import  Navigation  from "./pages/Auth/Navigation";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
    <ToastContainer />
    <Navigation />
    <index className="py-3">
      <Outlet />
    </index>
  </>
    
    
    
  );
}

export default App;
