/**
 *
 * @param jQuery
 * @returns {*}
 * @constructor
 */
var Tutor = function(jQuery) {
    //
    var tutorBox = new TutorBox(jQuery, new TutorConfigManager(), new TutorPromiseFactory(jQuery, TutorPromise));
    var tutorBackground = new TutorBackground(jQuery, new TutorConfigManager());
    var tutorCancel = new TutorCancel(jQuery, new TutorConfigManager(), new TutorPromiseFactory(jQuery, TutorPromise));
    var tutorDesign = new TutorDesign(tutorBox, tutorBackground, tutorCancel);

    //
    var tutor = new TutorMain(
        new TutorConfigManager(),
        tutorDesign,
        new TutorPage(),
        new TutorPromise(jQuery),
        new TutorPromiseStore(),
        new TutorStore(jQuery.cookie));

    return tutor;
};
