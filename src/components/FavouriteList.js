import { useState, useEffect } from "react";
import { useDrop } from "react-dnd";
import favouritesUtil from "../utils/favourites";

function FavouriteList() {
  const [favs, setFavs] = useState(favouritesUtil.get());

  useEffect(() => {
    const unsubscribe = favouritesUtil.subscribe(() => {
      setFavs([...favouritesUtil.get()]);
    });
    return unsubscribe;
  }, []);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "PROPERTY",
    drop: (item) => favouritesUtil.add(item.property),
    collect: (monitor) => ({ isOver: !!monitor.isOver() }),
  }));

  return (
    <div ref={drop} className="favourite-list" style={{
      background: isOver ? '#1e40af' : '#111827',
      padding: '20px',
      borderRadius: '12px',
      minHeight: '200px',
      transition: 'background 0.3s'
    }}>
      <h3 style={{ color: '#f3f4f6', marginTop: 0 }}>My Favourites ({favs.length})</h3>
      {favs.length === 0 && <p style={{ color: '#9ca3af' }}>Drag properties here or click "Add to Favorite"</p>}
      
      {favs.map(prop => (
        <div key={prop.id} style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '12px',
          background: '#1f2937',
          borderRadius: '8px',
          marginBottom: '8px'
        }}>
          <img src={prop.picture} alt="" style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '6px' }} />
          <div style={{ flex: 1, color: '#f3f4f6' }}>
            <div>{prop.bedrooms} Bed {prop.type}</div>
            <div style={{ fontSize: '0.9rem', color: '#9ca3af' }}>£{prop.price.toLocaleString()}</div>
          </div>
          <button onClick={() => favouritesUtil.remove(prop.id)} style={{
            background: '#ef4444',
            color: 'white',
            border: 'none',
            padding: '6px 12px',
            borderRadius: '4px',
            cursor: 'pointer'
          }}>Remove</button>
        </div>
      ))}

      {favs.length > 0 && (
        <button onClick={favouritesUtil.clear} style={{
          width: '100%',
          padding: '10px',
          background: '#dc2626',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          marginTop: '12px',
          cursor: 'pointer'
        }}>Clear All</button>
      )}
    </div>
  );
}

export default FavouriteList;