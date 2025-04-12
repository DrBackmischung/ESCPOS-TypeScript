# escpos-typescript

A **TypeScript library** for printing receipts, barcodes, and QR codes on **ESC/POS-compatible printers** via USB or the OS print system.  
Supports Windows, macOS, and Linux using native commands like `lp` or `print.exe`.

---

## 🚀 Features

✅ Print **formatted text** (alignment, bold, double width/height, underline)  
✅ Print **barcodes** (EAN-13, CODE128, and more)  
✅ Print **QR codes** (with size & error correction)  
✅ Disable printing in tests with a flag  
✅ Fully testable with a **mock printer interface**  
✅ Works cross-platform (Windows, macOS, Linux)

---

## 📦 Installation

```bash
npm install escpos-typescript
```

---

## 🖨️ Quick Start Demo

Create a file and use this library:

```ts
import {
  POSReceiptBuilder,
  POSTextBuilder,
  POSBarcodeBuilder,
  POSQRCodeBuilder,
  POSPrintStyle,
  POSTextAlignment,
  POSBarcodeType,
  POSBarcodeWidth,
  POSQRCodeSize,
  POSQRCodeErrorCorrection,
  POSPrinter
} from "escpos-ts";

const printer = new POSPrinter("Your_Printer_Name"); // name shown in system printer list

const receipt = new POSReceiptBuilder()
  .setTitle("ESC/POS PRINTER DEMO")
  .addFeed()
  .addComponent(new POSTextBuilder("Left").setAlignment(POSTextAlignment.LEFT).build())
  .addComponent(new POSTextBuilder("Center").setAlignment(POSTextAlignment.CENTER).build())
  .addComponent(new POSTextBuilder("Right").setAlignment(POSTextAlignment.RIGHT).build())
  .addComponent(new POSTextBuilder("Bold").setStyle(POSPrintStyle.BOLD).build())
  .addComponent(new POSTextBuilder("Underlined").setStyle(POSPrintStyle.UNDERLINE).build())
  .addItem("Product 1", 10.0)
  .addItem("Product 2", 5.5)
  .addComponent(
    new POSBarcodeBuilder("123456789012")
      .setType(POSBarcodeType.JAN13_EAN13)
      .setWidth(POSBarcodeWidth.THIN)
      .build()
  )
  .addComponent(
    new POSQRCodeBuilder("https://example.com")
      .setSize(POSQRCodeSize.LARGE)
      .setErrorCorrection(POSQRCodeErrorCorrection.HIGH)
      .build()
  )
  .addComponent(new POSTextBuilder("----------------------").build())
  .addComponent(new POSTextBuilder("Total: {EUR} 15.50").setStyle(POSPrintStyle.BOLD).build())
  .setFooter("Thank you!")
  .build();

printer.print(receipt);
```

---

## 🧪 Testing

### 🔹 Disable Real Printing (Globally)

```ts
import { POSConfig } from "escpos-ts";

POSConfig.setDisablePrinting(true);
```

---

### 🔹 Use a Mock Printer in Unit Tests

```ts
import { POSPrinterMock } from "escpos-ts";
import { POSReceiptBuilder } from "escpos-ts";
import { POSTextBuilder } from "escpos-ts";

test("mock printer captures output", () => {
  const mock = new POSPrinterMock();

  const receipt = new POSReceiptBuilder()
    .setTitle("Test Receipt")
    .addComponent(new POSTextBuilder("Line 1").build())
    .build();

  mock.print(receipt);

  expect(mock.getPrintedData().length).toBe(1);
  expect(mock.getPrintedData()[0].length).toBeGreaterThan(0);
});
```

---

## 🖨️ How It Works (Under the Hood)

- Uses platform-native commands:
  - **macOS/Linux** → `lp -o raw`
  - **Windows** → `print.exe`
- Writes ESC/POS bytes to a temporary `.bin` file and prints it using these tools
- Cross-platform compatible without native bindings

---

## 🧾 How to Find Your Printer Name

### On macOS/Linux
```bash
lpstat -p
```

### On Windows
```powershell
Get-Printer | Select-Object Name
```

Use the exact name shown there in the constructor:
```ts
new POSPrinter("Printer_Name_From_List");
```

---

## 📣 Feature Request?

This repository is only for **bug reports and maintenance** related to the language-specific implementation.

Please open all **feature requests, enhancements, and cross-language discussions** in the **central repository**:  

👉 [DrBackmischung/ESCPOS](https://github.com/DrBackmischung/ESCPOS/issues)

---

## 📜 License

MIT
