describe('Tutor Store object', function() {
    beforeEach(function() {
        this.spy = jasmine.createSpy('store');
        this.store = new TutorStore(this.spy);
    });

    it('can store and retrieve pages from multiple tutorials', function() {
        // test one tutorial
        expect(this.store.setPage('test', 1)).not.toBeDefined();
        expect(this.spy).toHaveBeenCalledWith('tutor-test', 1);
        this.spy.and.callFake(function(name) {
            if (name === 'tutor-test') {
                return 1;
            }
            return null;
        });
        expect(this.store.getPage('test')).toEqual(1);

        // test another tutorial
        expect(this.store.setPage('test', 5)).not.toBeDefined();
        expect(this.spy).toHaveBeenCalledWith('tutor-test', 5);
        expect(this.store.setPage('test2', 10)).not.toBeDefined();
        expect(this.spy).toHaveBeenCalledWith('tutor-test2', 10);
        this.spy.and.callFake(function(name) {
            if (name === 'tutor-test') {
                return 5;
            } else if (name === 'tutor-test2') {
                return 10;
            }
            return null;
        });
        expect(this.store.getPage('test')).toEqual(5);
        expect(this.store.getPage('test2')).toEqual(10);
    });

    it('can be complete', function() {
        expect(this.store.complete('test')).not.toBeDefined();
        expect(this.spy).toHaveBeenCalledWith('tutor-test-complete', true);
        this.spy.and.callFake(function(name) {
            if (name === 'tutor-test-complete') {
                return true;
            }
            return null;
        });
        expect(this.store.isComplete('test')).toEqual(true);
    });

    it('can reset', function() {
        expect(this.store.reset('test')).not.toBeDefined();
        expect(this.spy).toHaveBeenCalledWith('tutor-test-complete', '');
    });

    it('can import json', function() {
        var json = '{"tutor-cancel-complete": true, "tutor-cancel": 0, "tutor-pause-complete": true, "tutor-pause": 0}';
        expect(this.store.import(json)).not.toBeDefined();
        expect(this.spy).toHaveBeenCalledWith('tutor-cancel-complete', true);
        expect(this.spy).toHaveBeenCalledWith('tutor-cancel', 0);
        expect(this.spy).toHaveBeenCalledWith('tutor-pause-complete', true);
        expect(this.spy).toHaveBeenCalledWith('tutor-pause', 0);
    });

    it('can export json', function() {
        var json = '{"tutor-cancel-complete":true,"tutor-cancel":0,"tutor-pause-complete":true,"tutor-pause":0}';
        this.spy.and.returnValue({"tutor-cancel-complete": true, "tutor-cancel": 0, "tutor-pause-complete": true, "tutor-pause": 0});
        expect(this.store.export()).toEqual(json);
    });
});