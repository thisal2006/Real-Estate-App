import { useLocation, Link } from "react-router-dom";
import properties from "../data/properties";
import filterProperties from "../utils/filterProperties";
import PropertyCard from "../components/PropertyCard";

function ResultsPage() {
  const location = useLocation();
  const criteria = location.state || {};

  const filtered = filterProperties(properties, criteria);

  return (
    <div>
      <h1>Search Results</h1>
      {filtered.length === 0 ? (
        <p>No properties match your criteria.</p>
      ) : (
        <div className="results-grid">
          {filtered.map((p) => (
            <PropertyCard key={p.id} property={p} />
          ))}
        </div>
      )}
      <Link to="/">Back to Search</Link>
    </div>
  );
}

export default ResultsPage;
