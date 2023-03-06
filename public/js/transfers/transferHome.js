const transferToHome = async (event) => {
  event.preventDefault();

    document.location.replace('/');

  };
  
  document.querySelector('#home').addEventListener('click', transferToHome);