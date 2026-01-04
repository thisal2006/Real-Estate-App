import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import SearchPage from "./pages/SearchPage";
import PropertyPage from "./pages/PropertyPage";
import "./App.css";

function App() {
  return (
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