import { POSPrinterInterface } from "./POSPrinterInterface";
import { POSDocument } from "./POSDocument";

export class POSPrinterMock implements POSPrinterInterface {
  private readonly printedData: Buffer[] = [];

  print(document: POSDocument): void {
    const data = document.toBytes();
    this.printedData.push(data);
    console.log(`[POSPrinterMock] Simulated printing ${data.length} bytes.`);
  }

  getPrintedData(): Buffer[] {
    return this.printedData;
  }

  clearPrintedData(): void {
    this.printedData.length = 0;
  }
}
