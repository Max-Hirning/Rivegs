import Card from 'react-bootstrap/Card';
import { useNavigate } from 'react-router';
import React, { ReactElement } from 'react';
import StarIcon from '../../assets/icons/StarIcon';

interface PropsI {
	_id: string;
	rate: number;
	title: string;
	image: string;
	authorLogin: string;
}

export default function RecipeCard({ _id, image, authorLogin, title, rate }: PropsI): ReactElement {
  const navigate = useNavigate();

  const getAuthorLogin = () => {
    if(authorLogin.length <= 20) {
      return authorLogin;
    } else {
      return `${authorLogin.slice(0, 20)}...`;
    }
  };

  const getTitle = (): string => {
    if(title.length <= 15) {
      return title;
    } else {
      return `${title.slice(0, 15)}...`;
    }
  };

  const moveToRecipePage = () => (): void => {
    navigate(`/recipe/${_id}`);
  };

  return (
    <Card
      role="button" 
      className='m-2'
      onClick={moveToRecipePage()}
    >
      <Card.Img 
        src={image} 
        variant="top" 
        alt="recipe image"
        style={{ width: '100%', height: '11rem' }}
      />
      <Card.Body>
        <Card.Title>{getTitle()}</Card.Title>
        <div className='d-flex align-items-center justify-content-between'>
          <Card.Text className='m-0'>By {getAuthorLogin()}</Card.Text>
          <div className='d-flex align-items-center justify-content-between'>
            <StarIcon 
              width={16} 
              height={16} 
              color="black"
            />
            <Card.Text className='ms-1'>{rate}</Card.Text>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}