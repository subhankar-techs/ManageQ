// Simple test script to check backend connectivity
const testBackend = async () => {
  try {
    console.log('Testing backend connection...');
    
    const response = await fetch('http://localhost:5000/api/health');
    const data = await response.json();
    
    if (response.ok) {
      console.log('✅ Backend is running:', data);
    } else {
      console.log('❌ Backend error:', data);
    }
  } catch (error) {
    console.log('❌ Connection failed:', error.message);
    console.log('Make sure the backend server is running on port 5000');
  }
};

testBackend();