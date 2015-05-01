# Smartsheet SDK for JavaScript

**Please not the initial version of the SDK is Pre-Alpha because there can be breaking changes**

[Smartsheet Platform](http://smartsheet.com/developers) extends the the power of [Smartsheet](http://www.smartsheet.com).
Check out the [documentation](http://www.smartsheet.com/developers/api-documentation) for a more detailed API reference
along with the request and response examples for all available methods. Have any questions? Check out our tag on our
[Stackoverflow](http://stackoverflow.com/questions/tagged/smartsheet-api).

## Installation

    npm install smartsheet


## Documentation

The documentation for the APIs can be [found here](http://www.smartsheet.com/developers/api-documentation). If you
need to know what the format of the request needs to be check here!

## Usage

All APIs are exposed inside the root module that is created using the following:

    var client = require('smartsheet');
    var smartsheet = client.create({accessToken:'ACCESSTOKEN'});
    eg..
    smartsheet.sheets //contains methods to create, get, update and delete sheets.

The smartsheet variable now contains access to all the APIs [found here](http://www.smartsheet.com/developers/api-documentation).

## Unit Tests

Inside the /test folder there are unit tests that can be run. These are helpful if you would like to expand/change and
make a pull request. To use these run the following command in the root directory after you clone the repository.

    npm test

## Contributing

If you would like to contribute a change to the SDK, please fork a branch and then submit a pull request.
[More info here.](https://help.github.com/articles/using-pull-requests)

## SDK Documentation

### Table of Contents

#### [Sheet Methods](#sheet-methods)

- [Create Sheet](#create-sheet)

### Examples of Method calls


###Favorite API methods

####createFavorite
#####Example using promises

     var options = {
        body: {
         //body of request to send for favorites API in documentation linked above
        },
        queryParameters: {
         //optional, found in the documentation linked above.
        }
     };
     smartsheet.favorites.createFavorite(options)
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
     smartsheet.favorites.createFavorite(options, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the favorites object
       console.log(data);
     });

####getFavorites
#####Example using promises

     smartsheet.favorites.getFavorites({})
     .then(function(data) {
       // Data will contain the favorites object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     smartsheet.favorites.getFavorites({}, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the favorites object
       console.log(data);
     });

####deleteFavoriteSheet
#####Example using promises

     var options = {
        id: favoritesId
     }
     smartsheet.favorites.deleteFavoriteSheet(options)
     .then(function(data) {
       // Data will contain the favorites object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     var options = {
        id: favoritesId
     }
     smartsheet.favorites.deleteFavoriteSheet(options, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the favorites object
       console.log(data);
     });

####deleteFavoriteFolder
#####Example using promises

     var options = {
        id: favoritesId
     }
     smartsheet.favorites.deleteFavoriteFolder(options)
     .then(function(data) {
       // Data will contain the favorites object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     var options = {
        id: favoritesId
     }
     smartsheet.favorites.deleteFavoriteFolder(options, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the favorites object
       console.log(data);
     });

####deleteFavoriteReport
#####Example using promises

     var options = {
        id: favoritesId
     }
     smartsheet.favorites.deleteFavoriteReport(options)
     .then(function(data) {
       // Data will contain the favorites object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     var options = {
        id: favoritesId
     }
     smartsheet.favorites.deleteFavoriteReport(options, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the favorites object
       console.log(data);
     });

####deleteFavoriteTemplate
#####Example using promises

     var options = {
        id: favoritesId
     }
     smartsheet.favorites.deleteFavoriteTemplate(options)
     .then(function(data) {
       // Data will contain the favorites object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     var options = {
        id: favoritesId
     }
     smartsheet.favorites.deleteFavoriteTemplate(options, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the favorites object
       console.log(data);
     });

####deleteFavoriteWorkspace
#####Example using promises

     var options = {
        id: favoritesId
     }
     smartsheet.favorites.deleteFavoriteWorkspace(options)
     .then(function(data) {
       // Data will contain the favorites object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     var options = {
        id: favoritesId
     }
     smartsheet.favorites.deleteFavoriteWorkspace(options, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the favorites object
       console.log(data);
     });

###Folder API methods

####getFolder
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

####deleteFolders
#####Example using promises

     var options = {
        id: foldersId
     }
     smartsheet.folders.deleteFolders(options)
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
     smartsheet.folders.deleteFolders(options, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the folders object
       console.log(data);
     });

###Group API methods

####getGroups
#####Example using promises

     smartsheet.groups.getGroups({})
     .then(function(data) {
       // Data will contain the groups object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     smartsheet.groups.getGroups({}, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the groups object
       console.log(data);
     });

####getGroup
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

####createGroupMember
#####Example using promises

     var options = {
        body: {
         //body of request to send for groups API in documentation linked above
        },
        queryParameters: {
         //optional, found in the documentation linked above.
        }
     };
     smartsheet.groups.createGroupMember(options)
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
     smartsheet.groups.createGroupMember(options, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the groups object
       console.log(data);
     });

####updateGroup
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

####getHome
#####Example using promises

     smartsheet.home.getHome({id: homeId})
     .then(function(data) {
       // Data will contain the home object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     smartsheet.home.getHome({id: homeId}, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the home object
       console.log(data);
     });

####getFolders
#####Example using promises

     smartsheet.home.getFolders({})
     .then(function(data) {
       // Data will contain the home object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     smartsheet.home.getFolders({}, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the home object
       console.log(data);
     });

####createHomeFolder
#####Example using promises

     var options = {
        body: {
         //body of request to send for home API in documentation linked above
        },
        queryParameters: {
         //optional, found in the documentation linked above.
        }
     };
     smartsheet.home.createHomeFolder(options)
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
     smartsheet.home.createHomeFolder(options, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the home object
       console.log(data);
     });

###Report API methods

####getReport
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

####getReportShare
#####Example using promises

     smartsheet.reports.getReportShare({id: reportsId})
     .then(function(data) {
       // Data will contain the reports object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     smartsheet.reports.getReportShare({id: reportsId}, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the reports object
       console.log(data);
     });

####getReportShares
#####Example using promises

     smartsheet.reports.getReportShares({})
     .then(function(data) {
       // Data will contain the reports object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     smartsheet.reports.getReportShares({}, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the reports object
       console.log(data);
     });

####sendReportAsEmail
#####Example using promises

     smartsheet.reports.sendReportAsEmail({id: reportsId})
     .then(function(data) {
       // Data will contain the reports object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     smartsheet.reports.sendReportAsEmail({id: reportsId}, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the reports object
       console.log(data);
     });

####shareReportWithGroups
#####Example using promises

     smartsheet.reports.shareReportWithGroups({})
     .then(function(data) {
       // Data will contain the reports object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     smartsheet.reports.shareReportWithGroups({}, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the reports object
       console.log(data);
     });

####shareReportWithGroupsAndSendEmail
#####Example using promises

     smartsheet.reports.shareReportWithGroupsAndSendEmail({id: reportsId})
     .then(function(data) {
       // Data will contain the reports object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     smartsheet.reports.shareReportWithGroupsAndSendEmail({id: reportsId}, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the reports object
       console.log(data);
     });

####updateShareWithGroups
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
     smartsheet.reports.updateShareWithGroups(options)
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
     smartsheet.reports.updateShareWithGroups(options, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the reports object
       console.log(data);
     });

####deleteShareWithGroups
#####Example using promises

     var options = {
        id: reportsId
     }
     smartsheet.reports.deleteShareWithGroups(options)
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
     smartsheet.reports.deleteShareWithGroups(options, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the reports object
       console.log(data);
     });

###Searc API methods

####searchAll
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

####sendSheetAsEmail
#####Example using promises

     smartsheet.sheets.sendSheetAsEmail({id: sheetsId})
     .then(function(data) {
       // Data will contain the sheets object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     smartsheet.sheets.sendSheetAsEmail({id: sheetsId}, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the sheets object
       console.log(data);
     });

####getPublishStatus
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

####getAttachments
#####Example using promises

     smartsheet.sheets.getAttachments({})
     .then(function(data) {
       // Data will contain the sheets object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     smartsheet.sheets.getAttachments({}, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the sheets object
       console.log(data);
     });

####getAttachmentVersion
#####Example using promises

     smartsheet.sheets.getAttachmentVersion({id: sheetsId})
     .then(function(data) {
       // Data will contain the sheets object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     smartsheet.sheets.getAttachmentVersion({id: sheetsId}, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the sheets object
       console.log(data);
     });

####uploadAttachment
#####Example using promises

     smartsheet.sheets.uploadAttachment({id: sheetsId})
     .then(function(data) {
       // Data will contain the sheets object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     smartsheet.sheets.uploadAttachment({id: sheetsId}, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the sheets object
       console.log(data);
     });

####uploadNewAttachmentVersion
#####Example using promises

     smartsheet.sheets.uploadNewAttachmentVersion({id: sheetsId})
     .then(function(data) {
       // Data will contain the sheets object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     smartsheet.sheets.uploadNewAttachmentVersion({id: sheetsId}, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the sheets object
       console.log(data);
     });

####deleteAttachment
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

####deleteAttachmentVersion
#####Example using promises

     var options = {
        id: sheetsId
     }
     smartsheet.sheets.deleteAttachmentVersion(options)
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
     smartsheet.sheets.deleteAttachmentVersion(options, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the sheets object
       console.log(data);
     });

