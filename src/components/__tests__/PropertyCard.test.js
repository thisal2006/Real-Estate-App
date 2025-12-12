import { render, screen, fireEvent } from '@testing-library/react';
import PropertyCard from '../PropertyCard';
import favouritesUtil from '../../utils/favourites';
import { toBeInTheDocument } from '@testing-library/jest-dom';

jest.mock('react-dnd', () => ({
  useDrag: () => [{ isDragging: false }, jest.fn()],
}));

jest.mock('../../utils/favourites');

const mockProperty = {
  id: 'prop1',
  bedrooms: 3,
  type: 'House',
  price: 750000,
  location: 'Petts Wood',
  picture: '/images/p1/1.jpg',
  description: 'Beautiful family home'
};

describe('PropertyCard', () => {
  test('renders property details correctly', () => {
    render(<PropertyCard property={mockProperty} />);
    
    expect(screen.getByText('3 Bed House')).toBeInTheDocument();
    expect(screen.getByText('£750,000')).toBeInTheDocument();
    expect(screen.getByText('Petts Wood')).toBeInTheDocument();
  });

  test('adds property to favorites when button clicked', () => {
    render(<PropertyCard property={mockProperty} />);
    
    fireEvent.click(screen.getByText('♡ Favorite'));
    expect(favouritesUtil.add).toHaveBeenCalledWith(mockProperty);
  });
});