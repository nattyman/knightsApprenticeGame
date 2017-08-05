// import Message from "scripts/message";
// import Tick from "scripts/tick";
//
// var a = "template test";
// // var test = `This is a ${a}!`;
// var test = `This is a ${a}!`;
//
// document.getElementById('tempTest').innerHTML = test;

// var intro = `<p>The swordsman arrived to find a young boy surrounded by five grown men.  The boys eyes glinted fiercely in the firelight as he brandished a burning branch back and forth to keep the men back.  He guarded two figures that lay motionless at his feet, a man and a woman.
//
//       <p>The men laughed and taunted him as they slowly closed in like a noose tightening around a neck.  The swordsman dismounted from his stead and quickly made mincemeat of the bandits. His face was grim and he said nothing as he put them each down in turn.
//
//       <p>When all was silent he looked to the boy.  He still held the, now smoldering, branch as if he would fight off even this man who had saved him if necessary.
//
//       <p>"Would you fight me too, boy?"  The swordsman asked.  The boy said nothing in reply, but stared at the man in defiance, knuckles tight around the branch.
//
//       <p>"Come with me boy.  There is nothing left for you here but death."  The boy looked down at his parents, lifeless at his feet.
//
//       <p>"Let the dead bury their own dead.  I have no time to wait.  Come with me now or stay here alone." The man said evenly and without malice.
//
//       <p>After a moment's hesitation, the boy threw the branch aside.  Touched the head of his father, then his mother, then went to the swordsman.  The man mounted his horse, then pulled the boy up in front of him and dug his hills into the horse's side and with a click of his tongue, the horse broke into a gallop.
//
//       <p>The boy did not look back.
//
//       <hr>
//
//       <p>The swordsman has made you his esquire.  If you prove faithful he will someday make you his apprentice.
//       </p>`
//
//  To Do
//  -Create shop buttons from objects
//  -Add prices to shop items
//  -Add message for purchasing
//  -Add "you don't have enough money message"

const debug = 1;

// Game Objects //

var coin = 0;

// Inventory //
var inventory = {
  axe: 0,
  staff: 0,
  knife: 0,
  recurveBow: 0,
  longBow: 0,
  pony: 0,
  horse: 0,
}

// skills //
var skill = { //skill index
  riding: 0,
  staff: 0,
  knife: 0,
  bow: 0,
  sword: 0,
}

var ridingSkills = {
  // Put all the HTML references in here so that the HTML page can pass one value to the button click function then the function can pull everything it needs from the object.
  name: "riding",
  htmlClass: "practiceButton",
  htmlId: "practiceRiding",
  msg: "Practicing riding.",
  shopMsg: "You bought an axe. Careful not to chop your foot off.",
  time: 100,
  type: "training",
}
var staffSkills = {
  name: "staff",
  htmlClass: "practiceButton",
  htmlId: "practiceStaff",
  msg: "Practicing with the staff.",
  time: 100,
  type: "training",
  trustLevel: 2,
}
// jobs //
var gatherWood = {
  htmlClass: "earnCoin",
  htmlId: "gatherWood",
  msg: "Gathering wood.",
  coinsEarned: 1,
  difficulty: 1,
  time: 100,
  type: "job",
}
var runDelivery = {
  htmlClass: "earnCoin",
  htmlId: "runDelivery",
  msg: "Running delivery.",
  coinsEarned: 2,
  difficulty: 1,
  time: 150,
  trustLevel: 3,
  type: "job",
}

// actions //
var shop = {
  htmlClass: "actions",
  htmlId: "shop",
  trustLevel: 1,
  type: "job",

}
// tools //
var axe = {
  msg: "The axe makes gathering wood a lot easier!",
  cost: 2,
  bonusCoins: 1,
  timeSaved: 3
}

var cart = {
  msg: "With a cart you can haul more things faster.",
  cost: 3,
  bonusCoins: 2,
  timeSaved: 5,
}

// Weapons //
var staff = {
  msg: "The staff is a good starter weopon to learn balance and control.",
  cost: 3,
  damage: 1,
}
var knife = {
  msg: "The knife is a handy tool that can double as a weopon",
  cost: 5,
  damage: 1,
}

// Trust //
var trust = {
  training: 0,
  job: 0,
}

// Whats Visible //
// 0 = hidden, 1 = visible //
var visibility = {
  staffSkills: 0,
  runDelivery: 0,
  shop: 0,
}

// Shop buttons //
var shopButtons = {
  axe: 1,
  cart: 0,
  staff: 0,
  knife: 0,
}

if (debug == 1) {
  console.log("Game Started");
}

function sendMessage(name) {
  objName = name;

  if (debug == 1) {
    console.log("sendMessage triggered = " + objName);
  }

  // Prepend new message to message list
  let msg = document.getElementById("messages").innerHTML;
  msg = '<div class="message">' + this[objName].msg + "</div>" + msg;
  // Write out new message
  document.getElementById("messages").innerHTML = msg;

}

function changeButtonState(name, state) {
  htmlClass = this[name].htmlClass;
  let buttonList = document.getElementsByClassName(htmlClass); //get the list of practice buttons by class.
  // Iterate through the list of buttons and disable them.
  for (let i = 0; i < buttonList.length; i++) {
    buttonList[i].disabled = state;
  }
}

