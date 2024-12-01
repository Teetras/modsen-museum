import React, { useEffect, useState } from "react";
import useDebounce from "../../utils/useDebounce";
import { fechArtByText } from "../../utils/api";
import MiniCard from "../miniCard/MiniCard";
import { sortArray } from "../../utils/sortUtil";
import iconSearch from "../../assets/search.svg";
import { searchSchema } from "../../constants/validation";
import * as yup from "yup";
import "./searchSection.css";

const SearchSection: React.FC = () => {
  const [sortField, setSortField] = useState("title");
  const [query, setQuery] = useState("");
  const [items, setItems] = useState<any[]>([]);
  const [filteredItems, setFilteredItems] = useState<any[]>([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const debouncedQuery = useDebounce(query, 1000);

  useEffect(() => {
    if (debouncedQuery) handleSearch();
  }, [debouncedQuery]);

  const fetchItems = async () => {
    try {
      setErrorMsg("");
      const response = await fechArtByText(debouncedQuery);
      const data = response.data;
      setItems(data);
      updateFilteredItems(data, sortField);
    } catch (error) {
      setErrorMsg("Error fetching data. Please try again." + error);
    }
  };

  const updateFilteredItems = (data: any[], sortKey: string) => {
    const sortedData = sortArray(data, sortKey);
    setFilteredItems(sortedData);
  };

  const handleSearch = async () => {
    try {
      await searchSchema.validate({ search: query });
      setErrorMsg("");
      await fetchItems();
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        setFilteredItems([]);
        setErrorMsg(error.message);
      } else {
        setErrorMsg("An unexpected error occurred.");
      }
    }
  };

  useEffect(() => {
    if (items.length) updateFilteredItems(items, sortField);
  }, [sortField, items]);

  useEffect(() => {
    setLoading(query.length > 0);
  }, [query]);

  return (
    <div className="search-section">
      <div className="title-container">
        <h1 className="main-title">
          Let&apos;s Find Some <span> Art </span> Here!
        </h1>
      </div>

      <div className="input-wrapper">
        <input
          className="search-input"
          type="text"
          placeholder="Search Art, Artists, Work..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleSearch}>
          <img src={iconSearch} alt="Search icon" className="search-icon" />
        </button>
      </div>

      {loading && (
        <div className="results">
          {errorMsg && <p className="error">{errorMsg}</p>}
          <div className="sorting">
            <label htmlFor="sort">Sort by:</label>
            <select
              id="sort"
              value={sortField}
              onChange={(e) => setSortField(e.target.value)}
            >
              <option value="title">Name</option>
              <option value="artist_title">Author</option>
            </select>
          </div>
          <div className="items">
            {filteredItems.map((item) => (
              <MiniCard key={item.id} art={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchSection;
