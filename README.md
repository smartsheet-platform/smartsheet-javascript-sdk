# Smartsheet SDK for JavaScript

**Please note the initial version of the SDK is Pre-Alpha because there can be breaking changes**

[Smartsheet Platform](http://smartsheet.com/developers) extends the the power of [Smartsheet](http://www.smartsheet.com).
Check out the [documentation](http://www.smartsheet.com/developers/api-documentation) for a more detailed API reference
along with the request and response examples for all available methods. Have any questions? Check out our tag on our
[Stackoverflow](http://stackoverflow.com/questions/tagged/smartsheet-api).

## Installation

    npm install smartsheet


## Documentation

The documentation for the APIs can be [found here](http://www.smartsheet.com/developers/api-documentation). If you
need to know what the format of the request needs to be check here!

## Unit Tests

Inside the /test folder there are unit tests that can be run. These are helpful if you would like to expand/change and
make a pull request. To use these run the following command in the root directory after you clone the repository.

    npm test

## Contributing

If you would like to contribute a change to the SDK, please fork a branch and then submit a pull request.
[More info here.](https://help.github.com/articles/using-pull-requests)

## SDK Documentation

### Table of Contents

- [Usage](#usage)
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
- [Hom API methods](#hom-api-methods)
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
- [Searc API methods](#searc-api-methods)
    - [searchAll](#searchall)
    - [searchSheet](#searchsheet)
- [Serve API methods](#serve-api-methods)
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
    - [getShare](#getshare)
    - [listShares](#listshares)
    - [share](#share)
    - [deleteShare](#deleteshare)
    - [updateShare](#updateshare)
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
    - [getShare](#getshare-1)
    - [listShares](#listshares-1)
    - [share](#share-1)
    - [deleteShare](#deleteshare-1)
    - [updateShare](#updateshare-1)


## Usage
--------------------

All APIs are exposed inside the root module that is created using the following:

    var client = require('smartsheet');
    var smartsheet = client.create({accessToken:'ACCESSTOKEN'});
    eg..
    smartsheet.sheets //contains methods to create, get, update and delete sheets.

The smartsheet variable now contains access to all the APIs [found here](http://www.smartsheet.com/developers/api-documentation).
Once you have created the smartsheet object above, you can use all the methods like below.


###Favorite API methods

####listFavorites
[back to TOC](#table-of-contents)
#####Example using promises

     smartsheet.favorites.listFavorites({})
     .then(function(data) {
       // Data will contain the favorites object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     smartsheet.favorites.listFavorites({}, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the favorites object
       console.log(data);
     });

####addItemsToFavorites
[back to TOC](#table-of-contents)
#####Example using promises

     var options = {
        body: {
         //body of request to send for favorites API in documentation linked above
        },
        queryParameters: {
         //optional, found in the documentation linked above.
        }
     };
     smartsheet.favorites.addItemsToFavorites(options)
     .then(function(data) {
       // Data will contain the favorites object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     var options = {
        body: {
         //body of request to send for favorites API in documentation linked above
        },
        queryParameters: {
         //optional, found in the documentation linked above.
        }
     };
     smartsheet.favorites.addItemsToFavorites(options, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the favorites object
       console.log(data);
     });

####addSheetToFavorites
[back to TOC](#table-of-contents)
#####Example using promises

     var options = {
        body: {
         //body of request to send for favorites API in documentation linked above
        },
        queryParameters: {
         //optional, found in the documentation linked above.
        }
     };
     smartsheet.favorites.addSheetToFavorites(options)
     .then(function(data) {
       // Data will contain the favorites object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     var options = {
        body: {
         //body of request to send for favorites API in documentation linked above
        },
        queryParameters: {
         //optional, found in the documentation linked above.
        }
     };
     smartsheet.favorites.addSheetToFavorites(options, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the favorites object
       console.log(data);
     });

####addFolderToFavorites
[back to TOC](#table-of-contents)
#####Example using promises

     var options = {
        body: {
         //body of request to send for favorites API in documentation linked above
        },
        queryParameters: {
         //optional, found in the documentation linked above.
        }
     };
     smartsheet.favorites.addFolderToFavorites(options)
     .then(function(data) {
       // Data will contain the favorites object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     var options = {
        body: {
         //body of request to send for favorites API in documentation linked above
        },
        queryParameters: {
         //optional, found in the documentation linked above.
        }
     };
     smartsheet.favorites.addFolderToFavorites(options, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the favorites object
       console.log(data);
     });

####addReportToFavorites
[back to TOC](#table-of-contents)
#####Example using promises

     var options = {
        body: {
         //body of request to send for favorites API in documentation linked above
        },
        queryParameters: {
         //optional, found in the documentation linked above.
        }
     };
     smartsheet.favorites.addReportToFavorites(options)
     .then(function(data) {
       // Data will contain the favorites object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     var options = {
        body: {
         //body of request to send for favorites API in documentation linked above
        },
        queryParameters: {
         //optional, found in the documentation linked above.
        }
     };
     smartsheet.favorites.addReportToFavorites(options, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the favorites object
       console.log(data);
     });

####addTemplateToFavorites
[back to TOC](#table-of-contents)
#####Example using promises

     var options = {
        body: {
         //body of request to send for favorites API in documentation linked above
        },
        queryParameters: {
         //optional, found in the documentation linked above.
        }
     };
     smartsheet.favorites.addTemplateToFavorites(options)
     .then(function(data) {
       // Data will contain the favorites object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     var options = {
        body: {
         //body of request to send for favorites API in documentation linked above
        },
        queryParameters: {
         //optional, found in the documentation linked above.
        }
     };
     smartsheet.favorites.addTemplateToFavorites(options, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the favorites object
       console.log(data);
     });

####addWorkspaceToFavorites
[back to TOC](#table-of-contents)
#####Example using promises

     var options = {
        body: {
         //body of request to send for favorites API in documentation linked above
        },
        queryParameters: {
         //optional, found in the documentation linked above.
        }
     };
     smartsheet.favorites.addWorkspaceToFavorites(options)
     .then(function(data) {
       // Data will contain the favorites object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     var options = {
        body: {
         //body of request to send for favorites API in documentation linked above
        },
        queryParameters: {
         //optional, found in the documentation linked above.
        }
     };
     smartsheet.favorites.addWorkspaceToFavorites(options, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the favorites object
       console.log(data);
     });

####removeSheetFromFavorites
[back to TOC](#table-of-contents)
#####Example using promises

     smartsheet.favorites.removeSheetFromFavorites({})
     .then(function(data) {
       // Data will contain the favorites object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     smartsheet.favorites.removeSheetFromFavorites({}, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the favorites object
       console.log(data);
     });

####removeFolderFromFavorites
[back to TOC](#table-of-contents)
#####Example using promises

     smartsheet.favorites.removeFolderFromFavorites({})
     .then(function(data) {
       // Data will contain the favorites object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     smartsheet.favorites.removeFolderFromFavorites({}, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the favorites object
       console.log(data);
     });

####removeReportFromFavorites
[back to TOC](#table-of-contents)
#####Example using promises

     smartsheet.favorites.removeReportFromFavorites({})
     .then(function(data) {
       // Data will contain the favorites object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     smartsheet.favorites.removeReportFromFavorites({}, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the favorites object
       console.log(data);
     });

####removeTemplateFromFavorites
[back to TOC](#table-of-contents)
#####Example using promises

     smartsheet.favorites.removeTemplateFromFavorites({})
     .then(function(data) {
       // Data will contain the favorites object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     smartsheet.favorites.removeTemplateFromFavorites({}, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the favorites object
       console.log(data);
     });

####removeWorkspaceFromFavorites
[back to TOC](#table-of-contents)
#####Example using promises

     smartsheet.favorites.removeWorkspaceFromFavorites({})
     .then(function(data) {
       // Data will contain the favorites object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     smartsheet.favorites.removeWorkspaceFromFavorites({}, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the favorites object
       console.log(data);
     });

####removeSheetsFromFavorites
[back to TOC](#table-of-contents)
#####Example using promises

     smartsheet.favorites.removeSheetsFromFavorites({})
     .then(function(data) {
       // Data will contain the favorites object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     smartsheet.favorites.removeSheetsFromFavorites({}, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the favorites object
       console.log(data);
     });

####removeFoldersFromFavorites
[back to TOC](#table-of-contents)
#####Example using promises

     smartsheet.favorites.removeFoldersFromFavorites({})
     .then(function(data) {
       // Data will contain the favorites object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     smartsheet.favorites.removeFoldersFromFavorites({}, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the favorites object
       console.log(data);
     });

####removeReportsFromFavorites
[back to TOC](#table-of-contents)
#####Example using promises

     smartsheet.favorites.removeReportsFromFavorites({})
     .then(function(data) {
       // Data will contain the favorites object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     smartsheet.favorites.removeReportsFromFavorites({}, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the favorites object
       console.log(data);
     });

####removeTemplatesFromFavorites
[back to TOC](#table-of-contents)
#####Example using promises

     smartsheet.favorites.removeTemplatesFromFavorites({})
     .then(function(data) {
       // Data will contain the favorites object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     smartsheet.favorites.removeTemplatesFromFavorites({}, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the favorites object
       console.log(data);
     });

####removeWorkspacesFromFavorites
[back to TOC](#table-of-contents)
#####Example using promises

     smartsheet.favorites.removeWorkspacesFromFavorites({})
     .then(function(data) {
       // Data will contain the favorites object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     smartsheet.favorites.removeWorkspacesFromFavorites({}, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the favorites object
       console.log(data);
     });

###Folder API methods

####getFolder
[back to TOC](#table-of-contents)
#####Example using promises

     smartsheet.folders.getFolder({id: foldersId})
     .then(function(data) {
       // Data will contain the folders object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     smartsheet.folders.getFolder({id: foldersId}, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the folders object
       console.log(data);
     });

####listChildFolders
[back to TOC](#table-of-contents)
#####Example using promises

     smartsheet.folders.listChildFolders({})
     .then(function(data) {
       // Data will contain the folders object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     smartsheet.folders.listChildFolders({}, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the folders object
       console.log(data);
     });

####createChildFolder
[back to TOC](#table-of-contents)
#####Example using promises

     var options = {
        body: {
         //body of request to send for folders API in documentation linked above
        },
        queryParameters: {
         //optional, found in the documentation linked above.
        }
     };
     smartsheet.folders.createChildFolder(options)
     .then(function(data) {
       // Data will contain the folders object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     var options = {
        body: {
         //body of request to send for folders API in documentation linked above
        },
        queryParameters: {
         //optional, found in the documentation linked above.
        }
     };
     smartsheet.folders.createChildFolder(options, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the folders object
       console.log(data);
     });

####updateFolder
[back to TOC](#table-of-contents)
#####Example using promises

     var options = {
        id: foldersId,
        body: {
         //body of request to send for folders API in documentation linked above
        },
        queryParameters: {
         //optional, found in the documentation linked above.
        }
     };
     smartsheet.folders.updateFolder(options)
     .then(function(data) {
       // Data will contain the folders object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     var options = {
        id: foldersId,
        body: {
         //body of request to send for folders API in documentation linked above
        },
        queryParameters: {
         //optional, found in the documentation linked above.
        }
     };
     smartsheet.folders.updateFolder(options, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the folders object
       console.log(data);
     });

####deleteFolder
[back to TOC](#table-of-contents)
#####Example using promises

     var options = {
        id: foldersId
     }
     smartsheet.folders.deleteFolder(options)
     .then(function(data) {
       // Data will contain the folders object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     var options = {
        id: foldersId
     }
     smartsheet.folders.deleteFolder(options, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the folders object
       console.log(data);
     });

###Group API methods

####listGroups
[back to TOC](#table-of-contents)
#####Example using promises

     smartsheet.groups.listGroups({})
     .then(function(data) {
       // Data will contain the groups object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     smartsheet.groups.listGroups({}, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the groups object
       console.log(data);
     });

####getGroup
[back to TOC](#table-of-contents)
#####Example using promises

     smartsheet.groups.getGroup({id: groupsId})
     .then(function(data) {
       // Data will contain the groups object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     smartsheet.groups.getGroup({id: groupsId}, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the groups object
       console.log(data);
     });

####createGroup
[back to TOC](#table-of-contents)
#####Example using promises

     var options = {
        body: {
         //body of request to send for groups API in documentation linked above
        },
        queryParameters: {
         //optional, found in the documentation linked above.
        }
     };
     smartsheet.groups.createGroup(options)
     .then(function(data) {
       // Data will contain the groups object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     var options = {
        body: {
         //body of request to send for groups API in documentation linked above
        },
        queryParameters: {
         //optional, found in the documentation linked above.
        }
     };
     smartsheet.groups.createGroup(options, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the groups object
       console.log(data);
     });

####addGroupMembers
[back to TOC](#table-of-contents)
#####Example using promises

     var options = {
        body: {
         //body of request to send for groups API in documentation linked above
        },
        queryParameters: {
         //optional, found in the documentation linked above.
        }
     };
     smartsheet.groups.addGroupMembers(options)
     .then(function(data) {
       // Data will contain the groups object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     var options = {
        body: {
         //body of request to send for groups API in documentation linked above
        },
        queryParameters: {
         //optional, found in the documentation linked above.
        }
     };
     smartsheet.groups.addGroupMembers(options, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the groups object
       console.log(data);
     });

####updateGroup
[back to TOC](#table-of-contents)
#####Example using promises

     var options = {
        id: groupsId,
        body: {
         //body of request to send for groups API in documentation linked above
        },
        queryParameters: {
         //optional, found in the documentation linked above.
        }
     };
     smartsheet.groups.updateGroup(options)
     .then(function(data) {
       // Data will contain the groups object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     var options = {
        id: groupsId,
        body: {
         //body of request to send for groups API in documentation linked above
        },
        queryParameters: {
         //optional, found in the documentation linked above.
        }
     };
     smartsheet.groups.updateGroup(options, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the groups object
       console.log(data);
     });

####deleteGroup
[back to TOC](#table-of-contents)
#####Example using promises

     var options = {
        id: groupsId
     }
     smartsheet.groups.deleteGroup(options)
     .then(function(data) {
       // Data will contain the groups object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     var options = {
        id: groupsId
     }
     smartsheet.groups.deleteGroup(options, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the groups object
       console.log(data);
     });

####removeGroupMember
[back to TOC](#table-of-contents)
#####Example using promises

     smartsheet.groups.removeGroupMember({id: groupsId})
     .then(function(data) {
       // Data will contain the groups object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     smartsheet.groups.removeGroupMember({id: groupsId}, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the groups object
       console.log(data);
     });

###Hom API methods

####listContents
[back to TOC](#table-of-contents)
#####Example using promises

     smartsheet.home.listContents({})
     .then(function(data) {
       // Data will contain the home object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     smartsheet.home.listContents({}, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the home object
       console.log(data);
     });

####listFolders
[back to TOC](#table-of-contents)
#####Example using promises

     smartsheet.home.listFolders({})
     .then(function(data) {
       // Data will contain the home object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     smartsheet.home.listFolders({}, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the home object
       console.log(data);
     });

####createFolder
[back to TOC](#table-of-contents)
#####Example using promises

     var options = {
        body: {
         //body of request to send for home API in documentation linked above
        },
        queryParameters: {
         //optional, found in the documentation linked above.
        }
     };
     smartsheet.home.createFolder(options)
     .then(function(data) {
       // Data will contain the home object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     var options = {
        body: {
         //body of request to send for home API in documentation linked above
        },
        queryParameters: {
         //optional, found in the documentation linked above.
        }
     };
     smartsheet.home.createFolder(options, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the home object
       console.log(data);
     });

###Report API methods

####listReports
[back to TOC](#table-of-contents)
#####Example using promises

     smartsheet.reports.listReports({})
     .then(function(data) {
       // Data will contain the reports object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     smartsheet.reports.listReports({}, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the reports object
       console.log(data);
     });

####getReport
[back to TOC](#table-of-contents)
#####Example using promises

     smartsheet.reports.getReport({id: reportsId})
     .then(function(data) {
       // Data will contain the reports object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     smartsheet.reports.getReport({id: reportsId}, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the reports object
       console.log(data);
     });

####sendReportViaEmail
[back to TOC](#table-of-contents)
#####Example using promises

     smartsheet.reports.sendReportViaEmail({id: reportsId})
     .then(function(data) {
       // Data will contain the reports object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     smartsheet.reports.sendReportViaEmail({id: reportsId}, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the reports object
       console.log(data);
     });

####getReportAsExcel
[back to TOC](#table-of-contents)
#####Example using promises

     smartsheet.reports.getReportAsExcel({id: reportsId})
     .then(function(data) {
       // Data will contain the reports object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     smartsheet.reports.getReportAsExcel({id: reportsId}, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the reports object
       console.log(data);
     });

####getReportAsCSV
[back to TOC](#table-of-contents)
#####Example using promises

     smartsheet.reports.getReportAsCSV({id: reportsId})
     .then(function(data) {
       // Data will contain the reports object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     smartsheet.reports.getReportAsCSV({id: reportsId}, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the reports object
       console.log(data);
     });

####getShare
[back to TOC](#table-of-contents)
#####Example using promises

     smartsheet.reports.getShare({id: reportsId})
     .then(function(data) {
       // Data will contain the reports object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     smartsheet.reports.getShare({id: reportsId}, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the reports object
       console.log(data);
     });

####listShares
[back to TOC](#table-of-contents)
#####Example using promises

     smartsheet.reports.listShares({})
     .then(function(data) {
       // Data will contain the reports object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     smartsheet.reports.listShares({}, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the reports object
       console.log(data);
     });

####share
[back to TOC](#table-of-contents)
#####Example using promises

     smartsheet.reports.share({id: reportsId})
     .then(function(data) {
       // Data will contain the reports object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     smartsheet.reports.share({id: reportsId}, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the reports object
       console.log(data);
     });

####deleteShare
[back to TOC](#table-of-contents)
#####Example using promises

     var options = {
        id: reportsId
     }
     smartsheet.reports.deleteShare(options)
     .then(function(data) {
       // Data will contain the reports object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     var options = {
        id: reportsId
     }
     smartsheet.reports.deleteShare(options, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the reports object
       console.log(data);
     });

####updateShare
[back to TOC](#table-of-contents)
#####Example using promises

     var options = {
        id: reportsId,
        body: {
         //body of request to send for reports API in documentation linked above
        },
        queryParameters: {
         //optional, found in the documentation linked above.
        }
     };
     smartsheet.reports.updateShare(options)
     .then(function(data) {
       // Data will contain the reports object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     var options = {
        id: reportsId,
        body: {
         //body of request to send for reports API in documentation linked above
        },
        queryParameters: {
         //optional, found in the documentation linked above.
        }
     };
     smartsheet.reports.updateShare(options, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the reports object
       console.log(data);
     });

###Searc API methods

####searchAll
[back to TOC](#table-of-contents)
#####Example using promises

     smartsheet.search.searchAll({id: searchId})
     .then(function(data) {
       // Data will contain the search object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     smartsheet.search.searchAll({id: searchId}, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the search object
       console.log(data);
     });

####searchSheet
[back to TOC](#table-of-contents)
#####Example using promises

     smartsheet.search.searchSheet({id: searchId})
     .then(function(data) {
       // Data will contain the search object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     smartsheet.search.searchSheet({id: searchId}, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the search object
       console.log(data);
     });

###Serve API methods

####getInfo
[back to TOC](#table-of-contents)
#####Example using promises

     smartsheet.server.getInfo({id: serverId})
     .then(function(data) {
       // Data will contain the server object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     smartsheet.server.getInfo({id: serverId}, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the server object
       console.log(data);
     });

###Sheet API methods

####sendSheetViaEmail
[back to TOC](#table-of-contents)
#####Example using promises

     smartsheet.sheets.sendSheetViaEmail({id: sheetsId})
     .then(function(data) {
       // Data will contain the sheets object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     smartsheet.sheets.sendSheetViaEmail({id: sheetsId}, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the sheets object
       console.log(data);
     });

####getPublishStatus
[back to TOC](#table-of-contents)
#####Example using promises

     smartsheet.sheets.getPublishStatus({})
     .then(function(data) {
       // Data will contain the sheets object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     smartsheet.sheets.getPublishStatus({}, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the sheets object
       console.log(data);
     });

####setPublishStatus
[back to TOC](#table-of-contents)
#####Example using promises

     smartsheet.sheets.setPublishStatus({})
     .then(function(data) {
       // Data will contain the sheets object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     smartsheet.sheets.setPublishStatus({}, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the sheets object
       console.log(data);
     });

####updateSheet
[back to TOC](#table-of-contents)
#####Example using promises

     var options = {
        id: sheetsId,
        body: {
         //body of request to send for sheets API in documentation linked above
        },
        queryParameters: {
         //optional, found in the documentation linked above.
        }
     };
     smartsheet.sheets.updateSheet(options)
     .then(function(data) {
       // Data will contain the sheets object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     var options = {
        id: sheetsId,
        body: {
         //body of request to send for sheets API in documentation linked above
        },
        queryParameters: {
         //optional, found in the documentation linked above.
        }
     };
     smartsheet.sheets.updateSheet(options, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the sheets object
       console.log(data);
     });

####deleteSheet
[back to TOC](#table-of-contents)
#####Example using promises

     var options = {
        id: sheetsId
     }
     smartsheet.sheets.deleteSheet(options)
     .then(function(data) {
       // Data will contain the sheets object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     var options = {
        id: sheetsId
     }
     smartsheet.sheets.deleteSheet(options, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the sheets object
       console.log(data);
     });

####getAttachment
[back to TOC](#table-of-contents)
#####Example using promises

     smartsheet.sheets.getAttachment({id: sheetsId})
     .then(function(data) {
       // Data will contain the sheets object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     smartsheet.sheets.getAttachment({id: sheetsId}, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the sheets object
       console.log(data);
     });

####listAttachments
[back to TOC](#table-of-contents)
#####Example using promises

     smartsheet.sheets.listAttachments({})
     .then(function(data) {
       // Data will contain the sheets object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     smartsheet.sheets.listAttachments({}, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the sheets object
       console.log(data);
     });

####listAttachmentVersions
[back to TOC](#table-of-contents)
#####Example using promises

     smartsheet.sheets.listAttachmentVersions({})
     .then(function(data) {
       // Data will contain the sheets object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     smartsheet.sheets.listAttachmentVersions({}, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the sheets object
       console.log(data);
     });

####addAttachment
[back to TOC](#table-of-contents)
#####Example using promises

     var options = {
        body: {
         //body of request to send for sheets API in documentation linked above
        },
        queryParameters: {
         //optional, found in the documentation linked above.
        }
     };
     smartsheet.sheets.addAttachment(options)
     .then(function(data) {
       // Data will contain the sheets object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     var options = {
        body: {
         //body of request to send for sheets API in documentation linked above
        },
        queryParameters: {
         //optional, found in the documentation linked above.
        }
     };
     smartsheet.sheets.addAttachment(options, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the sheets object
       console.log(data);
     });

####attachNewVersion
[back to TOC](#table-of-contents)
#####Example using promises

     smartsheet.sheets.attachNewVersion({id: sheetsId})
     .then(function(data) {
       // Data will contain the sheets object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     smartsheet.sheets.attachNewVersion({id: sheetsId}, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the sheets object
       console.log(data);
     });

####deleteAttachment
[back to TOC](#table-of-contents)
#####Example using promises

     var options = {
        id: sheetsId
     }
     smartsheet.sheets.deleteAttachment(options)
     .then(function(data) {
       // Data will contain the sheets object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     var options = {
        id: sheetsId
     }
     smartsheet.sheets.deleteAttachment(options, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the sheets object
       console.log(data);
     });

####deleteAllAttachmentVersions
[back to TOC](#table-of-contents)
#####Example using promises

     var options = {
        id: sheetsId
     }
     smartsheet.sheets.deleteAllAttachmentVersions(options)
     .then(function(data) {
       // Data will contain the sheets object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     var options = {
        id: sheetsId
     }
     smartsheet.sheets.deleteAllAttachmentVersions(options, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the sheets object
       console.log(data);
     });

####getColumns
[back to TOC](#table-of-contents)
#####Example using promises

     smartsheet.sheets.getColumns({})
     .then(function(data) {
       // Data will contain the sheets object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     smartsheet.sheets.getColumns({}, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the sheets object
       console.log(data);
     });

####getColumn
[back to TOC](#table-of-contents)
#####Example using promises

     smartsheet.sheets.getColumn({id: sheetsId})
     .then(function(data) {
       // Data will contain the sheets object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     smartsheet.sheets.getColumn({id: sheetsId}, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the sheets object
       console.log(data);
     });

####addColumn
[back to TOC](#table-of-contents)
#####Example using promises

     var options = {
        body: {
         //body of request to send for sheets API in documentation linked above
        },
        queryParameters: {
         //optional, found in the documentation linked above.
        }
     };
     smartsheet.sheets.addColumn(options)
     .then(function(data) {
       // Data will contain the sheets object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     var options = {
        body: {
         //body of request to send for sheets API in documentation linked above
        },
        queryParameters: {
         //optional, found in the documentation linked above.
        }
     };
     smartsheet.sheets.addColumn(options, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the sheets object
       console.log(data);
     });

####deleteColumn
[back to TOC](#table-of-contents)
#####Example using promises

     var options = {
        id: sheetsId
     }
     smartsheet.sheets.deleteColumn(options)
     .then(function(data) {
       // Data will contain the sheets object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     var options = {
        id: sheetsId
     }
     smartsheet.sheets.deleteColumn(options, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the sheets object
       console.log(data);
     });

####updateColumn
[back to TOC](#table-of-contents)
#####Example using promises

     var options = {
        id: sheetsId,
        body: {
         //body of request to send for sheets API in documentation linked above
        },
        queryParameters: {
         //optional, found in the documentation linked above.
        }
     };
     smartsheet.sheets.updateColumn(options)
     .then(function(data) {
       // Data will contain the sheets object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     var options = {
        id: sheetsId,
        body: {
         //body of request to send for sheets API in documentation linked above
        },
        queryParameters: {
         //optional, found in the documentation linked above.
        }
     };
     smartsheet.sheets.updateColumn(options, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the sheets object
       console.log(data);
     });

####getComment
[back to TOC](#table-of-contents)
#####Example using promises

     smartsheet.sheets.getComment({id: sheetsId})
     .then(function(data) {
       // Data will contain the sheets object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     smartsheet.sheets.getComment({id: sheetsId}, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the sheets object
       console.log(data);
     });

####deleteComment
[back to TOC](#table-of-contents)
#####Example using promises

     var options = {
        id: sheetsId
     }
     smartsheet.sheets.deleteComment(options)
     .then(function(data) {
       // Data will contain the sheets object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     var options = {
        id: sheetsId
     }
     smartsheet.sheets.deleteComment(options, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the sheets object
       console.log(data);
     });

####addCommentAttachment
[back to TOC](#table-of-contents)
#####Example using promises

     var options = {
        body: {
         //body of request to send for sheets API in documentation linked above
        },
        queryParameters: {
         //optional, found in the documentation linked above.
        }
     };
     smartsheet.sheets.addCommentAttachment(options)
     .then(function(data) {
       // Data will contain the sheets object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     var options = {
        body: {
         //body of request to send for sheets API in documentation linked above
        },
        queryParameters: {
         //optional, found in the documentation linked above.
        }
     };
     smartsheet.sheets.addCommentAttachment(options, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the sheets object
       console.log(data);
     });

####createSheet
[back to TOC](#table-of-contents)
#####Example using promises

     var options = {
        body: {
         //body of request to send for sheets API in documentation linked above
        },
        queryParameters: {
         //optional, found in the documentation linked above.
        }
     };
     smartsheet.sheets.createSheet(options)
     .then(function(data) {
       // Data will contain the sheets object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     var options = {
        body: {
         //body of request to send for sheets API in documentation linked above
        },
        queryParameters: {
         //optional, found in the documentation linked above.
        }
     };
     smartsheet.sheets.createSheet(options, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the sheets object
       console.log(data);
     });

####createSheetFromExisting
[back to TOC](#table-of-contents)
#####Example using promises

     var options = {
        body: {
         //body of request to send for sheets API in documentation linked above
        },
        queryParameters: {
         //optional, found in the documentation linked above.
        }
     };
     smartsheet.sheets.createSheetFromExisting(options)
     .then(function(data) {
       // Data will contain the sheets object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     var options = {
        body: {
         //body of request to send for sheets API in documentation linked above
        },
        queryParameters: {
         //optional, found in the documentation linked above.
        }
     };
     smartsheet.sheets.createSheetFromExisting(options, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the sheets object
       console.log(data);
     });

####createSheetInFolder
[back to TOC](#table-of-contents)
#####Example using promises

     var options = {
        body: {
         //body of request to send for sheets API in documentation linked above
        },
        queryParameters: {
         //optional, found in the documentation linked above.
        }
     };
     smartsheet.sheets.createSheetInFolder(options)
     .then(function(data) {
       // Data will contain the sheets object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     var options = {
        body: {
         //body of request to send for sheets API in documentation linked above
        },
        queryParameters: {
         //optional, found in the documentation linked above.
        }
     };
     smartsheet.sheets.createSheetInFolder(options, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the sheets object
       console.log(data);
     });

####createSheetInWorkspace
[back to TOC](#table-of-contents)
#####Example using promises

     var options = {
        body: {
         //body of request to send for sheets API in documentation linked above
        },
        queryParameters: {
         //optional, found in the documentation linked above.
        }
     };
     smartsheet.sheets.createSheetInWorkspace(options)
     .then(function(data) {
       // Data will contain the sheets object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     var options = {
        body: {
         //body of request to send for sheets API in documentation linked above
        },
        queryParameters: {
         //optional, found in the documentation linked above.
        }
     };
     smartsheet.sheets.createSheetInWorkspace(options, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the sheets object
       console.log(data);
     });

####getDiscussions
[back to TOC](#table-of-contents)
#####Example using promises

     smartsheet.sheets.getDiscussions({})
     .then(function(data) {
       // Data will contain the sheets object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     smartsheet.sheets.getDiscussions({}, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the sheets object
       console.log(data);
     });

####getDiscussion
[back to TOC](#table-of-contents)
#####Example using promises

     smartsheet.sheets.getDiscussion({id: sheetsId})
     .then(function(data) {
       // Data will contain the sheets object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     smartsheet.sheets.getDiscussion({id: sheetsId}, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the sheets object
       console.log(data);
     });

####listDiscussionAttachments
[back to TOC](#table-of-contents)
#####Example using promises

     smartsheet.sheets.listDiscussionAttachments({})
     .then(function(data) {
       // Data will contain the sheets object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     smartsheet.sheets.listDiscussionAttachments({}, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the sheets object
       console.log(data);
     });

####createDiscussion
[back to TOC](#table-of-contents)
#####Example using promises

     var options = {
        body: {
         //body of request to send for sheets API in documentation linked above
        },
        queryParameters: {
         //optional, found in the documentation linked above.
        }
     };
     smartsheet.sheets.createDiscussion(options)
     .then(function(data) {
       // Data will contain the sheets object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     var options = {
        body: {
         //body of request to send for sheets API in documentation linked above
        },
        queryParameters: {
         //optional, found in the documentation linked above.
        }
     };
     smartsheet.sheets.createDiscussion(options, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the sheets object
       console.log(data);
     });

####addDiscussionComment
[back to TOC](#table-of-contents)
#####Example using promises

     var options = {
        body: {
         //body of request to send for sheets API in documentation linked above
        },
        queryParameters: {
         //optional, found in the documentation linked above.
        }
     };
     smartsheet.sheets.addDiscussionComment(options)
     .then(function(data) {
       // Data will contain the sheets object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     var options = {
        body: {
         //body of request to send for sheets API in documentation linked above
        },
        queryParameters: {
         //optional, found in the documentation linked above.
        }
     };
     smartsheet.sheets.addDiscussionComment(options, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the sheets object
       console.log(data);
     });

####deleteDiscussion
[back to TOC](#table-of-contents)
#####Example using promises

     var options = {
        id: sheetsId
     }
     smartsheet.sheets.deleteDiscussion(options)
     .then(function(data) {
       // Data will contain the sheets object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     var options = {
        id: sheetsId
     }
     smartsheet.sheets.deleteDiscussion(options, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the sheets object
       console.log(data);
     });

####getSheet
[back to TOC](#table-of-contents)
#####Example using promises

     smartsheet.sheets.getSheet({id: sheetsId})
     .then(function(data) {
       // Data will contain the sheets object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     smartsheet.sheets.getSheet({id: sheetsId}, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the sheets object
       console.log(data);
     });

####listSheets
[back to TOC](#table-of-contents)
#####Example using promises

     smartsheet.sheets.listSheets({})
     .then(function(data) {
       // Data will contain the sheets object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     smartsheet.sheets.listSheets({}, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the sheets object
       console.log(data);
     });

####getSheetAsCSV
[back to TOC](#table-of-contents)
#####Example using promises

     smartsheet.sheets.getSheetAsCSV({id: sheetsId})
     .then(function(data) {
       // Data will contain the sheets object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     smartsheet.sheets.getSheetAsCSV({id: sheetsId}, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the sheets object
       console.log(data);
     });

####getSheetAsExcel
[back to TOC](#table-of-contents)
#####Example using promises

     smartsheet.sheets.getSheetAsExcel({id: sheetsId})
     .then(function(data) {
       // Data will contain the sheets object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     smartsheet.sheets.getSheetAsExcel({id: sheetsId}, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the sheets object
       console.log(data);
     });

####getSheetAsPDF
[back to TOC](#table-of-contents)
#####Example using promises

     smartsheet.sheets.getSheetAsPDF({id: sheetsId})
     .then(function(data) {
       // Data will contain the sheets object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     smartsheet.sheets.getSheetAsPDF({id: sheetsId}, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the sheets object
       console.log(data);
     });

####getSheetVersion
[back to TOC](#table-of-contents)
#####Example using promises

     smartsheet.sheets.getSheetVersion({id: sheetsId})
     .then(function(data) {
       // Data will contain the sheets object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     smartsheet.sheets.getSheetVersion({id: sheetsId}, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the sheets object
       console.log(data);
     });

####listOrganizationSheets
[back to TOC](#table-of-contents)
#####Example using promises

     smartsheet.sheets.listOrganizationSheets({})
     .then(function(data) {
       // Data will contain the sheets object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     smartsheet.sheets.listOrganizationSheets({}, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the sheets object
       console.log(data);
     });

####getRow
[back to TOC](#table-of-contents)
#####Example using promises

     smartsheet.sheets.getRow({id: sheetsId})
     .then(function(data) {
       // Data will contain the sheets object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     smartsheet.sheets.getRow({id: sheetsId}, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the sheets object
       console.log(data);
     });

####getRowAttachments
[back to TOC](#table-of-contents)
#####Example using promises

     smartsheet.sheets.getRowAttachments({})
     .then(function(data) {
       // Data will contain the sheets object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     smartsheet.sheets.getRowAttachments({}, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the sheets object
       console.log(data);
     });

####getRowDiscussions
[back to TOC](#table-of-contents)
#####Example using promises

     smartsheet.sheets.getRowDiscussions({})
     .then(function(data) {
       // Data will contain the sheets object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     smartsheet.sheets.getRowDiscussions({}, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the sheets object
       console.log(data);
     });

####getCellHistory
[back to TOC](#table-of-contents)
#####Example using promises

     smartsheet.sheets.getCellHistory({id: sheetsId})
     .then(function(data) {
       // Data will contain the sheets object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     smartsheet.sheets.getCellHistory({id: sheetsId}, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the sheets object
       console.log(data);
     });

####copyRowToAnotherSheet
[back to TOC](#table-of-contents)
#####Example using promises

     smartsheet.sheets.copyRowToAnotherSheet({id: sheetsId})
     .then(function(data) {
       // Data will contain the sheets object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     smartsheet.sheets.copyRowToAnotherSheet({id: sheetsId}, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the sheets object
       console.log(data);
     });

####moveRowToAnotherSheet
[back to TOC](#table-of-contents)
#####Example using promises

     smartsheet.sheets.moveRowToAnotherSheet({id: sheetsId})
     .then(function(data) {
       // Data will contain the sheets object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     smartsheet.sheets.moveRowToAnotherSheet({id: sheetsId}, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the sheets object
       console.log(data);
     });

####addRow
[back to TOC](#table-of-contents)
#####Example using promises

     var options = {
        body: {
         //body of request to send for sheets API in documentation linked above
        },
        queryParameters: {
         //optional, found in the documentation linked above.
        }
     };
     smartsheet.sheets.addRow(options)
     .then(function(data) {
       // Data will contain the sheets object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     var options = {
        body: {
         //body of request to send for sheets API in documentation linked above
        },
        queryParameters: {
         //optional, found in the documentation linked above.
        }
     };
     smartsheet.sheets.addRow(options, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the sheets object
       console.log(data);
     });

####addRows
[back to TOC](#table-of-contents)
#####Example using promises

     var options = {
        body: {
         //body of request to send for sheets API in documentation linked above
        },
        queryParameters: {
         //optional, found in the documentation linked above.
        }
     };
     smartsheet.sheets.addRows(options)
     .then(function(data) {
       // Data will contain the sheets object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     var options = {
        body: {
         //body of request to send for sheets API in documentation linked above
        },
        queryParameters: {
         //optional, found in the documentation linked above.
        }
     };
     smartsheet.sheets.addRows(options, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the sheets object
       console.log(data);
     });

####addRowAttachment
[back to TOC](#table-of-contents)
#####Example using promises

     var options = {
        body: {
         //body of request to send for sheets API in documentation linked above
        },
        queryParameters: {
         //optional, found in the documentation linked above.
        }
     };
     smartsheet.sheets.addRowAttachment(options)
     .then(function(data) {
       // Data will contain the sheets object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     var options = {
        body: {
         //body of request to send for sheets API in documentation linked above
        },
        queryParameters: {
         //optional, found in the documentation linked above.
        }
     };
     smartsheet.sheets.addRowAttachment(options, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the sheets object
       console.log(data);
     });

####createRowDiscussion
[back to TOC](#table-of-contents)
#####Example using promises

     var options = {
        body: {
         //body of request to send for sheets API in documentation linked above
        },
        queryParameters: {
         //optional, found in the documentation linked above.
        }
     };
     smartsheet.sheets.createRowDiscussion(options)
     .then(function(data) {
       // Data will contain the sheets object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     var options = {
        body: {
         //body of request to send for sheets API in documentation linked above
        },
        queryParameters: {
         //optional, found in the documentation linked above.
        }
     };
     smartsheet.sheets.createRowDiscussion(options, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the sheets object
       console.log(data);
     });

####sendRow
[back to TOC](#table-of-contents)
#####Example using promises

     smartsheet.sheets.sendRow({id: sheetsId})
     .then(function(data) {
       // Data will contain the sheets object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     smartsheet.sheets.sendRow({id: sheetsId}, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the sheets object
       console.log(data);
     });

####deleteRow
[back to TOC](#table-of-contents)
#####Example using promises

     var options = {
        id: sheetsId
     }
     smartsheet.sheets.deleteRow(options)
     .then(function(data) {
       // Data will contain the sheets object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     var options = {
        id: sheetsId
     }
     smartsheet.sheets.deleteRow(options, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the sheets object
       console.log(data);
     });

####updateRow
[back to TOC](#table-of-contents)
#####Example using promises

     var options = {
        id: sheetsId,
        body: {
         //body of request to send for sheets API in documentation linked above
        },
        queryParameters: {
         //optional, found in the documentation linked above.
        }
     };
     smartsheet.sheets.updateRow(options)
     .then(function(data) {
       // Data will contain the sheets object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     var options = {
        id: sheetsId,
        body: {
         //body of request to send for sheets API in documentation linked above
        },
        queryParameters: {
         //optional, found in the documentation linked above.
        }
     };
     smartsheet.sheets.updateRow(options, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the sheets object
       console.log(data);
     });

####getShare
[back to TOC](#table-of-contents)
#####Example using promises

     smartsheet.sheets.getShare({id: sheetsId})
     .then(function(data) {
       // Data will contain the sheets object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     smartsheet.sheets.getShare({id: sheetsId}, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the sheets object
       console.log(data);
     });

####listShares
[back to TOC](#table-of-contents)
#####Example using promises

     smartsheet.sheets.listShares({})
     .then(function(data) {
       // Data will contain the sheets object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     smartsheet.sheets.listShares({}, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the sheets object
       console.log(data);
     });

####share
[back to TOC](#table-of-contents)
#####Example using promises

     smartsheet.sheets.share({id: sheetsId})
     .then(function(data) {
       // Data will contain the sheets object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     smartsheet.sheets.share({id: sheetsId}, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the sheets object
       console.log(data);
     });

####deleteShare
[back to TOC](#table-of-contents)
#####Example using promises

     var options = {
        id: sheetsId
     }
     smartsheet.sheets.deleteShare(options)
     .then(function(data) {
       // Data will contain the sheets object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     var options = {
        id: sheetsId
     }
     smartsheet.sheets.deleteShare(options, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the sheets object
       console.log(data);
     });

####updateShare
[back to TOC](#table-of-contents)
#####Example using promises

     var options = {
        id: sheetsId,
        body: {
         //body of request to send for sheets API in documentation linked above
        },
        queryParameters: {
         //optional, found in the documentation linked above.
        }
     };
     smartsheet.sheets.updateShare(options)
     .then(function(data) {
       // Data will contain the sheets object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     var options = {
        id: sheetsId,
        body: {
         //body of request to send for sheets API in documentation linked above
        },
        queryParameters: {
         //optional, found in the documentation linked above.
        }
     };
     smartsheet.sheets.updateShare(options, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the sheets object
       console.log(data);
     });

###Template API methods

####listUserCreatedTemplates
[back to TOC](#table-of-contents)
#####Example using promises

     smartsheet.templates.listUserCreatedTemplates({})
     .then(function(data) {
       // Data will contain the templates object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     smartsheet.templates.listUserCreatedTemplates({}, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the templates object
       console.log(data);
     });

####listPublicTemplates
[back to TOC](#table-of-contents)
#####Example using promises

     smartsheet.templates.listPublicTemplates({})
     .then(function(data) {
       // Data will contain the templates object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     smartsheet.templates.listPublicTemplates({}, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the templates object
       console.log(data);
     });

###User API methods

####getUser
[back to TOC](#table-of-contents)
#####Example using promises

     smartsheet.users.getUser({id: usersId})
     .then(function(data) {
       // Data will contain the users object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     smartsheet.users.getUser({id: usersId}, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the users object
       console.log(data);
     });

####listAllUsers
[back to TOC](#table-of-contents)
#####Example using promises

     smartsheet.users.listAllUsers({})
     .then(function(data) {
       // Data will contain the users object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     smartsheet.users.listAllUsers({}, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the users object
       console.log(data);
     });

####getCurrentUser
[back to TOC](#table-of-contents)
#####Example using promises

     smartsheet.users.getCurrentUser({id: usersId})
     .then(function(data) {
       // Data will contain the users object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     smartsheet.users.getCurrentUser({id: usersId}, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the users object
       console.log(data);
     });

####addUser
[back to TOC](#table-of-contents)
#####Example using promises

     var options = {
        body: {
         //body of request to send for users API in documentation linked above
        },
        queryParameters: {
         //optional, found in the documentation linked above.
        }
     };
     smartsheet.users.addUser(options)
     .then(function(data) {
       // Data will contain the users object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     var options = {
        body: {
         //body of request to send for users API in documentation linked above
        },
        queryParameters: {
         //optional, found in the documentation linked above.
        }
     };
     smartsheet.users.addUser(options, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the users object
       console.log(data);
     });

####addUserAndSendEmail
[back to TOC](#table-of-contents)
#####Example using promises

     var options = {
        body: {
         //body of request to send for users API in documentation linked above
        },
        queryParameters: {
         //optional, found in the documentation linked above.
        }
     };
     smartsheet.users.addUserAndSendEmail(options)
     .then(function(data) {
       // Data will contain the users object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     var options = {
        body: {
         //body of request to send for users API in documentation linked above
        },
        queryParameters: {
         //optional, found in the documentation linked above.
        }
     };
     smartsheet.users.addUserAndSendEmail(options, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the users object
       console.log(data);
     });

####updateUser
[back to TOC](#table-of-contents)
#####Example using promises

     var options = {
        id: usersId,
        body: {
         //body of request to send for users API in documentation linked above
        },
        queryParameters: {
         //optional, found in the documentation linked above.
        }
     };
     smartsheet.users.updateUser(options)
     .then(function(data) {
       // Data will contain the users object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     var options = {
        id: usersId,
        body: {
         //body of request to send for users API in documentation linked above
        },
        queryParameters: {
         //optional, found in the documentation linked above.
        }
     };
     smartsheet.users.updateUser(options, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the users object
       console.log(data);
     });

####removeUser
[back to TOC](#table-of-contents)
#####Example using promises

     smartsheet.users.removeUser({id: usersId})
     .then(function(data) {
       // Data will contain the users object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     smartsheet.users.removeUser({id: usersId}, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the users object
       console.log(data);
     });

###Workspace API methods

####listWorkspaces
[back to TOC](#table-of-contents)
#####Example using promises

     smartsheet.workspaces.listWorkspaces({})
     .then(function(data) {
       // Data will contain the workspaces object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     smartsheet.workspaces.listWorkspaces({}, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the workspaces object
       console.log(data);
     });

####getWorkspace
[back to TOC](#table-of-contents)
#####Example using promises

     smartsheet.workspaces.getWorkspace({id: workspacesId})
     .then(function(data) {
       // Data will contain the workspaces object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     smartsheet.workspaces.getWorkspace({id: workspacesId}, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the workspaces object
       console.log(data);
     });

####listWorkspaceFolders
[back to TOC](#table-of-contents)
#####Example using promises

     smartsheet.workspaces.listWorkspaceFolders({})
     .then(function(data) {
       // Data will contain the workspaces object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     smartsheet.workspaces.listWorkspaceFolders({}, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the workspaces object
       console.log(data);
     });

####createWorkspace
[back to TOC](#table-of-contents)
#####Example using promises

     var options = {
        body: {
         //body of request to send for workspaces API in documentation linked above
        },
        queryParameters: {
         //optional, found in the documentation linked above.
        }
     };
     smartsheet.workspaces.createWorkspace(options)
     .then(function(data) {
       // Data will contain the workspaces object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     var options = {
        body: {
         //body of request to send for workspaces API in documentation linked above
        },
        queryParameters: {
         //optional, found in the documentation linked above.
        }
     };
     smartsheet.workspaces.createWorkspace(options, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the workspaces object
       console.log(data);
     });

####createFolder
[back to TOC](#table-of-contents)
#####Example using promises

     var options = {
        body: {
         //body of request to send for workspaces API in documentation linked above
        },
        queryParameters: {
         //optional, found in the documentation linked above.
        }
     };
     smartsheet.workspaces.createFolder(options)
     .then(function(data) {
       // Data will contain the workspaces object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     var options = {
        body: {
         //body of request to send for workspaces API in documentation linked above
        },
        queryParameters: {
         //optional, found in the documentation linked above.
        }
     };
     smartsheet.workspaces.createFolder(options, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the workspaces object
       console.log(data);
     });

####deleteWorkspace
[back to TOC](#table-of-contents)
#####Example using promises

     var options = {
        id: workspacesId
     }
     smartsheet.workspaces.deleteWorkspace(options)
     .then(function(data) {
       // Data will contain the workspaces object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     var options = {
        id: workspacesId
     }
     smartsheet.workspaces.deleteWorkspace(options, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the workspaces object
       console.log(data);
     });

####updateWorkspace
[back to TOC](#table-of-contents)
#####Example using promises

     var options = {
        id: workspacesId,
        body: {
         //body of request to send for workspaces API in documentation linked above
        },
        queryParameters: {
         //optional, found in the documentation linked above.
        }
     };
     smartsheet.workspaces.updateWorkspace(options)
     .then(function(data) {
       // Data will contain the workspaces object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     var options = {
        id: workspacesId,
        body: {
         //body of request to send for workspaces API in documentation linked above
        },
        queryParameters: {
         //optional, found in the documentation linked above.
        }
     };
     smartsheet.workspaces.updateWorkspace(options, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the workspaces object
       console.log(data);
     });

####getShare
[back to TOC](#table-of-contents)
#####Example using promises

     smartsheet.workspaces.getShare({id: workspacesId})
     .then(function(data) {
       // Data will contain the workspaces object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     smartsheet.workspaces.getShare({id: workspacesId}, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the workspaces object
       console.log(data);
     });

####listShares
[back to TOC](#table-of-contents)
#####Example using promises

     smartsheet.workspaces.listShares({})
     .then(function(data) {
       // Data will contain the workspaces object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     smartsheet.workspaces.listShares({}, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the workspaces object
       console.log(data);
     });

####share
[back to TOC](#table-of-contents)
#####Example using promises

     smartsheet.workspaces.share({id: workspacesId})
     .then(function(data) {
       // Data will contain the workspaces object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     smartsheet.workspaces.share({id: workspacesId}, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the workspaces object
       console.log(data);
     });

####deleteShare
[back to TOC](#table-of-contents)
#####Example using promises

     var options = {
        id: workspacesId
     }
     smartsheet.workspaces.deleteShare(options)
     .then(function(data) {
       // Data will contain the workspaces object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     var options = {
        id: workspacesId
     }
     smartsheet.workspaces.deleteShare(options, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the workspaces object
       console.log(data);
     });

####updateShare
[back to TOC](#table-of-contents)
#####Example using promises

     var options = {
        id: workspacesId,
        body: {
         //body of request to send for workspaces API in documentation linked above
        },
        queryParameters: {
         //optional, found in the documentation linked above.
        }
     };
     smartsheet.workspaces.updateShare(options)
     .then(function(data) {
       // Data will contain the workspaces object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     var options = {
        id: workspacesId,
        body: {
         //body of request to send for workspaces API in documentation linked above
        },
        queryParameters: {
         //optional, found in the documentation linked above.
        }
     };
     smartsheet.workspaces.updateShare(options, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the workspaces object
       console.log(data);
     });


#License

Copyright 2015 [Smartsheet](www.smartsheet.com)

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0
Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
