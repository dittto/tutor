/**
 *
 * @param jQuery
 * @param Func
 * @returns {{init: Function}}
 * @constructor
 */
var TutorPromiseFactory = function (jQuery, Func) {
    "use strict";

    // init vars
    var obj = {};

    /**
     *
     * @returns {func}
     */
    obj.init = function () {
        var promise = new Func(jQuery);
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
