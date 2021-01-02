var layoutInfo = {
    startTab: "none",
	showTree: true,

    treeLayout: ""

    
}


// A "ghost" layer which offsets other layers in the tree
addNode("blank", {
    layerShown: "ghost",
}, 
)


addLayer("tree-tab", {
	startData() { return {                  // startData is a function that returns default data for a layer. 
        total: new Decimal(0),                     // You can add more variables here to add them to your layer.
        totalish: new Decimal(0),                     // You can add more variables here to add them to your layer.
		best: new Decimal(0),
		click: new Decimal(0),
		elevatorUses: new Decimal(0),
		floorButton: new Decimal(0),
		floorFactory: new Decimal(0),
		floorWell: new Decimal(0),
		floorVolcano: new Decimal(0),
		floorGarden: new Decimal(0),
		floorGate: new Decimal(0),
		floorWindmill: new Decimal(0)
    }},
	update(diff){
		player["tree-tab"].total = player["tree-tab"].total.add(getPointGen().mul(diff))
		player["tree-tab"].totalish = player["tree-tab"].totalish.add(getPointGen().mul(diff))
		player["tree-tab"].floorFactory = player["tree-tab"].floorFactory.add(player.ff.buyables[11].mul(layers.ff.effect()))
		player["tree-tab"].floorWell = player["tree-tab"].floorWell.add(player.wf.buyables[11].mul(layers.wf.effect()))
		player["tree-tab"].floorVolcano = player["tree-tab"].floorVolcano.add(player.vf.buyables[11].mul(layers.vf.effect()))
		player["tree-tab"].floorGate = player["tree-tab"].floorGate.add(player.gf2.buyables[11].mul(layers.gf2.effect()))
		player["tree-tab"].floorWindmill = player["tree-tab"].floorWindmill.add(player.wf2.buyables[11].mul(layers.wf2.effect()))
		if(player.points.gt(player["tree-tab"].best)) player["tree-tab"].best = player.points
	},
        tabFormat: {
            "Upgrades": { 
                buttonStyle() {return  {'background-color': 'gray', 'color': 'white', 'border-color': 'gray'}},
                shouldNotify: false,
                content:
                    [["display-text",
                        function() {return "UPGRADES"},
                        {"color": "white", "font-size": "64px", "font-family": "Comic Sans MS"}],
						"h-line", 'blank', 'blank', 'blank', 'blank', "upgrades"],
            },
			"Statistics": {
                buttonStyle() {return  {'background-color': 'gray', 'color': 'white', 'border-color': 'gray'}},
                content:
                    [["display-text",
                        function() {return "GENERAL:"},
                        {"color": "white", "font-size": "64px", "font-family": "Comic Sans MS"}],
					'blank', 'blank', 'blank',
					["display-text",
                        function() {return "Jelly owned: "+format(player.points)+"<br/>Jelly created (this game): "+format(player["tree-tab"].totalish)+"<br/>Jelly created (all time): "+format(player["tree-tab"].total)+"<br/>Max jelly had: "+format(player["tree-tab"].best)+"<br/>Jelly per second: "+format(getPointGen())+"<br/>Button clicks: "+format(player["tree-tab"].click)+"<br/>Date started: "+new Date(player.time - player.timePlayed * 1000).toLocaleDateString("en-US")+".<br/>Current version: 0.20 (More Accurate Update)<br/>Elevator uses: "+format(player["tree-tab"].elevatorUses)},
                        {"color": "white", "font-size": "32px", "font-family": "Comic Sans MS"}],
					'blank', 'blank', 'blank',
					["display-text",
                        function() {return "FLOOR STATS:"},
                        {"color": "white", "font-size": "64px", "font-family": "Comic Sans MS"}],
					'blank', 'blank', 'blank',
					["display-text",
                        function() {return "Jelly created by button: "+format(player["tree-tab"].floorButton)},
                        {"color": "white", "font-size": "32px", "font-family": "Comic Sans MS"}],
					["display-text",
                        function() {return player.ff.buyables[11].gte(1) ? "Jelly created by factory: "+format(player["tree-tab"].floorFactory) : ""},
                        {"color": "white", "font-size": "32px", "font-family": "Comic Sans MS"}],
					["display-text",
                        function() {return player.wf.buyables[11].gte(1) ? "Jelly created by well: "+format(player["tree-tab"].floorWell) : ""},
                        {"color": "white", "font-size": "32px", "font-family": "Comic Sans MS"}],
					["display-text",
                        function() {return player.vf.buyables[11].gte(1) ? "Jelly created by volcano: "+format(player["tree-tab"].floorVolcano) : ""},
                        {"color": "white", "font-size": "32px", "font-family": "Comic Sans MS"}],
					["display-text",
                        function() {return player.gf.buyables[11].gte(1) ? "Jelly created by garden: "+format(player["tree-tab"].floorGarden) : ""},
                        {"color": "white", "font-size": "32px", "font-family": "Comic Sans MS"}],
					["display-text",
                        function() {return player.gf2.buyables[11].gte(1) ? "Jelly created by gate: "+format(player["tree-tab"].floorGate) : ""},
                        {"color": "white", "font-size": "32px", "font-family": "Comic Sans MS"}],
					["display-text",
                        function() {return player.wf2.buyables[11].gte(1) ? "Jelly created by windmill: "+format(player["tree-tab"].floorWindmill) : ""},
                        {"color": "white", "font-size": "32px", "font-family": "Comic Sans MS"}],
					'blank', 'blank', 'blank',
					["display-text",
                        function() {return "CREDITS:"},
                        {"color": "white", "font-size": "64px", "font-family": "Comic Sans MS"}],
					'blank', 'blank', 'blank',
					["display-text",
                        function() {return "Jacorb and Aarex for making Prestige Tree (and papyrus for le idea)<br/>Acamaeda for making The Modding Tree<br/>[REDACTED] for making Jelly Lift<br/>and everyone else for playing this mod."},
                        {"color": "white", "font-size": "32px", "font-family": "Comic Sans MS"}]],
            },
			"Lobby": { 
                buttonStyle() {return  {'background-color': 'gray', 'color': 'white', 'border-color': 'gray'}},
                content:
					[["display-text",
                        function() {return "Jelly Lift:"},
                        {"color": "white", "font-size": "60px", "font-family": "Comic Sans MS"}],
					["display-text",
                        function() {return "TMT Edition"},
                        {"color": "white", "font-size": "32px", "font-family": "Comic Sans MS"}],
						"blank", "blank", "blank",
					["display-text",
                        function() {return format(player.points) + "<br/>jellies"},
                        {"color": "white", "font-size": "32px", "font-family": "Comic Sans MS"}],
						"blank",
					["display-text",
                        function() {return "j/s: "+format(getPointGen())},
                        {"color": "white", "font-size": "32px", "font-family": "Comic Sans MS"}]],
            },
			"Achievements": {
                buttonStyle() {return  {'background-color': 'gray', 'color': 'white', 'border-color': 'gray'}},
                content:
                    [["display-text",
                        function() {return "ACHIEVEMENTS:   "+format(player["tree-tab"].achievements.length)+"/31 ("+format(new Decimal(player["tree-tab"].achievements.length).div(31).mul(100))+"%)"},
                        {"color": "white", "font-size": "35px", "font-family": "Comic Sans MS"}],
						"blank", "achievements"],
            },
			"Settings": {
                buttonStyle() {return  {'background-color': 'gray', 'color': 'white', 'border-color': 'gray'}},
                content:
                    ["options-tab"],
            },
        },
		upgrades: {
			rows: 5,
			cols: 6,
			11: {
				description: "Doubles the profits of factory",
				cost: new Decimal(1500),
				unlocked() {return player.ff.buyables[11].gte(1)},	
				canAfford() {return player.points.gte(this.cost)},
				pay() {return player.points = player.points.sub(1500)},
			},
			12: {
				description: "Doubles the profits of well",
				cost: new Decimal(5000),
				unlocked() {return player.wf.buyables[11].gte(1)},	
				canAfford() {return player.points.gte(this.cost)},
				pay() {return player.points = player.points.sub(5000)},
			},
			13: {
				description: "Doubles the profits of volcano",
				cost: new Decimal(200000),
				unlocked() {return player.vf.buyables[11].gte(1)},	
				canAfford() {return player.points.gte(this.cost)},
				pay() {return player.points = player.points.sub(200000)},
			},
			14: {
				description: "Doubles the profits of garden",
				cost: new Decimal(3000000),
				unlocked() {return player.gf.buyables[11].gte(1)},
				canAfford() {return player.points.gte(this.cost)},
				pay() {return player.points = player.points.sub(3000000)},
			},
			15: {
				description: "Doubles the profits of gate",
				cost: new Decimal(50000000),
				unlocked() {return player.gf2.buyables[11].gte(1)},
				canAfford() {return player.points.gte(this.cost)},
				pay() {return player.points = player.points.sub(50000000)},
			},
			16: {
				description: "Doubles the profits of windmill",
				cost: new Decimal(700000000),
				unlocked() {return player.wf2.buyables[11].gte(1)},	
				canAfford() {return player.points.gte(this.cost)},
				pay() {return player.points = player.points.sub(700000000)},
			},
			21: {
				description: "Doubles the profits of factory",
				cost: new Decimal(50000),
				unlocked() {return player.ff.buyables[11].gte(1)},	
				canAfford() {return player.points.gte(this.cost)},
				pay() {return player.points = player.points.sub(50000)},
			},
			22: {
				description: "Doubles the profits of well",
				cost: new Decimal(150000),
				unlocked() {return player.wf.buyables[11].gte(1)},	
				canAfford() {return player.points.gte(this.cost)},
				pay() {return player.points = player.points.sub(150000)},
			},
			23: {
				description: "Doubles the profits of volcano",
				cost: new Decimal(5000000),
				unlocked() {return player.vf.buyables[11].gte(1)},	
				canAfford() {return player.points.gte(this.cost)},
				pay() {return player.points = player.points.sub(5000000)},
			},
			24: {
				description: "Doubles the profits of garden",
				cost: new Decimal(55000000),
				unlocked() {return player.gf.buyables[11].gte(1)},	
				canAfford() {return player.points.gte(this.cost)},
				pay() {return player.points = player.points.sub(55000000)},
			},
			25: {
				description: "Doubles the profits of gate",
				cost: new Decimal(1100000000),
				unlocked() {return player.gf2.buyables[11].gte(1)},
				canAfford() {return player.points.gte(this.cost)},
				pay() {return player.points = player.points.sub(1100000000)},
			},
			26: {
				description: "Doubles the profits of windmill",
				cost: new Decimal(7000000000),
				unlocked() {return player.wf2.buyables[11].gte(1)},	
				canAfford() {return player.points.gte(this.cost)},
				pay() {return player.points = player.points.sub(7000000000)},
			},
			31: {
				description: "Doubles the profits of factory",
				cost: new Decimal(10000000),
				unlocked() {return player.ff.buyables[11].gte(1)},	
				canAfford() {return player.points.gte(this.cost)},
				pay() {return player.points = player.points.sub(10000000)},
			},
			32: {
				description: "Doubles the profits of well",
				cost: new Decimal(50000000),
				unlocked() {return player.wf.buyables[11].gte(1)},	
				canAfford() {return player.points.gte(this.cost)},
				pay() {return player.points = player.points.sub(50000000)},
			},
			33: {
				description: "Doubles the profits of volcano",
				cost: new Decimal(150000000),
				unlocked() {return player.vf.buyables[11].gte(1)},	
				canAfford() {return player.points.gte(this.cost)},
				pay() {return player.points = player.points.sub(150000000)},
			},
			34: {
				description: "Doubles the profits of garden",
				cost: new Decimal(333000000),
				unlocked() {return player.gf.buyables[11].gte(1)},	
				canAfford() {return player.points.gte(this.cost)},
				pay() {return player.points = player.points.sub(333000000)},
			},
			35: {
				description: "Doubles the profits of gate",
				cost: new Decimal(15000000000),
				unlocked() {return player.gf2.buyables[11].gte(1)},
				canAfford() {return player.points.gte(this.cost)},
				pay() {return player.points = player.points.sub(15000000000)},
			},
			36: {
				description: "Doubles the profits of windmill",
				cost: new Decimal(30000000000),
				unlocked() {return player.wf2.buyables[11].gte(1)},	
				canAfford() {return player.points.gte(this.cost)},
				pay() {return player.points = player.points.sub(30000000000)},
			},
			41: {
				description: "Triples the profits of factory",
				cost: new Decimal(11000000000),
				unlocked() {return player.ff.buyables[11].gte(1)},	
				canAfford() {return player.points.gte(this.cost)},
				pay() {return player.points = player.points.sub(11000000000)},
			},
			42: {
				description: "Triples the profits of well",
				cost: new Decimal(70000000000),
				unlocked() {return player.wf.buyables[11].gte(1)},	
				canAfford() {return player.points.gte(this.cost)},
				pay() {return player.points = player.points.sub(70000000000)},
			},
			43: {
				description: "Triples the profits of volcano",
				cost: new Decimal(470000000000),
				unlocked() {return player.vf.buyables[11].gte(1)},	
				canAfford() {return player.points.gte(this.cost)},
				pay() {return player.points = player.points.sub(470000000000)},
			},
			44: {
				description: "Triples the profits of garden",
				cost: new Decimal(1300000000000),
				unlocked() {return player.gf.buyables[11].gte(1)},	
				canAfford() {return player.points.gte(this.cost)},
				pay() {return player.points = player.points.sub(1300000000000)},
			},
			45: {
				description: "Triple the profits of gate",
				cost: new Decimal(4200000000000),
				unlocked() {return player.gf2.buyables[11].gte(1)},
				canAfford() {return player.points.gte(this.cost)},
				pay() {return player.points = player.points.sub(4200000000000)},
			},
			46: {
				description: "Triples the profits of windmill",
				cost: new Decimal(20000000000000),
				unlocked() {return player.wf2.buyables[11].gte(1)},	
				canAfford() {return player.points.gte(this.cost)},
				pay() {return player.points = player.points.sub(20000000000000)},
			},
			51: {
				description: "7x the profits of factory",
				cost: new Decimal(100000000000000),
				unlocked() {return player.ff.buyables[11].gte(1)},	
				canAfford() {return player.points.gte(this.cost)},
				pay() {return player.points = player.points.sub(100000000000000)},
			},
			52: {
				description: "7x the profits of well",
				cost: new Decimal(1000000000000000),
				unlocked() {return player.wf.buyables[11].gte(1)},	
				canAfford() {return player.points.gte(this.cost)},
				pay() {return player.points = player.points.sub(1000000000000000)},
			},
			53: {
				description: "7x the profits of volcano",
				cost: new Decimal(10000000000000000),
				unlocked() {return player.vf.buyables[11].gte(1)},	
				canAfford() {return player.points.gte(this.cost)},
				pay() {return player.points = player.points.sub(10000000000000000)},
			},
			54: {
				description: "7x the profits of garden",
				cost: new Decimal(100000000000000000),
				unlocked() {return player.gf.buyables[11].gte(1)},	
				canAfford() {return player.points.gte(this.cost)},
				pay() {return player.points = player.points.sub(100000000000000000)},
			},
			55: {
				description: "7x the profits of gate",
				cost: new Decimal(1000000000000000000),
				unlocked() {return player.gf2.buyables[11].gte(1)},
				canAfford() {return player.points.gte(this.cost)},
				pay() {return player.points = player.points.sub(1000000000000000000)},
			},
			56: {
				description: "7x the profits of windmill",
				cost: new Decimal(10000000000000000000),
				unlocked() {return player.wf2.buyables[11].gte(1)},	
				canAfford() {return player.points.gte(this.cost)},
				pay() {return player.points = player.points.sub(10000000000000000000)},
			},
		},
		achievements: {
            rows: 8,
            cols: 7,
            11: {
                name: "The jelly has awakened. Again",
                done() {return player["tree-tab"].total.gte(1)}, // This one is a freebie
                tooltip: "Make 1 jelly",
            },
            12: {
                name: "Jellying it up",
                done() {return player["tree-tab"].total.gte(100)}, // This one is a freebie
                tooltip: "Make 100 jelly",
            },
            13: {
                name: "Starting to rise",
                done() {return player["tree-tab"].total.gte(1000)}, // This one is a freebie
                tooltip: "Make 1,000 jelly", // Showed when the achievement is completed
            },
            14: {
                name: "Too much jelly",
                done() {return player["tree-tab"].total.gte(10000)}, // This one is a freebie
                tooltip: "Make 10,000 jelly", // Showed when the achievement is completed
            },
            15: {
                name: "No, Patrick, there's no Antimatter Dimensions reference",
                done() {return player["tree-tab"].total.gte(1000000)}, // This one is a freebie
                tooltip: "Make 1,000,000 jelly", // Showed when the achievement is completed
            },
            16: {
                name: "The more the jellier!",
                done() {return player["tree-tab"].total.gte(1000000000)}, // This one is a freebie
                tooltip: "Make 1e9 jelly", // Showed when the achievement is completed
            },
			31: {
                name: "First steps",
                done() {return getPointGen().gte(100)},
                tooltip: "Make 100 j/s", // Showed when the achievement is completed
            },
			32: {
                name: "It's not enough",
                done() {return getPointGen().gte(10000)},
                tooltip: "Make 10,000 j/s", // Showed when the achievement is completed
            },
			33: {
                name: "We're getting there",
                done() {return getPointGen().gte(1000000)},
                tooltip: "Make 1,000,000 j/s", // Showed when the achievement is completed
            },
			34: {
                name: "Jelly pooper",
                done() {return getPointGen().gte(100000000)},
                tooltip: "Make 100,000,000 j/s", // Showed when the achievement is completed
            },
			35: {
                name: "Question mark?",
                done() {return getPointGen().gte(1000000000)},
                tooltip: "Make 1e9 j/s", // Showed when the achievement is completed
            },
			36: {
                name: "Magnitude power",
                done() {return getPointGen().gte(1000000000000)},
                tooltip: "Make 1e12 j/s", // Showed when the achievement is completed
            }, 		
			51: {
                name: "Starting manufacturing",
                done() {return player.ff.buyables[11].gte(1)},
                tooltip: "Unlock 2nd floor", // Showed when the achievement is completed
            },
			52: {
                name: "Digging deeper",
                done() {return player.wf.buyables[11].gte(1)},
                tooltip: "Unlock 3rd floor", // Showed when the achievement is completed
            },
			53: {
                name: "From the depths of Earth",
                done() {return player.vf.buyables[11].gte(1)},
                tooltip: "Unlock 4th floor", // Showed when the achievement is completed
            },
			54: {
                name: "But there's only one tree...",
                done() {return player.gf.buyables[11].gte(1)},
                tooltip: "Unlock 4th floor", // Showed when the achievement is completed
            },
			55: {
                name: "bababooey",
                done() {return player.gf2.buyables[11].gte(1)},
                tooltip: "Unlock 5th floor", // Showed when the achievement is completed
            },
			56: {
                name: "Using the wind",
                done() {return player.wf2.buyables[11].gte(1)},
                tooltip: "Unlock 6th floor", // Showed when the achievement is completed
            },
			61: {
                name: "How to jelly 101",
                done() {return player.ff.buyables[11].gte(25)},
                tooltip() {return player.ff.buyables[11].gte(1) ? "Upgrade factory 25 times" : "Upgrade ███████ 25 times"}, // Showed when the achievement is completed
            },
			62: {
                name: "Wait, it all was jelly?",
                done() {return player.wf.buyables[11].gte(25)},
                tooltip() {return player.wf.buyables[11].gte(1) ? "Upgrade well 25 times" : "Upgrade ████ 25 times"}, // Showed when the achievement is completed
            },
			63: {
                name: "Magma = Jelly?",
                done() {return player.vf.buyables[11].gte(25)},
                tooltip() {return player.vf.buyables[11].gte(1) ? "Upgrade volcano 25 times" : "Upgrade ███████ 25 times"}, // Showed when the achievement is completed
            },
			64: {
                name: "Speeding it up",
                done() {return player.gf.buyables[11].gte(5)},
                tooltip() {return player.gf.buyables[11].gte(1) ? "Upgrade garden 5 times" : "Upgrade ██████ 5 times"}, // Showed when the achievement is completed
            },
			65: {
                name: "bababooey?",
                done() {return player.gf2.buyables[11].gte(25)},
                tooltip() {return player.gf2.buyables[11].gte(1) ? "Upgrade gate 25 times" : "Upgrade ████ 25 times"}, // Showed when the achievement is completed
            },
			66: {
                name: "Fly, jelly, fly",
                done() {return player.wf2.buyables[11].gte(25)},
                tooltip() {return player.wf2.buyables[11].gte(1) ? "Upgrade windmill 25 times" : "Upgrade ████████ 25 times"}, // Showed when the achievement is completed
            },
            71: {
                name: "Mass jelly production",
                done() {return player.ff.buyables[11].gte(100)},
                tooltip() {return player.ff.buyables[11].gte(1) ? "Upgrade factory 100 times" : "Upgrade ███████ 100 times"}, // Showed when the achievement is completed Mass jelly production
            },
            72: {
                name: "It is really magical!",
                done() {return player.wf.buyables[11].gte(100)},
                tooltip() {return player.wf.buyables[11].gte(1) ? "Upgrade well 100 times" : "Upgrade ████ 100 times"}, // Showed when the achievement is completed Mass jelly production
            },
            73: {
                name: "What's going on down there?",
                done() {return player.vf.buyables[11].gte(100)},
                tooltip() {return player.vf.buyables[11].gte(1) ? "Upgrade volcano 100 times" : "Upgrade ███████ 100 times"}, // Showed when the achievement is completed Mass jelly production
            },
			74: {
                name: "1M jelly?!",
                done() {return player.gf.buyables[11].gte(10)},
                tooltip() {return player.gf.buyables[11].gte(1) ? "Upgrade garden 10 times" : "Upgrade ██████ 10 times"}, // Showed when the achievement is completed
            },
            75: {
                name: "The spell is working",
                done() {return player.gf2.buyables[11].gte(100)},
                tooltip() {return player.gf2.buyables[11].gte(1) ? "Upgrade gate 100 times" : "Upgrade ████ 100 times"}, // Showed when the achievement is completed Mass jelly production
            },
			76: {
                name: "Green way to produce jelly!",
                done() {return player.wf2.buyables[11].gte(100)},
                tooltip() {return player.wf2.buyables[11].gte(1) ? "Upgrade windmill 100 times" : "Upgrade ████████ 100 times"}, // Showed when the achievement is completed
            },
			84: {
                name: "Lazy mod activated",
                done() {return player.gf.buyables[21].eq(1)},
                tooltip() {return player.gf.buyables[11].gte(1) ? "Automate garden" : "Automate ██████"}, // Showed when the achievement is completed
            },
        },
})

