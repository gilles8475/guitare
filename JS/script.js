

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
  var newManche=new Manche(idSvg,15);
  var newFormulaire= new Formulaire(20,newManche);


  var bout=document.createElement("button");
  var bout1=document.createElement("button");
  var bout2=document.createElement("button");

  bout.innerHTML= "Marque";
  bout1.innerHTML= "Affiche intervalles";
  bout2.innerHTML= "Affiche le nom des notes";

  bout.style.backgroundColor='#8B0000';
  bout.style.color='white';
  bout.style.width='20%';
  bout1.style.width='20%';
  bout1.style.backgroundColor='#8B0000';
  bout1.style.color='white';
  bout2.style.width='20%';
  bout2.style.backgroundColor='#8B0000';
  bout2.style.color='white';
  el.appendChild(bout);
  el.appendChild(bout1);
  el.appendChild(bout2);
  bout.onclick= function(event,form=newFormulaire, manch=newManche){ marque(form,manch);};
  bout1.onclick = function(event, M=newManche){M.showIntervals()};
  bout2.onclick = function(event, M=newManche){M.showSymboles()};

}

function createFormulaireText(){

  var titre=document.createElement("p");
  titre.innerHTML= "Exercice "+(1+Manche.NbInstance++);
  document.getElementById('main').appendChild(titre);
  var newFormulaireText= new FormulaireText(20);


}
