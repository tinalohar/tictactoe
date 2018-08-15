/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./assets/js/classes.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./assets/js/classes.js":
/*!******************************!*\
  !*** ./assets/js/classes.js ***!
  \******************************/
/*! exports provided: gameConfig, instance_p5, Storage, Cross, Circle, Room, Game, Board, Arrays, Network */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"gameConfig\", function() { return gameConfig; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"instance_p5\", function() { return instance_p5; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Storage\", function() { return Storage; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Cross\", function() { return Cross; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Circle\", function() { return Circle; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Room\", function() { return Room; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Game\", function() { return Game; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Board\", function() { return Board; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Arrays\", function() { return Arrays; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Network\", function() { return Network; });\n/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components */ \"./assets/js/components.js\");\n/* harmony import */ var _main__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./main */ \"./assets/js/main.js\");\n/* harmony import */ var _http_config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./http.config */ \"./assets/js/http.config.ts\");\n/* harmony import */ var _http_config__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_http_config__WEBPACK_IMPORTED_MODULE_2__);\n\n\n\n\nvar gameConfig = {}\n\nvar s = function( sketch ) {\n    sketch.setup = function() {\n        sketch.textFont('Helvetica');\n        gameConfig.network = new Network(_http_config__WEBPACK_IMPORTED_MODULE_2__[\"serverUrl\"])\n    };\n  \n    sketch.draw = function() {\n    \tif(gameConfig.game && gameConfig.game.showBoard) {\n            sketch.background(51)\n            gameConfig.game.board.draw()\n            gameConfig.game.drawObjects()\n            gameConfig.game.gameOver()\n        }\n    };\n\n    sketch.mousePressed = function() {\n        if(gameConfig.game && gameConfig.game.gameEnabled && gameConfig.game.playerTurn === gameConfig.playerNickname && !gameConfig.game.disableKeys && gameConfig.room.player1 && gameConfig.room.player2) {\n            sketch.noFill()\n            const centerItemValue = 100; // Position the objects in the center of the square\n            var mouseX = sketch.mouseX;\n            var mouseY = sketch.mouseY;\n            var width = sketch.width;\n            var height = sketch.height;\n\n            if(mouseX > width || mouseX < 0) { // make sure that the mouse is on the board\n                return\n            } else if(mouseY > height || mouseY < 0) {\n                return\n            } else if(mouseX < width/3 && mouseY < height/3)  {\n                Object(_main__WEBPACK_IMPORTED_MODULE_1__[\"createObject\"])({x: width/3-centerItemValue, y: height/3-centerItemValue, player: gameConfig.playerNickname, position: \"A\"})\n            } else if(mouseX > width/3 && mouseX < width/3*2 && mouseY < height/3) {\n                Object(_main__WEBPACK_IMPORTED_MODULE_1__[\"createObject\"])({x: width/3*2-centerItemValue, y: height/3-centerItemValue, player: gameConfig.playerNickname, position: \"B\"})\n            } else if(mouseX > width/3*2 && mouseY < height/3) {\n                Object(_main__WEBPACK_IMPORTED_MODULE_1__[\"createObject\"])({x: width-centerItemValue, y: height/3-centerItemValue, player: gameConfig.playerNickname, position: \"C\"})\n            } else if(mouseX < width/3 && mouseY > height/3 && mouseY < height/3*2) {\n                Object(_main__WEBPACK_IMPORTED_MODULE_1__[\"createObject\"])({x: width/3-centerItemValue, y: height/3*2-centerItemValue, player: gameConfig.playerNickname, position: \"D\"}) \n            } else if(mouseX > width/3 && mouseX < width/3*2 && mouseY < height/3*2 && mouseY > height/3) {\n                Object(_main__WEBPACK_IMPORTED_MODULE_1__[\"createObject\"])({x: width/3*2-centerItemValue, y: height/3*2-centerItemValue, player: gameConfig.playerNickname, position: \"E\"})\n            } else if(mouseX > width/3*2 && mouseY < height/3*2 && mouseY > height/3) {\n                Object(_main__WEBPACK_IMPORTED_MODULE_1__[\"createObject\"])({x: width-centerItemValue, y: height/3*2-centerItemValue, player: gameConfig.playerNickname, position: \"F\"})\n            } else if(mouseX < width/3 && mouseY > height/3*2) {\n                Object(_main__WEBPACK_IMPORTED_MODULE_1__[\"createObject\"])({x: width/3-centerItemValue, y: height-centerItemValue, player: gameConfig.playerNickname, position: \"G\"}) \n            } else if(mouseX > width/3 && mouseX < width/3*2 && mouseY > height/3*2) {\n                Object(_main__WEBPACK_IMPORTED_MODULE_1__[\"createObject\"])({x: width/3*2-centerItemValue, y: height-centerItemValue, player: gameConfig.playerNickname, position: \"H\"}) \n            } else if(mouseX > width/3*2 && mouseY > height/3*2) {\n                Object(_main__WEBPACK_IMPORTED_MODULE_1__[\"createObject\"])({x: width-centerItemValue, y: height-centerItemValue, player: gameConfig.playerNickname, position: \"I\"})  \n            }\n        }\n    }\n  };\n  \nvar instance_p5 = new p5(s);\n\n\n\n\nclass Storage {     // classes.js\n    constructor() {\n        this.localStorage = window.localStorage;\n    }\n\n    setItem(item, data) {\n        this.localStorage.setItem(item, JSON.stringify(data))\n    }\n\n    getItem(item) {\n        return JSON.parse(this.localStorage.getItem(item))\n    }\n\n    removeItem(item) {\n        this.localStorage.removeItem(item)\n    }\n\n}\n\nclass Cross {\n\tconstructor(line1, line2) {\n\t\tthis.line1 = line1;\n        this.line2 = line2;\n        this.color = instance_p5.color('#2f5cce');\n    } \n\n    update() {\n        instance_p5.stroke(this.color) // Color of the cross\n    }\n\n    draw() {\n        this.update()\n        instance_p5.line(this.line1.x1, this.line1.y1, this.line1.x2, this.line1.y2)\n        instance_p5.line(this.line2.x1, this.line2.y1, this.line2.x2, this.line2.y2)\n    }\n}\n\nclass Circle {\n\tconstructor(pattern, theme) {   \n        this.circle = pattern;\n        this.strokeColor = '#fc0505';\n        this.fillColor = (252, 5, 5); // Starts at 255;\n        this.lifespan = theme.lifespan; // Starts at 1;\n    }\n\n    update() {\n        instance_p5.stroke(instance_p5.color(this.strokeColor)) // Color of the circle\n    }\n\n    draw() {\n        this.update()\n        instance_p5.ellipse(this.circle.x1, this.circle.y1, this.circle.d1, this.circle.d2)   \n    }\n\n}\n\nclass Room {\n    constructor(config) {\n        this.player1   = config.player1;  // Player who creates the room\n        this.player2   = config.player2;  // Player who joins the room\n        this.roomname  = config.roomname; // room name for socket \n    }\n\n    update(config) {\n        this.player1  = config.player1;\n        this.player2  = config.player2;\n        this.roomname = config.roomname; \n    }\n}\n\nclass Game {\n    constructor(showBoard, playerTurn) {\n        this.positionsTaken    = []; // map each position so it is not used twice\n        this.movesLeft         = 9; // Moves left before game is either won or tied\n        this.showBoard         = showBoard; // Render board?\n        this.playerTurn        = playerTurn; // Who is currently allowed to make a move?\n        this.gameEnabled       = false; // Have both players joined the game?\n        this.disableKeys       = false; // Disable keys if player is not allowed to move\n        this.objects           = {lines: [],ellipses: []}; // All the previous moves\n        this.arrays            = new Arrays();\n        this.board             = new Board();\n    }\n\n    drawObjects() {\n        instance_p5.strokeWeight(1.5) // Stroke weight of game symbols\n        \n\n        this.objects.lines.forEach((i) => { // the cross player object\n            i.draw()\n        })\n\n        this.objects.ellipses.forEach((i) => { // the circle player object\n            i.draw()         \n        })\n\n        instance_p5.stroke(instance_p5.color('#fff')) // Reset to original color\n        instance_p5.strokeWeight(1) // Reset to original stroke weight\n    }\n\n    updateGame(update) {\n        this.objects.lines = update.objects.lines.map((i) => {\n            return new Cross(\n                {x1: i.line1.x1, y1: i.line1.y1, x2: i.line1.x2, y2: i.line1.y2},\n                {x1: i.line2.x1, y1: i.line2.y1, x2: i.line2.x2, y2: i.line2.y2}\n            )\n        })\n\n        this.objects.ellipses = update.objects.ellipses.map((i) => {\n            return new Circle(\n                {x1: i.circle.x1, y1: i.circle.y1, d1: i.circle.d1, d2: i.circle.d2},\n                {fillColor: i.fillColor, lifespan: i.lifespan}\n            )\n        })\n\n        this.playerTurn\t= update.next; // change the player who is allowed to move\n\t\tthis.movesLeft        = update.movesLeft; // reduce the moves left until win or tie\n        this.positionsTaken   = update.positionsTaken; // update the moves that have been taken\n        this.disableKeys      = false; // enable keys again\n    }\n\n    hasWon() {\n        for(let arr in this.arrays.winScenarios) {\n            if(this.arrays.winScenarios[arr].filter((value) => {\n                return value === gameConfig.room.player1\n            }).length >= 3) { return \"Circle Has Won!\"}\n    \n            if(this.arrays.winScenarios[arr].filter((value) => {\n                return value === gameConfig.room.player2\n            }).length >= 3) { return \"Cross Has Won!\"}\n        }\n    }\n\n    gameOver() {\n        if(this.movesLeft === 0 && !this.hasWon()) {\n            _components__WEBPACK_IMPORTED_MODULE_0__[\"metaInformation\"].hasWon = \"Game Tied\"\n            this.disableKeys = true;\n            gameConfig.network.winnerUpdate({roomname: gameConfig.room.roomname, message: \"Game Tied\"})\n            Object(_main__WEBPACK_IMPORTED_MODULE_1__[\"newGame\"])()\n        }\n    \n        if(this.hasWon()) {\n            _components__WEBPACK_IMPORTED_MODULE_0__[\"metaInformation\"].hasWon = this.hasWon();\n            this.disableKeys = true;\n            gameConfig.network.winnerUpdate({roomname: gameConfig.room.roomname, message: this.hasWon()})\n            Object(_main__WEBPACK_IMPORTED_MODULE_1__[\"newGame\"])()\n        }\n    }\n}\n\nclass Board {\n    constructor() {\n        var height = 600; // height of the game board\n        var width = 600; // width of the game board\n        this.lines  = { // all the lines that make up the game board\n            y1: {xStart: width/3,   yStart: 0,          xEnd: width/3,   yEnd: height},\n            y2: {xStart: width/3*2, yStart: 0,          xEnd: width/3*2, yEnd: height},\n            x1: {xStart: 0,         yStart: height/3,   xEnd: width,     yEnd: height/3},\n            x2: {xStart: 0,         yStart: height/3*2, xEnd: width,     yEnd: height/3*2}\n        }\n    }\n\n    draw() { // render the board \n        for(let key in this.lines) {\n            var object = this.lines[key]\n            instance_p5.line(object.xStart, object.yStart, object.xEnd, object.yEnd)\n        }\n    }\n}\n\nclass Arrays {\n    constructor() {\n        this.player            = \"\";\n        this.winScenarios      = {\n            x1: [],x2: [],x3: [],   // left to right\n            y1: [],y2: [],y3: [],   // top to bottom\n            d1: [],d2: [],          // diagonal ( top:left -> bottom:right and  top:right -> bottom:left)\n        };\n    }\n\n    finalize(arrays) { // Accepts an array of arrays\n        arrays.forEach((i) => {\n            i.push(this.player)\n        })\n    }\n\n    update(config) {\n        this.player = config.player;\n        let a       = this.winScenarios; // a stands for array\n\n        switch (config.position) { // position on the board \n            case \"A\": return this.finalize([a.x1, a.y1, a.d1]);\n            case \"B\": return this.finalize([a.x2, a.y1]);\n            case \"C\": return this.finalize([a.x3, a.y1, a.d2]);\n            case \"D\": return this.finalize([a.x1, a.y2]);\n            case \"E\": return this.finalize([a.x2, a.y2, a.d1, a.d2]); // Rows affected by player move \n            case \"F\": return this.finalize([a.x3, a.y2]);             // Array with letter ending starting in top left corner  \n            case \"G\": return this.finalize([a.x1, a.y3, a.d2]);       // X = LEFT -> RIGHT\n            case \"H\": return this.finalize([a.x2, a.y3]);             // Y = TOP -> BOTTOM\n            case \"I\": return this.finalize([a.x3, a.y3, a.d1]);       // D = DIAGONAL\n            default:  return this.finalize([]);\n        }\n    }   \n}\n\nclass Network {\n    constructor(serverUrl) {\n        this.serverUrl = serverUrl;\n        this.socket = io(this.serverUrl)\n        this.isListening = false;\n    } \n\n\n    onGameUpdate(roomname) {\n        this.socket.on(`update-${roomname}`, (data) => {\n            gameConfig.game.updateGame(data) // Update game\n        })\n    }\n\n    onGameWinner(roomname) {\n        this.socket.on(`winner-${roomname}`, (data) => {\n\t\t\tgameConfig.game.disableKeys = true;\n\t\t\t_components__WEBPACK_IMPORTED_MODULE_0__[\"metaInformation\"].hasWon = data.message;\n\t\t\tObject(_main__WEBPACK_IMPORTED_MODULE_1__[\"newGame\"])() // Start a new game\n        })\n    }\n\n    onRoomUpdate(roomname) {\n        this.socket.on(`room-update-${roomname}`, (data) => {\n            gameConfig.room.update(data)\n            _components__WEBPACK_IMPORTED_MODULE_0__[\"metaInformation\"].waitingForPlayers = false\n        })\n    }\n\n    gameUpdate(data) {\n        this.socket.emit('update', data)\n    }\n\n    winnerUpdate(data) {\n        this.socket.emit(`winner`, data)\n    }\n}\n\n\n\n//# sourceURL=webpack:///./assets/js/classes.js?");

