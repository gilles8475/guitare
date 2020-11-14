class Formulaire {
  constructor(n,mancheRef){
    var elem=document.getElementById("main");
    this.qNumber = n;
    this.reponses=[];//tableau bidimentionnel qui contiendra toutes les réponses
    this.tableau=document.createElement("table");
    this.tableau.style.border="1px solid black";
    this.pointeurQuest=0;
    this.manche = mancheRef;
    this.casesRep=[]; //tableau qui contiendra les cases réponses. servira à recupérer facilement les instances de case réponse du tableau

    var head=document.createElement("tr");//1ere ligne de tableau
    var rep= document.createElement("tr");//2èeme ligne tableau

    head.style.height="20px";
    //this.questions=head;
    //this.reponse=rep;
    this.tableau.appendChild(head);
    this.tableau.appendChild(rep);
    elem.appendChild(this.tableau);

    for (var i=0; i<n; i++){
      //boucle pour ajouter n colonnes correspondant aux n questions

      this.reponses.push([[],]);//chaque réponse est constituée d'un tableau de note et d'un entier indiquant la place de la fondamentale

      //this.reponses[i]=[];
      var th=document.createElement("th");//element de premiere ligne
      th.style.border="1px solid black";
      th.style.height="80px";
      th.style.width="80px";
      th.style.borderCollapse="collapse";
      th.style.backgroundColor="#D3D3D3"

      var td=document.createElement("td");//element de 2eme ligne
      td.style.border="1px solid black";
      td.style.height="80px";
      td.style.width="80px";
      td.style.borderCollapse="collapse";
      td.setAttribute("id",i+1+"rep");//servira à récupérer le contenu de la case ie la reponse
      var q=document.createTextNode(i+1);
      th.appendChild(q); //contenu de la premiere ligne = le numero de la question
      head.appendChild(th);
      rep.appendChild(td);
      this.casesRep.push(td);
      var tmpForm=this;
      td.onclick=function(event,instanceRef=tmpForm){
        //fonction appelée quand on clique sur une case

        instanceRef.manche.reset();//on vide le manche auquel fait reference le questionnaire

      //  var collectionRep=document.getElementsByTagName("td");
        for (var el of instanceRef.casesRep){
          el.style.border="2px solid black";
        }
        this.style.border="2px solid red";
        var idquest=instanceRef.casesRep.indexOf(this);
        instanceRef.pointeurQuest=idquest;

        //var idquest=this.getAttribute("id");

        //idquest=idquest.slice(-idquest.length,-3);//le numero de question. attention, la numerotation des question commence à 1, alors que le tableau commence à zero.
        //console.log(instanceRef.reponses[idquest*1-1][0]);


        var rootKey=instanceRef.reponses[idquest][1]; //l'index de la fondamentale dans le tableau si elle a été définie
        instanceRef.manche.joueNotes(instanceRef.reponses[idquest][0],rootKey);
        Formulaire.QUESTION=idquest;//pour que la variable soit un nombre on effectue une multiplication sinon elle se transforme en chaine de caractere.

        //mise en forme
        var txt="";
        var fkeys=instanceRef.reponses[idquest][0].keys();


        for (var e of fkeys){
          var u=instanceRef.reponses[idquest][0][e];
          if (e==rootKey){
          txt += "<strong>" + u[0]+Manche.chiffreRomain(u[1].toString())+"</strong>" + "<br/>";
          }
          else {
            txt +=  u[0]+Manche.chiffreRomain(u[1].toString()) + "<br/>";
          }
        }

        this.innerHTML=txt;
        //instanceRef.pointeurQuest=idquest+1;

      }

    }


  }
  static QUESTION=0;

  repond(refManche){
    var idx=this.pointeurQuest;


    this.reponses[idx][0]= refManche.affiche()[0];
    this.reponses[idx][1]= refManche.affiche()[1];

    var elem=this.casesRep[idx];
    //var elem=document.getElementById(idx+"rep");//la case qui va contenir la reponse;

    //mise en forme de la reponse avec case en chiffre chiffre Romains
    var txt="";
    var fkeys=this.reponses[idx][0].keys();
    var rootKey=this.reponses[idx][1]; //l'index de la fondamentale dans le tableau si elle a été définie

    for (var e of fkeys){
      var u=this.reponses[idx][0][e];
      if (e==rootKey){
      txt += "<strong>" + u[0]+Manche.chiffreRomain(u[1].toString())+"</strong>" + "<br/>";
      }
      else {
        txt +=  u[0]+Manche.chiffreRomain(u[1].toString()) + "<br/>";
      }
    }



    elem.innerHTML=txt;



  }

  suivant(){
    //var collectionRep=document.getElementsByTagName("td");
    if (this.pointeurQuest<this.qNumber-1){
        this.pointeurQuest++;
      }
    this.casesRep[this.pointeurQuest].click();
  }
}
