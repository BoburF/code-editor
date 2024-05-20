import * as fs from "node:fs"

export class FileReader {
    private filePath: string;

    constructor(filePath: string) {
        this.filePath = filePath;
    }

    async readNextChunk(): Promise<string[]> {
        return new Promise((resolve, reject) => {
            try {
                resolve(fs.readFileSync(this.filePath, { encoding: "utf-8" }).split("\n"))
            } catch (e) {
                console.log("Reading files error: ", e)
                reject(null)
            }
        });
    }

    save(text: string){
        fs.writeFileSync(this.filePath, text)
    }
}
