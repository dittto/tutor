/*global window */

/**
 * The heart of Tutor. This controls which tutorials to display and how they work
 *
 * @param configManager The config manager that allows configs to be merged easily
 * @param tutorDesign A service locator for all of the design objects
 * @param tutorPage A store for which page the current tutorial is on
 * @param tutorPromise A promise object that passes back the current state to outside this function
 * @param tutorPromiseStore A store for the promises for all boxes currently being displayed
 * @param store A wrapper for the storing mechanism for the tutorial states
 * @returns {{init: Function, tutorial: Function}}
 * @constructor
 */
var TutorMain = function (configManager, tutorDesign, tutorPage, tutorPromise, tutorPromiseStore, store) {
    "use strict";

    // init vars
    var obj = {}, boxData = [], tutorialData = [], defaultBoxOptions = {}, defaultTutorialOptions = {};

    /**
     * Inits the default box options
     *  - maxWidth: The max width the box is allowed to be
     *  - parentObject: '#id' or '.class' is the selector to attach the box to
     *  - buttonList: {extraButton: 'Extra button', anotherButton: 'Another button'} is a list of any additional buttons. The key is the id of the button and value is the text of the button
     *  - buttonText: The text for the 'Ok' button
     *  - content: '#textPageContent' The source of the html elements to display in the box
     *  - contentText: 'Some text to use' The text to display in the box
     *  - trigger: 'name-of-trigger-event' to respond to an event triggered on 'triggerOn'
     *  - triggerOn: 'body' or '#eventStoreObject' to alter where the trigger is set
     *  - align: 'top' or 'bottom' to align the box to it's parent object
     *  - autoClose: true to automatically close the box if allowed
     *  - isCentral: true to centre the box in the window
     *  - isBottom: true to align the box centrally to the bottom of the window
     *  - moveToBottom: true to move the box to the bottom in smaller windows
     *  - needsBg: true to display a background
     *
     * @type {{maxWidth: number, parentObject: string, buttonList: {}, buttonText: string, contentTitle: string, content: string, contentText: string, trigger: string, triggerOn: string, align: string, autoClose: boolean, isCentral: boolean, isBottom: boolean, moveToBottom: boolean, needsBg: boolean}}
     */
    defaultBoxOptions = {
        maxWidth: 300,
        parentObject: '.tutor-box-parent',
        buttonList: {},
        buttonText: 'Ok',
        contentTitle: '',
        content: '',
        contentText: '',
        trigger: '',
        triggerOn: 'body',
        align: 'top',
        autoClose: false,
        isCentral: false,
        isBottom: false,
        moveToBottom: false,
        needsBg: false
    };

    /**
     * The default tutorial objects
     *  - hideControls: true to hide the control box from the page
     *  - pauseBox: The name of the box to show on pause
     *  - cancelBox: The name of the box to show on cancel
     *  - boxes: A list of box names to show in the tutorial. These can be in an array to display multiple boxes at once
     *
     * @type {{hideControls: boolean, pauseBox: string, cancelBox: string, boxes: Array}}
     */
    defaultTutorialOptions = {
        hideControls: false,
        pauseBox: 'pause',
        cancelBox: 'cancel',
        boxes: []
    };

    /**
     * Inits the tutorials and returns a promise which updates what's changing
     * within a tutorial
     *
     * @param boxes An associative array of all boxes available
     * @param tutorials An associative array of all tutorials
     * @returns {jQuery.Deferred}
     */
    obj.init = function (boxes, tutorials) {
        // init vars
        var boxKey, tutorialKey;
        boxData = boxes;
        tutorialData = tutorials;

        // init the promise
        tutorPromise.init();

        // update the box data to contain default options
        for (boxKey in boxData) {
            if (boxData.hasOwnProperty(boxKey)) {
                boxData[boxKey] = configManager.merge(defaultBoxOptions, boxData[boxKey]);
            }
        }

        // update the page data to contain default options
        for (tutorialKey in tutorialData) {
            if (tutorialData.hasOwnProperty(tutorialKey)) {
                tutorialData[tutorialKey] = configManager.merge(defaultTutorialOptions, tutorialData[tutorialKey]);
            }
        }

        // remove current page
        obj.hidePage();

        return tutorPromise.getPromise();
    };

    /**
     * Opens a tutorial if not complete. You can pass this an array of
     * tutorials and it will open the first that isn't complete
     *
     * @param tutorialNames A string or an array of tutorials to open
     * @param forceIfComplete Set this to true to force a tutorial to open
     */
    obj.tutorial = function (tutorialNames, forceIfComplete) {
        // init vars
        var key, tutorialName;

        // make sure tutorial name is an array
        if (typeof tutorialNames === 'string') {
            tutorialNames = [tutorialNames];
        }

        // remove any current page options
        obj.hidePage();

        // check the store to see if to skip this tutorial
        for (key in tutorialNames) {
            if (tutorialNames.hasOwnProperty(key)) {
                // show the first box that's valid to show
                tutorialName = tutorialNames[key];
                if (!store.isComplete(tutorialName) || forceIfComplete === true) {
                    store.reset(tutorialName);
                    tutorPromiseStore.reset();
                    tutorPage.setPage(store.getPage(tutorialName));
                    obj.showPage(tutorialName, tutorPage.getPage());
                    break;
                }
            }
        }
    };

    /**
     * Changes to the next page in the tutorial
     *
     * @param tutorialName The name of the tutorial to change page
     */
    obj.nextPage = function (tutorialName) {
        // remove any current page boxes
        obj.hidePage();

        // get a count of the tutorial pages
        var count = tutorialData[tutorialName].boxes.length;

        // increment the page if possible and show the new page if any left to show
        if (tutorPage.incrementPage(count)) {
            obj.showPage(tutorialName, tutorPage.getPage());
        } else {
            obj.completeTutorial(tutorialName);
        }
    };

    /**
     * Completes a tutorial and prevents reopening unless forced
     *
     * @param tutorialName The name of the tutorial to reopen
     */
    obj.completeTutorial = function (tutorialName) {
        tutorPromise.resolve('complete', {tutorial: tutorialName});
        store.complete(tutorialName);
        store.setPage(tutorialName, 0);
    };

    /**
     * Creates the boxes for a given tutorial page
     *
     * @param tutorialName The name of the tutorial to show
     * @param id The number of the page to show
     * @returns {boolean} True if the page is shown correctly
     */
    obj.showPage = function (tutorialName, id) {
        // init vars
        var boxes, page, tutorial;

        // update the page being shown against stored
        store.setPage(tutorialName, id);

        // check the name is valid
        tutorial = tutorialData[tutorialName];
        if (!tutorial) {
            tutorPromise.resolve('tutorialNotFound', {tutorial: tutorialName});
            return false;
        }
        tutorPromise.notify('showPage', {tutorial: tutorialName, pageNum: id});

        // get the boxes to show and make sure the list of boxes is an array
        boxes = tutorial.boxes[id];
        if (typeof boxes === 'string') {
            boxes = [boxes];
        }

        // loop through all available boxes
        for (page in boxes) {
            if (boxes.hasOwnProperty(page)) {
                // show each box
                obj.showBox(tutorialName, boxes[page], boxData);

                // work out if to show the background
                if (boxData[boxes[page]].needsBg) {
                    obj.showBackground();
                }
            }
        }

        // show the control buttons
        if (tutorial.hideControls === false) {
            obj.showControls(tutorialName, tutorial);
        }

        return true;
    };

    /**
     * Hides a page and removes all boxes, controls, and backgrounds
     */
    obj.hidePage = function () {
        // remove all boxes that still exist
        var box = tutorDesign.box();
        box.closeBoxes(box.getConfig());

        // remove the box backgrounds
        obj.hideBackground();

        // hide the control buttons
        obj.hideControls();
    };

    /**
     * Passes the box creation to an external class to make customisation easy
     *
     * @param tutorialName The name of the tutorial
     * @param boxName The name of a box
     * @param boxes The box options
     */
    obj.showBox = function (tutorialName, boxName, boxes) {
        // init the promise
        var box = boxes[boxName], promise, boxObject;
        boxObject = tutorDesign.box();
        promise = boxObject.showBox(boxObject.getConfig(), boxName, box);

        // store the promise locally
        tutorPromiseStore.add(boxName, promise);

        // when the promise is complete, check if we can trigger the next page
        promise.done(function () {
            // remove the promise
            tutorPromiseStore.remove(boxName);

            // update the main promise
            tutorPromise.notify('completedBox', {tutorial: tutorialName, box: boxName});

            // check to see if all promises have been complete
            if (tutorPromiseStore.isEmpty(boxes)) {
                // trigger the next page. This needs a fraction of a second
                // timeout or jquery gets the ordering wrong and can delete the
                // new boxes
                window.setTimeout(function () {
                    obj.nextPage(tutorialName);
                }, 1);

            }
        });
    };

    /**
     * Show the background
     */
    obj.showBackground = function () {
        var bg = tutorDesign.background();
        bg.show(bg.getConfig());
    };

    /**
     * Hide the background
     */
    obj.hideBackground = function () {
        var bg = tutorDesign.background();
        bg.remove(bg.getConfig());
    };

    /**
     * Shows the controls for a tutorial
     *
     * @param tutorialName The name of tutorial
     * @param tutorial The tutorial options
     */
    obj.showControls = function (tutorialName, tutorial) {
        // init vars
        var control, promise;

        // show the control buttons
        control = tutorDesign.control();
        promise = control.showControls(control.getConfig());

        obj.handleControls(promise, tutorialName, tutorial);
    };

    /**
     * Hides the controls
     */
    obj.hideControls = function () {
        var control = tutorDesign.control();
        control.hideControls(control.getConfig());
    };

    /**
     * Handles responses from the controls
     *
     * @param promise The promise that returns the controls responses
     * @param tutorialName The name of the tutorial
     * @param tutorial The tutorial options
     */
    obj.handleControls = function (promise, tutorialName, tutorial) {
        // handle the button responses
        promise.progress(function (args) {
            // hide the current page
            obj.hidePage();

            // handle the button responses
            if (args.type === 'pause') {
                // save current page number
                store.setPage(tutorialName, tutorPage.getPage());
                store.complete(tutorialName);

                // trigger the pause tutorial
                obj.tutorial(tutorial.pauseBox);
            } else if (args.type === 'reset') {
                // save the reset page number
                store.setPage(tutorialName, 0);

                // trigger the tutorial again
                obj.tutorial(tutorialName);
            } else if (args.type === 'cancel') {
                // save the tutorial as complete
                store.setPage(tutorialName, 0);
                store.complete(tutorialName);

                // trigger the cancel tutorial
                obj.tutorial(tutorial.cancelBox);
            }
        });
    };

    /**
     * Public methods
     */
    return {
        init: obj.init,
        tutorial: obj.tutorial,
        completeTutorial: obj.completeTutorial
    };
};
