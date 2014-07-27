/**
 *
 */
var boxes = {
    testBox: {
        maxWidth: 250,
        parentObject: '#testPage',
        buttonList: {extraButton: 'Do something'},
        buttonText: 'Ok',
        content: '#textPageContent',
        contentText: '',
        trigger: '',
        autoClose: false,
        isCentral: true,
        needsBg: true
    },

    multiple: {
        maxWidth: 200,
        parentObject: '.firstBox',
        contentText: 'Humpty dumpty sat on the wall'
    },

    atOnce: {
        maxWidth: 400,
        parentObject: '.secondBox',
        contentText: 'How much is that doggy in the window?'
    }
};

/**
 * A list of tutorials made of pages
 *
 */
var tutorials = {
    homepage: {
        boxes: ['testBox', ['multiple', 'atOnce']]
    }
};

/**
 *
 */
var tutor = new Tutor(jQuery, window);
var config = tutor.getConfig({});
tutor.init(boxes, tutorials, config);
tutor.tutorial(config, 'homepage');