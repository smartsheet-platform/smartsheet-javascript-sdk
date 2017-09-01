var sinon = require('sinon');
var should = require('should');
var httpUtils = require('../lib/utils/httpUtils.js');
var _ = require('underscore');
var smartsheet = require('../index.js').createClient({});

describe('Method Unit Tests', function () {
    it("a test", function () {

    });
    var testGroups = [
        {
            name: 'webhooks',
            methods: [
                { name: 'createWebhook', stub: 'post', options: {}, expectedUrl: "2.0/webhooks/" },
                { name: 'deleteWebhook', stub: 'delete', options: { webhookId: 123 }, expectedUrl: "2.0/webhooks/123" },
                { name: 'updateWebhook', stub: 'put', options: { webhookId: 123 }, expectedUrl: "2.0/webhooks/123" },
                { name: 'getWebhook', stub: 'get', options: { webhookId: 123 }, expectedUrl: "2.0/webhooks/123" },
                { name: 'listWebhooks', stub: 'get', options: {}, expectedUrl: "2.0/webhooks/" },
                { name: 'resetSharedSecret', stub: 'post', options: { webhookId: 123 }, expectedUrl: "2.0/webhooks/123/resetsharedsecret" }
            ]
        },
        {
            name: 'contacts',
            methods: [
                { name: 'getContact', stub: 'get', options: {}, expectedUrl: "2.0/contacts/" },
                { name: 'listContacts', stub: 'get', options: {}, expectedUrl: "2.0/contacts/" }
            ]
        },
        {
            name: 'favorites',
            methods: [
                { name: 'listFavorites', stub: 'get', options: {}, expectedUrl: "2.0/favorites/" },
                { name: 'addItemsToFavorites', stub: 'post', options: {}, expectedUrl: "2.0/favorites/" },
                { name: 'addSheetToFavorites', stub: 'post', options: { objectId: 123 }, expectedUrl: "2.0/favorites/", expectedBody: { objectId: 123, type: 'sheet' } },
                { name: 'addFolderToFavorites', stub: 'post', options: { objectId: 123 }, expectedUrl: "2.0/favorites/", expectedBody: { objectId: 123, type: 'folder' } },
                { name: 'addReportToFavorites', stub: 'post', options: { objectId: 123 }, expectedUrl: "2.0/favorites/", expectedBody: { objectId: 123, type: 'report' } },
                { name: 'addTemplateToFavorites', stub: 'post', options: { objectId: 123 }, expectedUrl: "2.0/favorites/", expectedBody: { objectId: 123, type: 'template' } },
                { name: 'addSightToFavorites', stub: 'post', options: { objectId: 123 }, expectedUrl: "2.0/favorites/", expectedBody: { objectId: 123, type: 'sight' } },
                { name: 'addWorkspaceToFavorites', stub: 'post', options: { objectId: 123 }, expectedUrl: "2.0/favorites/", expectedBody: { objectId: 123, type: 'workspace' } },
                { name: 'removeSheetFromFavorites', stub: 'delete', options: { objectId: 123 }, expectedUrl: "2.0/favorites/sheet/123" },
                { name: 'removeFolderFromFavorites', stub: 'delete', options: { objectId: 123 }, expectedUrl: "2.0/favorites/folder/123" },
                { name: 'removeReportFromFavorites', stub: 'delete', options: { objectId: 123 }, expectedUrl: "2.0/favorites/report/123" },
                { name: 'removeTemplateFromFavorites', stub: 'delete', options: { objectId: 123 }, expectedUrl: "2.0/favorites/template/123" },
                { name: 'removeSightFromFavorites', stub: 'delete', options: { objectId: 123 }, expectedUrl: "2.0/favorites/sight/123" },
                { name: 'removeWorkspaceFromFavorites', stub: 'delete', options: { objectId: 123 }, expectedUrl: "2.0/favorites/workspace/123" },
                { name: 'removeSheetsFromFavorites', stub: 'delete', options: { objectId: 123 }, expectedUrl: "2.0/favorites/sheet/123" },
                { name: 'removeFoldersFromFavorites', stub: 'delete', options: { objectId: 123 }, expectedUrl: "2.0/favorites/folder/123" },
                { name: 'removeReportsFromFavorites', stub: 'delete', options: { objectId: 123 }, expectedUrl: "2.0/favorites/report/123" },
                { name: 'removeTemplatesFromFavorites', stub: 'delete', options: { objectId: 123 }, expectedUrl: "2.0/favorites/template/123" },
                { name: 'removeSightsFromFavorites', stub: 'delete', options: { objectId: 123 }, expectedUrl: "2.0/favorites/sight/123" },
                { name: 'removeWorkspacesFromFavorites', stub: 'delete', options: { objectId: 123 }, expectedUrl: "2.0/favorites/workspace/123" },
            ]
        },
        {
            name: 'folders',
            methods: [
                { name: 'getFolder', stub: 'get', options: {}, expectedUrl: "2.0/folders/" },
                { name: 'listChildFolders', stub: 'get', options: {folderId: 123}, expectedUrl: "2.0/folders/123/folders" },
                { name: 'createChildFolder', stub: 'post', options: {folderId: 123}, expectedUrl: "2.0/folders/123/folders" },
                { name: 'updateFolder', stub: 'put', options: {folderId: 123}, expectedUrl: "2.0/folders/" },
                { name: 'deleteFolder', stub: 'delete', options: {folderId: 123}, expectedUrl: "2.0/folders/" },
                { name: 'moveFolder', stub: 'post', options: {folderId: 123}, expectedUrl: "2.0/folders/123/move" },
                { name: 'copyFolder', stub: 'post', options: {folderId: 123}, expectedUrl: "2.0/folders/123/copy" },
            ]
        },
        {
            name: 'groups',
            methods: [
                { name: 'listGroups', stub: 'get', options: {}, expectedUrl: "2.0/groups/" },
                { name: 'getGroup', stub: 'get', options: {}, expectedUrl: "2.0/groups/" },
                { name: 'createGroup', stub: 'post', options: {}, expectedUrl: "2.0/groups/" },
                { name: 'addGroupMembers', stub: 'post', options: {groupId: 123}, expectedUrl: "2.0/groups/123/members/" },
                { name: 'updateGroup', stub: 'put', options: {}, expectedUrl: "2.0/groups/" },
                { name: 'deleteGroup', stub: 'delete', options: {}, expectedUrl: "2.0/groups/" },
                { name: 'removeGroupMember', stub: 'delete', options: {groupId: 123, userId: 234}, expectedUrl: "2.0/groups/123/members/234" },
            ]
        },
    ];

    _.each(testGroups, function (testGroup) {
        describe('#' + testGroup.name, function () {
            _.each(testGroup.methods, function (method) {
                describe('#' + method.name, function () {
                    var stub;

                    beforeEach(function () {
                        stub = sinon.stub(httpUtils, method.stub);
                    });

                    afterEach(function () {
                        stub.restore();
                    });

                    it('method exists', function () {
                        smartsheet.should.have.property(testGroup.name);
                        smartsheet[testGroup.name].should.have.property(method.name);
                    });

                    it('calls utils once', function () {
                        smartsheet[testGroup.name][method.name](method.options);
                        stub.callCount.should.be.equal(1);
                    });

                    it('url is correct', function () {
                        smartsheet[testGroup.name][method.name](method.options);
                        stub.args[0][0].url.should.be.equal(method.expectedUrl);
                    });

                    if (method.expectedBody) {
                        it('body is correct', function () {
                            smartsheet[testGroup.name][method.name](method.options);
                            should.deepEqual(stub.args[0][0].body, method.expectedBody);
                        });
                    }
                });
            });
        });
    });
});
