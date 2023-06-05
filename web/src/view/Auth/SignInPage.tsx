import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import LoaderWrapper from '../reusable/Loader';
import { userSignInFrom } from '../../model/user';
import { AppDispatch } from '../../types/redux/store';
import InputComponent from '../reusable/InputComponent';
import { useSignIn } from '../../controller/hooks/user';
import { userSignInFormReducer } from '../../controller/user';
import { emailValidation } from '../../controller/validation';
import React, { ReactElement, MouseEvent, useReducer } from 'react';
import { setFlashMessageConfig } from '../../controller/redux/flashMessage';

export default function SignInPage(): ReactElement {
  const { mutate, isLoading } = useSignIn();
  const storeDispatch: AppDispatch = useDispatch();
  const [state, dispatch] = useReducer(userSignInFormReducer, userSignInFrom);
  
  const saveUserEmail = (value: string): void => {
    dispatch({type: 'addValue', payload: {key: 'email', value}});
  };

  const saveUserPassword = (value: string): void => {
    dispatch({type: 'addValue', payload: {key: 'password', value}});
  };

  const signIn = (e: MouseEvent<HTMLElement>): void => {
    e.preventDefault();

    if(state.password && emailValidation(state.email || '')) {
      mutate(state);
    } else {
      storeDispatch(setFlashMessageConfig({
        status: 'danger',
        visibilityStatus: true,
        message: 'All fields must be filled out correctly',
      }));
    }
  };
  
  return (
    <LoaderWrapper errorStatus={false} loadingStatus={isLoading}>
      <main className='container'>
        <p className='fs-3 mb-0 text-center'>Sign in</p>
        <Form className='d-flex flex-column align-items-center'>
          <Form.Group className="mb-3 col-md-5">
            <InputComponent
              id="email"
              type="email"
              title='Your email'
              value={state.email || ''}
              onChangeFunc={saveUserEmail}
            />
          </Form.Group>
          <Form.Group className="mb-3 col-md-5">
            <InputComponent
              id="password"
              type="password"
              title='Your password'
              value={state.password || ''}
              onChangeFunc={saveUserPassword}
            />
          </Form.Group>
          <Button 
            type="submit"
            onClick={signIn} 
            variant="primary"
          >Sign In</Button>
          <Link 
            to='/sign-up' 
            className='text-decoration-none text-secondary my-3'
          >Don`t have an account</Link>
        </Form>
      </main>
    </LoaderWrapper>
  );
}