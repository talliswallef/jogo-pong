//variaveis da bolinha

let xBolinha = 300;
let yBolinha = 200;
let diametro = 13;
let raio = diametro /2;

// variaveis da velocidade d bolinha 

let velocidadeXBolinha = 7;
let velocidadeYBolinha = 7;

// Variaveis raquete

let xRaquete = 5;
let yRaquete = 150;
let largRaquete = 10;
let altRaquete = 90;

//Variaveis raquete do Openente

let xRaquete_Oponente = 585;
let yRaquete_Oponente = 140;
let yVelocidade_oponente;
let largRaqueteOponente;
let altRaqueteOponente ;


//variavel colidiu

let colidiu = false;

//PLACAR JOGO
  
  let meus_pontos = 0;
  let pontos_oponentes = 0;

// SONS DO JOGO

let raquetada;
let ponto;
let trilha;

function preload(){
  trilha = loadSound ("trilha.mp3");
  ponto = loadSound ("ponto.mp3");
  raquetada = loadSound ("raquetada.mp3");
}

function setup() {
  createCanvas(600, 400)
  trilha.loop();
  
}

function draw() {
  background(0);
  mostrabolinha();
  colisaobolinha()
  mostrar_raquete(xRaquete, yRaquete);
  mostrar_raquete(xRaquete_Oponente, yRaquete_Oponente);
  movimenta_raquete();
  movimenta_raquete_openente();
  colisaoMinhaRaqueteBiblioteca(xRaquete,yRaquete);
  colisaoMinhaRaqueteBiblioteca(xRaquete_Oponente,yRaquete_Oponente);
  inclui_placar();
  marcaponto();
  bolinhaNaoFicaPresa();
  

}

function mostrabolinha(){
  
  circle (xBolinha, yBolinha ,diametro);
  xBolinha += velocidadeXBolinha;
  yBolinha += velocidadeYBolinha;
}

function colisaobolinha(){
  
  if (xBolinha + raio> width || xBolinha-raio < 0){
    velocidadeXBolinha *= -1;
  }
  if (yBolinha + raio > height || yBolinha - raio < 0){
    velocidadeYBolinha *= -1;
  }
  
}

function mostrar_raquete (x,y){
  
  rect (x, y ,largRaquete, altRaquete);
  
}

function movimenta_raquete() {
  const valorMaximo = 300, valorMinimo = 10;
  
  if (keyIsDown(UP_ARROW) && yRaquete > valorMinimo) {
    yRaquete -= 10;
  }

  if (keyIsDown(DOWN_ARROW) && yRaquete < valorMaximo) {
    yRaquete += 10;
  }
  
  
}



function movimenta_raquete_openente(){
  
 
  yVelocidade_oponente = velocidadeYBolinha - yRaquete_Oponente - largRaquete /1 -50;
     yRaquete_Oponente += velocidadeYBolinha;
       
  // Vamos limitar a movimentação da raquete para que ela não ultrapasse as bordas:
    yRaquete_Oponente = constrain(yRaquete_Oponente, 5, 320);
   

}


//COLISÃO RAQUETE

function colisaoMinhaRaqueteBiblioteca(x,y) {
    colidiu = collideRectCircle(x, y, largRaquete, altRaquete, xBolinha, yBolinha, raio);
    if (colidiu) {
        velocidadeXBolinha *= -1;
          raquetada.play();
    }
}

//incluir placar

    function inclui_placar (){
    
  stroke (255);
    textSize (16);
      fill (255);  
        textAlign (CENTER);
        fill (color(255, 140, 0));
          rect (150, 10, 40, 20);
            fill (255);
              text (meus_pontos, 170, 26);
               fill (color(255, 140, 0));
                rect (450, 10, 40, 20);
                  fill (255);
                    text (pontos_oponentes, 470, 26);
          
  }

//MARCA PONTO

function marcaponto(){
  
  if (xBolinha > 590){
    meus_pontos += 1 
    ponto.play();
  }
    if (xBolinha < 10){
      pontos_oponentes += 1
      ponto.play();
    }
  
}


//BUG BOLINHA PRESA NA RAQUETE

function bolinhaNaoFicaPresa(){
    if (xBolinha - raio < 0){
    xBolinha = 23
    }
}