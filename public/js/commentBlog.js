const newCommentFormHandler = async (event) => {
  // Stop the browser from submitting the form so that we can do so with javascript.
  event.preventDefault();

  // Gather the data from the form input elements on the page.
  const description = document.querySelector('#blog-comment').value.trim();
  //Generate Date
  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let fullDate = `${day} / ${month} / ${year}`;

  const blog_id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 2
];

console.log(blog_id);

  // if both of these have a value (email & password)
  if (description) {
    // Send the email and password to the server.
    const response = await fetch('/api/blogs/:id/comment', {
      method: 'POST',
      body: JSON.stringify({ description , fullDate , blog_id}),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
      alert('Comment Successful!');
    } else {
      
      alert('Comment UnSuccessful');
    }
  }
};

document
  .querySelector('.comment-form')
  .addEventListener('click', newCommentFormHandler);