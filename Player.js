module.exports = class Player
{
    constructor(char)
    {
        this.givePlayerChar(char);
    }
    givePlayerChar(char)
    {
        this.Char = char;
    }
    getPlayerChar(){return this.Char;}
    Char;
}