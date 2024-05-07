export class ScreenRenderer {
    constructor(private lines: string[]) { }

    render() {
        process.stdout.write("\u001b[2J\u001b[0;0H")
        this.lines.forEach((line, index) => {
            process.stdout.write(index + 1 + " " + line + "\n")
        })
    }
}

