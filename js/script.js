const { Engine, Render, Runner, Bodies, World, Mouse, MouseConstraint, Body } = Matter;

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
    const boundaryStyle = { isStatic: true, render: { visible: false } };
    ground = Bodies.rectangle(0, 0, 0, 0, boundaryStyle); ground.isBoundary = true;
    ceiling = Bodies.rectangle(0, 0, 0, 0, boundaryStyle); ceiling.isBoundary = true;
    leftWall = Bodies.rectangle(0, 0, 0, 0, boundaryStyle); leftWall.isBoundary = true;
    rightWall = Bodies.rectangle(0, 0, 0, 0, boundaryStyle); rightWall.isBoundary = true;
    World.add(world, [ground, ceiling, leftWall, rightWall]);
}

function updateBoundaries() {
    const w = logicWidth;
    const h = logicHeight;

    Body.setPosition(ground, { x: w / 2, y: h + 10 });
    Body.setVertices(ground, [
        { x: 0, y: h }, { x: w, y: h }, { x: w, y: h + 20 }, { x: 0, y: h + 20 }
    ]);

    Body.setPosition(ceiling, { x: w / 2, y: -10 });
    Body.setVertices(ceiling, [
        { x: 0, y: 0 }, { x: w, y: 0 }, { x: w, y: -20 }, { x: 0, y: -20 }
    ]);

    Body.setPosition(leftWall, { x: -10, y: h / 2 });
    Body.setVertices(leftWall, [
        { x: 0, y: 0 }, { x: 0, y: h }, { x: -20, y: h }, { x: -20, y: 0 }
    ]);

    Body.setPosition(rightWall, { x: w + 10, y: h / 2 });
    Body.setVertices(rightWall, [
        { x: w, y: 0 }, { x: w + 20, y: 0 }, { x: w + 20, y: h }, { x: w, y: h }
    ]);
}

function createShapes() {
    const shapes = [
        Bodies.rectangle(130, 110, 100, 230, {
            restitution: 0.8, angle: Math.PI / 6, render: {
                fillStyle: 'transparent', strokeStyle: 'transparent',
                sprite: { texture: 'https://res.cloudinary.com/dsw8xnof0/image/upload/v1759205789/eraser_jyj6bv.svg', xScale: 1.5, yScale: 1.5 }
            }
        }),
        Bodies.fromVertices(300, 100, [
            { x: 300, y: 100 }, { x: 300, y: 430 }, { x: 450, y: 295 }
        ], { restitution: 0.8, render: { fillStyle: 'transparent', strokeStyle: 'transparent', sprite: { texture: 'https://res.cloudinary.com/dsw8xnof0/image/upload/v1759205825/triangle_htfxbw.svg', xScale: 2, yScale: 2.2 } } }, true),
        Bodies.rectangle(90, 100, 560, 70, { restitution: 0.8, angle: Math.PI / 5, render: { fillStyle: 'transparent', strokeStyle: 'transparent', sprite: { texture: 'https://res.cloudinary.com/dsw8xnof0/image/upload/v1759205797/pen_ee14ug.svg', xScale: 1.8, yScale: 1.8 } } })
        // ...其他物件同上
    ];

    // 儲存原始尺寸
    shapes.forEach(body => {
        body.originalScale = 1;
        if (body.render.sprite) {
            body.render.sprite.originalXScale = body.render.sprite.xScale;
            body.render.sprite.originalYScale = body.render.sprite.yScale;
        }
    });

    World.add(world, shapes);
}

function updateMouseConstraint() {
    if (mouseConstraint) World.remove(world, mouseConstraint);
    const mouse = Mouse.create(render.canvas);
    mouseConstraint = MouseConstraint.create(engine, { mouse, constraint: { stiffness: 0.2, render: { visible: false } } });
    World.add(world, mouseConstraint);
    render.mouse = mouse;
}

function updateScaleByViewport() {
    const isMobile = window.innerWidth < 768;
    const scale = isMobile ? 0.4 : 1;

    world.bodies.forEach(body => {
        if (body.isBoundary) return;

        if (!body.originalScale) body.originalScale = 1;
        const factor = scale / body.originalScale;
        Body.scale(body, factor, factor);
        body.originalScale = scale;

        if (body.render.sprite) {
            if (!body.render.sprite.originalXScale) body.render.sprite.originalXScale = body.render.sprite.xScale;
            if (!body.render.sprite.originalYScale) body.render.sprite.originalYScale = body.render.sprite.yScale;

            body.render.sprite.xScale = body.render.sprite.originalXScale * scale;
            body.render.sprite.yScale = body.render.sprite.originalYScale * scale;
        }
    });
}

// 🎯 被動事件防滾動問題
canvas.addEventListener('touchstart', () => {}, { passive: true });
canvas.addEventListener('wheel', () => {}, { passive: true });

createBoundaries();
createShapes();
updateScaleByViewport();
window.addEventListener('resize', updateScaleByViewport);
