/**
 * A store for the promises for all boxes currently being displayed
 *
 * @constructor
 */
var TutorPromises = function() {
    // init vars
    var obj = {}, currentPromises = {};

    /**
     * Adds a promise to the promise store
     *
     * @param name The name of the promise to store
     * @param promise The promise to store
     */
    obj.add = function(name, promise) {
        currentPromises[name] = promise;
    };

    /**
     * Removes a promise from the store
     *
     * @param name The name of the promise to remove
     */
    obj.remove = function(name) {
        delete currentPromises[name];
    };

    /**
     * Resets the promise store
     */
    obj.reset = function() {
        currentPromises = {};
    };

    /**
     * Gets the number of promises stored
     *
     * @returns {number}
     */
    obj.count = function() {
        // init vars
        var key, size = 0;

        // count properties
        for (key in currentPromises) {
            if (currentPromises.hasOwnProperty(key)) {
                size ++;
            }
        }

        return size;
    };

    /**
     * Checks if the promises store is empty, ignoring those boxes that need to
     * auto close
     *
     * @param boxes The boxes config for tutor - this is used to make sure we
     * can ignore autoClose boxes
     * @returns {boolean}
     */
    obj.isEmpty = function(boxes) {
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
    };

    /**
     * Public methods
     */
    return {
        add: obj.add,
        remove: obj.remove,
        reset: obj.reset,
        count: obj.count,
        isEmpty: obj.isEmpty
    }
};