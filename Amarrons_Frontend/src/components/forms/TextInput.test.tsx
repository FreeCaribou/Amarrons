import React from 'react';
import { render } from '@testing-library/react';
import { ionFireEvent as fireEvent } from '@ionic/react-test-utils';

import TextInput from './TextInput';

const textInputPropsMockNotValid = {
  setValue: (e: any) => { return 'test case'; },
  name: 'E-mail',
  value: '',
  required: true,
  isValid: false
}

const textInputPropsMockValid = {
  setValue: (e: any) => { return 'test case'; },
  name: 'Name',
  value: '',
  required: false,
  isValid: true
}

test('Text input blur valid false', async () => {
  const { findByTestId } = render(<TextInput {...textInputPropsMockNotValid} />);
  await !findByTestId("text-input-error-message");
  const textInput = await findByTestId('ion-text-input');
  await fireEvent.ionBlur(textInput);
  await findByTestId("text-input-error-message");
});

test('Text input blur valid true', async () => {
  const { findByTestId } = render(<TextInput {...textInputPropsMockValid} />);
  const textInput = await findByTestId('ion-text-input');
  await fireEvent.ionBlur(textInput);
  await !findByTestId("text-input-error-message");
});

test('Text input required false', async () => {
  const { findByText } = render(<TextInput {...textInputPropsMockValid} />);
  await findByText('Name');
});

test('Text input required false', async () => {
  const { findByText } = render(<TextInput {...textInputPropsMockNotValid} />);
  await findByText('E-mail *');
});