####getColumns
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

####createColumn
#####Example using promises

     var options = {
        body: {
         //body of request to send for sheets API in documentation linked above
        },
        queryParameters: {
         //optional, found in the documentation linked above.
        }
     };
     smartsheet.sheets.createColumn(options)
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
     smartsheet.sheets.createColumn(options, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the sheets object
       console.log(data);
     });

####deleteColumn
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

####createSheet
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

####getDiscussionAttachments
#####Example using promises

     smartsheet.sheets.getDiscussionAttachments({})
     .then(function(data) {
       // Data will contain the sheets object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     smartsheet.sheets.getDiscussionAttachments({}, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the sheets object
       console.log(data);
     });

####createDiscussion
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

####createDiscussionComment
#####Example using promises

     var options = {
        body: {
         //body of request to send for sheets API in documentation linked above
        },
        queryParameters: {
         //optional, found in the documentation linked above.
        }
     };
     smartsheet.sheets.createDiscussionComment(options)
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
     smartsheet.sheets.createDiscussionComment(options, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the sheets object
       console.log(data);
     });

####deleteDiscussion
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

####getSheets
#####Example using promises

     smartsheet.sheets.getSheets({})
     .then(function(data) {
       // Data will contain the sheets object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     smartsheet.sheets.getSheets({}, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the sheets object
       console.log(data);
     });

