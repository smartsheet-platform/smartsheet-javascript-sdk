var client = require('../');
var fs = require('fs');
var _ = require('underscore');
// var test = require('../lib/utils/httpUtils');




//var options = {
//  url:'/2.0/home',
//  accessToken:''
//};




var smartsheet = client.createClient({accessToken:process.env.SMARTSHEET_ACCESS_TOKEN});
//var smartsheet = client.createClient({accessToken:''});
var sheetId = 1903344856917892;

var favorites = smartsheet.favorites;
//
// console.log(smartsheet);

 //smartsheet.home.listContents()
 //smartsheet.sheets.listSheets()
 //smartsheet.sheets.copyRowToAnotherSheet({sheetId:sheetId, body:{rowIds:[7318413333817220], to:{sheetId:sheetId}}})
 //smartsheet.sheets.moveRowToAnotherSheet({sheetId:sheetId, body:{rowIds:[7318413333817220], to:{sheetId:sheetId}}})
  //smartsheet.reports.getReportAsExcel({id:4503842059511684})
//  smartsheet.reports.listReports()
 smartsheet.sheets.getSheetVersion({sheetId: sheetId})
   .then(function(version) {
    console.log(version);
     smartsheet.sheets.getSheet({sheetId: sheetId})
       .then(function(sheet) {
        console.log(sheet);
      })
      .catch(function(error) {
        console.log('I AM AN ERROR getting sheetversion inside!!!');
        console.log(error);
      });

  })
  .catch(function(error) {
    console.log('I AM AN ERROR!!!');
    console.log(error);
  });

// smartsheet.favorites.addSheetToFavorites({objectId:2191630309582724})
//   .then(function(data) {
//     console.log(data)
//   })
//   .catch(function(error) {
//     console.log(error)
//     })

// var options = {
//   queryParameters : {
//     include : 'reports,templates'
//   }
// }
//
// smartsheet.home.listContents()
// .then(function(data) {
//   console.log(data)
//   })

//
// smartsheet.sheets.getColumns({sheetId:2191630309582724})
// .then(function(data) {
//   console.log(data);
// })
//
// smartsheet.favorites.listFavorites().then(function(data) {console.log(data)});
// var options = {
//   queryParameters : {
//     objectIds:'6932724448552836'
//   }
// };
//
//
// smartsheet.favorites.removeReportsFromFavorites(options)
//   .then(function(data) {
//     console.log(data)
//   })
//   .catch(function(error) {
//     console.log(error)
//     })

// {objectId:2191630309582724,1427091771156356}


// smartsheet.favorites.addItemsToFavorites({body: [{type: 'sheet', objectId:2191630309582724},{type:'sheet', objectId:1427091771156356}]})
// .then(function(data) {
  // console.log(data);
// })


//for (var api in smartsheet) {
//  var list = [];
//  for (var method in smartsheet[api]) {
//    list.push(method);
//  }
//  list.sort();
//  for (var name in list) {
//    // console.log('smartsheet.'+api+'.'+list[name]+'');
//    console.log('smartsheet.sheets.should.have.property(\''+list[name]+'\');')
//  }
//  console.log('');
//}

//smartsheet.
//sheetId:2191630309582724, columnId:6442353301972868

//shareId:'AAAN_vmWFOeE'
//smartsheet.sheets.listShares({sheetId: 2191630309582724})
//.then(function(data) {
//  console.log(data);
//});

//smartsheet.workspaces.listWorkspaces()
//  .then(function(data) {
//    console.log(data);
//  });

//smartsheet.workspaces.listShares({workspaceId:1204158339540868})
//  .then(function(data) {
//    console.log(data);
//  });
//smartsheet.sheets.getSheets()
//  .then(function(data) {
//    console.log(data);
//  })
//smartsheet.users.getCurrentUser()
//  .then(function(data) {
//    console.log(data);
//  })


//
//console.log();
//
//fs.readFile('./samples/test.docx', function(err, data) {
//  var fileStats = fs.statSync('./samples/test.docx');
//  var options = {
//    contentType : 'application/msword',
//    fileName:'test.docx',
//    fileSize:fileStats.size,
//    body: data,
//    sheetId:2191630309582724
//  };
//  if (err) console.log(err);
//  smartsheet.sheets.uploadAttachment(options)
//	.then(function(data) {
//		console.log(data);
//	})
//	.catch(function(error) {
//		console.log(error);
//	})
//});

//smartsheet.sheets.getAttachments({sheetId:})
//  .then(function(data) {
//    console.log(data);
//  }).catch(function(error) {
//    console.log(error);
//  });

