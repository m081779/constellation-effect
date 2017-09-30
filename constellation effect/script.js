var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');
var mouseX;
var mouseY;
var mouseDistance = 1;
var starDistance = 1;
var particleIterator = 1;
var particleCount = 1;
var velocityDivisor = 1;
var velDiv = document.getElementById('velocityDivisor');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
var particleArr = [];
document.getElementById('velocityDivisor').oninput = function () {
	particleArr = [];
	velocityDivisor = this.value;

	for (var i = 0; i<particleCount; i++) {
		console.log(velocityDivisor);
		var radius = Math.random() * 10 + 1;
		var x = Math.random() * (innerWidth - radius * 2) + radius;
		var y = Math.random() * (innerHeight - radius * 2) + radius;
		var dx = (Math.random() - 0.5)/velocityDivisor;
		var dy = (Math.random() - 0.5)/velocityDivisor;

		particleArr.push(new Particle(x,y,dx,dy));
	}
}

document.getElementById('particleCount').oninput = function () {
	particleArr = [];
	particleCount = this.value;

	for (var i = 0; i<particleCount; i++) {
		console.log(velocityDivisor);
		var radius = Math.random() * 10 + 1;
		var x = Math.random() * (innerWidth - radius * 2) + radius;
		var y = Math.random() * (innerHeight - radius * 2) + radius;
		var dx = (Math.random() - 0.5)/velocityDivisor;
		var dy = (Math.random() - 0.5)/velocityDivisor;

		particleArr.push(new Particle(x,y,dx,dy));
	}
}

document.getElementById('mouseDistance').oninput = function () {
	particleArr = [];
	mouseDistance = this.value;

	for (var i = 0; i<particleCount; i++) {
		var radius = Math.random() * 10 + 1;
		var x = Math.random() * (innerWidth - radius * 2) + radius;
		var y = Math.random() * (innerHeight - radius * 2) + radius;
		var dx = (Math.random() - 0.5)/velocityDivisor;
		var dy = (Math.random() - 0.5)/velocityDivisor;

		particleArr.push(new Particle(x,y,dx,dy));
	}
}

document.getElementById('starDistance').oninput = function () {
	particleArr = [];
	starDistance = this.value;

	for (var i = 0; i<particleCount; i++) {
		var radius = Math.random() * 10 + 1;
		var x = Math.random() * (innerWidth - radius * 2) + radius;
		var y = Math.random() * (innerHeight - radius * 2) + radius;
		var dx = (Math.random() - 0.5)/velocityDivisor;
		var dy = (Math.random() - 0.5)/velocityDivisor;

		particleArr.push(new Particle(x,y,dx,dy));
	}
}


var mouse = {
	x: undefined,
	y: undefined
}

window.addEventListener('mousemove', function (event) {
	mouse.x = event.offsetX;
	mouse.y = event.offsetY;
});

function Particle(x,y,dx,dy) {
	this.x = x;
	this.y = y;
	this.dx = dx;
	this.dy = dy;

	this.update = function () {

		this.x+= this.dx;
		this.y+= this.dy;

		if (this.x>canvas.width || this.x <0) {
			this.dx = -this.dx;
		}

		if (this.y>canvas.height || this.y <0) {
			this.dy = -this.dy;
		}

		this.draw()

		if (mouse.x - this.x  < mouseDistance 
			&& mouse.x - this.x  > -mouseDistance 
			&& mouse.y - this.y < mouseDistance 
			&& mouse.y - this.y > -mouseDistance) {
				c.beginPath();
				c.moveTo(mouse.x, mouse.y);
				c.lineTo(this.x, this.y);
				c.lineWidth = 0.5;
				c.strokeStyle = '#ddd';
				c.stroke();	
		}

		for (var i = 0; i< particleArr.length; i+=particleIterator){
			if (particleArr[i].x - this.x  < starDistance 
				&& particleArr[i].x - this.x  > -starDistance 
				&& particleArr[i].y - this.y < starDistance 
				&& particleArr[i].y - this.y > -starDistance) {
					c.beginPath();
					c.moveTo(particleArr[i].x, particleArr[i].y);
					c.lineTo(this.x, this.y);
					c.lineWidth = 0.5;
					c.strokeStyle = '#ddd';
					c.stroke();	
			}
		}
	} //end of update function 

	this.draw = function () {
		c.beginPath();
		c.arc(this.x, this.y, 0.5, 0, 2 * Math.PI);
		c.stroke();
	}
} //end of Particle constructor




window.resize = function () {

	console.log('resize firing');
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
}
window.addEventListener('resize', function () {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
});

function animate() {
	c.clearRect(0,0, window.innerWidth, window.innerHeight);
	requestAnimationFrame(animate);

	for (var i = 0; i<particleArr.length; i++) {
		particleArr[i].update();
	}

}

animate();


