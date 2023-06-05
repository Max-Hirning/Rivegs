import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import LoaderWrapper from '../reusable/Loader';
import { userSignUpFrom } from '../../model/user';
import { AppDispatch } from '../../types/redux/store';
import InputComponent from '../reusable/InputComponent';
import { useSignUp } from '../../controller/hooks/user';
import { userSignUpFormReducer } from '../../controller/user';
import { setFlashMessageConfig } from '../../controller/redux/flashMessage';
import React, { ReactElement, MouseEvent, useReducer, useState } from 'react';
import { emailValidation, passwordsChecking } from '../../controller/validation';

export default function SignUpPage(): ReactElement {
  const { mutate, isLoading } = useSignUp();
  const storeDispatch: AppDispatch = useDispatch();
  const [password, setPassword] = useState<string>('');
  const [agreementStatus, setAgreementStatus] = useState<boolean>(false);
  const [state, dispatch] = useReducer(userSignUpFormReducer, userSignUpFrom);
  
  const toggle = (): void => {
    setAgreementStatus((state: boolean) => !state);
  };

  const saveUserEmail = (value: string): void => {
    dispatch({type: 'addValue', payload: {key: 'email', value}});
  };

  const saveUserLogin = (value: string): void => {
    dispatch({type: 'addValue', payload: {key: 'login', value}});
  };

  const saveUserPassword = (value: string): void => {
    dispatch({type: 'addValue', payload: {key: 'password', value}});
  };

  const signUp = (e: MouseEvent<HTMLElement>): void => {
    e.preventDefault();
    
    if(agreementStatus && state.login && emailValidation(state.email || '') && passwordsChecking(state.password || '', password)) {
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
        <p className='fs-3 mb-0 text-center'>Sign up</p>
        <Form className='d-flex flex-column align-items-center'>
          <Form.Group className="mb-3 col-md-5">
            <InputComponent
              id="login"
              type="text"
              title='Your login'
              value={state.login || ''}
              onChangeFunc={saveUserLogin}
            />
          </Form.Group>
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
          <Form.Group className="mb-3 col-md-5">
            <InputComponent
              id="password2"
              type="password"
              value={password || ''}
              onChangeFunc={setPassword}
              title='Repeat your password'
            />
          </Form.Group>
          <Form.Group className="mb-3 col-md-5">
            <Form.Check 
              type='checkbox' 
              onChange={toggle} 
              id='default-checkbox' 
              checked={agreementStatus} 
              label="Agree to terms and conditions"
            />
          </Form.Group>
          <Button 
            type="submit"
            onClick={signUp} 
            variant="primary" 
          >Sign Up</Button>
          <Link 
            to='/sign-in' 
            className='text-decoration-none text-secondary my-3'
          >Already have account</Link>
        </Form>
      </main>
    </LoaderWrapper>
  );
}