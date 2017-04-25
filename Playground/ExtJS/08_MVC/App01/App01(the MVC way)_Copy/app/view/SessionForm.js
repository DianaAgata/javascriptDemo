Ext.define('SE.view.SessionForm', {
    extend: 'Ext.window.Window',
    alias: 'widget.sessionform',
    padding: 5,
    width: 600,
    title: 'Edit Record',
    modal: true,
    bodyStyle: {
        'background-color': '#fff'
    },
    items: [
        {
            xtype: 'form',
            border: 0,
            bodyPadding: 10,
            manageHeight: false,
            title: '',
            fieldDefaults: {
                labelWidth: 90,
                margin: '0 0 10',
                labelAlign: 'right',
                anchor: '90%'
            },
            items: [
                {
                    xtype: 'textfield',
                    fieldLabel: 'Title',
                    labelAlign: 'right',
                    name: 'title',
                    allowBlank: false
                },
                {
                    xtype: 'checkboxfield',
                    fieldLabel: 'Approved',
                    name: 'approved',
                },
                {
                    xtype: 'container',
                    padding: '10 10 10 10',
                    layout: {
                        type: 'hbox',
                        align: 'middle',
                        pack: 'center'
                    },
                    items: [
                        {
                            xtype: 'button',
                            handler: function (button) {
                                var form = button.up().up('form');
                                form.updateRecord();
                                form.up('window').destroy();
                            },
                            formBind: true,
                            margin: '5 5 5 5 ',
                            text: 'Save'
                        },
                        {
                            xtype: 'button',
                            handler: function (button) {
                                button.up('window').destroy();
                            },
                            margin: '5 5 5 5',
                            text: 'Cancel'
                        }
                    ]
                }
            ]
        }
    ]

});