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

const debug = 0;

// Game Objects //


var coin = 0;

// skills //
var skill = { //skill index
	riding: 0,
	staff: 0
}
var ridingSkills = {
	skillLevel: 0,
	practiceMsg: "Practicing riding.",
}
var staffSkills = {
	skillLevel: 0,
	practiceMsg: "Practicing with the staff.",
}
// jobs //
var gatherWood = {
	coinsEarned: 1,
	difficulty: 1,
	time: 10
}
var runDeliveries = {
	coinsEarned: 2,
	difficulty: 1,
	time: 15
}
// tools //
var axe = {
	cost: 10,
	bonusCoins: 1,
	timeSaved: 3
}

if (debug == 1){
	console.log("Game Started");
}

// console.log()
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

function earnCoin(job,action){

	//disable class
	//cooldown button
	//add money
		//check for tools
		//update UI $
	//enable class



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
		if (debug == 1) {
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