//var user = {
//  firstName: 'User',
//  lastName: 'Random',
//  email: 'Sample
//  admin: false,
//  licensedSheetCreator: true
//};
//
//smartsheet.users.createUserAndSendEmail({body:user})
//  .then(function(data) {
//    console.log(data)
//  }).catch(function(error) {
//    console.log(error);
//  });
//var user = {
//  firstName: 'Sean',
//  lastName: 'Gagne',
//  email: '2au+smartsheetCreateUserApi@gmail.com',
//  admin: false,
//  licensedSheetCreator: true
//};
//
//smartsheet.users.createUser({body:user})
//  .then(function(data) {
//    console.log(data)
//  }).catch(function(error) {
//    console.log(error);
//  });
//
//
//smartsheet.users.getUsers()
//  .then(function(data) {
//    console.log(data)
//  }).catch(function(error) {
//    console.log(error);
//  });


//
//smartsheet.search.searchAll({query:'cat'})
//.then(function(data) {
//  console.log(data)
//})
//.catch(function(error) {
//  console.log(error);
//});

//smartsheet.search.searchSheet({query:'Cats', sheetId:})
//.then(function(data) {
//  console.log(data)
//})
//.catch(function(error) {
//  console.log(error);
//});


//smartsheet.server.getInfo()
//  .then(function(data) {
//    console.log(data);
//  })
//  .catch(function(error) {
//    console.log(error);
//  })


//console.log(fs.statSync('./samples/Workbook1.xlsx'));
//
//fs.readFile('./samples/Workbook1.xlsx','utf8', function(err, data) {
//	if (err) console.log(err);
//	smartsheet.folders.importExcelToFolder({folderId:4242123194165124, body:data})
//	.then(function(data) {
//		console.log(data);
//	})
//	.catch(function(error) {
//		console.log(error);
//	})
//})

 //smartsheet.home.getHome()
 // .then(function(home) {
 //   console.log(home);
 // }).catch(function(error) {
 //   console.log(error);
 // });



// var options2 = {
//  queryParameters: {
//    objectIds:"5088575348860804, 4525625395439492"
//  }
// };

// smartsheet.favorites.deleteFavoriteFolder(options2)
// .then(function(data) {
// 	console.log(data);
// })
// .catch(function(error) {
// 	console.log(error);
// })



// smartsheet.favorites.deleteFavoriteFolder({objectId:1849585892124548})
// .then(function(data) {
//   console.log(data);
// }).catch(function(error) {
//   console.log(error);
// });

// smartsheet.favorites.deleteFavoriteFolder({objectId:1849585892124548})
 // .then(function(data) {
   // console.log(data);
 // }).catch(function(error) {
     // console.log(error);
 // });

//smartsheet.home.createHomeFolder({body:{name:'New API folder'}})
//.then(function(data) {
//  console.log(data);
//}).catch(function(error) {
//  console.log(error);
//});



// smartsheet.home.getHome()
//  .then(function(home) {
//    console.log(home);
//  }).catch(function(error) {
//    console.log(error);
//  });
//
//smartsheet.home.getHome(null, function(err, home) {
//  if (err) {
//    console.log(err);
//  }
//  console.log(home);
//});



// 
// smartsheet.sheets.getSheets()
// .then(function(sheets) {
//    var multipleSheets = [];
//    for (i = 0; i < sheets.data.length; i ++) {
//      multipleSheets.push(smartsheet.sheets.getSheet({objectId:sheets.data[i].id}));
//    }
//    Promise.all(multipleSheets)
//      .then(function(data) {
//        console.log('data', data);
//      })
//      .catch(function(error) {
//        console.log('error', error);
//      })
// }).catch(function(error) {
//    console.log('error', error);
//  });



//Attach methods to the responses
//nice to have
//smartsheet.sheets.getSheets()
//.then(function(sheetSummary) {
//    console.log(sheetSummary);
//    var deletes = [];
//    for (i = 0; i < data.data.length; i++) {
//      deletes.push(smartsheet.sheets.deleteSheet({objectId:data.data[i].id}))
//    }
//    Promise.all(deletes).then(function() {
//      console.log('all sheets deleted')
//    });
//    console.log('all deleted');
    //return sheetSummary[0].deleteSheet();
    //return smartsheet.sheets.deleteSheet({objectId:data.sheetSummary[0].id});
//}).then(function(data) {
//  console.log(data);
//}).catch(function(error) {
//});
//
//
//smartsheet.sheets.deleteSheet({objectId:5832688834766724})
//.then(function(data) {
//  console.log(data);
//})
//.catch(function(error) {
//  console.log(error);
//});

//smartsheet.sheets.createSheet({body: smartsheet.constants.sheet})
//.then(function(data) {
//  console.log('sheet created', data);
//})
//.catch(function(error) {
//  console.log('sheet error', error);
//});
//
//smartsheet.sheets.createSheet({body: smartsheet.constants.sheet}, function(err, data) {
//  if (err) {
//    console.log(err);
//  }
//  console.log(data);
//});

