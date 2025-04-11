export class POSCommand {
    static readonly ESC = 0x1B;
    static readonly GS = 0x1D;
  
    // Text formatting
    static readonly INIT = 0x40;
    static readonly STYLE_MODE = 0x21;
    static readonly ALIGNMENT = 0x61;
    static readonly LINE_FEED = 0x0A;
    static readonly FEED_LINES = 0x64;
  
    // Barcode and QR
    static readonly BARCODE_PRINT = 0x6B;
    static readonly SET_BARCODE_HEIGHT = 0x68;
    static readonly SET_BAR_WIDTH = 0x77;
    static readonly SET_BAR_LABEL_POSITION = 0x48;
    static readonly SET_BAR_LABEL_FONT = 0x66;
  
    // Cut and feed
    static readonly PAPER_CUT = 0x56;
    static readonly ESC_CUT = Buffer.from([POSCommand.ESC, 0x69]);
  
    // Buffering
    static readonly PAGE_MODE = 0x4C;
    static readonly PRINT_PAGE_MODE = 0x46;
    static readonly PRINTER_RESET = 0x40;
    static readonly STATUS_REQUEST = 0x72;
    static readonly UNIDIRECTIONAL_MODE = 0x55;
  
    static getFullCutCommand(): Buffer {
      return Buffer.from([POSCommand.ESC, POSCommand.PAPER_CUT, 0x00]);
    }
  
    static getPartialCutCommand(): Buffer {
      return Buffer.from([POSCommand.ESC, POSCommand.PAPER_CUT, 0x01]);
    }
  }
  