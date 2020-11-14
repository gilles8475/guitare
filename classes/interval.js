class Interval {
  constructor(manche,corde,num_case, namedInterval){

    this.corde=corde;
    this.case=num_case;
    this.manche=manche; //l'objet manche sur lequel est appliquée la note
    var u=manche.caseWidth*(num_case+0.7);
    console.log(u);
    var v=manche.caseHeight*(corde-0.5);


  //affichage sur le manche d'un text correspondant à l'interval namedInterval
    this.repere=document.createElementNS("http://www.w3.org/2000/svg", "text");
    this.repere.setAttribute("x",u);
    this.repere.setAttribute("y",v);
    this.repere.setAttribute("fill","blue");
    this.repere.innerHTML=namedInterval;


    this.manche.manche.appendChild(this.repere);

  } //fin constructeur




}
