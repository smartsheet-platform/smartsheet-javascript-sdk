import { expect } from "chai";
import * as smartsheetStar from "../../";
import smartsheetDefault, { SmartsheetClient } from "../../";
import { GetSheetOptions } from "../../lib/types/sheets/get";
import { createClientStub } from "./tools";

describe("TypeScript", () => {
  describe("Default Export", () => {
    function assertDefaultProps(defaultExport: typeof smartsheetDefault) {
      expect(defaultExport.createClient).to.be.instanceOf(Object);
      expect(defaultExport.smartSheetURIs.defaultBaseURI).to.be.a("string");
      expect(defaultExport.smartSheetURIs.govBaseURI).to.be.a("string");
    }

    it("should allow default import", () => {
      // testing `import smartsheet from "smartsheet"`
      assertDefaultProps(smartsheetDefault);
    });

    it("should allow * import", () => {
      // import smartsheet, { SmartsheetClient } from "smartsheet"
      assertDefaultProps(smartsheetStar);
    });
  });

  describe("SmartsheetClient", () => {
    let client: SmartsheetClient;

    before(function () {
      // runs once before the first test in this block
      client = smartsheetDefault.createClient({
        accessToken: "decafbad",
        logLevel: "info",
      });
    });

    it("should have sheets", () => {
      expect(client.sheets).to.be.instanceOf(Object);
      expect(client.sheets.listSheets).to.be.instanceOf(Function);
      expect(client.sheets.getSheet).to.be.instanceOf(Function);
      expect(client.sheets.sendSheetViaEmail).to.be.instanceOf(Function);
      expect(client.sheets.getPublishStatus).to.be.instanceOf(Function);
      expect(client.sheets.setPublishStatus).to.be.instanceOf(Function);
      expect(client.sheets.updateSheet).to.be.instanceOf(Function);
      expect(client.sheets.deleteSheet).to.be.instanceOf(Function);
      expect(client.sheets.moveSheet).to.be.instanceOf(Function);
      expect(client.sheets.sortRowsInSheet).to.be.instanceOf(Function);
    });

    describe("sheets", () => {
      beforeEach(function () {
        // runs before each test in this block
        client = createClientStub();
      });
      describe("getSheet", async () => {
        it("should accept known queryParameters", async () => {
          const options: GetSheetOptions = {
            id: 9876543,
            queryParameters: {
              include: "a,b",
              exclude: "c,d",
              columnIds: "c1,c2",
              filterId: 1630822416621,
              ifVersionAfter: 1630822416621,
              level: 1630822416621,
              page: 1630822416621,
              pageSize: 1630822416621,
              rowIds: "1630822416621,1630822416621",
              rowNumbers: "1630822416621,1630822416621",
              rowsModifiedSince: "2021-09-05T06:13:36.621Z",
            },
          };
          await client.sheets.getSheet(options);
        });
      });
    });
  });
});
