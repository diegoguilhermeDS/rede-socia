/* Desenvolva a lógica da página aqui */


function createModalPost(id) {
    let containerPrincipal = document.querySelector(".container-principal")

    for (let i = 0; i < users.length; i++) {
        if (Number(id) === users[i].id) {
            let user = users[i]
            let postUser = ""

            for (let p = 0; p < posts.length; p++) {
                if (posts[p].user === user.id) {
                    postUser = posts[p]
                }
            }

            let modalPost = document.createElement("div")
            modalPost.classList.add("modal-post")

            modalPost.innerHTML = `
                <div class="card-modal-post">
                    <button class="button-close">X</button>
                    <div class="infor-user-post">
                        <img src="${user.img}" alt="image user">
                        <div>
                            <h3>${user.user}</h3>
                            <span>${user.stack}</span>
                        </div>
                    </div>
                    <div class="content-post">
                        <h3>${postUser.title}</h3>
                        <p>${postUser.text}</p>
                    </div>
                </div>
            `

            containerPrincipal.appendChild(modalPost)

            let closeModal = document.querySelector(".button-close")
            closeModal.addEventListener("click", removeModalPost)
        }
    }

    

    
}

function removeModalPost() {
    let containerPrincipal = document.querySelector(".container-principal")

    for (let i = 0; i < containerPrincipal.children.length; i++) {
        if (containerPrincipal.children[i].className === "modal-post") {
            containerPrincipal.children[i].remove()
        }
    }
}

function createPost(list) {
    let sectionPost = document.querySelector(".section-post")
    sectionPost.innerHTML = ""

    sectionPost.innerHTML = `<h2>Posts</h2>`
    for (let i = 0; i < list.length; i++) {
        let post = list[i]
        let userPost = ""

        for (let u = 0; u < users.length; u++) {
            if (post.user === users[u].id) {
                userPost = users[u]
            }
        }

        let containerPost = document.createElement("article")
        containerPost.classList.add("container-post")
        containerPost.id = `${userPost.id}`

        containerPost.innerHTML = `
            <div class="infor-user-post" >
                <img src="${userPost.img}" alt="image user">
                <div>
                    <h3>${userPost.user}</h3>
                    <span>${userPost.stack}</span>
                </div>
            </div>
            <div class="content-post">
                <h3>${post.title}</h3>
                <p>${post.summary}</p>
            </div>
            <div class="interation-post">
                <button class="button-grey1">Abrir Post</button>
                <button class="button-img-like"><img src="../../assets/img/heart.png" alt="like"><span>0</span></button>
            </div> 
        `

        sectionPost.appendChild(containerPost)
    }

    let buttonOpenPost = document.querySelectorAll(".button-grey1")
    let buttonLike = document.querySelectorAll(".button-img-like")

    for (let b = 0; b < buttonOpenPost.length; b++) {
        let idPost = buttonOpenPost[b].parentElement.parentElement.id
        buttonOpenPost[b].addEventListener("click", function(){
            createModalPost(idPost)
        })
    }

    for (let l = 0; l < buttonLike.length; l++) {
        buttonLike[l].addEventListener("click", function(){
            buttonLike[l].classList.toggle("like")
            let classButton = buttonLike[l].className.split(' ')

            if (classButton[classButton.length - 1] === "like") {
                buttonLike[l].children[0].style.filter = "none"

                let valueLike = parseInt(buttonLike[l].children[1].innerText)
                buttonLike[l].children[1].innerText = valueLike + 1

            } else {
                buttonLike[l].children[0].style.filter = "grayscale(1) brightness(1.5)"

                let valueLike = parseInt(buttonLike[l].children[1].innerText)
                buttonLike[l].children[1].innerText = valueLike - 1
            }
            
        })
    }
}

function createAsideList(list) {
    let tagUl = document.getElementById("list-follow")

    for (let i = 0; i < list.length; i++) {
        let userFollow = ""
        for (let u = 0; u < users.length; u++) {
            if (list[i] === users[u].id) {
                userFollow = users[u]
            }
        }

        let tagLi = document.createElement("li")
        tagLi.classList.add("follow-user")
        tagLi.innerHTML = `
            <div class="infor-user-post">
                <img src="${userFollow.img}" alt="image user">
                <div>
                    <h3>${userFollow.user}</h3>
                    <span>${userFollow.stack}</span>
                </div>
            </div>
            <button class="button-outline-medium">Seguindo</button>
        `

        tagUl.appendChild(tagLi)
    }

}

function follow() {
    let usersFollow = document.querySelectorAll(".follow-user")

    for (let i = 0; i < usersFollow.length; i++) {
        let but = usersFollow[i].children[1]

        but.addEventListener("click", function(){
            but.classList.toggle("button-outline-medium-active")
        })
    }
}

function loginUser() {
    let sectionMakePost = document.querySelector(".section-make-post")
    
    let inforUserPost = document.createElement("div")
    let formPost = document.createElement("form")
    
    inforUserPost.classList.add("infor-user-post")
    formPost.classList.add("form-post")
    
    inforUserPost.innerHTML = `
        <img src="${userCurrent.img}" alt="image user">
        <div>
            <h3>${userCurrent.user}</h3>
            <span>${userCurrent.stack}</span>
        </div>
        `
    formPost.innerHTML = `
        <input class="input-post" type="text" placeholder="Digitar título do post" required>
        <textarea class="textarea-post" name="textarea" cols="3" rows="0" placeholder="Digitar descrição do post" required></textarea>
        <button id="push-post" class="button-defaul ">Postar</button>
    `
        
    sectionMakePost.append(inforUserPost, formPost)
}
    
createPost(posts)
createAsideList(sugestUsers)
follow()
loginUser()


function renderPost(event) {
    event.preventDefault() 

    let input = document.querySelector(".input-post")
    let textArea = document.querySelector(".textarea-post")

    let newPost = {
        id_post: posts.length + 1,
        user: userCurrent.id,
        title: "",
        text: "",
        summary: "",
    }

    if (input.value.length > 1 && textArea.value.length > 1) {
        newPost.title = input.value
        newPost.text = textArea.value
        newPost.summary = textArea.value

        let newListPost = posts
        newListPost.push(newPost)

        createPost(newListPost.reverse())

        input.value = ""
        textArea.value = ""
    }

    
}

let buttonPush = document.querySelector("#push-post")
buttonPush.addEventListener("click", renderPost)
