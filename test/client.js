var sinon = require('sinon');
var should = require('should');

var smartsheet = null;

describe('Client Unit Tests', function() {
  var sandbox;

  beforeEach(function() {
    sandbox = sinon.sandbox.create();
    client = require('../');
    smartsheet = client.createClient({accessToken:'1234'});
  });
   
  afterEach(function() {
    smartsheet = null;
  });

  describe('#Constants', function() {
    it('should have Constants object', function() {
      Object.keys(smartsheet.constants).should.be.length(6);
      smartsheet.should.have.property('constants');
      smartsheet.constants.should.have.property('accessLevel');
      smartsheet.constants.should.have.property('accessScope');
      smartsheet.constants.should.have.property('types');
      smartsheet.constants.should.have.property('paperSize');
      smartsheet.constants.should.have.property('acceptHeaders');
      smartsheet.constants.should.have.property('sheet');
    });
  });

  describe('#Favorites', function() {
    it('should have Favorites object',function(){
      smartsheet.should.have.property('favorites');
      Object.keys(smartsheet.favorites).should.be.length(7);
    });

    it('should have get methods', function() {
      smartsheet.favorites.should.have.property('getFavorites');
    });

    it('should have create methods', function() {
      smartsheet.favorites.should.have.property('createFavorite');
    });

    it('should have delete methods', function() {
      smartsheet.favorites.should.have.property('deleteFavoriteSheet');
      smartsheet.favorites.should.have.property('deleteFavoriteFolder');
      smartsheet.favorites.should.have.property('deleteFavoriteReport');
      smartsheet.favorites.should.have.property('deleteFavoriteTemplate');
      smartsheet.favorites.should.have.property('deleteFavoriteWorkspace');
    });
  });

  describe('#folders', function() {
    it('should have folders object',function(){
      smartsheet.should.have.property('folders');
      Object.keys(smartsheet.folders).should.be.length(5);
    });

    it('should have get methods', function() {
      smartsheet.folders.should.have.property('getFolder');
      smartsheet.folders.should.have.property('listChildFolders');
    });

    it('should have create methods', function() {
      smartsheet.folders.should.have.property('createChildFolder');
    });

    it('should have Sheets update methods', function() {
      smartsheet.folders.should.have.property('updateFolder');
    });

    it('should have delete methods', function() {
      smartsheet.folders.should.have.property('deleteFolders');
    });
  });

  describe('#groups', function() {
    it('should have folders object',function(){
      smartsheet.should.have.property('groups');
      Object.keys(smartsheet.favorites).should.be.length(7);
    });

    it('should have get methods', function() {
      smartsheet.groups.should.have.property('getGroups');
      smartsheet.groups.should.have.property('getGroup');
    });

    it('should have create methods', function() {
      smartsheet.groups.should.have.property('createGroup');
      smartsheet.groups.should.have.property('createGroupMember');
    });

    it('should have update methods', function() {
      smartsheet.groups.should.have.property('updateGroup');
    });

    it('should have delete methods', function() {
      smartsheet.groups.should.have.property('deleteGroup');
      smartsheet.groups.should.have.property('removeGroupMember');
    });
  });

  describe('#home', function() {
    it('should have home object',function(){
      smartsheet.should.have.property('home');
      Object.keys(smartsheet.home).should.be.length(3);
    });

    it('should have get methods', function() {
      smartsheet.home.should.have.property('getHome');
      smartsheet.home.should.have.property('getFolders');
    });

    it('should have create methods', function() {
      smartsheet.home.should.have.property('createHomeFolder');
    });
  });

  describe('#search', function () {
    it('should have search object', function () {
      smartsheet.should.have.property('search');
      Object.keys(smartsheet.search).should.be.length(2);
    });

    it('should have get methods', function () {
      smartsheet.search.should.have.property('searchAll');
      smartsheet.search.should.have.property('searchSheet');
    });
  });

  describe('#server', function () {
    it('should have server object', function () {
      smartsheet.should.have.property('server');
      Object.keys(smartsheet.server).should.be.length(1);
    });

    it('should have get methods', function () {
      smartsheet.server.should.have.property('getInfo');
    });
  });

  describe('#Sheets', function() {
    it('should have Sheets object',function(){
      smartsheet.should.have.property('sheets');
      Object.keys(smartsheet.sheets).should.be.length(47);
    });

    it('should have Sheets get methods', function() {
      smartsheet.sheets.should.have.property('getAttachment');
      smartsheet.sheets.should.have.property('getAttachmentVersion');
      smartsheet.sheets.should.have.property('getAttachments');
      smartsheet.sheets.should.have.property('getCellHistory');
      smartsheet.sheets.should.have.property('getDiscussion');
      smartsheet.sheets.should.have.property('getDiscussionAttachments');
      smartsheet.sheets.should.have.property('getDiscussions');
      smartsheet.sheets.should.have.property('getPublishStatus');
      smartsheet.sheets.should.have.property('getShare');
      smartsheet.sheets.should.have.property('getShares');
      smartsheet.sheets.should.have.property('getSheet');
      smartsheet.sheets.should.have.property('getSheetAsCsv');
      smartsheet.sheets.should.have.property('getSheetAsExcel');
      smartsheet.sheets.should.have.property('getSheetAsPdf');
      smartsheet.sheets.should.have.property('getSheets');
    });

    it('should have Row methods', function () {
      smartsheet.sheets.should.have.property('createRow');
      smartsheet.sheets.should.have.property('createRowAttachments');
      smartsheet.sheets.should.have.property('createRowDiscussions');
      smartsheet.sheets.should.have.property('getRow');
      smartsheet.sheets.should.have.property('getRowAttachments');
      smartsheet.sheets.should.have.property('getRowDiscussions');
    });

    it('should have Column methods', function() {
      smartsheet.sheets.should.have.property('createColumn');
      smartsheet.sheets.should.have.property('getColumn');
      smartsheet.sheets.should.have.property('getColumns');
    });

    it('should have Sheets create methods', function() {
      smartsheet.sheets.should.have.property('createDiscussion');
      smartsheet.sheets.should.have.property('createDiscussionComment');
      smartsheet.sheets.should.have.property('createShare');
      smartsheet.sheets.should.have.property('createSheet');
      smartsheet.sheets.should.have.property('createSheetFromExisting');
      smartsheet.sheets.should.have.property('createSheetInFolder');
      smartsheet.sheets.should.have.property('createSheetInWorkspace');
      smartsheet.sheets.should.have.property('uploadAttachment');
      smartsheet.sheets.should.have.property('sendRow');
      smartsheet.sheets.should.have.property('sendSheetAsEmail');
      smartsheet.sheets.should.have.property('setPublishStatus');
    });

    it('should have Sheets update methods', function() {
      smartsheet.sheets.should.have.property('updateColumn');
      smartsheet.sheets.should.have.property('updateRow');
      smartsheet.sheets.should.have.property('updateShare');
      smartsheet.sheets.should.have.property('updateSheet');
      smartsheet.sheets.should.have.property('uploadNewAttachmentVersion');
    });

    it('should have Sheets delete methods', function() {
      smartsheet.sheets.should.have.property('deleteAttachment');
      smartsheet.sheets.should.have.property('deleteAttachmentVersion');
      smartsheet.sheets.should.have.property('deleteColumn');
      smartsheet.sheets.should.have.property('deleteDiscussion');
      smartsheet.sheets.should.have.property('deleteRow');
      smartsheet.sheets.should.have.property('deleteShare');
      smartsheet.sheets.should.have.property('deleteSheet');
    });
  });

  describe('#templates', function () {
    it('should have templates object', function () {
      smartsheet.should.have.property('templates');
      Object.keys(smartsheet.templates).should.be.length(2);
    });

    it('should have get methods', function () {
      smartsheet.templates.should.have.property('getPublicTemplates');
      smartsheet.templates.should.have.property('getTemplates');
    });
  });

  describe('#users', function () {
    it('should have user object', function () {
      smartsheet.should.have.property('users');
      Object.keys(smartsheet.users).should.be.length(7);
    });

    it('should have get methods', function () {
      smartsheet.users.should.have.property('getAllUsersSheets');
      smartsheet.users.should.have.property('getCurrentUser');
      smartsheet.users.should.have.property('getUsers');
    });

    it('should have create methods', function () {
      smartsheet.users.should.have.property('createUser');
      smartsheet.users.should.have.property('createUserAndSendEmail');
    });

    it('should have update methods', function () {
      smartsheet.users.should.have.property('updateUser');
    });

    it('should have delete methods', function () {
      smartsheet.users.should.have.property('deleteUser');
    });
  });

  describe('#workspaces', function () {
    it('should have workspaces object', function () {
      smartsheet.should.have.property('workspaces');
      Object.keys(smartsheet.workspaces).should.be.length(12);
    });

    it('should have get methods', function () {
      smartsheet.workspaces.should.have.property('getShare');
      smartsheet.workspaces.should.have.property('getShares');
      smartsheet.workspaces.should.have.property('getWorkspace');
      smartsheet.workspaces.should.have.property('getWorkspaceFolders');
      smartsheet.workspaces.should.have.property('getWorkspaces');
    });

    it('should have create methods', function () {
      smartsheet.workspaces.should.have.property('createShare');
      smartsheet.workspaces.should.have.property('createWorkspace');
      smartsheet.workspaces.should.have.property('createWorkspaceFolder');
    });

    it('should have update methods', function () {
      smartsheet.workspaces.should.have.property('updateShare');
      smartsheet.workspaces.should.have.property('updateWorkspace');
    });

    it('should have delete methods', function () {
      smartsheet.workspaces.should.have.property('deleteShare');
      smartsheet.workspaces.should.have.property('deleteWorkspace');
    });
  });


});
