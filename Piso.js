class Piso {
    constructor(x,y,h,w){
        var options = {
            isStatic: true
        }

        this.w = w
        this.h = h;
        this.body = Bodies.rectangle(x,y,w,h,options);
        World.add(world,this.body);
    }

    show(){
        var pos = this.body.position;
        rectMode(CENTER);
        fill(149,126,145);
        rect(pos.x,pos.y,this.w,this.h);
    }
}