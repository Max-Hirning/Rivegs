import { useSelector } from 'react-redux';
import React, { ReactElement } from 'react';
import Button from 'react-bootstrap/Button';
import { ParamsI } from '../../types/navigation';
import EditIcon from '../../assets/icons/EditIcon';
import { RootState } from '../../types/redux/store';
import DeleteIcon from '../../assets/icons/DeleteIcon';
import { useNavigate, useParams } from 'react-router-dom';
import { ProfileStoreI } from '../../types/redux/profile';
import { useDeleteRecipe } from '../../controller/hooks/recipes';

interface PropsI {
  imgId: string;
  authorId: string;
}

export default function DeleteEditComponent({ imgId, authorId }: PropsI): ReactElement {
  const navigate = useNavigate();
  const deleteRecipe = useDeleteRecipe();
  const { recipeId } = useParams<ParamsI>();
  const { _id }: ProfileStoreI = useSelector((state: RootState) => state.profile);

  const deleteAction = (): void => {
    deleteRecipe.mutate({recipeId: recipeId as string, imgId});
  };

  const moveToEditPage = (): void => {
    navigate(`/edit-recipe/${recipeId}`);
  };

  if(authorId === _id) {
    return (
      <div className='d-flex align-items-center justify-content-between mb-3'>
        <Button 
          variant="light" 
          onClick={moveToEditPage}
        >
          <EditIcon 
            width={25} 
            height={25} 
            color='black'
          />
        </Button>
        <Button 
          variant="light" 
          onClick={deleteAction}
        >
          <DeleteIcon 
            width={25} 
            height={25} 
            color='black'
          />
        </Button>
      </div>
    );
  } else {
    return <></>;
  }
}
