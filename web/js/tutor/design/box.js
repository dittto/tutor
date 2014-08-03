var TutorBox = function($) {
    /**
     * Shows a box in the correct location and adds it's relevant events
     *
     * @param config The config for boxes
     * @param boxName The name of the box to create
     * @param box The options for the box
     * @returns {$.Deferred}
     */
    function showBox(config, boxName, box) {
        // init vars
        var promise, boxId;

        // init the promise
        promise = new $.Deferred();
        // create the box
        boxId = createBox(config, boxName, box);

        // position the box
        calcBoxPosition(boxId, box);

        // add the events
        initButtonEvents(boxName, box.buttonList, !box.autoClose, box.triggerOn);

        // add event endpoints
        initEventEndpoints(promise, boxName, box.trigger, box.triggerOn);

        return promise;
    }

    /**
     * Creates a box and returns it's unique id
     *
     * @param config The config for boxes
     * @param boxName The name of the box to create
     * @param box The options for the box
     * @returns {string}
     */
    function createBox(config, boxName, box) {
        // init vars
        var boxId = getBoxId(boxName);

        // add the box
        $('body').append(
            '<div id="' + boxId + '" class="' + config.boxClass + '">' +
            getContent(box.content, box.contentText) +
            getButtons(boxName, box.buttonList, !box.autoClose && !box.trigger, box.buttonText) +
            '</div>');

        return boxId;
    }

    /**
     * Gets the content text from either the selector or as specified
     *
     * @param selector The selector containing the text for the box
     * @param text If there's no selector specified then use this text
     * @returns {string}
     */
    function getContent(selector, text) {
        // check the selector
        var content = '';
        if (selector !== '') {
            content = $(selector).text();
        } else {
            content = text;
        }

        return '<div class="tutor-box-content">' + content + '</div>';
    }

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
    function getButtons(boxName, buttons, hasOk, okText) {
        // init vars
        var content = '', buttonEvent;

        // loop through and create the buttons
        for (buttonEvent in buttons) {
            if (!buttons.hasOwnProperty(buttonEvent)) {
                continue;
            }

            // create the button
            content += '<button id="' + getButtonId(boxName, buttonEvent) + '">' + buttons[buttonEvent] + '</button>';
        }

        // if an ok button is required, then add
        if (hasOk) {
            content += '<button id="' + getButtonId(boxName, getOkButtonTrigger(boxName)) + '">' + okText + '</button>';
        }

        return '<div class="tutor-box-buttons">' + content + '</div>';
    }

    /**
     * Creates an id for the box
     *
     * @param boxName The name of the box to generate an id for
     * @returns {string}
     */
    function getBoxId(boxName) {
        return 'tutor-box-' + boxName;
    }

    /**
     * Creates an id for a button
     *
     * @param boxName The name of the box to generate the button id for
     * @param buttonEvent The event the button triggers
     * @returns {string}
     */
    function getButtonId(boxName, buttonEvent) {
        return 'tutor-box-' + boxName + '-button-' + buttonEvent;
    }

    /**
     * Gets the trigger name for the ok button of the box
     *
     * @param boxName The name of the box the ok button belongs to
     * @returns {string}
     */
    function getOkButtonTrigger(boxName) {
        return boxName + '-ok';
    }

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
    function initButtonEvents(boxName, buttons, hasOk, triggerOn) {
        // init vars
        var buttonEvent, okTrigger;

        // create the events
        for (buttonEvent in buttons) {
            if (!buttons.hasOwnProperty(buttonEvent)) {
                continue;
            }

            // set up the events for the buttons
            initButtonEvent(getButtonId(boxName, buttonEvent), buttonEvent, triggerOn);
        }

        // if an ok is required then add the event
        if (hasOk) {
            okTrigger = getOkButtonTrigger(boxName);
            initButtonEvent(getButtonId(boxName, okTrigger), okTrigger, triggerOn);
        }
    }

    /**
     * Inits the event for the button
     *
     * @param buttonId The id of the button
     * @param buttonEvent The event to trigger on the triggerOn selector
     * @param triggerOn The selector to trigger all events on
     */
    function initButtonEvent(buttonId, buttonEvent, triggerOn) {
        $('body').on({click: function() {
            $(triggerOn).trigger(buttonEvent);
        }}, '#' + buttonId);
    }

    /**
     * Calculates the box position
     *
     * @param boxId The id of the box to calculate the box for
     * @param boxConfig The config for the box
     * @returns null
     */
    function calcBoxPosition(boxId, boxConfig) {
        // init vars
        var offset, $box, $parent, h, w, align;

        // calculate the position if the box is meant to be centrally aligned
        $box = $('#' + boxId);
        if (!!boxConfig.isCentral) {
            return calcBoxPositionCentral($box, boxConfig.maxWidth);
        }

        // otherwise calculate the position based on the parent
        $parent = $(boxConfig.parentObject);
        offset = $parent.offset();
        if (typeof offset === 'undefined') {
            return null;
        }

        // get the current box dimensions
        align = boxConfig.align;
        h = align === 'top' ? -1 * $box.height() : (align === 'bottom' ? $parent.height() : 0);
        w = align === 'left' ? -1 * $box.width() : (align === 'right' ? $parent.width() : 0);

        // move the box to it's offset
        $box.css('top', offset.top + h);
        $box.css('left', offset.left + w);

        return null;
    }

    /**
     * Moves the box into the center of the screen
     *
     * @param $box The jQuery object of the box
     * @param maxWidth The max width of the box
     */
    function calcBoxPositionCentral($box, maxWidth) {
        // add a max-width if required
        if (!!maxWidth) {
            $box.css('max-width', maxWidth);
        }

        // set to center of window
        $box.css('margin-left', -1 * ($box.width() / 2));
        $box.css('margin-top', -1 * ($box.height() / 2));

        // add the centralised class
        $box.addClass('tutor-box-central');
    }

    /**
     * Sets up the event capture for the box
     *
     * @param promise The promise to complete when the box has been triggered
     * successfully
     * @param boxName The name of the box
     * @param trigger The possible trigger that will close this box
     * @param triggerOn The element to store these triggers against
     */
    function initEventEndpoints( promise, boxName, trigger, triggerOn) {
        // init vars
        var okTrigger, events = {};
        // define the events for the ok trigger and the defined trigger
        okTrigger = getOkButtonTrigger(boxName);
        events[okTrigger] = function(e) {
            triggerBoxComplete(promise, boxName);
        };
        if (!!trigger) {
            events[trigger] = function(e) {
                triggerBoxComplete(promise, boxName);
            };
        }

        // capture the events
        $(triggerOn).on(events);
    }

    /**
     * Triggers the box to close and updated the deferred object
     *
     * @param promise The deferred promise of this box closing
     * @param boxName The name of the box in this tutorial
     */
    function triggerBoxComplete(promise, boxName) {
        // flag box as complete
        promise.resolve();

        // close box
        closeBox($('#' + getBoxId(boxName)));
    }

    /**
     * Handle closing a box
     *
     * @param $box The jquery object of the close to close
     */
    function closeBox($box) {
        $box.remove();
    }

    return {
        showBox: showBox,
        closeBox: closeBox
    }
}