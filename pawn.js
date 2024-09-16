export class Pawn {
    constructor(player) {
        this.player = player
        this.color = this.color()
        this.position
        this.prev_positon
        this.prev_count
        this.path = this.path()
        this.count = 0
        this.atstart = true
    }

    color(){
        if (this.player == 1){
            return 'red'
        }
        else if(this.player == 2){
            return 'blue'
        }
        else if(this.player == 3){
            return 'chartreuse'
        }
        else if(this.player == 4){
            return 'yellow'
        }
    }
    path(){
        if (this.player == 1){
            return [3, 2, 1, 6, 11, 16, 21, 22, 23, 24, 25, 20, 15, 10, 5, 4, 9, 14, 19, 18, 17, 12, 7, 8, 13]
        }
        else if(this.player == 2){
            return [11, 16, 21, 22, 23, 24, 25, 20, 15, 10, 5, 4, 3, 2, 1, 6, 7, 8, 9, 14, 19, 18, 17, 12, 13]
        }
        else if(this.player == 3){
            return [23, 24, 25, 20, 15, 10, 5, 4, 3, 2, 1, 6, 11, 16, 21, 22, 17, 12, 7, 8, 9, 14, 19, 18, 13]
        }
        else if(this.player == 4){
            return [15, 10, 5, 4, 3, 2, 1, 6, 11, 16, 21, 22, 23, 24, 25, 20, 19, 18, 17, 12, 7, 8, 9, 14, 13]
        }
    }


}


