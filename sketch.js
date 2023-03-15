//variaveis bolinha
let xBolinha = 300;
let yBolinha = 200;
let diametro = 18;
let raio = diametro / 2;

//velocidade da bolinha
let velocidadeXBolinha = 6;
let velocidadeYBolinha = 6;

//medidas da raquete
let xRaquete = 5;
let yRaquete = 150;
let ComprimentoRaquete = 10;
let alturaRaquete = 90;

//variaveis do oponente
let xOponente = 585;
let yOponente = 150;
let velocidadeYOponente;

let colidiu = false;

//Placar do jogo

let meusPontos = 0;
let pontosOponente = 0;
let dOponenteBolinha = 0;

// Sons do jogo
let raquetada;
let ponto;
let trilha;

// Multiplayer
let multiplayer;


function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostrabolinha();
  velocidadebolinha();
  verificacolisao();
  raquete(xRaquete,yRaquete);
  movimentoraquete();
  //verificarcolisaoraquete();
  verificaColisaonaRaquete(xRaquete,yRaquete);
  raquete(xOponente,yOponente);
  MovimentaOponente();  
  verificaColisaonaRaquete(xOponente,yOponente);
  incluirPlacar();
  marcaPonto();
  //multiplayerManual();

}

function mostrabolinha() {
  circle(xBolinha, yBolinha, diametro);
}

function velocidadebolinha() {
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function verificacolisao() {
  if (xBolinha + raio > width || xBolinha - raio < 0) {
    velocidadeXBolinha *= -1;
  }
  if (yBolinha + raio > height || yBolinha - raio < 0) {
    velocidadeYBolinha *= -1;
  }
}

function raquete(x,y) {
  rect(x, y, ComprimentoRaquete, alturaRaquete);
}

function movimentoraquete(){
  if(keyIsDown(UP_ARROW)){
    yRaquete -= 10;
  }
  if(keyIsDown(DOWN_ARROW)){
    yRaquete += 10;
  }
}

function verificarcolisaoraquete(){
  if(xBolinha - raio < xRaquete + ComprimentoRaquete && yBolinha - raio < yRaquete + alturaRaquete && yBolinha + raio > yRaquete){
    velocidadeXBolinha *=-1;
    raquetada.play();
  }
}


function verificaColisaonaRaquete(x,y){ 
  colidiu = collideRectCircle(x, y, ComprimentoRaquete, alturaRaquete, xBolinha, yBolinha, raio);
  if(colidiu){
  velocidadeXBolinha *=-1;
  raquetada.play();
  }
}

function MovimentaOponente(){
  velocidadeYOponente = yBolinha - yOponente - ComprimentoRaquete / 2 - dOponenteBolinha;
  yOponente += velocidadeYOponente  
  
  if(pontosOponente > meusPontos)
  {
    dOponenteBolinha = 100;
  }
  if(pontosOponente < meusPontos && dOponenteBolinha > 50)
  {
    dOponenteBolinha -= 3;
  }
   }

function incluirPlacar(){  
  textAlign(CENTER);
  stroke(255)
  textSize(18);
  fill(color(255,140,0))
  rect(150,10,40,20);
  fill(255)
  text(meusPontos, 170, 26);
  fill(color(255,140,0));
  rect(450,10,40,20);
  fill(255)
  text(pontosOponente, 470,26);
  
}

function marcaPonto(){
  if(xBolinha > 590){
    meusPontos +=1
    ponto.play();
  }
  if(xBolinha < 10){
    pontosOponente +=1;
    ponto.play();
  }   
}

function preload(){
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
  }

function multiplayerManual(){
  if(keyIsDown(87)){
    yOponente -= 10;
  }
  if(keyIsDown(83)){
    yOponente += 10;
  }
}


