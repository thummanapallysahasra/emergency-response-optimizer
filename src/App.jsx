import { useState } from "react";

import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Incidents from "./pages/Incidents";
import Fleet from "./pages/Fleet";
import Analytics from "./pages/Analytics";

function App() {
  const [currentPage, setCurrentPage] = useState("Dashboard");

  return (
    <div>
      <Navbar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      {currentPage === "Dashboard" && <Dashboard />}
      {currentPage === "Incidents" && <Incidents />}
      {currentPage === "Fleet" && <Fleet />}
      {currentPage === "Analytics" && <Analytics />}
    </div>
  );
}

export default App;