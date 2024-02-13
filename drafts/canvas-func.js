// const canvas = document.querySelector('canvas');
// const ctx = canvas.getContext('2d');
// // let intervalId;
// let particles = [];

// canvas.width = innerWidth;
// canvas.height = innerHeight;

// const mouse = {
//   x: innerWidth / 2,
//   y: innerHeight / 2,
// };

// const gravity = 0.03;
// const friction = 0.99;
// const particleCount = 500;
// const power = 12;
// const radius = 3;

// animate();

// class Particle {
//   constructor(x, y, radius, color, velocity) {
//     this.x = x;
//     this.y = y;
//     this.radius = radius;
//     this.color = color;
//     this.velocity = {
//       x: velocity.x,
//       y: velocity.y,
//     };
//     this.opacity = 1;
//   }

//   draw() {
//     ctx.save();
//     ctx.globalAlpha = this.opacity;
//     ctx.beginPath();
//     ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
//     ctx.fillStyle = this.color;
//     ctx.fill();
//     ctx.closePath();
//     ctx.restore();
//   }

//   update() {
//     this.draw();
//     this.applyFriction();
//     this.applyGravity();
//     this.move();
//     this.updateOpacity();
//   }

//   applyFriction() {
//     this.velocity.x *= friction;
//     this.velocity.y *= friction;
//   }

//   applyGravity() {
//     this.velocity.y += gravity;
//   }

//   move() {
//     this.x += this.velocity.x;
//     this.y += this.velocity.y;
//   }

//   updateOpacity() {
//     this.opacity -= 0.003;
//   }
// }

// addEventListener('click', handleClick);
// addEventListener('resize', handleResize);

// function animate() {
//   requestAnimationFrame(animate);
//   clearCanvas();
//   updateParticles();
// }

// function handleResize() {
//   canvas.width = innerWidth;
//   canvas.height = innerHeight;
// }

// function handleClick(event) {
//   if (!canvas.classList.contains('hidden')) {
//     console.log('click');
//     mouse.x = event.clientX;
//     mouse.y = event.clientY;
//     launchParticles();
//   }
// }

// function createParticle(radians, power, i) {
//   console.log('i: ', i);
//   console.log('power: ', power);
//   console.log('radians: ', radians);
//   const color = `hsl(${Math.random() * 360}, 50%, 50%)`;
//   const velocity = {
//     x: Math.cos(radians * i) * (Math.random() * power),
//     y: Math.sin(radians * i) * (Math.random() * power),
//   };
//   particles.push(new Particle(mouse.x, mouse.y, radius, color, velocity));
// }

// function updateParticles() {
//   particles.forEach((particle, i) => {
//     if (particle.opacity > 0) {
//       particle.update();
//     } else {
//       particles.splice(i, 1);
//     }
//   });
// }

// function clearCanvas() {
//   ctx.fillStyle = 'rgba(0,0,0,0.05)';
//   ctx.fillRect(0, 0, canvas.width, canvas.height);
// }

// function startFireWork() {
//   launchParticlesFromTopLeft();
//   launchParticlesFromBottomRight();
//   setTimeout(() => {
//     launchParticlesFromTopRight();
//     launchParticlesFromBottomLeft();
//     launchParticlesFromTopLeft();
//     launchParticlesFromBottomRight();
//   }, 2000);
// }

// function restartFireWork() {
//   launchParticlesFromTopRight();
//   launchParticlesFromTopLeft();

//   setTimeout(() => {
//     launchParticlesFromBottomLeft();
//     launchParticlesFromBottomRight();
//   }, 3000);
//   setTimeout(() => {
//     launchParticlesFromTopRight();
//     launchParticlesFromTopLeft();
//   }, 4000);
// }

// function launchParticlesFromTopLeft() {
//   mouse.x = 150;
//   mouse.y = 150;
//   launchParticles();
// }

// function launchParticlesFromTopRight() {
//   mouse.x = window.innerWidth - 150;
//   mouse.y = 150;
//   launchParticles();
// }

// function launchParticlesFromBottomRight() {
//   mouse.x = window.innerWidth - 150;
//   mouse.y = window.innerHeight - 150;
//   launchParticles();
// }

// function launchParticlesFromBottomLeft() {
//   mouse.x = 150;
//   mouse.y = window.innerHeight - 150;
//   launchParticles();
// }

// function launchParticles() {
//   const radians = (Math.PI * 2) / particleCount;
//   for (let i = 0; i < particleCount; i++) {
//     createParticle(radians, power, i);
//   }
// }