addLayer("bf", {
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked: true,                     // You can add more variables here to add them to your layer.
    }},
	symbol: "BF",
    color: "gray",                       // The color for this layer, which affects many elements.
    row: "side",                                 // The row this layer is on (0 is the first row).
	position: 0,
	tooltip: "Button floor",
	tabFormat: ["blank", "blank",
				["display-text", function() {return format(player.points)+"<br/>jellies"},
                {"color": "white", "font-size": "32px", "font-family": "Comic Sans MS"}],
				"blank", "blank",
				["display-text", function() {return player.bf.buyables[31] == 1 ? "Jelly per click: 5.00" : "Jelly per click: 1.00"},
                {"color": "white", "font-size": "32px", "font-family": "Comic Sans MS"}],
				"blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", 
				["buyable", 11], ["buyable", 21], "blank", "blank", ["buyable", 31]
    ],

    buyables: {
		rows: 3,
		cols: 1,
		11: {
			cost() { return new Decimal(0) },
			canAfford() { return true },
			buy() {
				player.points = player.points.add(1)
				player["tree-tab"].floorButton = player["tree-tab"].floorButton.add(1)
				player["tree-tab"].click = player["tree-tab"].click.add(1)
				player["tree-tab"].total = player["tree-tab"].total.add(1)
				player["tree-tab"].totalish = player["tree-tab"].totalish.add(1)
				if(player.bf.buyables[31].eq(1)) {
					player.points = player.points.add(4)
					player["tree-tab"].floorButton = player["tree-tab"].floorButton.add(4)
					player["tree-tab"].total = player["tree-tab"].total.add(4)
					player["tree-tab"].totalish = player["tree-tab"].totalish.add(4)
				}
			},
            style() { if (player[this.layer].unlocked) return {
            'height': '57px',
            'width': '105px',
			'background-color': '#F90136'
	            }
                },
		},
		21: {
			cost() { return new Decimal(0) },
			canAfford() { return false },
            style() { if (player[this.layer].unlocked) return {
            'height': '54px',
            'width': '166px',
			'background-color': '#F7D6E8'
	            }
                },
		},
		31: {
			cost() { return new Decimal(5000) },
			display() { return "Upgrade button (5,000J)" },
			canAfford() { return player.points.gte(this.cost()) },
			buy() {
				player.points = player.points.sub(this.cost())
				player.bf.buyables[31] = player.bf.buyables[31].add(1)
			},
			unlocked() { return player.bf.buyables[31] == 0 },
            style() { if (player[this.layer].unlocked) return {
            'height': '37px',
            'width': '373px',
			'background-color': 'gray',
			'font-size': '20px'
	            }
                },
		},
	},

    layerShown() { return player.tab == "none" && player.subtabs["tree-tab"]["mainTabs"] == "Lobby"}            // Returns a bool for if this layer's node should be visible in the tree.
})

