const logout = async () => {
    // Make a post request to destroy the session on the back-end once the user logs out.
    const response = await fetch('/api/users/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      // if successfully logged out, rediret to the login page.
      document.location.replace('/login');
    } else {
      alert(response.statusText);
    }
  };
  
  document.querySelector('#logout').addEventListener('click', logout);
  