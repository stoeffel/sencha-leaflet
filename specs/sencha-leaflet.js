describe("Sencha-Leaflet", function() {
    var view;
    beforeEach(function() {
        view = Ext.create('MO.view.Leaflet', {
            renderTo: 'mapDiv'
        });
    });
    it('should be a class', function() {
        expect(view).toBeDefined();
    });
    it('should be a component', function() {
        expect(view.superclass.$className).toBe('Ext.Component');
    });
    it('should have a property map', function() {
        expect(view).toBeDefined('map');
    });
    it('should render', function() {
        waitsFor(function() {
            return view.isRendered();
        });
    });
});
describe("sencha-leaflet AfterRender", function() {
    var renderedView, map;
    beforeEach(function() {
        var mapDiv = Ext.query('#mapDiv')[0];
        if (mapDiv) {
            Ext.get(mapDiv).setHtml('');
        }
        renderedView = Ext.create('MO.view.Leaflet', {
            renderTo: 'mapDiv'
        });
        waitsFor(function() {
            return renderedView.isRendered();
        });
        runs(function() {
            map = renderedView.getMap();
        });
    });
    it('should have a leaflet map', function() {
        expect(map instanceof L.Class).toBe(true);
    });
    it('tracks resizing of the map and the div', function() {
        renderedView.setHeight(100);
        expect(map.getSize().y).toBe(100);
        renderedView.setWidth(100);
        expect(map.getSize().x).toBe(100);
    });
});
