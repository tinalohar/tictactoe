module.exports = () => {
    return `
    <div class="inner-container" v-if="!gameActive">

    <div class="header">
        <span @click="setState(false)" v-bind:class="{ active: !isActive }">New Game</span>
        <span @click="setState(true)" v-bind:class="{ active: isActive }">Join Game</span>
    </div>
<!--
    v-bind:class="{ container-active: containerActive }"
-->
    <div class="form-container" v-bind:class="{ containerActive: !isActive, containerDisabled: isActive }">
        <h2>Start New Game</h2>
        <span v-if="errorMessage" id="errorMessageInfo">{{errorMessage}}</span>
        <div class="form">
            <div class="form-group">
                <label>Nickname</label>
                <input type="text" placeholder="Your nickname" v-model="newGameNickname" v-on:keyup.13="startGame(newGameNickname, newGameRoomname)" />
            </div>

            <div class="form-group">
                <label>Room Name</label>
                <input type="text" placeholder="Name of room" v-model="newGameRoomname" v-on:keyup.13="startGame(newGameNickname, newGameRoomname)" />
            </div>

            <div class="form-group">
                <button @click="startGame(newGameNickname, newGameRoomname)">Start Game</button>
            </div>
        </div>

    </div>
    
    <div class="form-container" v-bind:class="{ containerActive: isActive, containerDisabled: !isActive }">
        <h2>Join An Existing Game</h2>
        <span v-if="errorMessage" id="errorMessageInfo">{{errorMessage}}</span>

        <div class="form">

            <div class="form-group">
                <label>Nickname</label>
                <input type="text" placeholder="Your nickname" v-model="joinGameNickname" v-on:keyup.13="joinGame(joinGameNickname, joinGameRoomname)"/>
            </div>

            <div class="form-group">
                <label>Room Name</label>
                <input type="text" placeholder="Name of room" v-model="joinGameRoomname" v-on:keyup.13="joinGame(joinGameNickname, joinGameRoomname)"/>
            </div>

            <div class="form-group">
                <button @click="joinGame(joinGameNickname, joinGameRoomname)">Join Game</button>
            </div>
        </div>

    </div>

</div>

    `
}
   
