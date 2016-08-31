var SteeringGroup = function (agent) {
    this.agent = agent;
    this.behaviors = [];
    this.force = new Vec2d();
    this.rotation = 0;
};
SteeringGroup.prototype = {
    add : function (behavior) {
        this.behaviors.push(behavior);
    },
    reset : function() {
        this.behaviors = [];
    },
    compute : function() {
        this.force = new Vec2d();
        this.rotation = 0;
        var l = this.behaviors.length, i;
        var coeffs = 0;
        for (i = 0; i < l; ++i) {
            var behavior = this.behaviors[i];
            behavior.computeSteering();
            coeffs += behavior.weight;
            behavior.force.multiply(behavior.weight);
            this.force.add(behavior.force);
            this.rotation += behavior.rotation * behavior.weight;
        }
        this.rotation /= coeffs;
    },
    acceptDebugDraw : function(dd) {
        dd.visitSteeringGroup(this);
    }
};