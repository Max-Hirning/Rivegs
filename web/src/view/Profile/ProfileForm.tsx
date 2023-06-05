import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import InputComponent from '../reusable/InputComponent';
import { NewProfileLocalDataI } from '../../types/user';
import { ProfileStoreI } from '../../types/redux/profile';
import defaultAvatar from '../../assets/default-avatar.svg';
import { AppDispatch, RootState } from '../../types/redux/store';
import React, { ReactElement, useState, MouseEvent } from 'react';
import { useChangeUserProfile } from '../../controller/hooks/user';
import ImageUploading, { ImageListType } from 'react-images-uploading';
import { setFlashMessageConfig } from '../../controller/redux/flashMessage';

export default function ProfileForm(): ReactElement {
  const dispatch: AppDispatch = useDispatch();
  const changeProfile = useChangeUserProfile();
  const [login, setLogin] = useState<string>('');
  const [value, setValue] = useState<ImageListType>([]);
  const { _id, avatar, avatarId }: ProfileStoreI = useSelector((state: RootState) => state.profile);

  const saveChanges = (e: MouseEvent<HTMLElement>): void => {
    e.preventDefault();
    
    if(value[0] || login.length > 0) {
      setLogin('');
      const formData: FormData = new FormData();
      const newProfileLocalData: NewProfileLocalDataI = {};

      if(login.length > 0) {
        formData.append('login', login);
        newProfileLocalData.login = login;
      }

      if(value[0]?.file) {
        formData.append('avatar', value[0].file);
        newProfileLocalData.avatar = value[0]?.dataURL;
      }

      (value[0]?.file && avatarId) && formData.append('avatarId', avatarId);
      changeProfile.mutate({id: (_id as string), user: formData, newProfileLocalData, avatarId: avatarId});
    } else {
      dispatch(
        setFlashMessageConfig({
          status: 'danger',
          visibilityStatus: true,
          message: 'At least one field must be filled out',
        })
      );
    }
  };

  return (
    <Form className="d-flex flex-column align-items-center">
      <Form.Group className="col-8 mb-3 d-flex flex-column align-items-center">
        <ImageUploading 
          value={value} 
          onChange={setValue}
        >
          {({ onImageUpload }): ReactElement => {
            return (
              <Image 
                rounded={true}
                alt='user avatar'
                className="m-auto"
                roundedCircle={true}
                onClick={onImageUpload}
                style={{ width: '10rem', height: '10rem' }}
                src={value[0]?.dataURL || avatar || defaultAvatar}
              />
            );
          }}
        </ImageUploading>
      </Form.Group>
      <Form.Group className="col-8 mb-5">
        <InputComponent
          id="login"
          type="text"
          value={login}
          title="Your new login"
          onChangeFunc={setLogin}
        />
      </Form.Group>
      <Button 
        className='mb-3'
        variant="primary" 
        onClick={saveChanges}
      >Save changes</Button>
    </Form>
  );
}