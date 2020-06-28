import { expect } from "chai";
import * as smartsheetStar from "../../";
import smartsheetDefault, { SmartsheetClient } from "../../";

describe("TypeScript", () => {
  describe("Default Export", () => {
    function assertDefaultProps(defaultExport: typeof smartsheetDefault) {
      expect(defaultExport).to.have.property("createClient");
      expect(defaultExport)
        .to.have.nested.property("smartSheetURIs.defaultBaseURI")
        .to.be.a("string");
      expect(defaultExport)
        .to.have.nested.property("smartSheetURIs.govBaseURI")
        .to.be.a("string");
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
      expect(client.sheets.getSheet).to.be.instanceOf(Function);
      expect(client.sheets.sendSheetViaEmail).to.be.instanceOf(Function);
      expect(client.sheets.getPublishStatus).to.be.instanceOf(Function);
      expect(client.sheets.setPublishStatus).to.be.instanceOf(Function);
      expect(client.sheets.updateSheet).to.be.instanceOf(Function);
      expect(client.sheets.deleteSheet).to.be.instanceOf(Function);
      expect(client.sheets.moveSheet).to.be.instanceOf(Function);
      expect(client.sheets.sortRowsInSheet).to.be.instanceOf(Function);
    });
  });
});
