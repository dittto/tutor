/**
 *
 * @param $
 * @param htmlObj
 * @param configManager
 * @returns {{show: Function, remove: Function, getConfig: *}}
 * @constructor
 */
var TutorBackground = function($, htmlObj, configManager) {
    // init vars
    var obj = {}, defaultConfig;

    /**
     *
     * @type {{bgClass: string}}
     */
    defaultConfig = {
        bgClass: 'tutor-box-bg'
    };
    configManager.setDefaultConfig(defaultConfig);

    /**
     *
     * @param config
     */
    obj.show = function(config) {
        var $bg = $('.' + config.bgClass);

        if ($bg.length === 0) {
            $('body').append(htmlObj.bg(config));
        }
    };

    /**
     *
     * @param config
     */
    obj.remove = function(config) {
        $('.' + config.bgClass).remove();
    };

    /**
     * Public methods
     */
    return {
        show: obj.show,
        remove: obj.remove,
        getConfig: configManager.getConfig
    }
};