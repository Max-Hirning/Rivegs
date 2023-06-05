import Form from 'react-bootstrap/Form';
import React, { ReactElement, ChangeEvent } from 'react';

interface PropsI {
  id: string;
  type: string;
  title: string;
  value: string;
  multiple?: boolean;
  onChangeFunc: (value: string) => void;
}

export default function InputComponent({ id, type, title, value, onChangeFunc, multiple }: PropsI): ReactElement {
  const saveChanges = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    onChangeFunc(e.target.value);
  };

  return (
    <>
      <Form.Label htmlFor={id}>{title}</Form.Label>
      <Form.Control
        id={id}
        type={type}
        value={value}
        onChange={saveChanges}
        aria-describedby="passwordHelpBlock"
        as={multiple ? 'textarea' : 'input'}
      />
    </>
  );
}