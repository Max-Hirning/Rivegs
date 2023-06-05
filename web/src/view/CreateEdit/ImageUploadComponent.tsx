import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import React, { ReactElement, useMemo, useState } from 'react';
import { changeImage } from '../../controller/redux/recipeForm';
import { RecipeFromStoreI } from '../../types/redux/recipeForm';
import { AppDispatch, RootState } from '../../types/redux/store';
import ImageUploading, { ImageListType } from 'react-images-uploading';

export default function ImageUploadComponent() {
  const dispatch: AppDispatch = useDispatch();
  const [value, setValue] = useState<ImageListType>([]);
  const { image }: RecipeFromStoreI = useSelector((state: RootState) => state.recipeForm);

  useMemo(() => {
    if(typeof image === 'string') setValue([{ dataURL: image }]);
  }, [image]);

  const onChange = (imageList: ImageListType) => {
    setValue(imageList);
    if(imageList[0].file) dispatch(changeImage(imageList[0].file));
  };

  return (
    <ImageUploading value={value} onChange={onChange} >
      {({ onImageUpload }): ReactElement => {
        if(value[0]?.dataURL) {
          return (
            <Image
              fluid={true}
              alt='recipe image'
              onClick={onImageUpload}
              src={value[0]?.dataURL}
              className='mt-3 m-auto d-table'
            />
          );
        } else {
          return (
            <Button 
              onClick={onImageUpload} 
              variant="outline-secondary"
              className='p-3 d-flex justify-content-center align-items-center mt-3 container'
            >Choose recipe image</Button>
          );
        }
      }}
    </ImageUploading>
  );
}