function buttonCoolDown(name) {
  let countDown = this[name].time;
  let htmlId = this[name].htmlId;

  // document.getElementById(htmlId).style.background = `linear-gradient(#666 100%)`;
  let gradient = -20;


  function coolDown(countDown, htmlId) {
    // This formula is still wrong. NEEDS WORK
    gradient++;
    if (debug > 1) {
      console.log("gradient = " + gradient);
    }
    document.getElementById(htmlId).style.background = `linear-gradient(#222 ${gradient}%, #666 99%, #666 100%, #666 100%, #666 100%)`;
    countDown--;
    if (debug > 1) {
      console.log("countdown = " + countDown);
    }
    if (countDown > 0) {
      setTimeout(coolDown, 10, countDown, htmlId);
    } else {
      document.getElementById(htmlId).style.background = "";
      changeButtonState(name, false);
      earnTrust(name);
      // Check to see if anything new should be made visible
      checkVisibility(name);
    }

  }
  coolDown(countDown, htmlId);
}

function addMoney(name) {
  coin = coin + this[name].coinsEarned;
  document.getElementById("coins").innerHTML = coin;
}

function incrementSkill(name) {
  //update the skill level in the object
  // New skill level logic //
  let skillName = this[name].name;
  let skillLevel = skill[skillName];
  skillLevel++;
  skill[skillName] = skillLevel;

  let keys = getKeys("skill");

  // create html for inventory to insert on the page
  let skillHtml = "";

  // iterate over inventory object using the new keys array to build the inventory html
  for (let i = 0; i < keys.length; i++) {
    let myObj = keys[i];
    // Don't show empty inventory
    if (skill[myObj] > 0) {
      skillHtml += `<div id="${myObj}" class="skillLevel">${myObj}: <span id="${myObj}Count">${skill[myObj]}</span></div>`
    }
    console.log(skillHtml);
  }
  // write out the updated inventory
  document.getElementById("skillLevels").innerHTML = skillHtml;


  // update the skill level in the UI
  // let skillId = name + 'Level';
  // document.getElementById(skillId).innerHTML = skillLevel;

}

// Get keys from object and put them into an array
function getKeys(obj) {
  let keys = [];
  for (let key in this[obj]) {
    if (this[obj].hasOwnProperty(key)) keys.push(key);
    console.log(`inventory key = ${key}`);
  }
  return keys;
}

function earnTrust(name) {
  let type = this[name].type;
  let trustLevel = trust[type];
  trustLevel++;
  trust[type] = trustLevel;
  console.log(`Trust level for ${type} is ${trustLevel}`);
}

function writeInventory() {

  // create array of inventory Objects
  let keys = getKeys("inventory");
  console.log(`keys array = ${keys}`);
  // let keys = [];
  // for (let key in inventory){
  //  if (inventory.hasOwnProperty(key)) keys.push(key);
  // console.log(`inventory key = ${key}`);
  // }

  // create html for inventory to insert on the page
  let inventoryHtml = "";

  // iterate over inventory object using the new keys array to build the inventory html
  for (let i = 0; i < keys.length; i++) {
    let myObj = keys[i];
    // Don't show empty inventory
    if (inventory[myObj] > 0) {
      inventoryHtml += `<div id="${myObj}" class="inventory">${myObj}: <span id="${myObj}Count">${inventory[myObj]}</span></div>`
    }
    // console.log(inventoryHtml);
  }
  // write out the updated inventory
  document.getElementById("inventory").innerHTML = inventoryHtml;

} // End writeInventory

function checkVisibility(name) {

  // create array of keys from visibility object
  let keys = [];
  for (let key in visibility) {
    if (visibility.hasOwnProperty(key)) keys.push(key);
  }

  // iterate over visibility object using the new keys array
  for (let i = 0; i < keys.length; i++) {

    let myObj = keys[i]
    let type = this[keys[i]].type;
    let myObjVisibility = visibility[myObj];
    let htmlId = this[myObj].htmlId;

    if (debug == 1) {
      console.log("Visibility for " + myObj, myObjVisibility);
    }

    // Unhide any buttons based on the trust level
    if (this[myObj].trustLevel <= trust[type]) {
      console.log("You are trusted for " + myObj);
      visibility[myObj] = 1;
      document.getElementById(htmlId).classList.remove('hidden');
      //let myClass = document.getElementById(myObj).className;
      //let myNewClass = myClass.replace("hidden", "");
    }


  }
}

// Send message in the shop
function sendShopMessage(msg) {
  document.getElementById('shopMsg').innerHTML = msg;
}


function earnCoin(name, action, htmlClass) {
  let actionId = action;
  // let name = job;

  if (debug == 1) {
    console.log(`name = ${name}, action = ${action}, htmlClass = ${htmlClass}`);
  }
  // get object

  //disable class
  changeButtonState(name, true);

  //cooldown button
  buttonCoolDown(name);

  //add message
  sendMessage(name);

  //add money
  if (this[name].type == "job") {
    addMoney(name);
  }
  //check for tools
  //update UI $

  //increment skill level
  if (this[name].type == "training") {
    incrementSkill(name);
  }
} //end earnCoin

// Purchase items //
function purchase(item) {
  let newItem = item;
  // Is there enough coin
  if (this[newItem].cost <= coin) {
    console.log("Yes you can buy this");
    inventory[item]++;
    coin = coin - this[newItem].cost;
    document.getElementById("coins").innerHTML = coin;
    console.log(`${item} = ${inventory[item]}`);
    writeInventory();
    sendShopMessage(`You purchased a ${item}`)
  } else {
    sendShopMessage("You don't have enough money for that.")
  }

}
