// components/Pagination.js
export default function Pagination({ pageInfo, currentPage }) {
    return (
      <div className="pagination">
        {currentPage > 1 && (
          <a href={`/podcasts/page/${currentPage - 1}`}>Previous</a>
        )}
        {pageInfo.hasNextPage && (
          <a href={`/podcasts/page/${currentPage + 1}`}>Next</a>
        )}
      </div>
    );
  }
  