/**
 * A store for the promises for all boxes currently being displayed
 *
 *
 * @constructor
 */
var TutorPromise = function() {
    // init vars
    var currentPromises = {};

    /**
     * Adds a promise to the promise store
     *
     * @param name The name of the promise to store
     * @param promise The promise to store
     */
    function add(name, promise) {
        currentPromises[name] = promise;
    }

    /**
     * Removes a promise from the store
     *
     * @param name The name of the promise to remove
     */
    function remove(name) {
        delete currentPromises[name];
    }

    /**
     * Resets the promise store
     */
    function reset() {
        currentPromises = {};
    }

    /**
     * Gets the number of promises stored
     *
     * @returns {number}
     */
    function count() {
        // init vars
        var key, size = 0;

        // count properties
        for (key in currentPromises) {
            if (currentPromises.hasOwnProperty(key)) {
                size ++;
            }
        }

        return size;
    }

    /**
     * Checks if the promises store is empty, ignoring those boxes that need to
     * auto close
     *
     * @param boxes The boxes config for tutor - this is used to make sure we
     * can ignore autoClose boxes
     * @returns {boolean}
     */
    function isEmpty(boxes) {
        // init vars
        var boxName, count = 0;

        // ignore boxes that have the auto-close flag
        for (boxName in currentPromises) {
            // ignore any inherited properties
            if (!currentPromises.hasOwnProperty(boxName)) {
                continue;
            }

            // if not an autoClose box, then count
            if (boxes[boxName].autoClose === false) {
                count ++;
            }
        }

        return count === 0;
    }

    /**
     * Public methods
     */
    return {
        add: add,
        remove: remove,
        reset: reset,
        count: count,
        isEmpty: isEmpty
    }
}