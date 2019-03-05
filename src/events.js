
const START_GAME     = 'startGame';
const GAME_OVER      = 'gameOver';
const SET_SCORE      = 'setScore';
const INCREASE_SCORE = 'increaseScore';
const SCORE_UPDATED  = 'scoreUpdated';
const PLAY_SOUND     = 'playSound';
const MUSIC_CHANGED  = 'musicChanged';
const SOUND_CHANGED  = 'soundChanged';
const TOGGLE_MUSIC   = 'toggleMusic';
const TOGGLE_SOUND   = 'toggleSound';
const RESET_GAME     = 'resetGame';

export default class Events {
    static get START_GAME()     { return START_GAME; }
    static get GAME_OVER()      { return GAME_OVER; }
    static get SET_SCORE()      { return SET_SCORE; }
    static get INCREASE_SCORE() { return INCREASE_SCORE; }
    static get SCORE_UPDATED()  { return SCORE_UPDATED; }
    static get PLAY_SOUND()     { return PLAY_SOUND; }
    static get MUSIC_CHANGED()  { return MUSIC_CHANGED; }
    static get SOUND_CHANGED()  { return SOUND_CHANGED; }
    static get TOGGLE_MUSIC()   { return TOGGLE_MUSIC; }
    static get TOGGLE_SOUND()   { return TOGGLE_SOUND; }
    static get RESET_GAME()     { return RESET_GAME; }
}
