/**
 *
 * @param box
 * @param background
 * @param control
 * @returns {{box: Function, background: Function, control: Function}}
 * @constructor
 */
var TutorDesign = function (box, background, control) {
    "use strict";

    // init vars
    var obj = {};

    /**
     *
     * @returns TutorBox
     */
    obj.getBox = function () {
        return box;
    };

    /**
     *
     * @returns TutorBackground
     */
    obj.getBackground = function () {
        return background;
    };

    /**
     *
     * @returns TutorControl
     */
    obj.getControl = function () {
        return control;
    };

    return {
        box: obj.getBox,
        background: obj.getBackground,
        control: obj.getControl
    };
};
