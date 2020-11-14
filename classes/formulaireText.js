class FormulaireText {
  constructor(n,mancheRef=undefined){
    var elem=document.getElementById("main");
    this.qNumber = n;

    this.tableau=document.createElement("table");
    this.tableau.style.border="1px solid black";
    this.pointeurQuest=0;
    this.casesRep=[]; //tableau qui stockera les objets td cad les cases qui contiennent les réponses
    this.manche = mancheRef;

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



      //this.reponses[i]=[];
      var th=document.createElement("th");//element de premiere ligne
      th.style.border="1px solid black";
      th.style.height="80px";
      th.style.width="80px";
      th.style.borderCollapse="collapse";
      th.style.backgroundColor="#D3D3D3"

      var td=document.createElement("td");//element de 2eme ligne
      this.casesRep.push(td);
      td.style.border="1px solid black";
      td.style.height="80px";
      td.style.width="80px";
      td.style.fontSize='x-large';
      td.style.textAlign='center';

      td.style.borderCollapse="collapse";
      //td.setAttribute("id",i+1+"rep");//servira à récupérer le contenu de la case ie la reponse
      var q=document.createTextNode(i+1);
      th.appendChild(q); //contenu de la premiere ligne = le numero de la question
      head.appendChild(th);
      rep.appendChild(td);
      var tmpForm=this;


      td.onclick=function(event,instanceRef=tmpForm){
        //fonction appelée quand on clique sur une case

        //instanceRef.manche.reset();//on vide le manche auquel fait reference le questionnaire


        for (var el of instanceRef.casesRep){
          el.style.border="2px solid black";
        }
        this.style.border="2px solid red";
        var idquest=instanceRef.casesRep.indexOf(this);
        instanceRef.pointeurQuest=idquest;

        FormulaireText.QUESTION=idquest;
        instanceRef.toggle();

      }
    }


  }
  static QUESTION=0;

  set reponse(txt){
    var index=this.pointeurQuest;
    this.casesRep[index].innerHTML=txt;

  }
  get reponse(){
    var index=this.pointeurQuest;
    return this.casesRep[index].innerHTML;
  }

  toggle(){
    var index=this.pointeurQuest;
    if (this.reponse=="X"){
      this.reponse="O";
      this.casesRep[this.pointeurQuest].style.backgroundColor='green';
    }
    else {
      this.reponse="X";
      this.casesRep[this.pointeurQuest].style.backgroundColor='red';
    }
  }

  suivant(){
    if (this.pointeurQuest<this.qNumber-1){
        this.pointeurQuest++;
      }

    this.casesRep[this.pointeurQuest].click();
  }
}
