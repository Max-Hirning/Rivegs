import React, { ReactElement } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import { StepIngredientI } from '../../types/redux/recipeForm';

interface PropsI {
  id: string;
  title: string;
  data: StepIngredientI[];
}

export default function SetpsIngredientsValuesComponent({ title, id, data }: PropsI): ReactElement {
  let test = 0;

  return (
    <Accordion.Item eventKey={id}>
      <Accordion.Header>{title}</Accordion.Header>
      <Accordion.Body>
        {data.map(({ isTitle, value }: StepIngredientI, index: number): ReactElement => {
          if(!isTitle) {
            test += 1;
          } else {
            test = 0;
          }
          return (
            <div 
              key={index} 
              className='d-flex align-items-start'
            >
              {(!isTitle) && <p className='fw-bold fs-5 me-2'>{`${test})`}</p>}
              <p className={`${isTitle ? 'fs-4 fw-bold' : 'fs-5'}`}>{value}</p>
            </div>
          );
        })}
      </Accordion.Body>
    </Accordion.Item>
  );
}