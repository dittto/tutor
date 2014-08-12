/**
 *
 */
var TutorStore = function(store) {
    // init vars
    var obj = {};

    /**
     *
     * @param tutorial
     * @param page
     */
    obj.setPage = function(tutorial, page) {
        store('tutor-' + tutorial, page);
    };

    /**
     *
     * @param tutorial
     * @returns {*}
     */
    obj.getPage = function(tutorial) {
        var val = store('tutor-' + tutorial);
        return typeof val !== 'undefined' ? parseInt(val) : 0;
    };

    /**
     *
     * @param tutorial
     */
    obj.complete = function(tutorial) {
        store('tutor-' + tutorial + '-complete', true);
    };

    /**
     *
     * @returns {boolean}
     */
    obj.isComplete = function(tutorial) {
        return !!store('tutor-' + tutorial + '-complete');
    };

    /**
     *
     * @param tutorial
     */
    obj.reset = function(tutorial) {
        store('tutor-' + tutorial + '-complete', '');
    };

    /**
     * Public methods
     */
    return {
        setPage: obj.setPage,
        getPage: obj.getPage,
        complete: obj.complete,
        isComplete: obj.isComplete,
        reset: obj.reset
    };
};