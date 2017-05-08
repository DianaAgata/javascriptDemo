/**
 * Created by Sergiu.Savin on 5/8/2017.
 */
'use strict';

// app.js

Ext.Loader.setConfig({ enabled: true });
Ext.application({
    name: "Chapter09",
    appFolder: "app",
    controllers: ["LoginController","HomeController"],
    launch: function () {
        this.viewport = Ext.create("Ext.container.Viewport", {
            renderTo: Ext.getBody(),
            layout: "card",
            items: [
               { xtype : 'login'}
            ]
        });
    }
});