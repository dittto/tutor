describe('Tutor Page object', function() {
    beforeEach(function() {
        this.page = new TutorPage();
    });

    it('starts off at 0', function() {
        expect(this.page.getPage()).toEqual(0);
    });

    it('can set and get a page number', function() {
        // test a normal int
        expect(this.page.setPage(1)).not.toBeDefined();
        expect(this.page.getPage()).toEqual(1);

        // test a string
        this.page.setPage('5');
        expect(this.page.getPage()).toEqual(5);

        // test something that's not an integer
        this.page.setPage('fail');
        expect(this.page.getPage()).toBeNaN();
    });

    it('can increment the page number', function() {
        expect(this.page.getPage()).toEqual(0);
        expect(this.page.incrementPage(100)).toEqual(true);
        expect(this.page.getPage()).toEqual(1);
    });

    it('will return true if page number is valid or false if there are no more pages', function() {
        this.page.setPage(3);
        expect(this.page.incrementPage(5)).toEqual(true);
        expect(this.page.getPage()).toEqual(4);

        // it won't increment if it fails
        expect(this.page.incrementPage(5)).toEqual(false);
        expect(this.page.getPage()).toEqual(4);
    });
});