/***/ }),

/***/ "./assets/js/components.js":
/*!*********************************!*\
  !*** ./assets/js/components.js ***!
  \*********************************/
/*! exports provided: welcomeScreen, metaInformation */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"welcomeScreen\", function() { return welcomeScreen; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"metaInformation\", function() { return metaInformation; });\n/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./config */ \"./assets/js/config.js\");\n/* harmony import */ var _templates_welcomeScreen_template__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./templates/welcomeScreen.template */ \"./assets/js/templates/welcomeScreen.template.js\");\n/* harmony import */ var _templates_welcomeScreen_template__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_templates_welcomeScreen_template__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _templates_metaInformation_template__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./templates/metaInformation.template */ \"./assets/js/templates/metaInformation.template.js\");\n/* harmony import */ var _templates_metaInformation_template__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_templates_metaInformation_template__WEBPACK_IMPORTED_MODULE_2__);\n \n\n\n\n\nvar welcomeScreen = new Vue({ // components.js\n\t\tel: \"#welcomeScreen\",\n\t\tdata: {\n\t\t\tstate: \"new-game\",\n\t\t\tgameActive: false,\n\t\t\tnewGameNickname: \"\",\n\t\t\tnewGameRoomname: \"\",\n\t\t\tjoinGameNickname: \"\",\n\t\t\tjoinGameRoomname: \"\",\n\t\t\terrorMessage: undefined,\n\t\t\tisActive: false,\n\t\t\tcontainerActive: true\n\t\t},\n\t\tmethods: {\n\t\t\tstartGame: function(nickname, roomname) {\n\t\t\t\tthis.newGameNickname = \"\";\n\t\t\t\tthis.newGameRoomname = \"\";\n\t\t\t\tObject(_config__WEBPACK_IMPORTED_MODULE_0__[\"serverAccess\"])({url: \"/new-game\", newgame: true, data: {nickname: nickname, roomname: roomname}})\n\t\t\t},\n\t\t\tjoinGame: function(nickname, roomname) {\n\t\t\t\tthis.joinGameNickname = \"\";\n\t\t\t\tthis.joinGameRoomname = \"\";\n\t\t\t\tObject(_config__WEBPACK_IMPORTED_MODULE_0__[\"serverAccess\"])({url: \"/join-game\", newgame: false, data: {nickname: nickname, roomname: roomname}})\n\t\t\t},\n\t\t\tsetState: function(state) {\n\t\t\t\tthis.isActive = state;\n\t\t\t}\n\t\t},\n\t\ttemplate: _templates_welcomeScreen_template__WEBPACK_IMPORTED_MODULE_1___default()()\n\t})\n\nvar metaInformation = new Vue({\n\t\tel: \"#metaInfo\",\n\t\tdata: {\n\t\t\tplayer: {\n\t\t\t\tname: \"\",\n\t\t\t\tplayer: \"\"\n\t\t\t},\n\t\t\thasWon: undefined,\n\t\t\tgameActive: false,\n\t\t\twaitingForPlayers: true\n\t\t},\n\t\tmethods: {\n\t\t\tleaveGame: function() {},\n\t\t},\n\t\ttemplate: _templates_metaInformation_template__WEBPACK_IMPORTED_MODULE_2___default()()\n\t})\n\n\n\n\n\n//# sourceURL=webpack:///./assets/js/components.js?");

