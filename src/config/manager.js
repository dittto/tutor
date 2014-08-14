/**
 *
 * @param userConfig
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
     *
     * @param config
     */
    obj.setUserConfig = function (config) {
        obj.userConfig = config;
    };

    /**
     *
     * @returns {*}
     */
    obj.getUserConfig = function () {
        return obj.userConfig;
    };

    /**
     *
     * @param config
     */
    obj.setDefaultConfig = function (config) {
        obj.defaultConfig = config;
    };

    /**
     *
     * @returns {*}
     */
    obj.getDefaultConfig = function () {
        return obj.defaultConfig;
    };

    /**
     *
     * @param overrideConfig
     * @param forceOverride
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
     *
     * @param defaultValues
     * @param overrideValues
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
