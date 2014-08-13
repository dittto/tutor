describe('Tutor Design service locator', function() {
    it('can locate box, background, and control objects', function() {
        var design = new TutorDesign({a: 1}, {b: 2}, {c: 3});
        expect(design.box()).toEqual({a: 1});
        expect(design.background()).toEqual({b: 2});
        expect(design.control()).toEqual({c: 3});
    });
});