Ext.define('SE.view.Presenters', {
    extend: 'Ext.grid.Panel',

    title: 'Presenter(s)',
    alias: 'widget.presenters',

    store: "Presenters",

    columns: [
        {
            xtype: 'gridcolumn',
            dataIndex: 'firstLast',
            text: 'Presenter Name',
            flex: 1
        },
        {
            xtype: 'numbercolumn',
            dataIndex: 'id',
            text: 'id'
        }
    ]


});