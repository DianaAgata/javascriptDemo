/**
 * Created by Sergiu.Savin on 5/8/2017.
 */
'use strict';
Ext.define("Chapter09.controller.HomeController", {
    extend: "Ext.app.Controller",
    id: "HomeController",
    refs: [
        { ref: "actionItemsGrid", selector: "home grid" },
        { ref: "actionItemDetailsPanel", selector: "home form" }
    ],
    models: ["ProjectActionItem"],
    stores: ["ProjectActionItemStore"],
    views: ["home.ProjectActionItemDetailsPanel", "home.ProjectActionItemGrid", "home.HomeScreen"],
    init: function () {
        this.control({
            "home": {
                beforerender: this.loadProjectActionItems
            },
            "home grid": {
                itemclick: this.displayProjectActionItemDetails
            }
        });
    },
    displayProjectActionItemDetails: function (src, record) {
        this.getActionItemDetailsPanel().loadRecord(record);
    },
    loadProjectActionItems: function () {
        var store = Ext.getStore("ProjectActionItemStore");
        store.load();
        this.getActionItemsGrid().reconfigure(store);
    }
});