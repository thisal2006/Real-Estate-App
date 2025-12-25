// Updated PropertyCard.js - Already responsive, but ensure card scales well
import { Link } from "react-router-dom";
import { useDrag } from "react-dnd";
import favouritesUtil from "../utils/favourites";
import { toast } from "react-toastify";

function PropertyCard({ property }) {
  const [{ isDragging }, drag] = useDrag({
    type: "PROPERTY",
    item: { property },
    collect: (monitor) => ({ isDragging: !!monitor.isDragging() }),
  });

  const addToFavourites = () => {
    favouritesUtil.add(property);
  };

  const displayTitle = `${property.bedrooms} Bed ${property.type}`;

  return (
    <div ref={drag} className="property-card" style={{ opacity: isDragging ? 0.5 : 1 }}>
      <img src={property.picture} alt={displayTitle} />
      
      <div className="card-content">
        <h3>{displayTitle}</h3>
        <p className="location">{property.location}</p>
        <p className="description">{property.description.substring(0, 80)}...</p>
        <p className="price">£{property.price.toLocaleString()}</p>
        
        <div className="card-actions">
          <Link to={`/property/${property.id}`}>View Details</Link>
          <button onClick={addToFavourites}>♡ Favorite</button>
        </div>
      </div>
    </div>
  );
}

export default PropertyCard;