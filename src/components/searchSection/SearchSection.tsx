import React, { useEffect, useState, useCallback } from "react";
import useDebounce from "../../utils/useDebounce";
import MiniCard from "../miniCard/MiniCard";
import iconSearch from "../../assets/search.svg";
import "./searchSection.css";
import { Artwork } from "../../types/interfaces";
import { handleSearch, updateFilteredItemsList } from "../../utils/searchUtils";

const SearchSection: React.FC = () => {
  const [sortField, setSortField] = useState<string>("title");
  const [query, setQuery] = useState<string>("");
  const [items, setItems] = useState<Artwork[]>([]);
  const [filteredItems, setFilteredItems] = useState<Artwork[]>([]);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const debouncedQuery = useDebounce(query, 1000);

  const memoizedHandleSearch = useCallback(() => {
    handleSearch(
      debouncedQuery,
      sortField,
      setItems,
      setErrorMsg,
      setFilteredItems,
    );
  }, [debouncedQuery, sortField]);

  useEffect(() => {
    if (debouncedQuery) memoizedHandleSearch();
  }, [debouncedQuery, memoizedHandleSearch]);

  useEffect(() => {
    if (items.length) {
      updateFilteredItemsList(items, sortField, setFilteredItems);
    }
  }, [sortField, items]);

  useEffect(() => {
    setLoading(query.length > 0);
  }, [query]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortField(e.target.value);
  };

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
          onChange={handleInputChange}
        />
        <button onClick={memoizedHandleSearch}>
          <img src={iconSearch} alt="Search icon" className="search-icon" />
        </button>
      </div>

      {loading && (
        <div className="results">
          {errorMsg && <p className="error">{errorMsg}</p>}
          <div className="sorting">
            <label htmlFor="sort">Sort by:</label>
            <select id="sort" value={sortField} onChange={handleSortChange}>
              <option value="title">Name</option>
              <option value="artist_title">Author</option>
            </select>
          </div>
          <div className="items">
            {filteredItems.length > 0 ? (
              filteredItems.map((art) => <MiniCard key={art.id} art={art} />)
            ) : (
              <p className="no-results">No artworks found for your search.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchSection;
