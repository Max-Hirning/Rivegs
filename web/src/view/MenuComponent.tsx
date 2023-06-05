import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import React, { ReactElement } from 'react';
import MenuNavEl from './reusable/MenuNavEl';
import AddIcon from '../assets/icons/AddIcon';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '../assets/icons/HomeIcon';
import Offcanvas from 'react-bootstrap/Offcanvas';
import SavedIcon from '../assets/icons/SavedIcon';
import ProfileIcon from '../assets/icons/ProfileIcon';
import { useDispatch, useSelector } from 'react-redux';
import { useDeleteUser } from '../controller/hooks/user';
import { menuStatusToggle } from '../controller/redux/app';
import { clearProfile } from '../controller/redux/profile';
import defaultUserAvatar from '../assets/default-avatar.svg';
import { resetRecipe } from '../controller/redux/recipeForm';
import { AppDispatch, RootState } from '../types/redux/store';

export default function MenuComponent(): ReactElement {
  const navigate = useNavigate();
  const deleteUser = useDeleteUser();
  const dispatch: AppDispatch = useDispatch();
  const { profile, app }: RootState = useSelector((state: RootState) => state);

  const exit = (): void => {
    closeMenu();
    navigate('/');
    dispatch(clearProfile());
    localStorage.removeItem('user');
  };

  const closeMenu = (): void => {
    dispatch(menuStatusToggle());
  };

  const deleteAccount = (): void => {
    const question: boolean = confirm('If you delete your account: all your data, include recipes will be destroyed. Are you sure you want this?');
    if(question) deleteUser.mutate({ userId: profile._id, avatarId: profile.avatarId });
    closeMenu();
  };

  return (
    <Offcanvas 
      onHide={closeMenu}
      show={app.menuStatus} 
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Menu</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <div>
          <Image 
            thumbnail={true}
            alt='user avatar' 
            roundedCircle={true}
            src={profile.avatar || defaultUserAvatar} 
            style={{ width: '7rem', height: '7rem' }}
          />
          <p className='mt-2 fs-5'>Login: {profile.login}</p>
        </div>
        <nav className='d-flex flex-column mt-3'>
          <MenuNavEl 
            title='Home' 
            navigateAction={() => {
              closeMenu();
              navigate('/');
            }}
          >
            <HomeIcon 
              width={25} 
              height={25} 
              color="black"
            />
          </MenuNavEl>
          <MenuNavEl 
            title='Profile' 
            navigateAction={() => {
              closeMenu();
              navigate('/profile');
            }}
          >
            <ProfileIcon 
              width={25} 
              height={25} 
              color="black"
            />
          </MenuNavEl>
          <MenuNavEl 
            title='Saved recipes' 
            navigateAction={() => {
              closeMenu();
              navigate('/saved-recipes');
            }}
          >
            <SavedIcon 
              width={25} 
              height={25} 
              color="black"
            />
          </MenuNavEl>
          <MenuNavEl 
            title='Create recipe' 
            navigateAction={() => {
              closeMenu();
              dispatch(resetRecipe());
              navigate('/create-recipe');
            }}
          >
            <AddIcon 
              width={25} 
              height={25} 
              color="black"
            />
          </MenuNavEl>
        </nav>
        <div className='d-flex align-items-center justify-content-between mt-5'>
          <Button 
            onClick={exit}
            variant="outline-secondary" 
          >Exit</Button>
          <Button 
            variant="danger" 
            onClick={deleteAccount}
          >Delete account</Button>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
}