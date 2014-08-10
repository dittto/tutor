/**
 *
 * @param jQuery
 * @param func
 * @returns {{init: Function}}
 * @constructor
 */
var TutorPromiseFactory = function(jQuery, func) {
    // init vars
    var obj = {};

    /**
     *
     * @returns {func}
     */
    obj.init = function() {
        var promise = new func(jQuery);
        promise.init();
        return promise;
    };

    /**
     * Public methods
     */
    return {
        init: obj.init
    };
};