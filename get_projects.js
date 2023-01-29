let nameTag = document.getElementById('user-name')
let profilePictureTag = document.getElementById('profile-picture')

function getUserData(username) {

    let request = fetch(`https://api.github.com/users/${username}`)

    return Promise.resolve(request)
}

getUserData("lucassdezembro").then(response => response.json()).then(data => {
    console.log(data)

    let username = data["name"]
    nameTag.innerHTML =  username
})