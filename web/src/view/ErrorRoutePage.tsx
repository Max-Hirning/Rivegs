import React, { ReactElement } from 'react';

export default function ErrorRoutePage(): ReactElement {
  return (
    <main className='container d-flex flex-column align-items-center pt-5'>
      <p className='fs-1 fw-bolder'>404</p>
      <p className='fs-1'>PAGE NOT FOUNDED</p>
    </main>
  );
}