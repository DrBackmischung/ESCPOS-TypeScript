import { POSDocument } from "./POSDocument";
import { POSComponent } from "./POSComponent";
import { POSTextBuilder } from "./POSText";
import { POSPrintStyle } from "./types/POSPrintStyle";
import { POSTextAlignment } from "./types/POSTextAlignment";

export class POSReceipt extends POSDocument {
  constructor() {
    super();
  }
}

export class POSReceiptBuilder {
  private receipt = new POSReceipt();

  setTitle(title: string): this {
    this.receipt.addComponent(
      new POSTextBuilder(title)
        .setStyle(POSPrintStyle.BOLD, POSPrintStyle.DOUBLE_HEIGHT)
        .setAlignment(POSTextAlignment.CENTER)
        .build()
    );
    return this;
  }

  addItem(itemName: string, price: number): this {
    const line = `${itemName.padEnd(20)} ${price.toFixed(2).padStart(10)}`;
    this.receipt.addComponent(new POSTextBuilder(line).build());
    return this;
  }

  addItemStyled(itemName: string, price: number, ...styles: POSPrintStyle[]): this {
    const line = `${itemName.padEnd(20)} ${price.toFixed(2).padStart(10)}`;
    this.receipt.addComponent(
      new POSTextBuilder(line).setStyle(...styles).build()
    );
    return this;
  }

  setFooter(footer: string): this {
    this.receipt.addComponent(
      new POSTextBuilder(footer)
        .setAlignment(POSTextAlignment.CENTER)
        .setStyle(POSPrintStyle.UNDERLINE)
        .build()
    );
    this.receipt.addLineFeed(2);
    return this;
  }

  addComponent(component: POSComponent): this {
    this.receipt.addComponent(component);
    return this;
  }

  addFeed(count: number = 1): this {
    this.receipt.addLineFeed(count);
    return this;
  }

  build(): POSReceipt {
    this.receipt.addLineFeed(3);
    return this.receipt;
  }
}
