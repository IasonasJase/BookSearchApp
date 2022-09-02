import "./App.css";
import Main from "./Components/Main";
import { Routes, Route } from "react-router-dom";
import BookDetails from "./Components/BookDetails";
import Cart from "./Components/Cart";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/book/:id" element={<BookDetails />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