####getSheet
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

####getSheetAsCsv
#####Example using promises

     smartsheet.sheets.getSheetAsCsv({id: sheetsId})
     .then(function(data) {
       // Data will contain the sheets object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     smartsheet.sheets.getSheetAsCsv({id: sheetsId}, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the sheets object
       console.log(data);
     });

####getSheetAsExcel
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

####getSheetAsPdf
#####Example using promises

     smartsheet.sheets.getSheetAsPdf({id: sheetsId})
     .then(function(data) {
       // Data will contain the sheets object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     smartsheet.sheets.getSheetAsPdf({id: sheetsId}, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the sheets object
       console.log(data);
     });

####getRow
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

####createRow
#####Example using promises

     var options = {
        body: {
         //body of request to send for sheets API in documentation linked above
        },
        queryParameters: {
         //optional, found in the documentation linked above.
        }
     };
     smartsheet.sheets.createRow(options)
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
     smartsheet.sheets.createRow(options, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the sheets object
       console.log(data);
     });

####createRowAttachments
#####Example using promises

     var options = {
        body: {
         //body of request to send for sheets API in documentation linked above
        },
        queryParameters: {
         //optional, found in the documentation linked above.
        }
     };
     smartsheet.sheets.createRowAttachments(options)
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
     smartsheet.sheets.createRowAttachments(options, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the sheets object
       console.log(data);
     });

####createRowDiscussions
#####Example using promises

     var options = {
        body: {
         //body of request to send for sheets API in documentation linked above
        },
        queryParameters: {
         //optional, found in the documentation linked above.
        }
     };
     smartsheet.sheets.createRowDiscussions(options)
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
     smartsheet.sheets.createRowDiscussions(options, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the sheets object
       console.log(data);
     });

####sendRow
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

####getShares
#####Example using promises

     smartsheet.sheets.getShares({})
     .then(function(data) {
       // Data will contain the sheets object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     smartsheet.sheets.getShares({}, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the sheets object
       console.log(data);
     });

