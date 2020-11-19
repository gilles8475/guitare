class Case {
  constructor(manche,corde,numCase){

    /*manche est un objet de la classe manche
    corde est un entier numCase est un entier
    */
    this.largeur= manche.caseWidth;
    this.hauteur=manche.caseHeight;
    this.corde=corde;
    this.numCase=numCase;
    this.owner=manche;
    this.playedSymbol=undefined;
    //this.playedInterval=undefined;
    this.on=false;//flag permettant de savoir si la case est jouée default non
    this.root=false;
    this.figure=document.createElementNS("http://www.w3.org/2000/svg", "rect");//l'objet svg qui va matérialiser la case
    this.figure.setAttribute("x",numCase*this.largeur);
    this.figure.setAttribute("y",(corde-1)*this.hauteur);
    this.figure.setAttribute("width",this.largeur);
    this.figure.setAttribute("height",this.hauteur);
    this.figure.setAttribute("fill", "red");
    this.figure.setAttribute("fill-opacity", "0.1");

    this.owner.manche.appendChild(this.figure); //manche est un objet de la classe manche et manche.manche est sa representation en objet svg sur lequel on peut appliquer la methode appendChild
    var caseInstance=this;

    this.figure.onclick=function(event,cse=caseInstance){
      var rootTest=false; //variable qui servira à voir si une fondamentale existe déjà.
      if (!cse.on){

        if (event.ctrlKey && !cse.owner._rootDefined){//si la touche controle est pressée et qu'il n'y a pas encore de fondamentale
          rootTest=true;
          /*
          cse.root=true;//la case pressée est la fondamentale
          cse.owner._rootDefined=true;//le manque auquel appartient la case possède une fondamentale
          cse.owner._fondamentale=cse; //la fondamentale du manche est la case. j'aurais pu mieux faire en définissant un setter ...
          */

        }
        cse.joueNote(rootTest);
      /*
      var n=new Note(cse.owner,cse.corde,cse.numCase,rootTest);

      //cse.playedSymbol=n.repere;
      cse.on=true;//la case est jouée
      cse.note=n; //la propriété note de l'objet case est un objet Note
      */
      }
      else {
        //si la note existe dejà, on la supprime
        cse.note.supprime();

        cse.on=false;
        if (cse.root){//si la case qu'on supprime est une fondamentale

          cse.owner.fondamentale=undefined;
          //cse.owner._rootDefined=false;
          cse.owner.hideIntervals();
          //cse.root=false;
        }
      }
      if (cse.owner.showedIntervals){cse.owner.showIntervals();}
      if (cse.owner.showedSymboles){cse.owner.showSymboles();}
    }


  }
  get absolutePosition(){
    /*la fonction revoie le numero de la case si la note était jouée sur
    la sixieme corde ex corde 5 case 3 (do) <=> corde 6 case 8
    */
    var x=this.corde;//numero de corde
    var y=this.numCase;
    var result;
    switch (x){
      case 6:
      result=this.numCase;
      break;

      case 5:
      result=this.numCase+5;
      break;


      case 4:
      result=this.numCase+10;
      break;


      case 3:
      result=this.numCase+15;
      break;


      case 2:
      result=this.numCase+19;
      break;


      case 1:
      result=this.numCase+24;
      break;
    }
    return result;
  }

  joueNote(isRoot=false){

    var n=new Note(this.owner,this.corde,this.numCase,isRoot);
    //this.playedSymbol=n.repere;
    this.note=n;
    this.on=true;
    this.root=false;
    if (isRoot){
      //this.root=true;
      //this.owner._rootDefined=true;
      this.owner.fondamentale=this;
    }
  }

/*  displayInterval(interval){
    var n=new Interval(this.owner,this.corde,this.numCase,interval);
    this.playedInterval=n.repere;
  }
  */

  displayInterval(interval){
    this.note.interval=interval;
  }

  displaySymbole(symboleNote){
    this.note.symbole=symboleNote;
  }
}
