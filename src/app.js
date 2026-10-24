const express = require('express');
const path = require('path');

const app = express();

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

// Application Metadata
const APP_METADATA = {
  project: 'CodeAlpha DevOps Internship - Task 1',
  title: 'Automated CI/CD Pipeline with Azure DevOps',
  version: process.env.APP_VERSION || '1.0.0',
  environment: process.env.NODE_ENV || 'production',
  platform: 'Azure App Service (Linux Container)',
  containerRegistry: 'Azure Container Registry (ACR)',
  pipelineEngine: 'Azure Pipelines (YAML)'
};

// Health Check Endpoint (Essential for Azure App Service & Container Probes)
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'UP',
    timestamp: new Date().toISOString(),
    uptime: Math.floor(process.uptime()),
    service: 'Healthy'
  });
});

// Info API Endpoint
app.get('/api/info', (req, res) => {
  res.status(200).json({
    ...APP_METADATA,
    timestamp: new Date().toISOString(),
    serverTime: new Date().toUTCString(),
    nodeVersion: process.version
  });
});

module.exports = app;
