import "./App.css";
import Main from "./Components/Main";
import { Routes, Route } from "react-router-dom";
import BookDetails from "./Components/BookDetails";
import Cart from "./Components/Cart";
import Navbar from "./Components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/book/:id" element={<BookDetails />} />
      </Routes>
    </>
  );
}

export default App;
