const articles = document.getElementById('articles')

let news

function changeNews(x) {
    localStorage.setItem("article", JSON.stringify(x))
    window.location.href = "article.html"
}

function createHTML(x) {
    const article = document.createElement('div')
    article.classList.add('article')

    const container = document.createElement('div')
    container.classList.add('container')
    container.innerHTML = '<img class="newsImg" src="uploads/'+x.image+'.png">'

    
    container.onclick = function() {
        changeNews(x)
    }

    const newsText = x.text.slice(0, 200) + "..."

    const text = document.createElement('div')
    text.classList.add('text')
    text.innerHTML = '<h1 class="link">'+x.name+'</h1> <p>'+newsText+'</p>'

    
    text.onclick = function() {
        changeNews(x)
    }

    article.appendChild(container)
    article.appendChild(text)

    articles.appendChild(article)
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

    if(news.length > 10) {
        for(let i = 0; i < 10; i++) {
            createHTML(news[i])
        }
    }else {
        for(let i = 0; i < news.length; i++) {
            createHTML(news[i])
        }
    }

    console.log(news)
}

getNews()
