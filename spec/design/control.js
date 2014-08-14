describe('Tutor Control object', function() {
    beforeEach(function() {
        // init config
        this.config = {
            id: 'tutor-control-test',
            pauseId: 'tutor-control-pause-test',
            resetId: 'tutor-control-reset-test',
            cancelId: 'tutor-control-cancel-test'
        };

        // init test html
        this.testHtmlBoxes = '<div id="' + this.config.pauseId + '"></div><div id="' + this.config.resetId + '"></div><div id="' + this.config.cancelId + '"></div>';
        this.testHtml = '<div id="' + this.config.id + '">' + this.testHtmlBoxes + '</div>';

        // init the html spy
        this.htmlSpy = jasmine.createSpyObj('htmlSpy', ['box']);
        this.htmlSpy.box.and.returnValue(this.testHtml);

        // init the config manager spy
        this.configSpy = jasmine.createSpyObj('configSpy', ['setDefaultConfig', 'getConfig']);
        this.configSpy.getConfig.and.returnValue(this.config);

        // init the promise and promise factory spies
        this.promiseSpy = jasmine.createSpy('promiseSpy');
        this.promiseObjSpy = jasmine.createSpyObj('promiseObjSpy', ['getPromise', 'notify']);
        this.promiseObjSpy.getPromise.and.returnValue(this.promiseSpy);
        this.factorySpy = jasmine.createSpyObj('factorySpy', ['init']);
        this.factorySpy.init.and.returnValue(this.promiseObjSpy);

        // init the object
        this.obj = new TutorControl(jQuery, this.htmlSpy, this.configSpy, this.factorySpy);
    });

    afterEach(function() {
        this.obj.hideControls(this.config);
    });

    it('automatically calls default config on the config manager', function() {
        expect(this.configSpy.setDefaultConfig).toHaveBeenCalled();
    });

    it('sets up events for the buttons', function() {
        // init vars
        var pauseEvent, resetEvent, cancelEvent;

        // init a testbed
        this.obj.showControls(this.config);

        pauseEvent = spyOnEvent('#' + this.config.pauseId, 'click');
        $('#' + this.config.pauseId).trigger('click');
        expect('click').toHaveBeenTriggeredOn('#' + this.config.pauseId);
        expect(pauseEvent).toHaveBeenTriggered();

        resetEvent = spyOnEvent('#' + this.config.resetId, 'click');
        $('#' + this.config.resetId).trigger('click');
        expect('click').toHaveBeenTriggeredOn('#' + this.config.resetId);
        expect(resetEvent).toHaveBeenTriggered();

        cancelEvent = spyOnEvent('#' + this.config.cancelId, 'click');
        $('#' + this.config.cancelId).trigger('click');
        expect('click').toHaveBeenTriggeredOn('#' + this.config.cancelId);
        expect(cancelEvent).toHaveBeenTriggered();
    });

    it('adds the control box to the body and returns a promise', function() {
        expect(this.obj.showControls(this.config)).toEqual(this.promiseSpy);
        expect(this.obj.showControls(this.config)).toEqual(this.promiseSpy);
        expect(this.htmlSpy.box).toHaveBeenCalledWith(this.config);
        expect(jQuery('#' + this.config.id).html()).toEqual(this.testHtmlBoxes);
        expect(this.htmlSpy.box.calls.count()).toEqual(1);
    });

    it('can remove the box it adds', function() {
        this.obj.showControls(this.config);
        expect(jQuery('#' + this.config.id).length).toEqual(1);
        expect(this.obj.hideControls(this.config)).not.toBeDefined();
        expect(jQuery('#' + this.config.id).length).toEqual(0);
    });

    it('can retrieve the completed config', function() {
        expect(this.obj.getConfig()).toEqual(this.config);
    });

    it('can notify on pause button clicked', function() {
        this.obj.showControls(this.config);
        $('#' + this.config.pauseId).trigger('click');
        expect(this.promiseObjSpy.notify).toHaveBeenCalledWith('pause', {});
    });

    it('can notify on reset button clicked', function() {
        this.obj.showControls(this.config);
        $('#' + this.config.resetId).trigger('click');
        expect(this.promiseObjSpy.notify).toHaveBeenCalledWith('reset', {});
    });

    it('can notify on cancel button clicked', function() {
        this.obj.showControls(this.config);
        $('#' + this.config.cancelId).trigger('click');
        expect(this.promiseObjSpy.notify).toHaveBeenCalledWith('cancel', {});
    });
});