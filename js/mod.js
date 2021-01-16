let modInfo = {
	name: "Jelly Lift: TMT Edition",
	id: "jellymyass",
	author: "nobody",
	pointsName: "jellies",
	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	
	offlineLimit: 168,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.30",
	name: "Still no elevator uses (bruh).",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>v0.30</h3><br>
		- Three more floors were restored/added in<br/>
		- Even more achievements! (+15)<br/>
		- Fixed floor stats to display correctly<br/><br/>
	<h3>v0.20</h3><br>
		- Three floors were restored/added in<br/>
		- More achievements! (+11 and -1 to be exact)<br/>
		- Made volcano upgrades actually do something<br/>
		- Statistics now displays the floors you've unlocked instead<br/><br/>
	<h3>v0.10</h3><br>
		- Mod was made (in less than 2 days)`

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = player.ff.buyables[11].mul(layers.ff.effect()).add(player.wf.buyables[11].mul(layers.wf.effect())).add(player.vf.buyables[11].mul(layers.vf.effect())).add(player.gf2.buyables[11].mul(layers.gf2.effect())).add(player.wf2.buyables[11].mul(layers.wf2.effect())).add(player.tcf.buyables[11].mul(layers.tcf.effect())).add(player.ff2.buyables[11].mul(layers.ff2.effect())).add(player.pf.buyables[11].mul(layers.pf.effect()))
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal("e280000000"))
}



// Less important things beyond this point!

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}
