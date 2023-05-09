import { useEffect, useState, useMemo } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

import "./pagination.style.scss";

const Pagination = () => {
  const [list, setList] = useState([]);

  // Page listing
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9);

  // Page numbers
  const [pageNumberLimit, setPageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

  const pages = [];
  for (let i = 0; i <= Math.ceil(list.length / itemsPerPage); i++) {
    pages.push(i);
  }

  // ITEM DISPLAY
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = list.slice(indexOfFirstItem, indexOfLastItem);

  /** HANDLERS */
  const Handler = (e) => {
    setCurrentPage(Number(e.target.id));
  };

  const handlePrev = () => {
    setCurrentPage(currentPage - 1);

    if ((currentPage - 1) % pageNumberLimit === 0) {
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
    }
  };

  const handleNext = () => {
    setCurrentPage(currentPage + 1);

    if (currentPage + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  // PAGE DOTS
  let pageIncrementBtn = null;
  if (pages.length > maxPageNumberLimit) {
    pageIncrementBtn = <li onClick={handleNext}>&hellip;</li>;
  }

  let pageDecrementBtn = null;
  if (pages.length > maxPageNumberLimit) {
    pageDecrementBtn = <li onClick={handlePrev}>&hellip;</li>;
  }

  // SETTING PARAMETERS FOR DOTS
  const pageNumber = currentPage % maxPageNumberLimit;

  console.log("Page Number", pageNumber);
  console.log("Page Number Limit", pageNumberLimit);
  console.log("MAX PAGE", maxPageNumberLimit);
  console.log("Current Page", currentPage);
  console.log("Pages length", pages.length);
  console.log("Pages", pages);

  // UI PAGE NUMBER
  const renderPageNumbers = pages.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <li
          key={number}
          id={number}
          className={currentPage === number ? "active" : "normal"}
          onClick={Handler}
        >
          {number}
        </li>
      );
    }
  });

  useEffect(() => {
    const TodoList = async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos"
      );
      const data = await response.json();

      setList(data);
    };

    TodoList();
  }, []);

  console.log("LISTT", list);

  return (
    <div className="pagination">
      <div className="list-items-container">
        <ul className="list-items">
          {currentItems ? (
            currentItems.map((items) => {
              return (
                <li key={items.id} className="list-item">
                  <p>{items.id}</p>
                  <p>{items.title}</p>
                </li>
              );
            })
          ) : (
            <div>
              <p> Still loading</p>
            </div>
          )}
        </ul>
      </div>

      <div className="pagination-container">
        <div className="left-pagination">
          <span>Showing</span>
          <span>
            <select name="" id="" data-role="select">
              <option value="option 1">{currentPage}</option>
            </select>
          </span>
          <span>Out of {pages.length}</span>
        </div>

        <div className="right-pagination">
          <button
            className="left-arrow"
            disabled={currentPage === pages[1] ? true : false}
            onClick={handlePrev}
          >
            <MdKeyboardArrowLeft />
          </button>
          <span>
            <ul className="page-list">
              {/**
               * Come back here
               * I need to add the dots to the very last page
               *  */}
              {currentPage > pageNumberLimit ? pageDecrementBtn : null}
              {renderPageNumbers}
              {pageIncrementBtn}
            </ul>
          </span>
          <button
            className="right-arrow"
            disabled={currentPage === pages.length - 1 ? true : false}
            onClick={handleNext}
          >
            <MdKeyboardArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