addLayer("ff", {
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked: true,                     // You can add more variables here to add them to your layer.
    }},
	symbol() {if(player.ff.buyables[11].gte(1)) return "FF"
	          else return "?"},
    color() {if(player.ff.buyables[11].gte(1)) return "gray"
	         else return "#4BDC13"},                       // The color for this layer, which affects many elements.
    row: "side",                                 // The row this layer is on (0 is the first row).
	position: 1,
	tooltip() { if(player.ff.buyables[11] == 0) return "Locked (20.00J)" 
	            else return	"Factory floor" },
	effect() {let eff = new Decimal(1)
	          if(hasUpgrade("tree-tab", 11)) eff = eff.mul(2)
			  if(hasUpgrade("tree-tab", 21)) eff = eff.mul(2)
			  if(hasUpgrade("tree-tab", 31)) eff = eff.mul(2)
			  if(hasUpgrade("tree-tab", 41)) eff = eff.mul(3)
			  if(hasUpgrade("tree-tab", 51)) eff = eff.mul(7)
			  return eff},
	tabFormat: ["blank", "blank",
				["display-text", function() {return format(player.points)+"<br/>jellies"},
                {"color": "white", "font-size": "32px", "font-family": "Comic Sans MS"}],
				"blank", "blank",
				["display-text", function() {return "Factory level: "+format(player.ff.buyables[11])+"<br/>j/s by factory: "+format(player.ff.buyables[11].mul(layers.ff.effect()))+"<br/>base j/s: "+format(layers.ff.effect())},
                {"color": "white", "font-size": "32px", "font-family": "Comic Sans MS"}],
				"blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", 
				["buyable", 11]
    ],

    buyables: {
		rows: 1,
		cols: 1,
		11: {
			cost() { if(player.ff.buyables[11] == 0) return new Decimal(20)
                      else return new Decimal(50).mul(new Decimal(1.1).pow(player.ff.buyables[11].sub(1)))},
			display() { if(player.ff.buyables[11] == 0) return "Unlock factory (20.00J)"
	                    else return "Upgrade button ("+format(layers.ff.buyables[11].cost())+"J)" },
			canAfford() { return player.points.gte(this.cost()) },
			buy() {
				player.points = player.points.sub(this.cost())
				player.ff.buyables[11] = player.ff.buyables[11].add(1)
			},
            style() { if (player[this.layer].unlocked) return {
            'height': '37px',
            'width': '373px',
			'background-color': 'gray',
			'font-size': '20px'
	            }
                },
		},
	},

    layerShown() { return player.tab == "none" && player.subtabs["tree-tab"]["mainTabs"] == "Lobby" && (player.points.gte(20) || player.ff.buyables[11].gte(1)) }            // Returns a bool for if this layer's node should be visible in the tree.
})

