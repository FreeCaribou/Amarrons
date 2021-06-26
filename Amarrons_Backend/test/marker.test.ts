import * as request from 'supertest';

export async function markerWithoutPosition(app) {
  const response = await request(app)
    .get('/markers')
    .expect(400);
  expect(response.body.message).toBeInstanceOf(Array);
}

export async function markerWithPositionAndOneMarker(app) {
  const response = await request(app)
    .get('/markers?northEastLat=50.857411&northEastLng=4.411634&southWestLat=50.822708&southWestLng=4.343904')
    .expect(200);

  const body = response.body;
  expect(body[0].label).toEqual('Cinquantenaire');
}




