/**
 *
 * @param $
 * @param htmlObj
 * @param configManager
 * @param promiseFactory
 * @returns {{showBox: (*|Function), closeBox: Function, closeBoxes: Function, getConfig: *}}
 * @constructor
 */
var TutorBox = function ($, htmlObj, configManager, promiseFactory) {
    "use strict";

    // init vars
    var obj = {}, defaultConfig;

    /**
     *
     * @type {{boxClass: string}}
     */
    defaultConfig = {
        boxClass: 'tutor-box'
    };
    configManager.setDefaultConfig(defaultConfig);

    /**
     * Shows a box in the correct location and adds it's relevant events
     *
     * @param config The config for boxes
     * @param boxName The name of the box to create
     * @param box The options for the box
     * @returns {promiseFactory.init}
     */
    obj.showBox = function (config, boxName, box) {
        // init vars
        var tutorPromise, boxId;

        // init the promise
        tutorPromise = new promiseFactory.init();

        // create the box
        boxId = obj.getBoxId(boxName);
        obj.createBox(config, box, boxName, boxId);

        // position the box
        obj.calcBoxPosition(boxId, box);

        // add the events
        obj.initButtonEvents(boxName, box.buttonList, !box.autoClose, box.triggerOn);

        // add event endpoints
        obj.initEventEndpoints(tutorPromise, boxName, box.trigger, box.triggerOn);

        return tutorPromise.getPromise();
    };

    /**
     *
     * @param config
     * @param box
     * @param boxName
     * @param boxId
     */
    obj.createBox = function (config, box, boxName, boxId) {
        $('body').append(htmlObj.box(config, box, boxName, boxId, obj.getButtonId, obj.getOkButtonTrigger));
    };

    /**
     * Creates an id for the box
     *
     * @param boxName The name of the box to generate an id for
     * @returns {string}
     */
    obj.getBoxId = function (boxName) {
        return 'tutor-box-' + boxName;
    };

    /**
     * Creates an id for a button
     *
     * @param boxName The name of the box to generate the button id for
     * @param buttonEvent The event the button triggers
     * @returns {string}
     */
    obj.getButtonId = function (boxName, buttonEvent) {
        return 'tutor-box-' + boxName + '-button-' + buttonEvent;
    };

    /**
     * Gets the trigger name for the ok button of the box
     *
     * @param boxName The name of the box the ok button belongs to
     * @returns {string}
     */
    obj.getOkButtonTrigger = function (boxName) {
        return boxName + '-ok';
    };

    /**
     * Inits the events for the buttons on the box
     *
     * @param boxName The name of the box
     * @param buttons An object of buttons with the key as the event name and
     * the value as the button text
     * @param hasOk Set to true to show the default ok button. This is the
     * button that closes the window
     * @param triggerOn This is the parent to trigger
     */
    obj.initButtonEvents = function (boxName, buttons, hasOk, triggerOn) {
        // init vars
        var buttonEvent, okTrigger;

        // create the events
        for (buttonEvent in buttons) {
            if (buttons.hasOwnProperty(buttonEvent)) {
                obj.initButtonEvent(obj.getButtonId(boxName, buttonEvent), buttonEvent, triggerOn);
            }
        }

        // if an ok is required then add the event
        if (hasOk) {
            okTrigger = obj.getOkButtonTrigger(boxName);
            obj.initButtonEvent(obj.getButtonId(boxName, okTrigger), okTrigger, triggerOn);
        }
    };

    /**
     * Inits the event for the button
     *
     * @param buttonId The id of the button
     * @param buttonEvent The event to trigger on the triggerOn selector
     * @param triggerOn The selector to trigger all events on
     */
    obj.initButtonEvent = function (buttonId, buttonEvent, triggerOn) {
        // remove old events for the button
        $('body').off('click', '#' + buttonId);

        // setup the new event
        $('body').on({click: function () {
            $(triggerOn).trigger(buttonEvent);
        }}, '#' + buttonId);
    };

    /**
     * Calculates the box position
     *
     * @param boxId The id of the box to calculate the box for
     * @param boxConfig The config for the box
     * @returns null
     */
    obj.calcBoxPosition = function (boxId, boxConfig) {
        // init vars
        var offset, $box, $parent, h, w, align;

        // calculate the position if the box is meant to be centrally aligned
        $box = $('#' + boxId);
        if (!!boxConfig.maxWidth) {
            $box.css('max-width', boxConfig.maxWidth);
        }
        if (!!boxConfig.isCentral) {
            return obj.calcBoxPositionCentral($box, !!boxConfig.moveToBottom);
        }

        // otherwise calculate the position based on the parent
        $parent = $(boxConfig.parentObject);
        offset = $parent.offset();
        if (offset === undefined) {
            return null;
        }

        // get the current box dimensions
        align = boxConfig.align;
        h = align === 'top' ? -1 * $box.outerHeight() : (align === 'bottom' ? $parent.outerHeight() : 0);
        w = align === 'left' ? -1 * $box.outerWidth() : (align === 'right' ? $parent.outerWidth() : 0);

        // move the box to it's offset
        $box.css('top', offset.top + h);
        $box.css('left', offset.left + w);

        return null;
    };

    /**
     * Moves the box into the center of the screen
     *
     * @param $box The jQuery object of the box
     * @param moveToBottom A flag to move the box to the bottom of the page
     */
    obj.calcBoxPositionCentral = function ($box, moveToBottom) {
        // set to center of window
        $box.css('margin-left', -1 * ($box.width() / 2));
        $box.css('margin-top', -1 * ($box.height() / 2));

        // add the centralised class
        $box.addClass('tutor-box-central' + (moveToBottom ? ' tutor-box-bottom' : ''));
    };

    /**
     * Sets up the event capture for the box
     *
     * @param tutorPromise A wrapper for a promise
     * @param boxName The name of the box
     * @param trigger The possible trigger that will close this box
     * @param triggerOn The element to store these triggers against
     */
    obj.initEventEndpoints = function (tutorPromise, boxName, trigger, triggerOn) {
        // init vars
        var okTrigger, events = {};

        // remove any namespaced events already set up for this box
        $(triggerOn).off('.tutor-' + boxName);

        // define the events for the ok trigger and the defined trigger
        okTrigger = obj.getOkButtonTrigger(boxName);
        events[okTrigger + '.tutor-' + boxName] = function () {
            obj.triggerBoxComplete(tutorPromise, boxName);
        };
        if (!!trigger) {
            events[trigger + '.tutor-' + boxName] = function () {
                obj.triggerBoxComplete(tutorPromise, boxName);
            };
        }

        // capture the events
        $(triggerOn).on(events);
    };

    /**
     * Triggers the box to close and updated the deferred object
     *
     * @param tutorPromise A wrapper for a promise
     * @param boxName The name of the box in this tutorial
     */
    obj.triggerBoxComplete = function (tutorPromise, boxName) {
        // flag box as complete
        tutorPromise.resolve('boxOk', {name: boxName});

        // close box
        obj.closeBox($('#' + obj.getBoxId(boxName)));
    };

    /**
     * Handle closing a box
     *
     * @param $box The jquery object of the close to close
     */
    obj.closeBox = function ($box) {
        $box.remove();
    };

    /**
     * Closes all boxes open
     *
     * @param config The config containing the class
     */
    obj.closeBoxes = function (config) {
        $('.' + config.boxClass).each(function () {
            obj.closeBox($(this));
        });
    };

    /**
     * Public methods
     */
    return {
        showBox: obj.showBox,
        closeBox: obj.closeBox,
        closeBoxes: obj.closeBoxes,
        getConfig: configManager.getConfig
    };
};
