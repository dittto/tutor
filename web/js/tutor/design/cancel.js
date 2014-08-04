var TutorCancel = function($, configManager) {
    // init vars
    var obj = {}, defaultConfig;

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

    obj.showCancelButton = function(config) {
        var $cancel = $('#' + config.cancelId);

        if ($cancel.length === 0) {
            $('body').append('<div id="' + config.cancelId + '"><button id="' + config.pauseId + '">Pause</button>' +
                '<button id="' + config.resetId + '">Reset</button><button id="' + config.cancelId + '">Cancel</button></div>');
        }
    };

    obj.hideCancelButton = function(config) {

    };

    // handle pause button

    // handle reset button

    // handle cancel button

    /**
     * Public methods
     */
    return {
        showCancelButton: obj.showCancelButton,
        hideCancelButton: obj.hideCancelButton,
        getConfig: configManager.getConfig
    }
};