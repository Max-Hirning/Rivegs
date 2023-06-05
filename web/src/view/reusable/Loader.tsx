import React, { ReactElement } from 'react';
import Spinner from 'react-bootstrap/Spinner';

interface PropsI {
  errorStatus: boolean;
  loadingStatus: boolean;
  children: ReactElement;
}

export default function LoaderWrapper({loadingStatus, errorStatus, children}: PropsI): ReactElement {
  if(loadingStatus) {
    return (
      <Spinner 
        role="status" 
        animation="border" 
        className="d-table m-auto mt-5"
      >
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  } else {
    if(errorStatus) {
      return <p className="text-danger text-center text-uppercase fs-3 d-table m-auto mt-5">No recipes were founded</p>;
    } else {
      return children;
    }
  }
}