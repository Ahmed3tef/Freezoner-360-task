import React, { useEffect, useRef, useState } from 'react';
import { TfiSearch } from 'react-icons/tfi';
import { useNavigate } from 'react-router-dom';

const SearchBar = (props) => {

  const handleSearchOnEnter = e => {
    if (e.keyCode === 13 && props.searchValue) {
      props.handleSearch()
    }
  };
  const onFlySearch = e => {
    props.setSearchValue(e.target.value)
    if (e.target.value?.length > 3) props.handleSearch()

  }
  return (
    <div className="search">
      <span className="search-icon"
        onClick={() => {
          if (props.searchValue) props.handleSearch()
        }}>
        <TfiSearch />
      </span>
      <input
        placeholder={props.placeholder ?? "What Are You Looking For ?"}
        type="text"
        value={props.searchValue}
        onChange={onFlySearch}
        onKeyDown={handleSearchOnEnter}
        tabIndex="0"
      />
    </div>
  );
};

export default SearchBar;
