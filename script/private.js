const articles = document.getElementById('articles')

function displayNews(x) {
    const div = document.createElement('div')
    div.classList.add('article')

    div.textContent = x.name
    const button = document.createElement('button')
    button.textContent = 'X'
    div.appendChild(button)

    button.onclick = function() {
        sendData(x)
        location.reload()
    }

    articles.appendChild(div)
}

async function sendData(x) {
    const data = x

    const options = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    }

    const res = await fetch('/delete', options)
    const response = await res.json()
    console.log(response)
}

function parseDate(input, format) {
    format = format || 'yyyy-mm-dd'; // default format
    var parts = input.match(/(\d+)/g), 
        i = 0, fmt = {};
    // extract date-part indexes from the format
    format.replace(/(yyyy|dd|mm)/g, function(part) { fmt[part] = i++; });
  
    return new Date(parts[fmt['yyyy']], parts[fmt['mm']]-1, parts[fmt['dd']]);
}

async function getNews() {
    const res = await fetch('/news')
    const response = await res.json()
    
    response.docs.sort(function(a,b){
        return new Date(parseDate(b.date, 'dd.mm.yyyy')) - new Date(parseDate(a.date, 'dd.mm.yyyy'));
    });
  
    news = response.docs

    for(let i = 0; i < news.length; i++) {
        displayNews(news[i])
    }
}

getNews()