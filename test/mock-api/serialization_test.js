var sinon = require("sinon");
var should = require("should");
var assert = require("assert");
var helpers = require("./helpers");

describe("Mock API SDK Tests", function() {
    var client = helpers.setupClient();

    describe("#Serialization", function() {
        var scenarios = [
            {
                "name": "Serialization - Attachment",
                "method": client.sheets.addAttachment,
                "shouldError": false,
                "options": {
                    "sheetId": 1,
                    "body": {
                        "name": "Search Engine",
                        "description": "A popular search engine",
                        "attachmentType": "LINK",
                        "url": "http://www.google.com"
                    }
                }
            },
            {
                "name": "Serialization - Home",
                "method": client.home.listContents,
                "shouldError": false,
                "options": {}
            },
            {
                "name": "Serialization - Groups",
                "method": client.groups.createGroup,
                "shouldError": false,
                "options": {
                    "body": {
                        "name": "mock api test group",
                        "description": "it's a group",
                        "members": [
                            {
                                "email": "john.doe@smartsheet.com"
                            },
                            {
                                "email": "jane.doe@smartsheet.com"
                            }
                        ]
                    }
                }
            },
            {
                "name": "Serialization - Discussion",
                "method": client.sheets.createRowDiscussion,
                "shouldError": false,
                "options": {
                    "sheetId": 1,
                    "rowId": 2,
                    "body": {
                        "comment": {
                            "text": "This is a comment!"
                        }
                    }
                }
            },
            {
                "name": "Serialization - Contact",
                "method": client.contacts.getContact,
                "shouldError": false,
                "options": {
                    "id": "ABC"
                }
            },
            {
                "name": "Serialization - Folder",
                "method": client.home.createFolder,
                "shouldError": false,
                "options": {
                    "body": {
                        "name": "folder"
                    }
                }
            },
            {
                "name": "Serialization - Column",
                "method": client.sheets.addColumn,
                "shouldError": false,
                "options": {
                    "sheetId": 1,
                    "body": {
                        "title": "A Brave New Column",
                        "type": "PICKLIST",
                        "options": [
                            "option1",
                            "option2",
                            "option3"
                        ],
                        "index": 2,
                        "validation": false,
                        "width": 42,
                        "locked": false
                    }
                }
            },
            {
                "name": "Serialization - UserProfile",
                "method": client.users.getCurrentUser,
                "shouldError": false,
                "options": {}
            },
            {
                "name": "Serialization - Workspace",
                "method": client.workspaces.createWorkspace,
                "shouldError": false,
                "options": {
                    "body": {
                        "name": "A Whole New Workspace"
                    }
                }
            },
            {
                "name": "Serialization - User",
                "method": client.users.addUser,
                "shouldError": false,
                "options": {
                    "body": {
                        "email": "john.doe@smartsheet.com",
                        "admin": false,
                        "licensedSheetCreator": true,
                        "firstName": "John",
                        "lastName": "Doe",
                        "groupAdmin": false,
                        "resourceViewer": true
                    }
                }
            },
            {
                "name": "Serialization - Sheet",
                "method": client.sheets.createSheet,
                "shouldError": false,
                "options": {
                    "body": {
                        "name": "The First Sheet",
                        "columns": [
                            {
                                "title": "The First Column",
                                "primary": true,
                                "type": "TEXT_NUMBER"
                            },
                            {
                                "title": "The Second Column",
                                "primary": false,
                                "type": "TEXT_NUMBER",
                                "systemColumnType": "AUTO_NUMBER",
                                "autoNumberFormat": {
                                    "prefix": "{YYYY}-{MM}-{DD}-",
                                    "suffix": "-SUFFIX",
                                    "fill": "000000"
                                }
                            }
                        ]
                    }
                }
            },
            {
                "name": "Serialization - AlternateEmail",
                "method": client.users.addAlternateEmail,
                "shouldError": false,
                "options": {
                    "userId": 1,
                    "body": [
                        {
                            "email": "not.not.john.doe@smartsheet.com"
                        }
                    ]
                }
            },
            {
                "name": "Serialization - Predecessor",
                "method": client.sheets.addRows,
                "shouldError": false,
                "options": {
                    "sheetId": 1,
                    "body": {
                        "cells": [
                            {
                                "columnId": 2,
                                "objectValue": {
                                    "objectType": "PREDECESSOR_LIST",
                                    "predecessors": [
                                        {
                                            "rowId": 3,
                                            "type": "FS",
                                            "lag": {
                                                "objectType": "DURATION",
                                                "negative": false,
                                                "elapsed": false,
                                                "weeks": 1.5,
                                                "days": 2.5,
                                                "hours": 3.5,
                                                "minutes": 4.5,
                                                "seconds": 5.5,
                                                "milliseconds": 6
                                            }
                                        }
                                    ]
                                }
                            }
                        ]
                    },
                    "queryParameters": {
                        "include": "objectValue"
                    }
                }
            },
            {
                "name": "Serialization - IndexResult",
                "method": client.users.listAllUsers,
                "shouldError": false,
                "options": {}
            },
            {
                "name": "Serialization - Image",
                "method": client.sheets.getRow,
                "shouldError": false,
                "options": {
                    "sheetId": 1,
                    "rowId": 2
                }
            },
            {
                "name": "Serialization - Image Urls",
                "method": client.images.listImageUrls,
                "shouldError": false,
                "options": {
                    "body": [
                        {
                            "imageId": "abc",
                            "height": 100,
                            "width": 200
                        }
                    ]
                }
            },
            {
                "name": "Serialization - BulkFailure",
                "method": client.sheets.addRows,
                "shouldError": false,
                "options": {
                    "sheetId": 1,
                    "body": [
                        {
                            "toBottom": true,
                            "cells": [
                                {
                                    "columnId": 2,
                                    "value": "Some Value"
                                }
                            ]
                        },
                        {
                            "toBottom": true,
                            "cells": [
                                {
                                    "columnId": 3,
                                    "value": "Some Value"
                                }
                            ]
                        }
                    ],
                    "queryParameters": {
                        "allowPartialSuccess": "true"
                    }
                }
            },
            {
                "name": "Serialization - Rows",
                "method": client.sheets.addRows,
                "shouldError": false,
                "options": {
                    "sheetId": 1,
                    "body": {
                        "expanded": true,
                        "format": ",,,,,,,,4,,,,,,,",
                        "cells": [
                            {
                                "columnId": 2,
                                "value": "url link",
                                "strict": false,
                                "hyperlink": {
                                    "url": "https://google.com"
                                }
                            },
                            {
                                "columnId": 3,
                                "value": "sheet id link",
                                "strict": false,
                                "hyperlink": {
                                    "sheetId": 4
                                }
                            },
                            {
                                "columnId": 5,
                                "value": "report id link",
                                "strict": false,
                                "hyperlink": {
                                    "reportId": 6
                                }
                            }
                        ],
                        "locked": false
                    }
                }
            },
            {
                "name": "Serialization - Cell Link",
                "method": client.sheets.updateRow,
                "shouldError": false,
                "options": {
                    "sheetId": 1,
                    "body": {
                        "id": 2,
                        "cells": [
                            {
                                "columnId": 3,
                                "value": null,
                                "linkInFromCell": {
                                    "sheetId": 4,
                                    "rowId": 5,
                                    "columnId": 6
                                }
                            }
                        ]
                    }
                }
            },
            {
                "name": "Serialization - Favorite",
                "method": client.favorites.addSheetToFavorites,
                "shouldError": false,
                "options": {
                    "objectId": 1
                }
            },
            {
                "name": "Serialization - Report",
                "method": client.reports.getReport,
                "shouldError": false,
                "options": {
                    "id": 1
                }
            },
            {
                "name": "Serialization - Share",
                "method": client.sheets.share,
                "shouldError": false,
                "options": {
                    "sheetId": 1,
                    "body": {
                        "email": "john.doe@smartsheet.com",
                        "accessLevel": "VIEWER",
                        "subject": "Check out this sheet",
                        "message": "Let me know what you think. Thanks!",
                        "ccMe": true
                    },
                    "queryParameters": {
                        "sendEmail": "true"
                    }
                }
            },
            {
                "name": "Serialization - Send via Email",
                "method": client.sheets.sendSheetViaEmail,
                "shouldError": false,
                "options": {
                    "sheetId": 1,
                    "body": {
                        "sendTo": [
                            {
                                "email": "john.doe@smartsheet.com"
                            },
                            {
                                "groupId": 2
                            }
                        ],
                        "subject": "Some subject",
                        "message": "Some message",
                        "ccMe": true,
                        "format": "PDF",
                        "formatDetails": {
                            "paperSize": "LETTER"
                        }
                    }
                }
            },
            {
                "name": "Serialization - Row Email",
                "method": client.sheets.sendRows,
                "shouldError": false,
                "options": {
                    "sheetId": 1,
                    "body": {
                        "sendTo": [
                            {
                                "groupId": 2
                            }
                        ],
                        "subject": "Some subject",
                        "message": "Some message",
                        "columnIds": [
                            3
                        ],
                        "includeAttachments": false,
                        "includeDiscussions": true,
                        "layout": "VERTICAL",
                        "rowIds": [
                            4
                        ]
                    }
                }
            },
            {
                "name": "Serialization - Template",
                "method": client.templates.listPublicTemplates,
                "shouldError": false,
                "options": {}
            },
            {
                "name": "Serialization - Update Request",
                "method": client.sheets.createUpdateRequest,
                "shouldError": false,
                "options": {
                    "sheetId": 1,
                    "body": {
                        "sendTo": [
                            {
                                "email": "john.doe@smartsheet.com"
                            }
                        ],
                        "rowIds": [
                            2
                        ],
                        "columnIds": [
                            3
                        ],
                        "includeAttachments": true,
                        "includeDiscussions": false,
                        "subject": "Some subject",
                        "message": "Some message",
                        "ccMe": true,
                        "schedule": {
                            "type": "MONTHLY",
                            "startAt": "2018-03-01T19:00:00Z",
                            "endAt": "2018-06-01T00:00:00Z",
                            "dayOrdinal": "FIRST",
                            "dayDescriptors": [
                                "FRIDAY"
                            ],
                            "repeatEvery": 1
                        }
                    }
                }
            },
            {
                "name": "Serialization - Sent Update Requests",
                "method": client.sheets.getSentUpdateRequest,
                "shouldError": false,
                "options": {
                    "sheetId": 1,
                    "sentUpdateRequestId": 2
                }
            },
            {
                "name": "Serialization - Sheet Settings",
                "method": client.sheets.updateSheet,
                "shouldError": false,
                "options": {
                    "id": 1,
                    "body": {
                        "userSettings": {
                            "criticalPathEnabled": true,
                            "displaySummaryTasks": true
                        },
                        "projectSettings": {
                            "workingDays": [
                                "MONDAY",
                                "TUESDAY"
                            ],
                            "nonWorkingDays": [
                                "2018-04-04",
                                "2018-05-05",
                                "2018-06-06"
                            ],
                            "lengthOfDay": 23.5
                        }
                    }
                }
            },
            {
                "name": "Serialization - Container Destination",
                "method": client.folders.copyFolder,
                "shouldError": false,
                "options": {
                    "folderId": 1,
                    "body": {
                        "destinationType": "home",
                        "destinationId": null,
                        "newName": "Copy of Some Folder"
                    }
                }
            },
            {
                "name": "Serialization - Cross Sheet Reference",
                "method": client.sheets.createCrossSheetReference,
                "shouldError": false,
                "options": {
                    "sheetId": 1,
                    "body": {
                        "name": "Some Cross Sheet Reference",
                        "sourceSheetId": 2,
                        "startRowId": 3,
                        "endRowId": 4,
                        "startColumnId": 5,
                        "endColumnId": 6
                    }
                }
            }
        ];

        helpers.defineMockApiTests(scenarios);
    });
});
