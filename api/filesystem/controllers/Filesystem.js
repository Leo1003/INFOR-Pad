'use strict';

/**
* Filesystem.js controller
*
* @description: A set of functions called "actions" for managing `Filesystem`.
*/

module.exports = {

    /**
    * Retrieve files / directories by short id
    *
    * @return {Object|Array}
    */

    get: async (ctx) => {
        if (ctx.query.shortid) {
            let fs = await strapi.services.filesystem.getFs({
                shortid: ctx.query.shortid
            }, {
                type: 'file',
                permission: 1,
                userid: (ctx.state.user ? ctx.state.user._id : undefined)
            });
            if (fs === undefined) {
                return ctx.notFound();
            }
            if (fs === null) {
                return ctx.forbidden();
            }
            return strapi.services.filesystem.extractFSData(fs, false, true);
        } else {
            ctx.response.badRequest("Short ID not Found");
        }
    },

    /**
    * Retrieve a file / directory.
    *
    * @return {Object}
    */

    findOne: async (ctx) => {
        if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
            return ctx.notFound();
        }

        return strapi.services.filesystem.fetch(ctx.params);
    },

    /**
    * Create a file / directory.
    *
    * @return {Object}
    */

    create: async (ctx) => {
        return strapi.services.filesystem.add(ctx.request.params._id, ctx.request.body);
    },

    /**
    * Create a temporatory file.
    *
    * @return {Object}
    */

    createTmp: async (ctx) => {
        return strapi.services.filesystem.add(ctx.request.body);
    },

    /**
    * Edit a file.
    *
    * @return {Object}
    */

    edit: async (ctx, next) => {
        return strapi.services.filesystem.edit(ctx.params, ctx.request.body) ;
    },

    /**
    * Move a file / directory.
    *
    * @return {Object}
    */

    move: async (ctx, next) => {
        return strapi.services.filesystem.move(ctx.request.params._id, ctx.request.params.tgfs);
    },

    /**
    * Delete a file / directory.
    *
    * @return {Object}
    */

    delete: async (ctx, next) => {
        return strapi.services.filesystem.remove(ctx.params);
    }
};
