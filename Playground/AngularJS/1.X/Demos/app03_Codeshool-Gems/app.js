(function () {
    'use strict';

    var app = angular.module('store', []);

    app.controller('StoreController', function () {
        this.products = gems;
    });

    var gems = [{
        name: 'Wind',
        price: 25,
        description: 'this is awesome',
        isSoldOut: false,
        canPurchase: true,
        image: "img/icons/_PNG64/weather_wind.png"
    }, {
        name: 'Hail',
        price: 35,
        description: 'this is cool',
        isSoldOut: false,
        canPurchase: true,
        image: "img/icons/_PNG64/weather_hail.png"
    }, {
        name: 'Moon',
        price: 30,
        description: 'this is sweet',
        isSoldOut: false,
        canPurchase: true,
        image: "img/icons/_PNG64/weather_moon.png"
    }, {
        name: 'Rain',
        price: 20,
        description: 'this is meh',
        isSoldOut: true,
        canPurchase: true,
        image: "img/icons/_PNG64/weather_rain.png"
    }];

})();
