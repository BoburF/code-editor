export class Editor {
    private position = {
        vertical: 0,
        horizontal: 0
    }
    constructor(private lines: string[]) {
        this.init()
    }

    private init() {
        this.position.vertical = 0
        this.position.horizontal = 0
        this.lines[0] = "|" + this.lines[0]
    }

    update() {
        return this.lines
    }

    moveCursor({ up, down, left, right }: {
        up: number,
        down: number,
        left: number,
        right: number
    }) {
        if (this.lines[this.position.vertical]) {
            this.lines[this.position.vertical] = this.lines[this.position.vertical]!.slice(0, this.position.horizontal) + "" + this.lines[this.position.vertical]!.slice(this.position.horizontal + 1, this.lines[this.position.vertical]!.length)
        }

        this.position.vertical += up | down
        this.position.horizontal += right | left

        if (this.lines[this.position.vertical]) {
            this.lines[this.position.vertical] = this.lines[this.position.vertical]!.slice(0, this.position.horizontal) + "|" + this.lines[this.position.vertical]!.slice(this.position.horizontal, this.lines[this.position.vertical]!.length)
        }

        return this.update()
    }
}
