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
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '24px', background: '#0f172a', minHeight: '100vh' }}>
      <ToastContainer position="top-right" theme="dark" />
      
      <header style={{ textAlign: 'center', marginBottom: '32px' }}>
        <h1 style={{ fontSize: '2.5rem', color: '#60a5fa' }}>RightEstate</h1>
        <p style={{ color: '#9ca3af' }}>Find your perfect home</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr 300px', gap: '24px' }}>
        <aside>
          <SearchForm onFilterChange={setCriteria} onSortChange={setSort} />
        </aside>

        <main>
          <h2 style={{ color: '#f3f4f6', marginBottom: '20px' }}>Properties ({filteredAndSorted.length})</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '24px' }}>
            {paginated.map(p => <PropertyCard key={p.id} property={p} />)}
          </div>

          {filteredAndSorted.length > pageSize && (
            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginTop: '32px' }}>
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} style={{ padding: '10px 20px', background: page === 1 ? '#374151' : '#3b82f6', color: 'white', border: 'none', borderRadius: '6px' }}>
                Previous
              </button>
              <span style={{ color: '#f3f4f6', alignSelf: 'center' }}>Page {page}</span>
              <button onClick={() => setPage(p => p + 1)} disabled={page * pageSize >= filteredAndSorted.length} style={{ padding: '10px 20px', background: page * pageSize >= filteredAndSorted.length ? '#374151' : '#3b82f6', color: 'white', border: 'none', borderRadius: '6px' }}>
                Next
              </button>
            </div>
          )}
        </main>

        <aside>
          <FavouriteList />
        </aside>
      </div>
    </div>
  );
}

export default SearchPage;
// Dec 16: Improved pagination and mobile sidebar stacking