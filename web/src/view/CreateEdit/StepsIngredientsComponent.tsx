import Button from 'react-bootstrap/Button';
import React, { ReactElement, useState } from 'react';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import DeleteIcon from '../../assets/icons/DeleteIcon';
import InputComponent from '../reusable/InputComponent';
import { StepIngredientI, MoveArgI } from '../../types/redux/recipeForm';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';

interface PropsI {
  id: string
  title: string;
  multiple?: boolean;
  data: StepIngredientI[];
  secondButtonText: string;
  deleteValue: (id: number) => void;
  moveValue: (arg: MoveArgI) => void;
  addValue: (value: StepIngredientI) => void;
}

export default function StepsIngredientsComponent({ moveValue, id, multiple, secondButtonText, title, addValue, data, deleteValue }: PropsI): ReactElement {
  const [value, setValue] = useState<string>('');

  const addEl = (): void => {
    if(value.length > 0) {
      setValue('');
      addValue({ value, isTitle: false, id: (data.length+1).toString() });
    }
  };

  const addTitle = (): void => {
    if(value.length > 0) {
      setValue('');
      addValue({ value, isTitle: true, id: (data.length+1).toString() });
    }
  };

  const deleteEl = (index: number) => (): void => {
    deleteValue(index);
  };

  const onDragEnd = ({ source, destination }: DropResult): void => {
    if(source && destination) moveValue({from: source.index, to: destination?.index});
  };

  return (
    <div className='mt-3'>
      <div className='d-flex flex-column justify-content-between'>
        <div className="mb-3">
          <InputComponent
            id={id}
            type="text"
            value={value}
            title={title}
            multiple={multiple}
            onChangeFunc={setValue}
          />
        </div>
        <ButtonGroup>
          <Button 
            variant="success"
            onClick={addTitle} 
          >Add title</Button>
          <Button 
            onClick={addEl} 
            variant="success"
          >{secondButtonText}</Button>
        </ButtonGroup>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId={id}>
          {(provided) => (
            <div 
              ref={provided.innerRef} 
              {...provided.droppableProps}
            >
              {data.map(({value, isTitle}: StepIngredientI, index: number): ReactElement => {
                return (
                  <Draggable 
                    key={index} 
                    index={index}
                    draggableId={`${index}`} 
                  >
                    {(provided) => (
                      <div 
                        ref={provided.innerRef} 
                        {...provided.draggableProps} 
                        {...provided.dragHandleProps}  
                        className='mt-3 d-flex justify-content-between align-items-center shadow p-2 bg-body rounded'
                      >
                        <p className={`m-0 ${(isTitle) ? 'fs-5 fw-bolder': 'fs-6'}`}>{value}</p>
                        <Button 
                          variant="danger"
                          onClick={deleteEl(index)} 
                        >
                          <DeleteIcon
                            width={25}
                            height={25}
                            color='white'
                          />
                        </Button>
                      </div>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}