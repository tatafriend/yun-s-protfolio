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
canvas.style.touchAction = 'none'; // 關鍵修改：防止 iOS 預設觸控行為
canvas.style.pointerEvents = 'auto';
canvas.style.width = '100%';
canvas.style.height = '100%';
canvas.style.display = 'block'; // 防止額外空白
document.querySelector('.animation-container').appendChild(canvas);

// Matter.js Render 設定
const render = Render.create({
    engine: engine,
    canvas: canvas,
    options: {
        width: logicWidth,
        height: logicHeight,
        wireframes: false,
        background: 'transparent',
        pixelRatio: 1 // 關鍵修改：固定 pixelRatio
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

    // 修正 B (三角形)：使用相對座標定義頂點
    const B = Bodies.fromVertices(375, 265, [
        { x: 0, y: -165 },    // 上頂點
        { x: 0, y: 165 },     // 下頂點
        { x: 150, y: 30 }     // 右頂點
    ], {
        restitution: 0.8,
        render: {
            fillStyle: 'transparent',
            strokeStyle: 'transparent',
            sprite: { 
                texture: 'https://res.cloudinary.com/dsw8xnof0/image/upload/v1759205825/triangle_htfxbw.svg', 
                xScale: 2, 
                yScale: 2.2 
            }
        }
    }, true);

    // 修正 C (筆)：縮短長度，調整位置
    const C = Bodies.rectangle(280, 150, 400, 60, {
        restitution: 0.8, 
        angle: Math.PI / 5, 
        render: {
            fillStyle: 'transparent', 
            strokeStyle: 'transparent',
            sprite: { 
                texture: 'https://res.cloudinary.com/dsw8xnof0/image/upload/v1759205797/pen_ee14ug.svg', 
                xScale: 1.3, 
                yScale: 1.3 
            }
        }
    });

    // 修正 D (鉛筆)：調整尺寸和比例
    const D = Bodies.rectangle(200, 100, 380, 50, {
        restitution: 0.8, 
        angle: Math.PI / 6, 
        render: {
            fillStyle: 'transparent', 
            strokeStyle: 'transparent',
            sprite: { 
                texture: 'https://res.cloudinary.com/dsw8xnof0/image/upload/v1759205798/pencil_ttiwps.svg', 
                xScale: 1.3, 
                yScale: 1.4 
            }
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
    
    // 關鍵修改：修正 iOS 觸控座標
    mouse.pixelRatio = 1;
    
    mouseConstraint = MouseConstraint.create(engine, {
        mouse: mouse,
        constraint: { stiffness: 0.2, render: { visible: false } }
    });
    World.add(world, mouseConstraint);
    render.mouse = mouse;
}

function updateScaleByViewport() {
    // 關鍵修改：使用 visualViewport 或 window.innerWidth（iOS 更準確）
    logicWidth = window.visualViewport ? window.visualViewport.width : window.innerWidth;
    logicHeight = window.visualViewport ? window.visualViewport.height : window.innerHeight;

    const isMobile = logicWidth < 560;

    // 手機板高度縮短為 70%
    if (isMobile) {
        logicHeight *= 0.7;
    }

    // 關鍵修改：正確設定 Canvas 尺寸
    render.canvas.width = logicWidth;
    render.canvas.height = logicHeight;
    render.options.width = logicWidth;
    render.options.height = logicHeight;

    Render.lookAt(render, { min: { x: 0, y: 0 }, max: { x: logicWidth, y: logicHeight } });

    updateMouseConstraint();
    updateBoundaries();

    const scale = isMobile ? 0.4 : 1;

    world.bodies.forEach(body => {
        if (body.render.sprite) {
            if (!body.render.sprite.originalXScale) body.render.sprite.originalXScale = body.render.sprite.xScale;
            if (!body.render.sprite.originalYScale) body.render.sprite.originalYScale = body.render.sprite.yScale;

            body.render.sprite.xScale = body.render.sprite.originalXScale * scale;
            body.render.sprite.yScale = body.render.sprite.originalYScale * scale;
        }

        if (!body.isBoundary) {
            if (!body.originalScale) body.originalScale = 1;
            const targetScale = scale / body.originalScale;
            Matter.Body.scale(body, targetScale, targetScale);
            body.originalScale = scale;
        }
    });
}

// 關鍵修改：防止 iOS 滾動和縮放
canvas.addEventListener('touchstart', (e) => {
    e.preventDefault();
}, { passive: false });

canvas.addEventListener('touchmove', (e) => {
    e.preventDefault();
}, { passive: false });

canvas.addEventListener('touchend', (e) => {
    e.preventDefault();
}, { passive: false });

canvas.addEventListener('wheel', (e) => {
    e.preventDefault();
}, { passive: false });

// 防止雙指縮放
document.addEventListener('gesturestart', (e) => {
    e.preventDefault();
});

createBoundaries();
createShapes();
updateScaleByViewport();

// 關鍵修改：監聽 visualViewport 變化（iOS 更準確）
if (window.visualViewport) {
    window.visualViewport.addEventListener('resize', updateScaleByViewport);
} else {
    window.addEventListener('resize', updateScaleByViewport);
}

// iOS 方向改變時重新計算
window.addEventListener('orientationchange', () => {
    setTimeout(updateScaleByViewport, 100);
});