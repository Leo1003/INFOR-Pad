'use strict';

/**
* Filesystem.js service
*
* @description: A set of functions similar to controller's actions to avoid code duplication.
*/

// Public dependencies.
const _ = require('lodash');
const util = require('util');

module.exports = {
    extractFSData: async function (fs, complete, extend) {
        let ret = {
            id: fs._id,
            name: fs.name,
            description: fs.description,
            parent: fs.parent || "",
            owner: fs.owner,
            createDate: fs.createDate,
            modifyDate: fs.modifyDate,
            isPublic: fs.isPublic,
            shortid: (fs.shortid ? fs.shortid : ''),
            format: fs.isFile === true ? fs.format : 'Directory'
        };
        if (fs.isFile === true) {
            ret.size = (new util.TextEncoder('utf-8').encode(fs.code.length).length);
            ret.size += (new util.TextEncoder('utf-8').encode(fs.stdin.length).length);
            ret.size += (new util.TextEncoder('utf-8').encode(fs.description.length).length);
        }
        if (extend == true) {
            if (fs.parent) {
                await fs.populate('parent').execPopulate();
                ret.parent = await strapi.services.filesystem.extractFSData(fs.parent, false);
            } else {
                ret.parent = {};
            }
            if (fs.owner) {
                await fs.populate('owner').execPopulate();
                ret.owner = await strapi.services.filesystem.extractUserData(fs.owner, false);
            }
        }
        if (complete == true) {
            ret.editSecret = fs.editSecret;
            if (fs.isFile === true) {
                ret.code = fs.code;
                ret.stdin = fs.stdin;
            } else {
                ret.files = [];
                let dir = await fs.populate('files').execPopulate();
                for (let chld of dir.files) {
                    ret.files.push(await strapi.services.filesystem.extractFSData(chld, false));
                }
            }
        }
        return ret;
    },
    extractUserData: (user, privData) => {
        let ret = {};
        if (!user) {
            return undefined;
        } else {
            if (privData === null) {
                return user;
            }
            ret.id = user._id;
            ret.name = user.name;
            ret.level = user.level;
            ret.createDate = user.createDate;
            if (privData == true) {
                ret.lastLogin = user.lastLogin;
                ret.email = user.email;
                ret.rootfsid = user.root;
                strapi.log.debug(user.settings);
                ret.settings = user.settings;
            }
        }
        return ret;
    },
    /************************
    ***    getAccess     ***
    ************************
    2 = Read/Write
    1 = Read Only
    0 = No Access
    */
    getAccess: (fs, userid) => {
        if (!fs) {
            return undefined;
        }
        if (strapi.services.filesystem.isTempFile(fs) == true) {
            if (userid && userid == fs.editSecret) {
                return 2;
            } else {
                return 1;
            }
        } else {
            if (userid && userid.equals(fs.owner)) {
                return 2;
            } else if (fs.isPublic === true) {
                return 1;
            } else {
                return 0;
            }
        }
    },

    /**
    * Promise to get a filesystem object.
    *
    * @return {Promise}
    */

    getFs: async (query, condition) => {
        let fs = await Filesystem.findOne(query);
        if (!fs) {
            return undefined;
        }
        /// Check type
        if (condition && condition.type) {
            if (condition.type == 'root') {
                if (!strapi.services.filesystem.isRootDir(fs)) {
                    return null;
                }
            } else if (condition.type == 'directory') {
                if (fs.isFile != false) {
                    return null;
                }
            } else if (condition.type == 'file') {
                if (fs.isFile != true) {
                    return null;
                }
            } else if (condition.type == 'tmp') {
                if (!strapi.services.filesystem.isTempFile(fs)) {
                    return null;
                }
            }
        }
        /// Check Permission
        if (condition && condition.permission) {
            if (strapi.services.filesystem.getAccess(fs, condition.userid) < condition.permission) {
                return null;
            }
        }
        return fs;
    },

    /**
    * Promise to fetch a/an filesystem.
    *
    * @return {Promise}
    */

    fetch: (params) => {
        // Select field to populate.
        const populate = Filesystem.associations
        .filter(ast => ast.autoPopulate !== false)
        .map(ast => ast.alias)
        .join(' ');

        return Filesystem
        .findOne(_.pick(params, _.keys(Filesystem.schema.paths)))
        .populate(populate);
    },

    /**
    * Promise to add a/an filesystem.
    *
    * @return {Promise}
    */

    add: async (values) => {
        // Extract values related to relational data.
        const relations = _.pick(values, Filesystem.associations.map(ast => ast.alias));
        const data = _.omit(values, Filesystem.associations.map(ast => ast.alias));

        // Create entry with no-relational data.
        const entry = await Filesystem.create(data);

        // Create relational data and return the entry.
        return Filesystem.updateRelations({ _id: entry.id, values: relations });
    },

    /**
    * Promise to edit a/an filesystem.
    *
    * @return {Promise}
    */

    edit: async (params, values) => {
        // Extract values related to relational data.
        const relations = _.pick(values, Filesystem.associations.map(a => a.alias));
        const data = _.omit(values, Filesystem.associations.map(a => a.alias));

        // Update entry with no-relational data.
        const entry = await Filesystem.update(params, data, { multi: true });

        // Update relational data and return the entry.
        return Filesystem.updateRelations(Object.assign(params, { values: relations }));
    },

    /**
    * Promise to remove a/an filesystem.
    *
    * @return {Promise}
    */

    remove: async params => {
        // Select field to populate.
        const populate = Filesystem.associations
        .filter(ast => ast.autoPopulate !== false)
        .map(ast => ast.alias)
        .join(' ');

        // Note: To get the full response of Mongo, use the `remove()` method
        // or add spent the parameter `{ passRawResult: true }` as second argument.
        const data = await Filesystem
        .findOneAndRemove(params, {})
        .populate(populate);

        if (!data) {
            return data;
        }

        await Promise.all(
            Filesystem.associations.map(async association => {
                if (!association.via || !data._id) {
                    return true;
                }

                const search = _.endsWith(association.nature, 'One') || association.nature === 'oneToMany' ? { [association.via]: data._id } : { [association.via]: { $in: [data._id] } };
                const update = _.endsWith(association.nature, 'One') || association.nature === 'oneToMany' ? { [association.via]: null } : { $pull: { [association.via]: data._id } };

                // Retrieve model.
                const model = association.plugin ?
                strapi.plugins[association.plugin].models[association.model || association.collection] :
                strapi.models[association.model || association.collection];

                return model.update(search, update, { multi: true });
            })
        );

        return data;
    },

        /**
        * Promise to search a/an filesystem.
        *
        * @return {Promise}
        */

        search: async (params) => {
            // Convert `params` object to filters compatible with Mongo.
            const filters = strapi.utils.models.convertParams('filesystem', params);
            // Select field to populate.
            const populate = Filesystem.associations
            .filter(ast => ast.autoPopulate !== false)
            .map(ast => ast.alias)
            .join(' ');

            const $or = Object.keys(Filesystem.attributes).reduce((acc, curr) => {
                switch (Filesystem.attributes[curr].type) {
                    case 'integer':
                    case 'float':
                    case 'decimal':
                    if (!_.isNaN(_.toNumber(params._q))) {
                        return acc.concat({ [curr]: params._q });
                    }

                    return acc;
                    case 'string':
                    case 'text':
                    case 'password':
                    return acc.concat({ [curr]: { $regex: params._q, $options: 'i' } });
                    case 'boolean':
                    if (params._q === 'true' || params._q === 'false') {
                        return acc.concat({ [curr]: params._q === 'true' });
                    }

                    return acc;
                    default:
                    return acc;
                }
            }, []);

            return Filesystem
            .find({ $or })
            .sort(filters.sort)
            .skip(filters.start)
            .limit(filters.limit)
            .populate(populate);
    },
    isRootDir: (fs) => {
        return (!fs.parent && fs.name == 'Root' && fs.isFile == false)
    },
    isTempFile: (fs) => {
        return (!fs.parent && !fs.owner && fs.isFile == true)
    }
};
