const position = document.getElementsByClassName('position--players')

function createPlayer(x) {
    const player = document.createElement('div')
    player.classList.add('player')

    player.innerHTML = `<div class="image"><img src="players/${x.image}.png"></div>`
    
    const info = document.createElement('div')
    info.classList.add('info')
    player.appendChild(info)

    const d = new Date(x.date);
    let date = d.getDate() + "." + d.getMonth() + "." + d.getFullYear()

    info.innerHTML = '<div class="name"><p class="number">'+x.number+' </p> <p class="fullname">'+x.name+' '+x.surname+'</p></div>'
    info.innerHTML += '<p>'+date+'</p>'

    switch (x.position) {
        case "gk":
            position[0].appendChild(player)
          break;
        case "def":
            position[1].appendChild(player)
          break;
        case "mid":
            position[2].appendChild(player)
          break;
        case "for":
            position[3].appendChild(player)
          break;
      }
}

async function getPlayers() {
    const res = await fetch('/players')
    const response = await res.json()
  
    let players = response.docs

    for (let i = 0; i < players.length; i++) {
      createPlayer(players[i])
    }
}

getPlayers()