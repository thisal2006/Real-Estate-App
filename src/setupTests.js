import '@testing-library/jest-dom';

// Mock react-router-dom for all tests
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  BrowserRouter: ({ children }) => <div>{children}</div>,
  Routes: ({ children }) => <div>{children}</div>,
  Route: ({ element }) => element,
  Link: 'a',
  useParams: jest.fn(() => ({ id: 'prop1' })),
  useLocation: jest.fn(() => ({ state: {} })),
}));

// Mock react-dnd for all tests
jest.mock('react-dnd', () => ({
  DndProvider: ({ children }) => children,
  HTML5Backend: jest.fn(),
  useDrag: () => [{ isDragging: false }, jest.fn()],
  useDrop: () => [{ isOver: false }, jest.fn()],
}));

// Mock react-toastify
jest.mock('react-toastify', () => ({
  ToastContainer: () => null,
  toast: jest.fn(),
}));