import * as fs from "node:fs"

export class FileReader {
    private filePath: string;
    private fileStream!: fs.ReadStream;
    private chunkSize: number;
    private currentPosition: number;
    private terminalWidth: number;

    constructor(filePath: string) {
        this.filePath = filePath;
        this.currentPosition = 0
        this.terminalWidth = process.stdout.columns || 80
        this.chunkSize = Math.floor(this.terminalWidth / 2)
    }

    async readNextChunk(): Promise<string[]> {
        return new Promise((resolve, reject) => {
            if (!this.fileStream) {
                this.fileStream = fs.createReadStream(this.filePath, { encoding: 'utf8' });
                this.fileStream.on('error', reject);
            }

            let lines: string[] = [];
            this.fileStream.on('data', (chunk: string) => {
                const chunkLines = chunk.split('\n');
                const remainingLines = this.chunkSize - lines.length;

                if (remainingLines >= chunkLines.length) {
                    lines.push(...chunkLines);
                } else {
                    lines.push(...chunkLines.slice(0, remainingLines));
                    this.currentPosition += remainingLines;
                    resolve(lines);
                    this.fileStream.destroy(); // Stop reading further
                }
                resolve(lines);
            });
        });
    }

    updateChunkSize(): void {
        this.terminalWidth = process.stdout.columns || 80;
        this.chunkSize = Math.floor(this.terminalWidth / 2); // Adjust chunk size based on terminal width
    }
}
