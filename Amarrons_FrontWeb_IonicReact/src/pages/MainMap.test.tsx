import React from 'react';
import { render } from '@testing-library/react';
import MainMap from './MainMap';

const routeComponentPropsMock = {
  // add jest.fn() as needed to any of the objects
  history: {} as any,
  location: {} as any,
  match: {} as any,
}

function mockFetch(data: any) {
  return jest.spyOn(window, 'fetch').mockResolvedValue(new Response(JSON.stringify(data)));
}

beforeEach(() => mockFetch([]));

// TODO find marker
test('Renders maps without crashing TODO', async () => {
  const { baseElement, findByText } = render(<MainMap {...routeComponentPropsMock} />);

  expect(baseElement).toBeDefined();
});
