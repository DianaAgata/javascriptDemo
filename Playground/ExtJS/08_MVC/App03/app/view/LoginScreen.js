/**
 * Created by Sergiu.Savin on 5/8/2017.
 */
'use strict';
Ext.define("Chapter09.view.LoginScreen", {
    extend: "Ext.form.Panel",
    xtype: "login",
    layout: {
        type : "hbox",
        pack : "center",
        align : "middle"
    },
    defaults : {margin:5},
    title: "MVC with Ext JS 4",
    titleAlign: "center",
    padding : 250,
    items: [
        {
            xtype: "textfield",
            id: "usernametext",
            fieldLabel: "User name"
        },
        {
            xtype: "textfield",
            id: "passwordtext",
            fieldLabel: "Password",
            inputType: "password"
        },
        {
            xtype: "button",
            id: "loginbutton",
            text: "Login"
        }
    ]
});