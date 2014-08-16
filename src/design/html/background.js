/**
 * Creates the html for the background object
 *
 * @returns {{bg: *}}
 * @constructor
 */
var TutorHtmlBackground = function () {
    "use strict";

    // init vars
    var obj = {};

    /**
     * Creates the html for the background, from the supplied config options
     *
     * @param config An array of config options from TutorBackground()
     * @returns {string}
     */
    obj.getBg = function (config) {
        return '<div class="' + config.bgClass + '"></div>';
    };

    /**
     * Public methods
     */
    return {
        bg: obj.getBg
    };
};
