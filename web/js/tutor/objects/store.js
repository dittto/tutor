/**
 *
 * @param $
 * @returns {{update: Function}}
 * @constructor
 */
var TutorStore = function($) {
    // init vars
    var obj = {};

    /**
     *
     * @param tutorial
     * @param page
     */
    obj.update = function(tutorial, page) {
        $.cookie('tutor-' + tutorial, page);
    };

    /**
     *
     * @param tutorial
     * @returns {*}
     */
    obj.getPage = function(tutorial) {
        var val = $.cookie('tutor-' + tutorial);
        return typeof val !== 'undefined' ? parseInt(val) : 0;
    };

    /**
     *
     * @param tutorial
     */
    obj.complete = function(tutorial) {
        $.cookie('tutor-' + tutorial + '-complete', true);
    };

    /**
     *
     * @returns {boolean}
     */
    obj.isComplete = function(tutorial) {
        return !!$.cookie('tutor-' + tutorial + '-complete');
    };

    /**
     * Public methods
     */
    return {
        update: obj.update,
        getPage: obj.getPage,
        complete: obj.complete,
        isComplete: obj.isComplete
    };
};