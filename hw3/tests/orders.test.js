// Author: Kevin Hoser

/*
 * External Reference:
 *   Implemented supertest examples to test express routing and GET request
 *   Date: 10 February 2020
 *   URL: https://github.com/visionmedia/supertest#readme and
 *        https://dev.to/nedsoft/testing-nodejs-express-api-with-jest-and-supertest-1km6
 */

const request = require('supertest');
const app = require('../app'); //reference to you app.js file

describe('Post Endpoints', () => {
    it('should create a new post', async () => {
      const res = await request(app)
        .get('/orders')
        .expect('Content-Type', /json/)
        .expect(200)
    })
})