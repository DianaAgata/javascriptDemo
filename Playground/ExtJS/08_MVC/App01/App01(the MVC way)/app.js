Ext.Loader.setConfig({
    enabled: true
});


Ext.application({
    name: 'SE',
    requires: [
        'SE.view.MainView'
    ],

    controllers:[
        'SE.controller.SessionController'
    ],

    stores:[
      'Sessions'
    ],

    models:[
        'Session'
    ],

    views: [
        'Sessions',
        'SessionForm'
    ],

    launch: function () {
        Ext.create('SE.view.MainView');
    }

});

