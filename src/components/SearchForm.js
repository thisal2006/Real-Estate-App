import { useState } from "react";
import Slider from "rc-slider";
import "react-datepicker/dist/react-datepicker.css";
import "rc-slider/assets/index.css";

function SearchForm({ onFilterChange, onSortChange }) {
  const [filters, setFilters] = useState({
    type: "any",
    price: [0, 1000000],
    bedrooms: [0, 6],
    dateFrom: null,
    postcode: "",
    tenure: "any",
    hasGarden: false,
    hasParking: false
  });

  const [sort, setSort] = useState("none");

  const handleChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    onFilterChange({
      ...filters,
      minPrice: filters.price[0],
      maxPrice: filters.price[1],
      minBedrooms: filters.bedrooms[0],
      maxBedrooms: filters.bedrooms[1]
    });
    onSortChange(sort);
  };

  return (
    <div style={{ background: '#111827', padding: '24px', borderRadius: '12px' }}>
      <h3 style={{ color: '#f3f4f6', marginBottom: '20px' }}>Filter & Sort</h3>
      <form onSubmit={handleSearch}>
        <div style={{ marginBottom: '16px' }}>
          <label style={{ color: '#f3f4f6', display: 'block', marginBottom: '6px' }}>Property Type</label>
          <select value={filters.type} onChange={(e) => handleChange("type", e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '6px', background: '#1f2937', color: '#f3f4f6' }}>
            <option value="any">Any</option>
            <option value="house">House</option>
            <option value="flat">Flat</option>
          </select>
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label style={{ color: '#f3f4f6', display: 'block', marginBottom: '6px' }}>Price Range</label>
          <Slider range min={0} max={1000000} step={10000} value={filters.price} onChange={(v) => handleChange("price", v)} />
          <div style={{ color: '#9ca3af', marginTop: '6px' }}>£{filters.price[0].toLocaleString()} - £{filters.price[1].toLocaleString()}</div>
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label style={{ color: '#f3f4f6', display: 'block', marginBottom: '6px' }}>Bedrooms</label>
          <Slider range min={0} max={6} value={filters.bedrooms} onChange={(v) => handleChange("bedrooms", v)} />
          <div style={{ color: '#9ca3af', marginTop: '6px' }}>{filters.bedrooms[0]} - {filters.bedrooms[1]} beds</div>
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label style={{ color: '#f3f4f6', display: 'block', marginBottom: '6px' }}>Postcode</label>
          <input type="text" placeholder="e.g. BR5" value={filters.postcode} onChange={(e) => handleChange("postcode", e.target.value.toUpperCase())} style={{ width: '100%', padding: '10px', borderRadius: '6px', background: '#1f2937', color: '#f3f4f6' }} />
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label style={{ color: '#f3f4f6', display: 'block', marginBottom: '6px' }}>Sort By</label>
          <select value={sort} onChange={(e) => setSort(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '6px', background: '#1f2937', color: '#f3f4f6' }}>
            <option value="none">Default</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="date_desc">Newest First</option>
          </select>
        </div>

        <button type="submit" style={{
          width: '100%',
          padding: '14px',
          background: '#3b82f6',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          fontSize: '1.1rem',
          cursor: 'pointer'
        }}>Search Properties</button>
      </form>
    </div>
  );
}

export default SearchForm;