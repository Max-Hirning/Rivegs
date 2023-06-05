import { createPortal } from 'react-dom';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useParams } from 'react-router-dom';
import { ParamsI } from '../../types/navigation';
import { AppStoreI } from '../../types/redux/app';
import { Rating } from 'react-simple-star-rating';
import React, { ReactElement, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useChangeRate } from '../../controller/hooks/recipes';
import { AppDispatch, RootState } from '../../types/redux/store';
import { changeRateModalStatusToggle } from '../../controller/redux/app';

interface PropsI {
  rate: number;
}

export default function ChangeRateModal({ rate }: PropsI): ReactElement {
  const changeRate = useChangeRate();
  const { recipeId } = useParams<ParamsI>();
  const dispatch: AppDispatch = useDispatch();
  const [newRate, setNewRate] = useState<number>(rate);
  const { changeRateModalStatus }: AppStoreI = useSelector((state: RootState) => state.app);

  const toggle = () :void => {
    dispatch(changeRateModalStatusToggle());
  };

  const changeRating = (): void => {
    toggle();
    changeRate.mutate({ 
      recipeId: recipeId as string, 
      newRating: Math.round((rate + newRate)/2) 
    });
  };

  return createPortal(
    <Modal 
      onHide={toggle}
      show={changeRateModalStatus} 
    >
      <Modal.Header closeButton>
        <Modal.Title>Chaging rate</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Rating 
          onClick={setNewRate} 
          initialValue={newRate} 
        />
      </Modal.Body>
      <Modal.Footer>
        <Button 
          onClick={toggle} 
          variant="outline-secondary"
        >Close</Button>
        <Button 
          variant="success"
          onClick={changeRating} 
        >Save changes</Button>
      </Modal.Footer>
    </Modal>,
    document.body
  );
}