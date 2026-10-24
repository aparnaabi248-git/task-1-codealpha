const request = require('supertest');
const app = require('../src/app');

describe('Task 1 Web Application Automated Tests', () => {

  // Test 1: Health check endpoint
  test('GET /health should return HTTP 200 and UP status', async () => {
    const response = await request(app).get('/health');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('status', 'UP');
    expect(response.body).toHaveProperty('uptime');
    expect(response.body).toHaveProperty('service', 'Healthy');
  });

  // Test 2: Info metadata endpoint
  test('GET /api/info should return DevOps project metadata', async () => {
    const response = await request(app).get('/api/info');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('project', 'CodeAlpha DevOps Internship - Task 1');
    expect(response.body).toHaveProperty('title');
    expect(response.body).toHaveProperty('containerRegistry', 'Azure Container Registry (ACR)');
    expect(response.body).toHaveProperty('pipelineEngine', 'Azure Pipelines (YAML)');
  });

  // Test 3: Static root endpoint
  test('GET / should serve the home dashboard page with HTTP 200', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
    expect(response.headers['content-type']).toMatch(/html/);
    expect(response.text).toContain('CodeAlpha DevOps Internship');
  });

  // Test 4: 404 Not Found handling
  test('GET /unknown-route should return HTTP 404', async () => {
    const response = await request(app).get('/unknown-route');
    expect(response.statusCode).toBe(404);
  });

});
