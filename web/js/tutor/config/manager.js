/**
 *
 * @param $
 * @param userConfig
 * @returns {{getConfig: *}}
 * @constructor
 */
var TutorConfigManager = function($, userConfig) {
    // init vars
    var obj = {};
    obj.userConfig = userConfig || {};
    obj.defaultConfig = {};
    obj.config = null;

    /**
     *
     * @param config
     */
    obj.setUserConfig = function(config) {
        obj.userConfig = config;
    };

    /**
     *
     * @returns {*}
     */
    obj.getUserConfig = function() {
        return obj.userConfig;
    };

    /**
     *
     * @param config
     */
    obj.setDefaultConfig = function(config) {
        obj.defaultConfig = config;
    };

    /**
     *
     * @returns {*}
     */
    obj.getDefaultConfig = function() {
        return obj.defaultConfig;
    };

    /**
     *
     * @param overrideConfig
     * @param forceOverride
     * @returns {*}
     */
    obj.getConfig = function(overrideConfig, forceOverride) {
        // if not set, recalculate the config
        if (obj.config === null || forceOverride === true) {
            obj.config = $.extend({}, obj.getDefaultConfig(), obj.getUserConfig(), overrideConfig || {});
        }

        return obj.config;
    };

    /**
     *
     * @param defaultValues
     * @param overrideValues
     * @returns {*}
     */
    obj.merge = function(defaultValues, overrideValues) {
        return $.extend({}, defaultValues, overrideValues);
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