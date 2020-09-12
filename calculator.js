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
    if(i==0){
      row.className="bg-green-light"
    }
    let cell = row.insertCell(-1)
    cell.innerHTML = i==0?'0, Target':i;
    for (let j = 0; j < monsterStats.length; j++) {
        let cell = row.insertCell(-1)
        input = document.createElement('input')
        input.type='text';
        //input.style.flex="auto"
        input.value=(String)(ownedMonsters[i][monsterStats[j]])
        if(j==0){ 
          input.style.width="14ch"
          input.addEventListener("keyup", function(event) {
            ownedMonsters[i][monsterStats[j]] = event.target.value; //console.log(ownedMonsters[i][monsterStats[j]]); console.log(event.target.value)
          })
        }
        else if(j<5 && j>0){
          input.style.width="4ch"
          input.addEventListener("keyup", function(event) {
            ownedMonsters[i][monsterStats[j]] = parseInt(event.target.value); //console.log(ownedMonsters[i][monsterStats[j]]); console.log(event.target.value)
          })
        } 
        else if(j==5){
          input.style.width="4ch"
          input.addEventListener("keyup", function(event) {
            ownedMonsters[i][monsterStats[j]] = (String)(event.target.value); //console.log(ownedMonsters[i][monsterStats[j]]); console.log(event.target.value)
          })
        }
        else{
          input.addEventListener("keyup", function(event) {
            ownedMonsters[i][monsterStats[j]] = event.target.value; //console.log(ownedMonsters[i][monsterStats[j]]); console.log(event.target.value)
          })
        }
        cell.appendChild(input)
        //cell.innerHTML = ownedMonsters[i][monsterStats[j]];
    }
  }
  
  console.log(ownedMonsters)
}

