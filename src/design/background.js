/**
 * An object to create the background as required for Tutor
 *
 * @param $ The jQuery object
 * @param htmlObj The object to create the html
 * @param configManager A config manager to control and merge the various
 * configs
 * @returns {{show: Function, remove: Function, getConfig: *}}
 * @constructor
 */
var TutorBackground = function ($, htmlObj, configManager) {
    "use strict";

    // init vars
    var obj = {}, defaultConfig;

    /**
     * The default config
     *  - bgClass: a class name for the background
     *
     * @type {{bgClass: string}}
     */
    defaultConfig = {
        bgClass: 'tutor-box-bg'
    };
    configManager.setDefaultConfig(defaultConfig);

    /**
     * Adds the background html to the body if not already added
     *
     * @param config The merged config for TutorBackground()
     */
    obj.show = function (config) {
        var $bg = $('.' + config.bgClass);

        if ($bg.length === 0) {
            $('body').append(htmlObj.bg(config));
        }
    };

    /**
     * Removes the background from the body
     *
     * @param config The merged config for TutorBackground()
     */
    obj.remove = function (config) {
        $('.' + config.bgClass).remove();
    };

    /**
     * Public methods
     */
    return {
        show: obj.show,
        remove: obj.remove,
        getConfig: configManager.getConfig
    };
};
