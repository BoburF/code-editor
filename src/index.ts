import { FileReader } from "file-reader";
import { resolve } from "path";
import { ScreenRenderer } from "screen";

const filePath = resolve(process.cwd(), process.argv[2]!)
const fileReader = new FileReader(filePath)

fileReader.updateChunkSize()

async function main(){
    const lines = await fileReader.readNextChunk()

    const screen = new ScreenRenderer(lines)

    screen.render()
}

main()
