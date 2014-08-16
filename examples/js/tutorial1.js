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
        contentText: 'You can have multiple tutorials on a page, but only one can be followed at a given time. You can also pause, reset, and cancel tutorials. Click on the <b>pause button</b> above and then click on "Welcome tutorial".<br/><br/>If you\'ve done that already then click Ok.',
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
    },

    advanced1: {
        content: '#contentPage',
        isCentral: true,
        needsBg: true
    },

    advanced2: {
        contentText: 'You can also change the text on the default ok button to anything you want.',
        isCentral: true,
        needsBg: true,
        buttonText: 'Awesome'
    },

    advanced3: {
        contentText: 'This box will be in the centre of the page for desktop users. Shrink the width of the browser though and refresh, and you\'ll see it attaches itself to the bottom of the page.',
        isCentral: true,
        needsBg: true,
        moveToBottom: true
    },

    advanced4a: {
        maxWidth: 500,
        contentText: 'This is an auto-close box. These will disappear once all other boxes have been closed. These can be attached as normal to a DOM object, can be centered, or can be positioned along the bottom, like this.',
        autoClose: true,
        isBottom: true,
        needsBg: true
    },

    advanced4b: {
        contentText: 'You can reuse boxes from other tutorials as well. The box below this is reused from the welcome tutorial.<br/><br/>Click on Ok in this box and the other to close the auto-close box',
        parentObject: '.yellow-box'
    },

    advanced5: {
        contentText: 'Thanks for completing this tutorial!',
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
    tutorialB: {
        boxes: ['advanced1', 'advanced2', 'advanced3', ['advanced4a', 'advanced4b', 'introBox5b'], 'advanced5']
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
jQuery(document).ready(function() {
    // list the tutorials that can auto-start
    tutor.tutorial(['tutorialA', 'tutorialB']);
});

$('body').on('click', '.startTutorialA', function() {
    tutor.tutorial('tutorialA', true);
});

$('body').on('click', '.startTutorialB', function() {
    tutor.tutorial('tutorialB', true);
});

$('.image-box').click(function() {
    $('body').trigger('image-box-trigger');
});

$('body').on({click: function() {
    tutor.tutorial('tutorialB', true);
    tutor.completeTutorial('tutorialA');
}}, 'button#tutor-box-introBox7-button-nextButton');

$('body').on({click: function() {
    alert('Thanks for clicking');
}}, 'button#tutor-box-introBox3-button-alertButton');

