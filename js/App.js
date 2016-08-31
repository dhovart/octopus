(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = 
          window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
    }
 
    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
 
    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());

var App = function(container, debug) {
    if (!Modernizr.canvas)
        return;
    
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    var displayCanvas = container.appendChild(document.createElement("canvas"));
    displayCanvas.setAttribute("width", this.width);
    displayCanvas.setAttribute("height", this.height);
    displayCanvas.addEventListener("mousemove", App.prototype.onMouseMove.bind(this), false);
    
    this.context = displayCanvas.getContext("2d");

    this.debugDraw = new DebugDrawVisitor(this.context);
    this.debugDraw = new DebugDrawVisitor.Decorators.drawPositionInfo(this.debugDraw);
    this.debugDraw = new DebugDrawVisitor.Decorators.drawOrientationInfo(this.debugDraw);

    this.mouseX = 0;
    this.mouseY = 0;
};

App.prototype.clearContext = function() {
    this.context.clearRect(0, 0, this.width, this.height);
};

App.prototype.onMouseMove = function (event) {
    this.mouseX = event.clientX;
    this.mouseY = event.clientY;
};