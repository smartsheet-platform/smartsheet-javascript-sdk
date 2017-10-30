var sinon = require('sinon');
var should = require('should');

var smartsheet = null;

describe('Client Unit Tests', function() {
  beforeEach(function() {
    client = require('../../');
    smartsheet = client.createClient({accessToken:'1234'});
  });

  afterEach(function() {
    smartsheet = null;
  });

  describe('#Constants', function() {
    it('should have Constants object', function() {
      Object.keys(smartsheet.constants).should.be.length(7);
      smartsheet.should.have.property('constants');
      smartsheet.constants.should.have.property('maxRetryDurationMillis');
      smartsheet.constants.should.have.property('accessLevel');
      smartsheet.constants.should.have.property('accessScope');
      smartsheet.constants.should.have.property('types');
      smartsheet.constants.should.have.property('paperSize');
      smartsheet.constants.should.have.property('acceptHeaders');
      smartsheet.constants.should.have.property('sheet');
    });
  });

  describe('#Contacts', function() {
    it('should have Contacts object', function() {
      smartsheet.should.have.property('contacts');
      Object.keys(smartsheet.contacts).should.be.length(2);
    });

    it('should have Contacts GET methods', function() {
      smartsheet.contacts.should.have.property('getContact');
      smartsheet.contacts.should.have.property('listContacts');
    });
  });

  describe('#Favorites', function() {
    it('should have Favorites object',function(){
      smartsheet.should.have.property('favorites');
      Object.keys(smartsheet.favorites).should.be.length(20);
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
      smartsheet.favorites.should.have.property('addSightToFavorites');
      smartsheet.favorites.should.have.property('addWorkspaceToFavorites');
    });

    it('should have delete methods', function() {
      smartsheet.favorites.should.have.property('removeSheetFromFavorites');
      smartsheet.favorites.should.have.property('removeSightFromFavorites');
      smartsheet.favorites.should.have.property('removeWorkspaceFromFavorites');
      smartsheet.favorites.should.have.property('removeFolderFromFavorites');
      smartsheet.favorites.should.have.property('removeTemplateFromFavorites');
      smartsheet.favorites.should.have.property('removeReportFromFavorites');
      smartsheet.favorites.should.have.property('removeSheetsFromFavorites');
      smartsheet.favorites.should.have.property('removeSightsFromFavorites');
      smartsheet.favorites.should.have.property('removeWorkspacesFromFavorites');
      smartsheet.favorites.should.have.property('removeFoldersFromFavorites');
      smartsheet.favorites.should.have.property('removeTemplatesFromFavorites');
      smartsheet.favorites.should.have.property('removeReportsFromFavorites');
    });
  });

  describe('#folders', function() {
    it('should have folders object',function(){
      smartsheet.should.have.property('folders');
      Object.keys(smartsheet.folders).should.be.length(7);
    });

    it('should have get methods', function() {
      smartsheet.folders.should.have.property('getFolder');
      smartsheet.folders.should.have.property('listChildFolders');
    });

    it('should have create methods', function() {
      smartsheet.folders.should.have.property('createChildFolder');
      smartsheet.folders.should.have.property('copyFolder');
    });

    it('should have Sheets update methods', function() {
      smartsheet.folders.should.have.property('updateFolder');
      smartsheet.folders.should.have.property('moveFolder');
    });

    it('should have delete methods', function() {
      smartsheet.folders.should.have.property('deleteFolder');
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

  describe('#images', function() {
    it('should have image object', function(){
      smartsheet.should.have.property('images');
      Object.keys(smartsheet.images).should.be.length(1);
    });

    it('should have get methods', function() {
      smartsheet.images.should.have.property('listImageUrls');
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

  describe('#reports', function() {
    it('should have reports object', function() {
      smartsheet.should.have.property('reports');
      Object.keys(smartsheet.reports).should.be.length(12);
    });

    it('should have get methods', function () {
      smartsheet.reports.should.have.property('listReports');
      smartsheet.reports.should.have.property('getReport');
      smartsheet.reports.should.have.property('getReportAsExcel');
      smartsheet.reports.should.have.property('getReportAsCSV');
      smartsheet.reports.should.have.property('getReportPublishStatus');
    });

    it('should have update methods', function () {
      smartsheet.reports.should.have.property('setReportPublishStatus');
      smartsheet.reports.should.have.property('sendReportViaEmail');
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
      Object.keys(smartsheet.sheets).should.be.length(74);
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
      smartsheet.sheets.should.have.property('addImageToCell');
      smartsheet.sheets.should.have.property('addRow');
      smartsheet.sheets.should.have.property('addRows');
      smartsheet.sheets.should.have.property('addRowFileAttachment');
      smartsheet.sheets.should.have.property('addRowUrlAttachment');
      smartsheet.sheets.should.have.property('addRowAttachment');      
      smartsheet.sheets.should.have.property('createRowDiscussion');
      smartsheet.sheets.should.have.property('getRow');
      smartsheet.sheets.should.have.property('getRowAttachments');
      smartsheet.sheets.should.have.property('getRowDiscussions');
      smartsheet.sheets.should.have.property('updateRow');
      smartsheet.sheets.should.have.property('sendRows');
    });

    it('should have Column methods', function() {
      smartsheet.sheets.should.have.property('addColumn');
      smartsheet.sheets.should.have.property('getColumn');
      smartsheet.sheets.should.have.property('getColumns');
      smartsheet.sheets.should.have.property('updateColumn');
    });

    it('should have Sheets create methods', function() {
      smartsheet.sheets.should.have.property('addCommentFileAttachment');
      smartsheet.sheets.should.have.property('addCommentUrlAttachment');
      smartsheet.sheets.should.have.property('addCommentAttachment');
      smartsheet.sheets.should.have.property('addDiscussionComment');
      smartsheet.sheets.should.have.property('addFileAttachment');
      smartsheet.sheets.should.have.property('addUrlAttachment');
      smartsheet.sheets.should.have.property('addAttachment');
      smartsheet.sheets.should.have.property('attachNewVersion');
      smartsheet.sheets.should.have.property('createDiscussion');
      smartsheet.sheets.should.have.property('createRowDiscussion');
      smartsheet.sheets.should.have.property('createSheet');
      smartsheet.sheets.should.have.property('createSheetFromExisting');
      smartsheet.sheets.should.have.property('createSheetInFolder');
      smartsheet.sheets.should.have.property('createSheetInWorkspace');
      smartsheet.sheets.should.have.property('copySheet');
      smartsheet.sheets.should.have.property('moveSheet');
    });

    it('should have Sheets update methods', function() {
      smartsheet.sheets.should.have.property('updateShare');
      smartsheet.sheets.should.have.property('updateSheet');
      smartsheet.sheets.should.have.property('editComment');
    });

    it('should have Sheets delete methods', function() {
      smartsheet.sheets.should.have.property('deleteAllAttachmentVersions');
      smartsheet.sheets.should.have.property('deleteAttachment');
      smartsheet.sheets.should.have.property('deleteColumn');
      smartsheet.sheets.should.have.property('deleteComment');
      smartsheet.sheets.should.have.property('deleteDiscussion');
      smartsheet.sheets.should.have.property('deleteRow');
      smartsheet.sheets.should.have.property('deleteRows');
      smartsheet.sheets.should.have.property('deleteShare');
      smartsheet.sheets.should.have.property('deleteSheet');
    });

    it('should have update request methods', function() {
      smartsheet.sheets.should.have.property('createUpdateRequest');
      smartsheet.sheets.should.have.property('deleteUpdateRequest');
      smartsheet.sheets.should.have.property('getUpdateRequest');
      smartsheet.sheets.should.have.property('getAllUpdateRequests');
      smartsheet.sheets.should.have.property('changeUpdateRequest');
      smartsheet.sheets.should.have.property('deleteSentUpdateRequest');
      smartsheet.sheets.should.have.property('getSentUpdateRequest');
      smartsheet.sheets.should.have.property('getAllSentUpdateRequests');
    });
  });
  describe('#Sights', function() {
    it('should have Sights object',function(){
      smartsheet.should.have.property('sights');
      Object.keys(smartsheet.sights).should.be.length(13);
    });

    it('should have Sights get methods', function() {
      smartsheet.sights.should.have.property('getSight');
      smartsheet.sights.should.have.property('listSights');
      smartsheet.sights.should.have.property('getShare');
      smartsheet.sights.should.have.property('listShares');
      smartsheet.sights.should.have.property('getSightPublishStatus');
    });

    it('should have Sights update methods', function() {
      smartsheet.sights.should.have.property('setSightPublishStatus');
      smartsheet.sights.should.have.property('moveSight');
      smartsheet.sights.should.have.property('updateSight');
    });

    it('should have Sight create methods', function() {
      smartsheet.sights.should.have.property('copySight');
    });

    it('should have Sights delete methods', function() {
      smartsheet.sights.should.have.property('deleteSight');
      smartsheet.sights.should.have.property('deleteShare');
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

  describe('#tokens', function() {
    it('should have a tokens object', function () {
      smartsheet.should.have.property('tokens');
      Object.keys(smartsheet.tokens).should.be.length(3);
    });
    
    it('should have get methods', function () {
      smartsheet.tokens.should.have.property('getAccessToken');
      smartsheet.tokens.should.have.property('refreshAccessToken');
    });

    it('should have delete methods', function () {
      smartsheet.tokens.should.have.property('revokeAccessToken');
    });
  });

  describe('#users', function () {
    it('should have user object', function () {
      smartsheet.should.have.property('users');
      Object.keys(smartsheet.users).should.be.length(12);
    });

    it('should have get methods', function () {
      smartsheet.users.should.have.property('getCurrentUser');
      smartsheet.users.should.have.property('listAllUsers');
      smartsheet.users.should.have.property('getUser');
      smartsheet.users.should.have.property('getAlternateEmail');
      smartsheet.users.should.have.property('listAlternateEmails');
    });

    it('should have create methods', function () {
      smartsheet.users.should.have.property('addUser');
      smartsheet.users.should.have.property('addUserAndSendEmail');
      smartsheet.users.should.have.property('addAlternateEmail');
    });

    it('should have update methods', function () {
      smartsheet.users.should.have.property('updateUser');
      smartsheet.users.should.have.property('makeAlternateEmailPrimary');
    });

    it('should have delete methods', function () {
      smartsheet.users.should.have.property('removeUser');
      smartsheet.users.should.have.property('deleteAlternateEmail');
    });
  });

  describe('#webhooks', function () {
    it('should have webhook object', function () {
      smartsheet.should.have.property('webhooks');
      Object.keys(smartsheet.webhooks).should.be.length(6);
    });

    it('should have get methods', function () {
      smartsheet.webhooks.should.have.property('getWebhook');
      smartsheet.webhooks.should.have.property('listWebhooks');
    });

    it('should have post methods', function () {
      smartsheet.webhooks.should.have.property('createWebhook');
      smartsheet.webhooks.should.have.property('resetSharedSecret');
    });

    it('should have put methods', function () {
      smartsheet.webhooks.should.have.property('updateWebhook');
    });

    it('should have delete methods', function () {
      smartsheet.webhooks.should.have.property('deleteWebhook');
    });
  });

  describe('#workspaces', function () {
    it('should have workspaces object', function () {
      smartsheet.should.have.property('workspaces');
      Object.keys(smartsheet.workspaces).should.be.length(13);
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
      smartsheet.workspaces.should.have.property('copyWorkspace');
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
