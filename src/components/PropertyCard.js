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
    <div ref={drag} style={{
      opacity: isDragging ? 0.5 : 1,
      background: '#1f2937',
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
      transition: 'transform 0.3s, box-shadow 0.3s'
    }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-8px)'}
       onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
      <img src={property.picture} alt={displayTitle} style={{ width: '100%', height: '220px', objectFit: 'cover' }} />
      
      <div style={{ padding: '16px' }}>
        <h3 style={{ color: '#f3f4f6', margin: '0 0 8px 0' }}>{displayTitle}</h3>
        <p style={{ color: '#9ca3af', margin: '0 0 8px 0', fontSize: '0.9rem' }}>{property.location}</p>
        <p style={{ color: '#e5e7eb', margin: '0 0 12px 0' }}>{property.description.substring(0, 80)}...</p>
        <p style={{ fontSize: '1.4rem', fontWeight: 'bold', color: '#60a5fa' }}>£{property.price.toLocaleString()}</p>
        
        <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
          <Link to={`/property/${property.id}`} style={{
            flex: 1,
            textAlign: 'center',
            padding: '10px',
            background: '#3b82f6',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '6px'
          }}>View Details</Link>
          <button onClick={addToFavourites} style={{
            padding: '10px 16px',
            background: '#10b981',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer'
          }}>♡ Favorite</button>
        </div>
      </div>
    </div>
  );
}

export default PropertyCard;