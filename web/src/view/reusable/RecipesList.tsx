import RecipeCard from './RecipeCard';
import SearchModal from '../SearchModal';
import { createPortal } from 'react-dom';
import { useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { RecipCardI } from '../../types/recipes';
import React, { ReactElement, useState } from 'react';
import { AppDispatch } from '../../types/redux/store';
import SearchIcon from '../../assets/icons/SearchIcon';
import { searchModalStatusToggle } from '../../controller/redux/app';

interface PropsI {
  title: string;
  data: RecipCardI[];
  searchPermission?: boolean
}

export default function RecipesList({ data, title, searchPermission }: PropsI): ReactElement {
  const dispatch: AppDispatch = useDispatch();
  const [searchColor, setSearchColor] = useState<string>('#6c757d');

  const openSearchModal = (): void => {
    dispatch(searchModalStatusToggle());
  };

  return (
    <div 
      className='container'
      style={{ maxWidth: '80%' }} 
    >
      <div className='fs-5 border-bottom pb-2 d-flex align-items-center justify-content-between'>
        <p className='m-0'>{title} {data?.length || ''}</p>
        {(searchPermission) &&
        <Button
          className='py-1 d-flex'
          onClick={openSearchModal}
          variant="outline-secondary"
          onMouseEnter={() => setSearchColor('white')}
          onMouseLeave={() => setSearchColor('#6c757d')}
        >
          <SearchIcon 
            width={16} 
            height={16}
            color={searchColor}
          />
        </Button>}
      </div>
      {createPortal(<SearchModal/>, document.body)}
      {
        (data?.length > 0) ?
          <div className="container d-flex justify-content-center align-items-center flex-wrap">
            {data?.map((el: RecipCardI): ReactElement => {
              return (
                <RecipeCard
                  _id={el._id}
                  key={el._id}
                  rate={el.rate}
                  title={el.title}
                  image={el.image}
                  authorLogin={el.authorLogin}
                />
              );
            })}
          </div> : 
          <p className="text-danger text-center text-uppercase fs-3 d-table m-auto mt-5">No recipes</p>
      }
    </div>
  );
}
