/**
 *
 * @param configManager
 * @param tutorDesign
 * @param tutorPage
 * @param tutorPromise
 * @returns {{init: Function, tutorial: Function, getConfig: Function}}
 * @constructor
 */
var Tutor = function(configManager, tutorDesign, tutorPage, tutorPromise) {
    // init vars
    var obj = {}, boxData = [], tutorialData = [], defaultConfig, defaultBoxOptions = {}, defaultPageOptions = {};

    /**
     *
     * @type {{boxClass: string}}
     */
    defaultConfig = {
        boxClass: 'tutor-box'
    };
    configManager.setDefaultConfig(defaultConfig);

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
    obj.init = function(boxes, tutorials, config) {
        // init vars
        var boxKey, pageKey;
        boxData = boxes;
        tutorialData = tutorials;

        // update the box data to contain default options
        for (boxKey in boxData) {
            if (boxData.hasOwnProperty(boxKey)) {
                boxData[boxKey] = configManager.merge(defaultBoxOptions, boxData[boxKey]);
            }
        }

        // update the page data to contain default options
        for (pageKey in tutorialData) {
            if (tutorialData.hasOwnProperty(pageKey)) {
                tutorialData[pageKey] = configManager.merge(defaultPageOptions, tutorialData[pageKey]);
            }
        }

        // remove current page
        obj.hidePage(config);
    };

    /**
     *
     * @param config
     * @param tutorialName
     */
    obj.tutorial = function(config, tutorialName) {
        // remove any current page options
        obj.hidePage(config);

        // show the first box
        tutorPromise.reset();
        tutorPage.setPage(0);
        obj.showPage(config, tutorialName, tutorPage.getPage());

        // show the cancel button
        obj.showCancelButton(config);
    };

    /**
     *
     * @param config
     * @param tutorialName
     */
    obj.nextPage = function(config, tutorialName) {
        // remove any current page boxes
        obj.hidePage(config);

        // get a count of the tutorial pages
        var count = tutorialData[tutorialName].boxes.length;

        // increment the page if possible and show the new page if any left to show
        if (tutorPage.incrementPage(count)) {
            obj.showPage(config, tutorialName, tutorPage.getPage());
        }
    };

    /**
     *
     * @param config
     * @param tutorialName
     * @param id
     * @returns bool True if the page is shown correctly
     */
    obj.showPage = function(config, tutorialName, id) {
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
            obj.showBox(config, tutorialName, boxes[page], boxData);

            // work out if to show the background
            if (boxData[boxes[page]].needsBg) {
                obj.showBackground();
            }
        }

        // show the cancel button
        obj.showCancelButton(config);

        return true;
    };

    /**
     *
     *
     * @param config
     */
    obj.hidePage = function(config) {
        // remove all boxes that still exist
        $('.' + config.boxClass).each(function() {
            tutorDesign.box().closeBox($(this));
        });

        // remove the box backgrounds
        obj.hideBackground();

        // hide the cancel button
        obj.hideCancelButton(config);
    };

    /**
     * Passes the box creation to an external class to make customisation easy
     *
     * @param config
     * @param tutorialName
     * @param boxName
     * @param boxes
     */
    obj.showBox = function(config, tutorialName, boxName, boxes) {
        // init the promise
        var box = boxes[boxName], promise;
        promise = tutorDesign.box().showBox(config, boxName, box);

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
                    obj.nextPage(config, tutorialName);
                }, 1);

            }
        });
    };

    /**
     *
     */
    obj.showBackground = function() {
        var bg = tutorDesign.background();
        bg.show(bg.getConfig());
    };

    /**
     *
     */
    obj.hideBackground = function() {
        var bg = tutorDesign.background();
        bg.remove(bg.getConfig());
    };

    obj.showCancelButton = function(config) {
        tutorDesign.cancel().showCancelButton(config);
    };

    obj.hideCancelButton = function(config) {
        tutorDesign.cancel().hideCancelButton(config);
    };

    /**
     * Public methods
     */
    return {
        init: obj.init,
        tutorial: obj.tutorial,
        getConfig: configManager.getConfig
    }
};
