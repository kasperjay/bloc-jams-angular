(function() {
  function SongPlayer() {
    var SongPlayer = {};

    var currentSong = null;
    var currentBuzzObject = null;

/*
  @function setSong
  @desc Stops currently playing song and loads new audio file as currentBuzzObject
  @param {Object} song
*/
    var setSong = function(song) {
      if (currentBuzzObject) {
        currentBuzzObject.stop();
        currentSong.playing = null;
      }

/*
  @desc Buzz object audio file
  @type {Object}
*/
      currentBuzzObject = new buzz.sound(song.audioUrl, {
        formats: ['mp3'],
        preload: true
      });

      currentSong = song;
    };


/*
  @function playSong
  @desc plays song and sets song.playing to true so album.html changes play/pause icon
  @param {Object} song
*/
    var playSong = function(song) {
      currentBuzzObject.play();
      song.playing = true;
    }

/*
  @function pauseSong
  @desc pauses song at its current point
  @param {Object} song
*/
    var pauseSong = function(song) {
      currentBuzzObject.pause();
      song.playing = false;
    }

/*
  @function stopSong
  @desc stops song at its current point
*/
    var stopSong = function() {
      currentBuzzObject.stop();
      SongPlayer.currentSong.playing = null;
    }

/*
  @function SongPlayer.play(song)
  @desc plays a song from the beginning if the song has not already started and continues playing the song from where it left off if not
  @params {Object} song
  */
    SongPlayer.play = function(song) {
      song = song || SongPlayer.currentSong;
      if (SongPlayer.currentSong !== song) {
        setSong(song);
        playSong(song);
      } else if (SongPlayer.currentSong === song) {
        if (currentBuzzObject.isPaused()) {
          playSong(song);
        }
      }
    };


/*
  @function SongPlayer.pause(song)
  @desc pauses a song at its current time point
  @params {Object} song
*/
    SongPlayer.pause = function(song) {
      currentBuzzObject.pause();
      song.playing = false;
    };

    return SongPlayer;
  }

     angular
         .module('blocJams')
         .factory('SongPlayer', SongPlayer);
 })();
