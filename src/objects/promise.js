/**
 *
 * @param $
 * @returns {{init: Function, notify: Function, resolve: Function, getPromise: Function}}
 * @constructor
 */
var TutorPromise = function($) {
    // init vars
    var obj = {};
    obj.promise = null;

    /**
     *
     */
    obj.init = function() {
        obj.promise = $.Deferred();
    };

    /**
     *
     * @param type
     * @param args
     */
    obj.notify = function(type, args) {
        args['type'] = type;
        obj.promise.notify(args);
    };

    /**
     *
     * @param type
     * @param args
     */
    obj.resolve = function(type, args) {
        args['type'] = type;
        obj.promise.resolve(args);
    };

    /**
     *
     * @returns {*}
     */
    obj.getPromise = function() {
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