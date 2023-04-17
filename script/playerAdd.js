const submit = document.getElementById('submit')
const position = document.getElementById('position')
const nameForm = document.getElementById('name')
const surname = document.getElementById('surname')
const number = document.getElementById('number')
const date = document.getElementById('date')

const imgForm = document.getElementById('imgForm')

async function savePlayer() {
    let imgName = number.value + nameForm.value + surname.value

    let player = {
        name: nameForm.value,
        surname: surname.value,
        number: number.value,
        position: position.value,
        image: imgName.replaceAll(" ", "_"),
        date: date.value
    }

    return player
}

async function sendData(callback) {
    const data = await savePlayer()
    console.log(data)

    const options = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    }

    const res = await fetch('/player', options)
    const response = await res.json()
    console.log(response)

    callback()
}

async function sendImage() {
    const formData = new FormData(imgForm);
    //console.log(formData)
    const options = {
        method: 'POST',
        body: formData
    };

    const res = await fetch('/playerpic', options)
    const response = await res.json()
    console.log(response.message)
    
    alert("Article submited!");
}

function displayPlayers(x) {
    const div = document.createElement('div')
    div.classList.add('player')

    div.textContent = x.number + " " + x.name + " " + x.surname
    const button = document.createElement('button')
    button.textContent = 'X'
    div.appendChild(button)

    button.onclick = function() {
        sendDelete(x)
        location.reload()
    }

    players.appendChild(div)
}

async function sendDelete(x) {
    const data = x

    const options = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    }

    const res = await fetch('/deleteplayers', options)
    const response = await res.json()
    console.log(response)
}

async function getPlayers() {
    const res = await fetch('/players')
    const response = await res.json()
  
    let players = response.docs

    for(let i = 0; i < players.length; i++) {
        displayPlayers(players[i])
    }
}

getPlayers()

submit.onclick = function() {
    sendData(sendImage)
}