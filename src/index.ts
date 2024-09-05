import server from './server'
import { Server as SocketIOServer } from 'socket.io';
import http from 'http';
import colors from 'colors'

const IoServer = http.createServer(server);
export const io: SocketIOServer  = new SocketIOServer(IoServer);

const port = process.env.PORT || 4000


io.on('connection', (socket) => {
        console.log('A user connected');
    
        socket.on('disconnect', () => {
        console.log('User disconnected');
        });
    

        socket.on('message', (data) => {
        console.log('Message received: ', data);
    });
});


IoServer.listen(port, ()  => {
    console.log( colors.bgGreen.bold(`REST API funcionando en el puerto ${port}`) )
})

