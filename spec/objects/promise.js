describe('Tutor Promise object', function() {
    beforeEach(function() {
        this.jQuery = {Deferred: function() {
            return jasmine.createSpyObj('promise', ['resolve', 'notify']);
        }};
        this.promise = new TutorPromise(this.jQuery);
    });

    it('can init a promise', function() {
        this.promise.init();
        var spies = this.promise.getPromise();
        expect(spies.resolve).toBeDefined();
        expect(spies.notify).toBeDefined();
    });

    it('can notify', function() {
        this.promise.init();
        this.promise.notify('showPage', {tutorial: 'homepage', pageNum: 5});
        var notify = this.promise.getPromise().notify;
        expect(notify).toHaveBeenCalledWith({tutorial: 'homepage', pageNum: 5, type: 'showPage'});
    });

    it('can resolve', function() {
        this.promise.init();
        this.promise.resolve('showPage', {tutorial: 'homepage', pageNum: 5});
        var resolve = this.promise.getPromise().resolve;
        expect(resolve).toHaveBeenCalledWith({tutorial: 'homepage', pageNum: 5, type: 'showPage'});
    });
});