const logo = document.getElementById('logo')

window.onscroll = function() {checkTop()}

function checkTop() {
    if (window.pageYOffset >= 100) {
        logo.style.width = '4vw'
    } else {
        logo.style.width = null
    }
}