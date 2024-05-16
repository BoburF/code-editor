export class Editor {
    constructor(private lines: string[]) {
        this.init()
    }

    private init(){
        this.lines[0] = "|" + this.lines[0]
    }

    update(){
        return this.lines
    }
}
