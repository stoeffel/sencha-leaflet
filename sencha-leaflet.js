/**
 * Sencha-Leaflet
 * ==============
 *
 * Author: Christoph Hermann
 *
 * A leaflet component for sencha touch
 */
Ext.define('MO.view.Leaflet', {
    extend: 'Ext.Component',
    alias: 'widget.leafletMap',
    config: {
        map: null,
        layers: [],
        height: '100%',
        width: '100%',
        initialCenter: [40.343633, 116.001635],
        initialZoom: 13,
        initialized: false,
        listeners: {
            order: 'after',
            initialize: function() {
                var task;
                if (Ext.getDom(this.getId())) {
                    this.afterInitialize();
                    this.setInitialized(true);
                } else {
                    task = Ext.create('Ext.util.DelayedTask', function() {
                        console.log('notfound');
                        if (Ext.getDom(this.getId())) {
                            task.cancel();
                        console.log('found');
                            this.afterInitialize();
                            this.setInitialized(true);
                        }
                    }, this);
                    task.delay(200);
                }
            },
            resize: function(w, h, oW, oH) {
                this.onResize();
            },
            heightchange: function() {
                this.onResize();
            },
            widthchange: function() {
                this.onResize();
            }
        }
    },
    /**
     * after the ext component is initialized
     * the map gets created
     */
    afterInitialize: function() {
        var id = this.getId(),
            map = L.map(id);
        console.log(id)
        if (this.getInitialCenter())
            map.setView(this.getInitialCenter(), this.getInitialZoom());
        this.setMap(map);
        L.layerGroup(this.createLayers(this.getLayers())).addTo(map);
        //L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {}).addTo(map);
    },
    /**
     * creates the layers from the given configs
     */
    createLayers: function(layerConfigs) {
        var layers = [];
        Ext.Array.each(layerConfigs, function(layer) {
            layers.push(L.tileLayer(layer.url, layer.options));
        });
        this.setLayers(layers);
        return layers;
    },
    onResize: function() {
        var map = this.getMap();
        if (map) {
            map.invalidateSize();
        }
    }
});
