describe('Tutor Box object', function() {
    beforeEach(function() {
        // init config
        var self = this;
        this.config = {
            boxClass: 'tutor-box'
        };

        // init the event trigger holder
        jQuery('body').append('<div id="test-holder"></div>');

        // init the html spy
        this.htmlSpy = jasmine.createSpyObj('htmlSpy', ['box']);
        this.htmlSpy.box.and.callFake(function(config, box, boxName, boxId) {
            return '<div class="' + self.config.boxClass + '" id="' + boxId + '">This is spied data</div>';
        });

        // init the config manager spy
        this.configSpy = jasmine.createSpyObj('configSpy', ['setDefaultConfig', 'getConfig']);
        this.configSpy.getConfig.and.returnValue(this.config);

        // init the promise and promise factory spies
        this.promiseSpy = jasmine.createSpy('promiseSpy');
        this.promiseObjSpy = jasmine.createSpyObj('promiseObjSpy', ['getPromise', 'resolve']);
        this.promiseObjSpy.getPromise.and.returnValue(this.promiseSpy);
        this.factorySpy = jasmine.createSpyObj('factorySpy', ['init']);
        this.factorySpy.init.and.returnValue(this.promiseObjSpy);

        // init the object
        this.obj = new TutorBox(jQuery, this.htmlSpy, this.configSpy, this.factorySpy);
    });

    afterEach(function() {
        jQuery('.' + this.config.boxClass).remove();
        jQuery('#test-holder').remove();
    });

    it('automatically sets the default options', function() {
        expect(this.configSpy.setDefaultConfig).toHaveBeenCalled();
    });

    it('can show a box', function() {
        expect(jQuery('.' + this.config.boxClass).length).toEqual(0);
        expect(this.obj.showBox(this.config, 'firstBox', {})).toEqual(this.promiseSpy);
        expect(jQuery('.' + this.config.boxClass).length).toEqual(1);
    });

    it('can close a box', function() {
        this.obj.showBox(this.config, 'firstBox', {});
        expect(jQuery('.' + this.config.boxClass).length).toEqual(1);
        expect(this.obj.closeBox(jQuery('#tutor-box-fake'))).not.toBeDefined();
        expect(jQuery('.' + this.config.boxClass).length).toEqual(1);
        expect(this.obj.closeBox(jQuery('#tutor-box-firstBox'))).not.toBeDefined();
        expect(jQuery('.' + this.config.boxClass).length).toEqual(0);
    });

    it('can open multiple boxes', function() {
        this.obj.showBox(this.config, 'firstBox', {});
        this.obj.showBox(this.config, 'secondBox', {});
        this.obj.showBox(this.config, 'thirdBox', {});
        expect(jQuery('.' + this.config.boxClass).length).toEqual(3);
    });

    it('can close multiple boxes', function() {
        this.obj.showBox(this.config, 'firstBox', {});
        this.obj.showBox(this.config, 'secondBox', {});
        this.obj.showBox(this.config, 'thirdBox', {});
        expect(jQuery('.' + this.config.boxClass).length).toEqual(3);
        expect(this.obj.closeBoxes(this.config)).not.toBeDefined();
        expect(jQuery('.' + this.config.boxClass).length).toEqual(0);
    });

    it('can get the config', function() {
        expect(this.obj.getConfig()).toEqual(this.config);
    });

    it('can resolve the promise on ok button', function() {
        this.obj.showBox(this.config, 'firstBox', {triggerOn: '#test-holder'});
        this.obj.showBox(this.config, 'secondBox', {triggerOn: '#test-holder'});
        jQuery('#test-holder').trigger('firstBox-ok');
        expect(this.promiseObjSpy.resolve).toHaveBeenCalledWith('boxOk', {name: 'firstBox'});
        jQuery('#test-holder').trigger('secondBox-ok');
        expect(this.promiseObjSpy.resolve).toHaveBeenCalledWith('boxOk', {name: 'secondBox'});
    });

    it('can resolve the promise on trigger', function() {
        this.obj.showBox(this.config, 'firstBox', {trigger: 'resolve-me', triggerOn: '#test-holder'});
        this.obj.showBox(this.config, 'secondBox', {trigger: 'complete-me', triggerOn: '#test-holder'});
        jQuery('#test-holder').trigger('resolve-me');
        expect(this.promiseObjSpy.resolve).toHaveBeenCalledWith('boxOk', {name: 'firstBox'});
        jQuery('#test-holder').trigger('complete-me');
        expect(this.promiseObjSpy.resolve).toHaveBeenCalledWith('boxOk', {name: 'secondBox'});
    });
});