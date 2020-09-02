/*
  This is a helper tool for planet centauri breeding
*/
function refreshTable(table, monsterStats, ownedMonsters){
  //Add the data rows.
  while(table.rows.length>1){
    table.deleteRow(1)
  }
  for (let i = 0; i < ownedMonsters.length; i++) {
    row = table.insertRow(-1);
    let cell = row.insertCell(-1);
    cell.innerHTML = i;
    for (let j = 0; j < monsterStats.length; j++) {
        let cell = row.insertCell(-1);
        input = document.createElement('input')
        input.type='text';
        //input.style.flex="auto"
        if(j==0) input.style.width="14ch"
        if(j<5 && j>0) input.style.width="4ch"
        input.value=(String)(ownedMonsters[i][monsterStats[j]]);
        input.addEventListener("keyup", function(event) {
          ownedMonsters[i][monsterStats[j]] = event.target.value; //console.log(ownedMonsters[i][monsterStats[j]]); console.log(event.target.value)
        });
        cell.appendChild(input)
        //cell.innerHTML = ownedMonsters[i][monsterStats[j]];
    }
  }
  
  console.log(ownedMonsters)
}

function testBreedingPair(monsterStats, monsters, numTimes){
  let pairList = []
  let debugTest = false
  for(let m1=1; m1<monsters.length; m1++){
    for(let m2=m1+1; m2<monsters.length; m2++){
      pairList[m1.toString() + "&" + m2.toString()]=0;
      if(debugTest) console.log("Testing: "+m1.toString() + "&" + m2.toString())
      for(let i=0; i<numTimes; i++){
        if(debugTest)console.log("Trial: "+i.toString())
        if(debugTest)console.log("Testing rarity...")
        let childRarity = Math.floor(Math.random()*Math.max(parseInt(monsters[m1].Rarity), parseInt(monsters[m2].Rarity))) + 1
        if(debugTest)console.log("child Rarity: " + childRarity.toString())
        if(childRarity>7 || childRarity<1) console.log("rarity is not possible: "+childRarity)
        if(childRarity<parseInt(monsters[0].Rarity)) continue
        if(debugTest)console.log("Testing Shiny...")
        let childShiny = (monsters[m1].Shiny==1||monsters[m2].Shiny==1)?(Math.random()*100)<25:false;
        childShiny=childShiny?1:0;
        if(debugTest){
          console.log("Shiny: " + childShiny.toString())
          console.log('parseInt(monsters[0].Shiny)==1')
          console.log(parseInt(monsters[0].Shiny)==1)
          console.log('(childRarity<3||childShiny===0)')
          console.log((childRarity<3||childShiny===0))
          console.log(monsters[0])
        }
        if((childRarity<3||childShiny===0)&&parseInt(monsters[0].Shiny)==1) continue
        if(debugTest)console.log("TestingHp...")
        let childHp = Math.floor(Math.random()*50)
        if(childHp<parseInt(monsters[0].Hp)) continue
        if(debugTest)console.log("Testing Atk...")
        let childAtk = Math.floor(Math.random()*50)
        if(childAtk<parseInt(monsters[0].Atk)) continue
        if(debugTest)console.log("Testing Attributes...")
        let attrList=[]
        for(let j=5; j<monsterStats.length; j++){
          if(monsters[m1][monsterStats[j]] && !attrList.includes(monsters[m1][monsterStats[j]])){
            attrList.push(monsters[m1][monsterStats[j]])
          }
          if(monsters[m2][monsterStats[j]] && !attrList.includes(monsters[m2][monsterStats[j]])){
            attrList.push(monsters[m2][monsterStats[j]])
          }
        }
        if(debugTest)console.log("Attribute list pre Splice: ")
        if(debugTest)console.log(attrList)
        while(attrList.length>7){
          attrList.splice(Math.floor(Math.random()*attrList.length),1)
        }
        let hasAttributes = true
        for(let j=5; j<monsterStats.length; j++){
          hasAttributes&=attrList.includes(monsters[0][monsterStats[j]])
        }
        if(debugTest)console.log("Attr list then monster 0 list then hasAttributes")
        if(debugTest)console.log(attrList)
        if(debugTest)console.log(monsters[0])
        if(debugTest)console.log(hasAttributes)
        if(!hasAttributes) continue
        pairList[m1.toString() + "&" + m2.toString()]+=1
      }
      pairList[m1.toString() + "&" + m2.toString()]*=100;
      pairList[m1.toString() + "&" + m2.toString()]/=numTimes;
    }
  }
  let orderedList = []
  for (const [key, value] of Object.entries(pairList)) {
    console.log(`${key}: ${value}`);
    orderedList.push({
      name: key,
      chanceToGetTarget: value
    })
  }
  pairList=orderedList.sort( (a,b)=>{
    return a.chanceToGetTarget-b.chanceToGetTarget
  })
  if(debugTest)console.log("Going to print pair list")
  console.log(pairList)
  return pairList
}

