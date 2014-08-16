/**
 * A store for the state of tutorials. This takes a store object and stores
 * important info like page number and if the tutorial is complete
 *
 * @param store The store object, such as jQuery.cookie()
 * @returns {{setPage: Function, getPage: *, complete: Function, isComplete: *, reset: Function, import: Function, export: *}}
 * @constructor
 */
var TutorStore = function (store) {
    "use strict";

    // init vars
    var obj = {}, prefix = 'tutor-';

    /**
     * Stores the page number of a given tutorial
     *
     * @param tutorial The name of the tutorial to store
     * @param page The number of the page to store
     */
    obj.setPage = function (tutorial, page) {
        store(prefix + tutorial, page);
    };

    /**
     * Gets the page number of a given tutorial
     *
     * @param tutorial The name of the tutorial to store
     * @returns {int}
     */
    obj.getPage = function (tutorial) {
        var val = store(prefix + tutorial);
        return val !== undefined ? parseInt(val, 10) : 0;
    };

    /**
     * Sets the tutorial as complete
     *
     * @param tutorial The name of the tutorial to set as complete
     */
    obj.complete = function (tutorial) {
        store(prefix + tutorial + '-complete', true);
    };

    /**
     * Returns if the given tutorial has been completed
     *
     * @param tutorial The name of the tutorial to find out if completed
     * @returns {boolean}
     */
    obj.isComplete = function (tutorial) {
        return !!store(prefix + tutorial + '-complete');
    };

    /**
     * Sets the tutorial to be un-complete
     *
     * @param tutorial The name of the tutorial to reset
     */
    obj.reset = function (tutorial) {
        store(prefix + tutorial + '-complete', '');
    };

    /**
     * Takes a json string to import settings of which tutorials are complete.
     * This is so settings can be pushed into a database and saved for a given
     * user
     *
     * @param json The json string to import
     */
    obj.import = function (json) {
        // init vars
        var key, data;
        data = JSON.parse(json);

        // save the data to the store
        for (key in data) {
            if (data.hasOwnProperty(key)) {
                store(key, data[key]);
            }
        }
    };

    /**
     * Exports a string of all tutorial settings so they can be saved against
     * the user's account
     *
     * @returns {string}
     */
    obj.export = function () {
        // init vars
        var key, data, regex, results = {};
        data = store();
        regex = new RegExp('^' + prefix);

        // get all data with the correct prefix
        for (key in data) {
            if (data.hasOwnProperty(key)) {
                if (key.match(regex)) {
                    results[key] = data[key];
                }
            }
        }

        // return the json'ed result
        return JSON.stringify(results);
    };

    /**
     * Public methods
     */
    return {
        setPage: obj.setPage,
        getPage: obj.getPage,
        complete: obj.complete,
        isComplete: obj.isComplete,
        reset: obj.reset,
        import: obj.import,
        export: obj.export
    };
};
