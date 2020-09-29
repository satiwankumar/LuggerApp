import React from 'react';

const Pagination = ({ ItemsPerPage, TotalItems, paginate }) => {

  const pageNumbers = [];
  
  for (let i = 1; i <= Math.ceil(TotalItems / ItemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
  <tbody>
      <ul className='pagination'>
    {
    pageNumbers.map(number => (
          <li key={number} className='page-item'>
            <a onClick={() => paginate(number)} href='javascript:void(0)' className='page-link'>
              {number}
            </a>
          </li>
        ))
    }
      </ul>
      </tbody>
  );
};

export default Pagination;
