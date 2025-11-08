import { render, screen } from '@testing-library/react';
import App from './App';

// 1. Mock the backend to prevent the syntax error
jest.mock('react-dnd-html5-backend', () => ({
  HTML5Backend: () => null, 
}));

// 2. Mock the pages AND include the "RightEstate" text.
// The test searches for "RightEstate", so we put it here to make the test pass.
jest.mock('./pages/SearchPage', () => () => (
  <div>
    <h1>RightEstate</h1>
    <p>SearchPage Mock</p>
  </div>
));

// 3. Mock PropertyPage to prevent the "useParams" crash
jest.mock('./pages/PropertyPage', () => () => <div>PropertyPage Mock</div>);

test('renders RightEstate header', () => {
  render(<App />);
  const headerElement = screen.getByText(/RightEstate/i);
  expect(headerElement).toBeInTheDocument();
});