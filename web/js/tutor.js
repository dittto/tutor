
var Tutor = function($, window) {

    // init vars
    var boxData = [], tutorialData = [], defaultOptions = {}, defaultBoxOptions = {}, defaultPageOptions = {}, config = {};

    // init the default options
    defaultOptions = {
        boxClass: 'tutor-box',
        boxBgSelector: '.tutor-box-bg',
        cancelId: 'tutor-cancel-button'
    };

    // init the default box options
    /**
     * Inits the default box options
     * maxWidth:
     * parentObject: '#id' or '.class'
     * buttonList: {extraButton: 'Extra button', anotherButton: 'Another button'}
     * buttonText:
     * content: '#textPageContent'
     * contentText: 'Some text to use'
     * trigger: 'name-of-trigger-event'
     * triggerEvent: 'body' or '#eventStoreObject'
     * autoClose:
     * isCentral:
     * needsBg:
     */
    defaultBoxOptions = {
        maxWidth: 250,
        parentObject: '.tutor-box-parent',
        buttonList: {},
        buttonText: 'Ok',
        content: '',
        contentText: '',
        trigger: '',
        triggerEvent: 'body',
        autoClose: false,
        isCentral: true,
        needsBg: true
    };

    // init the default page options
    defaultPageOptions = {
        boxes: []
    };

    /**
     *
     * @param boxes
     * @param tutorials
     * @param config
     */
    function init(boxes, tutorials, config) {
        // init vars
        var boxKey, pageKey;
        boxData = boxes;
        tutorialData = tutorials;

        // update the box data to contain default options
        for (boxKey in boxData) {
            if (boxData.hasOwnProperty(boxKey)) {
                boxData[boxKey] = $.extend({}, defaultBoxOptions, boxData[boxKey]);
            }
        }

        // update the page data to contain default options
        for (pageKey in tutorialData) {
            if (tutorialData.hasOwnProperty(pageKey)) {
                tutorialData[pageKey] = $.extend({}, defaultPageOptions, tutorialData[pageKey]);
            }
        }

        // remove current page
        hidePage(config);
    }

    /**
     *
     * @param name
     */
    function tutorial(config, name) {
        // remove any current page options
        hidePage(config);

        // show the first box
        showPage(config, name, 0);

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

        // get the boxes to show and make sure the list of boxes is an array
        var boxes = tutorialData[name].boxes[id];
        if (typeof boxes === 'string') {
            boxes = [boxes];
        }

        // loop through all available boxes
        for (var page in boxes) {
            // show each box
            showBox(config, boxData[boxes[page]]);

            // work out if to show the background
            if (boxData[boxes[page]].needsBg) {
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
     * @return {}
     */
    function getConfig(userConfig) {
        return $.extend({}, defaultOptions, userConfig);
    }

    /**
     * Public methods
     */
    return {
        init: init,
        tutorial: tutorial,
        getConfig: getConfig
    };
};