addLayer("wf", {
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked: true,                     // You can add more variables here to add them to your layer.
    }},
	symbol() {if(player.wf.buyables[11].gte(1)) return "WF"
	          else return "?"},
    color() {if(player.wf.buyables[11].gte(1)) return "gray"
	         else return "#4BDC13"},                       // The color for this layer, which affects many elements.
    row: "side",                                 // The row this layer is on (0 is the first row).
	position: 2,
	tooltip() { if(player.wf.buyables[11] == 0) return "Locked (400.00J)"
	            else return	"Well floor" },
	effect() {let eff = new Decimal(10)
	          if(hasUpgrade("tree-tab", 12)) eff = eff.mul(2)
			  if(hasUpgrade("tree-tab", 22)) eff = eff.mul(2)
			  if(hasUpgrade("tree-tab", 32)) eff = eff.mul(2)
			  if(hasUpgrade("tree-tab", 42)) eff = eff.mul(3)
			  if(hasUpgrade("tree-tab", 52)) eff = eff.mul(7)
			  return eff},
	tabFormat: ["blank", "blank",
				["display-text", function() {return format(player.points)+"<br/>jellies"},
                {"color": "white", "font-size": "32px", "font-family": "Comic Sans MS"}],
				"blank", "blank",
				["display-text", function() {return "Factory level: "+format(player.wf.buyables[11])+"<br/>j/s by factory: "+format(player.wf.buyables[11].mul(layers.wf.effect()))+"<br/>base j/s: "+format(layers.wf.effect())},
                {"color": "white", "font-size": "32px", "font-family": "Comic Sans MS"}],
				"blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", 
				["buyable", 11]
    ],

    buyables: {
		rows: 1,
		cols: 1,
		11: {
			cost() { if(player.wf.buyables[11] == 0) return new Decimal(400)
                      else return new Decimal(700).mul(new Decimal(1.1).pow(player.wf.buyables[11].sub(1)))},
			display() { if(player.wf.buyables[11] == 0) return "Unlock well (400.00J)"
	                    else return "Upgrade button ("+format(layers.wf.buyables[11].cost())+"J)" },
			canAfford() { return player.points.gte(this.cost()) },
			buy() {
				player.points = player.points.sub(this.cost())
				player.wf.buyables[11] = player.wf.buyables[11].add(1)
			},
            style() { if (player[this.layer].unlocked) return {
            'height': '37px',
            'width': '373px',
			'background-color': 'gray',
			'font-size': '20px'
	            }
                },
		},
	},

    layerShown() { return player.tab == "none" && player.subtabs["tree-tab"]["mainTabs"] == "Lobby" && (player.points.gte(400) || player.wf.buyables[11].gte(1)) }            // Returns a bool for if this layer's node should be visible in the tree.
})

