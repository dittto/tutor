/**
 *
 * @param tutorConfig
 * @param tutorDesign
 * @param tutorPage
 * @param tutorPromise
 * @returns {{init: Function, tutorial: Function, getConfig: Function}}
 * @constructor
 */
var Tutor = function(tutorConfig, tutorDesign, tutorPage, tutorPromise) {
    // init vars
    var boxData = [], tutorialData = [], defaultOptions = {}, defaultBoxOptions = {}, defaultPageOptions = {};

    // init the default options
    defaultOptions = {
        boxClass: 'tutor-box',
        boxBgClass: 'tutor-box-bg',
        cancelId: 'tutor-cancel-button'
    };

    /**
     * Inits the default box options
     * maxWidth:
     * parentObject: '#id' or '.class'
     * buttonList: {extraButton: 'Extra button', anotherButton: 'Another button'}
     * buttonText:
     * content: '#textPageContent'
     * contentText: 'Some text to use'
     * trigger: 'name-of-trigger-event'
     * triggerOn: 'body' or '#eventStoreObject'
     * align: 'top' or 'bottom' to begin with
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
        triggerOn: 'body',
        align: 'top',
        autoClose: false,
        isCentral: false,
        needsBg: false
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
                boxData[boxKey] = tutorConfig.merge(defaultBoxOptions, boxData[boxKey]);
            }
        }

        // update the page data to contain default options
        for (pageKey in tutorialData) {
            if (tutorialData.hasOwnProperty(pageKey)) {
                tutorialData[pageKey] = tutorConfig.merge(defaultPageOptions, tutorialData[pageKey]);
            }
        }

        // remove current page
        hidePage(config);
    }

    /**
     *
     * @param config
     * @param tutorialName
     */
    function tutorial(config, tutorialName) {
        // remove any current page options
        hidePage(config);

        // show the first box
        tutorPromise.reset();
        tutorPage.setPage(0);
        showPage(config, tutorialName, tutorPage.getPage());

        // show the cancel button
        showCancelButton();
    }

    /**
     *
     * @param config
     * @param tutorialName
     */
    function nextPage(config, tutorialName) {
        // remove any current page boxes
        hidePage(config);

        // get a count of the tutorial pages
        var count = tutorialData[tutorialName].boxes.length;

        // increment the page if possible and show the new page if any left to show
        if (tutorPage.incrementPage(count)) {
            showPage(config, tutorialName, tutorPage.getPage());
        }
    }

    /**
     *
     * @param config
     * @param tutorialName
     * @param id
     * @returns bool True if the page is shown correctly
     */
    function showPage(config, tutorialName, id) {
        // init vars
        var boxes, page;

        // check the name is valid
        if (!tutorialData[tutorialName]) {
            return false;
        }

        // get the boxes to show and make sure the list of boxes is an array
        boxes = tutorialData[tutorialName].boxes[id];
        if (typeof boxes === 'string') {
            boxes = [boxes];
        }

        // loop through all available boxes
        for (page in boxes) {
            // show each box
            showBox(config, tutorialName, boxes[page], boxData);

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
        // remove all boxes that still exist
        $('.' + config.boxClass).each(function() {
            tutorDesign.box().closeBox($(this));
        });

        // remove the box backgrounds
        hideBackground(config);

        // hide the cancel button
        hideCancelButton(config);
    }

    /**
     * Passes the box creation to an external class to make customisation easy
     *
     * @param config
     * @param tutorialName
     * @param boxName
     * @param box
     */
    function showBox(config, tutorialName, boxName, boxes) {
        // init the promise
        var box = boxes[boxName], promise = tutorDesign.box().showBox(config, boxName, box);

        // store the promise locally
        tutorPromise.add(boxName, promise);

        // when the promise is complete, check if we can trigger the next page
        promise.done(function() {
            // remove the promise
            tutorPromise.remove(boxName);

            // check to see if all promises have been complete
            if (tutorPromise.isEmpty(boxes)) {
                // trigger the next page. This needs a fraction of a second
                // timeout or jquery gets the ordering wrong and can delete the
                // new boxes
                window.setTimeout(function() {
                    nextPage(config, tutorialName);
                }, 1);

            }
        });
    }

    /**
     *
     */
    function showBackground(config) {
        tutorDesign.background().showBackground(config);
    }

    /**
     *
     */
    function hideBackground(config) {
        tutorDesign.background().removeBackground(config);
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
        return tutorConfig.merge(defaultOptions, userConfig);
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
