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
                { name: 'createWebhook', stub: 'post', options: {}, expectedRequest: {url: "2.0/webhooks/" }},
                { name: 'deleteWebhook', stub: 'delete', options: { webhookId: 123 }, expectedRequest: {url: "2.0/webhooks/123" }},
                { name: 'updateWebhook', stub: 'put', options: { webhookId: 123 }, expectedRequest: {url: "2.0/webhooks/123" }},
                { name: 'getWebhook', stub: 'get', options: { webhookId: 123 }, expectedRequest: {url: "2.0/webhooks/123" }},
                { name: 'listWebhooks', stub: 'get', options: {}, expectedRequest: {url: "2.0/webhooks/" }},
                { name: 'resetSharedSecret', stub: 'post', options: { webhookId: 123 }, expectedRequest: {url: "2.0/webhooks/123/resetsharedsecret" }},
            ]
        },
        {
            name: 'contacts',
            methods: [
                { name: 'getContact', stub: 'get', options: {}, expectedRequest: {url: "2.0/contacts/" }},
                { name: 'listContacts', stub: 'get', options: {}, expectedRequest: {url: "2.0/contacts/" }},
            ]
        },
        {
            name: 'favorites',
            methods: [
                { name: 'listFavorites', stub: 'get', options: {}, expectedRequest: {url: "2.0/favorites/" }},
                { name: 'addItemsToFavorites', stub: 'post', options: {}, expectedRequest: {url: "2.0/favorites/" }},
                { name: 'addSheetToFavorites', stub: 'post', options: { objectId: 123 }, expectedRequest: {url: "2.0/favorites/", body: { objectId: 123, type: 'sheet' } }},
                { name: 'addFolderToFavorites', stub: 'post', options: { objectId: 123 }, expectedRequest: {url: "2.0/favorites/", body: { objectId: 123, type: 'folder' } }},
                { name: 'addReportToFavorites', stub: 'post', options: { objectId: 123 }, expectedRequest: {url: "2.0/favorites/", body: { objectId: 123, type: 'report' } }},
                { name: 'addTemplateToFavorites', stub: 'post', options: { objectId: 123 }, expectedRequest: {url: "2.0/favorites/", body: { objectId: 123, type: 'template' } }},
                { name: 'addSightToFavorites', stub: 'post', options: { objectId: 123 }, expectedRequest: {url: "2.0/favorites/", body: { objectId: 123, type: 'sight' } }},
                { name: 'addWorkspaceToFavorites', stub: 'post', options: { objectId: 123 }, expectedRequest: {url: "2.0/favorites/", body: { objectId: 123, type: 'workspace' } }},
                { name: 'removeSheetFromFavorites', stub: 'delete', options: { objectId: 123 }, expectedRequest: {url: "2.0/favorites/sheet/123" }},
                { name: 'removeFolderFromFavorites', stub: 'delete', options: { objectId: 123 }, expectedRequest: {url: "2.0/favorites/folder/123" }},
                { name: 'removeReportFromFavorites', stub: 'delete', options: { objectId: 123 }, expectedRequest: {url: "2.0/favorites/report/123" }},
                { name: 'removeTemplateFromFavorites', stub: 'delete', options: { objectId: 123 }, expectedRequest: {url: "2.0/favorites/template/123" }},
                { name: 'removeSightFromFavorites', stub: 'delete', options: { objectId: 123 }, expectedRequest: {url: "2.0/favorites/sight/123" }},
                { name: 'removeWorkspaceFromFavorites', stub: 'delete', options: { objectId: 123 }, expectedRequest: {url: "2.0/favorites/workspace/123" }},
                { name: 'removeSheetsFromFavorites', stub: 'delete', options: { objectId: 123 }, expectedRequest: {url: "2.0/favorites/sheet/123" }},
                { name: 'removeFoldersFromFavorites', stub: 'delete', options: { objectId: 123 }, expectedRequest: {url: "2.0/favorites/folder/123" }},
                { name: 'removeReportsFromFavorites', stub: 'delete', options: { objectId: 123 }, expectedRequest: {url: "2.0/favorites/report/123" }},
                { name: 'removeTemplatesFromFavorites', stub: 'delete', options: { objectId: 123 }, expectedRequest: {url: "2.0/favorites/template/123" }},
                { name: 'removeSightsFromFavorites', stub: 'delete', options: { objectId: 123 }, expectedRequest: {url: "2.0/favorites/sight/123" }},
                { name: 'removeWorkspacesFromFavorites', stub: 'delete', options: { objectId: 123 }, expectedRequest: {url: "2.0/favorites/workspace/123" }},
            ]
        },
        {
            name: 'folders',
            methods: [
                { name: 'getFolder', stub: 'get', options: {}, expectedRequest: {url: "2.0/folders/" }},
                { name: 'listChildFolders', stub: 'get', options: {folderId: 123}, expectedRequest: {url: "2.0/folders/123/folders" }},
                { name: 'createChildFolder', stub: 'post', options: {folderId: 123}, expectedRequest: {url: "2.0/folders/123/folders" }},
                { name: 'updateFolder', stub: 'put', options: {folderId: 123}, expectedRequest: {url: "2.0/folders/" }},
                { name: 'deleteFolder', stub: 'delete', options: {folderId: 123}, expectedRequest: {url: "2.0/folders/" }},
                { name: 'moveFolder', stub: 'post', options: {folderId: 123}, expectedRequest: {url: "2.0/folders/123/move" }},
                { name: 'copyFolder', stub: 'post', options: {folderId: 123}, expectedRequest: {url: "2.0/folders/123/copy" }},
            ]
        },
        {
            name: 'groups',
            methods: [
                { name: 'listGroups', stub: 'get', options: {}, expectedRequest: {url: "2.0/groups/" }},
                { name: 'getGroup', stub: 'get', options: {}, expectedRequest: {url: "2.0/groups/" }},
                { name: 'createGroup', stub: 'post', options: {}, expectedRequest: {url: "2.0/groups/" }},
                { name: 'addGroupMembers', stub: 'post', options: {groupId: 123}, expectedRequest: {url: "2.0/groups/123/members/" }},
                { name: 'updateGroup', stub: 'put', options: {}, expectedRequest: {url: "2.0/groups/" }},
                { name: 'deleteGroup', stub: 'delete', options: {}, expectedRequest: {url: "2.0/groups/" }},
                { name: 'removeGroupMember', stub: 'delete', options: {groupId: 123, userId: 234}, expectedRequest: {url: "2.0/groups/123/members/234" }},
            ]
        },
        {
            name: 'home',
            methods: [
                { name: 'listContents', stub: 'get', options: {}, expectedRequest: {url: "2.0/home/" }},
                { name: 'listFolders', stub: 'get', options: {}, expectedRequest: {url: "2.0/home/folders" }},
                { name: 'createFolder', stub: 'post', options: {}, expectedRequest: {url: "2.0/home/folders" }},
            ]
        },
        {
            name: 'images',
            methods: [
                { name: 'listImageUrls', stub: 'post', options: {}, expectedRequest: {url: "2.0/imageurls/" }},
            ]
        },
        {
            name: 'reports',
            methods: [
                { name: 'listReports', stub: 'get', options: {}, expectedRequest: {url: "2.0/reports/"}},
                { name: 'getReport', stub: 'get', options: {}, expectedRequest: {url: "2.0/reports/" }},
                { name: 'sendReportViaEmail', stub: 'post', options: {reportId: 123}, expectedRequest: {url: "2.0/reports/123/emails" }},
                { name: 'getReportAsExcel', stub: 'get', options: {}, expectedRequest: {url: "2.0/reports/", accept: "application/vnd.ms-excel" }},
                { name: 'getReportAsCSV', stub: 'get', options: {}, expectedRequest: {url: "2.0/reports/", accept: "text/csv" }},
                { name: 'getReportPublishStatus', stub: 'get', options: {reportId: 123}, expectedRequest: {url: "2.0/reports/123/publish" }},
                { name: 'setReportPublishStatus', stub: 'put', options: {reportId: 123}, expectedRequest: {url: "2.0/reports/123/publish" }},
            ]
        },
        {
            name: 'search',
            methods: [
                { name: 'searchAll', stub: 'get', options: {query: "query"}, expectedRequest: {url: "2.0/search/", queryParameters: {query: "query"}}},
                { name: 'searchSheet', stub: 'get', options: {sheetId: 123}, expectedRequest: {url: "2.0/search/sheets/123" }},
            ]
        },
        {
            name: 'server',
            methods: [
                { name: 'getInfo', stub: 'get', options: {}, expectedRequest: {url: "2.0/serverinfo/"}},
            ]
        },
        {
            name: 'sheets',
            methods: [
                // attachments
                { name: 'listAttachments', stub: 'get', options: {sheetId: 123}, expectedRequest: {url: "2.0/sheets/123/attachments/"}},
                { name: 'listAttachmentVersions', stub: 'get', options: {sheetId: 123, attachmentId: 234}, expectedRequest: {url: "2.0/sheets/123/attachments/234/versions"}},
                { name: 'addUrlAttachment', stub: 'post', options: {sheetId: 123}, expectedRequest: {url: "2.0/sheets/123/attachments/"}},
                { name: 'addFileAttachment', stub: 'postFile', options: {sheetId: 123}, expectedRequest: {url: "2.0/sheets/123/attachments/"}},
                { name: 'attachNewVersion', stub: 'postFile', options: {sheetId: 123, attachmentId: 234}, expectedRequest: {url: "2.0/sheets/123/attachments/234/versions"}},
                { name: 'deleteAttachment', stub: 'delete', options: {sheetId: 123}, expectedRequest: {url: "2.0/sheets/123/attachments/"}},
                { name: 'deleteAllAttachmentVersions', stub: 'delete', options: {sheetId: 123, attachmentId: 234}, expectedRequest: {url: "2.0/sheets/123/attachments/234/versions"}},
                // columns
                { name: 'getColumns', stub: 'get', options: {sheetId: 123}, expectedRequest: {url: "2.0/sheets/123/columns/"}},
                { name: 'getColumn', stub: 'get', options: {sheetId: 123, columnId: 234}, expectedRequest: {url: "2.0/sheets/123/columns/234"}},
                { name: 'addColumn', stub: 'post', options: {sheetId: 123}, expectedRequest: {url: "2.0/sheets/123/columns/"}},
                { name: 'updateColumn', stub: 'put', options: {sheetId: 123, columnId: 234}, expectedRequest: {url: "2.0/sheets/123/columns/234"}},
                { name: 'deleteColumn', stub: 'delete', options: {sheetId: 123, columnId: 234}, expectedRequest: {url: "2.0/sheets/123/columns/234"}},
            ]
        },
        {
            name: 'sights',
            methods: [
                { name: 'listSights', stub: 'get', options: {}, expectedRequest: {url: "2.0/sights/"}},
                { name: 'getSight', stub: 'get', options: {sightId:123}, expectedRequest: {url: "2.0/sights/123"}},
                { name: 'deleteSight', stub: 'delete', options: {sightId:123}, expectedRequest: {url: "2.0/sights/123"}},
                { name: 'updateSight', stub: 'put', options: {sightId:123}, expectedRequest: {url: "2.0/sights/123"}},
                { name: 'copySight', stub: 'post', options: {sightId:123}, expectedRequest: {url: "2.0/sights/123/copy"}},
                { name: 'moveSight', stub: 'post', options: {sightId:123}, expectedRequest: {url: "2.0/sights/123/move"}},
                { name: 'getSightPublishStatus', stub: 'get', options: {sightId:123}, expectedRequest: {url: "2.0/sights/123/publish"}},
                { name: 'setSightPublishStatus', stub: 'put', options: {sightId:123}, expectedRequest: {url: "2.0/sights/123/publish"}},
            ]
        },
        {
            name: 'templates',
            methods: [
                { name: 'listUserCreatedTemplates', stub: 'get', options: {}, expectedRequest: {url: "2.0/templates/"}},
                { name: 'listPublicTemplates', stub: 'get', options: {}, expectedRequest: {url: "2.0/templates/public"}},
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

                    it('request is correct', function () {
                        smartsheet[testGroup.name][method.name](method.options);
                        stub.args[0][0].should.have.properties(method.expectedRequest);
                    });

                    it('multiple requests are correct', function () {
                        smartsheet[testGroup.name][method.name](method.options);
                        smartsheet[testGroup.name][method.name](method.options);
                        stub.args[0][0].should.have.properties(method.expectedRequest);
                    });
                });
            });
        });
    });
});
