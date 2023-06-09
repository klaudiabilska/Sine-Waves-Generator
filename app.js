const gui = new dat.GUI();
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

const wave = {
    y: canvas.height / 2,
    length: 0.01,
    amplitude: 100,
    frequency: 0.01
}

const strokeColor = {
    h: 360,
    s: 50,
    l: 50
}

const backgroundColor = {
    r: 0,
    g: 0,
    b: 0,
    a: 0.01
}

const waveFolder = gui.addFolder('wave')
waveFolder.add(wave, 'length', -0.01, 0.01)
waveFolder.add(wave, 'y', 0, canvas.height)
waveFolder.add(wave, 'amplitude', -300, 300)
waveFolder.add(wave, 'frequency', -0.01, 1)
waveFolder.open()

const strokeFolder = gui.addFolder('stroke')
strokeFolder.add(strokeColor, 'h', 0, 360)
strokeFolder.add(strokeColor, 's', 0, 100)
strokeFolder.add(strokeColor, 'l', 0, 100)
strokeFolder.open()

const backgroundColorFolder = gui.addFolder('background')
backgroundColorFolder.add(backgroundColor, 'r', 0, 255)
backgroundColorFolder.add(backgroundColor, 'g', 0, 255)
backgroundColorFolder.add(backgroundColor, 'b', 0, 255)
backgroundColorFolder.add(backgroundColor, 'a', 0, 1)
backgroundColorFolder.open()


let increment = wave.frequency
// controls
function animate() {
    requestAnimationFrame(animate)
    c.fillStyle = `rgba(${backgroundColor.r}, ${backgroundColor.g}, ${backgroundColor.b}, ${backgroundColor.a})`
    c.fillRect(0, 0, canvas.width, canvas.height)
    

    c.beginPath()   
    c.moveTo(-1, canvas.height / 2)

    //draw
    for (let i = -1; i < canvas.width; i++) {
    c.lineTo(i, wave.y + Math.sin(i * wave.length + increment) * wave.amplitude * Math.sin(increment))
    }

    c.strokeStyle = `hsl(${Math.abs(strokeColor.h * Math.sin(increment))}, ${
        strokeColor.s
      }%, ${strokeColor.l}%)`
      c.stroke()
      increment += wave.frequency
}

animate()