/**
 *
 * @param jQuery
 * @returns {*}
 * @constructor
 */
var Tutor = function(jQuery) {
    // init the box generator
    var tutorBox = new TutorBox(
        jQuery,
        new TutorHtmlBox(),
        new TutorConfigManager(),
        new TutorPromiseFactory(jQuery, TutorPromise));

    // init the background generator
    var tutorBackground = new TutorBackground(
        jQuery,
        new TutorHtmlBackground(),
        new TutorConfigManager());

    // init the Tutor controls generators
    var tutorControl = new TutorControl(
        jQuery,
        new TutorHtmlControl(),
        new TutorConfigManager(),
        new TutorPromiseFactory(jQuery, TutorPromise));

    // init the service locator for the 3 generators
    var tutorDesign = new TutorDesign(
        tutorBox,
        tutorBackground,
        tutorControl);

    // init and return tutor
    return new TutorMain(
        new TutorConfigManager(),
        tutorDesign,
        new TutorPage(),
        new TutorPromise(jQuery),
        new TutorPromiseStore(),
        new TutorStore(jQuery.cookie));
};
