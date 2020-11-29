$(window).on("load", function () {
    console.log('js, jq');
    // Anything that should come in on page load goes here
    onLoad();
})

function onLoad() {
    console.log('ready');
    getBlogs()
    $('#submit-post').on('click', postNewBlog)
}

function postNewBlog() {
    // store new post as object
    let blogPost = {}
    // Grab new blog post from inputs
    blogPost.title = $("#post-title-in").val();
    blogPost.content = $("#post-content-in").val();
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
    })
}

function getBlogs() {
    $.ajax({
        method: 'GET',
        url: '/blogs'
    }).then(function (response) {
        console.log('Got blogs', response);
        renderPosts(response);
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
        $('#posts').append($div);
    }
}