/**
 * Takes multiple configs and merges them into one coherent one
 *
 * @param userConfig User-level overrides for the config
 * @returns {{getConfig: *}}
 * @constructor
 */
var TutorConfigManager = function (userConfig) {
    "use strict";

    // init vars
    var obj = {};
    obj.userConfig = userConfig || {};
    obj.defaultConfig = {};
    obj.config = null;
    obj.promise = null;

    /**
     * Stores the user's values, which will override the default values
     *
     * @param config The config values
     */
    obj.setUserConfig = function (config) {
        obj.userConfig = config;
    };

    /**
     * Retrieves the user's values
     *
     * @returns {*}
     */
    obj.getUserConfig = function () {
        return obj.userConfig;
    };

    /**
     * Stores the default values. These are the base-level config values
     *
     * @param config The config values
     */
    obj.setDefaultConfig = function (config) {
        obj.defaultConfig = config;
    };

    /**
     * Returns the default values
     *
     * @returns {*}
     */
    obj.getDefaultConfig = function () {
        return obj.defaultConfig;
    };

    /**
     * Gets the config using the default values, user values, and any
     * additional passed to this method. These values are cached but can be
     * recalculated by setting the forceOverride flag to true
     *
     * @param overrideConfig The values to override all others
     * @param forceOverride Set this to break the cache and recalculate the
     * config
     * @returns {*}
     */
    obj.getConfig = function (overrideConfig, forceOverride) {
        // if not set, recalculate the config
        if (obj.config === null || forceOverride === true) {
            obj.config = obj.merge(obj.getDefaultConfig(), obj.getUserConfig());
            obj.config = obj.merge(obj.config, overrideConfig || {});
        }

        return obj.config;
    };

    /**
     * Handles the merging of one set of config values into another
     *
     * @param defaultValues The values to be overridden
     * @param overrideValues The values to override with
     * @returns {*}
     */
    obj.merge = function (defaultValues, overrideValues) {
        // init vars
        var config = {}, key;

        // update config with the values
        for (key in defaultValues) {
            if (defaultValues.hasOwnProperty(key)) {
                config[key] = defaultValues[key];
            }
        }

        // update with the override values
        for (key in overrideValues) {
            if (overrideValues.hasOwnProperty(key)) {
                config[key] = overrideValues[key];
            }
        }

        return config;
    };

    /**
     * Public methods
     */
    return {
        setUserConfig: obj.setUserConfig,
        setDefaultConfig: obj.setDefaultConfig,
        getConfig: obj.getConfig,
        merge: obj.merge
    };
};
