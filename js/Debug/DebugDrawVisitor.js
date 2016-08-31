var DebugDrawVisitor = function (context) {
    this.context = context;
}
DebugDrawVisitor.prototype = {
    visitVec2 : function (vec2, origin) {
        this.context.save();
        this.context.translate(origin.x, origin.y);
        this.context.rotate(vec2.heading());

        // tail (line)
        this.context.strokeStyle = 'red';     
        this.context.beginPath();
        this.context.moveTo(0, 0);
        this.context.lineTo(vec2.length(), 0);
        this.context.closePath();
        this.context.stroke();

        // head (arrow)
        var arrow_width = 3; 
        this.context.translate(vec2.length(), 0);
        this.context.beginPath();
        this.context.lineTo(0, -arrow_width);
        this.context.lineTo(arrow_width, 0);
        this.context.lineTo(0, arrow_width);
        this.context.closePath();
        this.context.stroke();

        this.context.stroke();
        this.context.restore();
    },
    visitSegment : function (segment) {
        this.context.strokeStyle = "red";
        this.context.beginPath();
        this.context.moveTo(segment.pointA.x, segment.pointA.y);
        this.context.lineTo(segment.pointB.x, segment.pointB.y);
        this.context.closePath();
        this.context.stroke();
    },
    visitObject : function (object) {
        this.context.save();
        this.context.translate(object.position.x, object.position.y);
        this.context.rotate(object.orientation);
        this.context.strokeStyle = "limegreen";
        this.context.strokeRect(-2, -2, 4, 4);
        this.context.restore();
    },
    visitSteeringGroup : function (steeringGroup) {
        var l = steeringGroup.behaviors.length, i;
        console.log(l);
        for (i = 0; i < l; i++) {
            if(steeringGroup.behaviors[i].acceptDebugDraw !== undefined) {
                steeringGroup.behaviors[i].acceptDebugDraw(this);
            }
        }
    },
    visitWanderBehavior : function (wanderBehavior) {
        this.context.save();
        this.context.strokeStyle = "white";
        this.context.translate(wanderBehavior.wanderPosition.x, wanderBehavior.wanderPosition.y);
        this.context.rotate(wanderBehavior.agent.orientation);
        this.context.beginPath();
        this.context.arc(0, 0, wanderBehavior.wanderRadius, 0, Math.PI*2, true); 
        this.context.closePath();
        this.context.stroke();
        this.context.restore();
        this.context.save();
        this.context.fillStyle = "red";
        this.context.translate(wanderBehavior.target.position.x, wanderBehavior.target.position.y);
        this.context.fillRect(0, 0, 3, 3);
        this.context.restore();
    },
    visitAvoidWallsConstraint : function(avoidWallsConstraint) {
        
    }
};

DebugDrawVisitor.Decorators = {
    drawPositionInfo : function (debugDraw) {
        var _visitObject = debugDraw.visitObject;
        debugDraw.visitObject = function (object) {
            return (function() {
                _visitObject.apply(this, arguments);
                this.context.fillStyle = 'blue';
                this.context.font = '10px monospace';
                this.context.textBaseline = 'bottom';
                this.context.fillText(
                    '(' + Math.round(object.position.x * 100) / 100 + ', ' + Math.round(object.position.y * 100) / 100 + ')',
                    object.position.x + object.width + 2,
                    object.position.y + object.height + 2
                );
            }).bind(debugDraw).apply(this, arguments);
        };
        debugDraw.undecorate = function() {
            debugDraw.visitAgent =  _visitAgent;
        };
        return debugDraw;
    },
    drawOrientationInfo : function(debugDraw) {
        var _visitAgent = debugDraw.visitAgent;
        debugDraw.visitAgent = function(boid) {
            return (function() {
                _visitAgent.apply(this, arguments);
                this.context.fillStyle = 'red';
                this.context.font = '10px monospace';
                this.context.textBaseline = 'bottom';
                this.context.fillText(
                    Math.round((boid.orientation * 180 / Math.PI) * 100) / 100 + '°',
                    boid.position.x + boid.width + 2,
                    boid.position.y + boid.height - 10
                );
            }).bind(debugDraw).apply(this, arguments);
        };
        debugDraw.undecorate = function() {
            debugDraw.visitAgent =  _visitAgent;
        };
        return debugDraw;
    }
};

