<template>
  <div
    id="sky"
    class="sky-container"
  >
    <canvas class="canvas dust-canvas" />
    <canvas class="canvas star-canvas" />
  </div>
</template>

<script setup>


/* Begin draw */

onMounted(() => {
  const w = window.innerWidth;
  const h = window.innerHeight;

  const dustCanvas = document.getElementsByClassName('dust-canvas')[0];
  const dustCtx = dustCanvas.getContext('2d');
  const starCanvas = document.getElementsByClassName('star-canvas')[0];
  const starCtx = starCanvas.getContext('2d');
  starCanvas.className = 'canvas star-canvas';


  const container = document.getElementById('sky');
  container.appendChild(dustCanvas);
  container.appendChild(starCanvas);

  dustCanvas.width = starCanvas.width = w;
  dustCanvas.height = starCanvas.height = h;

  dustCtx.globalCompositeOperation = 'lighter';
  starCtx.globalCompositeOperation = 'lighter';

  const galaxies = [];

  const mouse = {
    pos: {
      x: w * 0.5,
      y: h * 0.5
    },
    speed: 0
  };

  const randomNumbers = length => Array.from(new Array(length), () => Math.random());
  const PI = Math.PI;
  const TAU = PI * 2;
  const r = () => Math.random();
  const angle2 = (p1,p2) => Math.atan2(
    p2[1]-p1[1],
    p2[0]-p1[0]
  );
  const distance2 = (p1,p2) => Math.sqrt(
    Math.pow(p1[0]-p2[0], 2) + 
    Math.pow(p1[1]-p2[1], 2)
  );

  const createDustParticle = yourColor => {
    
    const canvas = document.createElement('canvas');
    
    const w = 100;
    const h = 100;
    const cx = w * 0.5;
    const cy = h * 0.5;
    
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext('2d');
    canvas.ctx = ctx;
    
    const xRand = -5 + (r()*10);
    const yRand = -5 + (r()*10);
    const xRand2 = 10 + (r()*(cx/2));
    const yRand2 = 10 + (r()*(cy/2));
    
    const color = yourColor || {
      r: Math.round(150+(r()*100)),
      g: Math.round(50+(r()*100)),
      b: Math.round(50+(r()*100))
    };
    
    ctx.fillStyle = `rgba(${color.r},${color.g},${color.b},.02)`;
    
    Array
      .from(new Array(200), () => randomNumbers(3))
      .forEach( (p,i,arr) => {
        const length = arr.length;
        
        const x = Math.cos( TAU/xRand/length*i ) * p[2]*xRand2 + cx;
        const y = Math.sin( TAU/yRand/length*i ) * p[2]*yRand2 + cy;
        
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.arc(x, y, p[2]*4, 0, TAU);
        ctx.fill();
      });
    
    return canvas;
  };

  const Galaxy = function(x,y) {
    
    const g = this;
    
    g.x = x;
    g.y = y;
    g.stars = [];
    g.dust = [];
    g.drag = r();
    
    g.angleOffsetX = TAU*r();
    g.angleOffsetY = TAU*r();
    g.realAngleOffsetX = 0;
    g.realAngleOffsetY = 0;
    
    g.color = {
      r: Math.round(50+(r()*100)),
      g: Math.round(50+(r()*100)),
      b: Math.round(150+(r()*100))
    };
    
    const calculateStarDustParams = o => {
      o.angle = angle2([g.x,g.y], [o.x,o.y]);
      o.distance = distance2([g.x,g.y], [o.x,o.y]);
      o.xAspect = [o.x/o.y];
      o.yAspect = [o.y/o.x];
    };
    
    g.calculateCenter = () => {
      if (!g.stars.length) return;
      g.x = g.stars
        .map(s => s.x)
        .reduce((previous,current) => previous + current)
        / g.stars.length;
      
      g.y = g.stars
        .map(s => s.y)
        .reduce((previous,current) => previous + current)
        / g.stars.length;
      
      g.stars.forEach(calculateStarDustParams);
      g.dust.forEach(calculateStarDustParams);
    };
    
  };

  const Star = function(x, y, spread) {
    const s = this;
    s.x = x + Math.cos(TAU*r()) * spread;
    s.y = y + Math.sin(TAU*r()) * spread;
    s.radius = r()+0.25;
    s.speed = r();
  };

  const Dust = function(x, y, size) {
    const d = this;
    d.x = x;
    d.y = y;
    d.size = size;
    d.texture = createDustParticle();
    d.speed = r();
  };

  const updateStarDust = (s,g) => {
    if (g === currentGalaxy && drawingMode) return;
    s.angle += (0.5+(s.speed*0.5))/s.distance;
    s.x = g.x + (Math.cos(s.angle+g.realAngleOffsetX)*s.distance);
    s.y = g.y + (Math.sin(s.angle+g.realAngleOffsetY)*s.distance);
  };

  const update = () => {
    galaxies.forEach(g => {
      if (g !== currentGalaxy) {
        g.realAngleOffsetX +=
        g.realAngleOffsetX < g.angleOffsetX
          ? (g.angleOffsetX-g.realAngleOffsetX)*0.05 : 0;
        g.realAngleOffsetY +=
        g.realAngleOffsetY < g.angleOffsetY
          ? (g.angleOffsetY-g.realAngleOffsetY)*0.05 : 0;
      }
      g.stars.forEach((s) => {
        /*s.distance -= s.distance < 2
        ? 0
        : TAU/s.distance;*/
        updateStarDust(s,g);
      });
      g.dust.forEach((d) => {
        /*d.distance -= d.distance < 50
        ? 0
        : TAU/d.distance;*/
        updateStarDust(d,g);
      });
    });
  };

  const render = () => {
    
    dustCtx.globalCompositeOperation = 'source-over';
    dustCtx.fillStyle = 'rgba(0,0,0,.05)';
    dustCtx.fillRect(0,0,w,h);
    dustCtx.globalCompositeOperation = 'lighter';

    starCtx.clearRect(0,0,w,h);
    starCtx.fillStyle = '#ffffff';
    starCtx.strokeStyle = 'rgba(255,255,255,.05)';
    starCtx.beginPath();
    
    if (drawingMode) galaxies.forEach(g => {
      starCtx.moveTo(g.x, g.y);
      starCtx.arc(g.x,g.y,2,0,TAU);
    });
    
    galaxies.forEach(g => {
      g.stars.forEach(s => {
        starCtx.moveTo(s.x, s.y);
        starCtx.arc(s.x,s.y,s.radius,0,TAU);
      });
      g.dust.forEach(d => {
        dustCtx.drawImage(d.texture, d.x-(d.size*0.5), d.y-(d.size*0.5), d.size, d.size);
      });
    });
    
    dustCtx.fill();
    starCtx.fill();
    
    if (drawingMode && currentGalaxy) {
      starCtx.beginPath();
      currentGalaxy.stars.forEach((s,i) => {
        starCtx.moveTo(s.x, s.y);
        starCtx.lineTo(currentGalaxy.x, currentGalaxy.y);
      });
      starCtx.stroke();
    }
    
  };

  let currentGalaxy = null;

  let drawingMode = false;

  const activateDraw = e => {
    drawingMode = true;
    mouse.pos.x = e.layerX;
    mouse.pos.y = e.layerY;
    currentGalaxy = new Galaxy(e.layerX, e.layerY);
    galaxies.push(currentGalaxy);
  };
  const disableDraw = e => {
    drawingMode = false;
    currentGalaxy = null;
  };
  const draw = e => {
    if (!drawingMode) return;
    
    currentGalaxy.stars.push(new Star(mouse.pos.x, mouse.pos.y, mouse.speed));
    currentGalaxy.stars.push(new Star(mouse.pos.x, mouse.pos.y, mouse.speed));
    currentGalaxy.stars.push(new Star(mouse.pos.x, mouse.pos.y, mouse.speed));
    
    if (mouse.speed*1.5 > 13 && mouse.speed < 100) currentGalaxy.dust.push(
      new Dust(
        (currentGalaxy.x + (Math.cos(TAU*r()) * mouse.speed*0.1)),
        (currentGalaxy.y + (Math.sin(TAU*r()) * mouse.speed*0.1)),
        mouse.speed*1.5
      )
    );
    
    currentGalaxy.calculateCenter();
    
  };

  const loop = () => {
    draw();
    update();
    render();
    window.requestAnimationFrame(loop);
  };

  loop();

  const moveEvent = e => {
    mouse.speed =  distance2(
      [e.layerX,e.layerY],
      [mouse.pos.x,mouse.pos.y]
    );
    mouse.pos.x = e.layerX;
    mouse.pos.y = e.layerY;
    draw(e);
  };

  window.addEventListener('mousedown', activateDraw);
  window.addEventListener('mousemove', moveEvent);
  window.addEventListener('mouseup',disableDraw);

});

</script>


<style lang="sass" scoped>
.sky-container
  width: 100vw
  height: 100vh

.sky-container .canvas
  position: absolute
  top: 0
  left: 0
  width: 100%
  height: 100%
  &.dust-canvas
    background: black
    display: block
    box-shadow: inset 0 0 60px rgba(255,255,255,0.6)
    -box-shadow: inset 0 0 60px rgba(255,255,255,0.6)
</style>
