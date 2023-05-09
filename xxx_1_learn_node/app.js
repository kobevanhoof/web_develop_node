const { eventEmittor } = require('events');
const eventEmittor = new EventEmitter();

eventEmittor.on('lunch', () =>{
    console.log('yum')
})

eventEmittor.emit('lunch');
eventEmittor.emit('lunch');