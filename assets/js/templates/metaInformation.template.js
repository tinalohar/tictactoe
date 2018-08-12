module.exports = () => {
    return `
        <div class="meta-info-header" v-if="gameActive">
            <span v-if="player.player === 'circle'">you are: <i class="fa fa-circle-thin" aria-hidden="true"></i></span>
            <span v-if="player.player === 'cross'">you are: <i class="fa fa-times" aria-hidden="true"></i></span>

            <span id="winText" v-if="hasWon">{{hasWon}}</span>
            <span v-if="waitingForPlayers">waiting for: <i class="fa fa-times" aria-hidden="true"></i></span>
            <span>
                <a id="leaveGameTag" href="/">Leave Game <i class="fa fa-sign-out" aria-hidden="true"></i></a>
            </span>
        </div>
    `
}