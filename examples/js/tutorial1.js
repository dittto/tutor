/**
 *
 */
var boxes = {
    introBox1: {
        contentTitle: 'Welcome to Tutor',
        contentText: 'Tutor provides a easy way to lead users through your web app',
        isCentral: true,
        needsBg: true
    },

    introBox2: {
        maxWidth: 250,
        contentText: 'You can quickly create popups to help guide new users, or show off new functionality',
        buttonText: 'Sounds good',
        isCentral: true,
        needsBg: true
    },

    introBox3: {
        maxWidth: 350,
        contentText: 'You have additional buttons for each popup to do other features if you require',
        buttonList: {alertButton: 'Click me to alert'},
        buttonText: 'Okay...',
        isCentral: true,
        needsBg: true
    },

    introBox4: {
        maxWidth: 300,
        contentText: 'Or have no buttons and get users to complete an action. It helps to have no background here.<br/><br/>Click the image above to continue.',
        parentObject: '.image-box',
        trigger: 'image-box-trigger',
        align: 'bottom'
    },

    introBox5a: {
        contentText: 'You can assign boxes to elements and align them above or below',
        parentObject: '.yellow-box',
        align: 'top'
    },

    introBox5b: {
        contentTitle: 'Have optional headers...',
        contentText: 'And display multiple boxes at the same time. The tutorial won\'t continue until both are complete',
        parentObject: '.yellow-box',
        align: 'bottom'
    },

    introBox6: {
        contentText: 'You can multiple tutorials on a page, but only one can be followed at a given time. You can also pause, reset, and cancel tutorials. Click on the pause button above.<br/><br/>If you\'ve done that already then click Ok.',
        isCentral: true,
        needsBg: true
    },

    introBox7: {
        contentText: 'This is the end of this tutorial. Click on "Advanced features tutorial" in the right column.<br/><br/>You can restart this by clicking on "Welcome tutorial" in the right column.',
        buttonList: {nextButton: 'Start next tutorial'},
        isCentral: true,
        needsBg: true
    },

    pause: {
        contentText: 'This tutorial has now been paused. You can resume this by clicking on "Welcome tutorial" in the right column.',
        isCentral: true,
        needsBg: true
    },

    cancel: {
        contentText: 'This tutorial has now been cancelled. You can restart this by clicking on "Welcome tutorial" in the right column.',
        isCentral: true,
        needsBg: true
    }
};

/**
 * A list of tutorials made of pages
 *
 */
var tutorials = {
    tutorialA: {
        boxes: ['introBox1', 'introBox2', 'introBox3', 'introBox4', ['introBox5a', 'introBox5b'], 'introBox6', 'introBox7']
    },
    pause: {
        hideControls: true,
        boxes: ['pause']
    },
    cancel: {
        hideControls: true,
        boxes: ['cancel']
    }
};

var tutor = new Tutor(jQuery);
var promise = tutor.init(boxes, tutorials);
tutor.tutorial('tutorialA');

$('.startTutorialA').click(function() {
    tutor.tutorial('tutorialA', true);
});

$('.startTutorialB, #tutor-box-introBox7-button-nextButton').click(function() {
    tutor.tutorial('tutorialB', true);
});

$('.image-box').click(function() {
    $('body').trigger('image-box-trigger');
});

$('body').on('click', '#tutor-box-introBox3-button-alertButton', function() {
    alert('Thanks for clicking');
});
