'use strict';

/**
 * Usersetting.js controller
 *
 * @description: A set of functions called "actions" for managing `Usersetting`.
 */

module.exports = {

  /**
   * Retrieve usersetting records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.usersetting.search(ctx.query);
    } else {
      return strapi.services.usersetting.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a usersetting record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    if (!ctx.params._id.match(/^[0-9a-fA-F]{24}$/)) {
      return ctx.notFound();
    }

    return strapi.services.usersetting.fetch(ctx.params);
  },

  /**
   * Count usersetting records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.usersetting.count(ctx.query);
  },

  /**
   * Create a/an usersetting record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.usersetting.add(ctx.request.body);
  },

  /**
   * Update a/an usersetting record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.usersetting.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an usersetting record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.usersetting.remove(ctx.params);
  }
};
