class Note {
  constructor(manche,corde,num_case, root=false){

    this.corde=corde;
    this.case=num_case;
    this.manche=manche; //l'objet manche sur lequel est appliquée la note
    var u=manche.caseWidth*(num_case+0.5);
    var v=manche.caseHeight*(corde-0.5);
    this.abscisse=u;
    this.ordonnee=v;
    this.root=root;
    this._interval=undefined;
    this._symbole=undefined;
    var sizeRepere=16;
    this.sizeRepere = sizeRepere;

    //definition du repere sur un manche de guitare
    if (root){
      //si la corde est une fondamentale elle est symbolisée par un carré

      this.repere = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      this.repere.setAttribute("fill", "#cd6889");
      this.repere.setAttribute("x", u-sizeRepere/2);
      this.repere.setAttribute("y",v-sizeRepere/2);
      this.repere.setAttribute("width",sizeRepere);
      this.repere.setAttribute("height",sizeRepere);
      //this.repere.setAttribute("data-corde",this.corde);
      //this.repere.setAttribute("data-case",this.case);
    } else {
      //sinon elle est symbilée par un rond
      this.repere=document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
      this.repere.setAttribute("cx",u);
      this.repere.setAttribute("cy",v);
      this.repere.setAttribute("rx",sizeRepere/2);
      this.repere.setAttribute("ry",sizeRepere/2);
      this.repere.setAttribute("fill","blue");
      //this.repere.setAttribute("data-corde",this.corde);
      //this.repere.setAttribute("data-case",this.case);
    }

    this.manche.manche.appendChild(this.repere);

  } //fin constructeur
  setDefaultRepere(){
    this.supprime();
    var repereDefault= document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
    repereDefault.setAttribute("cx",this.abscisse);
    repereDefault.setAttribute("cy",this.ordonnee);
    repereDefault.setAttribute("rx",this.sizeRepere/2);
    repereDefault.setAttribute("ry",this.sizeRepere/2);
    repereDefault.setAttribute("fill","blue");
    this.repere=repereDefault;
    this.manche.manche.appendChild(this.repere);

  }
  set interval(nameInterval){
    var newSize=this.sizeRepere*1.8;
    if (this._interval){this._interval.remove();};//efface l'interval existant si il existe
    if (this._symbole){this._symbole.remove();};//efface le symbole existant si il existe
    this._interval=document.createElementNS("http://www.w3.org/2000/svg", "text");
    this._interval.setAttribute("x",this.abscisse-9);
    this._interval.setAttribute("y",this.ordonnee+7);
    this._interval.innerHTML=nameInterval;

    if (/*nameInterval=='R'*/this.root){
      this.repere.remove();
      this.repere=document.createElementNS("http://www.w3.org/2000/svg", "rect");
      this.repere.setAttribute("x", this.abscisse-newSize/2);
      this.repere.setAttribute("y",this.ordonnee-newSize/2);
      this.repere.setAttribute("width",newSize);
      this.repere.setAttribute("height",newSize);
      this.repere.setAttribute("fill","black");
      this.repere.setAttribute("stroke","white");
      this.manche.manche.appendChild(this.repere);

      this._interval.setAttribute("fill","white");


    }
    else {
      this.repere.setAttribute("rx",this.sizeRepere*1.2);
      this.repere.setAttribute("ry",this.sizeRepere);
      this.repere.setAttribute("stroke","white");
      this._interval.setAttribute("fill","yellow");

    }
    this.manche.manche.appendChild(this._interval);
  }
  set symbole(symb){
    var newSize=this.sizeRepere*1.8;
    if (this._interval){this._interval.remove();};//efface l'interval existant si il existe
    if (this._symbole){this._symbole.remove();};//efface le symbole existant si il existe
    this._symbole=document.createElementNS("http://www.w3.org/2000/svg", "text");
    this._symbole.setAttribute("x",this.abscisse-12);
    this._symbole.setAttribute("y",this.ordonnee+7);
    this._symbole.innerHTML=symb;

    if (/*nameInterval=='R'*/this.root){
      this.repere.remove();
      this.repere=document.createElementNS("http://www.w3.org/2000/svg", "rect");
      this.repere.setAttribute("x", this.abscisse-newSize/2);
      this.repere.setAttribute("y",this.ordonnee-newSize/2);
      this.repere.setAttribute("width",newSize);
      this.repere.setAttribute("height",newSize);
      this.repere.setAttribute("fill","black");
      this.repere.setAttribute("stroke","white");
      this.manche.manche.appendChild(this.repere);

      this._symbole.setAttribute("fill","white");


    }
    else {
      this.repere.setAttribute("rx",this.sizeRepere*1.25);
      this.repere.setAttribute("ry",this.sizeRepere);
      this.repere.setAttribute("stroke","white");
      this._symbole.setAttribute("fill","yellow");

    }




    this.manche.manche.appendChild(this._symbole);

  }
  supprime(){
    this.repere.remove();
    if (this._interval){
      this._interval.remove();
    }
    if (this._symbole){this._symbole.remove();};//efface le symbole existant si il existe

  }


}
