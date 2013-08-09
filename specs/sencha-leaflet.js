describe("Sencha-Leaflet", function() {
    it('should be a class', function() {
        var cmp = Ext.create('MO.view.Leaflet');
        expect(cmp).toBeDefined();
    });
    it('should be a component', function() {
        var cmp = Ext.create('MO.view.Leaflet');
        expect(cmp.superclass.$className).toBe('Ext.Component');
    });
    it('should have a property map', function() {
        var cmp = Ext.create('MO.view.Leaflet');
        expect(cmp).toBeDefined('map');
    });
    xit('tracks that afterRender has been called', function() {
        var cmp = Ext.create('MO.view.Leaflet', {
            renderTo: Ext.getBody()
        });
        spyOn(cmp, 'afterRender');
        waitsFor(function() {
            return cmp.isRendered();
        });
        runs(function() {
            expect(cmp.afterRender).toHaveBeenCalled();
        });
    });
});
