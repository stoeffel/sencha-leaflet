describe("Basic Assumptions", function() {

    it("has SenchaTouch 2 loaded", function() {
        expect(Ext).toBeDefined();
        expect(Ext.getVersion()).toBeTruthy();
        expect(Ext.getVersion().major).toEqual(2);
    });

    it("has loaded MO code", function() {
        expect(MO).toBeDefined();
    });

    it("has Leaflet loaded", function() {
        expect(L).toBeDefined();
    });
});
