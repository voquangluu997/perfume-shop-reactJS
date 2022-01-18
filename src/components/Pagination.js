import React from "react";
import PropTypes from "prop-types";

Pagination.propTypes = {
  pagination: PropTypes.object.isRequired,
  onPageChange: PropTypes.func,
};

Pagination.defaultProps = {
  onPageChange: null,
};

function Pagination(props) {
  const { pagination, onPageChange } = props;
  const { page, limit, totalRows } = pagination;

  const totalPages = Math.ceil(totalRows / limit);

  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  function handlePageChange(newPage) {
    if (onPageChange) {
      onPageChange(newPage);
    }
  }

  return (
    <nav className="mt-2">
      <ul className="pagination d-flex justify-content-center">
        <li className="page-item">
          <button
            href="#"
            className="page-link"
            disabled={page <= 1}
            onClick={() => handlePageChange(page <= 1 ? 1 : page - 1)}
          >
            Prev
          </button>
        </li>
        {pageNumbers?.map((number) => {
          return (
            <li key={number} className="page-item">
              <a
                href="#"
                className="page-link"
                onClick={() => handlePageChange(number)}
              >
                {number}
              </a>
            </li>
          );
        })}
        <li className="page-item">
          <button
            href="#"
            className="page-link"
            disabled={page >= totalPages}
            onClick={() => {
              return handlePageChange(
                page >= totalPages ? totalPages : page + 1
              );
            }}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Pagination;
