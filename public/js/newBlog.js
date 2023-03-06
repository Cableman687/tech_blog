const newBlogFormHandler = async (event) => {
    // Stop the browser from submitting the form so that we can do so with javascript.
    event.preventDefault();
  
    // Gather the data from the form input elements on the page.
    const title = document.querySelector('#title-newBlog').value.trim();
    const description = document.querySelector('#description-newBlog').value.trim();
    
    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let fullDate = `${day} / ${month} / ${year}`;



    // if both of these have a value (email & password)
    if (title && description && fullDate) {
      // Send the email and password to the server.
      const response = await fetch('/api/users/newBlog', {
        method: 'POST',
        body: JSON.stringify({ title , description , fullDate }),
        headers: { 'Content-Type': 'application/json' },
      });

      console.log(response);
  
      if (response.ok) {
        document.location.replace('/dashboard');
        alert('Blog Created Successfully!');
      } else {
        
        alert('Blog Creation Failed!');
      }
    }
  };
  
  document
    .querySelector('.newBlog-form')
    .addEventListener('click', newBlogFormHandler);