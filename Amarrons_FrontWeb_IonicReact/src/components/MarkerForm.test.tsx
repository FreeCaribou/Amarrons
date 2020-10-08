import React from 'react';
import { render } from '@testing-library/react';
import { ionFireEvent as fireEvent } from '@ionic/react-test-utils';
import MarkerForm from './MarkerForm';
import { MarkerService } from '../services/markers/marker.service';

const markerFormPropsMock = {
  position: {},
  goBack: () => { },
}

let markerService: MarkerService;

beforeAll(() => {
  markerService = new MarkerService();
})

// TODO
test('Have list loaded', async () => {
  const { baseElement, findByTestId } = render(<MarkerForm {...markerFormPropsMock} />);
  expect(baseElement).toBeDefined();
  await findByTestId("ion-text-input");
});
