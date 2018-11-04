'use strict';

/**
 * Filesystem.js controller
 *
 * @description: A set of functions called "actions" for managing `Filesystem`.
 */

module.exports = {

  /**
   * Retrieve filesystem records by short id
   *
   * @return {Object|Array}
   */

  get: async (ctx) => {
    if (ctx.query.shortid) {
      return strapi.services.filesystem.findByShort(ctx.query.shortid)
    } else {
      ctx.response.badRequest("Short ID not Found")
    }
  },

  /**
   * Retrieve a filesystem record.
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
   * Create a/an filesystem record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.filesystem.add(ctx.request.params._id, ctx.request.body);
  },

  /**
   * Update a/an filesystem record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.filesystem.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an filesystem record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.filesystem.remove(ctx.params);
  }
};
