Ext.define('HW.view.MainView', {
    extend: 'Ext.container.Viewport',

    layout: 'fit',
    renderTo: Ext.getBody(),

    items: [
        {
            xtype: 'container',

            layout: 'border',

            items:[
                {
                    region:'center',
                    layout: {
                        type: 'vbox',
                        align: 'stretch',
                    },

                    items: [
                        {
                            html: '<h1>Hello World!</h1>'
                        }
                    ]
                }
            ]

        }
    ],


});