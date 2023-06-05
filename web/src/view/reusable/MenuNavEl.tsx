import React, { ReactElement } from 'react';

interface PropsI {
  title: string;
  children: ReactElement;
  navigateAction: () => void;
}

export default function MenuNavEl({ title, children, navigateAction }: PropsI): ReactElement {  
  return (
    <div 
      role='button' 
      onClick={navigateAction} 
      className='icon-link-hover border-bottom d-inline-flex align-items-center mt-3 pb-1'
    >
      {children}
      <p className='fs-4 ms-2 m-0'>{title}</p>
    </div>
  );
}