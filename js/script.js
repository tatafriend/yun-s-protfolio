const { Engine, Render, Runner, Bodies, World, Mouse, MouseConstraint } = Matter;

const engine = Engine.create();
const world = engine.world;
engine.timing.timeScale = 0.7;

let logicWidth = window.innerWidth;
let logicHeight = window.innerHeight;
let mouseConstraint = null;

// 建立 Canvas
const canvas = document.createElement('canvas');
canvas.id = 'physicsCanvas';
canvas.style.touchAction = 'auto';
canvas.style.pointerEvents = 'auto';
canvas.style.width = '100%';
canvas.style.height = '100%';
document.querySelector('.animation-container').appendChild(canvas);

// Matter.js Render 設定
const render = Render.create({
    engine: engine,
    canvas: canvas,
    options: {
        width: logicWidth,
        height: logicHeight,
        wireframes: false,
        background: 'transparent'
    }
});
Render.run(render);

// Runner 設定
const runner = Runner.create();
Runner.run(runner, engine);

// 邊界元素
let ground, leftWall, rightWall, ceiling;

function createBoundaries() {
    const boundaryStyle = {
        isStatic: true,
        render: { visible: false }
    };
    ground = Bodies.rectangle(0, 0, 0, 0, boundaryStyle); ground.isBoundary = true;
    ceiling = Bodies.rectangle(0, 0, 0, 0, boundaryStyle); ceiling.isBoundary = true;
    leftWall = Bodies.rectangle(0, 0, 0, 0, boundaryStyle); leftWall.isBoundary = true;
    rightWall = Bodies.rectangle(0, 0, 0, 0, boundaryStyle); rightWall.isBoundary = true;
    World.add(world, [ground, ceiling, leftWall, rightWall]);
}

function updateBoundaries() {
    const w = logicWidth;
    const h = logicHeight;

    Matter.Body.setPosition(ground, { x: w / 2, y: h + 10 });
    Matter.Body.setVertices(ground, [
        { x: 0, y: h }, { x: w, y: h }, { x: w, y: h + 20 }, { x: 0, y: h + 20 }
    ]);

    Matter.Body.setPosition(ceiling, { x: w / 2, y: -10 });
    Matter.Body.setVertices(ceiling, [
        { x: 0, y: 0 }, { x: w, y: 0 }, { x: w, y: -20 }, { x: 0, y: -20 }
    ]);

    Matter.Body.setPosition(leftWall, { x: -10, y: h / 2 });
    Matter.Body.setVertices(leftWall, [
        { x: 0, y: 0 }, { x: 0, y: h }, { x: -20, y: h }, { x: -20, y: 0 }
    ]);

    Matter.Body.setPosition(rightWall, { x: w + 10, y: h / 2 });
    Matter.Body.setVertices(rightWall, [
        { x: w, y: 0 }, { x: w + 20, y: 0 }, { x: w + 20, y: h }, { x: w, y: h }
    ]);
}

