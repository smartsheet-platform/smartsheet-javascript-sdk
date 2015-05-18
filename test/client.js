var sinon = require('sinon');
var should = require('should');

var smartsheet = null;

describe('Client Unit Tests', function() {
  beforeEach(function() {
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
      Object.keys(smartsheet.favorites).should.be.length(17);
    });

    it('should have get methods', function() {
      smartsheet.favorites.should.have.property('listFavorites');
    });

    it('should have create methods', function() {
      smartsheet.favorites.should.have.property('addItemsToFavorites');
      smartsheet.favorites.should.have.property('addSheetToFavorites');
      smartsheet.favorites.should.have.property('addFolderToFavorites');
      smartsheet.favorites.should.have.property('addReportToFavorites');
      smartsheet.favorites.should.have.property('addTemplateToFavorites');
      smartsheet.favorites.should.have.property('addWorkspaceToFavorites');
    });

    it('should have delete methods', function() {
      smartsheet.favorites.should.have.property('removeSheetFromFavorites');
      smartsheet.favorites.should.have.property('removeWorkspaceFromFavorites');
      smartsheet.favorites.should.have.property('removeFolderFromFavorites');
      smartsheet.favorites.should.have.property('removeTemplateFromFavorites');
      smartsheet.favorites.should.have.property('removeReportFromFavorites');
      smartsheet.favorites.should.have.property('removeSheetsFromFavorites');
      smartsheet.favorites.should.have.property('removeWorkspacesFromFavorites');
      smartsheet.favorites.should.have.property('removeFoldersFromFavorites');
      smartsheet.favorites.should.have.property('removeTemplatesFromFavorites');
      smartsheet.favorites.should.have.property('removeReportsFromFavorites');
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
    it('should have groups object',function(){
      smartsheet.should.have.property('groups');
      Object.keys(smartsheet.groups).should.be.length(7);
    });

    it('should have get methods', function() {
      smartsheet.groups.should.have.property('listGroups');
      smartsheet.groups.should.have.property('getGroup');
    });

    it('should have create methods', function() {
      smartsheet.groups.should.have.property('createGroup');
      smartsheet.groups.should.have.property('addGroupMembers');
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
      smartsheet.home.should.have.property('listContents');
      smartsheet.home.should.have.property('listFolders');
    });

    it('should have create methods', function() {
      smartsheet.home.should.have.property('createFolder');
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
      Object.keys(smartsheet.sheets).should.be.length(53);
    });

    it('should have Sheets get methods', function() {
      smartsheet.sheets.should.have.property('getAttachment');
      smartsheet.sheets.should.have.property('getCellHistory');
      smartsheet.sheets.should.have.property('getComment');
      smartsheet.sheets.should.have.property('getDiscussion');
      smartsheet.sheets.should.have.property('getDiscussions');
      smartsheet.sheets.should.have.property('getPublishStatus');
      smartsheet.sheets.should.have.property('getRowAttachments');
      smartsheet.sheets.should.have.property('getRowDiscussions');
      smartsheet.sheets.should.have.property('getShare');
      smartsheet.sheets.should.have.property('getSheet');
      smartsheet.sheets.should.have.property('getSheetAsCSV');
      smartsheet.sheets.should.have.property('getSheetAsExcel');
      smartsheet.sheets.should.have.property('getSheetAsPDF');
      smartsheet.sheets.should.have.property('getSheetVersion');
      smartsheet.sheets.should.have.property('listAttachmentVersions');
      smartsheet.sheets.should.have.property('listAttachments');
      smartsheet.sheets.should.have.property('listDiscussionAttachments');
      smartsheet.sheets.should.have.property('listOrganizationSheets');
      smartsheet.sheets.should.have.property('listShares');
      smartsheet.sheets.should.have.property('listSheets');
    });

    it('should have Row methods', function () {
      smartsheet.sheets.should.have.property('addRow');
      smartsheet.sheets.should.have.property('addRowAttachment');
      smartsheet.sheets.should.have.property('addRows');
      smartsheet.sheets.should.have.property('createRowDiscussion');
      smartsheet.sheets.should.have.property('getRow');
      smartsheet.sheets.should.have.property('getRowAttachments');
      smartsheet.sheets.should.have.property('getRowDiscussions');
      smartsheet.sheets.should.have.property('updateRow');
      smartsheet.sheets.should.have.property('sendRow');
    });

    it('should have Column methods', function() {
      smartsheet.sheets.should.have.property('addColumn');
      smartsheet.sheets.should.have.property('getColumn');
      smartsheet.sheets.should.have.property('getColumns');
      smartsheet.sheets.should.have.property('updateColumn');
    });

    it('should have Sheets create methods', function() {
      smartsheet.sheets.should.have.property('addAttachment');
      smartsheet.sheets.should.have.property('addCommentAttachment');
      smartsheet.sheets.should.have.property('addDiscussionComment');
      smartsheet.sheets.should.have.property('attachNewVersion');
      smartsheet.sheets.should.have.property('createDiscussion');
      smartsheet.sheets.should.have.property('createRowDiscussion');
      smartsheet.sheets.should.have.property('createSheet');
      smartsheet.sheets.should.have.property('createSheetFromExisting');
      smartsheet.sheets.should.have.property('createSheetInFolder');
      smartsheet.sheets.should.have.property('createSheetInWorkspace');
    });

    it('should have Sheets update methods', function() {
      smartsheet.sheets.should.have.property('updateShare');
      smartsheet.sheets.should.have.property('updateSheet');
    });

    it('should have Sheets delete methods', function() {
      smartsheet.sheets.should.have.property('deleteAllAttachmentVersions');
      smartsheet.sheets.should.have.property('deleteAttachment');
      smartsheet.sheets.should.have.property('deleteColumn');
      smartsheet.sheets.should.have.property('deleteComment');
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
      smartsheet.templates.should.have.property('listPublicTemplates');
      smartsheet.templates.should.have.property('listUserCreatedTemplates');
    });
  });

  describe('#users', function () {
    it('should have user object', function () {
      smartsheet.should.have.property('users');
      Object.keys(smartsheet.users).should.be.length(7);
    });

    it('should have get methods', function () {
      smartsheet.users.should.have.property('getCurrentUser');
      smartsheet.users.should.have.property('listAllUsers');
      smartsheet.users.should.have.property('getUser');
    });

    it('should have create methods', function () {
      smartsheet.users.should.have.property('addUser');
      smartsheet.users.should.have.property('addUserAndSendEmail');
    });

    it('should have update methods', function () {
      smartsheet.users.should.have.property('updateUser');
    });

    it('should have delete methods', function () {
      smartsheet.users.should.have.property('removeUser');
    });
  });

  describe('#workspaces', function () {
    it('should have workspaces object', function () {
      smartsheet.should.have.property('workspaces');
      Object.keys(smartsheet.workspaces).should.be.length(12);
    });

    it('should have get methods', function () {
      smartsheet.workspaces.should.have.property('getShare');
      smartsheet.workspaces.should.have.property('listShares');
      smartsheet.workspaces.should.have.property('getWorkspace');
      smartsheet.workspaces.should.have.property('listWorkspaceFolders');
      smartsheet.workspaces.should.have.property('listWorkspaces');
    });

    it('should have create methods', function () {
      smartsheet.workspaces.should.have.property('share');
      smartsheet.workspaces.should.have.property('createWorkspace');
      smartsheet.workspaces.should.have.property('createFolder');
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
