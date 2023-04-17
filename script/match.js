const buttons = document.getElementsByClassName('buttons')
const opponent = document.getElementById('opponent')
const stadium = document.getElementById('stadium')
const league = document.getElementById('league')
const time = document.getElementById('time')
const date = document.getElementById('date')
const submit = document.getElementById('submit')
const imgForm = document.getElementById('imgForm')

let match = {
    home: true
}

buttons[0].disabled = true
league.value = 'Medjuopstinska liga "B"'
stadium.value = 'Stadion FK Zvezdara, Zvezdara'

buttons[1].onclick = function() {
    buttons[0].disabled = false
    buttons[1].disabled = true

    match.home = false
}

buttons[0].onclick = function() {
    buttons[1].disabled = false
    buttons[0].disabled = true

    match.home = true
    stadium.value = 'Stadion FK Zvezdara, Zvezdara'
}

function sendMatch() {
    match.league = league.value
    match.stadium = stadium.value
    match.opponent = opponent.value
    match.date = date.value
    match.time = time.value

    return match
}

async function sendData() {
    const data = sendMatch()

    const options = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    }

    const res = await fetch('/match', options)
    const response = await res.json()
    console.log(response)
}

async function sendImage() {
    const formData = new FormData(imgForm);
    //console.log(formData)
    const options = {
        method: 'POST',
        body: formData
    };

    const res = await fetch('/emblem', options)
    const response = await res.json()
    console.log(response.message)
    
    alert("Photo submited!");
}

submit.onclick = function() {
    sendData()
    sendImage()
}