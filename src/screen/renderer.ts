export class ScreenRenderer {
    terminalWidth = process.stdout.columns || 80
    render(lines: string[]) {
        process.stdout.write("\u001b[2J\u001b[0;0H")
        lines.forEach((line, index) => {
            process.stdout.write(index + 1 + " " + line + (lines.length > index + 1 ? "\n" : ""))
        })
    }
}

