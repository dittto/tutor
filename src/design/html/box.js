/**
 *
 * @param $
 * @returns {{box: *}}
 * @constructor
 */
var TutorHtmlBox = function ($) {
    "use strict";

    // init vars
    var obj = {};

    /**
     *
     * @param config
     * @param box
     * @param boxName
     * @param boxId
     * @param getButtonIdFunc
     * @param getOkButtonTriggerFunc
     * @returns {string}
     */
    obj.getBox = function (config, box, boxName, boxId, getButtonIdFunc, getOkButtonTriggerFunc) {
        // init vars
        obj.getButtonIdFunc = getButtonIdFunc;
        obj.getOkButtonTriggerFunc = getOkButtonTriggerFunc;

        // add the box
        return '<div id="' + boxId + '" class="' + config.boxClass + ' panel panel-default">' +
                obj.getTitle(box.contentTitle) +
                '<div class="panel-body">' +
                obj.getContent(box.content, box.contentText) +
                obj.getButtons(boxName, box.buttonList, !box.autoClose && !box.trigger, box.buttonText) +
                '</div></div>';
    };

    /**
     * Creates a title section for the box
     *
     * @param text The text to put in the title
     * @returns {string}
     */
    obj.getTitle = function (text) {
        var title = '';
        if (text) {
            title = '<div class="panel-heading"><h3 class="panel-title">' + text + '</h3></div>';
        }

        return title;
    };

    /**
     * Gets the content text from either the selector or as specified
     *
     * @param selector The selector containing the text for the box
     * @param text If there's no selector specified then use this text
     * @returns {string}
     */
    obj.getContent = function (selector, text) {
        // check the selector
        var content = '';
        if (selector !== '') {
            content = $(selector).text();
        } else {
            content = text;
        }

        return '<div class="tutor-box-content">' + content + '</div>';
    };

    /**
     * Gets the buttons for the box
     *
     * @param boxName The name of the box
     * @param buttons An object of buttons with the key as the event name and
     * the value as the button text
     * @param hasOk Set to true to show the default ok button. This is the
     * button that closes the window
     * @param okText The text for the ok button
     * @returns {string}
     */
    obj.getButtons = function (boxName, buttons, hasOk, okText) {
        // init vars
        var content = '', buttonEvent;

        // loop through and create the buttons
        for (buttonEvent in buttons) {
            if (buttons.hasOwnProperty(buttonEvent)) {
                content += '<button id="' + obj.getButtonIdFunc(boxName, buttonEvent) + '" class="btn btn-default">' + buttons[buttonEvent] + '</button>';
            }
        }

        // if an ok button is required, then add
        if (hasOk) {
            content += '<button id="' + obj.getButtonIdFunc(boxName, obj.getOkButtonTriggerFunc(boxName)) + '" class="btn btn-success">' + okText + ' <span class="glyphicon glyphicon-ok"></span></button>';
        }

        // add the wrapper if content
        if (content) {
            content = '<div class="tutor-box-buttons btn-group pull-right">' + content + '</div>';
        }

        return content;
    };

    /**
     * Public methods
     */
    return {
        box: obj.getBox
    };
};
