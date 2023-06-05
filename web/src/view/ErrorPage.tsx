import React, { ReactElement } from 'react';

export default function ErrorPage(): ReactElement {
  return (
    <main className='container text-center pt-5'>
      <p className='fs-3 text-danger'>SOMETHING WENT WRONG</p>
      <p className='fs-2 text-danger'>PLEASE RELOAD APP</p>
    </main>
  );
}