function createShapes() {
    const A = Bodies.rectangle(130, 110, 100, 230, {
        restitution: 0.8, angle: Math.PI / 6, render: {
            fillStyle: 'transparent', strokeStyle: 'transparent',
            sprite: { texture: 'https://res.cloudinary.com/dsw8xnof0/image/upload/v1759205789/eraser_jyj6bv.svg', xScale: 1.5, yScale: 1.5 }
        }
    });

 
     const B = Bodies.rectangle(350, 100, 260, 260, {
        restitution: 0.8, render: {
            fillStyle: 'transparent', strokeStyle: 'transparent',
            sprite: { texture: 'https://res.cloudinary.com/dsw8xnof0/image/upload/v1759205825/triangle_htfxbw.svg', xScale: 2, yScale: 2.2 }
        }
    });
    const C = Bodies.rectangle(90, 100, 560, 70, {
        restitution: 0.8, angle: Math.PI / 5, render: {
            fillStyle: 'transparent', strokeStyle: 'transparent',
            sprite: { texture: 'https://res.cloudinary.com/dsw8xnof0/image/upload/v1759205797/pen_ee14ug.svg', xScale: 1.8, yScale: 1.8 }
        }
    });
    const D = Bodies.rectangle(44, 55, 500, 44, {
        restitution: 0.8, angle: Math.PI / 6, render: {
            fillStyle: 'transparent', strokeStyle: 'transparent',
            sprite: { texture: 'https://res.cloudinary.com/dsw8xnof0/image/upload/v1759205798/pencil_ttiwps.svg', xScale: 1.7, yScale: 1.5 }
        }
    });
    const E = Bodies.rectangle(350, 100, 260, 260, {
        restitution: 0.8, render: {
            fillStyle: 'transparent', strokeStyle: 'transparent',
            sprite: { texture: 'https://res.cloudinary.com/dsw8xnof0/image/upload/v1759205793/note_wv04mz.svg', xScale: 1.8, yScale: 1.8 }
        }
    });
    const F = Bodies.trapezoid(90, 100, 210, 80, 0.5, {
        restitution: 0.8, render: {
            fillStyle: 'transparent', strokeStyle: 'transparent',
            sprite: { texture: 'https://res.cloudinary.com/dsw8xnof0/image/upload/v1759205789/crayon_ot0z2e.svg', xScale: 0.7, yScale: 0.7 }
        }
    });
    const H = Bodies.circle(400, 100, 150, {
        restitution: 0.8, render: {
            fillStyle: 'transparent', strokeStyle: 'transparent',
            sprite: { texture: 'https://res.cloudinary.com/dsw8xnof0/image/upload/v1759205824/tape_h5wn9x.svg', xScale: 1.7, yScale: 1.7 }
        }
    });
    const G = Bodies.trapezoid(90, 90, 150, 100, 0.5, {
        restitution: 0.8, render: {
            fillStyle: 'transparent', strokeStyle: 'transparent',
            sprite: { texture: 'https://res.cloudinary.com/dsw8xnof0/image/upload/v1759205803/pencil-shavings_hxlf7d.svg', xScale: 0.7, yScale: 0.7 }
        }
    });
    const I = Bodies.rectangle(180, 100, 200, 70, {
        restitution: 0.8, angle: Math.PI / 6, render: {
            fillStyle: 'transparent', strokeStyle: 'transparent',
            sprite: { texture: 'https://res.cloudinary.com/dsw8xnof0/image/upload/v1759205795/paper-clip_wtcryc.svg', xScale: 0.6, yScale: 0.6 }
        }
    });

    World.add(world, [A, B, C, D, E, F, H, G, I]);
}

function updateMouseConstraint() {
    if (mouseConstraint) {
        World.remove(world, mouseConstraint);
    }
    const mouse = Mouse.create(render.canvas);
    mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: { stiffness: 0.2, render: { visible: false } }
    });
    World.add(world, mouseConstraint);
    render.mouse = mouse;
}

function updateScaleByViewport() {
    logicWidth = window.innerWidth;
    logicHeight = window.innerHeight;

    const dpr = window.devicePixelRatio || 1;
    const isMobile = logicWidth < 768;

    // 手機板高度縮短為 70%
    if (isMobile) {
        logicHeight = Math.floor(logicHeight * 0.7);
    }

    // iPhone DPR 修正
    render.canvas.width = logicWidth * dpr;
    render.canvas.height = logicHeight * dpr;
    render.canvas.style.width = logicWidth + "px";
    render.canvas.style.height = logicHeight + "px";

    render.options.width = logicWidth;
    render.options.height = logicHeight;

    Render.lookAt(render, {
        min: { x: 0, y: 0 },
        max: { x: logicWidth, y: logicHeight }
    });

    updateMouseConstraint();
    updateBoundaries();

    // 桌機=1, 手機=0.4
    const scale = isMobile ? 0.4 : 1;

    world.bodies.forEach(body => {
        if (body.isBoundary) return;

        if (!body.originalScale) body.originalScale = 1;
        const targetScale = scale / body.originalScale;

        Matter.Body.scale(body, targetScale, targetScale);
        body.originalScale = scale;

        if (body.render.sprite) {
            if (!body.render.sprite.originalXScale)
                body.render.sprite.originalXScale = body.render.sprite.xScale;
            if (!body.render.sprite.originalYScale)
                body.render.sprite.originalYScale = body.render.sprite.yScale;

            body.render.sprite.xScale = body.render.sprite.originalXScale * scale;
            body.render.sprite.yScale = body.render.sprite.originalYScale * scale;
        }
    });
}

// 🎯 修正滾動問題：加上被動事件處理器
canvas.addEventListener('touchstart', () => { }, { passive: true });
canvas.addEventListener('wheel', () => { }, { passive: true });

createBoundaries();
createShapes();
updateScaleByViewport();
window.addEventListener('resize', updateScaleByViewport);



