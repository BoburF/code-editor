export class ScreenRenderer {
    terminalWidth = process.stdout.columns || 80
    render(lines: string[]) {
        console.clear()
        lines.forEach((line, index) => {
            process.stdout.write(index + 1 + " " + line + (lines.length > index + 1 ? "\n" : ""))
        })
    }
}

