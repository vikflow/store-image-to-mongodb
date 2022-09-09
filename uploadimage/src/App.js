import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Upload from "./components/UploadImage";
import ViewImage from "./components/ViewImage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Upload />} />
          <Route path="/view" element={<ViewImage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
