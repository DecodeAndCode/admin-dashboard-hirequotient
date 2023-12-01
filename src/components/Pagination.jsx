import React from 'react';

const Pagination = ({ currentPage, totalPages, handlePageChange }) => (
    <div className="pagination">
        <button disabled={currentPage === 1} onClick={() => handlePageChange(1)}>
            First
        </button>
        <button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>
            Previous
        </button>
        <span>
            Page {currentPage} of {totalPages}
        </span>
        <button disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>
            Next
        </button>
        <button disabled={currentPage === totalPages} onClick={() => handlePageChange(totalPages)}>
            Last
        </button>
    </div>
);

export default Pagination;
