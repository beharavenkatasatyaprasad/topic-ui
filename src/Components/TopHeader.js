import React from 'react';

export default function TopHeader({ title }) {
  return (
    <div className='col p-0'>
      <h6 className='top-heading pb-3 m-3'>{title}</h6>
    </div>
  );
}
