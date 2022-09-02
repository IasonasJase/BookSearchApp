import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "./Card";
import axios from "axios";
import { getBooks } from "../features/resSlice";

const Main = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const books = useSelector((state) => state.res.value) || [];

  const searchBook = (evt) => {
    if (evt.key === "Enter") {
      dispatch(getBooks({ search }));
      axios
        .get(
          "https://www.googleapis.com/books/v1/volumes?q=" +
            search +
            "&key=AIzaSyB-BhfMivV1lWNG8H1RJ8_r3mDCws0GTIw" +
            "&maxResults=20"
        )
        .then((res) => {})
        .catch((err) => console.log(err));
      setSearch("");
    }
  };

  return (
    <div
      className={books.length >= 1 ? "h-screen flex flex-col" : "h-screen flex flex-col justify-center items-center"}
    >
      <div className="flex flex-col mt-12">
        <div className="flex justify-center ">
          <h1 className="w-full text-center italic text-3xl font-semibold tracking-wider text-white">
            The library is inhabited by spirits that come out of the pages at night
          </h1>
        </div>
        <div className="mt-16 ml-4 flex flex-col items-center">
          <label className="block mb-2 text-sm font-medium text-red-100 dark:text-gray-300">Find your book</label>
          <input
            className="bg-blue-50 border border-blue-400 text-gray-600 text-sm rounded-lg
               focus:border-blue-600 block w-2/12 p-2.5 dark:bg-gray-700
               placeholder-gray-300 dark:text-white focus:outline-none focus:bg-white"
            type="text"
            placeholder="Enter Your Book Name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyPress={searchBook}
          />
        </div>
        <img src="./images/bg2.png" alt="" />
      </div>

      <div className="container">
        <Card book={books} />
      </div>
    </div>
  );
};

export default Main;
