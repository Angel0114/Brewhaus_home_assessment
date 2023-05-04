import React, {
  useState,
  useContext,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { debounce } from "lodash";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

import { GlobalContext } from "../../provider/context";
import Thumbnail from "../../components/Thumbnail";
import Pagination from "../../components/Pagination";
import "react-toastify/dist/ReactToastify.css";
import Header from "../Header";
import { Toggle } from "../../components/ToggleBtn";

import { api } from "../../../api/punk-api";

function Main() {
  const {
    updateBeerList,
    beerList,

    lightMode,
  } = useContext(GlobalContext);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState(false);
  const [option, setOption] = useState({ page: 1, perPage: 50 });
  const [beers, setBeers] = useState([]);
  const navigate = useNavigate();
  const debouncedHandleChange = useCallback(
    debounce((e) => {
      const { value } = e.target;
      setSearch(value);
    }, 1000),
    []
  );

  const handleViewDetail = (id) => {
    navigate(`/${id}`);
  };

  const handleSort = (toggled) => {
    setSort(toggled);
  };

  useEffect(() => {
    (async () => {
      const beers = await api.getBeers(option);
      updateBeerList(beers);
    })();
  }, [option]);

  useEffect(() => {
    setBeers(
      sort
        ? [...beers].sort((a, b) => a.name.localeCompare(b.name))
        : [...beers].sort((a, b) => b.name.localeCompare(a.name))
    );
  }, [sort]);

  useEffect(() => {
    setBeers((prev) =>
      !!search
        ? [...prev].filter((item) =>
            item.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
          )
        : beerList
    );
  }, [search]);

  useEffect(() => {
    setBeers(beerList);
  }, [beerList]);

  return (
    <section className="container">
      <Header
        isSearchVisible={isSearchVisible}
        setIsSearchVisible={setIsSearchVisible}
        search={search}
        setSearch={setSearch}
        debouncedHandleChange={debouncedHandleChange}
      />
      <main className={`home ${lightMode && "home__light"}`}>
        {!!beers.length && (
          <>
            <div className="sort__container">
              <h3>SORT BY: </h3>
              <div className={`sort__item ${lightMode && "sort__item__light"}`}>
                <p>Name</p>
                <Toggle label="Name" toggled={sort} onClick={handleSort} />
              </div>
            </div>
            <div className="thumbnail__container">
              {beers.map(({ id, image_url, name, tagline, first_brewed }) => (
                <Thumbnail
                  key={id}
                  image_url={image_url}
                  id={id}
                  name={name}
                  Type={tagline}
                  first_brewed={first_brewed}
                  onViewDetail={handleViewDetail}
                />
              ))}
            </div>
            <Pagination
              className="pagination-bar"
              currentPage={option.page}
              totalCount={option.perPage}
              pageSize={option.perPage}
              onPageChange={(page) => setOption((prev) => ({ ...prev, page }))}
            />
          </>
        )}
      </main>
      <ToastContainer />
    </section>
  );
}

export default Main;
