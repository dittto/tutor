/**
 * A service locator for the design elements of Tutor
 *
 * @param box The box object
 * @param background The background object
 * @param control The control object
 * @returns {{box: Function, background: Function, control: Function}}
 * @constructor
 */
var TutorDesign = function (box, background, control) {
    "use strict";

    // init vars
    var obj = {};

    /**
     * Returns the box object
     *
     * @returns TutorBox
     */
    obj.getBox = function () {
        return box;
    };

    /**
     * Returns the background object
     *
     * @returns TutorBackground
     */
    obj.getBackground = function () {
        return background;
    };

    /**
     * Returns the control object
     *
     * @returns TutorControl
     */
    obj.getControl = function () {
        return control;
    };

    /**
     * Public methods
     */
    return {
        box: obj.getBox,
        background: obj.getBackground,
        control: obj.getControl
    };
};
