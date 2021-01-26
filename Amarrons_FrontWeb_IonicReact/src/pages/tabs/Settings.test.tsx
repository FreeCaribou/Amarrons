import React from 'react';
import { render } from '@testing-library/react';
import Settings from './Settings';

test('Setting page should have a title of Nav.Settings', async () => {
  const { findByText } = render(<Settings />);
  await findByText('Nav.Settings');
});