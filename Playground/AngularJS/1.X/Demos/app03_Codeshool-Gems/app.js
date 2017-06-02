(function() {
  'use strict';

  var app = angular.module('store', []);

  app.controller('StoreController', function() {
    this.products = gems;
  });

  var gems = [{
    name: 'Awesomeness',
    price: 25,
    description: 'this is awesome',
    isSoldOut :false,
    canPuchse: true
  }, {
    name: 'Cool',
    price: 35,
    description: 'this is cool',
    isSoldOut :false,
    canPuchse: true
  }, {
    name: 'Sweet',
    price: 30,
    description: 'this is sweet',
    isSoldOut : true,
    canPuchse: true
  }];

})();
