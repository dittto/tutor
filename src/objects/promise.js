/**
 * A wrapper for the promises used in Tutor. This is allow the promises code to
 * be swapped out (and makes mocking easy). This one uses jQuery's Deferred()
 *
 * @param $ The jQuery object
 * @returns {{init: Function, notify: Function, resolve: Function, getPromise: Function}}
 * @constructor
 */
var TutorPromise = function ($) {
    "use strict";

    // init vars
    var obj = {};
    obj.promise = null;

    /**
     * Inits the promise
     */
    obj.init = function () {
        obj.promise = $.Deferred();
    };

    /**
     * This updates the promise without ending it, and can be picked up with
     * .progress()
     *
     * @param type The type of notice to send
     * @param args Additional arguments to send
     */
    obj.notify = function (type, args) {
        args.type = type;
        obj.promise.notify(args);
    };

    /**
     * This updates the promise and ends it in one go. This can be picked up
     * with .done()
     *
     * @param type The type of notice to send
     * @param args Any additional arguments to send
     */
    obj.resolve = function (type, args) {
        args.type = type;
        obj.promise.resolve(args);
    };

    /**
     * Gets the promise object itself
     *
     * @returns {jQuery.Deferred}
     */
    obj.getPromise = function () {
        return obj.promise;
    };

    /**
     * Public methods
     */
    return {
        init: obj.init,
        notify: obj.notify,
        resolve: obj.resolve,
        getPromise: obj.getPromise
    };
};
