class Manche {
  constructor( idManche,nb_case = 20 ) {
    /*cette classe servira à représenter un manche de guitare. on lui donne en parametre l'id d'un élément svg
    */

    /*this.largeur= window.innerWidth*0.9;//la taille du manche varie en fonction de la taille de l'écran
    this.hauteur= window.innerHeight*0.3;
    */
    Manche.NbInstance +=1;

    this.largeur=document.getElementById(idManche).clientWidth;
    this.hauteur=document.getElementById(idManche).clientHeight;
    this.nombre_case=nb_case;//donne le nombre de case du manche
    this.cases=[];//tableau bidimentionnel qui contiendra tous les objets case du manche. Attention dans ce tableau la premiere corde a un index 0
    this._fondamentale = undefined; //contiendra la fondamentale
    this._rootDefined=false;//variable qui permettra de savoir si une fondamentale est définie
    this.showedIntervals=false; //une propiété qui servira à afficher les notes sous forme d'interval selon une option cochée ou non
    let MANCHE = document.getElementById(idManche);

    MANCHE.setAttribute("width",this.largeur);
    MANCHE.setAttribute("height",this.hauteur);
    MANCHE.style.backgroundColor="#8b5742";


    var WIDTH=Math.floor(this.largeur/nb_case);// on arrondi la valeur inf

    var HEIGHT=Math.floor(this.hauteur/6);//6 cordes

    this.caseWidth=WIDTH;
    this.caseHeight=HEIGHT;
    this.manche=MANCHE;//le container qui est un element SVG

    //ajout des petits cercles repere de MANCHE
    var t;
    for (t of [4,6,8,10,13,16,18,20]){
      var repere=document.createElementNS("http://www.w3.org/2000/svg", "circle");
      repere.setAttribute("cx",t*WIDTH-WIDTH/2);
      repere.setAttribute("cy",3*HEIGHT);
      repere.setAttribute("r",10);
      repere.setAttribute("fill","white");
      this.manche.appendChild(repere);
    }





    //reresentation de toutes les cases du manche

    var y=0;
    /*
    dessin des cases frettes manches
    */
    for (var j=1;j<7;j++){
    	var x=0;
      var tmpArrayCases=[];


      var corde=document.createElementNS("http://www.w3.org/2000/svg", "line");//sert à mettre un trait blanc symbolisant la corde
      corde.setAttribute("x1",0);
      corde.setAttribute("y1",y+HEIGHT/2);
      corde.setAttribute("x2",this.largeur);
      corde.setAttribute("y2",y+HEIGHT/2);
      corde.setAttribute("style","stroke:rgb(200,200,200);stroke-width:2");

      for (var i=0;i< nb_case;i++){

    		//création  éléments SVG rectangle  frette et corde sur 20*6 itérations soit 19 cases plus corde à vide d'indice zero et six cordes

    			var border_case= document.createElementNS("http://www.w3.org/2000/svg", "line");

          //var numString=j.toString()+i.toString();





          border_case.setAttribute("x1",x);
          border_case.setAttribute("y1",y);
          border_case.setAttribute("x2",x);
          border_case.setAttribute("y2",y+HEIGHT);

          border_case.setAttribute("class","frette");
          if (i!=1){
            border_case.setAttribute("style","stroke:rgb(255,0,0);stroke-width:2");
          }
          else {
            border_case.setAttribute("style","stroke:rgb(50,20,20);stroke-width:4");
          }



    			x+=WIDTH;//on itere en ajoutant une largeur de case



    			MANCHE.appendChild(border_case);
    			MANCHE.appendChild(corde);
          var guitarCase=new Case(this,j,i);
          tmpArrayCases.push(guitarCase);

    	}
      this.cases.push(tmpArrayCases);
      /*this.cases est un tableau de tableaux
      chaque élément est un tableau de cases il y a 6 éléments correspondant aux six codes. par exemple la 5eme case corde 3 correspondra à this.cases[2][5]*/

      y+=HEIGHT;
    }

  }
  //--------------------------------------fin constructeur



  get fondamentale(){
    return this._fondamentale;

  }

  set fondamentale(caseManche){
    if (this._fondamentale){this._fondamentale.root=false;}
    this._fondamentale = caseManche;
    if (caseManche){
      this._rootDefined=true;
      caseManche.root=true;
    }
    else {
      this._rootDefined=false;
    }
  }

  get scale(){
//retourne un tableau d'intervales par rapport à la fondamentales pour toutes les notes jouées
    var intervalRef=["R",
                    "b2",
                    "M2",
                    "b3",
                    "M3",
                    "P4",
                    "b5",
                    "P5",
                    "b6",
                    "M6",
                    "b7",
                    "M7",
                    "R"]
    var indexRoot;
    var i=0;
    var result=[];
    if (this._rootDefined){//pas de fondamentale, pas de scale !
      for (var ncorde of this.cases){ //une boucle sur toutes les cases du manche
        for (var ncase of ncorde){
          if (ncase.on){
            result.push(ncase);
            if (ncase.root){
              indexRoot=i;
            }
          i+=1;
          }

        }
      }
    }
    if (result){
      var relTab=result.map(function(cse){return cse.absolutePosition;});//on transforme le tableau de case en tableau de position absolues (des entiers) cad comme si les cases étaient jouées sur la corde 6

      relTab=relTab.map(function(num){return num%12;}); //on ramene les notes sur les cases 1 à 12 cad qu'on ignore les écarts d'octave
      relTab=relTab.map(function(num){
        return(num-relTab[indexRoot]);
      });//pour chaque élément on prend son écart par rapport à la fondamentale.

      relTab=relTab.map(function(num){

        while (num < 0){

          num+=12; //on transforme les écarts négatifs en écarts positifs cad on leur ajoute un octable exemple écart -1 donne écart 11 soit 7ème majeur
        }
        return num
      });
      relTab=relTab.map(function(num){return intervalRef[num];}); //on récupère le nom de l'intervale par rapport au tableau d'interval de référence ex 3-> b3

    }
    return relTab;
  }

