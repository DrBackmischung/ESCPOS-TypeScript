export class POSSpecialCharacter {
    private readonly value: Buffer;
  
    private constructor(value: Buffer) {
      this.value = value;
    }
  
    static readonly USD = new POSSpecialCharacter(Buffer.from([0x24]));
    static readonly EUR = new POSSpecialCharacter(Buffer.from("EUR"));
    static readonly GBP = new POSSpecialCharacter(Buffer.from([0x9C]));
    static readonly JPY = new POSSpecialCharacter(Buffer.from([0x9D]));
    static readonly CHF = new POSSpecialCharacter(Buffer.from("CHF"));
    static readonly CNY = new POSSpecialCharacter(Buffer.from([0x9D]));
    static readonly INR = new POSSpecialCharacter(Buffer.from("INR"));
    static readonly RUB = new POSSpecialCharacter(Buffer.from("RUB"));
    static readonly BRL = new POSSpecialCharacter(Buffer.from("R$"));
    static readonly ZAR = new POSSpecialCharacter(Buffer.from("R"));
    static readonly HKD = new POSSpecialCharacter(Buffer.from("HK$"));
    static readonly PLN = new POSSpecialCharacter(Buffer.from("zl"));
    static readonly DKK = new POSSpecialCharacter(Buffer.from("DKK"));
    static readonly NOK = new POSSpecialCharacter(Buffer.from("NOK"));
    static readonly SEK = new POSSpecialCharacter(Buffer.from("SEK"));
    static readonly ISK = new POSSpecialCharacter(Buffer.from("ISK"));
    static readonly FOK = new POSSpecialCharacter(Buffer.from("kr"));
    static readonly AUD = new POSSpecialCharacter(Buffer.from("A$"));
    static readonly BSD = new POSSpecialCharacter(Buffer.from("B$"));
    static readonly BBD = new POSSpecialCharacter(Buffer.from("Bds$"));
    static readonly BZD = new POSSpecialCharacter(Buffer.from("BZ$"));
    static readonly BMD = new POSSpecialCharacter(Buffer.from("Ber$"));
    static readonly BND = new POSSpecialCharacter(Buffer.from("B$"));
    static readonly CAD = new POSSpecialCharacter(Buffer.from("C$"));
    static readonly KYD = new POSSpecialCharacter(Buffer.from("CI$"));
    static readonly XCD = new POSSpecialCharacter(Buffer.from("EC$"));
    static readonly FJD = new POSSpecialCharacter(Buffer.from("FJ$"));
    static readonly GYD = new POSSpecialCharacter(Buffer.from("G$"));
    static readonly JMD = new POSSpecialCharacter(Buffer.from("J$"));
    static readonly KID = new POSSpecialCharacter(Buffer.from("$"));
    static readonly LRD = new POSSpecialCharacter(Buffer.from("L$"));
    static readonly NAD = new POSSpecialCharacter(Buffer.from("N$"));
    static readonly NZD = new POSSpecialCharacter(Buffer.from("$NZ"));
    static readonly SGD = new POSSpecialCharacter(Buffer.from("S$"));
    static readonly SBD = new POSSpecialCharacter(Buffer.from("SI$"));
    static readonly SRD = new POSSpecialCharacter(Buffer.from("SRD"));
    static readonly TWD = new POSSpecialCharacter(Buffer.from("NT$"));
    static readonly TTD = new POSSpecialCharacter(Buffer.from("TT$"));
    static readonly TVD = new POSSpecialCharacter(Buffer.from("TV$"));
    static readonly USD_ALT = new POSSpecialCharacter(Buffer.from("US$"));
    static readonly ARS = new POSSpecialCharacter(Buffer.from("Arg$"));
    static readonly CLP = new POSSpecialCharacter(Buffer.from("Ch$"));
    static readonly COP = new POSSpecialCharacter(Buffer.from("Col$"));
    static readonly CUP = new POSSpecialCharacter(Buffer.from("Cu$"));
    static readonly DOP = new POSSpecialCharacter(Buffer.from("RD$"));
    static readonly MXN = new POSSpecialCharacter(Buffer.from("Mex$"));
    static readonly UYU = new POSSpecialCharacter(Buffer.from("$U"));
  
    static values(): Record<string, POSSpecialCharacter> {
      const all = Object.entries(POSSpecialCharacter)
        .filter(([_, v]) => v instanceof POSSpecialCharacter);
      return Object.fromEntries(all) as Record<string, POSSpecialCharacter>;
    }
  
    getBytes(): Buffer {
      return this.value;
    }
  }
  