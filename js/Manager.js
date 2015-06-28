function Manager(width, height)
{
	this.initSize = function(width, height, resize){
		if(width > height/0.8){
			this.totalWidth = height / 0.8;
			this.totalHeight = height;
		}
		else{
			this.totalWidth = width < height ? width : height;
			this.totalHeight = this.totalWidth * 0.8;
		}
		this.totalWidth *= 0.95;
		this.totalHeight *= 0.95;
		this.gameWidth = this.totalHeight;
		this.gameHeight = this.totalHeight;
		this.delta = [this.gameWidth * 0.047, this.gameHeight * 0.0467];
    	this.origin = [this.gameWidth/14.25, this.gameHeight/14];
		this.tileSize = this.gameWidth * 0.03;

		$(controls).css("height", this.totalHeight * 0.95);
		$(".myButton").css("font-size", 7 + this.totalHeight * 0.015);
		$(".myButton").css("width", this.totalHeight * 0.15);
		$(AIThink).css("font-size",7 + this.totalHeight * 0.015);
		$(message).css("font-size", 7 + this.totalHeight * 0.015);
		$(gameModeText).css("font-size",9 + this.totalHeight * 0.015);
		$(statuss).css("height", (7 + this.totalHeight * 0.015) * 2.5);

		// if(resize){
		// 	this.drawTiles(ai.board[0]);
		// 	this.game.renderer.resize(this.gameWidth, this.gameHeight);
		// 	this.game.background.width = gameWidth;
		// 	this.game.background.height = gameHeight;
		// }

	}
	this.turn = 1;
	this.initSize(width, height, false);
    
    this.icount = 19;
    this.jcount = 19;
    
	this.tiles = new Array(icount);
	for (var i = 0; i < jcount; i++)
		this.tiles[i] = new Array(jcount);
	this.ai = new Logic(this);
	this.ai.nieuwSpel(this.turn);

	this.preload = function()
	{

		game.load.image('blackBeed', 'images/blackBeed.png');
		game.load.image('whiteBeed', 'images/whiteBeed.png');
		game.load.image('whiteBeed', 'images/whiteBeed.png');
		game.load.image('background', 'images/board.png');
	}

	this.create = function()
	{
		this.game.stage.backgroundColor = '#ffffff';
		this.game.background = game.add.sprite(0, 0, 'background');
		this.game.background.width = gameWidth;
		this.game.background.height = gameHeight;

		var board = this.game.add.group();

		for (var i = 0; i < icount; i++) 
			for (var j = 0; j < jcount; j++) {
				tile = board.create(0, 0,'whiteBeed');
				tiles[i][j] = tile;
			}

		for(var i = 0; i < icount; i++)
			for (var j = 0; j < jcount; j++) 
				initTile(tiles[i][j], i, j);
	}
	
	this.game = new Phaser.Game(this.gameWidth, this.gameHeight, Phaser.Auto, 'gameBoard', {preload: this.preload, create: this.create, update: this.update}, true);

	this.initTile = function(tile, xpos, ypos)
	{
		tile.x = xpos*delta[0] + origin[0] - tileSize/2;
		tile.y = ypos*delta[1] + origin[1] - tileSize/2;
		tile.xpos = xpos;
		tile.ypos = ypos; 
		tile.width = tileSize;
		tile.height = tileSize;
		tile.alpha = 0;
		tile.inputEnabled = true;
		tile.events.onInputDown.add(tileClicked);
	}

	this.tileClicked = function(tile)
	{
        this.showAIThink(true);
		this.ai.mouseClicked(tile.ypos, tile.xpos);
        setTimeout(function(_this){return function(){_this.showAIThink(false) }}(this) , 100);


	}
	this.drawTiles = function(pos)
	{
		$(message).html(ai.message);
		pos = this.positionToArray(pos);
		for (var i = 0; i < icount; i++) 
			for (var j = 0; j < jcount; j++)
				switch (pos[i][j]*this.turn){
					case 0:
						tiles[i][j].alpha = 0;
						break;
					case -1:
						tiles[i][j].key = "blackBeed";
						tiles[i][j].alpha = 1;
						tiles[i][j].loadTexture("blackBeed");
						break;
					case +1:
						tiles[i][j].key = "whiteBeed";
						tiles[i][j].alpha = 1;
						tiles[i][j].loadTexture("whiteBeed");
						break;
				}
		// this.showAIThink(false);
	}

	this.positionToArray = function(positionString)
	{
		var output = new Array(icount);
		for (var i = 0; i < icount; i++) {
			output[i] = new Array(jcount);
			for (var j = 0; j < jcount; j++) 
				output[i][j] = positionString[j*icount + i];
		};
		return output;
	}
	this.changeMode = function(mode){
		$(gameModeText).html(mode);
		switch(mode){
			case "bigenner":
				ai.niveau = 1;
				break;
			case "medium":
				ai.niveau = 2;
				break;
			case "advanced":
				ai.niveau = 3;
				break;
		}
	}

	this.showAIThink = function(think){
		if(think)
			$(AIThink).html("Computer Thinking");
		else
			$(AIThink).html("It's your turn");
		console.log(think);
	}

	this.pass = function(){
		this.showAIThink(true);
		setTimeout(function(_this){return function(){_this.ai.pass() }}(this) , 10);
		setTimeout(function(_this){return function(){_this.showAIThink(false) }}(this) , 10);
	}
	
	this.resetWhite = function(){
		this.turn = -1;
		this.showAIThink(true);
		setTimeout(function(_this){return function(){_this.resetAIBlock(_this.ai.board[0]) }}(this) , 20);
		setTimeout(function(_this){return function(){_this.drawTiles(_this.ai.board[0])}}(this) , 30);
		setTimeout(function(_this){return function(){_this.ai.nieuwSpel(_this.turn) }}(this) , 100);
		setTimeout(function(_this){return function(){_this.showAIThink(false) }}(this) , 100);
		setTimeout(function(_this){return function(){_this.drawTiles(_this.ai.board[0])}}(this) , 100);
	}

	this.resetBlack = function(){
		this.turn = 1;
		ai.nieuwSpel(this.turn);
		this.drawTiles(this.ai.board[0]);
	}
	this.resetAIBlock = function(black){
		for (var i = 0; i < black.length; i++) {
			black[i] = 0;
		};
	}

	this.setHandicap = function(handicapNumber){
		ai.message = "Pas van invloed bij nieuw spel!";
		ai.handicap = handicapNumber;
		this.drawTiles(this.ai.board[0]);
	}
}