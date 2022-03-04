import React, { useRef, useState } from "react";
import { Button, FormControl } from "react-bootstrap";
import PropTypes from "prop-types";
import { FaSearch } from "react-icons/fa";

SearchBar.propTypes = {
  onSubmit: PropTypes.func,
};

SearchBar.defaultProps = {
  onSubmit: null,
};

function SearchBar(props) {
  const { onSubmit } = props;
  const [searchText, setSearchText] = useState("");
  const typingTimeoutRef = useRef(null);
  const handleInput = (e) => {
    const value = e.target.value;
    setSearchText(value);
  };

  const handleSubmit = () => {
    onSubmit({ searchText });
  };
  return (
    <form className="d-flex justify-content-center search-form">
      <FormControl
        type="search"
        placeholder="Search in shop..."
        className="mr-2 search-input"
        aria-label="Search"
        onChange={handleInput}
        value={searchText}
      />
      <Button
        variant="outline-success"
        className="search-button"
        onClick={handleSubmit}
      >
        <FaSearch />
      </Button>
    </form>
  );
}

export default SearchBar;
