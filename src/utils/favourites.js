import { toast } from 'react-toastify';

let favourites = [];
let listeners = [];

const notify = () => listeners.forEach(l => l());

export const add = (property) => {
  if (!favourites.some(f => f.id === property.id)) {
    favourites.push(property);
    notify();
    toast.success("Added to favorites!");
  }
};

export const remove = (id) => {
  favourites = favourites.filter(f => f.id !== id);
  notify();
  toast.info("Removed from favorites");
};

export const clear = () => {
  favourites = [];
  notify();
  toast.info("Favorites cleared");
};

export const get = () => favourites;

export const subscribe = (listener) => {
  listeners.push(listener);
  return () => { listeners = listeners.filter(l => l !== listener); };
};

const favouritesUtil = { add, remove, clear, get, subscribe };
export default favouritesUtil;