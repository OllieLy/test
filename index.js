const SerialPort = require('serialport')

const port = new SerialPort('/dev/cu.usbserial-1440', {
    baudRate: 57600
})

const reset = Buffer.from('CC023C555F', 'hex')

port.write(reset, function(err) {
    if (err) {
        return console.log('Error on write: ', err.message)
    }
    console.log('message written')
})

port.on('error', function(err) {
    console.log('Error: ', err.message)
  })

port.on('readable', function () {
console.log('Data:', port.read())
})

// Switches the port into "flowing mode"
port.on('data', function (data) {
console.log('Data:', data)
})

// commandBuilder(command) {
//     const header = '02303081'; // Each message must start with this sequence
//     let start = Buffer.from(header + command, 'hex')
//     let checksumTotal = start[0]

//     for(let i = 1; i<start.length; i++) {
//         checksumTotal = checksumTotal + start[i]
//     }

//     checksumTotal = parseInt(checksumTotal).toString(16).substring(1,3)
//     let end = Buffer.from('F' + checksumTotal[1] + checksumTotal[0] + 'F03', 'hex')
//     let full = Buffer.concat([start,end])
//     return full
// }