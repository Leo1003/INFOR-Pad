class lxtesterServer {
    constructor() {
        this.clients = {}
        this.taskcounter = 0;
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
            if (s.tasks.length < min) {
                min = s.tasks.length
                id = s.socket.id
            }
        }
        return id
    }
    sendJob(task) {
        let clientid = this.findIdlest()
        task.id = this.taskcounter
        this.taskcounter++
        let job = {
            id: task.id,
            language: task.language,
            exefile: task.file.name,
            srcfile: `${task.file.name}.${task.file.format}`,
            stdin: task.file.stdin,
            code: task.file.code
        }
        this.clients[clientid].socket.emit('Job', job)
        this.clients[clientid].tasks[task.id] = task
        return task.id
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