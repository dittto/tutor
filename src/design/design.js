/**
 *
 * @param box
 * @param background
 * @param cancel
 * @returns {{box: Function, background: Function, cancel: Function}}
 * @constructor
 */
var TutorDesign = function(box, background, cancel) {
    // init vars
    var obj = {};

    /**
     *
     * @returns TutorBox
     */
    obj.getBox = function() {
        return box;
    };

    /**
     *
     * @returns TutorBackground
     */
    obj.getBackground = function() {
        return background;
    };

    /**
     *
     * @returns TutorCancel
     */
    obj.getCancel = function() {
        return cancel;
    };

    return {
        box: obj.getBox,
        background: obj.getBackground,
        cancel: obj.getCancel
    }
};