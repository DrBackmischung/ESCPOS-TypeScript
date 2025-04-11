import { POSComponent } from "./POSComponent";
import { POSCommand } from "./POSCommand";

export class POSLineFeed extends POSComponent {
  private readonly count: number;

  constructor(count: number = 1) {
    super();
    this.count = count;
  }

  toBytes(): Buffer {
    return Buffer.alloc(this.count, POSCommand.LINE_FEED);
  }
}
