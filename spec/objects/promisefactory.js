describe('Tutor Promise Factory object', function() {

    it('returns a promise from the inited function', function() {
        var testFunc = function(test) {
            return jasmine.createSpyObj('promise', ['init']);
        };
        var factory = new TutorPromiseFactory(null, testFunc);

        expect(factory.init().init).toBeDefined();
        expect(factory.init().init).toHaveBeenCalled();
    });
});