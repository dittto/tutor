var TutorCancel = function($, configManager) {
    // init vars
    var obj = {}, defaultConfig, config;

    /**
     *
     * @type {{id: string, pauseId: string, resetId: string, cancelId: string}}
     */
    defaultConfig = {
        id: 'tutor-cancel',
        pauseId: 'tutor-cancel-pause',
        resetId: 'tutor-cancel-reset',
        cancelId: 'tutor-cancel-cancel'
    };
    configManager.setDefaultConfig(defaultConfig);

    // set up events
    config = configManager.getConfig();
    $('body').on({click: function() {obj.handlePause()}}, '#' + config.pauseId);
    $('body').on({click: function() {obj.handleReset()}}, '#' + config.resetId);
    $('body').on({click: function() {obj.handleCancel()}}, '#' + config.cancelId);

    /**
     *
     * @param config
     * @returns {Deferred}
     */
    obj.showCancelButton = function(config) {
        // try and find the cancel box
        var $cancel = $('#' + config.id);

        // add the cancel box if not already added
        if ($cancel.length === 0) {
            // add the box to the page
            $('body').append('<div id="' + config.id + '"><div class="btn-group">' +
                '<button id="' + config.pauseId + '" class="btn btn-default">Pause <span class="glyphicon glyphicon-pause"></span></button>' +
                '<button id="' + config.resetId + '" class="btn btn-default">Reset <span class="glyphicon glyphicon-repeat"></span></button>' +
                '<button id="' + config.cancelId + '" class="btn btn-default">Cancel <span class="glyphicon glyphicon-remove"></span></button></div></div>');

            // set up the deferred
            obj.promise = $.Deferred();
        }

        return obj.promise;
    };

    /**
     *
     * @param config
     */
    obj.hideCancelButton = function(config) {
        $('#' + config.id).remove();
    };

    /**
     *
     */
    obj.handlePause = function() {
        obj.promise.notify('pause');
    };

    /**
     *
     */
    obj.handleReset = function() {
        obj.promise.notify('reset');
    };

    /**
     *
     */
    obj.handleCancel = function() {
        obj.promise.notify('cancel');
    };

    /**
     * Public methods
     */
    return {
        showCancelButton: obj.showCancelButton,
        hideCancelButton: obj.hideCancelButton,
        getConfig: configManager.getConfig
    }
};