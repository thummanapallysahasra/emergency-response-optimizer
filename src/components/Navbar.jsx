function Navbar({ currentPage, setCurrentPage }) {
  const pages = ["Dashboard", "Incidents", "Fleet", "Analytics"];

  return (
    <nav>
      <h1>Emergency Response Optimizer</h1>

      <div>
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={currentPage === page ? "active-nav" : ""}
          >
            {page}
          </button>
        ))}
      </div>
    </nav>
  );
}

export default Navbar;