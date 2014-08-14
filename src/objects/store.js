/**
 *
 */
var TutorStore = function (store) {
    "use strict";

    // init vars
    var obj = {}, prefix = 'tutor-';

    /**
     *
     * @param tutorial
     * @param page
     */
    obj.setPage = function (tutorial, page) {
        store(prefix + tutorial, page);
    };

    /**
     *
     * @param tutorial
     * @returns {*}
     */
    obj.getPage = function (tutorial) {
        var val = store(prefix + tutorial);
        return val !== undefined ? parseInt(val, 10) : 0;
    };

    /**
     *
     * @param tutorial
     */
    obj.complete = function (tutorial) {
        store(prefix + tutorial + '-complete', true);
    };

    /**
     *
     * @returns {boolean}
     */
    obj.isComplete = function (tutorial) {
        return !!store(prefix + tutorial + '-complete');
    };

    /**
     *
     * @param tutorial
     */
    obj.reset = function (tutorial) {
        store(prefix + tutorial + '-complete', '');
    };

    /**
     *
     * @param json
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
     *
     * @returns {*}
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
