var username = "lucassdezembro"

//initializing informations
setUserData()
setUserRepos()

function getUserData(usernameP) {

    let request = fetch(`https://api.github.com/users/${usernameP}`)

    return Promise.resolve(request)
}

function getUserRepos(usernameP) {

    let request = fetch(`https://api.github.com/users/${usernameP}/repos`)

    return Promise.resolve(request)
}

function getFileFromRepo(usernameP, repoP, pathP) {

    let request = fetch(`https://api.github.com/repos/${usernameP}/${repoP}/contents/${pathP}`)

    return Promise.resolve(request)
}

function getBlobsFromFile(usernameP, repoP, shaP) {

    let response = fetch(`https://api.github.com/repos/${usernameP}/${repoP}/git/blobs/${shaP}`)

    return Promise.resolve(response)
}

function getLanguageImage(languageP) {
    switch (languageP) {
        case "HTML":
            return "html_icon.png"
    
        case "Go":
            return "go_icon.png"

        case "Python":
            return "python_icon.png"

        case "PHP":
            return "php_icon.png"

        default:
            return "settings_icon.png"
    }
}

function setUserData() {
    getUserData(username).then(response => response.json()).then(data => {
        console.log(data)
    
        let nameTag = document.getElementById('user-name')
        let profilePictureTag = document.getElementById('profile-picture')
        let bioTag = document.getElementById('bio')
        let locationTag = document.getElementById('location')
        let companyTag = document.getElementById('company')
    
        let username = data["name"]
        nameTag.innerHTML =  username
    
        let profilePicture = data["avatar_url"]
        profilePictureTag.src = profilePicture
    
        let bio = data["bio"]
        bioTag.innerHTML += bio
    
        let location = data["location"]
        locationTag.innerHTML = location
    
        let company = data["company"]
        companyTag.innerHTML += company
    }) 
}

function setUserRepos() {
    getUserRepos(username).then(response => response.json()).then(data => {
        
        let myProjectsSectionTag = document.getElementById("my-projects")

        console.log(data)
    
        data.forEach(repo => {
            //creating tags
            let imgLanguage = document.createElement("img")
            imgLanguage.classList.add('project-img')

            let div = document.createElement("div")
            div.classList.add('project')

            let h2Name = document.createElement("h2")
            div.classList.add('project-h2')

            let pDescription = document.createElement("p")
            div.classList.add('project-p')

            let pLink = document.createElement("p")
            div.classList.add('project-p')

            let aLink = document.createElement("a")
            div.classList.add('project-a')

            //creating texts
            let h2NameText = document.createTextNode(repo["name"])
            let pDescriptionText = document.createTextNode(repo["description"])
            let aLinkText = document.createTextNode(repo["html_url"])
            
            //appending texts into tags
            let imgPath = "assets/" + getLanguageImage(repo["language"])
            imgLanguage.setAttribute("src", imgPath)
            h2Name.appendChild(h2NameText)
            pDescription.appendChild(pDescriptionText)
            aLink.appendChild(aLinkText)
            aLink.setAttribute("href", aLinkText)
            pLink.appendChild(aLink)

            //appending tags into div
            div.appendChild(imgLanguage)
            div.appendChild(h2Name)
            div.appendChild(pDescriptionText)
            div.appendChild(pLink)

            //appending div into section
            myProjectsSectionTag.appendChild(div)
        });
    })
}