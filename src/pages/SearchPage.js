// Updated SearchPage.js - Move inline styles to CSS classes for better responsiveness
import { useState, useMemo } from "react";
import data from "../data/properties.json";
import SearchForm from "../components/SearchForm";
import FavouriteList from "../components/FavouriteList";
import PropertyCard from "../components/PropertyCard";
import filterProperties from "../utils/filterProperties";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function SearchPage() {
  const [criteria, setCriteria] = useState({});
  const [sort, setSort] = useState("none");
  const [page, setPage] = useState(1);
  const pageSize = 3;

  const filteredAndSorted = useMemo(() => {
    let result = filterProperties(data.properties, criteria);

    if (sort === "price_asc") result.sort((a, b) => a.price - b.price);
    if (sort === "price_desc") result.sort((a, b) => b.price - a.price);
    if (sort === "date_desc") result.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));

    return result;
  }, [criteria, sort]);

  const paginated = filteredAndSorted.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="app-container">
      <ToastContainer position="top-right" theme="dark" />
      
      <header className="app-header">
        <h1>RightEstate</h1>
        <p>Find your perfect home</p>
      </header>

      <div className="main-layout">
        <aside className="search-sidebar">
          <SearchForm onFilterChange={setCriteria} onSortChange={setSort} />
        </aside>

        <main>
          <h2>Properties ({filteredAndSorted.length})</h2>
          <div className="property-grid">
            {paginated.map(p => <PropertyCard key={p.id} property={p} />)}
          </div>

          {filteredAndSorted.length > pageSize && (
            <div className="pagination">
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>
                Previous
              </button>
              <span>Page {page}</span>
              <button onClick={() => setPage(p => p + 1)} disabled={page * pageSize >= filteredAndSorted.length}>
                Next
              </button>
            </div>
          )}
        </main>

        <aside className="favourites-panel">
          <FavouriteList />
        </aside>
      </div>
    </div>
  );
}

export default SearchPage;
// Dec 16: Improved pagination and mobile sidebar stacking
