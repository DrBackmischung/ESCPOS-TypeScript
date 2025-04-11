export class POSConfig {
    private static disablePrinting = false;
  
    static isPrintingDisabled(): boolean {
      return POSConfig.disablePrinting;
    }
  
    static setDisablePrinting(disable: boolean): void {
      POSConfig.disablePrinting = disable;
    }
  }
  