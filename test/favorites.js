var sinon = require('sinon');
var should = require('should');

var favorties = null;

describe('Favorites Unit Tests', function() {
  beforeEach(function() {
    var apiUrls = require('../lib/utils/apis.js');
    favorites = require('../lib/favorites/').create({accessToken:'123', apiUrls:apiUrls});
  });

  afterEach(function() {
    favorites = null;
  });

  it('listFavorites should return proper options', function() {
    console.log(favorties);
  });

});
