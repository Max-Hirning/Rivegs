import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import InputComponent from './reusable/InputComponent';
import { AppStoreI, LanguageI } from '../types/redux/app';
import { AppDispatch, RootState } from '../types/redux/store';
import { AdditionalConfigI } from '../types/redux/searchConfig';
import { searchModalStatusToggle } from '../controller/redux/app';
import { setAdditionalConfig } from '../controller/redux/searchConfig';
import React, { ReactElement, useState, ChangeEvent, useEffect, MouseEvent } from 'react';

export default function SearchModal(): ReactElement {
  const dispatch: AppDispatch = useDispatch();
  const [additionalSearchConfig, setAdditionalSearchConfig] = useState<AdditionalConfigI>(() => ({
    language: [],
    rate: undefined,
    title: undefined,
  }));
  const { searchModalStatus, languages }: AppStoreI = useSelector((state: RootState) => state.app);

  useEffect(() => {
    getLanguagesLocaly();
  }, []); 

  const search = (): void => {
    dispatch(setAdditionalConfig(additionalSearchConfig));
    closeSearchModal();
  };

  const closeSearchModal = (): void => {
    saveLanguagesLocaly();
    dispatch(searchModalStatusToggle());
  };

  const getLanguagesLocaly = (): void => {
    const res = localStorage.getItem('languages');
    if(res) {
      setAdditionalSearchConfig((state: AdditionalConfigI) => ({
        ...state,
        language: JSON.parse(res)
      }));
    }
  };

  const saveLanguagesLocaly = (): void => {
    localStorage.setItem('languages', JSON.stringify(additionalSearchConfig.language));
  };

  const saveRecipeRate = (e: ChangeEvent<HTMLSelectElement>): void => {
    if(e.target.value === 'none') {
      setAdditionalSearchConfig((state: AdditionalConfigI) => ({...state, rate: undefined}));
    } else {
      setAdditionalSearchConfig((state: AdditionalConfigI) => ({...state, rate: +e.target.value}));
    }
  };

  const setChoseRecipeLanguage = (e: MouseEvent<HTMLElement>, el: string, isSelected: boolean): void => {
    e.preventDefault();
    setAdditionalSearchConfig((state: AdditionalConfigI): AdditionalConfigI => {
      return ({
        ...state, 
        language: isSelected ? state.language.filter((language: string) => language !== el) : [...state.language, el]
      });
    });
  };

  return (
    <Modal 
      show={searchModalStatus} 
      onHide={closeSearchModal}
    >
      <Modal.Header closeButton>
        <Modal.Title>Search modal</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <InputComponent
              id="title"
              type="text"
              title="Recipe title"
              onChangeFunc={(value: string): void => {
                if(value.length === 0) {
                  setAdditionalSearchConfig((state: AdditionalConfigI) => ({...state, title: undefined}));
                } else {
                  setAdditionalSearchConfig((state: AdditionalConfigI) => ({...state, title: value}));
                }
              }}
              value={additionalSearchConfig.title || ''}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Recipe rates</Form.Label>
            <Form.Select onChange={saveRecipeRate}>
              {['none', '1','2','3','4','5'].map((el: string): ReactElement => {
                return <option key={el} value={(el === 'none') ? undefined : +el} >{el}</option>;
              })}
            </Form.Select>
          </Form.Group>
          <Form.Group
            className='my-2'
          >
            <Form.Label>Recipes languages</Form.Label>
            <Form.Group 
              style={{ maxHeight: '500px', height: '40vh' }}
              className='d-flex border flex-wrap overflow-x-hidden overflow-y-scroll overflow-auto border-right-0'
            >
              {
                languages.map(({ code, label, flag }: LanguageI, index: number): ReactElement => {
                  const isSelected: boolean = additionalSearchConfig.language.some((language: string) => language === code);

                  return (
                    <button 
                      key={index}
                      role='button'
                      onClick={(e) => setChoseRecipeLanguage(e, code, isSelected)} 
                      style={{border: `${isSelected ? '0px' : '1px'} solid #6c757d`}}
                      className={`m-3 d-flex align-items-center btn ${isSelected && 'btn-secondary' }`} 
                    >
                      <img
                        src={flag}
                        alt={code}
                        style={{ width: '2rem' }}
                      />
                      <p className='m-0 ms-2'>{label}</p>
                    </button>
                  );
                })
              }
            </Form.Group>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button 
          onClick={closeSearchModal} 
          variant="outline-secondary"
        >Close</Button>
        <Button 
          onClick={search} 
          variant="success"
        >Seacrh</Button>
      </Modal.Footer>
    </Modal>
  );
}