const getBtn = document.querySelector('#get_btn')
const postBtn = document.querySelector('#post_btn')

function postData() {
    const item = {
        "userId": parseInt(document.getElementById('uid').value),
        "id": parseInt(document.getElementById('id').value),
        "title": document.getElementById('title').value,
        "body": document.getElementById('body').value
    }
    axios.post('http://127.0.0.1:5000/posts', item).then(
        function (res) {
            console.log(res)
            document.getElementById("ans").innerHTML = "Done"
          })

    setTimeout(() => {getPosts()}, 100);
    return false;
}

function getData() {
    const pid = document.getElementById('id2').value
    axios.get(`http://127.0.0.1:5000/posts/${pid}`).then(
        function (res) {
            document.getElementById("show_post").innerHTML = `Title: ${res.data.title} <br><br> ${res.data.body} <br><br> ID: ${res.data.id} <br> UserID: ${res.data.userId}`
            console.log(res)}
        )
    return false;
}

function getPosts() {
    axios.get(`http://127.0.0.1:5000/posts`).then(
    function (res) {
        posts = ``
        res.data.forEach(element => {
             posts += `Title:${element.title} ID:${element.id} User:${element.userId} <br>`
        })
        document.getElementById("post_list").innerHTML = posts
        }
    )
    
}
getBtn.addEventListener('click', getData)
postBtn.addEventListener('click', postData)


window.onload = function() {
    getPosts();
};