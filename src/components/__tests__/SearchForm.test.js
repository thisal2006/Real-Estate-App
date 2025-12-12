import { render, screen, fireEvent } from '@testing-library/react';
import SearchForm from '../SearchForm';
import { toBeInTheDocument } from '@testing-library/jest-dom';

describe('SearchForm', () => {
  test('submits filters correctly', () => {
    const mockFilter = jest.fn();
    const mockSort = jest.fn();

    render(<SearchForm onFilterChange={mockFilter} onSortChange={mockSort} />);

    fireEvent.change(screen.getByPlaceholderText('e.g. BR5'), { target: { value: 'BR5' } });
    fireEvent.change(screen.getByDisplayValue('Any'), { target: { value: 'house' } });
    fireEvent.change(screen.getByDisplayValue('Default'), { target: { value: 'price_desc' } });

    fireEvent.click(screen.getByText('Search Properties'));

    expect(mockFilter).toHaveBeenCalledWith(expect.objectContaining({
      postcode: 'BR5',
      type: 'house'
    }));
    expect(mockSort).toHaveBeenCalledWith('price_desc');
  });
});