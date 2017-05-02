const mongoose = require('mongoose')
const fsCtrl = require('./controllers/filesystem')

class lxtesterServer {
    constructor() {
        this.clients = {}
        this.tasks = {}
    }
    push(socket) {
        let s = {
            pending: 0,
            socket: socket
        }
        this.clients[socket.id] = s
    }
    findIdlest() {
        let min = Infinity
        let id = ''
        for (let s in this.clients) {
            if (s.pending < min) {
                min = s.pending
                id = s.socket.id
            }
        }
        return id
    }
    async sendJob(socketid, fileid) {
        let file = await fsCtrl.findFile(fileid)
        if (!file) {
            throw new Error("File not Exist")
        }
        if (!this.clients[socketid]) {
            throw new Error("Client not Exist")
        }
        let job = {
            id: 0,
            language: file.format,
            exefile: '',
            srcfile: '',
            stdin: file.stdin,
            code: file.code
            //Need to add consider language
        }
        this.clients[socketid].socket.emit('Job', job)
    }
    remove(socketid) {
        delete this.clients[socket.id]
    }
}
