let bgX = 0, bgY = 0, speed = 5;
let keys = {};
let enemies = [];
let spawnSide = 0;

const enemyImg = Object.assign(new Image(), {
    src: "https://github.com/munez2029/game/blob/main/New%20Project%20(4).png?raw=true"
});

function spawnEnemy() {
    const plyr = document.getElementById("player").getBoundingClientRect();
    const size = 50;

    let enmy;
if (spawnSide === 0) {
    enmy = { x: plyr.left - 400, y: plyr.top + plyr.height / 2 - 25, vx: 3, vy: 0, size };
} else {
    enmy = { x: plyr.left + plyr.width / 2 - 25, y: plyr.top - 400, vx: 0, vy: 3, size };
}

    enemies.push(enmy);
    if (spawnSide === 0) {
    spawnSide = 1;
} else {
    spawnSide = 0;
}

}

setInterval(spawnEnemy, 600);

document.addEventListener("keydown", e => keys[e.key.toLowerCase()] = true);
document.addEventListener("keyup", e => keys[e.key.toLowerCase()] = false);

setInterval(() => {
    let dx = 0, dy = 0;

    if (keys.w) { bgY += speed; dy = speed; }
    if (keys.s) { bgY -= speed; dy = -speed; }
    if (keys.a) { bgX += speed; dx = speed; }
    if (keys.d) { bgX -= speed; dx = -speed; }

    const leftWall = 410, topWall = 50, rightWall = 2500, bottomWall = 2000;

    bgX = Math.min(leftWall, Math.max(-(rightWall - innerWidth), bgX));
    bgY = Math.min(topWall, Math.max(-(bottomWall - innerHeight), bgY));

   document.body.style.backgroundPosition = bgX + "px " + bgY + "px";


    const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");
    const plyr = document.getElementById("player").getBoundingClientRect();

    canvas.width = innerWidth;
    canvas.height = innerHeight;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = enemies.length - 1; i >= 0; i--) {
        let enmy = enemies[i];

        enmy.x += enmy.vx + dx;
        enmy.y += enmy.vy + dy;

        ctx.drawImage(enemyImg, enmy.x, enmy.y, enmy.size, enmy.size);

        if (
            plyr.left < enmy.x + enmy.size &&
            plyr.left + plyr.width > enmy.x &&
            plyr.top < enmy.y + enmy.size &&
            plyr.top + plyr.height > enmy.y
        ) {
            alert("Game Over!");
            location.reload();
            return;
        }

        if (
            enmy.x < -1000 || enmy.x > canvas.width + 1000 ||
            enmy.y < -1000 || enmy.y > canvas.height + 1000
        ) {
            enemies.splice(i, 1);
        }
    }
}, 10);
