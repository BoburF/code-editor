import { Editor } from "editor";
import { FileReader } from "file-reader";
import { resolve } from "path";
import { ScreenRenderer } from "screen";
import * as readline from "readline"

const filePath = process.argv[2]?.startsWith(".") ? resolve(process.cwd(), process.argv[2]!) : process.argv[2]!
const fileReader = new FileReader(filePath)

async function main() {
    const lines = await fileReader.readNextChunk()
    const editor = new Editor(lines)
    const screen = new ScreenRenderer()

    screen.render(editor.update())

    readline.emitKeypressEvents(process.stdin)
    if (process.stdin.isTTY) process.stdin.setRawMode(true);

    process.stdin.on("keypress", (_chunk, key: { sequence: string, name: string, ctrl: boolean, meta: boolean, shift: boolean }) => {
        console.log(key)
        if (key.ctrl) {
            switch (key.name) {
                case "c":
                    process.exit(0)
            }
        } else {
            switch (key.name) {
                case "down":
                    editor.moveCursor({up: 0, down: 1, left: 0, right: 0 })
                       screen.render(editor.update())
                break;
                default:
                    console.log(key.name)
            }
        }
    })
}

main()


