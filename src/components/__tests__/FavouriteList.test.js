import { render, screen, fireEvent } from '@testing-library/react';
import FavouriteList from '../FavouriteList';
import favouritesUtil from '../../utils/favourites';
import { toBeInTheDocument } from '@testing-library/jest-dom';

jest.mock('react-dnd', () => ({
  useDrop: () => [{ isOver: false }, jest.fn()],
}));

jest.mock('../../utils/favourites', () => ({
  get: jest.fn(),
  remove: jest.fn(),
  clear: jest.fn(),
  subscribe: jest.fn().mockReturnValue(() => {}),
}));

const mockFavorites = [
  { id: 'prop1', bedrooms: 3, type: 'House', price: 750000, picture: '/images/p1/1.jpg' },
  { id: 'prop2', bedrooms: 2, type: 'Flat', price: 400000, picture: '/images/p2/1.jpg' }
];

beforeEach(() => {
  favouritesUtil.get.mockReturnValue(mockFavorites);
});

describe('FavouriteList', () => {
  test('renders title and favorite count', () => {
    render(<FavouriteList />);
    expect(screen.getByRole('heading', { name: /My Favourites/i })).toBeInTheDocument();
    expect(screen.getByText(/ \(2\)/)).toBeInTheDocument();
  });

  test('renders favorite properties', () => {
    render(<FavouriteList />);
    expect(screen.getByText('3 Bed House')).toBeInTheDocument();
    expect(screen.getByText('2 Bed Flat')).toBeInTheDocument();
  });

  test('removes property on Remove click', () => {
    render(<FavouriteList />);
    const removeButtons = screen.getAllByText('Remove');
    fireEvent.click(removeButtons[0]);
    expect(favouritesUtil.remove).toHaveBeenCalledWith('prop1');
  });

  test('clears all on Clear All click', () => {
    render(<FavouriteList />);
    fireEvent.click(screen.getByText('Clear All'));
    expect(favouritesUtil.clear).toHaveBeenCalled();
  });
});