  playedNotes(){
    //methode qui renvoie un tableau à 2 éléments. le premier élément est un tableau contenant les cases jouées et le second élément est l'index de la fondamentale dans le tableau des cases jouées.
    var result=[];
    var f=this.fondamentale;
    var i=0; //un index pour repérer les cases jouées
    var indexRoot; //la variable qui contiendra l'index de la fondamentale dans la liste
    for (var ncorde of this.cases){ //ici ncorde est un tableau de cases situées sur une même corde
      for (var ncase of ncorde){ //ncase prend une valeur de case sur une corde donnée
        if (ncase.on){

          if (ncase==f){ //regarde si la note est la fondamentale
            indexRoot=i;
          }
        result.push(ncase);
        i+=1;
        }
      }

    }

    return [result,indexRoot];


  }



  affiche(){
      //methode qui renvoie un tableau d'objets case  correspondant aux notes jouée et l'index de la fondamentale dans ce tableau
    var result=[];
    var played=this.playedNotes();
    var casesJ=played[0];

    var tonic=played[1];

    for (var c of casesJ){
      result.push([c.corde,c.numCase]);
    }
    return [result,tonic];
  }

  joueNotes(arrayOfNotes,indexOfRoot){
    //methode qui prend en parametre un tableau de couple d'entiers [corde,case], l'index de la fondamentale dans ce tableau et l'affiche sur le manche.
    var i=0;
    var isFondamentale=false;
    for (var t of arrayOfNotes){
      if (i==indexOfRoot){
        isFondamentale=true;
        this.fondamentale = this.cases[t[0]-1][t[1]];

      }
      else {
        isFondamentale=false;
      }
      i+=1;
      this.cases[t[0]-1][t[1]].joueNote(isFondamentale);

    }
  }

  showIntervals(){
    if (!this._rootDefined){return;}
    this.hideIntervals();
    var notes=this.playedNotes()[0];
/*

    notes.forEach(function(n){
                  if(n._interval){
                    n._interval.remove();
                  }
                }); //supprime les intervals affichés s'il y en a
*/
    this.showedIntervals=true;
    var scale=this.scale;
    var idx=0;//index qui servira à faire correspondre la case du tableau note à son interval dans le tableau scale
    for (var n of notes){
      n.displayInterval(scale[idx]);
      idx+=1;
    }

  }

  hideIntervals(){

    //supprime les intervals affichés s'il y en a
    var notes=this.playedNotes()[0];

    notes.forEach(function(n){
                  if(n.note._interval){
                    n.note._interval.remove();
                    n.note.setDefaultRepere();
                  }
                });
    this.showedIntervals=false;
  }

  reset(){
    //fonction qui va enlever toutes les noites jouées
    this._fondamentale=undefined;
    this._rootDefined=false;
    this.showedIntervals=false;
    for (var c of this.cases){
      for (var s of c){
        s.root=false;

        if (s.note){
          s.note.supprime();
          s.on=false;
        }
        /*if (s.on){
          //s.playedSymbol.remove();
          //s.playedInterval.remove();
          s.note.supprime();
          s.on=false;
        }*/
      }
    }
  }

  static chiffreRomain(n){
    var result;
    //une fonction qui convertit un chiffre en romain
    switch (n) {
      case "0":
        result='NULLA';
        break;
      case "1":
        result='I';
        break;
      case "2":
        result='II';
        break;

      case "3":
        result='III';
        break;
      case "4":
        result='IV';
        break;

      case "5":
        result='V';
        break;

      case "6":
        result='VI';
        break;

      case "7":
        result='VII';
        break;

      case "8":
        result='VIII';
        break;

      case "9":
        result='IX';
        break;

      case "10":
        result='X';
        break;

      case "11":
        result='XI';
        break;

      case "12":
        result='XII';
        break;

      case "13":
        result='XIII';
        break;

      case "14":
        result='XIV';
        break;

      case "15":
        result='XV';
        break;

      case "16":
        result='XVI';
        break;

      case "17":
        result='XVII';
        break;

      case "18":
        result='XVIII';
        break;
      case "19":
        result='XIX';
        break;
      case "20":
        result='XX';
        break;

      case "21":
        result='XXI';
        break;

      case "22":
        result='XXII';
        break;

      case "23":
        result='XXIII';
        break;

      case "24":
        result='XXIV';
        break;

    }
    return result;

  }
static NbInstance=0;
  //fin de classe
}
