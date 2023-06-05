import React, { ReactElement } from 'react';
import Pagination from 'react-bootstrap/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { SearchConfigI } from '../../types/redux/searchConfig';
import { AppDispatch, RootState } from '../../types/redux/store';
import { incrementCurrentPage, decrementCurrentPage } from '../../controller/redux/searchConfig';

interface PropsI {
  leftButtonDisableStatus: boolean;
  rightButtonDisableStatus: boolean;
}

export default function PaginationButtonsComponent({ leftButtonDisableStatus, rightButtonDisableStatus }: PropsI): ReactElement {
  const dispatch: AppDispatch = useDispatch();
  const searchConfig: SearchConfigI = useSelector((state: RootState) => state.searchConfig);

  const prevPage = (): void => {
    dispatch(decrementCurrentPage());
  };

  const nextPage = (): void => {
    dispatch(incrementCurrentPage());
  };

  return (
    <Pagination>
      <Pagination.First 
        onClick={prevPage} 
        disabled={leftButtonDisableStatus} 
      />
      <p className='fs-5 mx-3'>Current page: {searchConfig.page}</p>
      <Pagination.Last 
        onClick={nextPage} 
        disabled={rightButtonDisableStatus} 
      />
    </Pagination>
  );
}