addLayer("vf", {
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked: true,                     // You can add more variables here to add them to your layer.
    }},
	symbol() {if(player.vf.buyables[11].gte(1)) return "VF"
	          else return "?"},
    color() {if(player.vf.buyables[11].gte(1)) return "gray"
	         else return "#4BDC13"},                       // The color for this layer, which affects many elements.
    row: "side",                                 // The row this layer is on (0 is the first row).
	position: 3,
	tooltip() { if(player.vf.buyables[11] == 0) return "Locked (25,000J)"
	            else return	"Volcano floor" },
	effect() {let eff = new Decimal(70)
		      if(hasUpgrade("tree-tab", 13)) eff = eff.mul(2)
			  if(hasUpgrade("tree-tab", 23)) eff = eff.mul(2)
			  if(hasUpgrade("tree-tab", 33)) eff = eff.mul(2)
			  if(hasUpgrade("tree-tab", 43)) eff = eff.mul(3)
			  if(hasUpgrade("tree-tab", 53)) eff = eff.mul(7)
			  return eff},
	tabFormat: ["blank", "blank",
				["display-text", function() {return format(player.points)+"<br/>jellies"},
                {"color": "white", "font-size": "32px", "font-family": "Comic Sans MS"}],
				"blank", "blank",
				["display-text", function() {return "Factory level: "+format(player.vf.buyables[11])+"<br/>j/s by factory: "+format(player.vf.buyables[11].mul(layers.vf.effect()))+"<br/>base j/s: "+format(layers.vf.effect())},
                {"color": "white", "font-size": "32px", "font-family": "Comic Sans MS"}],
				"blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", 
				["buyable", 11]
    ],

    buyables: {
		rows: 1,
		cols: 1,
		11: {
			cost() { if(player.vf.buyables[11] == 0) return new Decimal(25000)
                      else return new Decimal(30000).mul(new Decimal(1.1).pow(player.vf.buyables[11].sub(1)))},
			display() { if(player.vf.buyables[11] == 0) return "Unlock volcano (25,000J)"
	                    else return "Upgrade volcano ("+format(layers.vf.buyables[11].cost())+"J)" },
			canAfford() { return player.points.gte(this.cost()) },
			buy() {
				player.points = player.points.sub(this.cost())
				player.vf.buyables[11] = player.vf.buyables[11].add(1)
			},
            style() { if (player[this.layer].unlocked) return {
            'height': '37px',
            'width': '373px',
			'background-color': 'gray',
			'font-size': '20px'
	            }
                },
		},
	},

    layerShown() { return player.tab == "none" && player.subtabs["tree-tab"]["mainTabs"] == "Lobby" && (player.points.gte(25000) || player.vf.buyables[11].gte(1)) }            // Returns a bool for if this layer's node should be visible in the tree.
})

