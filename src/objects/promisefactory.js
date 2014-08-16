/**
 * A simple factory class that instantiated promise wrapper objects
 *
 * @param $ The jQuery object
 * @param Func The promise wrapper function that gets instantiated
 * @returns {{init: Function}}
 * @constructor
 */
var TutorPromiseFactory = function ($, Func) {
    "use strict";

    // init vars
    var obj = {};

    /**
     * Creates a new promise wrapper and runs it's init method
     *
     * @returns {Func}
     */
    obj.init = function () {
        var promise = new Func($);
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
