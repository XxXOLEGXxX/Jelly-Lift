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
    }},
	update(diff){
		player["tree-tab"].total = player["tree-tab"].total.add(getPointGen().mul(diff))
		player["tree-tab"].totalish = player["tree-tab"].totalish.add(getPointGen().mul(diff))
		player["tree-tab"].floorFactory = player["tree-tab"].floorFactory.add(player.ff.buyables[11].mul(layers.ff.effect()))
		player["tree-tab"].floorWell = player["tree-tab"].floorWell.add(player.wf.buyables[11].mul(layers.wf.effect()))
		player["tree-tab"].floorVolcano = player["tree-tab"].floorVolcano.add(player.vf.buyables[11].mul(layers.vf.effect()))
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
                        function() {return "Jelly owned: "+format(player.points)+"<br/>Jelly created (this game): "+format(player["tree-tab"].totalish)+"<br/>Jelly created (all time): "+format(player["tree-tab"].total)+"<br/>Max jelly had: "+format(player["tree-tab"].best)+"<br/>Jelly per second: "+format(getPointGen())+"<br/>Button clicks: "+format(player["tree-tab"].click)+"<br/>Date started: "+new Date(player.time - player.timePlayed * 1000).toLocaleDateString("en-US")+".<br/>Current version: 0.10 (\"Bet this dude will not be able to replicate Jelly Lift completely\" Update)<br/>Elevator uses: "+format(player["tree-tab"].elevatorUses)},
                        {"color": "white", "font-size": "32px", "font-family": "Comic Sans MS"}],
					'blank', 'blank', 'blank',
					["display-text",
                        function() {return "FLOOR STATS:"},
                        {"color": "white", "font-size": "64px", "font-family": "Comic Sans MS"}],
					'blank', 'blank', 'blank',
					["display-text",
                        function() {return "Jelly created by button: "+format(player["tree-tab"].floorButton)+"<br/>Jelly created by factory: "+format(player["tree-tab"].floorFactory)+"<br/>Jelly created by well: "+format(player["tree-tab"].floorWell)+"<br/>Jelly created by volcano: "+format(player["tree-tab"].floorVolcano)},
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
                        function() {return "ACHIEVEMENTS:   "+format(player["tree-tab"].achievements.length)+"/21 ("+format(new Decimal(player["tree-tab"].achievements.length).div(21).mul(100))+"%)"},
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
			cols: 5,
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
		},
		achievements: {
            rows: 8,
            cols: 7,
            11: {
                name: "The jelly has awakened. Again.",
                done() {return player["tree-tab"].totalish.gte(1)}, // This one is a freebie
                tooltip: "Make 1 jelly",
            },
            12: {
                name: "Jellying it up",
                done() {return player["tree-tab"].totalish.gte(100)}, // This one is a freebie
                tooltip: "Make 100 jelly",
            },
            13: {
                name: "Starting to rise",
                done() {return player["tree-tab"].totalish.gte(1000)}, // This one is a freebie
                tooltip: "Make 1,000 jelly", // Showed when the achievement is completed
            },
            14: {
                name: "Too much jelly",
                done() {return player["tree-tab"].totalish.gte(10000)}, // This one is a freebie
                tooltip: "Make 10,000 jelly", // Showed when the achievement is completed
            },
            15: {
                name: "Is this Antimatter Dimensions reference?",
                done() {return player["tree-tab"].totalish.gte(1000000)}, // This one is a freebie
                tooltip: "Make 1,000,000 jelly", // Showed when the achievement is completed
            },
            16: {
                name: "The more the jellier!",
                done() {return player["tree-tab"].totalish.gte(1000000000)}, // This one is a freebie
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
                name: "Jelly pooper",
                done() {return getPointGen().gte(1000000)},
                tooltip: "Make 1,000,000 j/s", // Showed when the achievement is completed
            },
			34: {
                name: "I said more!",
                done() {return getPointGen().gte(100000000)},
                tooltip: "Make 100,000,000 j/s", // Showed when the achievement is completed
            },
			35: {
                name: "Magnitude power",
                done() {return getPointGen().gte(1000000000)},
                tooltip: "Make 1e9 j/s", // Showed when the achievement is completed
            },
			36: {
                name: "Jelly is rising... IT'S OVERFLOWING!",
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
                name: "Volcanic jellybar",
                done() {return player.vf.buyables[11].gte(100)},
                tooltip() {return player.vf.buyables[11].gte(1) ? "Upgrade volcano 100 times" : "Upgrade ███████ 100 times"}, // Showed when the achievement is completed Mass jelly production
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
	symbol() {if(player.ff.buyables[11].gte(1)) return "VF"
	          else return "?"},
    color() {if(player.ff.buyables[11].gte(1)) return "gray"
	         else return "#4BDC13"},                       // The color for this layer, which affects many elements.
    row: "side",                                 // The row this layer is on (0 is the first row).
	position: 3,
	tooltip() { if(player.vf.buyables[11] == 0) return "Locked (25,000J)"
	            else return	"Volcano floor" },
	effect() {let eff = new Decimal(70)
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
