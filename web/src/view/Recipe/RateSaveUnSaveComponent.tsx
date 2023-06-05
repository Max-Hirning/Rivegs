import React, { ReactElement } from 'react';
import Button from 'react-bootstrap/Button';
import { useParams } from 'react-router-dom';
import { ParamsI } from '../../types/navigation';
import StarIcon from '../../assets/icons/StarIcon';
import SavedIcon from '../../assets/icons/SavedIcon';
import { useDispatch, useSelector } from 'react-redux';
import UnSavedIcon from '../../assets/icons/UnSavedIcon';
import { ProfileStoreI } from '../../types/redux/profile';
import { AppDispatch, RootState } from '../../types/redux/store';
import { useSaveUnSaveRecipe } from '../../controller/hooks/user';
import { changeRateModalStatusToggle } from '../../controller/redux/app';

interface PropsI {
  rate: number;
}

export default function RateSaveUnSaveComponent({ rate }: PropsI): ReactElement {
  const { recipeId } = useParams<ParamsI>();
  const dispatch: AppDispatch = useDispatch();
  const saveUnSaveRecipe = useSaveUnSaveRecipe();
  const { savedRecipes, _id }: ProfileStoreI = useSelector((state: RootState) => state.profile);

  const toggle = () :void => {
    dispatch(changeRateModalStatusToggle());
  };

  const checkIfSaved = (): boolean => {
    return (savedRecipes.some((el: string) => el === recipeId));
  };

  const saveUnSaveRecipeAction = (): void => {
    let newSavedRecipes: string[] = [];
    
    if(checkIfSaved()) {
      newSavedRecipes = savedRecipes.filter((el: string) => el !== recipeId);
    } else {
      newSavedRecipes = [...savedRecipes, recipeId as string];
    }

    saveUnSaveRecipe.mutate({ id: (_id as string), savedRecipes: newSavedRecipes });
  };

  if(_id.length > 0) {
    return (
      <div className="d-flex">
        <Button 
          variant="light" 
          onClick={toggle} 
          className='d-flex align-items-center'
        >
          <StarIcon 
            width={16} 
            height={16}
            color='black'
          />
          <p className='ms-2 mb-0'>{rate}</p>
        </Button>
        <Button 
          variant="light" 
          className='ms-3'
          onClick={saveUnSaveRecipeAction} 
        >
          {checkIfSaved() ? <SavedIcon width={16} height={16} color='black'/> : <UnSavedIcon width={16} height={16} color='black'/>}
        </Button>
      </div>
    );
  } else {
    return <></>;
  }
}