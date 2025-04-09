import { Routes, Route } from "react-router-dom";
import Default from "./layout/Default";
import Home from "./pages/Home";
import Organization from "./pages/Organizations";
import Accounts from "./pages/Accounts";
import Deals from "./pages/Deals";

function App() {
  return (
    <Routes>
      <Route element={<Default />}>
        <Route path="/" element={<Home />} />
        <Route path="/organizations" element={<Organization />} />
        <Route path="/accounts" element={<Accounts />} />
        <Route path="/deals" element={<Deals />} />
      </Route>
    </Routes>
  );
}

export default App;