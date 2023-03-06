const transferToCreate = async (event) => {
    event.preventDefault();

    document.location.replace('/newBlog');

  };
  
  document.querySelector('#create-button').addEventListener('click', transferToCreate);