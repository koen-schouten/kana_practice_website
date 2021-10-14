const audioManager = (function () {
    let trackDir = new Map()
    let currentTrack = null;
    let nextTrackQueued = false;

    function init() {

    }

    function _play(trackName) {
        currentTrack = trackDir.get(trackName)
        trackDir.get(trackName).play();
    }

    function pauseTrack() {
        if (currentTrack && !currentTrack.paused) {
            currentTrack.pause();
        }
    }

    function addTrack(trackName, audioURL) {
        let audioElement = new Audio(audioURL);
        trackDir.set(trackName, audioElement);
    }

    function removeTrack(trackName) {
        trackDir.delete(trackName);
    }

    function playTrack(trackName) {
        //The logic below prevent 2 audiotracks from playing at the same time.
        if (nextTrackQueued) {
            return;
        }
        nextTrackQueued = true;
        if (currentTrack == null || currentTrack.ended) {
            _play(trackName);
            nextTrackQueued = false;
        } else {
            //Start playing the next track when the previous one has finished.
            currentTrack.addEventListener("ended", (e) => {
                _play(trackName);
                nextTrackQueued = false;
            }, { once: true });
        }
    }

    return {
        playTrack: playTrack,
        removeTrack: removeTrack,
        addTrack: addTrack,
        init: init,
        pauseTrack: pauseTrack
    };

})();