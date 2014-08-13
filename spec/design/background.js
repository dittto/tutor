describe('Tutor Background object', function() {
    beforeEach(function() {
        // init the html spy
        this.config = {bgClass: 'tutor-bg-test'};
        this.htmlSpy = jasmine.createSpyObj('htmlSpy', ['bg']);
        this.htmlSpy.bg.and.returnValue('<div class="' + this.config.bgClass + '">HTML spy returned</div>');

        // init the config manager spy
        this.configSpy = jasmine.createSpyObj('configSpy', ['setDefaultConfig', 'getConfig']);
        this.configSpy.getConfig.and.returnValue({spy: 'returned'});

        // init the object
        this.obj = new TutorBackground(jQuery, this.htmlSpy, this.configSpy);
    });

    afterEach(function() {
        jQuery('.' + this.config.bgClass).remove();
    });

    it('automatically calls default config on the config manager', function() {
        expect(this.configSpy.setDefaultConfig).toHaveBeenCalled();
    });

    it('can add only a single background to a dom element', function() {
        expect(this.obj.show(this.config)).not.toBeDefined();
        expect(this.obj.show(this.config)).not.toBeDefined();
        expect(this.htmlSpy.bg).toHaveBeenCalledWith(this.config);
        expect(jQuery('.' + this.config.bgClass).html()).toEqual('HTML spy returned');
        expect(this.htmlSpy.bg.calls.count()).toEqual(1);
    });

    it('can remove the background it adds', function() {
        this.obj.show(this.config);
        expect(jQuery('.' + this.config.bgClass).length).toEqual(1);
        expect(this.obj.remove(this.config)).not.toBeDefined();
        expect(jQuery('.' + this.config.bgClass).length).toEqual(0);
    });

    it('can retrieve the completed config', function() {
        expect(this.obj.getConfig()).toEqual({spy: 'returned'});
    });
});