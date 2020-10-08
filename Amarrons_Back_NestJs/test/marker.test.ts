import * as request from 'supertest';

export function markerWithoutPosition(app) {
  return request(app)
    .get('/markers')
    .expect(400);
}

export function markerWithPositionAndOneMarker(app) {
  return request(app)
    .get('/markers?northEastLat=50.857411&northEastLng=4.411634&southWestLat=50.822708&southWestLng=4.343904')
    .expect(200)
    .then(({ body }) => {
      expect(body[0].label).toEqual('Cinquantenaire');
    })
}




