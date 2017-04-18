Ext.define('SE.view.MainView', {
    extend: "Ext.container.Viewport",
    layout: {
        type: 'fit'
    },
    items: [
        {
            xtype: 'panel',
            resizable: false,
            layout: {
                type: 'border'
            },
            collapsed: false,
            items: [
                {
                    xtype: 'container',
                    region: 'center',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'sessiongridpanel',
                            flex: 3
                        },
                        {
                            xtype: 'splitter'
                        },
                        {
                            //xtype: 'panel',
                            html: 'Speakers Panel',
                            flex: 2

                        }
                    ]
                },
                {
                    region: 'east',
                    split: true,
                    //xtype: 'panel',
                    html: 'Details Panel',
                    flex: 2,
                    title: 'Details Panel'

                }
            ]
        }
    ]


});