/***/ }),

/***/ "./assets/js/config.js":
/*!*****************************!*\
  !*** ./assets/js/config.js ***!
  \*****************************/
/*! exports provided: updateMetaInformation, serverAccess */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"updateMetaInformation\", function() { return updateMetaInformation; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"serverAccess\", function() { return serverAccess; });\n/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components */ \"./assets/js/components.js\");\n/* harmony import */ var _classes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./classes */ \"./assets/js/classes.js\");\n/* harmony import */ var _main__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./main */ \"./assets/js/main.js\");\n/* harmony import */ var _http_config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./http.config */ \"./assets/js/http.config.ts\");\n/* harmony import */ var _http_config__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_http_config__WEBPACK_IMPORTED_MODULE_3__);\n\n\n\n\n\n\nfunction updateMetaInformation(config) {\n\t_classes__WEBPACK_IMPORTED_MODULE_1__[\"gameConfig\"].playerNickname = config.nickname;\n\t_components__WEBPACK_IMPORTED_MODULE_0__[\"metaInformation\"].waitingForPlayers = config.waitingForPlayers;\n\t_components__WEBPACK_IMPORTED_MODULE_0__[\"metaInformation\"].player = {\n\t\tname: config.nickname,\n\t\tplayer: config.player\n\t}\n\n\t_components__WEBPACK_IMPORTED_MODULE_0__[\"welcomeScreen\"].gameActive = true;\n\t_components__WEBPACK_IMPORTED_MODULE_0__[\"metaInformation\"].gameActive = true;\n}\n\nfunction serverAccess(config) {\n\t_http_config__WEBPACK_IMPORTED_MODULE_3__[\"httpConfig\"].body = JSON.stringify(config.data)\n\tfetch(`${_http_config__WEBPACK_IMPORTED_MODULE_3__[\"serverUrl\"]}${config.url}`, _http_config__WEBPACK_IMPORTED_MODULE_3__[\"httpConfig\"]).then(response => response.json()).then(data => {\n\t\t   if(!data.success) {\n\t\t\t   _components__WEBPACK_IMPORTED_MODULE_0__[\"welcomeScreen\"].errorMessage = data.message;\n\t\t\t   setTimeout(() => {\n\t\t\t\t   _components__WEBPACK_IMPORTED_MODULE_0__[\"welcomeScreen\"].errorMessage = undefined;\n\t\t\t   }, 5000)\n\t\t   } else {\n\t\t\t   _classes__WEBPACK_IMPORTED_MODULE_1__[\"gameConfig\"].room = new _classes__WEBPACK_IMPORTED_MODULE_1__[\"Room\"](data.room)\n\n\n\t\t\t   if(config.newgame) {\n\t\t\t\t   updateMetaInformation({nickname: data.room.player1, player: \"circle\", waitingForPlayers: true})\n\t\t\t\t   _classes__WEBPACK_IMPORTED_MODULE_1__[\"gameConfig\"].network.onRoomUpdate(_classes__WEBPACK_IMPORTED_MODULE_1__[\"gameConfig\"].room.roomname)\n\n\t\t\t   } else {\n\t\t\t\t   updateMetaInformation({nickname: data.room.player2, player: \"cross\", waitingForPlayers: false})\n\t\t\t   }\n\t\t\t\t  \n\t\t\t   _classes__WEBPACK_IMPORTED_MODULE_1__[\"gameConfig\"].game = new _classes__WEBPACK_IMPORTED_MODULE_1__[\"Game\"](true, data.room.player1)\n\t\t\t   removeBackground()\n\t\t\t   Object(_main__WEBPACK_IMPORTED_MODULE_2__[\"newGame\"])()\n\t\t   }\n\t })\n}\n\n\nfunction removeBackground() {\n\tvar target = document.getElementsByTagName(\"body\");\n\ttarget[0].style.background = \"none\";\n}\n\n\n//# sourceURL=webpack:///./assets/js/config.js?");

