'use strict';

/**
 * Filesystem.js controller
 *
 * @description: A set of functions called "actions" for managing `Filesystem`.
 */

module.exports = {

  /**
   * Retrieve filesystem records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.filesystem.search(ctx.query);
    } else {
      return strapi.services.filesystem.fetchAll(ctx.query);
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
   * Count filesystem records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.filesystem.count(ctx.query);
  },

  /**
   * Create a/an filesystem record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.filesystem.add(ctx.request.body);
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
