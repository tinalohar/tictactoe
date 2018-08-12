import {
	welcomeScreen,
	metaInformation
} from "./components";

import { 
    Storage, 
    Room, 
    Game, 
    Board,
    Arrays, 
    Network,
    gameConfig
} from "./classes";

import { 
    updateMetaInformation, 
    serverAccess 
} from "./config"; 

import {
	newGame,
	createObject,
	sendUpdate
} from "./main";

import { httpConfig, serverUrl } from "./http.config";

window.onload = function() {

}