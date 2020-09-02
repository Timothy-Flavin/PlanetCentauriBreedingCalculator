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
    numRemove.value = event.target.value; console.log(numRemove.text); //console.log(event.target.value)
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
  

}

