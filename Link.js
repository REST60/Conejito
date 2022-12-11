class Link{
    //bodyA = cuerda |||| bodyB = fruta.,
    constructor(bodyA,bodyB){
        var lastRect = bodyA.body.bodies.length-2;
        this.link = Constraint.create({
                bodyA:bodyA.body.bodies[lastRect],
                pointA:{x:0,y:0},
                bodyB:bodyB,
                pointB:{x:0,y:0},
                length:0,
                stiffness:0.01
            });
            World.add(world,this.link); 
    }

    detach(){
        World.remove(world,this.link);
        
    }
}