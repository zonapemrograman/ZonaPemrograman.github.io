// window
const xwmin = 0
const xwmax = 7
const ywmin = -1.2
const ywmax = 1.2

// viewport 
const xvmin = 0
const xvmax = 700
const yvmin = 0
const yvmax = 480

// function window to viewport
function WV (xw, yw) {
    const xv = xvmin + Math.round((xw - xwmin) * (xvmax - xvmin) / (xwmax - xwmin))
    const yv = Math.round((ywmax - yw) * (yvmax - yvmin) / (ywmax - ywmin)) - yvmin
    return {
        x: xv,
        y: yv
    }
}

// sprite loop
function loopSprite () {
    window.requestAnimationFrame(loopSprite)

    coin.update()
    coin.render()

}

function sprite (options) {

    let that = {}, 
        frameIndex = 0, 
        tickCount = 0, 
        tickPointX = 0,
        ticksPerFrame = options.ticksPerFrame || 0,
        numberOfFrames = options.numberOfFrames || 1,
        point = {},
        bool = true

    
    that.context = options.context
    that.width = options.width
    that.height = options.height
    that.image = options.image

    that.update = () => {
        
        tickCount += 1

        if (tickCount > ticksPerFrame) {
            
            tickCount = 0

            // if the current index is in range
            if (frameIndex < numberOfFrames - 1) {
                // go to next frame
                frameIndex += 1
            }
            else{
                frameIndex = 0
            }

        }

        // Position edit
        if (bool) {
            tickPointX += 0.02

            if (tickPointX < 2 * Math.PI) {
                point = WV(tickPointX, Math.sin(tickPointX))          
            }
            else {
                tickPointX = 2 * Math.PI
                bool = !bool
            }
        }
        else {
            tickPointX -= 0.02

            if (tickPointX > 0) {
                point = WV(tickPointX, Math.cos(tickPointX + Math.PI / 2))
            }
            else {
                tickPointX = 0
                bool = !bool
            }
        }

    }
    
    
    that.render = () => {

        // clear the canvas 
        that.context.clearRect(0, 0, canvas.width, canvas.height)

        // draw the animation
        that.context.drawImage(
            that.image,
            frameIndex * that.width / numberOfFrames,
            0,
            that.width / numberOfFrames,
            that.height,
            point.x,
            point.y,
            that.width / numberOfFrames * 0.5,
            that.height * 0.5
        )
    }
    
    return that
}

let coinImage = new Image()

const canvas = document.getElementById('canvas')
canvas.width = 700
canvas.height = 500

let coin = sprite({
    context: canvas.getContext('2d'),
    width: 1000,
    height: 100,
    image: coinImage,
    numberOfFrames: 10,
    ticksPerFrame: 5
})

coinImage.addEventListener('load', loopSprite)
coinImage.src = './images/coin-sprite-animation.png'