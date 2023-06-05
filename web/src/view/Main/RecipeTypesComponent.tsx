import Form from 'react-bootstrap/Form';
import { recipeTypes } from '../../model/recipes';
import { useDispatch, useSelector } from 'react-redux';
import React, { ChangeEvent, ReactElement } from 'react';
import { SearchConfigI } from '../../types/redux/searchConfig';
import { AppDispatch, RootState } from '../../types/redux/store';
import { setRecipeType } from '../../controller/redux/searchConfig';

export default function RecipeTypesComponent(): ReactElement {
  const dispatch: AppDispatch = useDispatch();
  const { type }: SearchConfigI = useSelector((state: RootState) => state.searchConfig);

  const changeActiveRecipeType = (type: string): void => {
    dispatch(setRecipeType(type));
  };

  return (
    <Form.Group className='mb-3 col-md-3'>
      <Form.Select 
        value={type}
        aria-label="Default select example"
        onChange={(e: ChangeEvent<HTMLSelectElement>) => changeActiveRecipeType(e.target.value)}
      >
        {recipeTypes.map((el: string, index: number): ReactElement => {
          return <option key={index} value={el.toLowerCase()}>{el}</option>;
        })}
      </Form.Select>
    </Form.Group>
  );
}
