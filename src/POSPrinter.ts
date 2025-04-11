import { POSPrinterInterface } from "./POSPrinterInterface";
import { POSDocument } from "./POSDocument";
import { POSConfig } from "./POSConfig";
import { writeFileSync } from "fs";
import { join } from "path";
import { tmpdir } from "os";
import { exec } from "child_process";

export class POSPrinter implements POSPrinterInterface {
  private readonly printerName: string;

  constructor(printerName: string) {
    this.printerName = printerName;
  }

  print(document: POSDocument): void {
    if (POSConfig.isPrintingDisabled()) {
      console.log("[ESC/POS] Printing is disabled (testing mode).");
      return;
    }

    const raw = document.toBytes();
    const tmpPath = join(tmpdir(), `escpos-${Date.now()}.bin`);
    writeFileSync(tmpPath, raw);

    const command = this.getPlatformCommand(tmpPath);

    if (!command) {
      console.error(`[ESC/POS] Printing not supported on platform: ${process.platform}`);
      return;
    }

    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error("Print command failed:", error.message);
      } else if (stderr) {
        console.error("Printer stderr:", stderr);
      } else {
        console.log(`[ESC/POS] Printed successfully to ${this.printerName}`);
      }
    });
  }

  private getPlatformCommand(filePath: string): string | null {
    const printer = this.printerName;
    switch (process.platform) {
      case "win32":
        return `print /D:"${printer}" "${filePath}"`;
      case "darwin":
      case "linux":
        return `lp -d "${printer}" -o raw "${filePath}"`;
      default:
        return null;
    }
  }
}
