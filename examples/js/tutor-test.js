/**
 *
 */
var boxes = {
    testBox: {
        maxWidth: 250,
        buttonList: {extraButton: 'Some other button'},
        buttonText: 'Ok',
        contentTitle: 'Tutorial one',
        content: '#textPageContent',
        isCentral: true,
        needsBg: true
    },

    blueBox: {
        maxWidth: 300,
        isCentral: true,
        contentTitle: 'Stage two: triggers',
        contentText: 'Click on the image to continue',
        trigger: 'blue-box-trigger'
    },

    above: {
        maxWidth: 200,
        parentObject: '.firstBox',
        contentText: 'This box should be above the blue square.'
    },

    below: {
        maxWidth: 400,
        parentObject: '.secondBox',
        contentText: 'And this box should be below the green box, so it doesn\'t clash with blue\'s box',
        align: 'bottom'
    },

    autoClose: {
        maxWidth: 300,
        isCentral: true,
        autoClose: true,
        moveToBottom: true,
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
        hideControls: true,
        boxes: ['pause']
    },
    cancel: {
        hideControls: true,
        boxes: ['cancel']
    },
    reversi: {
        boxes: ['blueBox', 'below']
    }
};

var tutor = new Tutor(jQuery);
var promise = tutor.init(boxes, tutorials);
tutor.tutorial('homepage');

promise.progress(function(args) {
    console.log(args);
});
promise.done(function(args) {
    console.log(args);
});

$('.startTutorial').click(function() {
    tutor.tutorial('homepage', true);
});

$('.startReversi').click(function() {
    tutor.tutorial('reversi', true);
});

/**
 *
 */
$('#testPage').click(function() {
    $('body').trigger('blue-box-trigger');
});
