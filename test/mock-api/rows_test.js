var sinon = require('sinon');
var should = require('should');
var assert = require('assert');
var helpers = require('./helpers');


describe('Mock API SDK Tests', function() {
  var client = helpers.setupClient();

  describe('#Rows', function() {
    var scenarios = [
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
      },
      {
        "name": "Add Rows - Assign Object Value - Predecessor List",
        "method": client.sheets.addRows,
        "shouldError": false,
        "options": {
          "sheetId": 1,
          "body": [
            {
              "cells": [
                {
                  "columnId": 101,
                  "objectValue": {
                    "objectType": "PREDECESSOR_LIST",
                    "predecessors": [
                      {
                        "rowId": 10,
                        "type": "FS",
                        "lag": {
                          "objectType": "DURATION",
                          "days": 2,
                          "hours": 4
                        }
                      }
                    ]
                  }
                }
              ]
            }
          ]
        }
      },
      {
        "name": "Update Rows - Clear Value - Text Number",
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
                  "value": ""
                }
              ]
            }
          ]
        }
      },
      {
        "name": "Update Rows - Clear Value - Checkbox",
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
                  "value": ""
                }
              ]
            }
          ]
        }
      },
      {
        "name": "Update Rows - Clear Value - Hyperlink",
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
                  "value": "",
                  "hyperlink": null
                }
              ]
            }
          ]
        }
      },
      {
        "name": "Update Rows - Clear Value - Cell Link",
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
                  "value": "",
                  "linkInFromCell": null
                }
              ]
            }
          ]
        }
      },
      {
        "name": "Update Rows - Clear Value - Predecessor List",
        "method": client.sheets.updateRow,
        "shouldError": false,
        "options": {
          "sheetId": 1,
          "body": [
            {
              "id": 10,
              "cells": [
                {
                  "columnId": 123,
                  "value": null
                }
              ]
            }
          ]
        }
      },
      {
        "name": "Update Rows - Invalid - Assign Hyperlink and Cell Link",
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
                  "value": "",
                  "linkInFromCell": {
                    "sheetId": 2,
                    "rowId": 20,
                    "columnId": 201
                  },
                  "hyperlink": {
                    "url": "www.google.com"
                  }
                }
              ]
            }
          ]
        }
      },
      {
        "name": "Update Rows - Location - Top",
        "method": client.sheets.updateRow,
        "shouldError": false,
        "options": {
          "sheetId": 1,
          "body": [
            {
              "id": 10,
              "toTop": true
            }
          ]
        }
      },
      {
        "name": "Update Rows - Location - Bottom",
        "method": client.sheets.updateRow,
        "shouldError": false,
        "options": {
          "sheetId": 1,
          "body": [
            {
              "id": 10,
              "toBottom": true
            }
          ]
        }
      }
    ];

    helpers.defineMockApiTests(scenarios);
  });
});
