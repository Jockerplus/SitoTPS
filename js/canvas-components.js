function Animator(){
  this.objects = [];
  
  this.update();
}

Animator.prototype.update = function(){
  for(var i = 0; i < this.objects.length; i++){
    this.objects[i].update();
  }
  window.requestAnimationFrame(this.update.bind(this))
}

Animator.prototype.add = function(animatable){
  this.objects.push(animatable);
}

function Cake(canvas, data){
  var self = this;
  this.canvas = $(canvas);
  this.data = data;
  for(var i = 0; i < this.data.length; i++){
    this.data[i].animationState = 0;
    this.data[i].mouseOnTime = 0;
  }
  this.context = this.canvas[0].getContext("2d");
  this.width = this.canvas.width();
  this.height = this.canvas.height();
  this.canvas.width = this.width;
  this.canvas.height = this.height;
  this.radius = Math.min(this.height, this.width) / 2 - 20;
  this.center = {x: this.width / 2, y: this.height / 2};
  this.done = false;
  this.prev = 0;
  this.canvas[0].addEventListener('mousemove', function(evt) {
    var mousePos = getMousePos(self.canvas[0], evt);
    self.mouse = mousePos;
  }, false);
}

Cake.prototype.update = function(){
  this.context.clearRect(0, 0, this.width, this.height);
  for(var i = 0; i < this.data.length; i++){
    if(this.data[i].animationState < 100 || true){
      this.data[i].angle = ((2 * Math.PI) / this.data[i].maxValue)  * this.data[i].value * ((Math.sin(Math.min(this.data[i].animationState, 100) / 100 * Math.PI - (Math.PI / 2)) + 1) / 2);
      this.context.beginPath();
      this.context.ellipse(this.center.x, this.center.y, this.radius, this.radius, this.data[i].animationState / 5000 + this.prev, 0, this.data[i].angle, false);
      this.context.strokeStyle = this.data[i].color;
      this.context.lineWidth = 10 + this.data[i].mouseOnTime / 2;
      this.context.stroke();
      if(this.mouse && this.context.isPointInStroke(this.mouse.x, this.mouse.y)){
        var color = hexToRgb(this.data[i].color);
        this.context.fillStyle = "rgba("+ color.r * (this.data[i].mouseOnTime / 10) +", "+ color.g * (this.data[i].mouseOnTime / 10) +" , "+ color.b * (this.data[i].mouseOnTime / 10) +" , "+ this.data[i].mouseOnTime * 25 +")";
        this.context.font = "20px sans-serif"
        this.context.textAlign = "center";
        this.context.lineWidth = 1;
        this.context.fillText(this.data[i].text, this.center.x, this.center.y);
        if(this.data[i].mouseOnTime < 10){
          this.data[i].mouseOnTime++;
        }
      }else{
        if(this.data[i].mouseOnTime > 0){
          this.data[i].mouseOnTime--;
        }
      }
      this.prev = this.data[i].angle + this.prev;
      
      this.data[i].animationState++;
    }

  }
  this.prev = this.data[0].animationState / 5000;
}

function getMousePos(canvas, evt) {
  var rect = canvas.getBoundingClientRect();
  return {
    x: evt.clientX - rect.left,
    y: evt.clientY - rect.top
  };
}

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}


