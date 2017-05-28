Object.size = function(obj) {
    let size = 0
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) size++
    }
    return size
}
class lxtesterServer {
    constructor() {
        this.clients = {}
        this.taskcounter = 0
    }
    push(socket) {
        let s = {
            name: '',
            pending: 0,
            suspend: false,
            socket: socket,
            tasks: {}
        }
        this.clients[socket.id] = s
    }
    findIdlest() {
        let min = Infinity
        let id = ''
        for (let sid in this.clients) {
            let s = this.clients[sid]
            let count = Object.size(s.tasks)
            if (s.suspend == false && count < min) {
                min = count
                id = s.socket.id
            }
        }
        if (id == '') {
            throw new Error('No lxtester available now.\nPlease contact the administrator.')
        }
        return id
    }
    setName(socketid, name) {
        this.clients[socketid].name = name
    }
    sendJob(task) {
        let clientid = this.findIdlest()
        task.id = this.taskcounter
        this.taskcounter++
        let job = {
            id: task.id,
            language: task.language,
            exefile: task.file.name,
            srcfile: task.file.name,
            stdin: task.file.stdin,
            code: task.file.code
        }
        console.log(`TargetID: ${clientid}`)
        console.log(this.clients[clientid])
        this.clients[clientid].socket.emit('Job', job)
        this.clients[clientid].tasks[task.id] = task
        return task.id
    }
    suspend(socketid) {
        this.clients[socketid].suspend = true
    }
    resume(socketid) {
        this.clients[socketid].suspend = false
    }
    receiveJob(clientid, result) {
        let task = this.clients[clientid].tasks[result.id]
        delete this.clients[clientid].tasks[result.id]
        task.result = result
        return task
    }
    remove(clientid) {
        let uncompleted = []
        for (let task in this.clients[clientid].tasks) {
            uncompleted.push(task)
        }
        delete this.clients[clientid]
        return uncompleted
    }
}

module.exports.lxtesterServer = lxtesterServer
