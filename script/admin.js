const button = document.getElementById('btn')
const password = document.getElementById('password')

async function sendPassword(callback) {
    const data = {guess: password.value}

    const options = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    }

    const res = await fetch('/password', options)
    const response = await res.json()
    console.log(response)

    callback()
}

function changeWindow() {
    window.location = "/private"
}

button.onclick = async function() {
    sendPassword(changeWindow)
}