const deleteFormHandler = async (event) => {

    event.preventDefault();

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 2
    ];


    const response = await fetch(`/api/blogs/${id}`, {
    method: 'DELETE',
    body: JSON.stringify({id: id}),
    headers: {'Content-Type': 'application/json'}
    });
    if (response.ok) {
    alert("Blog Deleted!");
    document.location.replace('/dashboard');
    } else {
    alert("Blog Deletetion Failed!");
    }
}
  document
    .querySelector('#delete-button')
    .addEventListener('click', deleteFormHandler);