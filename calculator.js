/*
  This is a helper tool for planet centauri breeding
*/
function refreshTable(table, monsterStats, ownedMonsters){
  //Add the data rows.
  while(table.rows.length>1){
    table.deleteRow(1)
  }
  for (let i = 0; i < ownedMonsters.length; i++) {
    row = table.insertRow(-1)
    let cell = row.insertCell(-1)
    cell.innerHTML = i;
    for (let j = 0; j < monsterStats.length; j++) {
        let cell = row.insertCell(-1)
        input = document.createElement('input')
        input.type='text';
        //input.style.flex="auto"
        if(j==0) input.style.width="14ch"
        if(j<5 && j>0) input.style.width="4ch"
        input.value=(String)(ownedMonsters[i][monsterStats[j]])
        input.addEventListener("keyup", function(event) {
          ownedMonsters[i][monsterStats[j]] = event.target.value; //console.log(ownedMonsters[i][monsterStats[j]]) console.log(event.target.value)
        })
        cell.appendChild(input)
        //cell.innerHTML = ownedMonsters[i][monsterStats[j]];
    }
  }
  
  console.log(ownedMonsters)
}

function testBreedingPairB(monsterStats, monsters){
  let pairList = []
  let debugTest = false
  for(let m1=1; m1<monsters.length; m1++){
    for(let m2=m1+1; m2<monsters.length; m2++){
      pairList[m1.toString() + "&" + m2.toString()]=0;
      if(debugTest) console.log("Testing: "+m1.toString() + "&" + m2.toString())
      //Calculate the probability that a child is as rare or rarer than the target
      let maxR = Math.max(parseInt(monsters[m1].Rarity), parseInt(monsters[m2].Rarity))
      let cRarityPercent = (maxR-parseInt(monsters[0].Rarity)+1)/maxR

      //calculate the probability that a child is as shiny as the target
      //todo: must make an input check to confirm that no scorpions are marked as shiny with a rarity < 3
      let cShinyPercent = 1
      if(monsters[0].Shiny==1) cShinyPercent=(monsters[m1].Shiny==1||monsters[m2].Shiny==1)?0.25:0

      //calculate the probability of the hp being high enough
      let cHpPercent = 0
      let avgStat = Math.floor((parseInt(monsters[m1].Hp)+parseInt(monsters[m2].Hp))/2)
      let maxStat = Math.max(parseInt(monsters[m1].Hp), parseInt(monsters[m2].Hp))
      if(avgStat>=parseInt(monsters[0].Hp)) cHpPercent=1
      else cHpPercent = (maxStat+1 - parseInt(monsters[0].Hp))/maxStat
      
      //calculate the probability of the attack being high enough
      let cAtkPercent = 0
      avgStat = Math.floor((parseInt(monsters[m1].Atk)+parseInt(monsters[m2].Atk))/2)
      maxStat = Math.max(parseInt(monsters[m1].Atk), parseInt(monsters[m2].Atk))
      if(avgStat>=parseInt(monsters[0].Atk)) cAtkPercent=1
      else cAtkPercent = (maxStat+1 - parseInt(monsters[0].Atk))/maxStat

      //calculate the probability of the child having the requested attributes
      let numRequiredAttributes = 0
      for(let i=5; i<monsterStats.length;i++){
        if(monsters[0][monsterStats[i]] && monsters[0][monsterStats[i]]!='' && monsters[0][monsterStats[i]].toLowerCase()!='void')
          numRequiredAttributes++
      }
      if(debugTest){
        console.log("Attributes of "+m1+"&"+m2)
        console.log("num Required Attributes: " + numRequiredAttributes)
      }
      let attrList=[]
      for(let j=5; j<monsterStats.length; j++){
        if(monsters[m1][monsterStats[j]] && !attrList.includes(monsters[m1][monsterStats[j]])){
          attrList.push(monsters[m1][monsterStats[j]])
        }
        if(monsters[m2][monsterStats[j]] && !attrList.includes(monsters[m2][monsterStats[j]])){
          attrList.push(monsters[m2][monsterStats[j]])
        }
      }
      if(debugTest){
        console.log("monster [0]: ")
        console.log(monsters[0])
        console.log("attribute list from children")
        console.log(attrList)
      }
      let cAttributePercent = 1
      let hasAttributes = true
      for(let j=5; j<monsterStats.length; j++){
        hasAttributes&=(!monsters[0][monsterStats[j]] || monsters[0][monsterStats[j]]==='' || attrList.includes(monsters[0][monsterStats[j]]))
      }
      if(!hasAttributes) cAttributePercent=0
      else{
        if(numRequiredAttributes<attrList.length && attrList.length>6){
          let numWays = math.combinations(attrList.length-numRequiredAttributes, 7-numRequiredAttributes)
          cAttributePercent=numWays/math.combinations(attrList.length,7)
        }
      }

      if(debugTest){
        console.log(m1+"&"+m2)
        console.log("Rarity %: "+cRarityPercent)
        console.log("Shiny %: "+cShinyPercent)
        console.log("Hp %: "+cHpPercent)
        console.log("Attack %: "+cAtkPercent)
        console.log("Attributes %: "+cAttributePercent)
        console.log("Overall %: "+(cRarityPercent*cShinyPercent*cHpPercent*cAtkPercent*cAttributePercent))
      }
      //console.log(math.combinations(9,5))

      /*for(let i=0; i<numTimes; i++){
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
          hasAttributes&=(!monsters[0][monsterStats[j]] || attrList.includes(monsters[0][monsterStats[j]]))
        }
        if(debugTest)console.log("Attr list then monster 0 list then hasAttributes")
        if(debugTest)console.log(attrList)
        if(debugTest)console.log(monsters[0])
        if(debugTest)console.log(hasAttributes)
        if(!hasAttributes) continue
        pairList[m1.toString() + "&" + m2.toString()]+=1
      }
      pairList[m1.toString() + "&" + m2.toString()]/=numTimes
      */
      pairList[m1.toString() + "&" + m2.toString()]=cRarityPercent*cShinyPercent*cHpPercent*cAtkPercent*cAttributePercent*100
    }
  }
  let orderedList = []
  for (const [key, value] of Object.entries(pairList)) {
    //console.log(`${key}: ${value}`)
    orderedList.push({
      name: key,
      chanceToGetTarget: value
    })
  }
  pairList=orderedList.sort( (a,b)=>{
    return b.chanceToGetTarget-a.chanceToGetTarget
  })
  console.log("Going to print test pair list")
  console.log(pairList)
  return pairList
}

