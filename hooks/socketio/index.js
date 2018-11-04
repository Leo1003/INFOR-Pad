const io = require('socket.io')();
const client = require('./client');
const lxtester = require('./lxtester');

module.exports = strapi => {
    const hook = {

        /**
         * Default options
         */

        defaults: {
            // config object
        },

        /**
         * Initialize the hook
         */
        // this.defaults['your_config'] to access to your configs.
        initialize: cb => {
            io.attach(strapi.server);
            client(strapi, io);
            lxtester(strapi, io);

            cb();
        }
    };

    return hook;
};