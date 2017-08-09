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
//  X-Add message for purchasing
//  X-Add "you don't have enough money message"

const debug = 1;

// Game Objects //

var coin = 0;

// Timmer for apprentice duties //
var taskTimer = 0;
var numb = 1;
var taskCount = {
  number: function(numb){
    let taskKeys = getKeys("tasks");
      console.log("task key array = " + taskKeys);
    let taskKeysCount = taskKeys.length // +1 so we don't start count from 0
      console.log("taskKeysCount = " + taskKeysCount);
    if (numb < taskKeysCount){
      numb++;
    }
    else if (numb == taskKeysCount) {
      numb = 1;
      console.log("Reset msgKey to 1");
    } // if the count is greater than the length of the number of keys then reset it to 1.
    return numb;
  }
}
var tasks = {
  1: {
    button: "Feed the horses.",
    msg: "Feeding the horses.",
  },
  2: {
    button: "Shine boots.",
    msg: "Who needs this many boots?",
  },
  3: {
    button: "Polish knights helm.",
    msg: "Polishing his helm.",
  }
}
var taskObj = {
  name: "tasks",
  htmlId: "taskButton",
  htmlClass: "mainButtons",
  time: 100,
  type: "tasks",
}

// Inventory //
var inventory = {
  axe: 0,
  cart: 0,
  staff: 0,
  knife: 0,
  sling: 0,
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
  requirement: "staff",
}
// jobs //
var gatherWood = {
  htmlClass: "earnCoin",
  htmlId: "gatherWood",
  htmlPayId: "gatheringWoodPayAmount",
  msg: "Gathering wood.",
  coinsEarned: 1,
  difficulty: 1,
  time: 100,
  type: "job",
}
var runDelivery = {
  htmlClass: "earnCoin",
  htmlId: "runDelivery",
  htmlPayId: "runDeliveryPayAmount",
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
  name: "Wooden Axe",
  id: "axe",
  type: "tool",
  msg: "The axe makes gathering wood a lot easier!",
  cost: 2,
  bonusCoins: 1,
  timeSaved: 3,
  primary: "gatherWood",
}

var cart = {
  name: "Wooden Cart",
  id: "cart",
  type: "tool",
  msg: "With a cart you can haul more things at a time.",
  cost: 3,
  bonusCoins: 2,
  timeSaved: 5,
  primary: "runDelivery",
  secondary: "gatherWood",
}

// Weapons //
var staff = {
  name: "Wooden Staff",
  id: "staff",
  type: "weapon",
  msg: "The staff is a good starter weapon to learn balance and control.",
  cost: 3,
  damage: 1,
}
var knife = {
  name: "Knife",
  id: "knife",
  type: "weapon",
  msg: "The knife is a handy tool that can double as a weapon",
  cost: 5,
  damage: 1,
}
var sling = {
  name: "Sling Shot",
  id: "sling",
  type: "weapon",
  msg: "The sling shot can be used to hunt small animals.",
  cost: 4,
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
  cart: 1,
  staff: 1,
  knife: 1,
  sling: 1,
}
// Global array to store onclick events before they are set to null/disabled while they are busy, then this array can be used to set them back.  There is probably a better way to do this.
var prevOnclick = [];

if (debug == 1) {
  console.log("Game Started");
}

function sendMessage(newMsg) {
  let msg = document.getElementById("messages").innerHTML;
  document.getElementById("messages").innerHTML = msg;
  msg = '<div class="message">' + newMsg + "</div>" + msg;
  document.getElementById("messages").innerHTML = msg;

}
function buildMessage(name) {
  objName = name;

  if (debug == 1) {
    console.log("sendMessage triggered = " + objName);
  }

  // Prepend new message to message list
    // let msg = document.getElementById("messages").innerHTML;
    msg = this[objName].msg
  // Write out new message
  // document.getElementById("messages").innerHTML = msg;
  sendMessage(msg);
}

function changeButtonState(name, state) {
  htmlClass = this[name].htmlClass;
  let buttonList = document.getElementsByClassName(htmlClass); //get the list of practice buttons by class.
  // Iterate through the list of buttons and disable them.
  for (let i = 0; i < buttonList.length; i++) {
    if (state == "disabled"){
      prevOnclick.push(buttonList[i].onclick);
        console.log(`Stored onclick = ${prevOnclick[i]}`);
      buttonList[i].classList.add("disabled");
      // buttonList[i].onclick = "disabled";
    }
    else {
      // console.log(`Re-enable buttons ${prevOnclick[i]}`);
      buttonList[i].classList.remove("disabled");
      // buttonList[i].onclick = "prevOnclick[i]";
    }
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
      changeButtonState(name, "enabled");
      earnTrust(name);
      // Check to see if anything new should be made visible
      checkVisibility(name);
    }

  }
  coolDown(countDown, htmlId);
}

