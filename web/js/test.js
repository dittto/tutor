/**
 *
 */
var boxes = {
    testBox: {
        maxWidth: 250,
        buttonList: {extraButton: 'Do something'},
        buttonText: 'Ok',
        content: '#textPageContent',
        isCentral: true,
        needsBg: true
    },

    blueBox: {
        maxWidth: 300,
        isCentral: true,
        contentText: 'Click on the blue box',
        trigger: 'blue-box-trigger'
    },

    above: {
        maxWidth: 200,
        parentObject: '.firstBox',
        contentText: 'Humpty dumpty sat on the wall'
    },

    below: {
        maxWidth: 400,
        parentObject: '.secondBox',
        contentText: 'How much is that doggy in the window?',
        align: 'bottom'
    },

    autoClose: {
        maxWidth: 500,
        isCentral: true,
        autoClose: true,
        contentText: 'Close each of the other two boxes and this one will go also'
    },

    thankYou: {
        maxWidth: 100,
        isCentral: true,
        contentText: 'Done now, thank you!',
        needsBg: true
    }
};

/**
 * A list of tutorials made of pages
 *
 */
var tutorials = {
    homepage: {
        boxes: ['testBox', 'blueBox', ['above', 'below', 'autoClose'], 'thankYou']
    }
};

var tutorBox = new TutorBox(jQuery, new TutorConfigManager(jQuery, {}));
var tutorBackground = new TutorBackground(jQuery, new TutorConfigManager(jQuery, {}));
var tutorCancel = new TutorCancel(jQuery, new TutorConfigManager(jQuery, {}));
var tutorDesign = new TutorDesign(tutorBox, tutorBackground, tutorCancel);

var tutorPage = new TutorPage();
var tutorPromise = new TutorPromise();

/**
 *
 */
var tutor = new Tutor(new TutorConfigManager(jQuery, {}), tutorDesign, tutorPage, tutorPromise);
tutor.init(boxes, tutorials, tutor.getConfig());
tutor.tutorial(tutor.getConfig(), 'homepage');

/**
 *
 */
$('#testPage').click(function() {
    $('body').trigger('blue-box-trigger');
});