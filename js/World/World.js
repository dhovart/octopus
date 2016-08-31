var World = function (width, height) {
    this.agents = [];
    this.walls = [];
    this.width = width;
    this.height = height;
    this.setBounds(new Rectangle(width, height, new Vec2d(), 0));
};
World.prototype.addAgent = function (agent) {
    this.agents.push(agent);
};
World.prototype.addWall = function (segment) {
    this.walls.push(wall);
};
World.prototype.getWalls = function () {
    return this.walls;
};
World.prototype.setBounds = function (rectangle) {
    this.walls = this.walls.concat(rectangle.getSegments());
};

World.prototype.update = function () {
};

World.prototype.draw = function (context) {
    var agentsTotal = this.agents.length;
    for (var i = 0; i < agentsTotal; ++i) {
        this.agents[i].draw(context);
    }
};

World.prototype.acceptDebugDraw = function (dd) {
    var agentsTotal = this.agents.length, wallsTotal = this.walls.length;
    for (var i = 0; i < agentsTotal; ++i)
        this.agents[i].acceptDebugDraw(dd);
    for (var i = 0; i < wallsTotal; ++i)
        this.walls[i].acceptDebugDraw(dd);
};
