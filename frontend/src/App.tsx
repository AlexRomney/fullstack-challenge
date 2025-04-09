import { Routes, Route } from "react-router-dom";
import Default from "./layout/Default";
import Home from "./pages/Home";
import Organization from "./pages/Organizations";

function App() {
  return (
    <Routes>
      <Route element={<Default />}>
        <Route path="/" element={<Home />} />
        <Route path="/organizations" element={<Organization />} />
      </Route>
    </Routes>
  );
}

export default App;