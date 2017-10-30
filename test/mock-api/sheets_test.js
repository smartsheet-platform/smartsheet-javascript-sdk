var sinon = require('sinon');
var should = require('should');
var assert = require('assert');
var helpers = require('./helpers');
var smartsheet = require('../..');



describe('Mock API SDK Tests', function() {
  var client = smartsheet.createClient({accessToken:'1234'});
  
  beforeEach (function() {
    process.env.SMARTSHEET_API_HOST = "http://localhost:8082/";
  });

  describe('#Sheets', function() {
    var scenarios = [
      {
        "name": "List Sheets - No Params",
        "method": client.sheets.listSheets,
        "shouldError": false,
        "options": {}
      },
      {
        "name": "List Sheets - Include Owner Info",
        "method": client.sheets.listSheets,
        "shouldError": false,
        "options": {
          "queryParameters": {
            "include": "ownerInfo"
          }
        }
      },
      {
        "name": "Create Sheet - Invalid - No Columns",
        "method": client.sheets.createSheet,
        "shouldError": true,
        "options": {
          "body": {
            "name": "New Sheet",
            "columns": []
          }
        }
      },
      {
        "name": "Add Rows - Assign Values - String",
        "method": client.sheets.addRows,
        "shouldError": false,
        "options": {
          "sheetId": 1,
          "body": [
            {
              "cells": [
                {
                  "columnId": 101,
                  "value": "Apple"
                },
                {
                  "columnId": 102,
                  "value": "Red Fruit"
                }
              ]
            },
            {
              "cells": [
                {
                  "columnId": 101,
                  "value": "Banana"
                },
                {
                  "columnId": 102,
                  "value": "Yellow Fruit"
                }
              ]
            }
          ]
        }
      },
      {
        "name": "Add Rows - Assign Values - Int",
        "method": client.sheets.addRows,
        "shouldError": false,
        "options": {
          "sheetId": 1,
          "body": [
            {
              "cells": [
                {
                  "columnId": 101,
                  "value": 100
                },
                {
                  "columnId": 102,
                  "value": "One Hundred"
                }
              ]
            },
            {
              "cells": [
                {
                  "columnId": 101,
                  "value": 2.1
                },
                {
                  "columnId": 102,
                  "value": "Two Point One"
                }
              ]
            }
          ]
        }
      },
      {
        "name": "Add Rows - Assign Values - Bool",
        "method": client.sheets.addRows,
        "shouldError": false,
        "options": {
          "sheetId": 1,
          "body": [
            {
              "cells": [
                {
                  "columnId": 101,
                  "value": true
                },
                {
                  "columnId": 102,
                  "value": "This is True"
                }
              ]
            },
            {
              "cells": [
                {
                  "columnId": 101,
                  "value": false
                },
                {
                  "columnId": 102,
                  "value": "This is False"
                }
              ]
            }
          ]
        }
      },
      {
        "name": "Add Rows - Assign Formulae",
        "method": client.sheets.addRows,
        "shouldError": false,
        "options": {
          "sheetId": 1,
          "body": [
            {
              "cells": [
                {
                  "columnId": 101,
                  "formula": "=SUM([Column2]3, [Column2]4)*2"
                },
                {
                  "columnId": 102,
                  "formula": "=SUM([Column2]3, [Column2]3, [Column2]4)"
                }
              ]
            }
          ]
        }
      },
      {
        "name": "Add Rows - Assign Values - Hyperlink",
        "method": client.sheets.addRows,
        "shouldError": false,
        "options": {
          "sheetId": 1,
          "body": [
            {
              "cells": [
                {
                  "columnId": 101,
                  "value": "Google",
                  "hyperlink": {
                    "url": "http://google.com"
                  }
                },
                {
                  "columnId": 102,
                  "value": "Bing",
                  "hyperlink": {
                    "url": "http://bing.com"
                  }
                }
              ]
            }
          ]
        }
      },
      {
        "name": "Add Rows - Assign Values - Hyperlink SheetID",
        "method": client.sheets.addRows,
        "shouldError": false,
        "options": {
          "sheetId": 1,
          "body": [
            {
              "cells": [
                {
                  "columnId": 101,
                  "value": "Sheet2",
                  "hyperlink": {
                    "sheetId": 2
                  }
                },
                {
                  "columnId": 102,
                  "value": "Sheet3",
                  "hyperlink": {
                    "sheetId": 3
                  }
                }
              ]
            }
          ]
        }
      },
      {
        "name": "Add Rows - Assign Values - Hyperlink ReportID",
        "method": client.sheets.addRows,
        "shouldError": false,
        "options": {
          "sheetId": 1,
          "body": [
            {
              "cells": [
                {
                  "columnId": 101,
                  "value": "Report9",
                  "hyperlink": {
                    "reportId": 9
                  }
                },
                {
                  "columnId": 102,
                  "value": "Report8",
                  "hyperlink": {
                    "reportId": 8
                  }
                }
              ]
            }
          ]
        }
      },
      {
        "name": "Add Rows - Invalid - Assign Value and Formulae",
        "method": client.sheets.addRows,
        "shouldError": true,
        "options": {
          "sheetId": 1,
          "body": [
            {
              "cells": [
                {
                  "columnId": 101,
                  "formula": "=SUM([Column2]3, [Column2]4)*2",
                  "value": "20"
                },
                {
                  "columnId": 102,
                  "formula": "=SUM([Column2]3, [Column2]3, [Column2]4)"
                }
              ]
            }
          ]
        }
      },
      {
        "name": "Add Rows - Invalid - Assign Hyperlink URL and SheetId",
        "method": client.sheets.addRows,
        "shouldError": true,
        "options": {
          "sheetId": 1,
          "body": [
            {
              "cells": [
                {
                  "columnId": 101,
                  "value": "Google",
                  "hyperlink": {
                    "url": "http://google.com",
                    "sheetId": 2
                  }
                },
                {
                  "columnId": 102,
                  "value": "Bing",
                  "hyperlink": {
                    "url": "http://bing.com"
                  }
                }
              ]
            }
          ]
        }
      },
      {
        "name": "Add Rows - Location - Top",
        "method": client.sheets.addRows,
        "shouldError": false,
        "options": {
          "sheetId": 1,
          "body": [
            {
              "toTop": true,
              "cells": [
                {
                  "columnId": 101,
                  "value": "Apple"
                },
                {
                  "columnId": 102,
                  "value": "Red Fruit"
                }
              ]
            }
          ]
        }
      },
      {
        "name": "Add Rows - Location - Bottom",
        "method": client.sheets.addRows,
        "shouldError": false,
        "options": {
          "sheetId": 1,
          "body": [
            {
              "toBottom": true,
              "cells": [
                {
                  "columnId": 101,
                  "value": "Apple"
                },
                {
                  "columnId": 102,
                  "value": "Red Fruit"
                }
              ]
            }
          ]
        }
      },
      {
        "name": "Update Rows - Assign Values - String",
        "method": client.sheets.updateRow,
        "shouldError": false,
        "options": {
          "sheetId": 1,
          "body": [
            {
              "id": 10,
              "cells": [
                {
                  "columnId": 101,
                  "value": "Apple"
                },
                {
                  "columnId": 102,
                  "value": "Red Fruit"
                }
              ]
            },
            {
              "id": 11,
              "cells": [
                {
                  "columnId": 101,
                  "value": "Banana"
                },
                {
                  "columnId": 102,
                  "value": "Yellow Fruit"
                }
              ]
            }
          ]
        }
      },
      {
        "name": "Update Rows - Assign Values - Int",
        "method": client.sheets.updateRow,
        "shouldError": false,
        "options": {
          "sheetId": 1,
          "body": [
            {
              "id": 10,
              "cells": [
                {
                  "columnId": 101,
                  "value": 100
                },
                {
                  "columnId": 102,
                  "value": "One Hundred"
                }
              ]
            },
            {
              "id": 11,
              "cells": [
                {
                  "columnId": 101,
                  "value": 2.1
                },
                {
                  "columnId": 102,
                  "value": "Two Point One"
                }
              ]
            }
          ]
        }
      },
      {
        "name": "Update Rows - Assign Values - Bool",
        "method": client.sheets.updateRow,
        "shouldError": false,
        "options": {
          "sheetId": 1,
          "body": [
            {
              "id": 10,
              "cells": [
                {
                  "columnId": 101,
                  "value": true
                },
                {
                  "columnId": 102,
                  "value": "This is True"
                }
              ]
            },
            {
              "id": 11,
              "cells": [
                {
                  "columnId": 101,
                  "value": false
                },
                {
                  "columnId": 102,
                  "value": "This is False"
                }
              ]
            }
          ]
        }
      },
      {
        "name": "Update Rows - Assign Formulae",
        "method": client.sheets.updateRow,
        "shouldError": false,
        "options": {
          "sheetId": 1,
          "body": [
            {
              "id": 11,
              "cells": [
                {
                  "columnId": 101,
                  "formula": "=SUM([Column2]3, [Column2]4)*2"
                },
                {
                  "columnId": 102,
                  "formula": "=SUM([Column2]3, [Column2]3, [Column2]4)"
                }
              ]
            }
          ]
        }
      },
      {
        "name": "Update Rows - Assign Values - Hyperlink",
        "method": client.sheets.updateRow,
        "shouldError": false,
        "options": {
          "sheetId": 1,
          "body": [
            {
              "id": 10,
              "cells": [
                {
                  "columnId": 101,
                  "value": "Google",
                  "hyperlink": {
                    "url": "http://google.com"
                  }
                },
                {
                  "columnId": 102,
                  "value": "Bing",
                  "hyperlink": {
                    "url": "http://bing.com"
                  }
                }
              ]
            }
          ]
        }
      },
      {
        "name": "Update Rows - Assign Values - Hyperlink SheetID",
        "method": client.sheets.updateRow,
        "shouldError": false,
        "options": {
          "sheetId": 1,
          "body": [
            {
              "id": 10,
              "cells": [
                {
                  "columnId": 101,
                  "value": "Sheet2",
                  "hyperlink": {
                    "sheetId": 2
                  }
                },
                {
                  "columnId": 102,
                  "value": "Sheet3",
                  "hyperlink": {
                    "sheetId": 3
                  }
                }
              ]
            }
          ]
        }
      },
      {
        "name": "Update Rows - Assign Values - Hyperlink ReportID",
        "method": client.sheets.updateRow,
        "shouldError": false,
        "options": {
          "sheetId": 1,
          "body": [
            {
              "id": 10,
              "cells": [
                {
                  "columnId": 101,
                  "value": "Report9",
                  "hyperlink": {
                    "reportId": 9
                  }
                },
                {
                  "columnId": 102,
                  "value": "Report8",
                  "hyperlink": {
                    "reportId": 8
                  }
                }
              ]
            }
          ]
        }
      },
      {
        "name": "Update Rows - Invalid - Assign Value and Formulae",
        "method": client.sheets.updateRow,
        "shouldError": true,
        "options": {
          "sheetId": 1,
          "body": [
            {
              "id": 10,
              "cells": [
                {
                  "columnId": 101,
                  "formula": "=SUM([Column2]3, [Column2]4)*2",
                  "value": "20"
                },
                {
                  "columnId": 102,
                  "formula": "=SUM([Column2]3, [Column2]3, [Column2]4)"
                }
              ]
            }
          ]
        }
      },
      {
        "name": "Update Rows - Invalid - Assign Hyperlink URL and SheetId",
        "method": client.sheets.updateRow,
        "shouldError": true,
        "options": {
          "sheetId": 1,
          "body": [
            {
              "id": 10,
              "cells": [
                {
                  "columnId": 101,
                  "value": "Google",
                  "hyperlink": {
                    "url": "http://google.com",
                    "sheetId": 2
                  }
                },
                {
                  "columnId": 102,
                  "value": "Bing",
                  "hyperlink": {
                    "url": "http://bing.com"
                  }
                }
              ]
            }
          ]
        }
      }
    ];
    
    helpers.defineMockApiTests(scenarios);
  });
});