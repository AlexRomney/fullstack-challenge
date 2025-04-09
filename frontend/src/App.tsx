import { Routes, Route } from "react-router-dom";
import Default from "./layout/Default";
import Home from "./pages/Home";
import Organizations from "./pages/Organizations";
import Accounts from "./pages/Accounts";
import Deals from "./pages/Deals";
import OrganizationDetails from "./pages/OrganizationDetails";

function App() {
  return (
    <Routes>
      <Route element={<Default />}>
        <Route path="/" element={<Home />} />
        <Route path="/organizations" element={<Organizations />} />
        <Route path="/organizations/:id" element={<OrganizationDetails />} />
        <Route path="/accounts" element={<Accounts />} />
        <Route path="/deals" element={<Deals />} />
      </Route>
    </Routes>
  );
}

export default App;