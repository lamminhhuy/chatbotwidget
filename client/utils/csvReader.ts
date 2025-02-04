export function readCSV(csvData: string): string[] {
    return csvData
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line !== "")
  }
  
  