addLayer("gf", {
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked: true,                     // You can add more variables here to add them to your layer.
		timeInterval: new Decimal(0),
		box: new Decimal(0)
    }},
	update(diff) {if(player.gf.buyables[11].gte(1)) player.gf.timeInterval = player.gf.timeInterval.add(new Decimal(diff).mul(player.gf.buyables[11]))
	          if(player.gf.timeInterval.gte(10)) {player.gf.timeInterval = new Decimal(0)
			                                      player.gf.box = player.gf.box.add(1).min(new Decimal(0.7).mul(player.gf.buyables[11])).round()
												  if(player.gf.buyables[21].gte(1) && player.gf.box.gte(1)) {player.points = player.points.add(layers.gf.effect())
																											 player["tree-tab"].floorGarden = player["tree-tab"].floorGarden.add(layers.gf.effect())
			                                                                                                 player.gf.box = player.gf.box.sub(1)}}
	},
	symbol() {if(player.gf.buyables[11].gte(1)) return "GF"
	          else return "?"},
    color() {if(player.gf.buyables[11].gte(1)) return "gray"
	         else return "#4BDC13"},                       // The color for this layer, which affects many elements.
    row: "side",                                 // The row this layer is on (0 is the first row).
	position: 4,
	tooltip() { if(player.gf.buyables[11] == 0) return "Locked (700,000J)"
	            else return	"Garden floor" },
	effect() {let eff = new Decimal(5000)
		      if(hasUpgrade("tree-tab", 14)) eff = eff.mul(2)
			  if(hasUpgrade("tree-tab", 24)) eff = eff.mul(2)
			  if(hasUpgrade("tree-tab", 34)) eff = eff.mul(2)
			  if(hasUpgrade("tree-tab", 44)) eff = eff.mul(3)
			  if(hasUpgrade("tree-tab", 54)) eff = eff.mul(7)
			  return eff},
	tabFormat: ["blank", "blank",
				["display-text", function() {return format(player.points)+"<br/>jellies"},
                {"color": "white", "font-size": "32px", "font-family": "Comic Sans MS"}],
				"blank", "blank",
				["display-text", function() {return player.gf.buyables[11].eq(10) ? "Garden level: Automatic <br/>Time interval: 1<br/>Jellies per box: "+format(layers.gf.effect()) : player.gf.buyables[11].gte(1) ? "Garden level: "+format(player.gf.buyables[11])+"<br/>Time interval: "+format(new Decimal(10).div(player.gf.buyables[11]))+"<br/>Jellies per box: "+format(layers.gf.effect()) : "Garden level: 0<br/>Time interval: N/A<br/>Jellies per box: "+format(layers.gf.effect())},
                {"color": "white", "font-size": "32px", "font-family": "Comic Sans MS"}],
				"blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", 
				"clickables", "blank", "blank", ["buyable", 11], ["buyable", 21]
    ],

    clickables: {
        rows: 1,
        cols: 1,
        11: {
			title() {return "Amount of boxes: "+formatWhole(player.gf.box)},
            unlocked() { return player[this.layer].unlocked }, 
            canClick() {
                return player.gf.box.gte(1)},
            onClick() { 
                player.points = player.points.add(layers.gf.effect())
				player["tree-tab"].floorGarden = player["tree-tab"].floorGarden.add(layers.gf.effect())
				player.gf.box = player.gf.box.sub(1)
                },
            },
            style() {
                return {
				'height': '500px',
				'width': '64px',
				'background-color': 'white'}
            }
    },

    buyables: {
		rows: 2,
		cols: 1,
		11: {
			cost() { if(player.gf.buyables[11] == 0) return new Decimal(700000)
                      else return new Decimal(200000).mul(new Decimal(1.1).pow(player.gf.buyables[11].sub(1)))},
			display() { if(player.gf.buyables[11] == 0) return "Unlock garden (700,000J)"
	                    else if(player.gf.buyables[11].lt(10)) return "Upgrade garden ("+format(layers.gf.buyables[11].cost())+"J)"
						else return "Maxed!"},
			canAfford() { return player.points.gte(this.cost()) && player.gf.buyables[11].lt(10) },
			buy() {
				player.points = player.points.sub(this.cost())
				player.gf.buyables[11] = player.gf.buyables[11].add(1)
			},
			unlocked() {return player.gf.buyables[11].lt(10)},
            style() { if (player[this.layer].unlocked) return {
            'height': '37px',
            'width': '373px',
			'background-color': 'gray',
			'font-size': '20px',
	            }
                },
		},
		21: {
			cost() {return new Decimal(1000000)},
			display: "Make Automatic (1,000,000J)",
			canAfford() { return player.points.gte(this.cost()) },
			buy() {
				player.points = player.points.sub(this.cost())
				player.gf.buyables[21] = player.gf.buyables[21].add(1)
			},
			unlocked() {return player.gf.buyables[11].eq(10) && !player.gf.buyables[21].eq(1)},
            style() { if (player[this.layer].unlocked) return {
            'height': '37px',
            'width': '373px',
			'background-color': 'gray',
			'font-size': '20px'
	            }
                },
		},
	},

    layerShown() { return player.tab == "none" && player.subtabs["tree-tab"]["mainTabs"] == "Lobby" && (player.points.gte(700000) || player.gf.buyables[11].gte(1)) }            // Returns a bool for if this layer's node should be visible in the tree.
})

