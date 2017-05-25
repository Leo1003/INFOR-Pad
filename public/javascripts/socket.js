var socket = undefined;
function connect(sessionid, callback) {
    socket = io('/client', {query: `sessionid=${sessionid}`});
    socket.on('connect', () => {
        console.log("Connected to server!");
        callback();
    });
    socket.on('error', error => {
        console.error(error)
        callback(error);
    });
}
function cancel() {
    socket.emit('Cancel');
}
function onResult(callback) {
    socket.on('Result', data => {
        let result = {};
        result.id = data.id;
        if (data.type == 2) {
            result.status = 'Error';
        } else if (data.type == 1) {
            result.status = 'ComplieError';
        } else if (data.type == 0) {
            result.status = 'Success';
        }
        result.time = data.time != -1 ? data.time : undefined;
        result.memory = data.memory != -1 ? data.memory : undefined;
        result.exitcode = data.exitcode;
        result.signal = data.signal;
        result.killed = data.killed;
        result.stdout = data.output;
        result.stderr = data.error;
        return callback(result);
    });
}
function submit(fileid, language, stdin) {
    socket.emit('Submit', {
        fileid: fileid,
        language: language,
        stdin: stdin
    });
}
