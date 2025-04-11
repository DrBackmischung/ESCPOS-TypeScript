import { POSComponent } from "./POSComponent";
import { POSBarcodeType } from "./types/POSBarcodeType";
import { POSBarcodeWidth } from "./types/POSBarcodeWidth";
import { POSCommand } from "./POSCommand";

export class POSBarcode extends POSComponent {
  private readonly data: string;
  private readonly type: POSBarcodeType;
  private readonly width: POSBarcodeWidth;

  constructor(builder: POSBarcodeBuilder) {
    super();
    this.data = builder.data;
    this.type = builder.type;
    this.width = builder.width;
  }

  toBytes(): Buffer {
    const buffers: Buffer[] = [];

    // Set barcode width
    buffers.push(Buffer.from([POSCommand.GS, POSCommand.SET_BAR_WIDTH, this.width]));

    // Print barcode
    const dataBuf = Buffer.from(this.data, "ascii");
    buffers.push(Buffer.from([
      POSCommand.GS,
      POSCommand.BARCODE_PRINT,
      this.type,
      dataBuf.length
    ]));
    buffers.push(dataBuf);

    // Line feed
    buffers.push(Buffer.from([POSCommand.LINE_FEED]));

    return Buffer.concat(buffers);
  }
}

export class POSBarcodeBuilder {
  data: string;
  type: POSBarcodeType = POSBarcodeType.CODE128;
  width: POSBarcodeWidth = POSBarcodeWidth.DEFAULT;

  constructor(data: string) {
    this.data = data;
  }

  setType(type: POSBarcodeType): this {
    this.type = type;
    return this;
  }

  setWidth(width: POSBarcodeWidth): this {
    this.width = width;
    return this;
  }

  build(): POSBarcode {
    return new POSBarcode(this);
  }
}