addLayer("gf2", {
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked: true,                     // You can add more variables here to add them to your layer.
    }},
	symbol() {if(player.gf2.buyables[11].gte(1)) return "GF"
	          else return "?"},
    color() {if(player.gf2.buyables[11].gte(1)) return "gray"
	         else return "#4BDC13"},                       // The color for this layer, which affects many elements.
    row: "side",                                 // The row this layer is on (0 is the first row).
	position: 5,
	tooltip() { if(player.gf2.buyables[11] == 0) return "Locked (15,000,000J)"
	            else return	"Gate floor" },
	effect() {let eff = new Decimal(25000)
		      if(hasUpgrade("tree-tab", 15)) eff = eff.mul(2)
			  if(hasUpgrade("tree-tab", 25)) eff = eff.mul(2)
			  if(hasUpgrade("tree-tab", 35)) eff = eff.mul(2)
			  if(hasUpgrade("tree-tab", 45)) eff = eff.mul(3)
			  if(hasUpgrade("tree-tab", 55)) eff = eff.mul(7)
			  return eff},
	tabFormat: ["blank", "blank",
				["display-text", function() {return format(player.points)+"<br/>jellies"},
                {"color": "white", "font-size": "32px", "font-family": "Comic Sans MS"}],
				"blank", "blank",
				["display-text", function() {return "Factory level: "+format(player.gf2.buyables[11])+"<br/>j/s by gate: "+format(player.gf2.buyables[11].mul(layers.gf2.effect()))+"<br/>base j/s: "+format(layers.gf2.effect())},
                {"color": "white", "font-size": "32px", "font-family": "Comic Sans MS"}],
				"blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", 
				["buyable", 11]
    ],

    buyables: {
		rows: 1,
		cols: 1,
		11: {
			cost() {if(player.gf2.buyables[11] == 0) return new Decimal(15000000)
                      else return new Decimal(17000000).mul(new Decimal(1.1).pow(player.gf2.buyables[11].sub(1)))},
			display() { if(player.gf2.buyables[11] == 0) return "Unlock gate (15,000,000J)"
	                    else return "Upgrade gate ("+format(layers.gf2.buyables[11].cost())+"J)" },
			canAfford() { return player.points.gte(this.cost()) },
			buy() {
				player.points = player.points.sub(this.cost())
				player.gf2.buyables[11] = player.gf2.buyables[11].add(1)
			},
            style() { if (player[this.layer].unlocked) return {
            'height': '37px',
            'width': '373px',
			'background-color': 'gray',
			'font-size': '20px'
	            }
                },
		},
	},

    layerShown() { return player.tab == "none" && player.subtabs["tree-tab"]["mainTabs"] == "Lobby" && (player.points.gte(15000000) || player.gf2.buyables[11].gte(1)) }            // Returns a bool for if this layer's node should be visible in the tree.
})

