import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import Register from "./components/pages/Register";
import Navbar from "./components/pages/Navbar";
import Navbar2 from "./components/pages/Navbar2.tsx";
import NotFoundPage from "./components/pages/NotFoundPage";
import Create from "./components/pages/Create.tsx";
import Order from "./components/pages/Order.tsx";
import Login from "./components/pages/Login.tsx";
import "./App.css";
const App = () => {
  const isLoggedIn = localStorage.getItem('loggedIn') === 'true';

  return (
    <>
      <BrowserRouter>
        {isLoggedIn ? <Navbar2 /> : <Navbar />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route index element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create" element={<Create />} />
          <Route path="/order" element={<Order />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
export default App;