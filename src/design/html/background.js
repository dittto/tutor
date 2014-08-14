/**
 *
 * @returns {{bg: *}}
 * @constructor
 */
var TutorHtmlBackground = function () {
    "use strict";

    // init vars
    var obj = {};

    /**
     *
     * @param config
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
