/**
 * A store for the current page number for Tutor
 *
 * @constructor
 */
var TutorPage = function() {
    /**
     * The current page number
     */
    var pageNum;

    /**
     * Sets the page number for later recall
     *
     * @param page The value to set the page number to
     */
    function setPage(page) {
        pageNum = page;
    }

    /**
     * Gets the page number
     *
     * @returns {number}
     */
    function getPage() {
        return pageNum;
    }

    /**
     * Tries to increment the page number and return if this was possible
     *
     * @param maxPages
     * @returns {boolean}
     */
    function incrementPage(maxPages) {
        // get the current page value
        var current = getPage();

        // increment the page number if possible
        if (current + 1 < maxPages) {
            setPage(current + 1);
            return true;
        } else {
            return false;
        }
    }

    /**
     * Public methods
     */
    return {
        setPage: setPage,
        getPage: getPage,
        incrementPage: incrementPage
    };
};