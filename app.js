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
        stdin: '',
        code : `
#include <iostream>
#include <unistd.h>
using namespace std;
int main(){cout<<"jizz"<<endl;sleep(2);}
`
    },
    {
        id : 2,
        language : 'Python3',
        exefile : '',
        srcfile : '2.py',
        stdin: '',
        code : `
print('Hello, world.')
    `
    },
    {
        id : 3,
        language : 'CPP11',
        exefile : '3',
        srcfile : '3.cpp',
        stdin: '',
        code : `
#include <unistd.h>
int main(){sleep(2);}
`
    },
    {
        id : 4,
        language : 'Java',
        exefile : '4',
        srcfile : '4.java',
        stdin: '',
        code : `
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, world!");
    }
}
`
    },
    {
        id : 5,
        language : 'JavaScript',
        exefile : '5',
        srcfile : '5.js',
        stdin: '',
        code : `
setTimeout(function() {
    console.log('Hello, world!');
}, 25000);
`
    },
    {
        id : 6,
        language : 'Bash',
        exefile : '6',
        srcfile : '6.sh',
        stdin: '',
        code : `
echo "Hello, world!"
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
    });
    let testnum = 6;
    let testobj = testjob[testnum - 1];
    for(let i = 0; i < 1; i++)
    {
        testobj.id = i;
        socket.emit('Job', testobj);
        console.log(`Sent Task. ID: ${i}.`);
    }
});

module.exports = app;
