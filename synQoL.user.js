// ==UserScript==
// @name		syn QoL
// @namespace	Violentmonkey Scripts
// @match		https://synergism.cc/*
// @grant		none
// @version	 	0.1
// @author		Core
// @license		MIT
// @updateURL    https://github.com/AFKoncore/synergism-QoL/synQoL.user.js
// @downloadURL  https://github.com/AFKoncore/synergism-QoL/synQoL.user.js
// @description	QoL buttons meant to make Singularities less tedious
// ==/UserScript==


window.onload = function() {setTimeout(() => {
	setupOnlyOnce();
}, 2000);}

//using a closure because running alongside HyperSynergism cause the setup to be called twice
let setupOnlyOnce = (function() {
   let executed = false;
   return function() {
      if (!executed) {
         executed = true;
         setup()
      }
   };
})();


function setup(){
	console.log('synQoL loaded')

//DOM & CSS setup
	let cubetab = document.getElementById("cubetab");
	cubetab.innerHTML = ' WOW! ⬢ ';

	let runestab = document.getElementById("runestab");

	//replacing the orinal styling of flex gaps between the tabs button with individually modifiable margins
	document.getElementById("tabrow").setAttribute("style", "gap:0!important;");
	addStyle(`
		#tabrow button {
			margin-right: 5px;
		} 
	`);

	//global style for buttons added by this mod
	addStyle(`
		button.synQoL {
			display:inline;
			min-width:25px;
			background-color:gold!important;
			color:black;
			border-color:orange;
		}

		button.synQoL:active {
			background-color:green!important;
		}
	`);

	//unrelated - increase Blueberry's cost contrast (its a currency in the Ambrosia Tab)
	addStyle(`
		#modalContent > [style="color:blue"] {
			color:mediumpurple!important;
		}
	`);


//Ethical WowCube upgrades click saver, only up to w5x9
  const BuyEarlyCubesUpgrades = document.createElement('button');
  document.getElementById("cubeTab5Wrapper").prepend(BuyEarlyCubesUpgrades);
  BuyEarlyCubesUpgrades.setAttribute("class", "synQoL BuyEarlyCubesUpgrades");
  BuyEarlyCubesUpgrades.setAttribute("title", "Buy all early cubes upgrades in one click! \n (Up to w5x9. Also sets bought amount to MAX)");
  BuyEarlyCubesUpgrades.setAttribute("onclick",
		 "if(document.getElementById('toggleCubeBuy').innerHTML !== 'Upgrade: MAX [if possible wow]'){"
		+"		document.getElementById('toggleCubeBuy').click();"
		+"}"
		+"document.getElementById('cubeUpg51').click();" 
		+"for (let i = 1; i <= 49; i++) {" 
		+"		document.getElementById('cubeUpg'+i).click();" 
		+"};"
  )
  BuyEarlyCubesUpgrades.innerHTML= 'Buy Early Cubes Upgrades';
	
  addStyle(`
		.BuyEarlyCubesUpgrades{
			margin-bottom: 5px;
			padding: 0 5px;
		}
	`);



//Open all cubes
	const OpenCubes = document.createElement('button');
	cubetab.insertAdjacentElement('afterend', OpenCubes);
	OpenCubes.setAttribute("class", "synQoL OpenCubes");
	OpenCubes.setAttribute("title", "Open all cubes in one click! \n (50% 4D Tesseract, 100% everything else)");
	OpenCubes.setAttribute("onclick",
		"document.getElementById('openMostPlatonicCube').click();"
		+"	document.getElementById('openMostHypercube').click();"
		+"	document.getElementById('open1000Tesseract').click();"
		+"	document.getElementById('openMostCube').click();"
	)
	OpenCubes.innerHTML = ' $ ';

	addStyle(`
		.OpenCubes {
			border-top-left-radius: 0;
			margin-right: 5px;
		}
	`);
	cubetab.setAttribute("style", "border-top-right-radius: 0; margin: 0;");


//Wow Cube upgrades (unethical?)
/*
	const WowCubeUpgrades = document.createElement('button');
	cubetab.insertAdjacentElement('beforebegin', WowCubeUpgrades);
	WowCubeUpgrades.setAttribute("class", "synQoL WowCubeUpgrades");
	WowCubeUpgrades.setAttribute("title", "Buy ALL 3D Wow!Cubes upgrades in one click!");
	WowCubeUpgrades.setAttribute("onclick",
		 "if(document.getElementById('toggleCubeBuy').innerHTML !== 'Upgrade: MAX [if possible wow]') {"
		+"		document.getElementById('toggleCubeBuy').click()"
		+"}"
  		+"for (let i = 1; i <= 100; i++) {"
		+"		document.getElementById('cubeUpg'+i).click();"
		+"}"
  		//+'for (let i = 1; i <= 20; i++) { document.getElementById(\'platUpg\'+i).click(); }' //FIXME
	)
	WowCubeUpgrades.innerHTML = ' + ';

	addStyle(`
		.WowCubeUpgrades {
			border-top-right-radius: 0;
			margin-right: 0!important;
		}
	`);
	cubetab.setAttribute("style", "border-top-right-radius: 0; border-top-left-radius: 0; margin: 0;");
*/
	
 
//Talimans BUY ALL
	const TalimansBuyAll = document.createElement('button');
	runestab.insertAdjacentElement('afterend', TalimansBuyAll);
	TalimansBuyAll.setAttribute("class", "synQoL TalimansBuyAll");
	TalimansBuyAll.setAttribute("title", "Ant Sacrifice, then \'BUY ALL\' in the Talimans sub-tab, in one click!"
													+"\n (Will also leave purple and green \'C\' Challenges before the sac)");

	TalimansBuyAll.setAttribute("onclick",
			//leaves ongoing (non-asc) challenge before sac, I don't think that would interfere with anything
			 " document.getElementById('challengebtn').click();"
    		+" document.getElementById('reincarnatechallengebtn').click();"
		+" document.getElementById('antSacrifice').click();"
  		+"	setTimeout(() => { document.getElementById('buyTalismanAll').click(); }, 200);"	


	)
	TalimansBuyAll.innerHTML = ' $ ';

	addStyle(`
		.TalimansBuyAll {
			border-top-left-radius: 0;
			margin-right: 5px;
		}
	`);
	runestab.setAttribute("style", "border-top-right-radius: 0; margin: 0;");


}


function addStyle(styleString) {
  const style = document.createElement('style');
  style.textContent = styleString;
  document.head.append(style);
}