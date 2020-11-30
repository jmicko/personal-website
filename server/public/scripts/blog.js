
$(window).on("load", function () {
    console.log('js, jq');
    // Anything that should come in on page load goes here
    onLoad();
})

function onLoad() {
    // initiate blog post content section

    // keep the next three lines for after jQuery is removed
    // tinymce.init({
    //     selector: '#post-content-in'
    //   });


    // this is only for jQuery. Remove it when I remove jQuery
    $('textarea#post-content-in').tinymce({});


    console.log('ready');
    // load all blogs onto the page
    getBlogs()
    // listener for submit post button
    $('#submit-post').on('click', postNewBlog)
    $('#posts').on('click', '.btn-delete', deleteBlog)
    // $('#login').on('click', logIn)
}

function postNewBlog() {
    
    // store new post as object
    let blogPost = {}
    // Grab new blog post from inputs
    blogPost.title = $("#post-title-in").val();
    blogPost.content = $("textarea#post-content-in").val();
    // package up the object and send it to the POST route
    sendBlog(blogPost);
}

function sendBlog(blogPost) {
    console.log('send to server');
    $.ajax({
        method: 'POST',
        url: '/blogs',
        data: blogPost
    }).then(function (response) {
        console.log('back from server');
        // clear inputs
        blogPost.title = $("#post-title-in").val('');
        blogPost.content = $("#post-content-in").val('');
        getBlogs();
        // getUser();
    })
}

// function getUser() {
//     $.ajax({
//         method: 'GET',
//         url: '/user'
//     }).then(function (response) {
//         console.log('Got user', response.user);
//         // renderPosts(response);
//         console.log(response);
//     }).catch(function (error) {
//         console.log('Error in POST', error)
//         alert('Unable to load blogs at this time. Please try again later.');
//     });
// }

function getBlogs() {
    $.ajax({
        method: 'GET',
        url: '/blogs'
    }).then(function (response) {
        console.log('Got blogs', response);
        renderPosts(response);
        // console.log(user.username);
    }).catch(function (error) {
        console.log('Error in POST', error)
        alert('Unable to load blogs at this time. Please try again later.');
    });
}

function renderPosts(array) {
    console.log('in renderPosts');
    $('#posts').empty();
    for (const post of array) {
        let $div = $(`<div class="post"></div>`);
        $div.data('post', post);
        $div.append(`<h2>${post.title}</h2>`);
        $div.append(`<p>${post.content}</p>`)
        $div.append(`<button class='btn-delete'>Delete Post</button>`)
        $('#posts').append($div);
    }
}

// function to delete post when delete button clicked on
function deleteBlog() {
    console.log('Deleting post....');
    // create variable to store closest div
    let post = $(this).closest('div').data('post');
    // console logging selected post id
    console.log('post id to delete is:', post.id);
    // remove div we just selected
    $(this).closest('div').remove('');
    // this ajax call deletes the data we pass in to delete on ${task.id}
    $.ajax({
        method: 'DELETE',
        url: `/blogs/${post.id}`
    }).then(function (response) {
        // refresh the posts on the page
        getBlogs();
    }).catch(function (error) {
        console.log('Error', error);
        alert('Try again.');
    })
}