####createShare
#####Example using promises

     var options = {
        body: {
         //body of request to send for sheets API in documentation linked above
        },
        queryParameters: {
         //optional, found in the documentation linked above.
        }
     };
     smartsheet.sheets.createShare(options)
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
     smartsheet.sheets.createShare(options, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the sheets object
       console.log(data);
     });

####deleteShare
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

####getTemplates
#####Example using promises

     smartsheet.templates.getTemplates({})
     .then(function(data) {
       // Data will contain the templates object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     smartsheet.templates.getTemplates({}, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the templates object
       console.log(data);
     });

####getPublicTemplates
#####Example using promises

     smartsheet.templates.getPublicTemplates({})
     .then(function(data) {
       // Data will contain the templates object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     smartsheet.templates.getPublicTemplates({}, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the templates object
       console.log(data);
     });

###User API methods

####getUsers
#####Example using promises

     smartsheet.users.getUsers({})
     .then(function(data) {
       // Data will contain the users object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     smartsheet.users.getUsers({}, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the users object
       console.log(data);
     });

####getCurrentUser
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

####getAllUsersSheets
#####Example using promises

     smartsheet.users.getAllUsersSheets({})
     .then(function(data) {
       // Data will contain the users object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     smartsheet.users.getAllUsersSheets({}, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the users object
       console.log(data);
     });

####createUser
#####Example using promises

     var options = {
        body: {
         //body of request to send for users API in documentation linked above
        },
        queryParameters: {
         //optional, found in the documentation linked above.
        }
     };
     smartsheet.users.createUser(options)
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
     smartsheet.users.createUser(options, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the users object
       console.log(data);
     });

####createUserAndSendEmail
#####Example using promises

     var options = {
        body: {
         //body of request to send for users API in documentation linked above
        },
        queryParameters: {
         //optional, found in the documentation linked above.
        }
     };
     smartsheet.users.createUserAndSendEmail(options)
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
     smartsheet.users.createUserAndSendEmail(options, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the users object
       console.log(data);
     });

####updateUser
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

####deleteUser
#####Example using promises

     var options = {
        id: usersId
     }
     smartsheet.users.deleteUser(options)
     .then(function(data) {
       // Data will contain the users object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     var options = {
        id: usersId
     }
     smartsheet.users.deleteUser(options, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the users object
       console.log(data);
     });

###Workspace API methods

####getWorkspaces
#####Example using promises

     smartsheet.workspaces.getWorkspaces({})
     .then(function(data) {
       // Data will contain the workspaces object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     smartsheet.workspaces.getWorkspaces({}, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the workspaces object
       console.log(data);
     });

####getWorkspace
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

####getWorkspaceFolders
#####Example using promises

     smartsheet.workspaces.getWorkspaceFolders({})
     .then(function(data) {
       // Data will contain the workspaces object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     smartsheet.workspaces.getWorkspaceFolders({}, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the workspaces object
       console.log(data);
     });

####createWorkspace
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

####createWorkspaceFolder
#####Example using promises

     var options = {
        body: {
         //body of request to send for workspaces API in documentation linked above
        },
        queryParameters: {
         //optional, found in the documentation linked above.
        }
     };
     smartsheet.workspaces.createWorkspaceFolder(options)
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
     smartsheet.workspaces.createWorkspaceFolder(options, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the workspaces object
       console.log(data);
     });

####deleteWorkspace
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

####getShares
#####Example using promises

     smartsheet.workspaces.getShares({})
     .then(function(data) {
       // Data will contain the workspaces object
     })
     .catch(function(error) {
       // Error will contain the error returned.
     });

#####Example using callbacks

     smartsheet.workspaces.getShares({}, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the workspaces object
       console.log(data);
     });

####createShare
#####Example using promises

     var options = {
        body: {
         //body of request to send for workspaces API in documentation linked above
        },
        queryParameters: {
         //optional, found in the documentation linked above.
        }
     };
     smartsheet.workspaces.createShare(options)
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
     smartsheet.workspaces.createShare(options, function(err, data) {
       if (err) {
         // Error will contain the error returned.
         console.log(err);
       }
       // Data will contain the workspaces object
       console.log(data);
     });

####deleteShare
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