function testBreedingPairB(monsterStats, monsters){
  let pairList = []
  let debugTest = true
  for(let m1=1; m1<monsters.length; m1++){
    for(let m2=m1+1; m2<monsters.length; m2++){
      pairList[m1.toString() + "&" + m2.toString()]=0;
      if(debugTest) console.log("Testing: "+m1.toString() + "&" + m2.toString())
      //Test if Sex is compatible 
      let cSexPercent = 1
      if(monsters[m1].Sex === monsters[m2].Sex)
        cSexPercent *= 0
      if(monsters[0].Sex === 'M' || monsters[0].Sex === 'F')
        cSexPercent*=0.5;
      //Calculate the probability that a child is as rare or rarer than the target
      let maxR = Math.max(parseInt(monsters[m1].Rarity), parseInt(monsters[m2].Rarity))
      let cRarityPercent =Math.max((maxR-parseInt(monsters[0].Rarity)+1)/maxR, 0)

      //calculate the probability that a child is as shiny as the target
      //todo: must make an input check to confirm that no scorpions are marked as shiny with a rarity < 3
      let cShinyPercent = 1
      if(monsters[0].Shiny==1) cShinyPercent=(monsters[m1].Shiny==1||monsters[m2].Shiny==1)?0.25:0

      //calculate the probability of the hp being high enough
      let cHpPercent = 0
      let avgStat = Math.floor((parseInt(monsters[m1].Hp)+parseInt(monsters[m2].Hp))/4)
      let maxStat = Math.max(parseInt(monsters[m1].Hp), parseInt(monsters[m2].Hp))
      if(avgStat>=parseInt(monsters[0].Hp)) cHpPercent=1
      else cHpPercent = Math.max((maxStat+1 - parseInt(monsters[0].Hp))/maxStat,0)
      
      //calculate the probability of the attack being high enough
      let cAtkPercent = 0
      avgStat = Math.floor((parseInt(monsters[m1].Atk)+parseInt(monsters[m2].Atk))/4) //this 4 was a two but itchyfart said it is half the avg
      maxStat = Math.max(parseInt(monsters[m1].Atk), parseInt(monsters[m2].Atk))
      if(avgStat>=parseInt(monsters[0].Atk)) cAtkPercent=1
      else cAtkPercent = Math.max((maxStat+1 - parseInt(monsters[0].Atk))/maxStat,0)

      //calculate the probability of the child having the requested attributes
      let numRequiredAttributes = 0
      for(let i=6; i<monsterStats.length;i++){
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
        console.log("Sex %: "+cSexPercent)
        console.log("Rarity %: "+cRarityPercent)
        console.log("Shiny %: "+cShinyPercent)
        console.log("Hp %: "+cHpPercent)
        console.log("Attack %: "+cAtkPercent)
        console.log("Attributes %: "+cAttributePercent)
        console.log("Overall %: "+(cRarityPercent*cShinyPercent*cHpPercent*cAtkPercent*cAttributePercent*cSexPercent))
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
      pairList[m1.toString() + "&" + m2.toString()]=cRarityPercent*cShinyPercent*cHpPercent*cAtkPercent*cAttributePercent*cSexPercent*100
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

function testBreedingGroups(pairs, numGroups){
  groups=[]
  console.log
  for(let i=0; i<pairs.length - numGroups+1; i++){
    let pairNums = []
    //pairs to look at, total number of pairs in a group, current depth, pairNumToCheck, ScorpionsUsed
    let group={
      name:"",
      chanceToGetTarget: 100
    }
    group=checkGroupsRecursive(pairs, numGroups, 0, i, pairNums, group)
    if(group)
      groups.push(group)
  }
  if(!groups) return [{name:"NumGroups=0 or More pairs than possible",chanceToGetTarget:"cannot get groups"}]
  return groups.sort( (a,b)=>{
    return b.chanceToGetTarget-a.chanceToGetTarget
  })
}

function checkGroupsRecursive(pairs, numGroups, curGroupDepth, curPairNum, ScorpionsUsed, group){
  console.log(group)
  if(curGroupDepth==numGroups){
    group.name=group.name.substring(1,group.name.length)
    group.chanceToGetTarget = 100- group.chanceToGetTarget
    return group
  }
  for(let i=curPairNum; i<pairs.length; i++){
    //check if this one works
    let s1 = parseInt(pairs[i].name[0])
    let s2 = parseInt(pairs[i].name[2])
    if(!ScorpionsUsed.includes(s1) && !ScorpionsUsed.includes(s2)){
      group.name += ","+pairs[i].name,
      console.log(pairs[i].name)
      console.log(pairs[i].chanceToGetTarget)

      group.chanceToGetTarget*=(100-pairs[i].chanceToGetTarget)/100.0
      ScorpionsUsed.push(s1)
      ScorpionsUsed.push(s2)
      group=checkGroupsRecursive(pairs, numGroups, curGroupDepth+1, i+1, ScorpionsUsed, group)
      return group
    }
  }
  return null
}

function createMainTable(monsterStats, ownedMonsters){
  let table = document.createElement("TABLE")
  //add the header
  
  let headRow = table.insertRow(-1)
  let headerCell = document.createElement("TH")
      headerCell.innerHTML = "Number";
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

  numRemove.placeholder="Num to delete with '-'"
  numRemove.addEventListener("keyup", function(event) {
    numRemove.value = parseInt(event.target.value); console.log(numRemove.value) //console.log(event.target.value)
  })
  
  addButton.addEventListener("click", function(event) {
    ownedMonsters.push(
      {
        Name: "Scorpion",
        Rarity: 5,
        Shiny: 0,
        Hp: 40,
        Atk: 40,
        Sex: "M",
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

function createTables(monsterStats, ownedMonsters){
  let resultsTable = createGroupTable("Pair", "Chance to get target")
  let pairs=null
  let groups=null
  let resultsTable2 = createGroupTable("Group of pairs", "Total chance to get target")
  let numPairs = document.getElementById("NumPairs")
  numPairs.addEventListener("keyup", function(event) {
    console.log("Let's see what this is")
    console.log(event.target.value)

    if(event.target.value && event.target.value!='' && event.target.value!="NaN")
      numPairs.value = parseInt(event.target.value)
    console.log(numPairs.value) //console.log(event.target.value)
  })

  let calcPairsButton = document.getElementById("TestPairsButton")
  calcPairsButton.addEventListener("click", function(event) {

    let errString = validateUserData(ownedMonsters)
    if(errString && errString!=""){
      console.log(errString)
      document.getElementById("errorText").innerHTML=errString
      document.getElementById("errorText").className='pd-sm border-style: solid;'
    }
    else{
      document.getElementById("errorText").innerHTML=''
      document.getElementById("errorText").className=''
      let t0 = performance.now()
      pairs = testBreedingPairB(monsterStats, ownedMonsters)
      if(numPairs.value>0 && numPairs.value<ownedMonsters.length/2){ //strictly less than because owned monsters includes target monster
        groups = testBreedingGroups(pairs, numPairs.value)
        console.log("Right number of groups bro: "+numPairs.value + "out of: " + ownedMonsters.length/2)
      }
      else{
        console.log("not the right number of groups bro: "+numPairs.value)
        groups=[{name:"NumGroups=0 or More pairs than possible",chanceToGetTarget:"cannot get groups"}]
      }
      let t1 = performance.now()
      
      console.log("Call to testBreedingPair took " + (t1 - t0) + " milliseconds.")
      refreshResultsTable(resultsTable, pairs)
      refreshResultsTable(resultsTable2, groups)
    }
  })

  dvTable = document.getElementById("resultsTable")
  dvTable.innerHTML = "";
  dvTable.appendChild(resultsTable)
  dvTable = document.getElementById("resultsTable2")
  dvTable.innerHTML = "";
  dvTable.appendChild(resultsTable2)
  return pairs
}

function createGroupTable(string1, string2){
  let resultsTable = document.createElement("TABLE")
  //add the header
  
  let newHeadRow = resultsTable.insertRow(-1)
  let newHeaderCell = document.createElement("TH")
  newHeaderCell.innerHTML = string1;
  newHeadRow.appendChild(newHeaderCell)
  newHeaderCell = document.createElement("TH")
  newHeaderCell.innerHTML = string2;
  newHeadRow.appendChild(newHeaderCell)

  return resultsTable
}

function refreshResultsTable(resultsTable, pairs){
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
}

function validateUserData(ownedMonsters){
  let errorMessage=""
  for(let i=0;i<ownedMonsters.length; i++){
//validate rarity input
    let rarityPassed=true
    rarity=parseInt(ownedMonsters[i].Rarity)
    if(!rarity){
      rarityPassed=false
      errorMessage+="Monsters["+i+"] rarity does not exist or is blank<br/>"
    }
    else if(isNaN(rarity)){
      rarityPassed=false
      errorMessage+="Monsters["+i+"] rarity is not a number<br/>"
    }
    else if(rarity<1 || rarity>7){ 
      rarityPassed=false
      errorMessage+="Monsters["+i+"] rarity is out of range [1,7]<br/>"
    }
//validate shiny input
    let shinyPassed = true
    shiny = parseInt(ownedMonsters[i].Shiny)
    console.log("Shiny: ")
    console.log(shiny)
    if(isNaN(shiny)) {
      shinyPassed = false
      errorMessage+="Monsters["+i+"] shiny is not a number<br/>"
    }
    else if(shiny!=0 && shiny!=1) {
      shinyPassed = false
      errorMessage+="Monsters["+i+"] shiny should be '1' or '0'<br/>"
    }
    else if(shiny===1 && rarityPassed && rarity<4) {
      shinyPassed = false
      errorMessage+="Monsters["+i+"] is labeled as shiny, but it's rarity is not high enough to be shiny<br/>"
    }
//validate Hp
    let hpPassed=true
    let hp=parseInt(ownedMonsters[i].Hp)
    if(!hp){
      hpPassed=false
      errorMessage+="Monsters["+i+"] hp does not exist or is blank<br/>"
    }
    else if(isNaN(hp)){
      hpPassed=false
      errorMessage+="Monsters["+i+"] hp is not a number<br/>"
    }
    else if(hp<0 || hp>50){ 
      hpPassed=false
      errorMessage+="Monsters["+i+"] hp is out of range [0,50]<br/>"
    }
//validate atk
    let atkPassed=true
    let atk=parseInt(ownedMonsters[i].Atk)
    if(!atk){
      atkPassed=false
      errorMessage+="Monsters["+i+"] atk does not exist or is blank<br/>"
    }
    else if(isNaN(atk)){
      atkPassed=false
      errorMessage+="Monsters["+i+"] atk is not a number<br/>"
    }
    else if(atk<0 || atk>50){ 
      atkPassed=false
      errorMessage+="Monsters["+i+"] atk is out of range [0,50]<br/>"
    }
/*
    ownedMonsters[i].Attribute1=ownedMonsters[i].Attribute1.toUpperCase()
    ownedMonsters[i].Attribute2=ownedMonsters[i].Attribute2.toUpperCase()
    ownedMonsters[i].Attribute3=ownedMonsters[i].Attribute3.toUpperCase()
    ownedMonsters[i].Attribute4=ownedMonsters[i].Attribute4.toUpperCase()
    ownedMonsters[i].Attribute5=ownedMonsters[i].Attribute5.toUpperCase()
    ownedMonsters[i].Attribute6=ownedMonsters[i].Attribute6.toUpperCase()
    ownedMonsters[i].Attribute7=ownedMonsters[i].Attribute7.toUpperCase()
*/
  }
  return errorMessage
}

window.onload = function(){
  let monsterStats=[
    "Name",
    "Rarity",
    "Shiny",
    "Hp",
    "Atk",
    "Sex",
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
    Rarity: 4,
    Shiny: 1,
    Hp: 25,
    Atk: 25,
    Sex:"M",
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
    Sex:"F",
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
    Sex:"M",
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
    Sex:"F",
    Attribute1: "Haste3",
    Attribute2: "Flame3",
    Attribute3: "Regen4",
    Attribute4: "Giant2",
    Attribute5: "LifeSteal7",
    Attribute6: "DamageBoost7",
    Attribute7: "PhysicalDamageReduction4",
  }]
  
  let table = createMainTable(monsterStats, ownedMonsters)

  createTables(monsterStats,ownedMonsters)

  createButtons(table, monsterStats, ownedMonsters)
  
}

