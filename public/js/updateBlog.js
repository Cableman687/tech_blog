const updateBlogFormHandler = async (event) => {
    // Stop the browser from submitting the form so that we can do so with javascript.
    event.preventDefault();
  
    // Gather the data from the form input elements on the page.
    const title = document.querySelector('#title-updateBlog').value.trim();
    const description = document.querySelector('#description-updateBlog').value.trim();

    
    
    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();
    let fullDate = `${day} / ${month} / ${year}`;

    const id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 2
    ];

    console.log(id);

    // if both of these have a value (email & password)
    if (title && description && fullDate) {
      // Send the email and password to the server.
      const response = await fetch(`/api/blogs/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ title , description , fullDate }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
        alert('Blog Updated Successfully!');
      } else {
        
        alert('Blog Update Failed!');
      }
    }
  };
  
  document
    .querySelector('#update-button')
    .addEventListener('click', updateBlogFormHandler);