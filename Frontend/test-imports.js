// Test import resolution
try {
  const SuperAdmin = require('./src/SuperAdmin/SuperAdmin.jsx');
  console.log('SuperAdmin import successful');
} catch (error) {
  console.error('SuperAdmin import failed:', error.message);
}

try {
  const Details = require('./src/Admin/Details/Details.jsx');
  console.log('Details import successful');
} catch (error) {
  console.error('Details import failed:', error.message);
}
