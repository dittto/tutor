var boxes = {
    testBox: {
        maxWidth: 250,
        parentObject: '#testPage',
        buttonList: {extraButton: 'Do something'},
        buttonText: 'Ok',
        content: '#textPageContent',
        contentText: '',
        trigger: '',
        isCentral: true,
        needsBg: true
    }
};

/**
 * A list of tutorials made of pages
 *
 * @type {*[]}
 */
var tutorials = {
    homepage: {
        boxes: ['testBox', ['multiple', 'atOnce']]
    }
};


var Tutor = function($, window) {

    // init vars
    var boxData = [], tutorialData = [], defaultOptions = {};

    // init the default options
    defaultOptions = {
        boxClass: 'tutor-box',
        boxBgSelector: '.tutor-box-bg',
        cancelId: 'tutor-cancel-button'
    };

    /**
     *
     * @param boxes
     * @param tutorials
     * @param config
     */
    function init(boxes, tutorials, config) {
        // init vars
        boxData = boxes;
        tutorialData = tutorials;

        // remove current page
        hidePage(config);
    }

    /**
     *
     * @param name
     */
    function tutorial(name) {
        // remove any current page options
        hidePage(config);

        // show the first box
        showPage(name, 0);

        // show the cancel button
        showCancelButton();
    }

    // init page function
        // remove any current page options
        // show the first boxes
        // if all boxes are okayed then update page
        // have a cancel at the top of the page that allows this to be picked up later

    /**
     *
     * @param name
     */
    function updatePage(name) {
        // mark a box as complete via trigger or ok button

        // if all boxes have been marked then show the next page
    }

    /**
     *
     * @param name
     */
    function nextPage(name) {
        // remove any current page boxes

        // show the next boxes
    }

    /**
     *
     * @param name
     * @param id
     * @returns bool True if the page is shown correctly
     */
    function showPage(config, name, id) {
        // check the name is valid
        if (!tutorialData[name]) {
            return false;
        }

        // make sure the list of pages is an array
        if (typeof tutorialData[name] === 'string') {
            tutorialData[name] = [tutorialData[name]];
        }

        // get the boxes to show
        var boxes = [];
        for (var page in tutorialData[name]) {
            // store the boxes
            boxes[page] = boxData[page];

            // show each box
            showBox(config, boxes[page]);

            // work out if to show the background
            if (boxes[page].needsBg) {
                showBackground(config);
            }
        }

        // show the cancel button
        showCancelButton(config);
    }

    /**
     *
     *
     * @param config
     */
    function hidePage(config) {
        // remove all boxes
        $('.' + config.boxClass).remove();

        // remove the box backgrounds
        hideBackground(config);

        // hide the cancel button
        hideCancelButton(config);
    }

    /**
     *
     * @param box
     */
    function showBox(config, box) {
        // generate the box
        // maybe move logic to external class?
        console.log(box);
    }

    /**
     *
     */
    function showBackground(config) {
        // check if the background already exists

        // if not then create background
    }

    /**
     *
     */
    function hideBackground(config) {
        // hides the background
        $(config.boxBgSelector).remove();
    }

    function showCancelButton() {
        // this is a cancel button for the tutorial that will pause the tutorial where it is, and allow it to be restarted
    }

    function hideCancelButton() {
        // this removes the cancel button
    }

    /**
     * Merges the supplied config with the default options to generate a simple
     * config
     *
     * @param userConfig The config supplied by the user
     * @return {{}}
     */
    function getOptions(userConfig) {
        // init vars
        var config = defaultOptions, key;

        // build the config
        for (key in userConfig) {
            if (userConfig.hasOwnProperty(key)) {
                config[key] = userConfig;
            }
        }

        return config;
    }

    /**
     * Public methods
     */
    return {
        init: function(boxes, tutorials, userConfig) {
            init(boxes, tutorials, getOptions(userConfig || {}));
        },
        tutorial: tutorial
    };
};


/**
 * var tutor = new Tutor();
 * tutor.init();
 * tutor.tutorial('homepage');
 */
