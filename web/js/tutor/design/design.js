/**
 *
 * @param box
 * @param background
 * @param cancel
 * @returns {{box: Function, background: Function, cancel: Function}}
 * @constructor
 */
var TutorDesign = function(box, background, cancel) {
    /**
     *
     * @returns TutorBox
     */
    function getBox() {
        return box;
    }

    /**
     *
     * @returns TutorBackground
     */
    function getBackground() {
        return background;
    }

    /**
     *
     * @returns TutorCancel
     */
    function getCancel() {
        return cancel;
    }

    return {
        box: getBox,
        background: getBackground,
        cancel: getCancel
    }
}