/*global TutorBox, TutorHtmlBox, TutorConfigManager, TutorPromiseFactory, TutorPromise, TutorBackground, TutorHtmlBackground, TutorControl, TutorHtmlControl, TutorDesign, TutorMain, TutorPage, TutorPromiseStore, TutorStore */

/**
 * Creates a generic Tutor object. Override or replace this function to use
 * your own functions for Tutor
 *
 * @param jQuery The jQuery object
 * @returns {TutorMain}
 * @constructor
 */
var Tutor = function (jQuery) {
    "use strict";

    // init vars
    var tutorBox, tutorBackground, tutorControl, tutorDesign;

    // init the box generator
    tutorBox = new TutorBox(
        jQuery,
        new TutorHtmlBox(jQuery),
        new TutorConfigManager(),
        new TutorPromiseFactory(jQuery, TutorPromise)
    );

    // init the background generator
    tutorBackground = new TutorBackground(
        jQuery,
        new TutorHtmlBackground(),
        new TutorConfigManager()
    );

    // init the Tutor controls generators
    tutorControl = new TutorControl(
        jQuery,
        new TutorHtmlControl(),
        new TutorConfigManager(),
        new TutorPromiseFactory(jQuery, TutorPromise)
    );

    // init the service locator for the 3 generators
    tutorDesign = new TutorDesign(
        tutorBox,
        tutorBackground,
        tutorControl
    );

    // init and return tutor
    return new TutorMain(
        new TutorConfigManager(),
        tutorDesign,
        new TutorPage(),
        new TutorPromise(jQuery),
        new TutorPromiseStore(),
        new TutorStore(jQuery.cookie)
    );
};
