/**
 * A store for the current page number for Tutor
 *
 * @constructor
 */
var TutorPage = function () {
    "use strict";

    // init vars
    var obj = {}, pageNum = 0;

    /**
     * Sets the page number for later recall
     *
     * @param page The value to set the page number to
     */
    obj.setPage = function (page) {
        pageNum = parseInt(page, 10);
    };

    /**
     * Gets the page number
     *
     * @returns {number}
     */
    obj.getPage = function () {
        return pageNum;
    };

    /**
     * Tries to increment the page number and return if this was possible
     *
     * @param maxPages
     * @returns {boolean}
     */
    obj.incrementPage = function (maxPages) {
        // get the current page value
        var current = obj.getPage();

        // increment the page number if possible
        if (current + 1 < maxPages) {
            obj.setPage(current + 1);
            return true;
        }
        return false;
    };

    /**
     * Public methods
     */
    return {
        setPage: obj.setPage,
        getPage: obj.getPage,
        incrementPage: obj.incrementPage
    };
};
