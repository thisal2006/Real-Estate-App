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
    <div ref={drop} className="favourite-list" style={{ background: isOver ? '#1e40af' : '#111827' }}>
      <h3>My Favourites ({favs.length})</h3>
      {favs.length === 0 && <p>Drag properties here or click "Add to Favorite"</p>}
      
      {favs.map(prop => (
        <div key={prop.id} className="favourite-item">
          <img src={prop.picture} alt={`${prop.bedrooms} Bed ${prop.type}`} className="favourite-img" />
          <div className="favourite-info">
            <div className="favourite-type">{prop.bedrooms} Bed {prop.type}</div>
            <div className="favourite-price">£{prop.price.toLocaleString()}</div>
          </div>
          <button onClick={() => favouritesUtil.remove(prop.id)} className="favourite-remove">Remove</button>
        </div>
      ))}

      {favs.length > 0 && (
        <button onClick={favouritesUtil.clear} className="clear-button">Clear All</button>
      )}
    </div>
  );
}

export default FavouriteList;