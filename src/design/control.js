/**
 * Creates the controls for the tutorials - the reset, cancel, and pause
 * options
 *
 * @param $ The jquery object
 * @param htmlObj The object that creates the html
 * @param configManager A manager that merges all of the configs into one for
 * this object
 * @param promiseFactory Creates promise objects as one is created whenever the
 * controls are shown
 * @returns {{showControls: (*|Function), hideControls: Function, getConfig: *}}
 * @constructor
 */
var TutorControl = function ($, htmlObj, configManager, promiseFactory) {
    "use strict";

    // init vars
    var obj = {}, defaultConfig;

    /**
     * The default config
     *  - id: The dom id of the control box
     *  - pauseId: The dom id of the pause button
     *  - resetId: The dom id of the reset button
     *  - cancelId: The dom id of the cancel button
     *
     * @type {{id: string, pauseId: string, resetId: string, cancelId: string}}
     */
    defaultConfig = {
        id: 'tutor-control',
        pauseId: 'tutor-control-pause',
        resetId: 'tutor-control-reset',
        cancelId: 'tutor-control-cancel'
    };
    configManager.setDefaultConfig(defaultConfig);

    /**
     * Shows a single set of the controls by appending it to the body
     *
     * @param config The config for the controls
     * @returns {$.Deferred}
     */
    obj.showControls = function (config) {
        // try and find the control box
        var $control = $('#' + config.id);

        // add the control box if not already added
        if ($control.length === 0) {
            // add the box to the page
            $('body').append(htmlObj.box(config));

            // set up events
            $('body').on({
                'click.tutorcontrol': function () {
                    obj.handlePause();
                }
            }, '#' + config.pauseId);
            $('body').on({
                'click.tutorcontrol': function () {
                    obj.handleReset();
                }
            }, '#' + config.resetId);
            $('body').on({
                'click.tutorcontrol': function () {
                    obj.handleCancel();
                }
            }, '#' + config.cancelId);

            // set up the deferred
            obj.promise = new promiseFactory.init();
        }

        return obj.promise.getPromise();
    };

    /**
     * Hides the controls and removes any associated events
     *
     * @param config The config for the controls
     */
    obj.hideControls = function (config) {
        $('#' + config.id).remove();
        $('body').off('.tutorcontrol');
    };

    /**
     * Triggered by an event, this updates the promise to say that pause has
     * been selected
     */
    obj.handlePause = function () {
        obj.promise.notify('pause', {});
    };

    /**
     * Triggered by an event, this updates the promise to say that reset has
     * been selected
     */
    obj.handleReset = function () {
        obj.promise.notify('reset', {});
    };

    /**
     * Triggered by an event, this updates the promise to say that cancel has
     * been selected
     */
    obj.handleCancel = function () {
        obj.promise.notify('cancel', {});
    };

    /**
     * Public methods
     */
    return {
        showControls: obj.showControls,
        hideControls: obj.hideControls,
        getConfig: configManager.getConfig
    };
};
