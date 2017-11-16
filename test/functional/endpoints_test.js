var sinon = require('sinon');
var should = require('should');
var requestor = require('../../lib/utils/httpRequestor.js').create({});
var constants = require('../../lib/utils/constants.js');
var _ = require('underscore');
var smartsheet = require('../../index.js').createClient({accessToken: "token", requestor: requestor});

describe('Method Unit Tests', function () {
    var testGroups = [
        {
            name: 'contacts',
            methods: [
                { name: 'getContact', stub: 'get', options: {}, expectedRequest: {url: "contacts/" }},
                { name: 'listContacts', stub: 'get', options: undefined, expectedRequest: {url: "contacts/" }},
            ]
        },
        {
            name: 'favorites',
            methods: [
                { name: 'listFavorites', stub: 'get', options: undefined, expectedRequest: {url: "favorites/" }},
                { name: 'addItemsToFavorites', stub: 'post', options: {}, expectedRequest: {url: "favorites/" }},
                { name: 'addSheetToFavorites', stub: 'post', options: { objectId: 123 }, expectedRequest: {url: "favorites/", body: { objectId: 123, type: 'sheet' } }},
                { name: 'addFolderToFavorites', stub: 'post', options: { objectId: 123 }, expectedRequest: {url: "favorites/", body: { objectId: 123, type: 'folder' } }},
                { name: 'addReportToFavorites', stub: 'post', options: { objectId: 123 }, expectedRequest: {url: "favorites/", body: { objectId: 123, type: 'report' } }},
                { name: 'addTemplateToFavorites', stub: 'post', options: { objectId: 123 }, expectedRequest: {url: "favorites/", body: { objectId: 123, type: 'template' } }},
                { name: 'addSightToFavorites', stub: 'post', options: { objectId: 123 }, expectedRequest: {url: "favorites/", body: { objectId: 123, type: 'sight' } }},
                { name: 'addWorkspaceToFavorites', stub: 'post', options: { objectId: 123 }, expectedRequest: {url: "favorites/", body: { objectId: 123, type: 'workspace' } }},
                { name: 'removeSheetFromFavorites', stub: 'delete', options: { objectId: 123 }, expectedRequest: {url: "favorites/sheet/123" }},
                { name: 'removeFolderFromFavorites', stub: 'delete', options: { objectId: 123 }, expectedRequest: {url: "favorites/folder/123" }},
                { name: 'removeReportFromFavorites', stub: 'delete', options: { objectId: 123 }, expectedRequest: {url: "favorites/report/123" }},
                { name: 'removeTemplateFromFavorites', stub: 'delete', options: { objectId: 123 }, expectedRequest: {url: "favorites/template/123" }},
                { name: 'removeSightFromFavorites', stub: 'delete', options: { objectId: 123 }, expectedRequest: {url: "favorites/sight/123" }},
                { name: 'removeWorkspaceFromFavorites', stub: 'delete', options: { objectId: 123 }, expectedRequest: {url: "favorites/workspace/123" }},
                { name: 'removeSheetsFromFavorites', stub: 'delete', options: { queryParameters: {objectIds: [123, 234] }}, expectedRequest: {url: "favorites/sheet/", queryParameters: {objectIds: '123,234'}}},
                { name: 'removeFoldersFromFavorites', stub: 'delete', options: { queryParameters: {objectIds: [123, 234] }}, expectedRequest: {url: "favorites/folder/", queryParameters: {objectIds: '123,234'} }},
                { name: 'removeReportsFromFavorites', stub: 'delete', options: { queryParameters: {objectIds: [123, 234] }}, expectedRequest: {url: "favorites/report/", queryParameters: {objectIds: '123,234'} }},
                { name: 'removeTemplatesFromFavorites', stub: 'delete', options: { queryParameters: {objectIds: [123, 234] }}, expectedRequest: {url: "favorites/template/", queryParameters: {objectIds: '123,234'} }},
                { name: 'removeSightsFromFavorites', stub: 'delete', options: { queryParameters: {objectIds: [123, 234] }}, expectedRequest: {url: "favorites/sight/", queryParameters: {objectIds: '123,234'} }},
                { name: 'removeWorkspacesFromFavorites', stub: 'delete', options: { queryParameters: {objectIds: [123, 234] }}, expectedRequest: {url: "favorites/workspace/", queryParameters: {objectIds: '123,234'} }},
                { name: 'removeSheetsFromFavorites', stub: 'delete', options: { queryParameters: {objectIds: '123,234'} }, expectedRequest: {url: "favorites/sheet/", queryParameters: {objectIds: '123,234'} }},
                { name: 'removeFoldersFromFavorites', stub: 'delete', options: { queryParameters: {objectIds: '123,234'} }, expectedRequest: {url: "favorites/folder/", queryParameters: {objectIds: '123,234'} }},
                { name: 'removeReportsFromFavorites', stub: 'delete', options: { queryParameters: {objectIds: '123,234'} }, expectedRequest: {url: "favorites/report/", queryParameters: {objectIds: '123,234'} }},
                { name: 'removeTemplatesFromFavorites', stub: 'delete', options: { queryParameters: {objectIds: '123,234'} }, expectedRequest: {url: "favorites/template/", queryParameters: {objectIds: '123,234'} }},
                { name: 'removeSightsFromFavorites', stub: 'delete', options: { queryParameters: {objectIds: '123,234'} }, expectedRequest: {url: "favorites/sight/", queryParameters: {objectIds: '123,234'} }},
                { name: 'removeWorkspacesFromFavorites', stub: 'delete', options: { queryParameters: {objectIds: '123,234'} }, expectedRequest: {url: "favorites/workspace/", queryParameters: {objectIds: '123,234'} }},
            ]
        },
        {
            name: 'folders',
            methods: [
                { name: 'getFolder', stub: 'get', options: {}, expectedRequest: {url: "folders/" }},
                { name: 'listChildFolders', stub: 'get', options: {folderId: 123}, expectedRequest: {url: "folders/123/folders" }},
                { name: 'createChildFolder', stub: 'post', options: {folderId: 123}, expectedRequest: {url: "folders/123/folders" }},
                { name: 'updateFolder', stub: 'put', options: {folderId: 123}, expectedRequest: {url: "folders/" }},
                { name: 'deleteFolder', stub: 'delete', options: {folderId: 123}, expectedRequest: {url: "folders/" }},
                { name: 'moveFolder', stub: 'post', options: {folderId: 123}, expectedRequest: {url: "folders/123/move" }},
                { name: 'copyFolder', stub: 'post', options: {folderId: 123}, expectedRequest: {url: "folders/123/copy" }},
            ]
        },
        {
            name: 'groups',
            methods: [
                { name: 'getGroup', stub: 'get', options: {}, expectedRequest: {url: "groups/" }},
                { name: 'listGroups', stub: 'get', options: undefined, expectedRequest: {url: "groups/" }},
                { name: 'createGroup', stub: 'post', options: {}, expectedRequest: {url: "groups/" }},
                { name: 'addGroupMembers', stub: 'post', options: {groupId: 123}, expectedRequest: {url: "groups/123/members/" }},
                { name: 'updateGroup', stub: 'put', options: {}, expectedRequest: {url: "groups/" }},
                { name: 'deleteGroup', stub: 'delete', options: {}, expectedRequest: {url: "groups/" }},
                { name: 'removeGroupMember', stub: 'delete', options: {groupId: 123, userId: 234}, expectedRequest: {url: "groups/123/members/234" }},
            ]
        },
        {
            name: 'home',
            methods: [
                { name: 'listContents', stub: 'get', options: undefined, expectedRequest: {url: "home/" }},
                { name: 'listFolders', stub: 'get', options: undefined, expectedRequest: {url: "home/folders" }},
                { name: 'createFolder', stub: 'post', options: {}, expectedRequest: {url: "home/folders" }},
            ]
        },
        {
            name: 'images',
            methods: [
                { name: 'listImageUrls', stub: 'post', options: {}, expectedRequest: {url: "imageurls/" }},
            ]
        },
        {
            name: 'reports',
            methods: [
                { name: 'getReport', stub: 'get', options: {}, expectedRequest: {url: "reports/" }},
                { name: 'listReports', stub: 'get', options: undefined, expectedRequest: {url: "reports/"}},
                { name: 'sendReportViaEmail', stub: 'post', options: {reportId: 123}, expectedRequest: {url: "reports/123/emails" }},
                { name: 'getReportAsExcel', stub: 'get', options: {}, expectedRequest: {url: "reports/", accept: constants.acceptHeaders.vndMsExcel, encoding:null }},
                { name: 'getReportAsCSV', stub: 'get', options: {}, expectedRequest: {url: "reports/", accept: constants.acceptHeaders.textCsv }},
                { name: 'getReportPublishStatus', stub: 'get', options: {reportId: 123}, expectedRequest: {url: "reports/123/publish" }},
                { name: 'setReportPublishStatus', stub: 'put', options: {reportId: 123}, expectedRequest: {url: "reports/123/publish" }},
            ]
        },
        {
            name: 'search',
            methods: [
                { name: 'searchAll', stub: 'get', options: {query: "query"}, expectedRequest: {url: "search/", queryParameters: {query: "query"}}},
                { name: 'searchSheet', stub: 'get', options: {sheetId: 123}, expectedRequest: {url: "search/sheets/123" }},
            ]
        },
        {
            name: 'server',
            methods: [
                { name: 'getInfo', stub: 'get', options: undefined, expectedRequest: {url: "serverinfo/"}},
            ]
        },
        {
            name: 'sheets',
            methods: [
                { name: 'sendSheetViaEmail', stub: 'post', options: {sheetId: 123}, expectedRequest: {url: "sheets/123/emails"}},
                { name: 'getPublishStatus', stub: 'get', options: {sheetId: 123}, expectedRequest: {url: "sheets/123/publish"}},
                { name: 'setPublishStatus', stub: 'put', options: {sheetId: 123}, expectedRequest: {url: "sheets/123/publish"}},
                { name: 'updateSheet', stub: 'put', options: {}, expectedRequest: {url: "sheets/"}},
                { name: 'deleteSheet', stub: 'delete', options: {}, expectedRequest: {url: "sheets/"}},
                { name: 'moveSheet', stub: 'post', options: {sheetId: 123}, expectedRequest: {url: "sheets/123/move"}},
                // attachments
                { name: 'listAttachments', stub: 'get', options: {sheetId: 123}, expectedRequest: {url: "sheets/123/attachments/"}},
                { name: 'listAttachmentVersions', stub: 'get', options: {sheetId: 123, attachmentId: 234}, expectedRequest: {url: "sheets/123/attachments/234/versions"}},
                { name: 'addUrlAttachment', stub: 'post', options: {sheetId: 123}, expectedRequest: {url: "sheets/123/attachments/"}},
                { name: 'addAttachment', stub: 'post', options: {sheetId: 123}, expectedRequest: {url: "sheets/123/attachments/"}},
                { name: 'addFileAttachment', stub: 'postFile', options: {sheetId: 123}, expectedRequest: {url: "sheets/123/attachments/"}},
                { name: 'attachNewVersion', stub: 'postFile', options: {sheetId: 123, attachmentId: 234}, expectedRequest: {url: "sheets/123/attachments/234/versions"}},
                { name: 'deleteAttachment', stub: 'delete', options: {sheetId: 123}, expectedRequest: {url: "sheets/123/attachments/"}},
                { name: 'deleteAllAttachmentVersions', stub: 'delete', options: {sheetId: 123, attachmentId: 234}, expectedRequest: {url: "sheets/123/attachments/234/versions"}},
                // columns
                { name: 'getColumns', stub: 'get', options: {sheetId: 123}, expectedRequest: {url: "sheets/123/columns/"}},
                { name: 'getColumn', stub: 'get', options: {sheetId: 123, columnId: 234}, expectedRequest: {url: "sheets/123/columns/234"}},
                { name: 'addColumn', stub: 'post', options: {sheetId: 123}, expectedRequest: {url: "sheets/123/columns/"}},
                { name: 'updateColumn', stub: 'put', options: {sheetId: 123, columnId: 234}, expectedRequest: {url: "sheets/123/columns/234"}},
                { name: 'deleteColumn', stub: 'delete', options: {sheetId: 123, columnId: 234}, expectedRequest: {url: "sheets/123/columns/234"}},
                // comments
                { name: 'getComment', stub: 'get', options: {sheetId: 123, commentId: 234}, expectedRequest: {url: "sheets/123/comments/234"}},
                { name: 'deleteComment', stub: 'delete', options: {sheetId: 123, commentId: 234}, expectedRequest: {url: "sheets/123/comments/234"}},
                { name: 'addCommentUrlAttachment', stub: 'post', options: {sheetId: 123, commentId: 234}, expectedRequest: {url: "sheets/123/comments/234/attachments"}},
                { name: 'addCommentAttachment', stub: 'post', options: {sheetId: 123, commentId: 234}, expectedRequest: {url: "sheets/123/comments/234/attachments"}},
                { name: 'addCommentFileAttachment', stub: 'postFile', options: {sheetId: 123, commentId: 234}, expectedRequest: {url: "sheets/123/comments/234/attachments"}},
                { name: 'editComment', stub: 'put', options: {sheetId: 123, commentId: 234}, expectedRequest: {url: "sheets/123/comments/234"}},
                // create
                { name: 'createSheet', stub: 'post', options: {}, expectedRequest: {url: "sheets/"}},
                { name: 'createSheetFromExisting', stub: 'post', options: {}, expectedRequest: {url: "sheets/"}},
                { name: 'createSheetFromExisting', stub: 'post', options: {folderId: 123}, expectedRequest: {url: "folders/123/sheets"}},
                { name: 'createSheetFromExisting', stub: 'post', options: {workspaceId: 123}, expectedRequest: {url: "workspaces/123/sheets"}},
                { name: 'createSheetInFolder', stub: 'post', options: {folderId: 123}, expectedRequest: {url: "folders/123/sheets"}},
                { name: 'createSheetInWorkspace', stub: 'post', options: {workspaceId: 123}, expectedRequest: {url: "workspaces/123/sheets"}},
                { name: 'copySheet', stub: 'post', options: {sheetId: 123}, expectedRequest: {url: "sheets/123/copy"}},
                // discussions
                { name: 'getDiscussions', stub: 'get', options: {sheetId:123}, expectedRequest: {url: "sheets/123/discussions/"}},
                { name: 'getDiscussion', stub: 'get', options: {sheetId:123, discussionId: 234}, expectedRequest: {url: "sheets/123/discussions/234"}},
                { name: 'listDiscussionAttachments', stub: 'get', options: {sheetId:123, discussionId: 234}, expectedRequest: {url: "sheets/123/discussions/234/attachments"}},
                { name: 'createDiscussion', stub: 'post', options: {sheetId:123}, expectedRequest: {url: "sheets/123/discussions/"}},
                { name: 'addDiscussionComment', stub: 'post', options: {sheetId:123, discussionId: 234}, expectedRequest: {url: "sheets/123/discussions/234/comments"}},
                { name: 'deleteDiscussion', stub: 'delete', options: {sheetId:123, discussionId: 234}, expectedRequest: {url: "sheets/123/discussions/234"}},
                // get
                { name: 'getSheet', stub: 'get', options: {}, expectedRequest: {url: "sheets/"}},
                { name: 'listSheets', stub: 'get', options: undefined, expectedRequest: {url: "sheets/"}},
                { name: 'getSheetAsCSV', stub: 'get', options: {}, expectedRequest: {url: "sheets/", accept: constants.acceptHeaders.textCsv}},
                { name: 'getSheetAsExcel', stub: 'get', options: {}, expectedRequest: {url: "sheets/", accept: constants.acceptHeaders.vndMsExcel, encoding:null}},
                { name: 'getSheetAsPDF', stub: 'get', options: {}, expectedRequest: {url: "sheets/", accept: constants.acceptHeaders.applicationPdf, encoding:null}},
                { name: 'getSheetVersion', stub: 'get', options: {sheetId: 123}, expectedRequest: {url: "sheets/123/version"}},
                { name: 'listOrganizationSheets', stub: 'get', options: undefined, expectedRequest: {url: "users/sheets"}},
                // rows
                { name: 'getRow', stub: 'get', options: {sheetId: 123, rowId: 234}, expectedRequest: {url: "sheets/123/rows/234"}},
                { name: 'getRowAttachments', stub: 'get', options: {sheetId: 123, rowId: 234}, expectedRequest: {url: "sheets/123/rows/234/attachments"}},
                { name: 'getRowDiscussions', stub: 'get', options: {sheetId: 123, rowId: 234}, expectedRequest: {url: "sheets/123/rows/234/discussions"}},
                { name: 'getCellHistory', stub: 'get', options: {sheetId: 123, rowId: 234, columnId: 345}, expectedRequest: {url: "sheets/123/rows/234/columns/345/history"}},
                { name: 'copyRowToAnotherSheet', stub: 'post', options: {sheetId: 123, rowId: 234}, expectedRequest: {url: "sheets/123/rows/234/copy"}},
                { name: 'moveRowToAnotherSheet', stub: 'post', options: {sheetId: 123, rowId: 234}, expectedRequest: {url: "sheets/123/rows/234/move"}},
                { name: 'addRow', stub: 'post', options: {sheetId: 123}, expectedRequest: {url: "sheets/123/rows/"}},
                { name: 'addRows', stub: 'post', options: {sheetId: 123}, expectedRequest: {url: "sheets/123/rows/"}},
                { name: 'addRowUrlAttachment', stub: 'post', options: {sheetId: 123, rowId: 234}, expectedRequest: {url: "sheets/123/rows/234/attachments"}},
                { name: 'addRowAttachment', stub: 'post', options: {sheetId: 123, rowId: 234}, expectedRequest: {url: "sheets/123/rows/234/attachments"}},
                { name: 'addRowFileAttachment', stub: 'postFile', options: {sheetId: 123, rowId: 234}, expectedRequest: {url: "sheets/123/rows/234/attachments"}},
                { name: 'createRowDiscussion', stub: 'post', options: {sheetId: 123, rowId: 234}, expectedRequest: {url: "sheets/123/rows/234/discussions"}},
                { name: 'sendRows', stub: 'post', options: {sheetId: 123}, expectedRequest: {url: "sheets/123/rows/emails"}},
                { name: 'deleteRow', stub: 'delete', options: {sheetId: 123, rowId: 234}, expectedRequest: {url: "sheets/123/rows?ids=234"}},
                { name: 'deleteRows', stub: 'delete', options: {sheetId: 123, queryParameters: {ids: [234, 456]}}, expectedRequest: {url: "sheets/123/rows", queryParameters: {ids: '234,456'}}},
                { name: 'deleteRows', stub: 'delete', options: {sheetId: 123, queryParameters: {ids: '234,456'}}, expectedRequest: {url: "sheets/123/rows", queryParameters: {ids: '234,456'}}},
                { name: 'updateRow', stub: 'put', options: {sheetId: 123, rowId: 234}, expectedRequest: {url: "sheets/123/rows/234"}},
                { name: 'addImageToCell', stub: 'postFile', options: {sheetId: 123, rowId: 234, columnId: 345}, expectedRequest: {url: "sheets/123/rows/234/columns/345/cellimages"}},
                // send update requests
                { name: 'createUpdateRequest', stub: 'post', options: {sheetId: 123}, expectedRequest: {url: "sheets/123/updaterequests/"}},
                { name: 'deleteUpdateRequest', stub: 'delete', options: {sheetId: 123, updateRequestId: 234}, expectedRequest: {url: "sheets/123/updaterequests/234"}},
                { name: 'getUpdateRequest', stub: 'get', options: {sheetId: 123, updateRequestId: 234}, expectedRequest: {url: "sheets/123/updaterequests/234"}},
                { name: 'getAllUpdateRequests', stub: 'get', options: {sheetId: 123}, expectedRequest: {url: "sheets/123/updaterequests/"}},
                { name: 'changeUpdateRequest', stub: 'put', options: {sheetId: 123, updateRequestId: 234}, expectedRequest: {url: "sheets/123/updaterequests/234"}},
                // update requests
                { name: 'deleteSentUpdateRequest', stub: 'delete', options: {sheetId: 123, sentUpdateRequestId: 234}, expectedRequest: {url: "sheets/123/sentupdaterequests/234"}},
                { name: 'getSentUpdateRequest', stub: 'get', options: {sheetId: 123, sentUpdateRequestId: 234}, expectedRequest: {url: "sheets/123/sentupdaterequests/234"}},
                { name: 'getAllSentUpdateRequests', stub: 'get', options: {sheetId: 123}, expectedRequest: {url: "sheets/123/sentupdaterequests/"}},
                // shares
                { name: 'getShare', stub: 'get', options: {sheetId: 123, shareId: 234}, expectedRequest: {url: "sheets/123/shares/234"}},
                { name: 'listShares', stub: 'get', options: {sheetId: 123}, expectedRequest: {url: "sheets/123/shares/"}},
                { name: 'share', stub: 'post', options: {sheetId: 123}, expectedRequest: {url: "sheets/123/shares/"}},
                { name: 'deleteShare', stub: 'delete', options: {sheetId: 123, shareId: 234}, expectedRequest: {url: "sheets/123/shares/234"}},
                { name: 'updateShare', stub: 'put', options: {sheetId: 123, shareId: 234}, expectedRequest: {url: "sheets/123/shares/234"}},
            ]
        },
        {
            name: 'sights',
            methods: [
                { name: 'listSights', stub: 'get', options: undefined, expectedRequest: {url: "sights/"}},
                { name: 'getSight', stub: 'get', options: {sightId:123}, expectedRequest: {url: "sights/123"}},
                { name: 'deleteSight', stub: 'delete', options: {sightId:123}, expectedRequest: {url: "sights/123"}},
                { name: 'updateSight', stub: 'put', options: {sightId:123}, expectedRequest: {url: "sights/123"}},
                { name: 'copySight', stub: 'post', options: {sightId:123}, expectedRequest: {url: "sights/123/copy"}},
                { name: 'moveSight', stub: 'post', options: {sightId:123}, expectedRequest: {url: "sights/123/move"}},
                { name: 'getSightPublishStatus', stub: 'get', options: {sightId:123}, expectedRequest: {url: "sights/123/publish"}},
                { name: 'setSightPublishStatus', stub: 'put', options: {sightId:123}, expectedRequest: {url: "sights/123/publish"}},
            ]
        },
        {
            name: 'templates',
            methods: [
                { name: 'listUserCreatedTemplates', stub: 'get', options: undefined, expectedRequest: {url: "templates/"}},
                { name: 'listPublicTemplates', stub: 'get', options: undefined, expectedRequest: {url: "templates/public"}},
            ]
        },
        {
            name: 'tokens',
            methods: [
                { name: 'getAccessToken', stub: 'post', options: {}, expectedRequest: {url: "token", queryParameters: {'grant_type': 'authorization_code'}}},
                { name: 'refreshAccessToken', stub: 'post', options: {}, expectedRequest: {url: "token", queryParameters: {'grant_type': 'refresh_token'}}},
                { name: 'revokeAccessToken', stub: 'delete', options: {}, expectedRequest: {url: "token", accessToken: "token"}},
            ]
        },
        {
            name: 'users',
            methods: [
                { name: 'getUser', stub: 'get', options: {}, expectedRequest: {url: "users/"}},
                { name: 'listAllUsers', stub: 'get', options: undefined, expectedRequest: {url: "users/"}},
                { name: 'getCurrentUser', stub: 'get', options: {}, expectedRequest: {url: "users/me"}},
                { name: 'addUser', stub: 'post', options: {}, expectedRequest: {url: "users/"}},
                { name: 'addUserAndSendEmail', stub: 'post', options: {}, expectedRequest: {url: "users/", queryParameters:{sendEmail:true}}},
                { name: 'updateUser', stub: 'put', options: {}, expectedRequest: {url: "users/"}},
                { name: 'removeUser', stub: 'delete', options: {}, expectedRequest: {url: "users/"}},
                // alternate emails
                { name: 'addAlternateEmail', stub: 'post', options: {userId: 123}, expectedRequest: {url: "users/123/alternateemails/"}},
                { name: 'getAlternateEmail', stub: 'get', options: {userId: 123, alternateEmailId: 234}, expectedRequest: {url: "users/123/alternateemails/234"}},
                { name: 'listAlternateEmails', stub: 'get', options: {userId: 123}, expectedRequest: {url: "users/123/alternateemails/"}},
                { name: 'makeAlternateEmailPrimary', stub: 'post', options: {userId: 123, alternateEmailId: 234}, expectedRequest: {url: "users/123/alternateemails/234/makeprimary"}},
                { name: 'deleteAlternateEmail', stub: 'delete', options: {userId: 123, alternateEmailId: 234}, expectedRequest: {url: "users/123/alternateemails/234"}},
            ]
        },
        {
            name: 'webhooks',
            methods: [
                { name: 'createWebhook', stub: 'post', options: {}, expectedRequest: {url: "webhooks/" }},
                { name: 'deleteWebhook', stub: 'delete', options: { webhookId: 123 }, expectedRequest: {url: "webhooks/123" }},
                { name: 'updateWebhook', stub: 'put', options: { webhookId: 123 }, expectedRequest: {url: "webhooks/123" }},
                { name: 'getWebhook', stub: 'get', options: { webhookId: 123 }, expectedRequest: {url: "webhooks/123" }},
                { name: 'listWebhooks', stub: 'get', options: undefined, expectedRequest: {url: "webhooks/" }},
                { name: 'resetSharedSecret', stub: 'post', options: { webhookId: 123 }, expectedRequest: {url: "webhooks/123/resetsharedsecret" }},
            ]
        },
        {
            name: 'workspaces',
            methods: [
                { name: 'listWorkspaces', stub: 'get', options: undefined, expectedRequest: {url: "workspaces/"}},
                { name: 'getWorkspace', stub: 'get', options: {workspaceId: 123}, expectedRequest: {url: "workspaces/123"}},
                { name: 'listWorkspaceFolders', stub: 'get', options: {workspaceId: 123}, expectedRequest: {url: "workspaces/123/folders"}},
                { name: 'createWorkspace', stub: 'post', options: {}, expectedRequest: {url: "workspaces/"}},
                { name: 'createFolder', stub: 'post', options: {workspaceId: 123}, expectedRequest: {url: "workspaces/123/folders"}},
                { name: 'deleteWorkspace', stub: 'delete', options: {workspaceId: 123}, expectedRequest: {url: "workspaces/123"}},
                { name: 'updateWorkspace', stub: 'put', options: {workspaceId: 123}, expectedRequest: {url: "workspaces/123"}},
                { name: 'copyWorkspace', stub: 'post', options: {workspaceId: 123}, expectedRequest: {url: "workspaces/123/copy"}},
            ]
        },
    ];

    _.each(testGroups, function (testGroup) {
        describe('#' + testGroup.name, function () {
            _.each(testGroup.methods, function (method) {
                describe('#' + method.name, function () {
                    var stub;

                    beforeEach(function () {
                        stub = sinon.stub(requestor, method.stub);
                    });

                    afterEach(function () {
                        stub.restore();
                    });

                    it('method exists', function () {
                        smartsheet.should.have.property(testGroup.name);
                        smartsheet[testGroup.name].should.have.property(method.name);
                    });

                    it('calls requestor once', function () {
                        smartsheet[testGroup.name][method.name](method.options);
                        stub.callCount.should.be.equal(1);
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
