import { POSComponent } from "./POSComponent";
import { POSCommand } from "./POSCommand";
import { POSPrintStyle } from "./types/POSPrintStyle";
import { POSTextAlignment } from "./types/POSTextAlignment";
import { POSSpecialCharacter } from "./types/POSSpecialCharacter";

export class POSText extends POSComponent {
  private readonly text: string;
  private readonly styles: POSPrintStyle[];
  private readonly alignment: POSTextAlignment;

  constructor(builder: POSTextBuilder) {
    super();
    this.text = builder.text;
    this.styles = builder.styles;
    this.alignment = builder.alignment;
  }

  toBytes(): Buffer {
    const buffers: Buffer[] = [];

    // Set alignment
    buffers.push(Buffer.from([POSCommand.ESC, POSCommand.ALIGNMENT, this.alignment]));

    // Apply styles
    for (const style of this.styles) {
      buffers.push(Buffer.from([POSCommand.ESC, POSCommand.STYLE_MODE, style]));
    }

    // Text with optional special characters
    const textBytes: number[] = [];
    for (let i = 0; i < this.text.length; i++) {
      if (this.text[i] === "{" && this.text.indexOf("}", i) > i) {
        const endIdx = this.text.indexOf("}", i);
        const key = this.text.substring(i + 1, endIdx).toUpperCase();
        const special = POSSpecialCharacter.values()[key];
        if (special) {
          textBytes.push(...special.getBytes());
          i = endIdx;
          continue;
        }
      }
      textBytes.push(this.text.charCodeAt(i));
    }

    buffers.push(Buffer.from(textBytes));
    buffers.push(Buffer.from([0x0A])); // Line feed

    // Reset style
    buffers.push(Buffer.from([POSCommand.ESC, POSCommand.STYLE_MODE, POSPrintStyle.NONE]));

    return Buffer.concat(buffers);
  }
}

export class POSTextBuilder {
  text: string;
  styles: POSPrintStyle[] = [];
  alignment: POSTextAlignment = POSTextAlignment.LEFT;

  constructor(text: string) {
    this.text = text;
  }

  setStyle(...styles: POSPrintStyle[]): this {
    this.styles = styles;
    return this;
  }

  setAlignment(alignment: POSTextAlignment): this {
    this.alignment = alignment;
    return this;
  }

  build(): POSText {
    return new POSText(this);
  }
}
