import ReactDOM from 'react-dom';
import Alert from 'react-bootstrap/Alert';
import ErrorIcon from '../../assets/icons/ErrorIcon';
import React, { ReactElement, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SuccessIcon from '../../assets/icons/SuccessIcons';
import { AppDispatch, RootState } from '../../types/redux/store';
import { FlashMessageStoreI } from '../../types/redux/flashMessage';
import { toogleVisibilityStatus } from '../../controller/redux/flashMessage';

export default function FlashMessage(): ReactElement {
  const dispatch: AppDispatch = useDispatch();
  const {status, message, visibilityStatus}: FlashMessageStoreI = useSelector((state: RootState) => state.flashMessage);

  useMemo(() => {
    if(visibilityStatus) {
      setTimeout(() => {
        hideMessage();
      }, 3000);
    }
  }, [visibilityStatus]);

  const hideMessage = () => {
    dispatch(toogleVisibilityStatus(false));
  };

  const getFlashMessageIcon = (): ReactElement => {
    switch(status) {
    case'danger':
      return <ErrorIcon width={25} height={25} color='#842029' style={{marginRight: 5}}/>;
    case'success':
      return <SuccessIcon width={25} height={25} fill='#0f5132' style={{marginRight: 5}}/>;
    default:
      return <></>;
    }
  };

  if(visibilityStatus) {
    return (
      ReactDOM.createPortal(
        <Alert 
          role='button'
          variant={status}
          onClick={hideMessage}
          className='d-flex align-items-center'
          style={{ top: '13vh', right: '2vw', position: 'fixed' }} 
        >{getFlashMessageIcon()}{message}</Alert>, document.body
      )
    );
  } else {
    return <></>;
  }
}