window.onload = function(){
  let monsterStats=[
    "Name",
    "Rarity",
    "Shiny",
    "Hp",
    "Atk",
    "Attribute1",
    "Attribute2",
    "Attribute3",
    "Attribute4",
    "Attribute5",
    "Attribute6",
    "Attribute7",
  ]
 
  let ownedMonsters = [{
    Name: "Scorpion",
    Rarity: 3,
    Shiny: 1,
    Hp: 40,
    Atk: 40,
    Attribute1: "Haste3",
    Attribute2: "Fireballs3",
    Attribute3: "LighteningTrap4",
    Attribute4: "Giant2",
    Attribute5: "LifeSteal7",
    Attribute6: "DamageBoost7",
    Attribute7: "PhysicalDamageReduction4",
  },
  {
    Name: "Scorpion",
    Rarity: 5,
    Shiny: 0,
    Hp: 40,
    Atk: 40,
    Attribute1: "Haste3",
    Attribute2: "Fireballs3",
    Attribute3: "LighteningTrap4",
    Attribute4: "Giant2",
    Attribute5: "LifeSteal7",
    Attribute6: "DamageBoost7",
    Attribute7: "PhysicalDamageReduction4",
  }]
  
  let table = document.createElement("TABLE");
  table.border = "1";
  //add the header
  
  let headRow = table.insertRow(-1);
  let headerCell = document.createElement("TH");
      headerCell.innerHTML = "Num";
      headRow.appendChild(headerCell);
  for (let i = 0; i < monsterStats.length; i++) {
      let headerCell = document.createElement("TH");
      headerCell.innerHTML = monsterStats[i];
      headRow.appendChild(headerCell);
  }
  refreshTable(table, monsterStats,ownedMonsters);

  let dvTable = document.getElementById("dvTable");
  dvTable.innerHTML = "";
  dvTable.appendChild(table);

  let addButton = document.getElementById("AddMonsterButton")
  let removeButton = document.getElementById("RemoveMonsterButton")
  let numRemove = document.getElementById("MonsterToRemove")
  numRemove.placeholder="Num to delete with '-'"
  numRemove.addEventListener("keyup", function(event) {
    numRemove.value = event.target.value; console.log(numRemove.value); //console.log(event.target.value)
  });
  addButton.addEventListener("click", function(event) {
    ownedMonsters.push(
      {
        Name: "Scorpion",
        Rarity: 5,
        Shiny: 0,
        Hp: 40,
        Atk: 40,
        Attribute1: "Haste3",
        Attribute2: "Fireballs3",
        Attribute3: "LighteningTrap4",
        Attribute4: "Giant2",
        Attribute5: "LifeSteal7",
        Attribute6: "DamageBoost7",
        Attribute7: "PhysicalDamageReduction4",
      }
    )
    refreshTable(table, monsterStats,ownedMonsters);
  })
  
  removeButton.addEventListener("click", function(event) {
    console.log(numRemove.value)
    if(numRemove.value==''){
      numRemove.value=ownedMonsters.length-1;
    }
    ownedMonsters.splice(parseInt(numRemove.value),1);
    refreshTable(table, monsterStats,ownedMonsters);
    numRemove.value=''
  })
 
  let showInfoButton = document.getElementById("ShowInfoButton")
  showInfoButton.addEventListener("click", function(event) {
    x=document.getElementById("ShowInfoText")
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  })

  let numTests = document.getElementById("NumTests")
  numTests.addEventListener("keyup", function(event) {
    numTests.value = event.target.value; console.log(numTests.value); //console.log(event.target.value)
  });
  let calcPairsButton = document.getElementById("TestPairsButton")
  calcPairsButton.addEventListener("click", function(event) {
    testBreedingPair(monsterStats, ownedMonsters, parseInt(numTests.value));
  })

}

