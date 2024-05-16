import { Editor } from "editor";
import { FileReader } from "file-reader";
import { resolve } from "path";
import { ScreenRenderer } from "screen";

const filePath = process.argv[2]?.startsWith(".") ? resolve(process.cwd(), process.argv[2]!) : process.argv[2]!
const fileReader = new FileReader(filePath)

async function main() {
    const lines = await fileReader.readNextChunk()
    const editor = new Editor(lines)
    const screen = new ScreenRenderer(editor.update())

    screen.render()
}

main()


