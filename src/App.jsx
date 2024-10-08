import { createContext } from "react";
import useRoutesCustom from "./hooks/useRoutesCustom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from "./components/ThemeContext";

export const NotificationContext = createContext();

function App() {
  const handleNotification = (content, type = "success") =>
    toast[type](content, {
      position: "top-right",
      autoClose: 3000,
      pauseOnHover: true,
      hideProgressBar: false,
      theme: "colored",
    });

  const routes = useRoutesCustom();
  return (
    <ThemeProvider>
      <NotificationContext.Provider value={{ handleNotification }}>
        {routes}
        <ToastContainer />
      </NotificationContext.Provider>
    </ThemeProvider>
  );
}

export default App;
