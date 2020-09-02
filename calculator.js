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


  let definitions=[
    "Name: The name of the monster you are breeding, ex: Whisp or Zombie\n",
    "Rarity: Rarity is the color of the monster's name when hovered over. \n\
    There are 7 levels or rarity, white, green, purple, blue, yellow, orange, \n\
    and red. 1-7. A monster can only level in a given trait up to it's rarity.\n\
    For instance, a green Scorpion with Life Bonus 7 will only ever get to Life\n\
    Bonus 2 because it's rarity, green, is rarity 2. Even at level 70. \n\
    The calculator will be looking for the chances of creating a monster\n\
    with a rarity equal or greater than the rarity of the target monster\n\
    so if monster 0 has rarity 7 then only red/legendary monsters will be\n\
    searched for.\n",
    "Shiny: 1 for true, 0 for false. A monster's shinyness determines\n\
    whether or not the monster will have a prefix such as 'rare' or \n\
    'legendary'. This will also give the monster the pallet swap.\n",
    "Hp: The hp modifier on the monster, 1-50. if the monster '0', the \n\
    target monster has an hp > 0, then the calculator will look for a monster\n\
    with an hp modifier greater than or equal to the target monster\n",
    "Atk: same as hp but attack\n",
    "Attributes: A monster can have up to 7 attributes. how high a given\n\
    monster can level in a given attribute is decided by the minimum of\n\
    it's attribute level and it's rarity. (See rarity above) In this\n\
    calculator you must make sure that you name attributes the same or\n\
    the calculator may think that two monsters hace different attributes\n\
    when they don't. This is because I want this calculator to continue\n\
    working when new attributes are added, and not all monsters can have\n\
    all attributes. for example Life Bonus 3 is not the same as lifebonus3\n\
    Spelling matters and this calculator will think that 2 monsters with \n\
    life bonus written those 2 ways actually have different attributes. \n\
    if any of a target monster's attributes are left blank, The calculator\n\
    will assume you do not care what goes in those attribute slots.\n",
  ]

}