//smartsheet.sheets.createSheetInWorkspace({workspaceId: })
//.then(function(data) {
//  console.log('sheet created', data);
//})
//.catch(function(error) {
//  console.log('sheet error', error);
//});

//smartsheet.sheets.deleteSheet({objectId:})
//.then(function(data) {
//  console.log(data);
//})
//.catch(function(error) {
//  console.log(error);
//});

//smartsheet.sheets.getSheets()
//.then(function(data) {
//  return smartsheet.sheets.getSheetAsExcel({objectId: data.data[0].id})
//})
//.then(function(sheet) {
//  console.log('I am sheet', sheet)
//})
//.catch(function(error) {
//  console.log('I am SHEET ERROR', error);
//});


//var getSheetId = function() {
//  smartsheet.sheets.getSheets()
//    .then(function(data) {
//      return smartsheet.sheets.getSheetAsPDF({objectId: data.data[0].id})
//    })
//    .then(function(sheet) {
//      console.log('yay');
//      console.log('I am sheet', sheet)
//    })
//    .catch(function(error) {
//      //console.log('I am SHEET ERROR', error);
//    })
//};

//smartsheet.sheets.getSheets()
//.then(function(data) {
//  return smartsheet.sheets.getSheet({objectId: data.data[0].id})
//})
//.then(function(sheet) {
//    console.log('I am sheet', sheet)
//})
//.catch(function(error) {
//  console.log('I am SHEET ERROR', error);
//});


//var getSheetIdCallbacks = function() {
//  smartsheet.sheets.getSheets(null, function(err, data) {
//    if (err) {
//      console.log(err);
//    } else {
//      smartsheet.sheets.getSheet({objectId: data.data[0].id}, function(err, data) {
//        if (err) {
//          console.log(err);
//        } else {
//          console.log(data);
//        }
//      })
//    }
//  });
//};



//var smartsheet = client.createClient({accessToken:''});
//
//smartsheet.sheets.getSheets()
//.then(function(data) {
//  console.log(data);
//});


//smartsheet.sheets.getSheets()
//.then(function(data) {
//  return data;
//})
//.then(smartsheet.sheets.getSheet(data[0]))
//.then(function(data2) {
//})
//.catch(function(error) {
//  console.log(error)
//});

//smartsheet.sheets.getSheet({objectId : ''})
//.then(function(data) {
//  console.log(data);
//}).catch(function(error) {
//  console.log(error)
//});

//smartsheet.sheets.getSheets(null, function(err, data) {
//  if (err) {
//    console.log('I am callback error', err);
//  }
//  console.log('I am callback data', data);
//});

//var options = {
//  url:'https://api.smartsheet.com/2.0/favorites',
//  accessToken:''
//};
//
//smartsheet.get(options)
//.then(function(data) {
//  console.log(data);
//})
//.error(function(error) {
//  console.log(error);
//});
//
//smartsheet.get(options, function(err, data) {
//  if (err) {
//    console.log('I am callback error', err);
//  }
//  console.log('I am callback data', data);
//});

//var options1 = {
//  url:'https://api.smartsheet.com/2.0/favorites',
//  accessToken:'',
//  body: [{"type": "sheet", "objectId": }]
//};
//
//smartsheet.post(options1)
//.then(function(data) {
//  console.log(data);
//})
//.catch(function(error) {
//  console.log(error)
//});
//
//smartsheet.post(options1, function(err, data) {
//  if (err) {
//    console.log(err);
//  }
//  console.log('POST Callback Data', data)
//});

//DELETE SINGLE
// var options2 = {
//  url:'2.0/favorites/',
//  accessToken:'',
//  objectId:5088575348860804,
//  type:'folder'
// };

// test.delete(options2)
//    .then(function(data) {
//      console.log(data);
//    })
//    .error(function(error) {
//      console.log(error)
//    });
//
//smartsheet.delete(options2, function(err, data) {
//  if (err) {
//    console.log(err);
//  }
//  console.log('Delete Callback Data', data)
//});

//DELETE BULK
// var options2 = {
//  url:'2.0/favorites/folder',
//  accessToken:'',
//  queryParameters: {
//    objectIds:'5088575348860804,4525625395439492'
//  }
// };

// test.delete(options2)
//    .then(function(data) {
//      console.log(data);
//    })
//    .error(function(error) {
//      console.log(error)
//    });
//
//smartsheet.delete(options2, function(err, data) {
//  if (err) {
//    console.log(err);
//  }
//  console.log('Delete Callback Data', data)
//});


//var optionsPUT = {
//  url:'https://api.smartsheet.com/2.0/',
//  accessToken:''
//};
//
//smartsheet.get(optionsPUT)
//.then(function(data) {
//  console.log(data);
//})
//.error(function(error) {
//  console.log(error);
//});

//smartsheet.put(optionsPUT, function(err, data) {
//  if (err) {
//    console.log(err);
//  }
//  console.log('Update callback data', data);
//});
