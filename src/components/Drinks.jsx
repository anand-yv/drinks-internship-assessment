import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const Drinks = () => {
  const [beers, setBeers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredBeers, setFilteredBeers] = useState([]);

  useEffect(() => {
    axios
      .get("https://api.punkapi.com/v2/beers")
      .then((response) => {
        setBeers(response.data);
        setFilteredBeers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const searchTermLower = searchTerm.toLowerCase();
    const filtered = beers.filter((beer) =>
      beer.name.toLowerCase().startsWith(searchTermLower)
    );
    setFilteredBeers(filtered);
  };

  return (
    <div>
      <form class="mt-10 max-w-md mx-auto">
        <label
          for="default-search"
          class="mb-2 text-sm font-medium text-gray-900 sr-only"
        >
          Search
        </label>
        <div class="relative">
          <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search for a beer..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            id="default-search"
            className="block w-full p-4 ps-10 text-sm text-gray-700 border border-gray-300 rounded-lg bg-gray-50 focus:border-gray-500"
            required
          />
          <button
            type="submit"
            onClick={(e) => handleSearch(e)}
            className="text-white absolute end-2.5 bottom-2.5 bg-gray-500 hover:bg-gray-600 font-medium rounded-lg text-sm px-4 py-2"
          >
            Search
          </button>
        </div>
      </form>

      <div className="mt-10 mb-10 flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:gird-cols-5 gap-5">
          {filteredBeers.map((beer) => (
            <div
              className="max-w-sm bg-white border border-gray-200 rounded-lg shadow"
              key={beer.id}
            >
              <a href="/" className="flex justify-center pt-4">
                <img
                  className="rounded-t-lg h-60"
                  src={beer.image_url}
                  alt={beer.name}
                />
              </a>
              <div className="p-5">
                <a href="#">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                    {beer.name}
                  </h5>
                </a>
                <p className="mb-3 font-normal text-gray-700">{beer.tagline}</p>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-500">
                  {beer.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Drinks;
