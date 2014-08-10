describe('Tutor config manager', function() {
    beforeEach(function() {
        this.manager = new TutorConfigManager();
    });

    it('merges two separate objects', function() {
        expect(this.manager.merge({a: 'alpha'}, {b: 'beta'})).toEqual({a: 'alpha', b: 'beta'});
    });

    it('merges two objects with some shared values', function() {
        var defaultValues, overrideValues, expectedValues;
        defaultValues = {a: 'aardvark', b: 'bee'};
        overrideValues = {b: 'beetle', c: 'coyote'};
        expectedValues = {a: 'aardvark', b: 'beetle', c: 'coyote'};

        expect(this.manager.merge(defaultValues, overrideValues)).toEqual(expectedValues);
    });

    it('can store the default and user-specified configs', function() {
        var defaultValues, userValues, expectedValues;
        defaultValues = {d: 'degu', e: 'eagle', f: 'fox'};
        userValues = {d: 'donkey', f: 'field mouse', g: 'goat'};
        expectedValues = {d: 'donkey', e: 'eagle', f: 'field mouse', g: 'goat'};

        this.manager.setDefaultConfig(defaultValues);
        this.manager.setUserConfig(userValues);
        expect(this.manager.getConfig()).toEqual(expectedValues);
    });

    it('can cache the config unless specified', function() {
        var defaultValues, userValues, overrideValues, expectedValues, updatedValues;
        defaultValues = {d: 'degu', e: 'eagle', f: 'fox'};
        userValues = {d: 'donkey', f: 'field mouse', g: 'goat'};
        expectedValues = {d: 'donkey', e: 'eagle', f: 'field mouse', g: 'goat'};
        overrideValues = {d: 'dingo'};
        updatedValues = {d: 'dingo', e: 'eagle', f: 'fox'};

        // set the values
        this.manager.setDefaultConfig(defaultValues);
        this.manager.setUserConfig(userValues);
        expect(this.manager.getConfig()).toEqual(expectedValues);

        // change the values without the override
        this.manager.setUserConfig(overrideValues);
        expect(this.manager.getConfig()).toEqual(expectedValues);

        // get the values with override
        expect(this.manager.getConfig({}, true)).toEqual(updatedValues);
    });

    it('can override at the getConfig level', function() {
        var defaultValues, userValues, overrideValues, expectedValues;
        defaultValues = {d: 'degu', e: 'eagle', f: 'fox'};
        userValues = {d: 'donkey', f: 'field mouse', g: 'goat'};
        overrideValues = {d: 'dingo'};
        expectedValues = {d: 'dingo', e: 'eagle', f: 'field mouse', g: 'goat'};

        this.manager.setDefaultConfig(defaultValues);
        this.manager.setUserConfig(userValues);
        expect(this.manager.getConfig(overrideValues)).toEqual(expectedValues);
    });
});