addLayer("wf2", {
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked: true,                     // You can add more variables here to add them to your layer.
    }},
	symbol() {if(player.wf2.buyables[11].gte(1)) return "WF"
	          else return "?"},
    color() {if(player.wf2.buyables[11].gte(1)) return "gray"
	         else return "#4BDC13"},                       // The color for this layer, which affects many elements.
    row: "side",                                 // The row this layer is on (0 is the first row).
	position: 6,
	tooltip() { if(player.wf2.buyables[11] == 0) return "Locked (175,000,000J)"
	            else return	"Windmill floor" },
	effect() {let eff = new Decimal(150000)
		      if(hasUpgrade("tree-tab", 16)) eff = eff.mul(2)
			  if(hasUpgrade("tree-tab", 26)) eff = eff.mul(2)
			  if(hasUpgrade("tree-tab", 36)) eff = eff.mul(2)
			  if(hasUpgrade("tree-tab", 46)) eff = eff.mul(3)
			  if(hasUpgrade("tree-tab", 56)) eff = eff.mul(7)
			  return eff},
	tabFormat: ["blank", "blank",
				["display-text", function() {return format(player.points)+"<br/>jellies"},
                {"color": "white", "font-size": "32px", "font-family": "Comic Sans MS"}],
				"blank", "blank",
				["display-text", function() {return "Windmill level: "+format(player.wf2.buyables[11])+"<br/>j/s by windmill: "+format(player.wf2.buyables[11].mul(layers.wf2.effect()))+"<br/>base j/s: "+format(layers.wf2.effect())},
                {"color": "white", "font-size": "32px", "font-family": "Comic Sans MS"}],
				"blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", "blank", 
				["buyable", 11]
    ],

    buyables: {
		rows: 1,
		cols: 1,
		11: {
			cost() { if(player.wf2.buyables[11] == 0) return new Decimal(175000000)
                      else return new Decimal(195000000).mul(new Decimal(1.1).pow(player.wf2.buyables[11].sub(1)))},
			display() { if(player.wf2.buyables[11] == 0) return "Unlock windmill (175,000,000J)"
	                    else return "Upgrade windmill ("+format(layers.wf2.buyables[11].cost())+"J)" },
			canAfford() { return player.points.gte(this.cost()) },
			buy() {
				player.points = player.points.sub(this.cost())
				player.wf2.buyables[11] = player.wf2.buyables[11].add(1)
			},
            style() { if (player[this.layer].unlocked) return {
            'height': '37px',
            'width': '373px',
			'background-color': 'gray',
			'font-size': '20px'
	            }
                },
		},
	},

    layerShown() { return player.tab == "none" && player.subtabs["tree-tab"]["mainTabs"] == "Lobby" && (player.points.gte(175000000) || player.wf2.buyables[11].gte(1)) }            // Returns a bool for if this layer's node should be visible in the tree.
})
