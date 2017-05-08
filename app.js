const Koa = require('koa');
const app = new Koa();
const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser')();
const logger = require('koa-logger');
const debug = require('debug')('INFOR-Pad:app');
const io = require('socket.io')();

const index = require('./routes/index');
const users = require('./routes/users');

// error handler
onerror(app);

// middlewares
app.use(bodyparser);
app.use(json());
app.use(logger());
app.use(require('koa-static')(__dirname + '/public'));

app.use(views(__dirname + '/views', {
  extension: 'ejs'
}));

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// routes
app.use(index.routes(), index.allowedMethods());
app.use(users.routes(), users.allowedMethods());

var testjob = [
    {
        id : 1,
        language : 'CPP',
        exefile : '1',
        srcfile : '1.cpp',
        code : `
#include <iostream>
#include <unistd.h>
using namespace std;
int main(){cout<<"jizz"<<endl;sleep(5);}
`
    },
    {
        id : 2,
        language : 'Python3',
        exefile : '',
        srcfile : '2.py',
        code : `
print('Hello, world.')
    `
},
    {
        id : 3,
        language : 'CPP11',
        exefile : '3',
        srcfile : '3.cpp',
        code : `
#include <unistd.h>
int main(){sleep(2);}
`
    }
];

app.io = io;
io.of('lxtester').use((socket, next) => {
    if (socket.request.headers.passtoken === 'jizz') return next();
    next(new Error('Authentication error'));
});
io.of('lxtester').on('connection', socket => {
    debug('Lxtester connected.');
    var count = 0;
    socket.on('Result', data => {
        console.log(data);
        /*
        if(count < testjob.length)
            socket.emit('Job', testjob[count++]);
            */
    });
    // socket.emit('Job', testjob[count++]);
    for(let i = 0; i < 10; i++)
    {
        socket.emit('Job', {
        id : i,
        language : 'CPP',
        exefile : '1',
        srcfile : '1.cpp',
        stdin: '',
        code : `
#include <iostream>
#include <unistd.h>
using namespace std;
int main(){cout<<"jizz"<<endl;sleep(2);}
`
    });
        console.log(`Sent Task. ID: ${i}.`);
    }
});

module.exports = app;
