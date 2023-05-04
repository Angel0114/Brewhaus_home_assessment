import React, { useRef, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Toggle } from "../../components/ToggleBtn";
import { GlobalContext } from "../../provider/context";

const Header = ({
  isSearchVisible,
  setIsSearchVisible,
  search,
  setSearch,
  debouncedHandleChange,
}) => {
  const searchRef = useRef();
  const { lightMode, setLightMode } = useContext(GlobalContext);
  return (
    <header
      className={`menu ${lightMode && "menu__light"
      }`}
    >
      <div className="menu-container">
        <div className="menu-holder">
          <h1 className={`menu__title ${lightMode && "menu__title__light"}`}>
            Brewhaus
          </h1>
          <div className="menu-tool">
            <a
              href="#"
              className={`menu-tool__search ${
                lightMode && "menu-tool__search__light"
              }`}
              onClick={(e) => {
                e.preventDefault();
                setIsSearchVisible(true);
                searchRef.current.focus();
              }}
            >
              <span>search </span>
              <FontAwesomeIcon icon="fa-magnifying-glass" />
            </a>
            <Toggle
              toggled={lightMode}
              label=""
              onClick={(val, _) => setLightMode(val)}
            />
          </div>
        </div>
      </div>
      <div
        className={`search-container  ${isSearchVisible ? "showing " : ""}  ${
          lightMode ? "search-container__light" : ""
        } `}
      >
        <input
          type="text"
          name="name"
          ref={searchRef}
          placeholder="By Name"
          onChange={debouncedHandleChange}
        />
        <a
          href="#"
          onClick={(e) => {
            setSearch('');
            setIsSearchVisible(false);
          }}
        >
          <FontAwesomeIcon icon="fa-close" />
        </a>
      </div>
    </header>
  );
};

export default Header;