/***/ }),

/***/ "./assets/js/http.config.ts":
/*!**********************************!*\
  !*** ./assets/js/http.config.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.serverUrl = \"http://localhost:3000\";\nexports.httpConfig = {\n    method: \"POST\",\n    mode: \"cors\",\n    headers: {\n        'Accept': 'application/json',\n        'Content-Type': 'application/json'\n    },\n    cache: \"no-cache\",\n    credentials: \"same-origin\",\n    redirect: \"follow\",\n    referrer: \"no-referrer\" // no-referrer, *client\n};\n\n\n//# sourceURL=webpack:///./assets/js/http.config.ts?");

/***/ }),

/***/ "./assets/js/main.js":
/*!***************************!*\
  !*** ./assets/js/main.js ***!
  \***************************/
/*! exports provided: newGame, createObject, sendUpdate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"newGame\", function() { return newGame; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"createObject\", function() { return createObject; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"sendUpdate\", function() { return sendUpdate; });\n/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components */ \"./assets/js/components.js\");\n/* harmony import */ var _classes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./classes */ \"./assets/js/classes.js\");\n\n\n\n\nfunction newGame() {\n\tif(!_classes__WEBPACK_IMPORTED_MODULE_1__[\"gameConfig\"].network.isListening) {\n\t\t_classes__WEBPACK_IMPORTED_MODULE_1__[\"gameConfig\"].network.onGameUpdate(_classes__WEBPACK_IMPORTED_MODULE_1__[\"gameConfig\"].room.roomname)\n\t\t_classes__WEBPACK_IMPORTED_MODULE_1__[\"gameConfig\"].network.onGameWinner(_classes__WEBPACK_IMPORTED_MODULE_1__[\"gameConfig\"].room.roomname)\n\t\t_classes__WEBPACK_IMPORTED_MODULE_1__[\"gameConfig\"].network.isListening = true;\n\t}\n\n\t_classes__WEBPACK_IMPORTED_MODULE_1__[\"gameConfig\"].game.gameEnabled = false;\n\tvar sketch_holder = document.getElementById(\"sketch-holder\")\n\tsketch_holder.style.display = \"block\";\n\t_classes__WEBPACK_IMPORTED_MODULE_1__[\"instance_p5\"].createCanvas(600, 600).parent('sketch-holder')\n\t_classes__WEBPACK_IMPORTED_MODULE_1__[\"instance_p5\"].background(51)\n\t_classes__WEBPACK_IMPORTED_MODULE_1__[\"instance_p5\"].noFill()\n\t_classes__WEBPACK_IMPORTED_MODULE_1__[\"instance_p5\"].stroke(255)\n\t\n\t_classes__WEBPACK_IMPORTED_MODULE_1__[\"gameConfig\"].game = new _classes__WEBPACK_IMPORTED_MODULE_1__[\"Game\"](true, _classes__WEBPACK_IMPORTED_MODULE_1__[\"gameConfig\"].room.player1) // Parameters ( showBoard, startingPlayer )\n\t_classes__WEBPACK_IMPORTED_MODULE_1__[\"gameConfig\"].game.gameEnabled = true;\n\n\tsetTimeout(() => {\n\t\t_components__WEBPACK_IMPORTED_MODULE_0__[\"metaInformation\"].hasWon = undefined;\n\t}, 3000);\n\n\n}\n\n\n\nfunction createObject(config) {\n\tif(!_classes__WEBPACK_IMPORTED_MODULE_1__[\"gameConfig\"].game.positionsTaken.includes(config.position)) {\n\t\t_classes__WEBPACK_IMPORTED_MODULE_1__[\"gameConfig\"].game.disableKeys = true;\n\n\t\t\tswitch (_classes__WEBPACK_IMPORTED_MODULE_1__[\"gameConfig\"].playerNickname) {\n\n\t\t\t\tcase _classes__WEBPACK_IMPORTED_MODULE_1__[\"gameConfig\"].room.player1:\n\t\t\t\t\t_classes__WEBPACK_IMPORTED_MODULE_1__[\"gameConfig\"].game.positionsTaken.push(config.position)\n\t\t\t\t\t_classes__WEBPACK_IMPORTED_MODULE_1__[\"gameConfig\"].game.arrays.update(config)\n\t\t\t\t\t_classes__WEBPACK_IMPORTED_MODULE_1__[\"gameConfig\"].game.objects.ellipses.push(new _classes__WEBPACK_IMPORTED_MODULE_1__[\"Circle\"](\n\t\t\t\t\t\t{x1: config.x, y1: config.y, d1: 100, d2: 100},\n\t\t\t\t\t\t{fillColor: 255, lifespan: 1}\n\t\t\t\t\t))\n\t\t\t\t\t_classes__WEBPACK_IMPORTED_MODULE_1__[\"gameConfig\"].game.movesLeft--;\n\t\t\t\t\tsendUpdate(_classes__WEBPACK_IMPORTED_MODULE_1__[\"gameConfig\"].room.player2)\n\t\t\t\t\t_classes__WEBPACK_IMPORTED_MODULE_1__[\"gameConfig\"].player = _classes__WEBPACK_IMPORTED_MODULE_1__[\"gameConfig\"].room.player2\n\n\t\t\t\t\treturn;\n\t\n\t\t\t\tcase _classes__WEBPACK_IMPORTED_MODULE_1__[\"gameConfig\"].room.player2:\n\t\t\t\t\t_classes__WEBPACK_IMPORTED_MODULE_1__[\"gameConfig\"].game.positionsTaken.push(config.position)\n\t\t\t\t\t_classes__WEBPACK_IMPORTED_MODULE_1__[\"gameConfig\"].game.arrays.update(config)\n\t\t\t\t\t_classes__WEBPACK_IMPORTED_MODULE_1__[\"gameConfig\"].game.objects.lines.push(new _classes__WEBPACK_IMPORTED_MODULE_1__[\"Cross\"](\n\t\t\t\t\t\t{x1: config.x+50, y1: config.y+50, x2: config.x-50, y2: config.y-50 },\n\t\t\t\t\t\t{x1: config.x-50, y1: config.y+50, x2: config.x+50, y2: config.y-50 }\n\t\t\t\t\t))\n\t\t\t\t\t_classes__WEBPACK_IMPORTED_MODULE_1__[\"gameConfig\"].game.movesLeft--;\n\t\t\t\t\tsendUpdate(_classes__WEBPACK_IMPORTED_MODULE_1__[\"gameConfig\"].room.player1)\n\t\t\t\t\t_classes__WEBPACK_IMPORTED_MODULE_1__[\"gameConfig\"].player = _classes__WEBPACK_IMPORTED_MODULE_1__[\"gameConfig\"].room.player2\n\n\t\t\t\t\treturn;\n\t\t\t}\n\t}\n}\n\nfunction sendUpdate(next) {\n\t_classes__WEBPACK_IMPORTED_MODULE_1__[\"gameConfig\"].network.gameUpdate({\n\t\troomname: _classes__WEBPACK_IMPORTED_MODULE_1__[\"gameConfig\"].room.roomname,\n\t\tnext: next,\n\t\tobjects: _classes__WEBPACK_IMPORTED_MODULE_1__[\"gameConfig\"].game.objects,\n\t\tmovesLeft: _classes__WEBPACK_IMPORTED_MODULE_1__[\"gameConfig\"].game.movesLeft,\n\t\tpositionsTaken: _classes__WEBPACK_IMPORTED_MODULE_1__[\"gameConfig\"].game.positionsTaken\n\t})\n}\n\n\n\n\n//# sourceURL=webpack:///./assets/js/main.js?");