function addMoney(name) {
  // Check inventory for tools to affect earnings
  let tools = getKeys("inventory");
  let bonusEarned = 0;

  for(let i=0; i< tools.length; i++){
    let tool = tools[i];
    if (inventory[tool] > 0){
      if (this[tool].primary == name || this[tool].secondary == name){
        bonusEarned =  this[tool].bonusCoins;
      }
    }
  }

  coin = coin + this[name].coinsEarned + bonusEarned;
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
    // console.log(`inventory key = ${key}`);
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

  // create html for inventory to insert on the page
  let inventoryHtml = "";

  // iterate over inventory object using the new keys array to build the inventory html
  for (let i = 0; i < keys.length; i++) {
    let myObj = keys[i];
    // Don't show empty inventory
    if (inventory[myObj] > 0) {
      inventoryHtml += `<div id="${myObj}" class="inventory">${myObj}: <span id="${myObj}Count">${inventory[myObj]}</span></div>`
    }
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

    // Unhide any buttons based on requirements met.
    let requirement = this[myObj].requirement;
    if (inventory[requirement] > 0) {
      visibility[myObj] = 1;
      document.getElementById(htmlId).classList.remove('hidden');

    }
  }
}

function updateHtmlPay(item){
if (this[item].type == "tool"){
  let name = this[item].primary;
  let idToUpdate = this[name].htmlPayId;
  let newPay = this[name].coinsEarned + this[item].bonusCoins;
  document.getElementById(idToUpdate).innerHTML = `+${newPay}`;
}
}

// Send message in the shop
function sendShopMessage(msg) {
  document.getElementById('shopMsg').innerHTML = msg;
}


function earnCoin(name, action, htmlClass) {
  let actionId = action;

  // Check to see if this group of buttons is already disabled, if so, exit function.
  let htmlId = this[name].htmlId;
  let htmlClassList = document.getElementById(htmlId).className;
  if (htmlClassList.match("disabled") ){
    console.log("You cannot click on a a group of buttons that are still in their cooldown state.");
    return; // Exit, do not allow any actions.
  }

  if (debug == 1) {
    console.log(`name = ${name}, action = ${action}, htmlClass = ${htmlClass}`);
  }
  // get object

  //disable class of buttons
  changeButtonState(name, "disabled");

  //cooldown button
  buttonCoolDown(name);

  //add message
  buildMessage(name);

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
    sendShopMessage(`You purchased a ${item}`);
    checkVisibility(item);
    updateHtmlPay(item);
  } else {
    sendShopMessage("You don't have enough money for that.")
  }

}

function buildShopButtons(name,cost,id){
  let myhtml = `<div id="${id}" class="button shop tooltip" onclick="purchase('${id}')">
    ${name}
    <span id='${id}Cost' class="tooltiptext">
      ${cost} coins
    </span>
  </div>`;
  return myhtml;
}

function buildShop(){
  let msg = "What would you like to purchase???";
  document.getElementById('shopMsg').innerHTML = msg;
  // html variables to insert into document
  let toolHtml = "";
  let weaponHtml = "";
  // Get the array of possible shop buttons
  let shopButtonKeys = getKeys("shopButtons");

  // Iterate through the array to compile html
  for (let i=0; i<shopButtonKeys.length; i++){
    let button = shopButtonKeys[i];
    console.log(`button = ${button}`);
    if (shopButtons[button] == 1) { //If one the button should be visible
      // Gather button pieces
      let name = this[button].name;
      let cost = this[button].cost;
      let id = this[button].id;
      // let type = this[button].type;
        // build tool button
      switch (this[button].type) {
        case "tool":
          toolHtml += buildShopButtons(name,cost,id)
          console.log(`matched ${name} for tool`);
          break;
        case "weapon":
          weaponHtml += buildShopButtons(name,cost,id)
          console.log(`matched ${name} for weapon`);
          break;
        default: console.log(`${button} couldn't be built, no Type`);
      }
    }
    else {
      console.log(`${button} should not be visible`);
    }
  }
  document.getElementById('shopTools').innerHTML = toolHtml;
  document.getElementById('shopWeapons').innerHTML = weaponHtml;
}

// Perform regular apprentice duties
// This will have a slow burn down
// requirements
//   clicking the button will:
//     -Add time to the burndown
//     -Trust level will affect the max amount of time that can be accrued.
//   When the time runs out it disables the other buttons.
//   Trust level can increase the max time.
function performDuties(){
  // Add time
  taskTimer += 10;
  console.log(taskTimer);
  // build message
  let name = "taskObj";
  changeButtonState(name, "disabled");
  buttonCoolDown(name)
  numb = taskCount.number(numb); //Get a number to use as the msg key.
  console.log("msgKey = " + numb);
  // let tasks = getKeys(taskButton);
  let msgNumb = 1;
  switch (numb) {
    case 1:  // first
      msgNumb = 3;
      break;
    default: // everything in between
      msgNumb = numb -1;
      break;
  }
  let msg = tasks[msgNumb].msg;
  document.getElementById('taskButton').innerHTML = tasks[numb].button;
  // document.getElementById('taskButton').onclick = `performDuties('${msgKey}')`;
  // send message
  sendMessage(msg);//**sendMessage needs to be broken down into 2 functions, one to build the message for the regular buttons and the other to accept the msg itself and post it... postMsg is probably a better name.  buildMsg and postMsg

  // cooldown button
  // Enable buttons, if necessary, send message.
}
