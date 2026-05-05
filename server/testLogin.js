const testLogin = async () => {
  try {
    const res = await fetch('https://erp-system-kyup.onrender.com/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'vikashsinghvks2003@gmail.com',
        password: 'password123'
      })
    });
    const data = await res.json();
    if (res.ok) {
      console.log('Login Success! Token:', data.token);
    } else {
      console.log('Login Failed:', data);
    }
  } catch (error) {
    console.error('Fetch Failed:', error.message);
  }
};

testLogin();
