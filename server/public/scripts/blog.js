$(window).on("load", function () {
    console.log('js, jq');
    // Anything that should come in on page load goes here
    onLoad();
})

function onLoad(params) {
    console.log('ready');
}


function onload() {
    $('#submit-post').on('click', function () {
        console.log('jq');
        postNewBlog()
    })
}

function postNewBlog() {
    // Grab new blog post from inputs
    // store post as object
}

function sendBlogs(blogPost) {
    console.log('send to server');
    $.ajax({
        method: 'POST',
        url: '/blogs',
        data: blogPost
    }).then(function (response) {
        console.log('back from server');
        // clear inputs
        $('#in-name').val('');
        $('#in-msg').val('');
        getPosts();
    })
}

function getBlogs() {
    $.ajax({
        method: 'GET',
        url: '/blogs'
    })
        .then(function (response) {
            console.log('Got messages', response);
            renderMessages(response);
        })
}

function renderPosts(array) {
    $('#post-history').empty();
    for (const item of array) {
        $('#post-history').append(`<p>${item.name}: ${item.text}</p>`)
    }
}