import { POSComponent } from "./POSComponent";
import { POSCommand } from "./POSCommand";
import { POSTextBuilder } from "./POSText";
import { POSPrintStyle } from "./types/POSPrintStyle";
import { POSTextAlignment } from "./types/POSTextAlignment";
import { POSLineFeed } from "./POSLineFeed";

export class POSDocument extends POSComponent {
  protected readonly components: POSComponent[] = [];

  addComponent(component: POSComponent): void {
    this.components.push(component);
  }

  addLineFeed(count: number = 1): void {
    this.components.push(new POSLineFeed(count));
  }

  toBytes(): Buffer {
    const buffers: Buffer[] = [];

    // Hack: add invisible padding to avoid first-line cutoff on some printers
    const filler = new POSTextBuilder("")
      .setStyle(POSPrintStyle.BOLD, POSPrintStyle.DOUBLE_WIDTH)
      .setAlignment(POSTextAlignment.CENTER)
      .build()
      .toBytes();
    for (let i = 0; i < 4; i++) buffers.push(filler);

    // Init printer state
    buffers.push(Buffer.from([POSCommand.ESC, POSCommand.PAGE_MODE]));
    buffers.push(Buffer.from([POSCommand.ESC, POSCommand.PRINTER_RESET]));
    buffers.push(Buffer.from([POSCommand.GS, POSCommand.STATUS_REQUEST, 1]));
    buffers.push(Buffer.from([POSCommand.ESC, POSCommand.UNIDIRECTIONAL_MODE, 1]));
    buffers.push(Buffer.from([POSCommand.ESC, POSCommand.PRINT_PAGE_MODE]));

    // Add all components
    for (const comp of this.components) {
      buffers.push(comp.toBytes());
    }

    // Final reset
    buffers.push(Buffer.from([POSCommand.ESC, POSCommand.PRINTER_RESET]));

    return Buffer.concat(buffers);
  }
}
