/**
 * Created by Sergiu.Savin on 5/8/2017.
 */
'use strict';
Ext.define("Chapter09.store.ProjectActionItemStore", {
    extend: "Ext.data.Store",
    model: "Chapter09.model.ProjectActionItem",
    proxy: {
        type: "ajax",
        url: "actionitems.txt",
        reader: {
            type : "json",
            root : "actionitems"
        }
    }
});