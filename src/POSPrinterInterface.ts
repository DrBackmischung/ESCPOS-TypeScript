import { POSDocument } from "./POSDocument";

export interface POSPrinterInterface {
  print(document: POSDocument): void;
}
