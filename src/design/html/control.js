/**
 * Handles the HTML for the cancel box. This is kept separate so that it can
 * easily be overwritten for different frameworks, such as bootstrap
 *
 * @returns {{box: (Function|*)}}
 * @constructor
 */
var TutorHtmlControl = function() {
    // init vars
    var obj = {};

    /**
     * Gets the html for the control box
     *
     * @param config The config for the control box. This is left quite generic
     * to allow developers to pass though any additional values they require
     * @returns {string}
     */
    obj.getBox = function(config) {
        return '<div id="' + config.id + '"><div class="btn-group">' +
            '<button id="' + config.pauseId + '" class="btn btn-default">Pause <span class="glyphicon glyphicon-pause"></span></button>' +
            '<button id="' + config.resetId + '" class="btn btn-default">Reset <span class="glyphicon glyphicon-repeat"></span></button>' +
            '<button id="' + config.cancelId + '" class="btn btn-default">Cancel <span class="glyphicon glyphicon-remove"></span></button>' +
            '</div></div>';
    };

    /**
     * Public methods
     */
    return {
        box: obj.getBox
    };
};