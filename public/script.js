const buttons = document.getElementsByClassName('slideBtn')
const image = document.getElementById('newsImg')
const text = document.getElementById('newsText')
const desc = document.getElementById('newsDesc')
const title = document.getElementById('title')

const teams = document.getElementsByClassName('teams')
const league = document.getElementsByClassName('league')
const info = document.getElementsByClassName('info')

let news
let match
let activeNews = 0

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

    changeTo(0)

    for(let i = 0; i < buttons.length; i++) {
        buttons[i].onclick = function() {
            changeTo(i)
        }
    }

    console.log(news)
}

async function getMatch() {
    const response = await fetch('match.json')
    const data = await response.json()
    match = data

    updateMatch()
}


buttons[0].disabled = true
//image.src = "news2.png"

function changeTo(x) {
    image.src = 'uploads/'+news[x].image+'.png'
    text.textContent = news[x].name

    let newsText = news[x].text.slice(0, 180) + "..."
    desc.textContent = newsText
    
    for(let i = 0; i < buttons.length; i++) {
        buttons[i].disabled = false
    }

    buttons[x].disabled = true

    activeNews = x
}

function dayOfWeek(x) {
    switch (x) {
        case 0:
          return "Nedelja";
        case 1:
          return "Ponedeljak";
        case 2:
           return "Utorak";
        case 3:
          return "Sreda";
        case 4:
          return "Četvrtak";
        case 5:
          return "Petak";
        case 6:
          return "Subota";
      }
}

function updateMatch() {
    const d = new Date(match.date);
    let day = dayOfWeek(d.getDay());
    let date = d.getDate() + "." + d.getMonth() + "." + d.getFullYear()
    let matchString

    switch (match.home) {
        case true:
            matchString = "OFK Lug - " + match.opponent

            teams[0].src = "logo.png"
            teams[1].src = "opponent.png"
          break;
        case false:
            matchString = match.opponent + " - OFK Lug" 

            teams[1].src = "logo.png"
            teams[0].src = "opponent.png"
          break;
    }

    switch (match.league) {
        case 'Medjuopstinska liga "B"':
            league[0].src = "league.png"
          break;
        case 'Međuopstinska liga "B"':
            league[0].src = "league.png"
          break;
        default:
            league[0].src = "noLeague.png"
    }

    info[0].textContent = matchString

    info[1].textContent = match.league
    info[2].textContent = `${day} ${date}, ${match.time}`
    info[3].textContent = match.stadium
}

getMatch()
getNews()

function changeNews() {
    //console.log(news[activeNews])
    localStorage.setItem("article", JSON.stringify(news[activeNews]))
    window.location.href = "article.html"
}

image.onclick = function() {
    changeNews()
}

title.onclick = function() {
    changeNews()
}

setInterval(function () {
  if(activeNews < 3) {
    changeTo(activeNews+1)
  }else if(activeNews == 3) {
    changeTo(0)
  }
}, 10000);