Ext.define("SE.view.Sessions", {
    extend: 'Ext.grid.Panel',
    alias: 'widget.sessiongridpanel',


    store: 'Sessions',
 
    features: [
        {
            ftype: 'grouping',
            startCollapsed: false,
            groupHeaderTpl: [
                '{[values.rows[0].get(\'sessionTimePretty\')]} (Session Count: {rows.length})'
            ]
        }
    ],

    columns: [
        {
            xtype: 'gridcolumn',
            dataIndex: 'title',
            text: 'Title',
            flex: 1,
            minWidth: 150
        },
        {
            xtype: 'gridcolumn',
            dataIndex: 'id',
            text: 'Id'
        },
        {
            xtype: 'gridcolumn',
            width: 200,
            dataIndex: 'sessionTimePretty',
            text: 'Session Time'
        },
        {
            xtype: 'checkcolumn',
            dataIndex: 'approved',
            text: 'Approved'
        }
    ],

});