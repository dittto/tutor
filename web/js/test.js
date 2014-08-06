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
    },

    pause: {
        maxWidth: 300,
        isCentral: true,
        contentText: 'This tutorial has now been paused. You can resume this by doing blah.',
        needsBg: true
    },

    cancel: {
        maxWidth: 300,
        isCentral: true,
        contentText: 'This tutorial has now been cancelled. You can restart this by doing x.',
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
    },
    pause: {
        hideCancelBox: true,
        boxes: ['pause']
    },
    cancel: {
        hideCancelBox: true,
        boxes: ['cancel']
    }
};

var tutorBox = new TutorBox(jQuery, new TutorConfigManager());
var tutorBackground = new TutorBackground(jQuery, new TutorConfigManager());
var tutorCancel = new TutorCancel(jQuery, new TutorConfigManager());
var tutorDesign = new TutorDesign(tutorBox, tutorBackground, tutorCancel);

/**
 *
 */
var tutor = new Tutor(new TutorConfigManager(), tutorDesign, new TutorPage(), new TutorPromise(jQuery), new TutorPromises(), new TutorStore(jQuery));
var promise = tutor.init(boxes, tutorials);
tutor.tutorial('homepage');

promise.progress(function(args) {
    console.log(args);
});
promise.done(function(args) {
    console.log(args);
});

/**
 *
 */
$('#testPage').click(function() {
    $('body').trigger('blue-box-trigger');
});