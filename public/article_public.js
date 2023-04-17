const img = document.getElementById('img')
const title = document.getElementById('title')
const text = document.getElementById('text')
const date = document.getElementById('date')

let article

if(localStorage.article != undefined) {
    article = JSON.parse(localStorage.article)
}

img.src = 'uploads/'+article.image+'.png'
title.textContent = article.name
text.textContent = article.text
date.textContent = article.date