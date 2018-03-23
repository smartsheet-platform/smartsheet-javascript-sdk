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
            }
        ];

        helpers.defineMockApiTests(scenarios);
    });
});
