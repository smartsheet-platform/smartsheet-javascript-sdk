# Smartsheet SDK for JavaScript

This is an SDK to simplify connecting to the [Smartsheet API](http://www.smartsheet.com/developers/api-documentation) from Node.js applications.
See below for code examples that show how to call various methods using this SDK.
For information about SDK installation, documentation, and support, see the [README](https://github.com/smartsheet-platform/smartsheet-javascript-sdk).

## Example Usage

All APIs are exposed inside the root module that is created using the following:

    var client = require('smartsheet');
    var smartsheet = client.createClient({accessToken:'ACCESSTOKEN'});

The **smartsheet** variable now contains access to all of the APIs [documented here](http://www.smartsheet.com/developers/api-documentation).
The following code examples show how to call various methods using this SDK. 

### Table of Contents

- [Favorite API methods](#favorite-api-methods)
    - [listFavorites](#listfavorites)
    - [addItemsToFavorites](#additemstofavorites)
    - [addSheetToFavorites](#addsheettofavorites)
    - [addFolderToFavorites](#addfoldertofavorites)
    - [addReportToFavorites](#addreporttofavorites)
    - [addTemplateToFavorites](#addtemplatetofavorites)
    - [addWorkspaceToFavorites](#addworkspacetofavorites)
    - [removeSheetFromFavorites](#removesheetfromfavorites)
    - [removeFolderFromFavorites](#removefolderfromfavorites)
    - [removeReportFromFavorites](#removereportfromfavorites)
    - [removeTemplateFromFavorites](#removetemplatefromfavorites)
    - [removeWorkspaceFromFavorites](#removeworkspacefromfavorites)
    - [removeSheetsFromFavorites](#removesheetsfromfavorites)
    - [removeFoldersFromFavorites](#removefoldersfromfavorites)
    - [removeReportsFromFavorites](#removereportsfromfavorites)
    - [removeTemplatesFromFavorites](#removetemplatesfromfavorites)
    - [removeWorkspacesFromFavorites](#removeworkspacesfromfavorites)
- [Folder API methods](#folder-api-methods)
    - [getFolder](#getfolder)
    - [listChildFolders](#listchildfolders)
    - [createChildFolder](#createchildfolder)
    - [updateFolder](#updatefolder)
    - [deleteFolder](#deletefolder)
- [Group API methods](#group-api-methods)
    - [listGroups](#listgroups)
    - [getGroup](#getgroup)
    - [createGroup](#creategroup)
    - [addGroupMembers](#addgroupmembers)
    - [updateGroup](#updategroup)
    - [deleteGroup](#deletegroup)
    - [removeGroupMember](#removegroupmember)
- [Home API methods](#home-api-methods)
    - [listContents](#listcontents)
    - [listFolders](#listfolders)
    - [createFolder](#createfolder)
- [Report API methods](#report-api-methods)
    - [listReports](#listreports)
    - [getReport](#getreport)
    - [sendReportViaEmail](#sendreportviaemail)
    - [getReportAsExcel](#getreportasexcel)
    - [getReportAsCSV](#getreportascsv)
    - [getShare](#getshare)
    - [listShares](#listshares)
    - [share](#share)
    - [deleteShare](#deleteshare)
    - [updateShare](#updateshare)
- [Search API methods](#search-api-methods)
    - [searchAll](#searchall)
    - [searchSheet](#searchsheet)
- [Server API methods](#server-api-methods)
    - [getInfo](#getinfo)
- [Sheet API methods](#sheet-api-methods)
    - [sendSheetViaEmail](#sendsheetviaemail)
    - [getPublishStatus](#getpublishstatus)
    - [setPublishStatus](#setpublishstatus)
    - [updateSheet](#updatesheet)
    - [deleteSheet](#deletesheet)
    - [getAttachment](#getattachment)
    - [listAttachments](#listattachments)
    - [listAttachmentVersions](#listattachmentversions)
    - [addAttachment](#addattachment)
    - [attachNewVersion](#attachnewversion)
    - [deleteAttachment](#deleteattachment)
    - [deleteAllAttachmentVersions](#deleteallattachmentversions)
    - [getColumns](#getcolumns)
    - [getColumn](#getcolumn)
    - [addColumn](#addcolumn)
    - [deleteColumn](#deletecolumn)
    - [updateColumn](#updatecolumn)
    - [getComment](#getcomment)
    - [deleteComment](#deletecomment)
    - [addCommentAttachment](#addcommentattachment)
    - [createSheet](#createsheet)
    - [createSheetFromExisting](#createsheetfromexisting)
    - [createSheetInFolder](#createsheetinfolder)
    - [createSheetInWorkspace](#createsheetinworkspace)
    - [getDiscussions](#getdiscussions)
    - [getDiscussion](#getdiscussion)
    - [listDiscussionAttachments](#listdiscussionattachments)
    - [createDiscussion](#creatediscussion)
    - [addDiscussionComment](#adddiscussioncomment)
    - [deleteDiscussion](#deletediscussion)
    - [getSheet](#getsheet)
    - [listSheets](#listsheets)
    - [getSheetAsCSV](#getsheetascsv)
    - [getSheetAsExcel](#getsheetasexcel)
    - [getSheetAsPDF](#getsheetaspdf)
    - [getSheetVersion](#getsheetversion)
    - [listOrganizationSheets](#listorganizationsheets)
    - [getRow](#getrow)
    - [getRowAttachments](#getrowattachments)
    - [getRowDiscussions](#getrowdiscussions)
    - [getCellHistory](#getcellhistory)
    - [copyRowToAnotherSheet](#copyrowtoanothersheet)
    - [moveRowToAnotherSheet](#moverowtoanothersheet)
    - [addRow](#addrow)
    - [addRows](#addrows)
    - [addRowAttachment](#addrowattachment)
    - [createRowDiscussion](#createrowdiscussion)
    - [sendRow](#sendrow)
    - [deleteRow](#deleterow)
    - [updateRow](#updaterow)
    - [getShare](#getshare-1)
    - [listShares](#listshares-1)
    - [share](#share-1)
    - [deleteShare](#deleteshare-1)
    - [updateShare](#updateshare-1)
- [Template API methods](#template-api-methods)
    - [listUserCreatedTemplates](#listusercreatedtemplates)
    - [listPublicTemplates](#listpublictemplates)
- [User API methods](#user-api-methods)
    - [getUser](#getuser)
    - [listAllUsers](#listallusers)
    - [getCurrentUser](#getcurrentuser)
    - [addUser](#adduser)
    - [addUserAndSendEmail](#adduserandsendemail)
    - [updateUser](#updateuser)
    - [removeUser](#removeuser)
- [Workspace API methods](#workspace-api-methods)
    - [listWorkspaces](#listworkspaces)
    - [getWorkspace](#getworkspace)
    - [listWorkspaceFolders](#listworkspacefolders)
    - [createWorkspace](#createworkspace)
    - [createFolder](#createfolder)
    - [deleteWorkspace](#deleteworkspace)
    - [updateWorkspace](#updateworkspace)
    - [getShare](#getshare-2)
    - [listShares](#listshares-2)
    - [share](#share-2)
    - [deleteShare](#deleteshare-2)
    - [updateShare](#updateshare-2)

### Favorite API methods

#### listFavorites
[back to TOC](#table-of-contents)
##### Example using promises

     smartsheet.favorites.listFavorites({})
     .then(function(data) {
       console.log(data);
     })
     .catch(function(error) {
       console.log(error);
     });

##### Example using callbacks

     smartsheet.favorites.listFavorites({}, function(error, data) {
       if (error) {
         console.log(error);
       }
       console.log(data);
     });

#### addItemsToFavorites
[back to TOC](#table-of-contents)
##### Example using promises

     var options = {
        body: {
         //body of request as specified in the Smartsheet API documentation
        },
        queryParameters: {
         //querystring parameters as specified in the Smartsheet API documentation
        }
     };
     smartsheet.favorites.addItemsToFavorites(options)
     .then(function(data) {
       console.log(data);
     })
     .catch(function(error) {
       console.log(error);
     });

##### Example using callbacks

     var options = {
        body: {
         //body of request as specified in the Smartsheet API documentation
        },
        queryParameters: {
         //querystring parameters as specified in the Smartsheet API documentation
        }
     };
     smartsheet.favorites.addItemsToFavorites(options, function(error, data) {
       if (error) {
         console.log(error);
       }
       console.log(data);
     });

#### addSheetToFavorites
[back to TOC](#table-of-contents)
##### Example using promises

     var options = {
        body: {
         //body of request as specified in the Smartsheet API documentation
        },
        queryParameters: {
         //querystring parameters as specified in the Smartsheet API documentation
        }
     };
     smartsheet.favorites.addSheetToFavorites(options)
     .then(function(data) {
       console.log(data);
     })
     .catch(function(error) {
       console.log(error);
     });

##### Example using callbacks

     var options = {
        body: {
         //body of request as specified in the Smartsheet API documentation
        },
        queryParameters: {
         //querystring parameters as specified in the Smartsheet API documentation
        }
     };
     smartsheet.favorites.addSheetToFavorites(options, function(error, data) {
       if (error) {
         console.log(error);
       }
       console.log(data);
     });

#### addFolderToFavorites
[back to TOC](#table-of-contents)
##### Example using promises

     var options = {
        body: {
         //body of request as specified in the Smartsheet API documentation
        },
        queryParameters: {
         //querystring parameters as specified in the Smartsheet API documentation
        }
     };
     smartsheet.favorites.addFolderToFavorites(options)
     .then(function(data) {
       console.log(data);
     })
     .catch(function(error) {
       console.log(error);
     });

##### Example using callbacks

     var options = {
        body: {
         //body of request as specified in the Smartsheet API documentation
        },
        queryParameters: {
         //querystring parameters as specified in the Smartsheet API documentation
        }
     };
     smartsheet.favorites.addFolderToFavorites(options, function(error, data) {
       if (error) {
         console.log(error);
       }
       console.log(data);
     });

#### addReportToFavorites
[back to TOC](#table-of-contents)
##### Example using promises

     var options = {
        body: {
         //body of request as specified in the Smartsheet API documentation
        },
        queryParameters: {
         //querystring parameters as specified in the Smartsheet API documentation
        }
     };
     smartsheet.favorites.addReportToFavorites(options)
     .then(function(data) {
       console.log(data);
     })
     .catch(function(error) {
       console.log(error);
     });

##### Example using callbacks

     var options = {
        body: {
         //body of request as specified in the Smartsheet API documentation
        },
        queryParameters: {
         //querystring parameters as specified in the Smartsheet API documentation
        }
     };
     smartsheet.favorites.addReportToFavorites(options, function(error, data) {
       if (error) {
         console.log(error);
       }
       console.log(data);
     });

#### addTemplateToFavorites
[back to TOC](#table-of-contents)
##### Example using promises

     var options = {
        body: {
         //body of request as specified in the Smartsheet API documentation
        },
        queryParameters: {
         //querystring parameters as specified in the Smartsheet API documentation
        }
     };
     smartsheet.favorites.addTemplateToFavorites(options)
     .then(function(data) {
       console.log(data);
     })
     .catch(function(error) {
       console.log(error);
     });

##### Example using callbacks

     var options = {
        body: {
         //body of request as specified in the Smartsheet API documentation
        },
        queryParameters: {
         //querystring parameters as specified in the Smartsheet API documentation
        }
     };
     smartsheet.favorites.addTemplateToFavorites(options, function(error, data) {
       if (error) {
         console.log(error);
       }
       console.log(data);
     });

#### addWorkspaceToFavorites
[back to TOC](#table-of-contents)
##### Example using promises

     var options = {
        body: {
         //body of request as specified in the Smartsheet API documentation
        },
        queryParameters: {
         //querystring parameters as specified in the Smartsheet API documentation
        }
     };
     smartsheet.favorites.addWorkspaceToFavorites(options)
     .then(function(data) {
       console.log(data);
     })
     .catch(function(error) {
       console.log(error);
     });

##### Example using callbacks

     var options = {
        body: {
         //body of request as specified in the Smartsheet API documentation
        },
        queryParameters: {
         //querystring parameters as specified in the Smartsheet API documentation
        }
     };
     smartsheet.favorites.addWorkspaceToFavorites(options, function(error, data) {
       if (error) {
         console.log(error);
       }
       console.log(data);
     });

#### removeSheetFromFavorites
[back to TOC](#table-of-contents)
##### Example using promises

     smartsheet.favorites.removeSheetFromFavorites({})
     .then(function(data) {
       console.log(data);
     })
     .catch(function(error) {
       console.log(error);
     });

##### Example using callbacks

     smartsheet.favorites.removeSheetFromFavorites({}, function(error, data) {
       if (error) {
         console.log(error);
       }
       console.log(data);
     });

#### removeFolderFromFavorites
[back to TOC](#table-of-contents)
##### Example using promises

     smartsheet.favorites.removeFolderFromFavorites({})
     .then(function(data) {
       console.log(data);
     })
     .catch(function(error) {
       console.log(error);
     });

##### Example using callbacks

     smartsheet.favorites.removeFolderFromFavorites({}, function(error, data) {
       if (error) {
         console.log(error);
       }
       console.log(data);
     });

#### removeReportFromFavorites
[back to TOC](#table-of-contents)
##### Example using promises

     smartsheet.favorites.removeReportFromFavorites({})
     .then(function(data) {
       console.log(data);
     })
     .catch(function(error) {
       console.log(error);
     });

##### Example using callbacks

     smartsheet.favorites.removeReportFromFavorites({}, function(error, data) {
       if (error) {
         console.log(error);
       }
       console.log(data);
     });

#### removeTemplateFromFavorites
[back to TOC](#table-of-contents)
##### Example using promises

     smartsheet.favorites.removeTemplateFromFavorites({})
     .then(function(data) {
       console.log(data);
     })
     .catch(function(error) {
       console.log(error);
     });

##### Example using callbacks

     smartsheet.favorites.removeTemplateFromFavorites({}, function(error, data) {
       if (error) {
         console.log(error);
       }
       console.log(data);
     });

#### removeWorkspaceFromFavorites
[back to TOC](#table-of-contents)
##### Example using promises

     smartsheet.favorites.removeWorkspaceFromFavorites({})
     .then(function(data) {
       console.log(data);
     })
     .catch(function(error) {
       console.log(error);
     });

##### Example using callbacks

     smartsheet.favorites.removeWorkspaceFromFavorites({}, function(error, data) {
       if (error) {
         console.log(error);
       }
       console.log(data);
     });

#### removeSheetsFromFavorites
[back to TOC](#table-of-contents)
##### Example using promises

     smartsheet.favorites.removeSheetsFromFavorites({})
     .then(function(data) {
       console.log(data);
     })
     .catch(function(error) {
       console.log(error);
     });

##### Example using callbacks

     smartsheet.favorites.removeSheetsFromFavorites({}, function(error, data) {
       if (error) {
         console.log(error);
       }
       console.log(data);
     });

#### removeFoldersFromFavorites
[back to TOC](#table-of-contents)
##### Example using promises

     smartsheet.favorites.removeFoldersFromFavorites({})
     .then(function(data) {
       console.log(data);
     })
     .catch(function(error) {
       console.log(error);
     });

##### Example using callbacks

     smartsheet.favorites.removeFoldersFromFavorites({}, function(error, data) {
       if (error) {
         console.log(error);
       }
       console.log(data);
     });

#### removeReportsFromFavorites
[back to TOC](#table-of-contents)
##### Example using promises

     smartsheet.favorites.removeReportsFromFavorites({})
     .then(function(data) {
       console.log(data);
     })
     .catch(function(error) {
       console.log(error);
     });

##### Example using callbacks

     smartsheet.favorites.removeReportsFromFavorites({}, function(error, data) {
       if (error) {
         console.log(error);
       }
       console.log(data);
     });

#### removeTemplatesFromFavorites
[back to TOC](#table-of-contents)
##### Example using promises

     smartsheet.favorites.removeTemplatesFromFavorites({})
     .then(function(data) {
       console.log(data);
     })
     .catch(function(error) {
       console.log(error);
     });

##### Example using callbacks

     smartsheet.favorites.removeTemplatesFromFavorites({}, function(error, data) {
       if (error) {
         console.log(error);
       }
       console.log(data);
     });

#### removeWorkspacesFromFavorites
[back to TOC](#table-of-contents)
##### Example using promises

     smartsheet.favorites.removeWorkspacesFromFavorites({})
     .then(function(data) {
       console.log(data);
     })
     .catch(function(error) {
       console.log(error);
     });

##### Example using callbacks

     smartsheet.favorites.removeWorkspacesFromFavorites({}, function(error, data) {
       if (error) {
         console.log(error);
       }
       console.log(data);
     });

### Folder API methods

#### getFolder
[back to TOC](#table-of-contents)
##### Example using promises

     smartsheet.folders.getFolder({id: foldersId})
     .then(function(data) {
       console.log(data);
     })
     .catch(function(error) {
       console.log(error);
     });

##### Example using callbacks

     smartsheet.folders.getFolder({id: foldersId}, function(error, data) {
       if (error) {
         console.log(error);
       }
       console.log(data);
     });

#### listChildFolders
[back to TOC](#table-of-contents)
##### Example using promises

     smartsheet.folders.listChildFolders({})
     .then(function(data) {
       console.log(data);
     })
     .catch(function(error) {
       console.log(error);
     });

##### Example using callbacks

     smartsheet.folders.listChildFolders({}, function(error, data) {
       if (error) {
         console.log(error);
       }
       console.log(data);
     });

#### createChildFolder
[back to TOC](#table-of-contents)
##### Example using promises

     var options = {
        body: {
         //body of request as specified in the Smartsheet API documentation
        },
        queryParameters: {
         //querystring parameters as specified in the Smartsheet API documentation
        }
     };
     smartsheet.folders.createChildFolder(options)
     .then(function(data) {
       console.log(data);
     })
     .catch(function(error) {
       console.log(error);
     });

##### Example using callbacks

     var options = {
        body: {
         //body of request as specified in the Smartsheet API documentation
        },
        queryParameters: {
         //querystring parameters as specified in the Smartsheet API documentation
        }
     };
     smartsheet.folders.createChildFolder(options, function(error, data) {
       if (error) {
         console.log(error);
       }
       console.log(data);
     });

#### updateFolder
[back to TOC](#table-of-contents)
##### Example using promises

     var options = {
        id: foldersId,
        body: {
         //body of request as specified in the Smartsheet API documentation
        },
        queryParameters: {
         //querystring parameters as specified in the Smartsheet API documentation
        }
     };
     smartsheet.folders.updateFolder(options)
     .then(function(data) {
       console.log(data);
     })
     .catch(function(error) {
       console.log(error);
     });

##### Example using callbacks

     var options = {
        id: foldersId,
        body: {
         //body of request as specified in the Smartsheet API documentation
        },
        queryParameters: {
         //querystring parameters as specified in the Smartsheet API documentation
        }
     };
     smartsheet.folders.updateFolder(options, function(error, data) {
       if (error) {
         console.log(error);
       }
       console.log(data);
     });

#### deleteFolder
[back to TOC](#table-of-contents)
##### Example using promises

     var options = {
        id: foldersId
     }
     smartsheet.folders.deleteFolder(options)
     .then(function(data) {
       console.log(data);
     })
     .catch(function(error) {
       console.log(error);
     });

##### Example using callbacks

     var options = {
        id: foldersId
     }
     smartsheet.folders.deleteFolder(options, function(error, data) {
       if (error) {
         console.log(error);
       }
       console.log(data);
     });

### Group API methods

#### listGroups
[back to TOC](#table-of-contents)
##### Example using promises

     smartsheet.groups.listGroups({})
     .then(function(data) {
       console.log(data);
     })
     .catch(function(error) {
	   console.log(error);
     });

##### Example using callbacks

     smartsheet.groups.listGroups({}, function(error, data) {
       if (error) {
         console.log(error);
       }
       console.log(data);
     });

#### getGroup
[back to TOC](#table-of-contents)
##### Example using promises

     smartsheet.groups.getGroup({id: groupsId})
     .then(function(data) {
       console.log(data);
     })
     .catch(function(error) {
       console.log(error);
     });

##### Example using callbacks

     smartsheet.groups.getGroup({id: groupsId}, function(error, data) {
       if (error) {
         console.log(error);
       }
       console.log(data);
     });

#### createGroup
[back to TOC](#table-of-contents)
##### Example using promises

     var options = {
        body: {
         //body of request as specified in the Smartsheet API documentation
        },
        queryParameters: {
         //querystring parameters as specified in the Smartsheet API documentation
        }
     };
     smartsheet.groups.createGroup(options)
     .then(function(data) {
       console.log(data);
     })
     .catch(function(error) {
       console.log(error);
     });

##### Example using callbacks

     var options = {
        body: {
         //body of request as specified in the Smartsheet API documentation
        },
        queryParameters: {
         //querystring parameters as specified in the Smartsheet API documentation
        }
     };
     smartsheet.groups.createGroup(options, function(error, data) {
       if (error) {
         console.log(error);
       }
       console.log(data);
     });

#### addGroupMembers
[back to TOC](#table-of-contents)
##### Example using promises

     var options = {
        body: {
         //body of request as specified in the Smartsheet API documentation
        },
        queryParameters: {
         //querystring parameters as specified in the Smartsheet API documentation
        }
     };
     smartsheet.groups.addGroupMembers(options)
     .then(function(data) {
       console.log(data);
     })
     .catch(function(error) {
       console.log(error);
     });

##### Example using callbacks

     var options = {
        body: {
         //body of request as specified in the Smartsheet API documentation
        },
        queryParameters: {
         //querystring parameters as specified in the Smartsheet API documentation
        }
     };
     smartsheet.groups.addGroupMembers(options, function(error, data) {
       if (error) {
         console.log(error);
       }
       console.log(data);
     });

#### updateGroup
[back to TOC](#table-of-contents)
##### Example using promises

     var options = {
        id: groupsId,
        body: {
         //body of request as specified in the Smartsheet API documentation
        },
        queryParameters: {
         //querystring parameters as specified in the Smartsheet API documentation
        }
     };
     smartsheet.groups.updateGroup(options)
     .then(function(data) {
       console.log(data);
     })
     .catch(function(error) {
       console.log(error);
     });

##### Example using callbacks

     var options = {
        id: groupsId,
        body: {
         //body of request as specified in the Smartsheet API documentation
        },
        queryParameters: {
         //querystring parameters as specified in the Smartsheet API documentation
        }
     };
     smartsheet.groups.updateGroup(options, function(error, data) {
       if (error) {
         console.log(error);
       }
       console.log(data);
     });

#### deleteGroup
[back to TOC](#table-of-contents)
##### Example using promises

     var options = {
        id: groupsId
     }
     smartsheet.groups.deleteGroup(options)
     .then(function(data) {
       console.log(data);
     })
     .catch(function(error) {
       console.log(error);
     });

##### Example using callbacks

     var options = {
        id: groupsId
     }
     smartsheet.groups.deleteGroup(options, function(error, data) {
       if (error) {
         console.log(error);
       }
       console.log(data);
     });

#### removeGroupMember
[back to TOC](#table-of-contents)
##### Example using promises

     smartsheet.groups.removeGroupMember({id: groupsId})
     .then(function(data) {
       console.log(data);
     })
     .catch(function(error) {
       console.log(error);
     });

##### Example using callbacks

     smartsheet.groups.removeGroupMember({id: groupsId}, function(error, data) {
       if (error) {
         console.log(error);
       }
       console.log(data);
     });

### Home API methods

#### listContents
[back to TOC](#table-of-contents)
##### Example using promises

     smartsheet.home.listContents({})
     .then(function(data) {
       console.log(data);
     })
     .catch(function(error) {
       console.log(error);
     });

##### Example using callbacks

     smartsheet.home.listContents({}, function(error, data) {
       if (error) {
         console.log(error);
       }
       console.log(data);
     });

#### listFolders
[back to TOC](#table-of-contents)
##### Example using promises

     smartsheet.home.listFolders({})
     .then(function(data) {
       console.log(data);
     })
     .catch(function(error) {
       console.log(error);
     });

##### Example using callbacks

     smartsheet.home.listFolders({}, function(error, data) {
       if (error) {
         console.log(error);
       }
       console.log(data);
     });

#### createFolder
[back to TOC](#table-of-contents)
##### Example using promises

     var options = {
        body: {
         //body of request as specified in the Smartsheet API documentation
        },
        queryParameters: {
         //querystring parameters as specified in the Smartsheet API documentation
        }
     };
     smartsheet.home.createFolder(options)
     .then(function(data) {
       console.log(data);
     })
     .catch(function(error) {
       console.log(error);
     });

##### Example using callbacks

     var options = {
        body: {
         //body of request as specified in the Smartsheet API documentation
        },
        queryParameters: {
         //querystring parameters as specified in the Smartsheet API documentation
        }
     };
     smartsheet.home.createFolder(options, function(error, data) {
       if (error) {
         console.log(error);
       }
       console.log(data);
     });

### Report API methods

#### listReports
[back to TOC](#table-of-contents)
##### Example using promises

     smartsheet.reports.listReports({})
     .then(function(data) {
       console.log(data);
     })
     .catch(function(error) {
       console.log(error);
     });

##### Example using callbacks

     smartsheet.reports.listReports({}, function(error, data) {
       if (error) {
         console.log(error);
       }
       console.log(data);
     });

#### getReport
[back to TOC](#table-of-contents)
##### Example using promises

     smartsheet.reports.getReport({id: reportsId})
     .then(function(data) {
       console.log(data);
     })
     .catch(function(error) {
       console.log(error);
     });

##### Example using callbacks

     smartsheet.reports.getReport({id: reportsId}, function(error, data) {
       if (error) {
         console.log(error);
       }
       console.log(data);
     });

#### sendReportViaEmail
[back to TOC](#table-of-contents)
##### Example using promises

     smartsheet.reports.sendReportViaEmail({id: reportsId})
     .then(function(data) {
       console.log(data);
     })
     .catch(function(error) {
       console.log(error);
     });

##### Example using callbacks

     smartsheet.reports.sendReportViaEmail({id: reportsId}, function(error, data) {
       if (error) {
         console.log(error);
       }
       console.log(data);
     });

#### getReportAsExcel
[back to TOC](#table-of-contents)
##### Example using promises

     smartsheet.reports.getReportAsExcel({id: reportsId})
     .then(function(data) {
       console.log(data);
     })
     .catch(function(error) {
       console.log(error);
     });

##### Example using callbacks

     smartsheet.reports.getReportAsExcel({id: reportsId}, function(error, data) {
       if (error) {
         console.log(error);
       }
       console.log(data);
     });

#### getReportAsCSV
[back to TOC](#table-of-contents)
##### Example using promises

     smartsheet.reports.getReportAsCSV({id: reportsId})
     .then(function(data) {
       console.log(data);
     })
     .catch(function(error) {
       console.log(error);
     });

##### Example using callbacks

     smartsheet.reports.getReportAsCSV({id: reportsId}, function(error, data) {
       if (error) {
         console.log(error);
       }
       console.log(data);
     });

#### getShare
[back to TOC](#table-of-contents)
##### Example using promises

     smartsheet.reports.getShare({id: reportsId})
     .then(function(data) {
       console.log(data);
     })
     .catch(function(error) {
       console.log(error);
     });

##### Example using callbacks

     smartsheet.reports.getShare({id: reportsId}, function(error, data) {
       if (error) {
         console.log(error);
       }
       console.log(data);
     });

#### listShares
[back to TOC](#table-of-contents)
##### Example using promises

     smartsheet.reports.listShares({})
     .then(function(data) {
       console.log(data);
     })
     .catch(function(error) {
       console.log(error);
     });

##### Example using callbacks

     smartsheet.reports.listShares({}, function(error, data) {
       if (error) {
         console.log(error);
       }
       console.log(data);
     });

#### share
[back to TOC](#table-of-contents)
##### Example using promises

     smartsheet.reports.share({id: reportsId})
     .then(function(data) {
       console.log(data);
     })
     .catch(function(error) {
       console.log(error);
     });

##### Example using callbacks

     smartsheet.reports.share({id: reportsId}, function(error, data) {
       if (error) {
         console.log(error);
       }
       console.log(data);
     });

#### deleteShare
[back to TOC](#table-of-contents)
##### Example using promises

     var options = {
        id: reportsId
     }
     smartsheet.reports.deleteShare(options)
     .then(function(data) {
       console.log(data);
     })
     .catch(function(error) {
       console.log(error);
     });

##### Example using callbacks

     var options = {
        id: reportsId
     }
     smartsheet.reports.deleteShare(options, function(error, data) {
       if (error) {
         console.log(error);
       }
       console.log(data);
     });

#### updateShare
[back to TOC](#table-of-contents)
##### Example using promises

     var options = {
        id: reportsId,
        body: {
         //body of request as specified in the Smartsheet API documentation
        },
        queryParameters: {
         //querystring parameters as specified in the Smartsheet API documentation
        }
     };
     smartsheet.reports.updateShare(options)
     .then(function(data) {
       console.log(data);
     })
     .catch(function(error) {
       console.log(error);
     });

##### Example using callbacks

     var options = {
        id: reportsId,
        body: {
         //body of request as specified in the Smartsheet API documentation
        },
        queryParameters: {
         //querystring parameters as specified in the Smartsheet API documentation
        }
     };
     smartsheet.reports.updateShare(options, function(error, data) {
       if (error) {
         console.log(error);
       }
       console.log(data);
     });

### Search API methods

#### searchAll
[back to TOC](#table-of-contents)
##### Example using promises

     smartsheet.search.searchAll({id: searchId})
     .then(function(data) {
       console.log(data);
     })
     .catch(function(error) {
       console.log(error);
     });

##### Example using callbacks

     smartsheet.search.searchAll({id: searchId}, function(error, data) {
       if (error) {
         console.log(error);
       }
       console.log(data);
     });

#### searchSheet
[back to TOC](#table-of-contents)
##### Example using promises

     smartsheet.search.searchSheet({id: searchId})
     .then(function(data) {
       console.log(data);
     })
     .catch(function(error) {
       console.log(error);
     });

##### Example using callbacks

     smartsheet.search.searchSheet({id: searchId}, function(error, data) {
       if (error) {
         console.log(error);
       }
       console.log(data);
     });

### Server API methods

#### getInfo
[back to TOC](#table-of-contents)
##### Example using promises

     smartsheet.server.getInfo({id: serverId})
     .then(function(data) {
       console.log(data);
     })
     .catch(function(error) {
       console.log(error);
     });

##### Example using callbacks

     smartsheet.server.getInfo({id: serverId}, function(error, data) {
       if (error) {
         console.log(error);
       }
       console.log(data);
     });

### Sheet API methods

#### sendSheetViaEmail
[back to TOC](#table-of-contents)
##### Example using promises

     smartsheet.sheets.sendSheetViaEmail({id: sheetsId})
     .then(function(data) {
       console.log(data);
     })
     .catch(function(error) {
       console.log(error);
     });

##### Example using callbacks

     smartsheet.sheets.sendSheetViaEmail({id: sheetsId}, function(error, data) {
       if (error) {
         console.log(error);
       }
       console.log(data);
     });

#### getPublishStatus
[back to TOC](#table-of-contents)
##### Example using promises

     smartsheet.sheets.getPublishStatus({})
     .then(function(data) {
       console.log(data);
     })
     .catch(function(error) {
       console.log(error);
     });

##### Example using callbacks

     smartsheet.sheets.getPublishStatus({}, function(error, data) {
       if (error) {
         console.log(error);
       }
       console.log(data);
     });

#### setPublishStatus
[back to TOC](#table-of-contents)
##### Example using promises

     smartsheet.sheets.setPublishStatus({})
     .then(function(data) {
       console.log(data);
     })
     .catch(function(error) {
       console.log(error);
     });

##### Example using callbacks

     smartsheet.sheets.setPublishStatus({}, function(error, data) {
       if (error) {
         console.log(error);
       }
       console.log(data);
     });

#### updateSheet
[back to TOC](#table-of-contents)
##### Example using promises

     var options = {
        id: sheetsId,
        body: {
         //body of request as specified in the Smartsheet API documentation
        },
        queryParameters: {
         //querystring parameters as specified in the Smartsheet API documentation
        }
     };
     smartsheet.sheets.updateSheet(options)
     .then(function(data) {
       console.log(data);
     })
     .catch(function(error) {
       console.log(error);
     });

##### Example using callbacks

     var options = {
        id: sheetsId,
        body: {
         //body of request as specified in the Smartsheet API documentation
        },
        queryParameters: {
         //querystring parameters as specified in the Smartsheet API documentation
        }
     };
     smartsheet.sheets.updateSheet(options, function(error, data) {
       if (error) {
         console.log(error);
       }
       console.log(data);
     });

#### deleteSheet
[back to TOC](#table-of-contents)
##### Example using promises

     var options = {
        id: sheetsId
     }
     smartsheet.sheets.deleteSheet(options)
     .then(function(data) {
       console.log(data);
     })
     .catch(function(error) {
       console.log(error);
     });

##### Example using callbacks

     var options = {
        id: sheetsId
     }
     smartsheet.sheets.deleteSheet(options, function(error, data) {
       if (error) {
         console.log(error);
       }
       console.log(data);
     });

#### getAttachment
[back to TOC](#table-of-contents)
##### Example using promises

     smartsheet.sheets.getAttachment({id: sheetsId})
     .then(function(data) {
       console.log(data);
     })
     .catch(function(error) {
       console.log(error);
     });

##### Example using callbacks

     smartsheet.sheets.getAttachment({id: sheetsId}, function(error, data) {
       if (error) {
         console.log(error);
       }
       console.log(data);
     });

#### listAttachments
[back to TOC](#table-of-contents)
##### Example using promises

     smartsheet.sheets.listAttachments({})
     .then(function(data) {
       console.log(data);
     })
     .catch(function(error) {
       console.log(error);
     });

##### Example using callbacks

     smartsheet.sheets.listAttachments({}, function(error, data) {
       if (error) {
         console.log(error);
       }
       console.log(data);
     });

#### listAttachmentVersions
[back to TOC](#table-of-contents)
##### Example using promises

     smartsheet.sheets.listAttachmentVersions({})
     .then(function(data) {
       console.log(data);
     })
     .catch(function(error) {
       console.log(error);
     });

##### Example using callbacks

     smartsheet.sheets.listAttachmentVersions({}, function(error, data) {
       if (error) {
         console.log(error);
       }
       console.log(data);
     });

#### addAttachment
[back to TOC](#table-of-contents)
##### Example using promises

     var options = {
        body: {
         //body of request as specified in the Smartsheet API documentation
        },
        queryParameters: {
         //querystring parameters as specified in the Smartsheet API documentation
        }
     };
     smartsheet.sheets.addAttachment(options)
     .then(function(data) {
       console.log(data);
     })
     .catch(function(error) {
       console.log(error);
     });

##### Example using callbacks

     var options = {
        body: {
         //body of request as specified in the Smartsheet API documentation
        },
        queryParameters: {
         //querystring parameters as specified in the Smartsheet API documentation
        }
     };
     smartsheet.sheets.addAttachment(options, function(error, data) {
       if (error) {
         console.log(error);
       }
       console.log(data);
     });

#### attachNewVersion
[back to TOC](#table-of-contents)
##### Example using promises

     smartsheet.sheets.attachNewVersion({id: sheetsId})
     .then(function(data) {
       console.log(data);
     })
     .catch(function(error) {
       console.log(error);
     });

##### Example using callbacks

     smartsheet.sheets.attachNewVersion({id: sheetsId}, function(error, data) {
       if (error) {
         console.log(error);
       }
       console.log(data);
     });

#### deleteAttachment
[back to TOC](#table-of-contents)
##### Example using promises

     var options = {
        id: sheetsId
     }
     smartsheet.sheets.deleteAttachment(options)
     .then(function(data) {
       console.log(data);
     })
     .catch(function(error) {
       console.log(error);
     });

##### Example using callbacks

     var options = {
        id: sheetsId
     }
     smartsheet.sheets.deleteAttachment(options, function(error, data) {
       if (error) {
         console.log(error);
       }
       console.log(data);
     });

#### deleteAllAttachmentVersions
[back to TOC](#table-of-contents)
##### Example using promises

     var options = {
        id: sheetsId
     }
     smartsheet.sheets.deleteAllAttachmentVersions(options)
     .then(function(data) {
       console.log(data);
     })
     .catch(function(error) {
       console.log(error);
     });

##### Example using callbacks

     var options = {
        id: sheetsId
     }
     smartsheet.sheets.deleteAllAttachmentVersions(options, function(error, data) {
       if (error) {
         console.log(error);
       }
       console.log(data);
     });

#### getColumns
[back to TOC](#table-of-contents)
##### Example using promises

     smartsheet.sheets.getColumns({})
     .then(function(data) {
       console.log(data);
     })
     .catch(function(error) {
       console.log(error);
     });

##### Example using callbacks

     smartsheet.sheets.getColumns({}, function(error, data) {
       if (error) {
         console.log(error);
       }
       console.log(data);
     });

#### getColumn
[back to TOC](#table-of-contents)
##### Example using promises

     smartsheet.sheets.getColumn({id: sheetsId})
     .then(function(data) {
       console.log(data);
     })
     .catch(function(error) {
       console.log(error);
     });

##### Example using callbacks

     smartsheet.sheets.getColumn({id: sheetsId}, function(error, data) {
       if (error) {
         console.log(error);
       }
       console.log(data);
     });

#### addColumn
[back to TOC](#table-of-contents)
##### Example using promises

     var options = {
        body: {
         //body of request as specified in the Smartsheet API documentation
        },
        queryParameters: {
         //querystring parameters as specified in the Smartsheet API documentation
        }
     };
     smartsheet.sheets.addColumn(options)
     .then(function(data) {
       console.log(data);
     })
     .catch(function(error) {
       console.log(error);
     });

##### Example using callbacks

     var options = {
        body: {
         //body of request as specified in the Smartsheet API documentation
        },
        queryParameters: {
         //querystring parameters as specified in the Smartsheet API documentation
        }
     };
     smartsheet.sheets.addColumn(options, function(error, data) {
       if (error) {
         console.log(error);
       }
       console.log(data);
     });

#### deleteColumn
[back to TOC](#table-of-contents)
##### Example using promises

     var options = {
        id: sheetsId
     }
     smartsheet.sheets.deleteColumn(options)
     .then(function(data) {
       console.log(data);
     })
     .catch(function(error) {
       console.log(error);
     });

##### Example using callbacks

     var options = {
        id: sheetsId
     }
     smartsheet.sheets.deleteColumn(options, function(error, data) {
       if (error) {
         console.log(error);
       }
       console.log(data);
     });

#### updateColumn
[back to TOC](#table-of-contents)
##### Example using promises

     var options = {
        id: sheetsId,
        body: {
         //body of request as specified in the Smartsheet API documentation
        },
        queryParameters: {
         //querystring parameters as specified in the Smartsheet API documentation
        }
     };
     smartsheet.sheets.updateColumn(options)
     .then(function(data) {
       console.log(data);
     })
     .catch(function(error) {
       console.log(error);
     });

##### Example using callbacks

     var options = {
        id: sheetsId,
        body: {
         //body of request as specified in the Smartsheet API documentation
        },
        queryParameters: {
         //querystring parameters as specified in the Smartsheet API documentation
        }
     };
     smartsheet.sheets.updateColumn(options, function(error, data) {
       if (error) {
         console.log(error);
       }
       console.log(data);
     });

#### getComment
[back to TOC](#table-of-contents)
##### Example using promises

     smartsheet.sheets.getComment({id: sheetsId})
     .then(function(data) {
       console.log(data);
     })
     .catch(function(error) {
       console.log(error);
     });

##### Example using callbacks

     smartsheet.sheets.getComment({id: sheetsId}, function(error, data) {
       if (error) {
         console.log(error);
       }
       console.log(data);
     });

#### deleteComment
[back to TOC](#table-of-contents)
##### Example using promises

     var options = {
        id: sheetsId
     }
     smartsheet.sheets.deleteComment(options)
     .then(function(data) {
       console.log(data);
     })
     .catch(function(error) {
       console.log(error);
     });

##### Example using callbacks

     var options = {
        id: sheetsId
     }
     smartsheet.sheets.deleteComment(options, function(error, data) {
       if (error) {
         console.log(error);
       }
       console.log(data);
     });

#### addCommentAttachment
[back to TOC](#table-of-contents)
##### Example using promises

     var options = {
        body: {
         //body of request as specified in the Smartsheet API documentation
        },
        queryParameters: {
         //querystring parameters as specified in the Smartsheet API documentation
        }
     };
     smartsheet.sheets.addCommentAttachment(options)
     .then(function(data) {
       console.log(data);
     })
     .catch(function(error) {
       console.log(error);
     });

##### Example using callbacks

     var options = {
        body: {
         //body of request as specified in the Smartsheet API documentation
        },
        queryParameters: {
         //querystring parameters as specified in the Smartsheet API documentation
        }
     };
     smartsheet.sheets.addCommentAttachment(options, function(error, data) {
       if (error) {
         console.log(error);
       }
       console.log(data);
     });

#### createSheet
[back to TOC](#table-of-contents)
##### Example using promises

     var options = {
        body: {
         //body of request as specified in the Smartsheet API documentation
        },
        queryParameters: {
         //querystring parameters as specified in the Smartsheet API documentation
        }
     };
     smartsheet.sheets.createSheet(options)
     .then(function(data) {
       console.log(data);
     })
     .catch(function(error) {
       console.log(error);
     });

##### Example using callbacks

     var options = {
        body: {
         //body of request as specified in the Smartsheet API documentation
        },
        queryParameters: {
         //querystring parameters as specified in the Smartsheet API documentation
        }
     };
     smartsheet.sheets.createSheet(options, function(error, data) {
       if (error) {
         console.log(error);
       }
       console.log(data);
     });

#### createSheetFromExisting
[back to TOC](#table-of-contents)
##### Example using promises

     var options = {
        body: {
         //body of request as specified in the Smartsheet API documentation
        },
        queryParameters: {
         //querystring parameters as specified in the Smartsheet API documentation
        }
     };
     smartsheet.sheets.createSheetFromExisting(options)
     .then(function(data) {
       console.log(data);
     })
     .catch(function(error) {
       console.log(error);
     });

##### Example using callbacks

     var options = {
        body: {
         //body of request as specified in the Smartsheet API documentation
        },
        queryParameters: {
         //querystring parameters as specified in the Smartsheet API documentation
        }
     };
     smartsheet.sheets.createSheetFromExisting(options, function(error, data) {
       if (error) {
         console.log(error);
       }
       console.log(data);
     });

#### createSheetInFolder
[back to TOC](#table-of-contents)
##### Example using promises

     var options = {
        body: {
         //body of request as specified in the Smartsheet API documentation
        },
        queryParameters: {
         //querystring parameters as specified in the Smartsheet API documentation
        }
     };
     smartsheet.sheets.createSheetInFolder(options)
     .then(function(data) {
       console.log(data);
     })
     .catch(function(error) {
       console.log(error);
     });

##### Example using callbacks

     var options = {
        body: {
         //body of request as specified in the Smartsheet API documentation
        },
        queryParameters: {
         //querystring parameters as specified in the Smartsheet API documentation
        }
     };
     smartsheet.sheets.createSheetInFolder(options, function(error, data) {
       if (error) {
         console.log(error);
       }
       console.log(data);
     });

#### createSheetInWorkspace
[back to TOC](#table-of-contents)
##### Example using promises

     var options = {
        body: {
         //body of request as specified in the Smartsheet API documentation
        },
        queryParameters: {
         //querystring parameters as specified in the Smartsheet API documentation
        }
     };
     smartsheet.sheets.createSheetInWorkspace(options)
     .then(function(data) {
       console.log(data);
     })
     .catch(function(error) {
       console.log(error);
     });

##### Example using callbacks

     var options = {
        body: {
         //body of request as specified in the Smartsheet API documentation
        },
        queryParameters: {
         //querystring parameters as specified in the Smartsheet API documentation
        }
     };
     smartsheet.sheets.createSheetInWorkspace(options, function(error, data) {
       if (error) {
         console.log(error);
       }
       console.log(data);
     });

#### getDiscussions
[back to TOC](#table-of-contents)
##### Example using promises

     smartsheet.sheets.getDiscussions({})
     .then(function(data) {
       console.log(data);
     })
     .catch(function(error) {
       console.log(error);
     });

##### Example using callbacks

     smartsheet.sheets.getDiscussions({}, function(error, data) {
       if (error) {
         console.log(error);
       }
       console.log(data);
     });

#### getDiscussion
[back to TOC](#table-of-contents)
##### Example using promises

     smartsheet.sheets.getDiscussion({id: sheetsId})
     .then(function(data) {
       console.log(data);
     })
     .catch(function(error) {
       console.log(error);
     });

##### Example using callbacks

     smartsheet.sheets.getDiscussion({id: sheetsId}, function(error, data) {
       if (error) {
         console.log(error);
       }
       console.log(data);
     });

#### listDiscussionAttachments
[back to TOC](#table-of-contents)
##### Example using promises

     smartsheet.sheets.listDiscussionAttachments({})
     .then(function(data) {
       console.log(data);
     })
     .catch(function(error) {
       console.log(error);
     });

##### Example using callbacks

     smartsheet.sheets.listDiscussionAttachments({}, function(error, data) {
       if (error) {
         console.log(error);
       }
       console.log(data);
     });

#### createDiscussion
[back to TOC](#table-of-contents)
##### Example using promises

     var options = {
        body: {
         //body of request as specified in the Smartsheet API documentation
        },
        queryParameters: {
         //querystring parameters as specified in the Smartsheet API documentation
        }
     };
     smartsheet.sheets.createDiscussion(options)
     .then(function(data) {
       console.log(data);
     })
     .catch(function(error) {
       console.log(error);
     });

##### Example using callbacks

     var options = {
        body: {
         //body of request as specified in the Smartsheet API documentation
        },
        queryParameters: {
         //querystring parameters as specified in the Smartsheet API documentation
        }
     };
     smartsheet.sheets.createDiscussion(options, function(error, data) {
       if (error) {
         console.log(error);
       }
       console.log(data);
     });

#### addDiscussionComment
[back to TOC](#table-of-contents)
##### Example using promises

     var options = {
        body: {
         //body of request as specified in the Smartsheet API documentation
        },
        queryParameters: {
         //querystring parameters as specified in the Smartsheet API documentation
        }
     };
     smartsheet.sheets.addDiscussionComment(options)
     .then(function(data) {
       console.log(data);
     })
     .catch(function(error) {
       console.log(error);
     });

##### Example using callbacks

     var options = {
        body: {
         //body of request as specified in the Smartsheet API documentation
        },
        queryParameters: {
         //querystring parameters as specified in the Smartsheet API documentation
        }
     };
     smartsheet.sheets.addDiscussionComment(options, function(error, data) {
       if (error) {
         console.log(error);
       }
       console.log(data);
     });

#### deleteDiscussion
[back to TOC](#table-of-contents)
##### Example using promises

     var options = {
        id: sheetsId
     }
     smartsheet.sheets.deleteDiscussion(options)
     .then(function(data) {
       console.log(data);
     })
     .catch(function(error) {
       console.log(error);
     });

##### Example using callbacks

     var options = {
        id: sheetsId
     }
     smartsheet.sheets.deleteDiscussion(options, function(error, data) {
       if (error) {
         console.log(error);
       }
       console.log(data);
     });

#### getSheet
[back to TOC](#table-of-contents)
##### Example using promises

     smartsheet.sheets.getSheet({id: sheetsId})
     .then(function(data) {
       console.log(data);
     })
     .catch(function(error) {
       console.log(error);
     });

##### Example using callbacks

     smartsheet.sheets.getSheet({id: sheetsId}, function(error, data) {
       if (error) {
         console.log(error);
       }
       console.log(data);
     });

#### listSheets
[back to TOC](#table-of-contents)
##### Example using promises

     smartsheet.sheets.listSheets({})
     .then(function(data) {
       console.log(data);
     })
     .catch(function(error) {
       console.log(error);
     });

##### Example using callbacks

     smartsheet.sheets.listSheets({}, function(error, data) {
       if (error) {
         console.log(error);
       }
       console.log(data);
     });

#### getSheetAsCSV
[back to TOC](#table-of-contents)
##### Example using promises

     smartsheet.sheets.getSheetAsCSV({id: sheetsId})
     .then(function(data) {
       console.log(data);
     })
     .catch(function(error) {
       console.log(error);
     });

##### Example using callbacks

     smartsheet.sheets.getSheetAsCSV({id: sheetsId}, function(error, data) {
       if (error) {
         console.log(error);
       }
       console.log(data);
     });

#### getSheetAsExcel
[back to TOC](#table-of-contents)
##### Example using promises

     smartsheet.sheets.getSheetAsExcel({id: sheetsId})
     .then(function(data) {
       console.log(data);
     })
     .catch(function(error) {
       console.log(error);
     });

##### Example using callbacks

     smartsheet.sheets.getSheetAsExcel({id: sheetsId}, function(error, data) {
       if (error) {
         console.log(error);
       }
       console.log(data);
     });

#### getSheetAsPDF
[back to TOC](#table-of-contents)
##### Example using promises

     smartsheet.sheets.getSheetAsPDF({id: sheetsId})
     .then(function(data) {
       console.log(data);
     })
     .catch(function(error) {
       console.log(error);
     });

##### Example using callbacks

     smartsheet.sheets.getSheetAsPDF({id: sheetsId}, function(error, data) {
       if (error) {
         console.log(error);
       }
       console.log(data);
     });

#### getSheetVersion
[back to TOC](#table-of-contents)
##### Example using promises

     smartsheet.sheets.getSheetVersion({id: sheetsId})
     .then(function(data) {
       console.log(data);
     })
     .catch(function(error) {
       console.log(error);
     });

##### Example using callbacks

     smartsheet.sheets.getSheetVersion({id: sheetsId}, function(error, data) {
       if (error) {
         console.log(error);
       }
       console.log(data);
     });

#### listOrganizationSheets
[back to TOC](#table-of-contents)
##### Example using promises

     smartsheet.sheets.listOrganizationSheets({})
     .then(function(data) {
       console.log(data);
     })
     .catch(function(error) {
       console.log(error);
     });

##### Example using callbacks

     smartsheet.sheets.listOrganizationSheets({}, function(error, data) {
       if (error) {
         console.log(error);
       }
       console.log(data);
     });

#### getRow
[back to TOC](#table-of-contents)
##### Example using promises

     smartsheet.sheets.getRow({id: sheetsId})
     .then(function(data) {
       console.log(data);
     })
     .catch(function(error) {
       console.log(error);
     });

##### Example using callbacks

     smartsheet.sheets.getRow({id: sheetsId}, function(error, data) {
       if (error) {
         console.log(error);
       }
       console.log(data);
     });

#### getRowAttachments
[back to TOC](#table-of-contents)
##### Example using promises

     smartsheet.sheets.getRowAttachments({})
     .then(function(data) {
       console.log(data);
     })
     .catch(function(error) {
       console.log(error);
     });

##### Example using callbacks

     smartsheet.sheets.getRowAttachments({}, function(error, data) {
       if (error) {
         console.log(error);
       }
       console.log(data);
     });

#### getRowDiscussions
[back to TOC](#table-of-contents)
##### Example using promises

     smartsheet.sheets.getRowDiscussions({})
     .then(function(data) {
       console.log(data);
     })
     .catch(function(error) {
       console.log(error);
     });

##### Example using callbacks

     smartsheet.sheets.getRowDiscussions({}, function(error, data) {
       if (error) {
         console.log(error);
       }
       console.log(data);
     });

#### getCellHistory
[back to TOC](#table-of-contents)
##### Example using promises

     smartsheet.sheets.getCellHistory({id: sheetsId})
     .then(function(data) {
       console.log(data);
     })
     .catch(function(error) {
       console.log(error);
     });

##### Example using callbacks

     smartsheet.sheets.getCellHistory({id: sheetsId}, function(error, data) {
       if (error) {
         console.log(error);
       }
       console.log(data);
     });

#### copyRowToAnotherSheet
[back to TOC](#table-of-contents)
##### Example using promises

     smartsheet.sheets.copyRowToAnotherSheet({id: sheetsId})
     .then(function(data) {
       console.log(data);
     })
     .catch(function(error) {
       console.log(error);
     });

##### Example using callbacks

     smartsheet.sheets.copyRowToAnotherSheet({id: sheetsId}, function(error, data) {
       if (error) {
         console.log(error);
       }
       console.log(data);
     });

#### moveRowToAnotherSheet
[back to TOC](#table-of-contents)
##### Example using promises

     smartsheet.sheets.moveRowToAnotherSheet({id: sheetsId})
     .then(function(data) {
       console.log(data);
     })
     .catch(function(error) {
       console.log(error);
     });

##### Example using callbacks

     smartsheet.sheets.moveRowToAnotherSheet({id: sheetsId}, function(error, data) {
       if (error) {
         console.log(error);
       }
       console.log(data);
     });

#### addRow
[back to TOC](#table-of-contents)
##### Example using promises

     var options = {
        body: {
         //body of request as specified in the Smartsheet API documentation
        },
        queryParameters: {
         //querystring parameters as specified in the Smartsheet API documentation
        }
     };
     smartsheet.sheets.addRow(options)
     .then(function(data) {
       console.log(data);
     })
     .catch(function(error) {
       console.log(error);
     });

##### Example using callbacks

     var options = {
        body: {
         //body of request as specified in the Smartsheet API documentation
        },
        queryParameters: {
         //querystring parameters as specified in the Smartsheet API documentation
        }
     };
     smartsheet.sheets.addRow(options, function(error, data) {
       if (error) {
         console.log(error);
       }
       console.log(data);
     });

#### addRows
[back to TOC](#table-of-contents)
##### Example using promises

     var options = {
        body: {
         //body of request as specified in the Smartsheet API documentation
        },
        queryParameters: {
         //querystring parameters as specified in the Smartsheet API documentation
        }
     };
     smartsheet.sheets.addRows(options)
     .then(function(data) {
       console.log(data);
     })
     .catch(function(error) {
       console.log(error);
     });

##### Example using callbacks

     var options = {
        body: {
         //body of request as specified in the Smartsheet API documentation
        },
        queryParameters: {
         //querystring parameters as specified in the Smartsheet API documentation
        }
     };
     smartsheet.sheets.addRows(options, function(error, data) {
       if (error) {
         console.log(error);
       }
       console.log(data);
     });

#### addRowAttachment
[back to TOC](#table-of-contents)
##### Example using promises

     var options = {
        body: {
         //body of request as specified in the Smartsheet API documentation
        },
        queryParameters: {
         //querystring parameters as specified in the Smartsheet API documentation
        }
     };
     smartsheet.sheets.addRowAttachment(options)
     .then(function(data) {
       console.log(data);
     })
     .catch(function(error) {
       console.log(error);
     });

##### Example using callbacks

     var options = {
        body: {
         //body of request as specified in the Smartsheet API documentation
        },
        queryParameters: {
         //querystring parameters as specified in the Smartsheet API documentation
        }
     };
     smartsheet.sheets.addRowAttachment(options, function(error, data) {
       if (error) {
         console.log(error);
       }
       console.log(data);
     });

#### createRowDiscussion
[back to TOC](#table-of-contents)
##### Example using promises

     var options = {
        body: {
         //body of request as specified in the Smartsheet API documentation
        },
        queryParameters: {
         //querystring parameters as specified in the Smartsheet API documentation
        }
     };
     smartsheet.sheets.createRowDiscussion(options)
     .then(function(data) {
       console.log(data);
     })
     .catch(function(error) {
       console.log(error);
     });

##### Example using callbacks

     var options = {
        body: {
         //body of request as specified in the Smartsheet API documentation
        },
        queryParameters: {
         //querystring parameters as specified in the Smartsheet API documentation
        }
     };
     smartsheet.sheets.createRowDiscussion(options, function(error, data) {
       if (error) {
         console.log(error);
       }
       console.log(data);
     });

#### sendRow
[back to TOC](#table-of-contents)
##### Example using promises

     smartsheet.sheets.sendRow({id: sheetsId})
     .then(function(data) {
       console.log(data);
     })
     .catch(function(error) {
       console.log(error);
     });

##### Example using callbacks

     smartsheet.sheets.sendRow({id: sheetsId}, function(error, data) {
       if (error) {
         console.log(error);
       }
       console.log(data);
     });

#### deleteRow
[back to TOC](#table-of-contents)
##### Example using promises

     var options = {
        id: sheetsId
     }
     smartsheet.sheets.deleteRow(options)
     .then(function(data) {
       console.log(data);
     })
     .catch(function(error) {
       console.log(error);
     });

##### Example using callbacks

     var options = {
        id: sheetsId
     }
     smartsheet.sheets.deleteRow(options, function(error, data) {
       if (error) {
         console.log(error);
       }
       console.log(data);
     });

#### updateRow
[back to TOC](#table-of-contents)
##### Example using promises

     var options = {
        id: sheetsId,
        body: {
         //body of request as specified in the Smartsheet API documentation
        },
        queryParameters: {
         //querystring parameters as specified in the Smartsheet API documentation
        }
     };
     smartsheet.sheets.updateRow(options)
     .then(function(data) {
       console.log(data);
     })
     .catch(function(error) {
       console.log(error);
     });

##### Example using callbacks

     var options = {
        id: sheetsId,
        body: {
         //body of request as specified in the Smartsheet API documentation
        },
        queryParameters: {
         //querystring parameters as specified in the Smartsheet API documentation
        }
     };
     smartsheet.sheets.updateRow(options, function(error, data) {
       if (error) {
         console.log(error);
       }
       console.log(data);
     });

#### getShare
[back to TOC](#table-of-contents)
##### Example using promises

     smartsheet.sheets.getShare({id: sheetsId})
     .then(function(data) {
       console.log(data);
     })
     .catch(function(error) {
       console.log(error);
     });

##### Example using callbacks

     smartsheet.sheets.getShare({id: sheetsId}, function(error, data) {
       if (error) {
         console.log(error);
       }
       console.log(data);
     });

#### listShares
[back to TOC](#table-of-contents)
##### Example using promises

     smartsheet.sheets.listShares({})
     .then(function(data) {
       console.log(data);
     })
     .catch(function(error) {
       console.log(error);
     });

##### Example using callbacks

     smartsheet.sheets.listShares({}, function(error, data) {
       if (error) {
         console.log(error);
       }
       console.log(data);
     });

#### share
[back to TOC](#table-of-contents)
##### Example using promises

     smartsheet.sheets.share({id: sheetsId})
     .then(function(data) {
       console.log(data);
     })
     .catch(function(error) {
       console.log(error);
     });

##### Example using callbacks

     smartsheet.sheets.share({id: sheetsId}, function(error, data) {
       if (error) {
         console.log(error);
       }
       console.log(data);
     });

#### deleteShare
[back to TOC](#table-of-contents)
##### Example using promises

     var options = {
        id: sheetsId
     }
     smartsheet.sheets.deleteShare(options)
     .then(function(data) {
       console.log(data);
     })
     .catch(function(error) {
       console.log(error);
     });

##### Example using callbacks

     var options = {
        id: sheetsId
     }
     smartsheet.sheets.deleteShare(options, function(error, data) {
       if (error) {
         console.log(error);
       }
       console.log(data);
     });

#### updateShare
[back to TOC](#table-of-contents)
##### Example using promises

     var options = {
        id: sheetsId,
        body: {
         //body of request as specified in the Smartsheet API documentation
        },
        queryParameters: {
         //querystring parameters as specified in the Smartsheet API documentation
        }
     };
     smartsheet.sheets.updateShare(options)
     .then(function(data) {
       console.log(data);
     })
     .catch(function(error) {
       console.log(error);
     });

##### Example using callbacks

     var options = {
        id: sheetsId,
        body: {
         //body of request as specified in the Smartsheet API documentation
        },
        queryParameters: {
         //querystring parameters as specified in the Smartsheet API documentation
        }
     };
     smartsheet.sheets.updateShare(options, function(error, data) {
       if (error) {
         console.log(error);
       }
       console.log(data);
     });

### Template API methods

#### listUserCreatedTemplates
[back to TOC](#table-of-contents)
##### Example using promises

     smartsheet.templates.listUserCreatedTemplates({})
     .then(function(data) {
       console.log(data);
     })
     .catch(function(error) {
       console.log(error);
     });

##### Example using callbacks

     smartsheet.templates.listUserCreatedTemplates({}, function(error, data) {
       if (error) {
         console.log(error);
       }
       console.log(data);
     });

#### listPublicTemplates
[back to TOC](#table-of-contents)
##### Example using promises

     smartsheet.templates.listPublicTemplates({})
     .then(function(data) {
       console.log(data);
     })
     .catch(function(error) {
       console.log(error);
     });

##### Example using callbacks

     smartsheet.templates.listPublicTemplates({}, function(error, data) {
       if (error) {
         console.log(error);
       }
       console.log(data);
     });

### User API methods

#### getUser
[back to TOC](#table-of-contents)
##### Example using promises

     smartsheet.users.getUser({id: usersId})
     .then(function(data) {
       console.log(data);
     })
     .catch(function(error) {
       console.log(error);
     });

##### Example using callbacks

     smartsheet.users.getUser({id: usersId}, function(error, data) {
       if (error) {
         console.log(error);
       }
       console.log(data);
     });

#### listAllUsers
[back to TOC](#table-of-contents)
##### Example using promises

     smartsheet.users.listAllUsers({})
     .then(function(data) {
       console.log(data);
     })
     .catch(function(error) {
       console.log(error);
     });

##### Example using callbacks

     smartsheet.users.listAllUsers({}, function(error, data) {
       if (error) {
         console.log(error);
       }
       console.log(data);
     });

#### getCurrentUser
[back to TOC](#table-of-contents)
##### Example using promises

     smartsheet.users.getCurrentUser({})
     .then(function(data) {
       console.log(data);
     })
     .catch(function(error) {
       console.log(error);
     });

##### Example using callbacks

     smartsheet.users.getCurrentUser({}, function(error, data) {
       if (error) {
         console.log(error);
       }
       console.log(data);
     });

#### addUser
[back to TOC](#table-of-contents)
##### Example using promises

     var options = {
        body: {
         //body of request as specified in the Smartsheet API documentation
        },
        queryParameters: {
         //querystring parameters as specified in the Smartsheet API documentation
        }
     };
     smartsheet.users.addUser(options)
     .then(function(data) {
       console.log(data);
     })
     .catch(function(error) {
       console.log(error);
     });

##### Example using callbacks

     var options = {
        body: {
         //body of request as specified in the Smartsheet API documentation
        },
        queryParameters: {
         //querystring parameters as specified in the Smartsheet API documentation
        }
     };
     smartsheet.users.addUser(options, function(error, data) {
       if (error) {
         console.log(error);
       }
       console.log(data);
     });

#### addUserAndSendEmail
[back to TOC](#table-of-contents)
##### Example using promises

     var options = {
        body: {
         //body of request as specified in the Smartsheet API documentation
        },
        queryParameters: {
         //querystring parameters as specified in the Smartsheet API documentation
        }
     };
     smartsheet.users.addUserAndSendEmail(options)
     .then(function(data) {
       console.log(data);
     })
     .catch(function(error) {
       console.log(error);
     });

##### Example using callbacks

     var options = {
        body: {
         //body of request as specified in the Smartsheet API documentation
        },
        queryParameters: {
         //querystring parameters as specified in the Smartsheet API documentation
        }
     };
     smartsheet.users.addUserAndSendEmail(options, function(error, data) {
       if (error) {
         console.log(error);
       }
       console.log(data);
     });

#### updateUser
[back to TOC](#table-of-contents)
##### Example using promises

     var options = {
        id: usersId,
        body: {
         //body of request as specified in the Smartsheet API documentation
        },
        queryParameters: {
         //querystring parameters as specified in the Smartsheet API documentation
        }
     };
     smartsheet.users.updateUser(options)
     .then(function(data) {
       console.log(data);
     })
     .catch(function(error) {
       console.log(error);
     });

##### Example using callbacks

     var options = {
        id: usersId,
        body: {
         //body of request as specified in the Smartsheet API documentation
        },
        queryParameters: {
         //querystring parameters as specified in the Smartsheet API documentation
        }
     };
     smartsheet.users.updateUser(options, function(error, data) {
       if (error) {
         console.log(error);
       }
       console.log(data);
     });

#### removeUser
[back to TOC](#table-of-contents)
##### Example using promises

     smartsheet.users.removeUser({id: usersId})
     .then(function(data) {
       console.log(data);
     })
     .catch(function(error) {
       console.log(error);
     });

##### Example using callbacks

     smartsheet.users.removeUser({id: usersId}, function(error, data) {
       if (error) {
         console.log(error);
       }
       console.log(data);
     });

### Workspace API methods

#### listWorkspaces
[back to TOC](#table-of-contents)
##### Example using promises

     smartsheet.workspaces.listWorkspaces({})
     .then(function(data) {
       console.log(data);
     })
     .catch(function(error) {
       console.log(error);
     });

##### Example using callbacks

     smartsheet.workspaces.listWorkspaces({}, function(error, data) {
       if (error) {
         console.log(error);
       }
       console.log(data);
     });

#### getWorkspace
[back to TOC](#table-of-contents)
##### Example using promises

     smartsheet.workspaces.getWorkspace({id: workspacesId})
     .then(function(data) {
       console.log(data);
     })
     .catch(function(error) {
       console.log(error);
     });

##### Example using callbacks

     smartsheet.workspaces.getWorkspace({id: workspacesId}, function(error, data) {
       if (error) {
         console.log(error);
       }
       console.log(data);
     });

#### listWorkspaceFolders
[back to TOC](#table-of-contents)
##### Example using promises

     smartsheet.workspaces.listWorkspaceFolders({})
     .then(function(data) {
       console.log(data);
     })
     .catch(function(error) {
       console.log(error);
     });

##### Example using callbacks

     smartsheet.workspaces.listWorkspaceFolders({}, function(error, data) {
       if (error) {
         console.log(error);
       }
       console.log(data);
     });

#### createWorkspace
[back to TOC](#table-of-contents)
##### Example using promises

     var options = {
        body: {
         //body of request as specified in the Smartsheet API documentation
        },
        queryParameters: {
         //querystring parameters as specified in the Smartsheet API documentation
        }
     };
     smartsheet.workspaces.createWorkspace(options)
     .then(function(data) {
       console.log(data);
     })
     .catch(function(error) {
       console.log(error);
     });

##### Example using callbacks

     var options = {
        body: {
         //body of request as specified in the Smartsheet API documentation
        },
        queryParameters: {
         //querystring parameters as specified in the Smartsheet API documentation
        }
     };
     smartsheet.workspaces.createWorkspace(options, function(error, data) {
       if (error) {
         console.log(error);
       }
       console.log(data);
     });

#### createFolder
[back to TOC](#table-of-contents)
##### Example using promises

     var options = {
        body: {
         //body of request as specified in the Smartsheet API documentation
        },
        queryParameters: {
         //querystring parameters as specified in the Smartsheet API documentation
        }
     };
     smartsheet.workspaces.createFolder(options)
     .then(function(data) {
       console.log(data);
     })
     .catch(function(error) {
       console.log(error);
     });

##### Example using callbacks

     var options = {
        body: {
         //body of request as specified in the Smartsheet API documentation
        },
        queryParameters: {
         //querystring parameters as specified in the Smartsheet API documentation
        }
     };
     smartsheet.workspaces.createFolder(options, function(error, data) {
       if (error) {
         console.log(error);
       }
       console.log(data);
     });

#### deleteWorkspace
[back to TOC](#table-of-contents)
##### Example using promises

     var options = {
        id: workspacesId
     }
     smartsheet.workspaces.deleteWorkspace(options)
     .then(function(data) {
       console.log(data);
     })
     .catch(function(error) {
       console.log(error);
     });

##### Example using callbacks

     var options = {
        id: workspacesId
     }
     smartsheet.workspaces.deleteWorkspace(options, function(error, data) {
       if (error) {
         console.log(error);
       }
       console.log(data);
     });

#### updateWorkspace
[back to TOC](#table-of-contents)
##### Example using promises

     var options = {
        id: workspacesId,
        body: {
         //body of request as specified in the Smartsheet API documentation
        },
        queryParameters: {
         //querystring parameters as specified in the Smartsheet API documentation
        }
     };
     smartsheet.workspaces.updateWorkspace(options)
     .then(function(data) {
       console.log(data);
     })
     .catch(function(error) {
       console.log(error);
     });

##### Example using callbacks

     var options = {
        id: workspacesId,
        body: {
         //body of request as specified in the Smartsheet API documentation
        },
        queryParameters: {
         //querystring parameters as specified in the Smartsheet API documentation
        }
     };
     smartsheet.workspaces.updateWorkspace(options, function(error, data) {
       if (error) {
         console.log(error);
       }
       console.log(data);
     });

#### getShare
[back to TOC](#table-of-contents)
##### Example using promises

     smartsheet.workspaces.getShare({id: workspacesId})
     .then(function(data) {
       console.log(data);
     })
     .catch(function(error) {
       console.log(error);
     });

##### Example using callbacks

     smartsheet.workspaces.getShare({id: workspacesId}, function(error, data) {
       if (error) {
         console.log(error);
       }
       console.log(data);
     });

#### listShares
[back to TOC](#table-of-contents)
##### Example using promises

     smartsheet.workspaces.listShares({})
     .then(function(data) {
       console.log(data);
     })
     .catch(function(error) {
       console.log(error);
     });

##### Example using callbacks

     smartsheet.workspaces.listShares({}, function(error, data) {
       if (error) {
         console.log(error);
       }
       console.log(data);
     });

#### share
[back to TOC](#table-of-contents)
##### Example using promises

     smartsheet.workspaces.share({id: workspacesId})
     .then(function(data) {
       console.log(data);
     })
     .catch(function(error) {
       console.log(error);
     });

##### Example using callbacks

     smartsheet.workspaces.share({id: workspacesId}, function(error, data) {
       if (error) {
         console.log(error);
       }
       console.log(data);
     });

#### deleteShare
[back to TOC](#table-of-contents)
##### Example using promises

     var options = {
        id: workspacesId
     }
     smartsheet.workspaces.deleteShare(options)
     .then(function(data) {
       console.log(data);
     })
     .catch(function(error) {
       console.log(error);
     });

##### Example using callbacks

     var options = {
        id: workspacesId
     }
     smartsheet.workspaces.deleteShare(options, function(error, data) {
       if (error) {
         console.log(error);
       }
       console.log(data);
     });

#### updateShare
[back to TOC](#table-of-contents)
##### Example using promises

     var options = {
        id: workspacesId,
        body: {
         //body of request as specified in the Smartsheet API documentation
        },
        queryParameters: {
         //querystring parameters as specified in the Smartsheet API documentation
        }
     };
     smartsheet.workspaces.updateShare(options)
     .then(function(data) {
       console.log(data);
     })
     .catch(function(error) {
       console.log(error);
     });

##### Example using callbacks

     var options = {
        id: workspacesId,
        body: {
         //body of request as specified in the Smartsheet API documentation
        },
        queryParameters: {
         //querystring parameters as specified in the Smartsheet API documentation
        }
     };
     smartsheet.workspaces.updateShare(options, function(error, data) {
       if (error) {
         console.log(error);
       }
       console.log(data);
     });
