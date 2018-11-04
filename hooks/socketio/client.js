
module.exports = (strapi, io) => {
    io.of('/client').use((socket, next) => {
        strapi.log.debug("Client connecting...")
        socket.sessionData = {}
        socket.submission = {}
        if (socket.handshake.query.token) {
            strapi.plugins['users-permissions'].services.jwt.verify(socket.handshake.query.token).then(auth => {
                if (auth._id === undefined) {
                    throw new Error('Invalid token: Token did not contain required fields');
                }
                socket.sessionData.userid = auth._id;
                return next();
            }).catch(err => {
                strapi.log.debug(err)
                next(err)
            });
        } else {
            next()
        }
    })
    io.of('/client').on('connection', socket => {
        throw new Error('Not Implemented!');
        strapi.log.debug('Client connected')
        socket.on('Submit', data => {
            let sid = socket.id
            fsCtrl.findFile(data.fileid).then(fs => {
                if (!fs) {
                    throw new Error('File not found')
                }
                if (socket.submission.id != undefined) {
                    throw new Error('Has already had one task')
                }
                if (fsCtrl.getAccess(fs, socket.sessionData.userid) > 0) {
                    if (data.stdin) {
                        fs.stdin = data.stdin
                    }
                    socket.submission.id = lxtesterServer.sendJob({
                        socketid: sid,
                        language: data.language,
                        file: fs
                    })
                } else {
                    throw new Error('Permission denied')
                }
            }).catch(err => {
                socket.emit('Result', {
                    id: -1,
                    type: 2,
                    time: -1,
                    memory: -1,
                    exitcode: 0,
                    signal: 0,
                    killed: true,
                    output: '',
                    error: err.message
                })
            })
        })
        socket.on('Cancel', data => {
            io.of('/lxtester').emit('Cancel', {
                id: socket.submission.id
            })
        })
    })
}