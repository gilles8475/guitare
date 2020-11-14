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

    //definition du repere sur un manche de guitare
    if (root){
      //si la corde est une fondamentale elle est symbolisée par un carré
      this.repere = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      this.repere.setAttribute("fill", "#cd6889");
      this.repere.setAttribute("x", u-0.2*manche.caseWidth);
      this.repere.setAttribute("y",v-0.2*manche.caseWidth);
      this.repere.setAttribute("width",16);
      this.repere.setAttribute("height",16);
      this.repere.setAttribute("data-corde",this.corde);
      this.repere.setAttribute("data-case",this.case);
    } else {
      //sinon elle est symbilée par un rond
      this.repere=document.createElementNS("http://www.w3.org/2000/svg", "circle");
      this.repere.setAttribute("cx",u);
      this.repere.setAttribute("cy",v);
      this.repere.setAttribute("r",7);
      this.repere.setAttribute("fill","blue");
      this.repere.setAttribute("data-corde",this.corde);
      this.repere.setAttribute("data-case",this.case);
    }

    this.manche.manche.appendChild(this.repere);

  } //fin constructeur
  setDefaultRepere(){
    this.supprime();
    var repereDefault= document.createElementNS("http://www.w3.org/2000/svg", "circle");
    repereDefault.setAttribute("cx",this.abscisse);
    repereDefault.setAttribute("cy",this.ordonnee);
    repereDefault.setAttribute("r",7);
    repereDefault.setAttribute("fill","blue");
    this.repere=repereDefault;
    this.manche.manche.appendChild(this.repere);

  }
  set interval(nameInterval){
    if (this._interval){this._interval.remove();};//efface l'interval existant si il existe
    this._interval=document.createElementNS("http://www.w3.org/2000/svg", "text");
    this._interval.setAttribute("x",this.abscisse-9);
    this._interval.setAttribute("y",this.ordonnee+7);
    this._interval.innerHTML=nameInterval;

    if (nameInterval=='R'){
      this.repere.remove();
      this.repere=document.createElementNS("http://www.w3.org/2000/svg", "rect");
      this.repere.setAttribute("x", this.abscisse-0.2*this.manche.caseWidth);
      this.repere.setAttribute("y",this.ordonnee-0.2*this.manche.caseWidth);
      this.repere.setAttribute("width",30);
      this.repere.setAttribute("height",30);
      this.repere.setAttribute("fill","black");
      this.repere.setAttribute("stroke","white");
      this.manche.manche.appendChild(this.repere);

      this._interval.setAttribute("fill","white");


    }
    else {
      this.repere.setAttribute("r",18);
      this.repere.setAttribute("stroke","white");
      this._interval.setAttribute("fill","yellow");

    }
    this.manche.manche.appendChild(this._interval);
  }

  supprime(){
    this.repere.remove();
    if (this._interval){
      this._interval.remove();
    }
  }


}
