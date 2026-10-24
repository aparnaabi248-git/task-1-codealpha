const app = require('./app');

// Azure App Service sets the PORT environment variable dynamically (usually 80 or 8080)
const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`=======================================================`);
  console.log(` CodeAlpha DevOps Task 1 Web App Running`);
  console.log(` Port: ${PORT}`);
  console.log(` URL:  http://localhost:${PORT}`);
  console.log(` Health Check: http://localhost:${PORT}/health`);
  console.log(`=======================================================`);
});
