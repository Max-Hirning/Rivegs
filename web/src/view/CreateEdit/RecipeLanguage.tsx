import Modal from 'react-bootstrap/Modal';
import React, { ReactElement } from 'react';
import { AppStoreI, LanguageI } from '../../types/redux/app';
import { useDispatch, useSelector } from 'react-redux';
import { addValue } from '../../controller/redux/recipeForm';
import { AppDispatch, RootState } from '../../types/redux/store';
import { recipeLanguageStatusToggle } from '../../controller/redux/app';

export default function RecipeLanguage(): ReactElement {
  const dispatch: AppDispatch = useDispatch();
  const { recipeLanguageStatus, languages }: AppStoreI = useSelector((state: RootState) => state.app);

  const close = (): void => {
    dispatch(recipeLanguageStatusToggle());
  };

  const choseRecipeLanguage = (language: LanguageI) => (): void => {
    localStorage.setItem('language', JSON.stringify(language));
    dispatch(addValue({key: 'language', value: language.code}));
    close();
  };

  return (
    <Modal 
      onHide={close}  
      show={recipeLanguageStatus}
    >
      <Modal.Header closeButton>
        <Modal.Title>Select language of you recipe</Modal.Title>
      </Modal.Header>
      <Modal.Body
        style={{ height: '500x' }}
        className='d-flex flex-wrap overflow-x-hidden overflow-y-scroll overflow-auto'
      >
        {
          languages.map(({ code, label, flag }: LanguageI, index: number): ReactElement => {
            return (
              <button 
                key={index}
                role='button'
                onClick={choseRecipeLanguage({ code, label, flag })}
                className='m-3 d-flex align-items-center btn btn-outline-secondary' 
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
      </Modal.Body>
    </Modal>
  );
}
