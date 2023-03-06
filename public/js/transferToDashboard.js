const transferToDashboard = async (event) => {
    event.preventDefault();

    document.location.replace('/dashboard');

  };
  
  document.querySelector('#dashboard-button').addEventListener('click', transferToDashboard);