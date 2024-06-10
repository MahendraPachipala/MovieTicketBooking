import React, { useEffect, useState } from 'react';
import Logo from "../Images/Logo.jpg";
import "../Styles/Header.css";
import cookies from "js-cookie";
import { Baseurl } from '../Utilities/Config';
import axios from "axios";
import { useDebounce } from "use-debounce";

const Header = ({ switchMode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [movies, setMovies] = useState([]);
  const [searchData, setSearchData] = useState('');
  const [debouncedSearchData] = useDebounce(searchData, 300);
  const [filterData, setFilter] = useState([]);

  useEffect(() => {
    const token = cookies.get('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axios.get(`${Baseurl}/movies`);
        setMovies(res.data.movies);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    if (debouncedSearchData.trim() === "") {
      setFilter(null);
      console.log(filterData);
      return; 
    }
  
    const filteredMovies = movies.filter(movie =>
      movie.title.toLowerCase().includes(debouncedSearchData.toLowerCase())
    );
  
    setFilter(filteredMovies);
    console.log(filterData);
  }, [debouncedSearchData, movies]);
  
  

  const handleSearch = (event) => {
    setSearchData(event.target.value);
  };

  return (
    <nav className="navbar navbar-default" style={{ margin: '0px' }}>
      <div className="container-fluid" style={{ padding: "5px" }}>
        <div className="navbar-header">
          <button
            type="button"
            className="navbar-toggle collapsed"
            data-toggle="collapse"
            data-target="#bs-example-navbar-collapse-1"
            aria-expanded="false"
          >
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          <a
            href="/"
            style={{ color: '#000000', fontFamily: 'Roboto, sans-serif' }}
          >
            <img
              style={{ height: "40px", objectFit: "cover", margin: "3px 35px", borderRadius: "10px" }}
              src={Logo}
              alt="logo"
            />
          </a>
        </div>

        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
          <form className="navbar-form navbar-left">
            <div className="container-input">
              <input
                type="text"
                placeholder="Search Movies"
                onChange={handleSearch}
                name="text"
                className="input"
              />
              <svg fill="#000000" width="20px" height="20px" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg">
                <path d="M790.588 1468.235c-373.722 0-677.647-303.924-677.647-677.647 0-373.722 303.925-677.647 677.647-677.647 373.723 0 677.647 303.925 677.647 677.647 0 373.723-303.924 677.647-677.647 677.647Zm596.781-160.715c120.396-138.692 193.807-319.285 193.807-516.932C1581.176 354.748 1226.428 0 790.588 0S0 354.748 0 790.588s354.748 790.588 790.588 790.588c197.647 0 378.24-73.411 516.932-193.807l516.028 516.142 79.963-79.963-516.142-516.028Z"></path>
              </svg>
            </div>
          </form>

          <ul className="nav navbar-nav navbar-right">
            <li><a href="/Home">Home</a></li>
            {!isAuthenticated && (
              <>
                <li><a href="/login">Login</a></li>
                <li><a href="/Register">Register</a></li>
              </>
            )}
            <li><a href="/about">About</a></li>
            <li>
              <label htmlFor="switch" className="toggle">
                <input type="checkbox" className="darkmode" id="switch" onChange={switchMode} />
                <div className="icon icon--moon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    width="32"
                    height="32"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>

                <div className="icon icon--sun">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    width="32"
                    height="32"
                  >
                    <path
                      d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z"
                    ></path>
                  </svg>
                </div>
              </label>
            </li>

            {isAuthenticated && (
              <li className="dropdown">
                <a
                  href="#"
                  className="dropdown-toggle"
                  data-toggle="dropdown"
                  role="button"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <span className="caret"></span>
                </a>
                <ul className="dropdown-menu">
                  <li><a href="#">Profile</a></li>
                  <li><a href="#">Booked</a></li>
                  <li><a href="#">Help</a></li>
                  <li role="separator" className="divider"></li>
                  <li><a href="#">Separated link</a></li>
                </ul>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
