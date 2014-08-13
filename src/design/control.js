/**
 *
 * @param $
 * @param htmlObj
 * @param configManager
 * @param promiseFactory
 * @returns {{showControls: (*|Function), hideControls: Function, getConfig: *}}
 * @constructor
 */
var TutorControl = function($, htmlObj, configManager, promiseFactory) {
    // init vars
    var obj = {}, defaultConfig, config;

    /**
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

    // set up events
    config = configManager.getConfig();
    $('body').on({'click.tutorcontrol': function() {obj.handlePause()}}, '#' + config.pauseId);
    $('body').on({'click.tutorcontrol': function() {obj.handleReset()}}, '#' + config.resetId);
    $('body').on({'click.tutorcontrol': function() {obj.handleCancel()}}, '#' + config.cancelId);

    /**
     *
     * @param config
     * @returns {Deferred}
     */
    obj.showControls = function(config) {
        // try and find the control box
        var $control = $('#' + config.id);

        // add the control box if not already added
        if ($control.length === 0) {
            // add the box to the page
            $('body').append(htmlObj.box(config));

            // set up the deferred
            obj.promise = new promiseFactory.init();
        }

        return obj.promise.getPromise();
    };

    /**
     *
     * @param config
     */
    obj.hideControls = function(config) {
        $('#' + config.id).remove();
    };

    /**
     *
     */
    obj.handlePause = function() {
        obj.promise.notify('pause', {});
    };

    /**
     *
     */
    obj.handleReset = function() {
        obj.promise.notify('reset', {});
    };

    /**
     *
     */
    obj.handleCancel = function() {
        obj.promise.notify('cancel', {});
    };

    obj.removeControlEvents = function() {
        $('body').off('.tutorcontrol');
    };

    /**
     * Public methods
     */
    return {
        showControls: obj.showControls,
        hideControls: obj.hideControls,
        getConfig: configManager.getConfig,
        removeControlEvents: obj.removeControlEvents
    }
};