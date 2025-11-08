import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// 1. Import DndProvider and HTML5Backend
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import SearchPage from "./pages/SearchPage";
import PropertyPage from "./pages/PropertyPage";
import "./App.css"; // Ensure your CSS is imported

function App() {
  return (
    // 2. Wrap the entire app (or at least the Router) in DndProvider
    <DndProvider backend={HTML5Backend}>
      <Router>
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/property/:id" element={<PropertyPage />} />
        </Routes>
      </Router>
    </DndProvider>
  );
}

export default App;