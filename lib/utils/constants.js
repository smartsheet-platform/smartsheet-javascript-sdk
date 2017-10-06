exports.maxRetryDurationMillis = 15000;

exports.accessLevel = {
  admin :       'ADMIN',
  editor :      'EDITOR',
  editorShare : 'EDITOR_SHARE',
  owner :       'OWNER',
  viewer :      'VIEWER'
};

exports.accessScope = {
  adminSheets :     'ADMIN_SHEETS',
  adminUsers :      'ADMIN_USERS',
  adminWorkspaces : 'ADMIN_WORKSPACES',
  createSheets :    'CREATE_SHEETS',
  deleteSheets :    'DELETE_SHEETS',
  readSheets :      'READ_SHEETS',
  shareSheets :     'SHARE_SHEETS',
  writeSheets :     'WRITE_SHEETS'
};

exports.types = {
  sheet     : 'sheet',
  folder    : 'folder',
  report    : 'report',
  template  : 'template',
  workspace : 'workspace',
  sight     : 'sight'
};

exports.paperSize = {
  letter :   'LETTER',
  legal :    'LEGAL',
  wide :     'WIDE',
  archd :    'ARCHD',
  a4 :       'A4',
  a3 :       'A4',
  a2 :       'A2',
  a1 :       'A1',
  a0 :       'A0'
};

exports.acceptHeaders = {
  applicationPdf :  'application/pdf',
  applicationJson : 'application/json',
  textCsv :         'text/csv',
  vndMsExcel :      'application/vnd.ms-excel'
};

exports.sheet = {
  name: 'New Sheet via API',
  columns: [
    {
      title: 'Primary Column',
      type: 'TEXT_NUMBER',
      primary: true,
      width: 150
    },
    {
      title: 'Column2',
      type: 'TEXT_NUMBER',
      width: 150
    },
    {
      title: 'Column3',
      type: 'TEXT_NUMBER',
      width: 150
    },
    {
      title: 'Column4',
      type: 'TEXT_NUMBER',
      width: 150
    },
    {
      title: 'Column5',
      type: 'TEXT_NUMBER',
      width: 150
    },
    {
      title: 'Column6',
      type: 'TEXT_NUMBER',
      width: 150
    }
  ]
};
