import { decodeJwt, FormatAxiosMock } from "./Utils"

describe('Format Mock response to the axios format', () => {
  it('Simple data', () => {
    const data = FormatAxiosMock({ hello: 'world' });
    expect(data.data.hello).toBe('world');
    expect(data.status).toBe(200)
  });
});

describe('Jwt token decode', () => {
  it('Simple Jwt', async () => {
    const jwtToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiRnJlZSBDYXJpYm91IiwiaWF0IjoxNTE2MjM5MDIyfQ.g0zHjpZ-tKreIwXTciE6_npX_AQQPk-Zxcx5Db31HAE';
    const decodedToken = await decodeJwt(jwtToken);
    expect(decodedToken.name).toBe('Free Caribou');
  });
});

// TODO test the map (but how? must think about it)