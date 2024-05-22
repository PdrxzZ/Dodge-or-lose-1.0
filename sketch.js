let triangles = [];
let playerSize = 20;
let playerX = 200;
let playerY = 350;

let gameLost = false;

function setup() {
  createCanvas(400, 400);
  
  // Inicializa com vários triângulos
  for (let i = 0; i < 50; i++) {
    let enemyX1 = random(width);
    let enemyY1 = random(-500, -50); // Posição inicial acima do topo da tela
    let enemyX2 = enemyX1 + random(-40, 40); // Aumentando a variabilidade de tamanho
    let enemyY2 = enemyY1 + random(-40, 40); // Aumentando a variabilidade de tamanho
    let enemyX3 = enemyX1 + random(-40, 40); // Aumentando a variabilidade de tamanho
    let enemyY3 = enemyY1 + random(-40, 40); // Aumentando a variabilidade de tamanho
    triangles.push({x1: enemyX1, y1: enemyY1, x2: enemyX2, y2: enemyY2, x3: enemyX3, y3: enemyY3});
  }
}

function draw() {
  background(192, 189, 189);
  
  if (!gameLost) {
    // Desenhar jogador
    fill("blue");
    circle(playerX, playerY, playerSize);

    // Mover jogador
    movePlayer();

    // Desenhar e mover triângulos inimigos
    for (let i = 0; i < triangles.length; i++) {
      let triangle = triangles[i];
      fill("red");
      beginShape();
      vertex(triangle.x1, triangle.y1);
      vertex(triangle.x2, triangle.y2);
      vertex(triangle.x3, triangle.y3);
      endShape(CLOSE);
      triangle.y1 += 1;
      triangle.y2 += 1;
      triangle.y3 += 1;
      
      // Se o triângulo inimigo atingir a borda inferior, reposicione-o acima do topo da tela
      if (triangle.y1 > height || triangle.y2 > height || triangle.y3 > height) {
        triangle.y1 = random(-500, -50);
        triangle.y2 = triangle.y1 + random(-40, 40);
        triangle.y3 = triangle.y1 + random(-40, 40);
        triangle.x1 = random(width);
        triangle.x2 = triangle.x1 + random(-40, 40);
        triangle.x3 = triangle.x1 + random(-40, 40);
      }
      
      // Verificar colisão entre jogador e triângulo
      if (pointInTriangle(playerX, playerY, triangle.x1, triangle.y1, triangle.x2, triangle.y2, triangle.x3, triangle.y3)) {
        gameLost = true;
        break;
      }
    }

  } else {
    // Exibir mensagem de "Perdeu"
    fill(255, 0, 0);
    textSize(32);
    textAlign(CENTER, CENTER);
    text("Perdeu", width / 2, height / 2);
  }
}

function movePlayer() {
  if (keyIsDown(87)) { // W
    playerY -= 3;
  }
  if (keyIsDown(83)) { // S
    playerY += 3;
  }
  if (keyIsDown(68)) { // D
    playerX += 3;
  }
  if (keyIsDown(65)) { // A
    playerX -= 3;
  }
}

function pointInTriangle(px, py, x1, y1, x2, y2, x3, y3) {
  let d1, d2, d3;
  let has_neg, has_pos;

  d1 = sign(px, py, x1, y1, x2, y2);
  d2 = sign(px, py, x2, y2, x3, y3);
  d3 = sign(px, py, x3, y3, x1, y1);

  has_neg = (d1 < 0) || (d2 < 0) || (d3 < 0);
  has_pos = (d1 > 0) || (d2 > 0) || (d3 > 0);

  return !(has_neg && has_pos);
}

function sign(px, py, x1, y1, x2, y2) {
  return (px - x2) * (y1 - y2) - (x1 - x2) * (py - y2);
}
