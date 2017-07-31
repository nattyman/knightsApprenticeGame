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

const debug = 1;

// Game Objects //


var coin = 0;

// skills //
var skill = { //skill index
	riding: 0,
	staff: 0
}
var ridingSkills = {
	// Put all the HTML references in here so that the HTML page can pass one value to the button click function then the function can pull everything it needs from the object.
	htmlClass: "practiceButton",
	htmlId: "practiceRiding",
	skillLevel: 0,
	practiceMsg: "Practicing riding.",
	type: "training",
}
var staffSkills = {
	htmlClass: "practiceButton",
	htmlId: "practiceStaff",
	skillLevel: 0,
	practiceMsg: "Practicing with the staff.",
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
	time: 10,
	type: "job",
}
var runDelivery = {
	htmlClass: "earnCoin",
	htmlId: "runDelivery",
	msg: "Running delivery.",
	coinsEarned: 2,
	difficulty: 1,
	time: 15,
	hidden: "no",
	trustLevel: 3,
	type: "job",
}
// tools //
var axe = {
	cost: 10,
	bonusCoins: 1,
	timeSaved: 3
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
}

if (debug == 1){
	console.log("Game Started");
}

function practiceSkill(skillPracticed,id) {

  skill[skillPracticed]++;
	console.log("Inside Test");
  console.log(`${skillPracticed} skill now = ${skill[skillPracticed]}`);
	let buttonId = id;
	let coolCount = 0;
	coolDownButton(buttonId,coolCount);
	document.getElementById(`${skillPracticed}SkillLevel`).innerHTML = `${skill[skillPracticed]}`
	// send message
	  //construct object name
		let objName = skillPracticed + "Skills";
		console.log("objName = " + objName);
	let msg = document.getElementById("messages").innerHTML;
	msg = '<div class="message">' + this[objName].practiceMsg + "</div>"  + msg;
	console.log("msg = " + msg);
	document.getElementById("messages").innerHTML = msg;

}

function sendMessage(name) {
	objName = name;

	if (debug == 1){console.log("sendMessage triggered = " + objName);}

	// Prepend new message to message list
	let msg = document.getElementById("messages").innerHTML;
	msg = '<div class="message">' + this[objName].msg + "</div>"  + msg;
	// Write out new message
	document.getElementById("messages").innerHTML = msg;

}

function changeButtonState(name,state){
	htmlClass = this[name].htmlClass;
	let buttonList = document.getElementsByClassName(htmlClass); //get the list of practice buttons by class.
	// Iterate through the list of buttons and disable them.
		for (let i = 0; i < buttonList.length; i++){
			buttonList[i].disabled = state;
	 }
}

function buttonCoolDown(name){
	let countDown = this[name].time;
	let htmlId = this[name].htmlId;

		function coolDown(countDown,htmlId){
			// This formula is still wrong. NEEDS WORK
			let gradient = 100-(countDown/100 * 100);
			if (debug > 1) {
				console.log("gradient = " + gradient);
			}
			document.getElementById(htmlId).style.background = `linear-gradient(#222 ${gradient}%, #666 100%)`;
			countDown--;
			if (debug > 1) {
				console.log("countdown = " + countDown);
			}
			if (countDown > 0){
				setTimeout(coolDown,100,countDown,htmlId);
			}
			else {
				document.getElementById(htmlId).style.background = "";
				changeButtonState(name,false);
				earnTrust(name);
				// Check to see if anything new should be made visible
				checkVisibility(name);
			}

		}
			coolDown(countDown,htmlId);
	}

function addMoney(name){
	coin = coin + this[name].coinsEarned;
	document.getElementById("coins").innerHTML = coin;
}

function earnTrust(name){
	let type = this[name].type;
	let trustLevel = trust[type];
	trustLevel++;
	trust[type] = trustLevel;
	console.log(`Trust level for ${type} is ${trustLevel}`);
}

function checkVisibility(name){

	// create array of keys from visibility object
	let keys = [];
	for (let key in visibility) {
		if (visibility.hasOwnProperty(key)) keys.push(key);
	}

	// iterate over visibility object using the new keys array
	for (let i=0; i<keys.length; i++) {

		let myObj = keys[i]
		let type = this[keys[i]].type;
		let myObjVisibility = visibility[myObj];
		let htmlId = this[myObj].htmlId;

		if (debug == 1) {
			console.log("Visibility for " + myObj, myObjVisibility);
		}


		if (this[myObj].trustLevel <= trust[type]){
			console.log("You are trusted for " + myObj);
			visibility[myObj] = 1;
			document.getElementById(htmlId).classList.remove('hidden');
			//let myClass = document.getElementById(myObj).className;
			//let myNewClass = myClass.replace("hidden", "");
		}


	}
}

function earnCoin(job,action,htmlClass){
	let actionId = action;
	let name = job;

	if (debug == 1) {
		console.log(`job = ${job}, action = ${action}, htmlClass = ${htmlClass}`);
	}
	// get object

	//disable class
	changeButtonState(name,true);

	//cooldown button
	buttonCoolDown(name);

	//add message
	sendMessage(name);

	//add money
		addMoney(name);
		//check for tools
		//update UI $



}

function coolDownButton(id,coolCount){

	if (coolCount < 20) { //  Countdown for the cooldown

		let buttonList = document.getElementsByClassName("practiceButton") // get the list of practice buttons by class.
		// Iterate through the list of buttons and disable them.
		for (let i = 0; i < buttonList.length; i++){
			buttonList[i].disabled = true;
		}

		lightBgPercentage = coolCount/20*100;
		darkBgPercentage = 100 - lightBgPercentage;
		if (debug == 2) {
			console.log(`background percentage = ${lightBgPercentage}%`);
			console.log(`background percentage = ${darkBgPercentage}%`);
		}
		document.getElementById(id).style.background = `linear-gradient(#222 ${lightBgPercentage}%,#444)`;

		// Increment the cool down count
		coolCount++;

		setTimeout(coolDownButton,50,id,coolCount)
	}
	else { // reset everything after the cooldown.
		document.getElementById(id).disabled = false;
		document.getElementById(id).style.background = ""; // set the bg, including the hover, back to the original stylesheet attributes.

		// Enable buttons. //
		// get the list of practice buttons by class.
		let buttonList = document.getElementsByClassName("practiceButton")
		// Iterate through the list of buttons and enable them.
		for (let i = 0; i < buttonList.length; i++){
			buttonList[i].disabled = false;
			buttonList[i].style.hover = "color:blue";
		}
	}

}
