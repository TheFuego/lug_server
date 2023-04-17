const nameForm = document.getElementById('name')
const imgForm = document.getElementById('imgForm')
const text = document.getElementById('text')
const submitBtn = document.getElementById('submitBtn')

function timeStamp() {
    const date = new Date()

    const day = String(date.getDate())
    const month = String(date.getMonth()+1)
    const year = String(date.getFullYear())
    const time = date.toTimeString().slice(0, 5)

    return day + "." + month + "." + year + " " + time
}

async function saveArticle() {
    let imgName = nameForm.value

    let article = {
        name: nameForm.value,
        image: imgName.replaceAll(" ", "_"),
        text: text.value,
        date: timeStamp()
    }

    return article
}

async function sendData(callback) {
    const data = await saveArticle()
    console.log(data)

    const options = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    }

    const res = await fetch('/article', options)
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

    const res = await fetch('/photo', options)
    const response = await res.json()
    console.log(response.message)
    
    alert("Article submited!");
}

submitBtn.onclick = function() {
    sendData(sendImage)
}