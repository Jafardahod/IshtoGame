export class Pawn {
    constructor(player) {
        this.player = player
        this.color = this.color()
        this.position = 3
        this.prev_positon
        this.prev_count
        this.path = this.path()
        this.count = 0
        this.atstart = true
    }

    color(){
        if (this.player == 1){
            return 'orange'
        }
        else if(this.player == 2){
            return 'blue'
        }
    }
    path(){
        if (this.player == 1){
            return [3, 4, 5, 10, 15, 20, 25, 24, 23, 22, 21, 16, 11, 6, 1, 2, 7, 12, 17, 18, 19, 14, 9, 8, 13]
        }
        else if(this.player == 2){
            return [23, 22, 21, 16, 11, 6, 1, 2, 3, 4, 5, 10, 15, 20, 25, 24, 19, 14, 9, 8, 7, 12, 17, 18, 13]
        }
    }


}


