import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import BeerCard from "./BeerCard";
import SearchBox from "./SearchBox";

const Beers = () => {
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
      <SearchBox
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleSearch={handleSearch}
      />

      <div className="mt-10 mb-10 flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:gird-cols-5 gap-5">
          {filteredBeers.map((beer) => (
            <BeerCard key={beer.id} beer={beer} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Beers;