function createMainTable(monsterStats, ownedMonsters){
  let table = document.createElement("TABLE")
  table.border = "1";
  //add the header
  
  let headRow = table.insertRow(-1)
  let headerCell = document.createElement("TH")
      headerCell.innerHTML = "Num";
      headRow.appendChild(headerCell)
  for (let i = 0; i < monsterStats.length; i++) {
      let headerCell = document.createElement("TH")
      headerCell.innerHTML = monsterStats[i];
      headRow.appendChild(headerCell)
  }
  refreshTable(table, monsterStats,ownedMonsters)

  let dvTable = document.getElementById("dvTable")
  dvTable.innerHTML = "";
  dvTable.appendChild(table)
  return table
}

function createButtons(table, monsterStats, ownedMonsters){
  let addButton = document.getElementById("AddMonsterButton")
  let removeButton = document.getElementById("RemoveMonsterButton")
  let numRemove = document.getElementById("MonsterToRemove")
  let numPairs = document.getElementById("NumPairs")

  numRemove.placeholder="Num to delete with '-'"
  numRemove.addEventListener("keyup", function(event) {
    numRemove.value = parseInt(event.target.value); console.log(numRemove.value) //console.log(event.target.value)
  })
  numPairs.addEventListener("keyup", function(event) {
    numPairs.value = parseInt(event.target.value); console.log(numPairs.value) //console.log(event.target.value)
  })
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
    refreshTable(table, monsterStats,ownedMonsters)
  })
  
  removeButton.addEventListener("click", function(event) {
    console.log(numRemove.value)
    if(numRemove.value==''){
      numRemove.value=ownedMonsters.length-1;
    }
    ownedMonsters.splice(parseInt(numRemove.value),1)
    refreshTable(table, monsterStats,ownedMonsters)
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
}

function createPairsTable(monsterStats, ownedMonsters){
  let resultsTable = document.createElement("TABLE")
  resultsTable.border = "1";
  let pairs=null
  //add the header
  
  let newHeadRow = resultsTable.insertRow(-1)
  let newHeaderCell = document.createElement("TH")
  newHeaderCell.innerHTML = "Pair";
  newHeadRow.appendChild(newHeaderCell)
  newHeaderCell = document.createElement("TH")
  newHeaderCell.innerHTML = "Chance to get target";
  newHeadRow.appendChild(newHeaderCell)
  let calcPairsButton = document.getElementById("TestPairsButton")
  calcPairsButton.addEventListener("click", function(event) {

    let t0 = performance.now()
    pairs = testBreedingPairB(monsterStats, ownedMonsters)
    let t1 = performance.now()
    console.log("Call to testBreedingPair took " + (t1 - t0) + " milliseconds.")
    while(resultsTable.rows.length>1){
      resultsTable.deleteRow(1)
    }
    for(let i=0; i<pairs.length; i++){
      row = resultsTable.insertRow(-1)
      let cell = row.insertCell(-1)
      cell.innerHTML = pairs[i].name;
      cell=row.insertCell(-1)
      cell.innerHTML = pairs[i].chanceToGetTarget + "%";

    }
  })

  dvTable = document.getElementById("resultsTable")
  dvTable.innerHTML = "";
  dvTable.appendChild(resultsTable)
  return pairs
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
    Hp: 25,
    Atk: 25,
    Attribute1: "Haste3",
    Attribute2: "Fireballs3",
    Attribute3: "LighteningTrap4",
    Attribute4: "Giant2",
    Attribute5: "LifeSteal7",
    Attribute6: "DamageBoost7",
    Attribute7: "",
  },
  {
    Name: "Scorpion",
    Rarity: 5,
    Shiny: 1,
    Hp: 41,
    Atk: 38,
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
    Rarity: 6,
    Shiny: 1,
    Hp: 30,
    Atk: 38,
    Attribute1: "Haste3",
    Attribute2: "Fireballs3",
    Attribute3: "LighteningTrap4",
    Attribute4: "Giant2",
    Attribute5: "LifeSteal7",
    Attribute6: "LifeBonus5",
    Attribute7: "PhysicalDamageReduction4",
  },
  {
    Name: "Scorpion",
    Rarity: 7,
    Shiny: 0,
    Hp: 47,
    Atk: 43,
    Attribute1: "Haste3",
    Attribute2: "Flame3",
    Attribute3: "Regen4",
    Attribute4: "Giant2",
    Attribute5: "LifeSteal7",
    Attribute6: "DamageBoost7",
    Attribute7: "PhysicalDamageReduction4",
  }]
  
  let table = createMainTable(monsterStats, ownedMonsters)

  createButtons(table, monsterStats, ownedMonsters)

  createPairsTable(monsterStats, ownedMonsters)

  createGroupTable(monsterStats, ownedMonsters)
  
}