/***/ }),

/***/ "./assets/js/templates/metaInformation.template.js":
/*!*********************************************************!*\
  !*** ./assets/js/templates/metaInformation.template.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = () => {\n    return `\n        <div class=\"meta-info-header\" v-if=\"gameActive\">\n            <span v-if=\"player.player === 'circle'\">you are: <i class=\"fa fa-circle-thin\" aria-hidden=\"true\"></i></span>\n            <span v-if=\"player.player === 'cross'\">you are: <i class=\"fa fa-times\" aria-hidden=\"true\"></i></span>\n\n            <span id=\"winText\" v-if=\"hasWon\">{{hasWon}}</span>\n            <span v-if=\"waitingForPlayers\">waiting for: <i class=\"fa fa-times\" aria-hidden=\"true\"></i></span>\n            <span>\n                <a id=\"leaveGameTag\" href=\"/\">Leave Game <i class=\"fa fa-sign-out\" aria-hidden=\"true\"></i></a>\n            </span>\n        </div>\n    `\n}\n\n//# sourceURL=webpack:///./assets/js/templates/metaInformation.template.js?");

/***/ }),

/***/ "./assets/js/templates/welcomeScreen.template.js":
/*!*******************************************************!*\
  !*** ./assets/js/templates/welcomeScreen.template.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = () => {\n    return `\n    <div class=\"inner-container\" v-if=\"!gameActive\">\n\n    <div class=\"header\">\n        <span @click=\"setState(false)\" v-bind:class=\"{ active: !isActive }\">New Game</span>\n        <span @click=\"setState(true)\" v-bind:class=\"{ active: isActive }\">Join Game</span>\n    </div>\n<!--\n    v-bind:class=\"{ container-active: containerActive }\"\n-->\n    <div class=\"form-container\" v-bind:class=\"{ containerActive: !isActive, containerDisabled: isActive }\">\n        <h2>Start New Game</h2>\n        <span v-if=\"errorMessage\" id=\"errorMessageInfo\">{{errorMessage}}</span>\n        <div class=\"form\">\n            <div class=\"form-group\">\n                <label>Nickname</label>\n                <input type=\"text\" placeholder=\"Your nickname\" v-model=\"newGameNickname\" v-on:keyup.13=\"startGame(newGameNickname, newGameRoomname)\" />\n            </div>\n\n            <div class=\"form-group\">\n                <label>Room Name</label>\n                <input type=\"text\" placeholder=\"Name of room\" v-model=\"newGameRoomname\" v-on:keyup.13=\"startGame(newGameNickname, newGameRoomname)\" />\n            </div>\n\n            <div class=\"form-group\">\n                <button @click=\"startGame(newGameNickname, newGameRoomname)\">Start Game</button>\n            </div>\n        </div>\n\n    </div>\n    \n    <div class=\"form-container\" v-bind:class=\"{ containerActive: isActive, containerDisabled: !isActive }\">\n        <h2>Join An Existing Game</h2>\n        <span v-if=\"errorMessage\" id=\"errorMessageInfo\">{{errorMessage}}</span>\n\n        <div class=\"form\">\n\n            <div class=\"form-group\">\n                <label>Nickname</label>\n                <input type=\"text\" placeholder=\"Your nickname\" v-model=\"joinGameNickname\" v-on:keyup.13=\"joinGame(joinGameNickname, joinGameRoomname)\"/>\n            </div>\n\n            <div class=\"form-group\">\n                <label>Room Name</label>\n                <input type=\"text\" placeholder=\"Name of room\" v-model=\"joinGameRoomname\" v-on:keyup.13=\"joinGame(joinGameNickname, joinGameRoomname)\"/>\n            </div>\n\n            <div class=\"form-group\">\n                <button @click=\"joinGame(joinGameNickname, joinGameRoomname)\">Join Game</button>\n            </div>\n        </div>\n\n    </div>\n\n</div>\n\n    `\n}\n   \n\n\n//# sourceURL=webpack:///./assets/js/templates/welcomeScreen.template.js?");

/***/ })

/******/ });