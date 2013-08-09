Ext.require('Ext.app.Application');

var Application = null;

Ext.onReady(function() {
    Application = Ext.create('Ext.app.Application', {
        name: 'MO',

        launch: function() {
            //include the tests in the test.html head
            jasmine.getEnv().addReporter(new jasmine.HtmlReporter());
            jasmine.getEnv().execute();
        }
    });
});
