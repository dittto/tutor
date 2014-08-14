/**
 *
 * @param configManager
 * @param tutorDesign
 * @param tutorPage
 * @param tutorPromise
 * @param tutorPromiseStore
 * @param store
 * @returns {{init: Function, tutorial: Function}}
 * @constructor
 */
var TutorMain = function(configManager, tutorDesign, tutorPage, tutorPromise, tutorPromiseStore, store) {
    // init vars
    var obj = {}, boxData = [], tutorialData = [], defaultBoxOptions = {}, defaultPageOptions = {};

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
        moveToBottom: false,
        needsBg: false
    };

    // init the default page options
    defaultPageOptions = {
        hideControls: false,
        boxes: []
    };

    /**
     *
     * @param boxes
     * @param tutorials
     */
    obj.init = function(boxes, tutorials) {
        // init vars
        var boxKey, pageKey;
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
        for (pageKey in tutorialData) {
            if (tutorialData.hasOwnProperty(pageKey)) {
                tutorialData[pageKey] = configManager.merge(defaultPageOptions, tutorialData[pageKey]);
            }
        }

        // remove current page
        obj.hidePage();

        return tutorPromise.getPromise();
    };

    /**
     *
     * @param tutorialName
     * @param forceIfComplete
     */
    obj.tutorial = function(tutorialName, forceIfComplete) {
        // remove any current page options
        obj.hidePage();

        // check the store to see if to skip this tutorial
        if (!store.isComplete(tutorialName) || forceIfComplete === true) {
            // show the first box
            store.reset(tutorialName);
            tutorPromiseStore.reset();
            tutorPage.setPage(store.getPage(tutorialName));
            obj.showPage(tutorialName, tutorPage.getPage());
        }
    };

    /**
     *
     * @param tutorialName
     */
    obj.nextPage = function(tutorialName) {
        // remove any current page boxes
        obj.hidePage();

        // get a count of the tutorial pages
        var count = tutorialData[tutorialName].boxes.length;

        // increment the page if possible and show the new page if any left to show
        if (tutorPage.incrementPage(count)) {
            obj.showPage(tutorialName, tutorPage.getPage());
        } else {
            tutorPromise.resolve('complete', {tutorial: tutorialName});
            store.complete(tutorialName);
            store.setPage(tutorialName, 0);
        }
    };

    /**
     *
     * @param tutorialName
     * @param id
     * @returns bool True if the page is shown correctly
     */
    obj.showPage = function(tutorialName, id) {
        // init vars
        var boxes, page, tutorial;

        // update the page being shown against stored
        store.setPage(tutorialName, id);

        // check the name is valid
        tutorial = tutorialData[tutorialName];
        if (!tutorial) {
            tutorPromise.resolve('tutorialNotFound', {tutorial: tutorialName});
            return false;
        } else {
            tutorPromise.notify('showPage', {tutorial: tutorialName, pageNum: id});
        }

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
            obj.showControls(tutorialName);
        }

        return true;
    };

    /**
     *
     */
    obj.hidePage = function() {
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
     * @param tutorialName
     * @param boxName
     * @param boxes
     */
    obj.showBox = function(tutorialName, boxName, boxes) {
        // init the promise
        var box = boxes[boxName], promise;
        var boxObject = tutorDesign.box();
        promise = boxObject.showBox(boxObject.getConfig(), boxName, box);

        // store the promise locally
        tutorPromiseStore.add(boxName, promise);

        // when the promise is complete, check if we can trigger the next page
        promise.done(function() {
            // remove the promise
            tutorPromiseStore.remove(boxName);

            // update the main promise
            tutorPromise.notify('completedBox', {tutorial: tutorialName, box: boxName});

            // check to see if all promises have been complete
            if (tutorPromiseStore.isEmpty(boxes)) {
                // trigger the next page. This needs a fraction of a second
                // timeout or jquery gets the ordering wrong and can delete the
                // new boxes
                window.setTimeout(function() {
                    obj.nextPage(tutorialName);
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

    /**
     *
     * @param tutorialName
     */
    obj.showControls = function(tutorialName) {
        // init vars
        var control, promise;

        // show the control buttons
        control = tutorDesign.control();
        promise = control.showControls(control.getConfig());

        obj.handleControls(promise, tutorialName);
    };

    /**
     *
     */
    obj.hideControls = function() {
        var control = tutorDesign.control();
        control.hideControls(control.getConfig());
    };

    /**
     *
     * @param promise
     * @param tutorialName
     */
    obj.handleControls = function(promise, tutorialName) {
        // handle the button responses
        promise.progress(function(args) {
            // hide the current page
            obj.hidePage();

            // handle the button responses
            if (args.type === 'pause') {
                // save current page number
                store.setPage(tutorialName, tutorPage.getPage());
                store.complete(tutorialName);

                // trigger the pause tutorial
                obj.tutorial('pause');
            }
            else if (args.type === 'reset') {
                // save the reset page number
                store.setPage(tutorialName, 0);

                // trigger the tutorial again
                obj.tutorial(tutorialName);
            }
            else if (args.type === 'cancel') {
                // save the tutorial as complete
                store.setPage(tutorialName, 0);
                store.complete(tutorialName);

                // trigger the cancel tutorial
                obj.tutorial('cancel');
            }
        });
    };

    /**
     * Public methods
     */
    return {
        init: obj.init,
        tutorial: obj.tutorial
    }
};
