describe('Tutor Promise Store object', function() {
    beforeEach(function() {
        this.store = new TutorPromiseStore();
    });

    it('can add promises to the store', function() {
        expect(this.store.isEmpty()).toEqual(true);
        expect(this.store.count()).toEqual(0);
        expect(this.store.add('first', {})).not.toBeDefined();
        expect(this.store.count()).toEqual(1);
        expect(this.store.isEmpty()).toEqual(false);

        this.store.add('other', {});
        expect(this.store.count()).toEqual(2);
        expect(this.store.isEmpty()).toEqual(false);
    });

    it('can\'t add the same promise twice', function() {
        expect(this.store.count()).toEqual(0);
        this.store.add('first', {});
        expect(this.store.count()).toEqual(1);

        this.store.add('first', {});
        expect(this.store.count()).toEqual(1);
    });

    it('can remove promises', function() {
        expect(this.store.count()).toEqual(0);
        this.store.add('first', {});
        expect(this.store.count()).toEqual(1);

        expect(this.store.remove('first')).not.toBeDefined();
        expect(this.store.count()).toEqual(0);

    });

    it('can reset the store', function() {
        expect(this.store.count()).toEqual(0);
        this.store.add('alpha', {});
        expect(this.store.count()).toEqual(1);
        this.store.add('beta', {});
        expect(this.store.count()).toEqual(2);
        this.store.add('gamma', {});
        expect(this.store.count()).toEqual(3);
        this.store.add('delta', {});
        expect(this.store.count()).toEqual(4);

        expect(this.store.reset()).not.toBeDefined();
        expect(this.store.count()).toEqual(0);
        expect(this.store.isEmpty()).toEqual(true);
    });

    it('can handle isEmpty checks even when some boxes shouldn\'t be checked', function() {
        var boxes = {alpha: {autoClose: true}, gamma: {autoClose: true}};

        expect(this.store.count()).toEqual(0);
        this.store.add('alpha', {});
        this.store.add('beta', {});
        this.store.add('gamma', {});
        this.store.add('delta', {});
        expect(this.store.count()).toEqual(4);
        expect(this.store.isEmpty(boxes)).toEqual(false);

        this.store.remove('delta');
        this.store.remove('beta');
        expect(this.store.count()).toEqual(2);
        expect(this.store.isEmpty(boxes)).toEqual(true);
    });
});