import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const BookDetails = () => {
  const { id } = useParams();
  const books = useSelector((state) => state.res.value.filter((item) => item.id === id.substring(1)));
  console.log("selector books", books);
  let thumbnail = books[0].volumeInfo.imageLinks && books[0].volumeInfo.imageLinks.smallThumbnail;
  return (
    <div
      className="flex flex-col mt-12 ml-20 mb-12 bg-zinc-200 shadow-lg 
           rounded-md w-4/6 p-3 pb-10"
    >
      <div className="basis-full">
        <h2 className="text-4xl font-semibold tracking-wider italic">{books[0].volumeInfo.title}</h2>
        <h3 className="text-2xl font-semibold tracking-wider italic pt-2">{books[0].volumeInfo.subtitle}</h3>
        <img className="p-5 w-64 mt-4" src={thumbnail} alt="#" />
      </div>
      <div className="mt-5">
        <h2 className="text-2xl font-semibold tracking-wider italic">Description</h2>
        <p className="center p-2">{books[0].volumeInfo.description}</p>
        <h2 className="text-2xl font-semibold tracking-wider italic">Author(s)</h2>
        <p className="p-2">
          {books[0].volumeInfo.authors.map((item) => (
            <p>{item}</p>
          ))}
        </p>
        <h2 className="text-2xl font-semibold tracking-wider italic">Genre</h2>
        <p className="p-2">{books[0].volumeInfo.categories}</p>
        <h2 className="text-2xl font-semibold tracking-wider italic">Publisher</h2>
        <p className="p-2">{books[0].volumeInfo.publisher}</p>
      </div>
      <Link to="/">
        <div className="flex font-semibold text-indigo-600 text-sm mt-10">
          <svg className="fill-current mr-2 text-indigo-600 w-4" viewBox="0 0 448 512">
            <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
          </svg>
          Continue Shopping
        </div>
      </Link>
    </div>
  );
};

export default BookDetails;
