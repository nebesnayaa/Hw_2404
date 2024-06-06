import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import Auth from "./components/pages/Auth";
import Register from "./components/pages/Register";
import Navbar from "./components/pages/Nabvar";
import NotFoundPage from "./components/pages/NotFoundPage";
import CreateCategory from "./components/pages/CreateCategory";
// import EditCategory from "./components/pages/EditCategory";
import "./App.css";
import CategoriesPage from "./components/pages/CategoriesPage";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route index element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create_category" element={<CreateCategory/>} />
          <Route path="/categories" element={<CategoriesPage/>} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
export default App;
