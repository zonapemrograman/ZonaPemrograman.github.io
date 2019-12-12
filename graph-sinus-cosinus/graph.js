const canvas = document.getElementById('canvas')
canvas.width = 651
canvas.height = 300
const ctx = canvas.getContext('2d')

// window
const xwmin = 0
const xwmax = 7
const ywmin = -1.5
const ywmax = 1.5

// viewport 
const xvmin = 0
const xvmax = 700
const yvmin = 0
const yvmax = 300

// function window to viewport
function WV (xw, yw) {
    const xv = xvmin + Math.round((xw - xwmin) * (xvmax - xvmin) / (xwmax - xwmin))
    const yv = Math.round((ywmax - yw) * (yvmax - yvmin) / (ywmax - ywmin)) - yvmin
    return {
        x: xv,
        y: yv
    }
}

function drawPoint (x, y, color) {
    ctx.beginPath()
    ctx.fillStyle = color
    ctx.fillRect(x, y, 1, 1)
    ctx.closePath()
}

function sinus () {
    let pointX = 0
    let point = {}
    while (pointX < 2 * Math.PI) {
        point = WV(pointX, Math.sin(pointX))
        console.log(point);
        drawPoint(point.x, point.y, 'green')
        pointX += 0.01
    }
}

function cosinus () {
    let pointX = 2 * Math.PI
    let point = {}
    while (pointX > 0) {
        point = WV(pointX, Math.cos(pointX + Math.PI / 2))
        console.log(point)
        drawPoint(point.x, point.y, 'green')
        pointX -= 0.01
    }
}

sinus()
cosinus()