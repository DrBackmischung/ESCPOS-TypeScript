import { POSComponent } from "./POSComponent";
import { POSCommand } from "./POSCommand";
import { POSQRCodeSize } from "./types/POSQRCodeSize";
import { POSQRCodeErrorCorrection } from "./types/POSQRCodeErrorCorrection";

export class POSQRCode extends POSComponent {
  private readonly data: string;
  private readonly size: POSQRCodeSize;
  private readonly errorCorrection: POSQRCodeErrorCorrection;

  constructor(builder: POSQRCodeBuilder) {
    super();
    this.data = builder.data;
    this.size = builder.size;
    this.errorCorrection = builder.errorCorrection;
  }

  toBytes(): Buffer {
    const buffers: Buffer[] = [];

    // Select QR model 2
    buffers.push(Buffer.from([POSCommand.GS, 0x28, 0x6B, 4, 0, 49, 65, 50, 0]));

    // Set QR code size
    buffers.push(Buffer.from([POSCommand.GS, 0x28, 0x6B, 3, 0, 49, 67, this.size]));

    // Set error correction
    buffers.push(Buffer.from([POSCommand.GS, 0x28, 0x6B, 3, 0, 49, 69, this.errorCorrection]));

    const dataBuf = Buffer.from(this.data, "ascii");
    const dataLength = dataBuf.length + 3;
    const pL = dataLength % 256;
    const pH = Math.floor(dataLength / 256);

    // Store data
    buffers.push(Buffer.from([POSCommand.GS, 0x28, 0x6B, pL, pH, 49, 80, 48]));
    buffers.push(dataBuf);

    // Print QR code
    buffers.push(Buffer.from([POSCommand.GS, 0x28, 0x6B, 3, 0, 49, 81, 48]));
    buffers.push(Buffer.from([POSCommand.LINE_FEED]));

    return Buffer.concat(buffers);
  }
}

export class POSQRCodeBuilder {
  data: string;
  size: POSQRCodeSize = POSQRCodeSize.MEDIUM;
  errorCorrection: POSQRCodeErrorCorrection = POSQRCodeErrorCorrection.MEDIUM;

  constructor(data: string) {
    this.data = data;
  }

  setSize(size: POSQRCodeSize): this {
    this.size = size;
    return this;
  }

  setErrorCorrection(ec: POSQRCodeErrorCorrection): this {
    this.errorCorrection = ec;
    return this;
  }

  build(): POSQRCode {
    return new POSQRCode(this);
  }
}
