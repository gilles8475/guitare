

function marque(idForm,idMche){
//transcrit les notes affichées sur le manche en texte et les inscrit dans le tableau réponse
  idForm.repond(idMche);
  idForm.suivant();
}

function intervals(idManche){
  idManche.showIntervals();
}

function createFormulaire(){
  var newSVG=document.createElementNS("http://www.w3.org/2000/svg", "svg");
  var idSvg="manche"+Manche.NbInstance;

  var windowHeight=window.innerHeight;
  var windowWidth=window.innerWidth;

  newSVG.setAttribute("width",windowWidth*0.9);
  newSVG.setAttribute("height",windowHeight*0.25);
  newSVG.setAttribute("id",idSvg);
  var el=document.getElementById('main');

  var titre=document.createElement("p");
  titre.innerHTML= "Exercice "+(1+Manche.NbInstance);
  el.appendChild(titre);
  el.appendChild(newSVG);
  var newManche=new Manche(idSvg,25);
  var newFormulaire= new Formulaire(20,newManche);


  var bout=document.createElement("button");
  var bout1=document.createElement("button");

  bout.innerHTML= "Marque";
  bout1.innerHTML= "Intervales";
  el.appendChild(bout);
  el.appendChild(bout1);
  bout.onclick= function(event,form=newFormulaire, manch=newManche){ marque(form,manch);};
  bout1.onclick = function(event, M=newManche){M.showIntervals()};

}

function createFormulaireText(){

  var titre=document.createElement("p");
  titre.innerHTML= "Exercice "+(1+Manche.NbInstance++);
  document.getElementById('main').appendChild(titre);
  var newFormulaireText= new FormulaireText(20);
  /*
  document.onkeypress=function(event,frm=newFormulaireText){
    frm.toggle();
  }*/

}

//test audio------------------------
/*
var audioCtx;
var oscillator;

function joueAudio(wavefrm){

  audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();
  gainNode.gain.value=0.05;
  //create custom wave form
  var real = new Float32Array(7);
  var imag = new Float32Array(7);
  real[0] = 0;
  imag[0] = Math.random();
  real[1] = Math.random();//coef sur le premiere hamonique
  imag[1] = Math.random();
  real[2] = Math.random();//coef sur la deuxieme harmonique
  imag[2] = Math.random();
  real[3] = Math.random();//etc ...
  imag[3] = Math.random();
  real[4] = Math.random();
  imag[4] = Math.random();
  real[5] = Math.random();
  imag[5] = Math.random();
  real[6] = Math.random();
  imag[6] = Math.random();

  var wave = audioCtx.createPeriodicWave(real, imag, {disableNormalization: true});
  oscillator.setPeriodicWave(wave);

// create Oscillator node-------------------

    //oscillator.type = wavefrm;
    //oscillator.frequency.setValueAtTime(440, audioCtx.currentTime); // value in hertz

    oscillator.connect(gainNode).connect(audioCtx.destination);
    oscillator.start();
    oscillator.stop(2);
}

function stopAudio(){
  oscillator.stop();
}
//oscillator.start();
//-----------------
*/
