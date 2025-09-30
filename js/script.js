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


        Bodies.trapezoid(90, 100, 210, 80, 0.5, { restitution: 0.8, render: { fillStyle: 'transparent', strokeStyle: 'transparent', sprite: { texture: 'https://res.cloudinary.com/dsw8xnof0/image/upload/v1759242316/crayon_clipstudio_bmvce3.svg', xScale: 0.7, yScale: 0.7 } } }),
        Bodies.trapezoid(92, 100, 210, 84, 0.5, { restitution: 0.8, render: { fillStyle: 'transparent', strokeStyle: 'transparent', sprite: { texture: 'https://res.cloudinary.com/dsw8xnof0/image/upload/v1759234837/crayon_photoshop_brd9sr.svg', xScale: 0.7, yScale: 0.7 } } }),
        Bodies.rectangle(180, 100, 200, 70, { restitution: 0.8, angle: Math.PI / 6, render: { fillStyle: 'transparent', strokeStyle: 'transparent', sprite: { texture: 'https://res.cloudinary.com/dsw8xnof0/image/upload/v1759235563/crayon_Illustrator_ppvxej.svg', xScale: 0.7, yScale: 0.7 } } }),
        Bodies.rectangle(180, 100, 200, 70, { restitution: 0.8, angle: Math.PI / 6, render: { fillStyle: 'transparent', strokeStyle: 'transparent', sprite: { texture: 'https://res.cloudinary.com/dsw8xnof0/image/upload/v1759235876/crayon_figma_yjtvd1.svg', xScale: 0.7, yScale: 0.7 } } }),
Bodies.rectangle(180, 100, 200, 70, { restitution: 0.8, angle: Math.PI / 6, render: { fillStyle: 'transparent', strokeStyle: 'transparent', sprite: { texture: 'https://res.cloudinary.com/dsw8xnof0/image/upload/v1759244827/crayon_html_d7tq6b.svg', xScale: 0.7, yScale: 0.7 } } }),
         Bodies.rectangle(150, 100, 150, 70, { restitution: 0.8, angle: Math.PI / 6, render: { fillStyle: 'transparent', strokeStyle: 'transparent', sprite: { texture: 'https://res.cloudinary.com/dsw8xnof0/image/upload/v1759244018/crayon_splina_cnsbdf.svg', xScale: 0.6, yScale: 0.6 } } }),

        Bodies.rectangle(180, 100, 200, 70, { restitution: 0.8, angle: Math.PI / 6, render: { fillStyle: 'transparent', strokeStyle: 'transparent', sprite: { texture: 'https://res.cloudinary.com/dsw8xnof0/image/upload/v1759237241/crayon_maya_mdpzaf.svg', xScale: 0.7, yScale: 0.7 } } }),
        Bodies.rectangle(180, 100, 200, 70, { restitution: 0.8, angle: Math.PI / 6, render: { fillStyle: 'transparent', strokeStyle: 'transparent', sprite: { texture: 'https://res.cloudinary.com/dsw8xnof0/image/upload/v1759237968/crayon_protopie_e1zkxr.svg', xScale: 0.7, yScale: 0.7 } } }),
        Bodies.rectangle(180, 100, 220, 70, { restitution: 0.8, angle: Math.PI / 6, render: { fillStyle: 'transparent', strokeStyle: 'transparent', sprite: { texture: 'https://res.cloudinary.com/dsw8xnof0/image/upload/v1759236517/crayon_aftereffects_tcq1o7.svg', xScale: 0.8, yScale: 0.8 } } }),
        
        Bodies.trapezoid(90, 100, 210, 80, 0.5, { restitution: 0.8, render: { fillStyle: 'transparent', strokeStyle: 'transparent', sprite: { texture: 'https://res.cloudinary.com/dsw8xnof0/image/upload/v1759239558/crayon_webflow_isuqj5.svg', xScale: 0.7, yScale: 0.7 } } }),
Bodies.trapezoid(100, 100, 150, 180, 0.5, { restitution: 0.8, render: { fillStyle: 'transparent', strokeStyle: 'transparent', sprite: { texture: 'https://res.cloudinary.com/dsw8xnof0/image/upload/v1759205789/eraser_jyj6bv.svg', xScale: 1.3, yScale: 1.3 } } }),
        Bodies.rectangle(90, 100, 200, 70, { restitution: 0.8, angle: Math.PI / 6, render: { fillStyle: 'transparent', strokeStyle: 'transparent', sprite: { texture: 'https://res.cloudinary.com/dsw8xnof0/image/upload/v1759205795/paper-clip_wtcryc.svg', xScale: 0.6, yScale: 0.6 } } })
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

    const isMobile = logicWidth < 560;

    // 手機板高度縮短為 70%
    if (isMobile) logicHeight *= 0.7;

    render.canvas.width = logicWidth;
    render.canvas.height = logicHeight;
    render.options.width = logicWidth;
    render.options.height = logicHeight;
    Render.lookAt(render, { min: { x: 0, y: 0 }, max: { x: logicWidth, y: logicHeight } });

    updateMouseConstraint();
    updateBoundaries();

    const targetScale = isMobile ? 0.5 : 1;

    world.bodies.forEach(body => {
        if (body.isBoundary) return;

        // 計算正確縮放比
        const scaleFactor = targetScale / body.originalScale;
        Body.scale(body, scaleFactor, scaleFactor);
        body.originalScale = targetScale;

        // 縮放 sprite
        if (body.render.sprite) {
            body.render.sprite.xScale = body.render.sprite.originalXScale * targetScale;
            body.render.sprite.yScale = body.render.sprite.originalYScale * targetScale;
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
