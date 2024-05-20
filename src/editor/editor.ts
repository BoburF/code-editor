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

    moveCursor({ vertical, horizontal }: {
        vertical: number,
        horizontal: number,
    }) {
        if(!this.lines[this.position.vertical + vertical]) return
        if(!this.lines[this.position.vertical + vertical]![this.position.horizontal + horizontal]){
            this.position.horizontal = this.lines[this.position.vertical + vertical]!.length
        }

        if (this.lines[this.position.vertical]) {
            this.lines[this.position.vertical] = this.lines[this.position.vertical]!.slice(0, this.position.horizontal) + "" + this.lines[this.position.vertical]!.slice(this.position.horizontal + 1, this.lines[this.position.vertical]!.length)
        }

        this.position.vertical += vertical
        this.position.horizontal += horizontal 

        if (this.lines[this.position.vertical]) {
            this.lines[this.position.vertical] = this.lines[this.position.vertical]!.slice(0, this.position.horizontal) + "|" + this.lines[this.position.vertical]!.slice(this.position.horizontal, this.lines[this.position.vertical]!.length)
        }

        return this.update()
    }
}
