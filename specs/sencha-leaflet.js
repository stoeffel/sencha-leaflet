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
    it('should have a alias', function() {
        var widget = Ext.widget('leafletMap', {
            renderTo: 'mapDiv'
        });
        expect(widget).toBeDefined();
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
describe("Sencha-Leaflet AfterRender", function() {
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
describe("Sencha-Leaflet Config", function() {
    var layer;
    beforeEach(function() {
        var mapDiv = Ext.query('#mapDiv')[0];
        if (mapDiv) {
            Ext.get(mapDiv).setHtml('');
        }
        layers = [{
                url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                options: {
                    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>'
                }
            }
        ];
    });
    it('takes a layers array and passes it to the map', function() {
        var view = Ext.create('MO.view.Leaflet', {
            renderTo: 'mapDiv',
            layers: layers
        }),
            map = view.getMap();
        expect(view.getLayers()[0] instanceof L.TileLayer).toBe(true);
    });
    it('should set the view to the initialcenter and initialzoom', function() {
        var view = Ext.create('MO.view.Leaflet', {
            renderTo: 'mapDiv',
            layers: layers,
            initialCenter: [47.556, 8.8965],
            initialZoom: 15
        }),
            map = view.getMap();
        expect(view.getLayers()[0] instanceof L.TileLayer).toBe(true);
    });
});
describe("Sencha-Leaflet in component", function() {
    beforeEach(function() {
        var mapDiv = Ext.query('#mapDiv')[0];
        if (mapDiv) {
            Ext.get(mapDiv).setHtml('');
        }
        runs(function() {
            Ext.require('Ext.TabPanel');
        });
        waitsFor(function() {
            return Ext.TabPanel != null
        });
    });
    it('should be in the 2nd tab', function() {
        Ext.application({
            name: 'Sencha-Leaflet',
            launch: function() {
                var tabPanel = Ext.create('Ext.TabPanel', {
                    renderTo: 'mapDiv',
                    tabBarPosition: 'bottom',
                    defaults: {
                        styleHtmlContent: true
                    },
                    items: [{
                            title: 'Home',
                            iconCls: 'home',
                            html: 'Leaflet component for Sencha Touch 2'
                        }, {
                            xtype: 'leafletMap',
                            title: 'Map',
                            iconCls: 'maps',
                            initialCenter: [47.556, 8.8965],
                            initialZoom: 15,
                            layers: [{
                                    url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                                    options: {
                                        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>'
                                    }
                                }
                            ]
                        }
                    ]
                });
                expect(tabPanel.down('leafletMap').getMap()).toBeDefined();
            }
        });
    });
});
