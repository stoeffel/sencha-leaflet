Ext.define('MO.view.Leaflet', {
    extend: 'Ext.Component',
    config: {
        map: null
    },
    afterRender: function(t, eOpts) {
        this.callParent(arguments);

        //var leafletRef = window.L;
        //if (leafletRef == null) {
            //this.update('No leaflet library loaded');
        //} else {
            //var map = L.map(this.getId());
            //map.setView([42.3583, -71.0603], 13);
            //this.setMap(map);
            //L.tileLayer('http://{s}.tile.cloudmade.com/{key}/{styleId}/256/{z}/{x}/{y}.png', {
                //key: 'YOUR_API_KEY',
                //styleId: 997,
                //maxZoom: 18
            //}).addTo(map);
        //}
    }
});
