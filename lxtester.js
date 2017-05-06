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
        this.taskcounter = 0;
    }
    push(socket) {
        let s = {
            pending: 0,
            socket: socket,
            tasks: {}
        }
        console.log(socket)
        this.clients[socket.id] = s
        console.log(this.clients[socket.id])
    }
    findIdlest() {
        let min = Infinity
        let id = ''
        console.log(this.clients)
        for (let sid in this.clients) {
            let s = this.clients[sid]
            console.log(`s = ${s}`)
            let count = Object.size(s.tasks)
            console.log(`count = ${count}`)
            if (count < min) {
                min = count
                id = s.socket.id
            }
        }
        throw new Error('No lxtester available now.\nPlease contact the administrator.')
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
        console.log(`TargetID: ${clientid}`)
        console.log(this.clients[clientid])
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
