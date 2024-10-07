import request from 'supertest';
import app from '../app.js';
import connection_db from '../database/connection_db.js';
describe('crud minion', () => {
  test('should return a response with status 200 and type JSON', async () => {
    const response = await request(app).get('/memes');
    expect(response.statusCode).toBe(200);
    expect(response.headers['content-type']).toContain('application/json');
  });
});
afterAll(() => {
  // server.close();
  connection_db.close();
});
