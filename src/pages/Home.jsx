import "../css/index.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [user, setUser] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showViewMore, setShowViewMore] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterLanguage, setFilterLanguage] = useState("");

  const fetchRepos = () => {
    let url = `https://api.github.com/users/OnshilAgassi8/repos?per_page=6&page=${currentPage}`;
    if (searchTerm) {
      url += `&q=${encodeURIComponent(searchTerm)}`;
    }
    if (filterLanguage) {
      url += `&language=${encodeURIComponent(filterLanguage)}`;
    }

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.length === 0) {
          setShowViewMore("End of Repos");
        } else {
          setUser([...user, ...data]);
          setShowViewMore("View More");
        }
      });
  };

  useEffect(() => {
    fetchRepos();
  }, [currentPage, searchTerm, filterLanguage]);

  const viewMore = () => {
    setCurrentPage(currentPage + 1);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); 
  };

  const handleFilterChange = (event) => {
    setFilterLanguage(event.target.value);
    setCurrentPage(1); 
  };

  const userElements = user.map((userElement) => {
    return (
      <div className="repo-card" key={userElement.id}>
        <Link to={`/repodetails/${userElement.name}`}>
          <h2 className="repo-name">{userElement.name}</h2>
        </Link>
        <p className="language">
          Langauge:{" "}
          {userElement.language === null ? "none" : userElement.language}
        </p>
        <p className="date">Start date & time: {userElement.created_at}</p>
        <p className="visibility">Visibility: {userElement.visibility}</p>
      </div>
    );
  });

  return (
    <>
      <div className="search-filter">
        <input
          type="text"
          placeholder="Search by repository name"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <select value={filterLanguage} onChange={handleFilterChange}>
          <option value="">All Languages</option>
          <option value="Html">Python</option>
          <option value="CSS">Python</option>
          <option value="JavaScript">JavaScript</option>

          
        </select>
      </div>
      <section className="repo-container">{userElements}</section>
      <p className="view-more" onClick={viewMore}>
        {showViewMore}
      </p>
    </>
  );
}

export default Home;
