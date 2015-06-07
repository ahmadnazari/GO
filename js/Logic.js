
function Logic(manager)
{
    this.manager = manager;
    this.message = "";
    this.handicap = 0;
    this.niveau = 1;
    this.showScore = false;
    this.r = new Gaussian();
    this.SKILLLEVEL = 1;
    this.penalty = 0;

    this.board = new Array(6);
    for (var i = 0; i < this.board.length; i++) {
        this.board[i] = new Array(362);
    };


    this.board2 = new Array(6);
    for (var i = 0; i < this.board2.length; i++) {
        this.board2[i] = new Array(362);
    };

    this.board3 = new Array(6);
    for (var i = 0; i < this.board3.length; i++) {
        this.board3[i] = new Array(362);
    };

    this.hypboard = new Array(6);
    for (var i = 0; i < this.hypboard.length; i++) {
        this.hypboard[i] = new Array(362);
    };

    this.oldboard = new Array(6);
    for (var i = 0; i < this.oldboard.length; i++) {
        this.oldboard[i] = new Array(362);
    };

    this.finalscores = new Array(362);
    this.workspace = new Array(362);
    this.workspace2 = new Array(362);
    this.scorelist = new Array(362);
    this.ranking = new Array(11);
    this.candidates = new Array(11);
    this.candidates2 = new Array(11);
    this.verdict = new Array(361);

    this.gp = new Array(11);
    for (var i = 0; i < this.gp.length; i++) {
        this.gp[i] = new Array(362)
    };

    this.gpprobs = new Array(2);
    for (var i = 0; i < this.gpprobs.length; i++) {
        this.gpprobs[i] = new Array(361);
    };

    this.replies = new Array(11);
    this.rvalues = new Array(11);

    this.groups = new Array(2);
    for (var i = 0; i < this.groups.length; i++) {
        this.groups[i] = new Array(7)
        for (var j = 0; j < this.groups[i].length; j++) {
            this.groups[i][j] = new Array(361);
        }
    }

    this.groupscores = new Array(2);
    for (var i = 0; i < this.groupscores.length; i++) {
        this.groupscores[i] = new Array(7)
        for (var j = 0; j < this.groupscores[i].length; j++) {
            this.groupscores[i][j] = new Array(361);
        }
    }

    this.groupinfo = new Array(2);
    for (var i = 0; i < this.groupinfo.length; i++) {
        this.groupinfo[i] = new Array(4)
        for (var j = 0; j < this.groupinfo[i].length; j++) {
            this.groupinfo[i][j] = new Array(361);
        }
    }

    this.finalprobs = new Array(362);

    this.features = new Array(35);
    for (var i = 0; i < this.features.length; i++) {
        this.features[i] = new Array(362);
    };

    this.bfeatures = new Array(12);
    for (var i = 0; i < this.bfeatures.length; i++) {
        this.bfeatures[i] = new Array(362);
    };

    this.bb = new Array(5);
    for (var i = 0; i < this.bb.length; i++) {
        this.bb[i] = new Array(5)
        for (var j = 0; j < this.bb[i].length; j++) {
            this.bb[i][j] = new Array(361);
        }
    }

    this.fix = new Array(361);

    this.features2 = new Array(2);
    for (var i = 0; i < this.features2.length; i++) {
        this.features2[i] = new Array(362);
    };

    this.distances = new Array(2);
    for (var i = 0; i < this.distances.length; i++) {
        this.distances[i] = new Array(361);
    };

    this.un = new Array(361);
    this.rn = new Array(361);
    this.dn = new Array(361);
    this.ln = new Array(361);
    this.edge = new Array(361);
    this.edgenhr = new Array(361);
    this.tested = new Array(362);
    this.lni = new Array(362);
    this.rni = new Array(362);
    this.uni = new Array(362);
    this.dni = new Array(362);
    this.elni = new Array(362);
    this.erni = new Array(362);
    this.euni = new Array(362);
    this.edni = new Array(362);
    this.inner = new Array(361);
    this.enc = new Array(361);
    this.expdmargin = 0;

    this.nieuwSpel = function(turn)
    {

        this.message = "";
        this.speelbaar = true;
        this.showScore = false;
        for(var i = 0; i < 6; i++)
        {
            for(var j2 = 0; j2 < 361; j2++)
            {
                this.board[i][j2] = 0;
                this.hypboard[i][j2] = 0;
                this.board2[i][j2] = 0;
                this.board3[i][j2] = 0;
                this.oldboard[i][j2] = 0;
            }

        }

        this.board[3][10] = 0;
        for(var j = 0; j < 361; j++)
            this.board[4][j] = 512;

        for(var k = 0; k < 361; k++)
        {
            this.finalscores[k] = 512;
            this.scorelist[k] = 0;
            this.verdict[k] = 0;
            this.distances[1][k] = 361;
            this.distances[0][k] = 361;
        }

        this.scorelist[361] = 0;
        this.board[3][0] = -2;
        this.board[3][1] = -2;
        this.board[3][2] = 0;
        this.board[3][3] = 0;
        this.board[3][4] = 361;
        this.board[3][5] = 1;
        this.board[3][6] = -1;
        this.board[3][7] = -1;
        this.board[3][9] = 0;
        this.expdmargin = 0;
        this.tested[361] = true;
        for(var l = 0; l < 361; l++)
            this.tested[l] = false;

        for(var i1 = 0; i1 <= 361; i1++)
        {
            this.euni[i1] = 361;
            this.erni[i1] = 361;
            this.edni[i1] = 361;
            this.elni[i1] = 361;
        }

        for(var j1 = 0; j1 < 361; j1++)
        {
            if(j1 >= 19)
                this.un[j1] = true;
            else
                this.un[j1] = false;
            if(j1 % 19 > 0)
                this.ln[j1] = true;
            else
                this.ln[j1] = false;
            if(j1 < 342)
                this.dn[j1] = true;
            else
                this.dn[j1] = false;
            if((j1 + 1) % 19 > 0)
                this.rn[j1] = true;
            else
                this.rn[j1] = false;
            this.edge[j1] = false;
            this.edgenhr[j1] = false;
            if(!this.un[j1] || !this.rn[j1] || !this.dn[j1] || !this.ln[j1])
                this.edge[j1] = true;
            if(j1 > 19 && j1 < 37)
                this.edgenhr[j1] = true;
            if(j1 > 323 && j1 < 341)
                this.edgenhr[j1] = true;
            if(j1 > 19 && j1 % 19 == 1 && j1 < 342)
                this.edgenhr[j1] = true;
            if(j1 > 19 && j1 % 19 == 17 && j1 < 342)
                this.edgenhr[j1] = true;
            this.inner[j1] = !this.edge[j1];
            this.enc[j1] = this.edge[j1];
            if(j1 == 0 || j1 == 18 || j1 == 342 || j1 == 360)
                this.enc[j1] = false;
        }

        for(var k1 = 0; k1 < 361; k1++)
        {
            if(this.ln[k1])
                this.lni[k1] = k1 - 1;
            else
                this.lni[k1] = 361;
            if(this.rn[k1])
                this.rni[k1] = k1 + 1;
            else
                this.rni[k1] = 361;
            if(this.dn[k1])
                this.dni[k1] = k1 + 19;
            else
                this.dni[k1] = 361;
            if(this.un[k1])
                this.uni[k1] = k1 - 19;
            else
                this.uni[k1] = 361;
        }

        for(var l1 = 0; l1 < 361; l1++)
        {
            if(l1 >= 2 && l1 <= 16)
            {
                this.euni[l1] = this.dni[l1];
                this.erni[l1] = this.lni[l1];
                this.elni[l1] = this.rni[l1];
                this.euni[this.euni[l1]] = this.dni[this.euni[l1]];
                this.erni[this.euni[l1]] = this.lni[this.euni[l1]];
                this.edni[this.euni[l1]] = l1;
                this.elni[this.euni[l1]] = this.rni[this.euni[l1]];
            }
            if(l1 % 19 == 0 && l1 > 19 && l1 < 323)
            {
                this.euni[l1] = this.rni[l1];
                this.erni[l1] = this.dni[l1];
                this.elni[l1] = this.uni[l1];
                this.euni[this.euni[l1]] = this.rni[this.euni[l1]];
                this.erni[this.euni[l1]] = this.dni[this.euni[l1]];
                this.edni[this.euni[l1]] = l1;
                this.elni[this.euni[l1]] = this.uni[this.euni[l1]];
            }
            if(l1 >= 344 && l1 <= 358)
            {
                this.euni[l1] = this.uni[l1];
                this.erni[l1] = this.rni[l1];
                this.elni[l1] = this.lni[l1];
                this.euni[this.euni[l1]] = this.uni[this.euni[l1]];
                this.erni[this.euni[l1]] = this.rni[this.euni[l1]];
                this.edni[this.euni[l1]] = l1;
                this.elni[this.euni[l1]] = this.lni[this.euni[l1]];
            }
            if((l1 + 1) % 19 == 0 && l1 > 38 && l1 < 323)
            {
                this.euni[l1] = this.lni[l1];
                this.erni[l1] = this.uni[l1];
                this.elni[l1] = this.dni[l1];
                this.euni[this.euni[l1]] = this.lni[this.euni[l1]];
                this.erni[this.euni[l1]] = this.uni[this.euni[l1]];
                this.edni[this.euni[l1]] = l1;
                this.elni[this.euni[l1]] = this.dni[this.euni[l1]];
            }
        }

        this.uni[361] = 361;
        this.rni[361] = 361;
        this.dni[361] = 361;
        this.lni[361] = 361;
        for(var i2 = 0; i2 < 362; i2++)
        {
            this.finalprobs[i2] = 0;
            this.finalscores[i2] = 0;
        }

        this.board[0][361] = -2;
        this.board2[0][361] = -2;
        this.board3[0][361] = -2;
        this.hypboard[0][361] = -2;
        this.board[2][361] = -1;
        this.board2[2][361] = -1;
        this.board3[2][361] = -1;
        this.hypboard[2][361] = -1;
        this.board[1][361] = -1;
        this.board2[1][361] = -1;
        this.board3[1][361] = -1;
        this.hypboard[1][361] = -1;
        this.features2[0][361] = 512;
        this.features2[1][361] = 512;
        // TODO
        // this.board[3][8] =  0 ;
        this.board[3][8] = turn == 1 ? 0 : 1;
        // this.board[3][8] = 0;
        this.board[3][5] = this.board[3][8];
        this.board[3][9] = 0;
        this.board[3][0] = -2;
        this.board[3][1] = -2;
        switch(this.handicap)
        {
        case 8: // '\b'
        case 9: // '\t'
            this.pHS(66);
            this.pHS(294);
            // fall through

        case 6: // '\006'
        case 7: // '\007'
            this.pHS(174);
            this.pHS(186);
            // fall through

        case 5: // '\005'
            if(this.handicap != 6 && this.handicap != 8)
                this.pHS(180);
            // fall through

        case 4: // '\004'
            this.pHS(60);
            // fall through

        case 3: // '\003'
            this.pHS(300);
            // fall through

        case 2: // '\002'
            this.pHS(72);
            this.pHS(288);
            break;
        }
        if(this.board[3][5] == 1)
            this.startAI();
    }

    this.pHS = function(i)
    {
       this.manager.drawTiles(this.board[0]);
        this.board[3][5] = this.board[3][8];
        this.applymove(this.board, i, true, false);
    }

    this.pass = function(){
        this.applymove(this.board, 361, false, false);
        if(this.board[3][5] == 1)
            if(this.board[3][0] == 361)
            {
                this.message = "Je past. Einde spel.";
                this.endOfGame();
                this.board[3][11] = 0;
            } else
                this.startAI();
    }

    this.wait = function(i)
    {
        for(l = (new Date()).getMilliseconds() + i; (new Date()).getMilliseconds() < l;);
    }


    this.mouseClicked = function(k, l)
    {
        if(!this.speelbaar)
            return;
        this.board[3][5] = 0;
        this.boardpos = l + 19 * k;
        if(this.board[0][this.boardpos] == 0)
        {
            if(this.board[3][5] == 1)
                this.player = 1;
            else
                this.player = -1;
            this.suicide = true;
            if(this.board[0][this.uni[this.boardpos]] == 0)
                this.suicide = false;
            if(this.board[0][this.rni[this.boardpos]] == 0)
                this.suicide = false;
            if(this.board[0][this.dni[this.boardpos]] == 0)
                this.suicide = false;
            if(this.board[0][this.lni[this.boardpos]] == 0)
                this.suicide = false;
            if(this.board[0][this.uni[this.boardpos]] == this.player && this.board[2][this.uni[this.boardpos]] > 1)
                this.suicide = false;
            if(this.board[0][this.rni[this.boardpos]] == this.player && this.board[2][this.rni[this.boardpos]] > 1)
                this.suicide = false;
            if(this.board[0][this.dni[this.boardpos]] == this.player && this.board[2][this.dni[this.boardpos]] > 1)
                this.suicide = false;
            if(this.board[0][this.lni[this.boardpos]] == this.player && this.board[2][this.lni[this.boardpos]] > 1)
                this.suicide = false;
            if(this.board[0][this.uni[this.boardpos]] == -this.player && this.board[2][this.uni[this.boardpos]] == 1)
                this.suicide = false;
            if(this.board[0][this.rni[this.boardpos]] == -this.player && this.board[2][this.rni[this.boardpos]] == 1)
                this.suicide = false;
            if(this.board[0][this.dni[this.boardpos]] == -this.player && this.board[2][this.dni[this.boardpos]] == 1)
                this.suicide = false;
            if(this.board[0][this.lni[this.boardpos]] == -this.player && this.board[2][this.lni[this.boardpos]] == 1)
                this.suicide = false;
            if(this.suicide)
                this.message = "Geen zelfmoord!";
            if(this.board[3][6] == this.boardpos)
                this.message = "Ko-regel!";
            if(!this.suicide && this.board[3][6] != this.boardpos)
            {
                this.message = "";
                if(this.board[3][5] == 0)
                {
                    for(var i1 = 0; i1 < 6; i1++)
                    {
                        for(var j1 = 0; j1 < 361; j1++)
                            this.oldboard[i1][j1] = this.board[i1][j1];

                    }

                    this.board[3][11] = 1;
                    this.oldboard[3][11] = 0;
                    this.oldmessage = this.message;
                }
                this.applymove(this.board, this.boardpos, true, false);
               this.manager.drawTiles(this.board[0]);
               setTimeout(function(_this){return function(){_this.startAI() }}(this) , 100);
            }
        }
       this.manager.drawTiles(this.board[0]);
    }


    this.startAI = function()
    {
        switch(this.niveau)
        {
        case 1: // '\001'
            this.boardpos = this.findmovebasic();
            break;

        case 2: // '\002'
            this.boardpos = this.findmove();
            break;

        case 3: // '\003'
            this.boardpos = this.findmoveadvanced();
            break;
        }
        if(this.boardpos != 361)
            this.applymove(this.board, this.boardpos, true, false);
        else
        if(this.board[3][1] == 361 && this.board[3][9] > 0)
        {
            this.message = "De computer past. Einde spel.";
            this.endOfGame();
        } else
        {
            this.message = "De computer past.";
            this.applymove(this.board, this.boardpos, true, false);
        }
       this.manager.drawTiles(this.board[0]);
    }

    this.endOfGame = function()
    {
        this.speelbaar = false;
               this.manager.drawTiles(this.board[0]);
        this.makeverdict();
        this.wait(1500);
        this.showScore = true;
               this.manager.drawTiles(this.board[0]);
    }

    this.findmovebasic = function()
    {
        this.makerankorder(this.board);
        this.expdmargin = this.scorelist[this.ranking[1]];
        return this.ranking[1];
    }

    this.findmoveadvanced = function()
    {
        var i = 361;
        var j = 361;
        var k = -369664;
        var l = 369664;
        var k1 = -369664;
        var flag = false;
        this.makerankorder(this.board);
        for(var k2 = 0; k2 <= 10; k2++)
        {
            this.candidates[k2] = this.ranking[k2];
            this.replies[k2] = 0;
            this.rvalues[k2] = 0;
        }

        if(this.candidates[0] > 4)
            this.candidates[0] = 4;
        for(var l2 = 1; l2 <= this.candidates[0]; l2++)
        {
            var i1 = 369664;
            for(var i4 = 0; i4 < 6; i4++)
            {
                for(var j5 = 0; j5 < 361; j5++)
                    this.board2[i4][j5] = this.board[i4][j5];

            }

            this.applymove(this.board2, this.candidates[l2], false, false);
            this.makerankorder(this.board2);
            for(var j4 = 0; j4 <= 10; j4++)
                this.candidates2[j4] = this.ranking[j4];

            for(var k4 = 1; k4 <= this.candidates2[0]; k4++)
            {
                for(var k5 = 0; k5 < 6; k5++)
                {
                    for(var i6 = 0; i6 < 361; i6++)
                        this.board3[k5][i6] = this.board2[k5][i6];

                }

                this.applymove(this.board3, this.candidates2[k4], false, false);
                this.makerankorder(this.board3);
                var l1 = this.scorelist[this.ranking[1]];
                if(l1 < i1)
                {
                    i1 = l1;
                    this.replies[l2] = this.candidates2[k4];
                    this.rvalues[l2] = i1;
                }
            }

            if(i1 > k)
            {
                i = this.candidates[l2];
                j = this.replies[l2];
                this.expdmargin = i1;
                k = i1;
            }
        }

        if(j == this.board[3][6])
            flag = true;
        for(var i3 = 1; i3 <= this.candidates[0]; i3++)
            if(j == this.candidates[i3])
                flag = true;

        if(!flag)
        {
            var j1 = 369664;
            var i2 = -369664;
            for(var j3 = 0; j3 < 6; j3++)
            {
                for(var l4 = 0; l4 < 361; l4++)
                    this.board2[j3][l4] = this.board[j3][l4];

            }

            this.applymove(this.board2, j, false, false);
            this.makerankorder(this.board2);
            for(var k3 = 0; k3 <= 10; k3++)
                this.candidates2[k3] = this.ranking[k3];

            for(var l3 = 1; l3 <= this.candidates2[0]; l3++)
            {
                for(var i5 = 0; i5 < 6; i5++)
                {
                    for(var l5 = 0; l5 < 361; l5++)
                        this.board3[i5][l5] = this.board2[i5][l5];

                }

                this.applymove(this.board3, this.candidates2[l3], false, false);
                this.makerankorder(this.board3);
                var j2 = this.scorelist[this.ranking[1]];
                if(j2 < j1)
                    j1 = j2;
            }

            if(j1 > k)
            {
                i = j;
                this.expdmargin = j1;
            }
        }
        return i;
    }

    this.findmove = function()
    {
        var i = 361;
        var j = 361;
        var k = -369664;
        var flag = false;
        this.makerankorder(this.board);
        for(var i1 = 0; i1 <= 10; i1++)
        {
            this.candidates[i1] = this.ranking[i1];
            this.replies[i1] = 0;
            this.rvalues[i1] = 0;
        }

        if(this.candidates[0] > 8)
            this.candidates[0] = 4;
        for(var j1 = 1; j1 <= this.candidates[0]; j1++)
        {
            for(var i2 = 0; i2 < 6; i2++)
            {
                for(var k2 = 0; k2 < 361; k2++)
                    this.board2[i2][k2] = this.board[i2][k2];

            }

            this.applymove(this.board2, this.candidates[j1], false, false);
            this.makerankorder(this.board2);
            var l = this.scorelist[this.ranking[1]];
            this.replies[j1] = this.ranking[1];
            this.rvalues[j1] = l;
            l -= this.penalty;
            if(l > k)
            {
                k = l;
                i = this.candidates[j1];
                j = this.replies[j1];
                this.expdmargin = l;
            }
        }

        if(j == this.board[3][6])
            flag = true;
        for(var k1 = 1; k1 <= this.candidates[0]; k1++)
            if(j == this.candidates[k1])
                flag = true;

        if(!flag)
        {
            for(var l1 = 0; l1 < 6; l1++)
            {
                for(var j2 = 0; j2 < 361; j2++)
                    this.board2[l1][j2] = this.board[l1][j2];

            }

            this.applymove(this.board2, j, false, false);
            this.makerankorder(this.board2);
            if(this.scorelist[this.ranking[1]] - this.penalty > k)
            {
                i = j;
                this.expdmargin = this.scorelist[this.ranking[1]];
            }
        }
        return i;
    }

    this.makerankorder = function(ai)
    {
        var i = -369664;
        var l = ai[3][6];
        this.penalty = 0;
        for(var i1 = 0; i1 <= 10; i1++)
            this.ranking[i1] = 0;

        ai[3][5] = 1 - ai[3][5];
        ai[3][6] = -1;
        this.makefeatures(ai);
        for(var j1 = 0; j1 < 10; j1++)
        {
            this.makescores(ai);
            this.maketactprobs(ai);
        }

        this.makescores(ai);
        this.makestratprobs(ai);
        this.scorelist[361] = this.getexpdmargin(ai, this.finalscores);
        ai[3][5] = 1 - ai[3][5];
        ai[3][6] = l;
        this.makefeatures(ai);
        this.maketested(ai);
        for(var k1 = 0; k1 <= 361; k1++)
        {
            if(this.tested[k1])
                this.scorelist[k1] = this.getscore(ai, k1);
            if(ai[3][0] >= 0 && ai[3][0] < 361 && this.penalty < 15 * (1024 - this.finalscores[ai[3][0]]))
                this.penalty = 15 * (1024 - this.finalscores[ai[3][0]]);
        }

        for(var l1 = 0; l1 <= 361; l1++)
            this.workspace[l1] = this.scorelist[l1] + Math.round((128 * this.r.nextGaussian()));

        if(ai[3][5] == 0)
        {
            for(var i2 = 0; i2 <= 361; i2++)
                this.workspace[i2] = -this.workspace[i2];

        }
        this.ranking[0] = 0;
        for(var j2 = 1; j2 <= 10; j2++)
        {
            var j = -369664;
            var k = -1;
            for(var k2 = 0; k2 <= 361; k2++)
                if(this.tested[k2] && this.workspace[k2] > j)
                {
                    j = this.workspace[k2];
                    k = k2;
                }

            if(j > -369664)
            {
                this.ranking[0]++;
                this.ranking[this.ranking[0]] = k;
                this.workspace[k] = 369664;
            }
        }

    }

    this.getscore = function(ai, i)
    {
        for(var j = 0; j < 6; j++)
        {
            for(var k = 0; k < 361; k++)
                this.hypboard[j][k] = ai[j][k];

        }

        this.applymove(this.hypboard, i, false, true);
        return this.getexpdmargin(this.hypboard, this.finalscores);
    }

    this.getexpdmargin = function(ai, ai1)
    {
        var k = 0;
        for(var k1 = 0; k1 < 361; k1++)
        {
            if(ai[0][k1] == 0)
            {
                var i = ai1[k1] - 512;
                var j = i;
                if(j < 0)
                    j = -j;
                i = Math.round(0.10000000000000001 * i) + Math.round(0.90000000000000002 * (i * j >> 9));
                var i1 = 1024;
                var l = 0;
                if(this.un[k1] && i1 > ai1[this.uni[k1]])
                    i1 = ai1[this.uni[k1]];
                if(this.rn[k1] && i1 > ai1[this.rni[k1]])
                    i1 = ai1[this.rni[k1]];
                if(this.dn[k1] && i1 > ai1[this.dni[k1]])
                    i1 = ai1[this.dni[k1]];
                if(this.ln[k1] && i1 > ai1[this.lni[k1]])
                    i1 = ai1[this.lni[k1]];
                if(this.un[k1] && l < ai1[this.uni[k1]])
                    l = ai1[this.uni[k1]];
                if(this.rn[k1] && l < ai1[this.rni[k1]])
                    l = ai1[this.rni[k1]];
                if(this.dn[k1] && l < ai1[this.dni[k1]])
                    l = ai1[this.dni[k1]];
                if(this.ln[k1] && l < ai1[this.lni[k1]])
                    l = ai1[this.lni[k1]];
                var j1 = 1024 - (l - i1);
                j1 = j1 * j1 >> 10;
                k += 512 + (i * j1 >> 10);
            }
            if(ai[0][k1] == 1)
                k -= 1024 - this.finalprobs[k1];
            if(ai[0][k1] == -1)
                k += 1024 - this.finalprobs[k1];
        }

        return (2 * k - 1024 * ai[3][4]) + 1024 * (ai[3][2] - ai[3][3]);
    }

    this.makescores = function(ai)
    {
        for(var k = 0; k < 10; k++)
        {
            for(var l = 0; l < 361; l++)
            {
                var j = ai[4][this.dni[l]];
                j += ai[4][this.uni[l]];
                j += ai[4][this.lni[l]];
                j += ai[4][this.rni[l]];
                var i;
                if(this.inner[l])
                    i = 512 + Math.floor(0.99 * ((j >> 2) - 512));
                else
                if(this.enc[l])
                    i = 512 + Math.floor(0.99 * (j / 3 - 512));
                else
                    i = 512 + Math.floor(0.99 * ((j >> 1) - 512));
                switch(ai[0][l])
                {
                default:
                    break;

                case 0: // '\0'
                    ai[4][l] = i;
                    if(this.bfeatures[7][l])
                        if(ai[3][5] == 1)
                            ai[4][l] = 1024 - Math.floor(0.69999999999999996 * (1024 - ai[4][l]));
                        else
                            ai[4][l] = Math.floor(0.69999999999999996 * ai[4][l]);
                    if(this.bfeatures[8][l])
                        if(ai[4][l] < 512)
                            ai[4][l] = Math.floor(1.1000000000000001 * ai[4][l]);
                        else
                            ai[4][l] = Math.floor(102.40000000000001 + ai[4][l] * 0.90000000000000002);
                    if(!this.bfeatures[9][l])
                        break;
                    if(ai[4][l] < 512)
                        ai[4][l] = Math.floor(0.90000000000000002 * ai[4][l]);
                    else
                        ai[4][l] = Math.floor(-102.40000000000001 + ai[4][l] * 1.1000000000000001);
                    break;

                case 1: // '\001'
                    ai[4][l] = ai[5][l] + ((1024 - ai[5][l]) * i >> 10);
                    break;

                case -1: 
                    ai[4][l] = (1024 - ai[5][l]) * i >> 10;
                    break;
                }
            }

        }

    }

    this.makefinalscores = function(ai)
    {
        for(var i2 = 0; i2 < 361; i2++)
            switch(ai[0][i2])
            {
            case 0: // '\0'
                this.finalscores[i2] = ai[4][i2];
                break;

            case 1: // '\001'
                this.finalscores[i2] = this.finalprobs[i2];
                break;

            case -1: 
                this.finalscores[i2] = 1024 - this.finalprobs[i2];
                break;
            }

        for(var j2 = 0; j2 < 10; j2++)
        {
            for(var i3 = 0; i3 < 361; i3++)
            {
                if(ai[0][i3] != 0)
                    continue;
                var j = this.finalscores[this.uni[i3]];
                j += this.finalscores[this.rni[i3]];
                j += this.finalscores[this.dni[i3]];
                j += this.finalscores[this.lni[i3]];
                var i;
                if(this.inner[i3])
                    i = 512 + Math.floor(0.99 * ((j >> 2) - 512));
                else
                if(this.enc[i3])
                    i = 512 + Math.floor(0.99 * (j / 3 - 512));
                else
                    i = 512 + Math.floor(0.99 * ((j >> 1) - 512));
                this.finalscores[i3] = i;
                if(!this.bfeatures[7][i3])
                    continue;
                if(ai[3][5] == 1)
                    this.finalscores[i3] = 1024 - Math.floor(0.5 * (1024 - this.finalscores[i3]));
                else
                    this.finalscores[i3] = Math.floor(0.5 * this.finalscores[i3]);
            }

        }

        for(var k2 = 0; k2 < 361; k2++)
        {
            if(k2 == ai[1][k2] && ai[2][k2] == 1 && ai[0][k2] == 1)
            {
                var k = this.features[21][k2];
                if(ai[3][5] == 0 && this.finalscores[k] > 512)
                    this.finalscores[k] = 512;
                if(this.features[2][k2] == 0 && this.finalscores[k] > 512)
                    this.finalscores[k] = 512;
            }
            if(k2 != ai[1][k2] || ai[2][k2] != 1 || ai[0][k2] != -1)
                continue;
            var l = this.features[21][k2];
            if(ai[3][5] == 1 && this.finalscores[l] < 512)
                this.finalscores[l] = 512;
            if(this.features[2][k2] == 0 && this.finalscores[l] < 512)
                this.finalscores[l] = 512;
        }

        for(var l2 = 0; l2 < 361; l2++)
        {
            if(l2 == ai[1][l2] && ai[2][l2] == 2 && ai[0][l2] == 1)
            {
                var i1 = this.features[21][l2];
                var k1 = this.features[22][l2];
                var flag = false;
                if(this.features[2][l2] > 0)
                    flag = true;
                if(this.bfeatures[2][i1] && this.bfeatures[2][k1])
                    flag = true;
                if(!flag && this.finalscores[i1] > this.finalscores[k1])
                    this.finalscores[i1] = this.finalscores[k1];
                if(!flag && this.finalscores[k1] > this.finalscores[i1])
                    this.finalscores[k1] = this.finalscores[i1];
            }
            if(l2 != ai[1][l2] || ai[2][l2] != 2 || ai[0][l2] != -1)
                continue;
            var j1 = this.features[21][l2];
            var l1 = this.features[22][l2];
            var flag1 = false;
            if(this.features[2][l2] > 0)
                flag1 = true;
            if(this.bfeatures[3][j1] && this.bfeatures[3][l1])
                flag1 = true;
            if(!flag1 && this.finalscores[j1] > this.finalscores[l1])
                this.finalscores[l1] = this.finalscores[j1];
            if(!flag1 && this.finalscores[l1] > this.finalscores[j1])
                this.finalscores[j1] = this.finalscores[l1];
        }

    }

    this.makelinkscores = function(ai)
    {
        for(var k = 0; k < this.fix.length; k++)
            this.fix[k] = false;

        for(var l = 0; l < 361; l++)
        {
            if(ai[0][l] == 1)
            {
                this.fix[l] = true;
                this.finalscores[l] = ai[5][l];
            }
            if(ai[0][l] == -1)
            {
                this.fix[l] = true;
                this.finalscores[l] = 1024 - ai[5][l];
            }
        }

        if(ai[3][5] == 1)
        {
            for(var i1 = 0; i1 < 361; i1++)
            {
                if(ai[0][i1] != 0)
                    continue;
                if(ai[0][this.uni[i1]] == -1)
                {
                    this.fix[i1] = true;
                    this.finalscores[i1] = 1024 - ai[5][this.uni[i1]];
                }
                if(ai[0][this.rni[i1]] == -1)
                {
                    this.fix[i1] = true;
                    this.finalscores[i1] = 1024 - ai[5][this.rni[i1]];
                }
                if(ai[0][this.dni[i1]] == -1)
                {
                    this.fix[i1] = true;
                    this.finalscores[i1] = 1024 - ai[5][this.dni[i1]];
                }
                if(ai[0][this.lni[i1]] == -1)
                {
                    this.fix[i1] = true;
                    this.finalscores[i1] = 1024 - ai[5][this.lni[i1]];
                }
            }

            for(var j1 = 0; j1 < 361; j1++)
                if(ai[0][j1] == 0)
                {
                    if(ai[0][this.uni[j1]] == 1)
                    {
                        this.fix[j1] = true;
                        this.finalscores[j1] = ai[5][this.uni[j1]];
                    }
                    if(ai[0][this.rni[j1]] == 1)
                    {
                        this.fix[j1] = true;
                        this.finalscores[j1] = ai[5][this.rni[j1]];
                    }
                    if(ai[0][this.dni[j1]] == 1)
                    {
                        this.fix[j1] = true;
                        this.finalscores[j1] = ai[5][this.dni[j1]];
                    }
                    if(ai[0][this.lni[j1]] == 1)
                    {
                        this.fix[j1] = true;
                        this.finalscores[j1] = ai[5][this.lni[j1]];
                    }
                }

        } else
        {
            for(var k1 = 0; k1 < 361; k1++)
            {
                if(ai[0][k1] != 0)
                    continue;
                if(ai[0][this.uni[k1]] == 1)
                {
                    this.fix[k1] = true;
                    this.finalscores[k1] = ai[5][this.uni[k1]];
                }
                if(ai[0][this.rni[k1]] == 1)
                {
                    this.fix[k1] = true;
                    this.finalscores[k1] = ai[5][this.rni[k1]];
                }
                if(ai[0][this.dni[k1]] == 1)
                {
                    this.fix[k1] = true;
                    this.finalscores[k1] = ai[5][this.dni[k1]];
                }
                if(ai[0][this.lni[k1]] == 1)
                {
                    this.fix[k1] = true;
                    this.finalscores[k1] = ai[5][this.lni[k1]];
                }
            }

            for(var l1 = 0; l1 < 361; l1++)
            {
                if(ai[0][l1] != 0)
                    continue;
                if(ai[0][this.uni[l1]] == -1)
                {
                    this.fix[l1] = true;
                    this.finalscores[l1] = 1024 - ai[5][this.uni[l1]];
                }
                if(ai[0][this.rni[l1]] == -1)
                {
                    this.fix[l1] = true;
                    this.finalscores[l1] = 1024 - ai[5][this.rni[l1]];
                }
                if(ai[0][this.dni[l1]] == -1)
                {
                    this.fix[l1] = true;
                    this.finalscores[l1] = 1024 - ai[5][this.dni[l1]];
                }
                if(ai[0][this.lni[l1]] == -1)
                {
                    this.fix[l1] = true;
                    this.finalscores[l1] = 1024 - ai[5][this.lni[l1]];
                }
            }

        }
        for(var i2 = 0; i2 < 10; i2++)
        {
            for(var j2 = 0; j2 < 361; j2++)
            {
                if(this.fix[j2])
                    continue;
                var j = this.finalscores[this.uni[j2]];
                j += this.finalscores[this.rni[j2]];
                j += this.finalscores[this.dni[j2]];
                j += this.finalscores[this.lni[j2]];
                var i;
                if(this.inner[j2])
                    i = 512 + Math.floor(0.95 * ((j >> 2) - 512));
                else
                if(this.enc[j2])
                    i = 512 + Math.floor(0.95 * (j / 3 - 512));
                else
                    i = 512 + Math.floor(0.95 * ((j >> 1) - 512));
                this.finalscores[j2] = i;
                if(!this.bfeatures[7][j2])
                    continue;
                if(ai[3][5] == 1)
                    this.finalscores[j2] = 1024 - Math.floor(0.69999999999999996 * (1024 - this.finalscores[j2]));
                else
                    this.finalscores[j2] = Math.floor(0.69999999999999996 * this.finalscores[j2]);
            }

        }

    }

    this.updatescores = function(ai, i, j, k, l)
    {
        for(var l1 = 0; l1 < 10; l1++)
        {
            for(var i2 = i; i2 <= j; i2++)
            {
                for(var j2 = k; j2 <= l; j2++)
                {
                    var i1 = 19 * i2 + j2;
                    var k1 = ai[4][this.dni[i1]];
                    k1 += ai[4][this.uni[i1]];
                    k1 += ai[4][this.lni[i1]];
                    k1 += ai[4][this.rni[i1]];
                    var j1;
                    if(this.inner[i1])
                        j1 = 512 + Math.floor(0.99 * ((k1 >> 2) - 512));
                    else
                    if(this.enc[i1])
                        j1 = 512 + Math.floor(0.99 * (k1 / 3 - 512));
                    else
                        j1 = 512 + Math.floor(0.99 * ((k1 >> 1) - 512));
                    switch(ai[0][i1])
                    {
                    case 0: // '\0'
                        ai[4][i1] = j1;
                        break;

                    case 1: // '\001'
                        ai[4][i1] = ai[5][i1] + ((1024 - ai[5][i1]) * j1 >> 10);
                        break;

                    case -1: 
                        ai[4][i1] = (1024 - ai[5][i1]) * j1 >> 10;
                        break;
                    }
                }

            }

        }

    }

    this.makegroupindices = function(ai, ai1, ai2)
    {
        if(ai[3][5] == 1)
        {
            this.makegroup(ai1, this.groups[1][3], 614);
            this.makegroup(ai2, this.groups[0][3], 614);
            this.makegroup(ai1, this.groups[1][4], 409);
            this.makegroup(ai2, this.groups[0][4], 409);
            this.makegroup(ai1, this.groups[1][5], 256);
            this.makegroup(ai2, this.groups[0][5], 256);
            this.makegroup(ai1, this.groups[1][6], 256);
            this.makegroup(ai2, this.groups[0][6], 256);
        } else
        {
            this.makegroup(ai1, this.groups[1][3], 614);
            this.makegroup(ai2, this.groups[0][3], 614);
            this.makegroup(ai1, this.groups[1][4], 409);
            this.makegroup(ai2, this.groups[0][4], 409);
            this.makegroup(ai1, this.groups[1][5], 256);
            this.makegroup(ai2, this.groups[0][5], 256);
            this.makegroup(ai1, this.groups[1][6], 256);
            this.makegroup(ai2, this.groups[0][6], 256);
        }
        for(var i = 2; i >= 0; i--)
        {
            for(var j = 0; j < 361; j++)
            {
                this.groups[1][i][j] = this.groups[1][i + 1][j];
                this.groups[0][i][j] = this.groups[0][i + 1][j];
            }

            for(var k = 0; k < 361; k++)
            {
                if(this.groups[1][4][k] >= 0 && this.groups[1][i][k] < 0 && ai1[k] > 512 && ai2[k] < 512)
                {
                    if(this.un[k] && this.groups[1][i + 1][this.uni[k]] >= 0)
                        this.groups[1][i][k] = this.groups[1][i + 1][this.uni[k]];
                    if(this.rn[k] && this.groups[1][i + 1][this.rni[k]] >= 0)
                        this.groups[1][i][k] = this.groups[1][i + 1][this.rni[k]];
                    if(this.dn[k] && this.groups[1][i + 1][this.dni[k]] >= 0)
                        this.groups[1][i][k] = this.groups[1][i + 1][this.dni[k]];
                    if(this.ln[k] && this.groups[1][i + 1][this.lni[k]] >= 0)
                        this.groups[1][i][k] = this.groups[1][i + 1][this.lni[k]];
                }
                if(this.groups[0][4][k] < 0 || this.groups[0][i][k] >= 0 || ai2[k] <= 512 || ai1[k] >= 512)
                    continue;
                if(this.un[k] && this.groups[0][i + 1][this.uni[k]] >= 0)
                    this.groups[0][i][k] = this.groups[0][i + 1][this.uni[k]];
                if(this.rn[k] && this.groups[0][i + 1][this.rni[k]] >= 0)
                    this.groups[0][i][k] = this.groups[0][i + 1][this.rni[k]];
                if(this.dn[k] && this.groups[0][i + 1][this.dni[k]] >= 0)
                    this.groups[0][i][k] = this.groups[0][i + 1][this.dni[k]];
                if(this.ln[k] && this.groups[0][i + 1][this.lni[k]] >= 0)
                    this.groups[0][i][k] = this.groups[0][i + 1][this.lni[k]];
            }

        }

    }

    this.makegroup = function(ai, ai1, i)
    {
        for(var j = 0; j < 361; j++)
        {
            this.workspace[j] = j;
            this.workspace2[j] = ai[j];
        }

        this.ws = i;
        for(var k = 0; k < 361; k++)
        {
            if(this.workspace[k] != k)
                continue;
            if(this.workspace2[k] > this.ws)
            {
                this.ws2 = k;
                this.distribute(k);
            } else
            {
                this.workspace[k] = -1;
            }
        }

        for(var l = 0; l < 361; l++)
            ai1[l] = this.workspace[l];

    }

    this.makechainindices = function(ai, ai1, i, flag)
    {
        for(var j = 0; j < 361; j++)
        {
            this.workspace[j] = j;
            if(flag)
                this.workspace2[j] = -ai[j];
            else
                this.workspace2[j] = ai[j];
        }

        if(flag)
            this.ws = -i;
        else
            this.ws = i;
        for(var k = 0; k < 361; k++)
        {
            if(this.workspace[k] != k)
                continue;
            if(this.workspace2[k] > this.ws)
            {
                this.ws2 = k;
                this.distribute(k);
            } else
            {
                this.workspace[k] = -1;
            }
        }

        for(var l = 0; l < 361; l++)
            if(this.workspace2[l] > this.ws)
                ai1[l] = this.workspace[l];

    }

    this.distribute = function(i)
    {
        if(i < 361)
        {
            if(this.workspace2[this.uni[i]] > this.ws && this.workspace[this.uni[i]] > this.ws2)
            {
                this.workspace[this.uni[i]] = this.ws2;
                this.distribute(this.uni[i]);
            }
            if(this.workspace2[this.rni[i]] > this.ws && this.workspace[this.rni[i]] > this.ws2)
            {
                this.workspace[this.rni[i]] = this.ws2;
                this.distribute(this.rni[i]);
            }
            if(this.workspace2[this.dni[i]] > this.ws && this.workspace[this.dni[i]] > this.ws2)
            {
                this.workspace[this.dni[i]] = this.ws2;
                this.distribute(this.dni[i]);
            }
            if(this.workspace2[this.lni[i]] > this.ws && this.workspace[this.lni[i]] > this.ws2)
            {
                this.workspace[this.lni[i]] = this.ws2;
                this.distribute(this.lni[i]);
            }
        }
    }

    this.maketactprobs = function(ai)
    {
        for(var j5 = 0; j5 < 361; j5++)
        {
            this.workspace[j5] = 102 + Math.floor(0.89000000000000001 * ai[5][j5]);
            this.gpprobs[1][j5] = 1024;
            this.gpprobs[0][j5] = 1024;
            ai[5][j5] = 1024;
        }

        for(var k5 = 0; k5 < 361; k5++)
        {
            if(ai[0][k5] != 0)
                continue;
            var i = -1;
            var j = -1;
            var l = -1;
            var k = -1;
            var i1 = -1;
            var j1 = -1;
            var l1 = -1;
            var k1 = -1;
            var l4 = 0;
            var i5 = 0;
            var k4 = 0;
            var k3 = 1024;
            var l3 = 1024;
            var i4 = 0;
            var j4 = 0;
            if(ai[0][this.uni[k5]] == 1)
            {
                i = this.gp[2][this.uni[k5]];
                l4++;
                if(this.workspace[this.uni[k5]] < k3)
                    k3 = this.workspace[this.uni[k5]];
                if(this.workspace[this.uni[k5]] > i4)
                    i4 = this.workspace[this.uni[k5]];
            }
            if(ai[0][this.uni[k5]] == -1)
            {
                i1 = this.gp[3][this.uni[k5]];
                i5++;
                if(this.workspace[this.uni[k5]] < l3)
                    l3 = this.workspace[this.uni[k5]];
                if(this.workspace[this.uni[k5]] > j4)
                    j4 = this.workspace[this.uni[k5]];
            }
            if(ai[0][this.rni[k5]] == 1)
            {
                l = this.gp[2][this.rni[k5]];
                if(l != i)
                    l4++;
                if(this.workspace[this.rni[k5]] < k3)
                    k3 = this.workspace[this.rni[k5]];
                if(this.workspace[this.rni[k5]] > i4)
                    i4 = this.workspace[this.rni[k5]];
            }
            if(ai[0][this.rni[k5]] == -1)
            {
                l1 = this.gp[3][this.rni[k5]];
                if(l1 != i1)
                    i5++;
                if(this.workspace[this.rni[k5]] < l3)
                    l3 = this.workspace[this.rni[k5]];
                if(this.workspace[this.rni[k5]] > j4)
                    j4 = this.workspace[this.rni[k5]];
            }
            if(ai[0][this.dni[k5]] == 1)
            {
                j = this.gp[2][this.dni[k5]];
                if(j != i && j != l)
                    l4++;
                if(this.workspace[this.dni[k5]] < k3)
                    k3 = this.workspace[this.dni[k5]];
                if(this.workspace[this.dni[k5]] > i4)
                    i4 = this.workspace[this.dni[k5]];
            }
            if(ai[0][this.dni[k5]] == -1)
            {
                j1 = this.gp[3][this.dni[k5]];
                if(j1 != i1 && j1 != l1)
                    i5++;
                if(this.workspace[this.dni[k5]] < l3)
                    l3 = this.workspace[this.dni[k5]];
                if(this.workspace[this.dni[k5]] > j4)
                    j4 = this.workspace[this.dni[k5]];
            }
            if(ai[0][this.lni[k5]] == 1)
            {
                k = this.gp[2][this.lni[k5]];
                if(k != i && k != l && k != j)
                    l4++;
                if(this.workspace[this.lni[k5]] < k3)
                    k3 = this.workspace[this.lni[k5]];
                if(this.workspace[this.lni[k5]] > i4)
                    i4 = this.workspace[this.lni[k5]];
            }
            if(ai[0][this.lni[k5]] == -1)
            {
                k1 = this.gp[3][this.lni[k5]];
                if(k1 != i1 && k1 != l1 && k1 != j1)
                    i5++;
                if(this.workspace[this.lni[k5]] < l3)
                    l3 = this.workspace[this.lni[k5]];
                if(this.workspace[this.lni[k5]] > j4)
                    j4 = this.workspace[this.lni[k5]];
            }
            if(this.inner[k5])
                k4 = 4 - (l4 + i5);
            if(this.enc[k5])
                k4 = 3 - (l4 + i5);
            if(!this.inner[k5] && !this.enc[k5])
                k4 = 2 - (l4 + i5);
            var flag = false;
            var k2 = 1024;
            var l2 = 1024;
            if(k4 == 0 && l4 == 1 && i5 > 0)
            {
                if(ai[3][5] == 1)
                    k2 = l3 + j4 >> 1;
                else
                    k2 = j4;
                flag = true;
            }
            if(k4 == 0 && i5 == 1 && l4 > 0)
            {
                if(ai[3][5] == 0)
                    l2 = k3 + i4 >> 1;
                else
                    l2 = i4;
                flag = true;
            }
            if(!flag)
            {
                k2 = 1024 - ai[4][k5];
                l2 = ai[4][k5];
                for(var i7 = 0; i7 <= 1; i7++)
                {
                    var byte0;
                    var i3;
                    var j3;
                    if(i7 == 1)
                    {
                        i3 = k2;
                        byte0 = 27;
                        j3 = 0;
                    } else
                    {
                        i3 = l2;
                        byte0 = 28;
                        j3 = 1;
                    }
                    if(this.features[byte0][k5] >= 1024)
                    {
                        i3 = 51 + Math.floor(0.84999999999999998 * i3);
                        if(i3 < 341)
                            i3 = Math.floor(1.5 * i3);
                        else
                            i3 = 256 + Math.floor(i3 * 0.75);
                    }
                    if(this.features[byte0][k5] < 1024 && this.features[byte0][k5] >= 341)
                    {
                        i3 = 51 + Math.floor(0.84999999999999998 * i3);
                        if(i3 < 512)
                            i3 = Math.floor(1.7 * i3);
                        else
                            i3 = Math.floor(716.79999999999995 + i3 * 0.29999999999999999);
                    }
                    if(this.features[byte0][k5] < 341 && this.features[byte0][k5] >= 170 && this.edge[k5])
                    {
                        i3 = 51 + Math.floor(0.84999999999999998 * i3);
                        i3 = 256 + Math.floor(0.75 * i3);
                        if(i3 < 512)
                            i3 = Math.floor(1.45 * i3);
                        else
                            i3 = Math.floor(460.80000000000001 + i3 * 0.55000000000000004);
                    }
                    if(this.features[byte0][k5] < 341 && this.features[byte0][k5] >= 170 && !this.edge[k5])
                    {
                        i3 = 51 + Math.floor(0.84999999999999998 * i3);
                        if(i3 < 512)
                            i3 = Math.floor(1.2 * i3);
                        else
                            i3 = Math.floor(204.80000000000001 + i3 * 0.80000000000000004);
                    }
                    if(this.features[byte0][k5] < 170 && this.edge[k5])
                    {
                        i3 = 51 + Math.floor(0.84999999999999998 * i3);
                        if(i3 < 102)
                            i3 = 9 * i3;
                        else
                            i3 = 910 + i3 / 9;
                    }
                    if(this.features[byte0][k5] < 170 && this.edgenhr[k5] && ai[3][5] == i7)
                    {
                        i3 = 51 + Math.floor(0.84999999999999998 * i3);
                        if(i3 < 341)
                            i3 = Math.floor(1.8 * i3);
                        else
                            i3 = Math.floor(409.60000000000002 + i3 * 0.59999999999999998);
                    }
                    if(this.features[byte0][k5] < 170 && this.edgenhr[k5] && ai[3][5] == j3)
                    {
                        i3 = 51 + Math.floor(0.84999999999999998 * i3);
                        if(i3 < 341)
                            i3 = Math.floor(2.1000000000000001 * i3);
                        else
                            i3 = Math.floor(563.20000000000005 + i3 * 0.45000000000000001);
                    }
                    if(this.features[byte0][k5] < 170 && this.inner[k5] && ai[3][5] == i7)
                    {
                        i3 = 51 + Math.floor(0.84999999999999998 * i3);
                        if(i3 < 512)
                            i3 = Math.floor(1.45 * i3);
                        else
                            i3 = Math.floor(460.80000000000001 + i3 * 0.55000000000000004);
                    }
                    if(this.features[byte0][k5] < 170 && this.inner[k5] && ai[3][5] == j3)
                    {
                        i3 = 51 + Math.floor(0.84999999999999998 * i3);
                        if(i3 < 512)
                            i3 = Math.floor(1.45 * i3);
                        else
                            i3 = Math.floor(460.80000000000001 + i3 * 0.55000000000000004);
                    }
                    if(i7 == 1)
                        k2 = i3;
                    else
                        l2 = i3;
                }

            }
            if(k4 == 3)
                if(ai[3][5] == 1)
                    k2 = Math.floor(0.90000000000000002 * k2);
                else
                    l2 = Math.floor(0.90000000000000002 * l2);
            if(i >= 0)
                this.gpprobs[1][i] = this.gpprobs[1][i] * k2 >> 10;
            if(l >= 0 && l != i)
                this.gpprobs[1][l] = this.gpprobs[1][l] * k2 >> 10;
            if(j >= 0 && j != i && j != l)
                this.gpprobs[1][j] = this.gpprobs[1][j] * k2 >> 10;
            if(k >= 0 && k != i && k != l && k != j)
                this.gpprobs[1][k] = this.gpprobs[1][k] * k2 >> 10;
            if(i1 >= 0)
                this.gpprobs[0][i1] = this.gpprobs[0][i1] * l2 >> 10;
            if(l1 >= 0 && l1 != i1)
                this.gpprobs[0][l1] = this.gpprobs[0][l1] * l2 >> 10;
            if(j1 >= 0 && j1 != i1 && j1 != l1)
                this.gpprobs[0][j1] = this.gpprobs[0][j1] * l2 >> 10;
            if(k1 >= 0 && k1 != i1 && k1 != l1 && k1 != j1)
                this.gpprobs[0][k1] = this.gpprobs[0][k1] * l2 >> 10;
        }

        for(var l5 = 0; l5 < 361; l5++)
        {
            if(this.gp[8][l5] == 0)
                continue;
            var i2 = this.gp[6][l5];
            var j2 = this.gp[7][l5];
            if(this.gp[8][l5] > 1)
                this.gpprobs[1][i2] = Math.floor((this.gpprobs[1][i2] * this.workspace[j2]) * 0.0009765625);
            if(this.gp[8][l5] == 1)
                this.gpprobs[1][i2] = Math.floor(this.gpprobs[1][i2] * (0.5 + ((this.workspace[j2] * 0.0009765625) / 2.0)));
            if(this.gp[8][l5] < -1)
                this.gpprobs[0][j2] = Math.floor(this.gpprobs[0][j2] * this.workspace[i2] * 0.0009765625);
            if(this.gp[8][l5] == -1)
                this.gpprobs[0][j2] = Math.floor(this.gpprobs[0][j2] * (0.5 + ((this.workspace[i2] * 0.0009765625) / 2.0)));
        }

        for(var i6 = 0; i6 < 361; i6++)
        {
            if(ai[0][i6] == 1)
                ai[5][i6] = this.gpprobs[1][this.gp[2][i6]];
            if(ai[0][i6] == -1)
                ai[5][i6] = this.gpprobs[0][this.gp[3][i6]];
        }

        for(var j6 = 0; j6 < 361; j6++)
            if(ai[0][j6] != 0)
                ai[5][j6] = 1024 - ai[5][j6];

        for(var k6 = 0; k6 < 361; k6++)
            if(ai[0][k6] != 0 && this.bfeatures[4][k6] && ai[5][k6] > 128)
                ai[5][k6] = 128;

        if(ai[3][6] >= 0)
            if(ai[3][5] == 0)
                ai[5][ai[3][0]] = 1024;
            else
                ai[5][ai[3][1]] = 1024;
        for(var l6 = 0; l6 < 361; l6++)
        {
            if(ai[5][l6] < 0)
                ai[5][l6] = 0;
            if(ai[5][l6] > 1024)
                ai[5][l6] = 1024;
        }

    }

    this.makestratprobs = function(ai)
    {
        this.makefeatures2(ai);
        this.makegroupindices(ai, this.features2[0], this.features2[1]);
        for(var k1 = 0; k1 < this.groupscores.length; k1++)
        {
            for(var j1 = 0; j1 < this.groupscores[k1].length; j1++)
            {
                for(var i = 0; i < this.groupscores[k1][j1].length; i++)
                    this.groupscores[k1][j1][i] = 0;

            }

        }

        for(var j = 0; j < 361; j++)
        {
            if(this.groups[1][0][j] >= 0)
            {
                var l3 = this.groups[1][0][j];
                this.groupscores[1][5][l3] += this.features[27][j];
            }
            if(this.groups[0][0][j] >= 0)
            {
                var i4 = this.groups[0][0][j];
                this.groupscores[0][5][i4] += this.features[28][j];
            }
        }

        for(var k = 0; k < 361; k++)
        {
            for(var i5 = 0; i5 <= 1; i5++)
            {
                var j5 = 1 - i5;
                var k5 = 2 * i5 - 1;
                var l5 = 2 * j5 - 1;
                var flag;
                if(i5 == 1)
                    flag = false;
                else
                    flag = true;
                var j4 = this.groups[i5][0][k];
                var k4 = this.groups[i5][4][k];
                var l4 = this.groups[i5][5][k];
                if(ai[0][k] == l5 && j4 >= 0)
                {
                    var l2 = 0;
                    var j3 = 0;
                    var l1 = 1024 - ai[5][k];
                    if(ai[0][this.uni[k]] == l5)
                        l2++;
                    if(ai[0][this.rni[k]] == l5)
                        l2++;
                    if(ai[0][this.dni[k]] == l5)
                        l2++;
                    if(ai[0][this.lni[k]] == l5)
                        l2++;
                    if(ai[0][this.uni[this.lni[k]]] == l5 && ai[5][this.uni[this.lni[k]]] > 512)
                        j3++;
                    if(ai[0][this.uni[this.rni[k]]] == l5 && ai[5][this.uni[this.rni[k]]] > 512)
                        j3++;
                    if(ai[0][this.dni[this.lni[k]]] == l5 && ai[5][this.dni[this.lni[k]]] > 512)
                        j3++;
                    if(ai[0][this.dni[this.rni[k]]] == l5 && ai[5][this.dni[this.rni[k]]] > 512)
                        j3++;
                    if(this.inner[k] && j3 > 1)
                        l1 = 0;
                    if(!this.inner[k] && j3 > 0)
                        l1 = 0;
                    switch(l2)
                    {
                    case 1: // '\001'
                        l1 /= 2;
                        break;

                    case 2: // '\002'
                        l1 /= 4;
                        break;

                    default:
                        l1 = 0;
                        break;

                    case 0: // '\0'
                        break;
                    }
                    this.groupscores[i5][4][j4] += l1;
                    this.groupscores[i5][0][j4] += l1;
                    this.groupscores[i5][1][k4] += l1;
                    this.groupscores[i5][2][l4] += l1;
                }
                if(ai[0][k] != 0 || j4 < 0)
                    continue;
                var i3 = 0;
                var k3 = 0;
                var i2;
                if(i5 == 1)
                    i2 = ai[4][k];
                else
                    i2 = 1024 - ai[4][k];
                if(ai[0][this.lni[k]] == 0)
                    i3++;
                if(ai[0][this.rni[k]] == 0)
                    i3++;
                if(ai[0][this.uni[k]] == 0)
                    i3++;
                if(ai[0][this.dni[k]] == 0)
                    i3++;
                if(ai[0][this.uni[k]] == l5)
                    k3 += 2;
                if(ai[0][this.rni[k]] == l5)
                    k3 += 2;
                if(ai[0][this.dni[k]] == l5)
                    k3 += 2;
                if(ai[0][this.lni[k]] == l5)
                    k3 += 2;
                if(ai[0][this.uni[this.lni[k]]] == l5 && ai[5][this.uni[this.lni[k]]] > 512)
                    k3++;
                if(ai[0][this.uni[this.rni[k]]] == l5 && ai[5][this.uni[this.rni[k]]] > 512)
                    k3++;
                if(ai[0][this.dni[this.lni[k]]] == l5 && ai[5][this.dni[this.lni[k]]] > 512)
                    k3++;
                if(ai[0][this.dni[this.rni[k]]] == l5 && ai[5][this.dni[this.rni[k]]] > 512)
                    k3++;
                if(this.inner[k] && k3 > 1)
                    i2 = 0;
                if(!this.inner[k] && k3 > 0)
                    i2 = 0;
                switch(i3)
                {
                case 0: // '\0'
                    this.groupscores[i5][4][j4] += i2;
                    break;

                case 1: // '\001'
                    this.groupscores[i5][4][j4] += i2 / 2;
                    break;

                case 2: // '\002'
                    this.groupscores[i5][4][j4] += i2 / 3;
                    break;

                case 3: // '\003'
                    this.groupscores[i5][4][j4] += i2 / 4;
                    break;

                default:
                    this.groupscores[i5][4][j4] += i2 / 6;
                    break;
                }
                if(i3 > 1 && ai[3][5] == i5 && this.groupscores[i5][3][j4] < i2 / 3)
                    this.groupscores[i5][3][j4] = i2 / 3;
                this.groupscores[i5][0][j4] += i2;
                this.groupscores[i5][1][k4] += i2;
                this.groupscores[i5][2][l4] += i2;
            }

        }

        for(var l = 0; l < 361; l++)
        {
            this.groupscores[1][4][l] += this.groupscores[1][3][l];
            this.groupscores[0][4][l] += this.groupscores[0][3][l];
        }

        this.makegroupinfo(ai);
        for(var i1 = 0; i1 < 361; i1++)
        {
            var byte0 = -1;
            var byte1 = -1;
            if(ai[0][i1] == 1)
            {
                byte0 = 1;
                byte1 = 0;
            }
            if(ai[0][i1] == -1)
            {
                byte0 = 0;
                byte1 = 1;
            }
            if(byte0 < 0)
                continue;
            var j2 = this.groupinfo[byte0][1][this.groups[byte0][0][i1]];
            var k2 = 1024;
            if(this.groups[byte1][0][i1] >= 0)
                k2 = this.groupinfo[byte1][1][this.groups[byte1][0][i1]];
            if(j2 < 1024)
            {
                this.finalprobs[i1] = ai[5][i1];
                if(this.finalprobs[i1] > j2)
                    this.finalprobs[i1] = j2;
            } else
            {
                this.finalprobs[i1] = ai[5][i1];
            }
            if(k2 < 1024)
                this.finalprobs[i1] = 1024 - (k2 * (1024 - this.finalprobs[i1]) >> 10);
        }

        this.makefinalscores(ai);
    }

    this.makegroupinfo = function(ai)
    {
        var k4 = 0;
        var j5 = 0;
        var flag = false;
        for(var k = 0; k <= 1; k++)
        {
            for(var j6 = 0; j6 < 361; j6++)
            {
                this.groupinfo[k][0][j6] = -1;
                this.groupinfo[k][1][j6] = 0;
                this.groupinfo[k][2][j6] = 0;
                this.groupinfo[k][3][j6] = 0;
            }

        }

        for(var k6 = 0; k6 < 361; k6++)
        {
            if(ai[0][k6] == 1)
            {
                var i3 = this.groups[1][0][k6];
                if(ai[5][k6] > this.groupinfo[1][3][i3])
                    this.groupinfo[1][3][i3] = ai[5][k6];
            }
            if(ai[0][k6] != -1)
                continue;
            var j3 = this.groups[0][0][k6];
            if(ai[5][k6] > this.groupinfo[0][3][j3])
                this.groupinfo[0][3][j3] = ai[5][k6];
        }

        for(var l6 = 0; l6 < 361; l6++)
        {
            for(var j2 = 0; j2 <= 1; j2++)
            {
                if(this.groups[j2][0][l6] != l6)
                    continue;
                var i = this.groupscores[j2][0][this.groups[j2][0][l6]];
                var l = this.groupscores[j2][1][this.groups[j2][4][l6]];
                var j1 = this.groupscores[j2][2][this.groups[j2][5][l6]];
                var k1 = this.groupscores[j2][4][this.groups[j2][0][l6]];
                var i6 = this.groupscores[j2][5][this.groups[j2][0][l6]];
                var l1 = i / 4;
                if(l1 < k1)
                    l1 = k1;
                l1 -= 1024;
                if(l1 < 0)
                    l1 = 0;
                l1 = Math.floor(l1 * 0.69999999999999996);
                if(l1 > 921)
                {
                    l1 -= 921;
                    l1 /= 10;
                    l1 += 921;
                }
                if(l1 > 1024)
                    l1 = 1024;
                var i2;
                if(j1 < i + 2048)
                    i2 = l1;
                else
                if(l < i + 2048)
                {
                    i2 = 341 + Math.floor(l1 * 0.29999999999999999);
                    if(i2 < l1)
                        i2 = l1;
                } else
                {
                    i2 = 512 + Math.floor(l1 * 0.29999999999999999);
                    if(i2 < l1)
                        i2 = l1;
                }
                if(ai[3][5] == j2 && i6 > 1526)
                    i2 = 1024;
                if(ai[3][5] != j2 && i6 > 2038)
                    i2 = 1024;
                this.groupinfo[j2][1][l6] = i2;
            }

        }

        var k2 = 0;
        for(var i7 = 0; i7 < 19; i7++)
        {
            for(var j = 0; j < 19; j++)
            {
                var k3 = i7 * 19 + j;
                var l2 = 0;
                var l3 = -1;
                var i4 = -1;
                if(this.rn[k3])
                {
                    l3 = this.rni[k3];
                    l2++;
                }
                if(this.dn[k3])
                {
                    l2++;
                    if(l3 >= 0)
                        i4 = this.dni[k3];
                    else
                        l3 = this.dni[k3];
                }
                for(var i1 = 0; i1 < l2; i1++)
                {
                    var j4;
                    if(i1 == 0)
                        j4 = l3;
                    else
                        j4 = i4;
                    var flag1 = false;
                    if(this.groups[1][0][k3] >= 0 && this.groups[0][0][k3] < 0)
                        k4 = this.groups[1][0][k3];
                    else
                        flag1 = true;
                    if(this.groups[0][0][j4] >= 0 && this.groups[1][0][j4] < 0)
                        j5 = this.groups[0][0][j4];
                    else
                        flag1 = true;
                    if(!flag1)
                    {
                        for(i1 = 0; i1 < k2; i1++)
                            if(!flag1 && this.groupinfo[0][0][2 * i1] == k4 && this.groupinfo[0][0][2 * i1 + 1] == j5)
                                flag1 = true;

                        if(!flag1)
                        {
                            this.groupinfo[0][0][2 * k2] = k4;
                            this.groupinfo[0][0][2 * k2 + 1] = j5;
                            k2++;
                        }
                    }
                    flag1 = false;
                    if(this.groups[1][0][j4] >= 0 && this.groups[0][0][j4] < 0)
                        k4 = this.groups[1][0][j4];
                    else
                        flag1 = true;
                    if(this.groups[0][0][k3] >= 0 && this.groups[1][0][k3] < 0)
                        j5 = this.groups[0][0][k3];
                    else
                        flag1 = true;
                    if(flag1)
                        continue;
                    for(i1 = 0; i1 < k2; i1++)
                        if(!flag1 && this.groupinfo[0][0][2 * i1] == k4 && this.groupinfo[0][0][2 * i1 + 1] == j5)
                            flag1 = true;

                    if(!flag1)
                    {
                        this.groupinfo[0][0][2 * k2] = k4;
                        this.groupinfo[0][0][2 * k2 + 1] = j5;
                        k2++;
                    }
                }

            }

        }

        for(var j7 = 0; j7 < 361; j7++)
        {
            if(ai[0][j7] != 0)
                continue;
            var l4 = -1;
            var k5 = -1;
            if(this.un[j7] && this.groups[1][0][this.uni[j7]] >= 0)
                l4 = this.groups[1][0][this.uni[j7]];
            if(this.un[j7] && this.groups[0][0][this.uni[j7]] >= 0)
                k5 = this.groups[0][0][this.uni[j7]];
            if(this.rn[j7] && this.groups[1][0][this.rni[j7]] >= 0)
                l4 = this.groups[1][0][this.rni[j7]];
            if(this.rn[j7] && this.groups[0][0][this.rni[j7]] >= 0)
                k5 = this.groups[0][0][this.rni[j7]];
            if(this.dn[j7] && this.groups[1][0][this.dni[j7]] >= 0)
                l4 = this.groups[1][0][this.dni[j7]];
            if(this.dn[j7] && this.groups[0][0][this.dni[j7]] >= 0)
                k5 = this.groups[0][0][this.dni[j7]];
            if(this.ln[j7] && this.groups[1][0][this.lni[j7]] >= 0)
                l4 = this.groups[1][0][this.lni[j7]];
            if(this.ln[j7] && this.groups[0][0][this.lni[j7]] >= 0)
                k5 = this.groups[0][0][this.lni[j7]];
            if(this.groups[1][0][j7] >= 0)
                l4 = this.groups[1][0][j7];
            if(this.groups[0][0][j7] >= 0)
                k5 = this.groups[0][0][j7];
            if(l4 >= 0)
                this.groupinfo[1][2][l4]++;
            if(k5 >= 0)
                this.groupinfo[0][2][k5]++;
        }

        for(var k7 = 0; k7 < 361; k7++)
        {
            if(k7 == this.groups[1][0][k7])
            {
                this.groupinfo[1][3][k7] = this.groupinfo[1][3][k7] * this.groupinfo[1][3][k7] >> 10;
                this.groupinfo[1][3][k7] = 1024 - ((1024 - this.groupinfo[1][1][k7]) * this.groupinfo[1][3][k7] >> 10);
            }
            if(k7 == this.groups[0][0][k7])
            {
                this.groupinfo[0][3][k7] = this.groupinfo[0][3][k7] * this.groupinfo[0][3][k7] >> 10;
                this.groupinfo[0][3][k7] = 1024 - ((1024 - this.groupinfo[0][1][k7]) * this.groupinfo[0][3][k7] >> 10);
            }
        }

        for(var l7 = 0; l7 < 361; l7++)
        {
            if(this.groupinfo[1][3][l7] > 1024)
                this.groupinfo[1][3][l7] = 1024;
            if(this.groupinfo[0][3][l7] > 1024)
                this.groupinfo[0][3][l7] = 1024;
        }

        for(var i8 = 0; i8 < 179; i8++)
        {
            if(this.groupinfo[0][0][2 * i8] < 0 || this.groupinfo[0][0][2 * i8 + 1] < 0)
                continue;
            var i5 = this.groupinfo[0][0][2 * i8];
            var l5 = this.groupinfo[0][0][2 * i8 + 1];
            if(this.groupinfo[1][2][i5] - this.groupinfo[0][2][l5] > 2)
                this.groupinfo[1][1][i5] = 1024 - ((1024 - this.groupinfo[1][1][i5]) * this.groupinfo[0][3][l5] >> 10);
            if(this.groupinfo[1][2][i5] - this.groupinfo[0][2][l5] == 2)
                this.groupinfo[1][1][i5] = 1024 - ((1024 - this.groupinfo[1][1][i5]) * (((512 + this.groupinfo[0][3][l5]) * 2) / 3) >> 10);
            if(this.groupinfo[1][2][i5] - this.groupinfo[0][2][l5] == 1)
                this.groupinfo[1][1][i5] = 1024 - ((1024 - this.groupinfo[1][1][i5]) * Math.floor((1024 + this.groupinfo[0][3][l5]) * 0.5) >> 10);
            if(this.groupinfo[1][2][i5] - this.groupinfo[0][2][l5] < -2)
                this.groupinfo[0][1][l5] = 1024 - ((1024 - this.groupinfo[0][1][l5]) * this.groupinfo[1][3][i5] >> 10);
            if(this.groupinfo[1][2][i5] - this.groupinfo[0][2][l5] == -2)
                this.groupinfo[0][1][l5] = 1024 - ((1024 - this.groupinfo[0][1][l5]) * (((512 + this.groupinfo[1][3][i5]) * 2) / 3) >> 10);
            if(this.groupinfo[1][2][i5] - this.groupinfo[0][2][l5] == -1)
                this.groupinfo[0][1][l5] = 1024 - ((1024 - this.groupinfo[0][1][l5]) * Math.floor((1024 + this.groupinfo[1][3][i5]) * 0.5) >> 10);
        }

    }

    this.applymove = function(ai, i, flag, flag1)
    {
        var i5 = i;
        var j6 = 0;
        var k6 = 0;
        var l6 = 0;
        var flag2 = false;
        var flag7 = false;
        flag1 = false;
        if(ai[0][i] != 0)
            i = 361;
        if(ai[3][6] == i)
            i = 361;
        ai[3][9]++;
        if(i != 361)
            ai[3][4]--;
        ai[3][6] = -1;
        ai[3][7] = -1;
        if(ai[3][5] == 1)
        {
            ai[3][0] = i;
            if(i != 361)
                ai[0][i] = 1;
        } else
        {
            ai[3][1] = i;
            if(i != 361)
                ai[0][i] = -1;
        }
        if(i != 361)
        {
            ai[1][i] = i;
            if(ai[0][this.uni[i]] == ai[0][i])
            {
                var i4;
                var j5;
                if(ai[1][i] < ai[1][this.uni[i]])
                {
                    j5 = ai[1][i];
                    i4 = ai[1][this.uni[i]];
                } else
                {
                    j5 = ai[1][this.uni[i]];
                    i4 = ai[1][i];
                }
                for(var j = 0; j < 361; j++)
                    if(ai[1][j] == i4)
                        ai[1][j] = j5;

            }
            if(ai[0][this.rni[i]] == ai[0][i])
            {
                var j4;
                var k5;
                if(ai[1][i] < ai[1][this.rni[i]])
                {
                    k5 = ai[1][i];
                    j4 = ai[1][this.rni[i]];
                } else
                {
                    k5 = ai[1][this.rni[i]];
                    j4 = ai[1][i];
                }
                for(var k = 0; k < 361; k++)
                    if(ai[1][k] == j4)
                        ai[1][k] = k5;

            }
            if(ai[0][this.dni[i]] == ai[0][i])
            {
                var k4;
                var l5;
                if(ai[1][i] < ai[1][this.dni[i]])
                {
                    l5 = ai[1][i];
                    k4 = ai[1][this.dni[i]];
                } else
                {
                    l5 = ai[1][this.dni[i]];
                    k4 = ai[1][i];
                }
                for(var l = 0; l < 361; l++)
                    if(ai[1][l] == k4)
                        ai[1][l] = l5;

            }
            if(ai[0][this.lni[i]] == ai[0][i])
            {
                var l4;
                var i6;
                if(ai[1][i] < ai[1][this.lni[i]])
                {
                    i6 = ai[1][i];
                    l4 = ai[1][this.lni[i]];
                } else
                {
                    i6 = ai[1][this.lni[i]];
                    l4 = ai[1][i];
                }
                for(var i1 = 0; i1 < 361; i1++)
                    if(ai[1][i1] == l4)
                        ai[1][i1] = i6;

            }
            for(var j1 = 0; j1 < 361; j1++)
                if(ai[0][j1] != 0 && ai[1][j1] == ai[1][i])
                    l6++;

            for(var k1 = 0; k1 < 361; k1++)
                ai[2][k1] = 0;

            for(var l1 = 0; l1 < 361; l1++)
            {
                if(ai[0][l1] != 0)
                    continue;
                var i7 = -1;
                var j9 = -1;
                var k8 = -1;
                var l7 = -1;
                if(ai[0][this.uni[l1]] != 0)
                    i7 = ai[1][this.uni[l1]];
                if(ai[0][this.rni[l1]] != 0)
                    j9 = ai[1][this.rni[l1]];
                if(ai[0][this.dni[l1]] != 0)
                    l7 = ai[1][this.dni[l1]];
                if(ai[0][this.lni[l1]] != 0)
                    k8 = ai[1][this.lni[l1]];
                if(i7 >= 0)
                    ai[2][i7]++;
                if(j9 >= 0 && j9 != i7)
                    ai[2][j9]++;
                if(l7 >= 0 && l7 != i7 && l7 != j9)
                    ai[2][l7]++;
                if(k8 >= 0 && k8 != i7 && k8 != j9 && k8 != l7)
                    ai[2][k8]++;
            }

            if(ai[3][5] == 1)
            {
                for(var i2 = 0; i2 < 361; i2++)
                    if(ai[0][i2] == -1 && ai[2][ai[1][i2]] == 0)
                    {
                        ai[0][i2] = 0;
                        ai[1][i2] = -1;
                        ai[3][4]++;
                        j6++;
                        k6 = i2;
                        ai[3][2]++;
                    }

            }
            if(ai[3][5] == 0)
            {
                for(var j2 = 0; j2 < 361; j2++)
                    if(ai[0][j2] == 1 && ai[2][ai[1][j2]] == 0)
                    {
                        ai[0][j2] = 0;
                        ai[1][j2] = -1;
                        ai[3][4]++;
                        j6++;
                        k6 = j2;
                        ai[3][3]++;
                    }

            }
            if(j6 > 0)
            {
                for(var k2 = 0; k2 < 361; k2++)
                    ai[2][k2] = 0;

                for(var l2 = 0; l2 < 361; l2++)
                {
                    if(ai[0][l2] != 0)
                        continue;
                    var j7 = -1;
                    var k9 = -1;
                    var l8 = -1;
                    var i8 = -1;
                    if(ai[0][this.uni[l2]] != 0)
                        j7 = ai[1][this.uni[l2]];
                    if(ai[0][this.rni[l2]] != 0)
                        k9 = ai[1][this.rni[l2]];
                    if(ai[0][this.dni[l2]] != 0)
                        i8 = ai[1][this.dni[l2]];
                    if(ai[0][this.lni[l2]] != 0)
                        l8 = ai[1][this.lni[l2]];
                    if(j7 >= 0)
                        ai[2][j7]++;
                    if(k9 >= 0 && k9 != j7)
                        ai[2][k9]++;
                    if(i8 >= 0 && i8 != j7 && i8 != k9)
                        ai[2][i8]++;
                    if(l8 >= 0 && l8 != j7 && l8 != k9 && l8 != i8)
                        ai[2][l8]++;
                }

            }
            if(l6 == 1 && ai[2][ai[1][i]] == 1 && j6 == 1)
            {
                ai[3][6] = k6;
                ai[3][7] = i;
            }
            for(var i3 = 0; i3 < 361; i3++)
            {
                if(ai[0][i3] == 0 || ai[2][ai[1][i3]] != 0)
                    continue;
                ai[0][i3] = 0;
                ai[3][4]++;
                ai[1][i3] = -1;
                flag7 = true;
                if(ai[3][5] == 1)
                    ai[3][3]++;
                else
                    ai[3][2]++;
            }

            if(flag7)
            {
                for(var j3 = 0; j3 < 361; j3++)
                    ai[2][j3] = 0;

                for(var k3 = 0; k3 < 361; k3++)
                {
                    if(ai[0][k3] != 0)
                        continue;
                    var k7 = -1;
                    var l9 = -1;
                    var i9 = -1;
                    var j8 = -1;
                    if(ai[0][this.uni[k3]] != 0)
                        k7 = ai[1][this.uni[k3]];
                    if(ai[0][this.rni[k3]] != 0)
                        l9 = ai[1][this.rni[k3]];
                    if(ai[0][this.dni[k3]] != 0)
                        j8 = ai[1][this.dni[k3]];
                    if(ai[0][this.lni[k3]] != 0)
                        i9 = ai[1][this.lni[k3]];
                    if(k7 >= 0)
                        ai[2][k7]++;
                    if(l9 >= 0 && l9 != k7)
                        ai[2][l9]++;
                    if(j8 >= 0 && j8 != k7 && j8 != l9)
                        ai[2][j8]++;
                    if(i9 >= 0 && i9 != k7 && i9 != l9 && i9 != j8)
                        ai[2][i9]++;
                }

            }
            for(var l3 = 0; l3 < 361; l3++)
                if(ai[0][l3] != 0)
                    ai[2][l3] = ai[2][ai[1][l3]];

            ai[3][15] = 0;
            if(ai[0][this.uni[i]] == -ai[0][i] && ai[2][this.uni[i]] == 1)
            {
                var flag3 = true;
                ai[3][15]++;
                ai[3][15 + ai[3][15]] = ai[1][this.uni[i]];
            }
            if(ai[0][this.rni[i]] == -ai[0][i] && ai[2][this.rni[i]] == 1 && ai[1][this.rni[i]] != ai[1][this.uni[i]])
            {
                var flag4 = true;
                ai[3][15]++;
                ai[3][15 + ai[3][15]] = ai[1][this.rni[i]];
            }
            if(ai[0][this.dni[i]] == -ai[0][i] && ai[2][this.dni[i]] == 1 && ai[1][this.dni[i]] != ai[1][this.uni[i]] && ai[1][this.dni[i]] != ai[1][this.rni[i]])
            {
                var flag5 = true;
                ai[3][15]++;
                ai[3][15 + ai[3][15]] = ai[1][this.dni[i]];
            }
            if(ai[0][this.lni[i]] == -ai[0][i] && ai[2][this.lni[i]] == 1 && ai[1][this.lni[i]] != ai[1][this.uni[i]] && ai[1][this.lni[i]] != ai[1][this.rni[i]] && ai[1][this.lni[i]] != ai[1][this.dni[i]])
            {
                var flag6 = true;
                ai[3][15]++;
                ai[3][15 + ai[3][15]] = ai[1][this.lni[i]];
            }
        }
        ai[3][5] = 1 - ai[3][5];
        this.makefeatures(ai);
        if(i == 361)
            flag1 = false;
        if(ai[3][10] == 1)
            flag1 = false;
        if(!flag1)
        {
            for(var i12 = 0; i12 < 5; i12++)
            {
                this.makescores(ai);
                this.maketactprobs(ai);
            }

            this.makescores(ai);
            this.makestratprobs(ai);
        } else
        {
            var i11;
            if(i >= 38)
                i11 = i / 19 - 2;
            else
                i11 = 0;
            var k11;
            if(i < 323)
                k11 = i / 19 + 2;
            else
                k11 = 18;
            var i10;
            if(i % 19 >= 2)
                i10 = i % 19 - 2;
            else
                i10 = 0;
            var k10;
            if(i % 19 < 17)
                k10 = i % 19 + 2;
            else
                k10 = 18;
            var j11;
            if(i >= 95)
                j11 = i / 19 - 5;
            else
                j11 = 0;
            var l11;
            if(i < 266)
                l11 = i / 19 + 5;
            else
                l11 = 18;
            var j10;
            if(i % 19 >= 5)
                j10 = i % 19 - 5;
            else
                j10 = 0;
            var l10;
            if(i % 19 < 14)
                l10 = i % 19 + 5;
            else
                l10 = 18;
            this.updatescores(ai, i11, k11, i10, k10);
            this.maketactprobs(ai);
            this.updatescores(ai, i11, k11, i10, k10);
            this.maketactprobs(ai);
            this.updatescores(ai, j11, l11, j10, l10);
            this.maketactprobs(ai);
            this.updatescores(ai, i11, k11, i10, k10);
            this.maketactprobs(ai);
            this.updatescores(ai, j11, l11, j10, l10);
            this.maketactprobs(ai);
            this.makescores(ai);
            this.makestratprobs(ai);
        }
    }

    this.removestone = function(ai, i)
    {
        var j = i;
        var flag = false;
        var flag1 = false;
        var flag2 = false;
        ai[3][4]++;
        ai[3][6] = -1;
        ai[3][7] = -1;
        ai[0][i] = 0;
        ai[1][i] = -1;
        ai[2][i] = 0;
        this.makechainindices(ai[0], ai[1], 0, true);
        this.makechainindices(ai[0], ai[1], 0, false);
        for(var k1 = 0; k1 < 361; k1++)
            ai[2][k1] = 0;

        for(var l1 = 0; l1 < 361; l1++)
        {
            if(ai[0][l1] != 0)
                continue;
            var k = -1;
            var j1 = -1;
            var i1 = -1;
            var l = -1;
            if(ai[0][this.uni[l1]] != 0)
                k = ai[1][this.uni[l1]];
            if(ai[0][this.rni[l1]] != 0)
                j1 = ai[1][this.rni[l1]];
            if(ai[0][this.dni[l1]] != 0)
                l = ai[1][this.dni[l1]];
            if(ai[0][this.lni[l1]] != 0)
                i1 = ai[1][this.lni[l1]];
            if(k >= 0)
                ai[2][k]++;
            if(j1 >= 0 && j1 != k)
                ai[2][j1]++;
            if(l >= 0 && l != k && l != j1)
                ai[2][l]++;
            if(i1 >= 0 && i1 != k && i1 != j1 && i1 != l)
                ai[2][i1]++;
        }

        for(var i2 = 0; i2 < 361; i2++)
            if(ai[0][i2] != 0)
                ai[2][i2] = ai[2][ai[1][i2]];

    }

    this.makegp = function(ai)
    {
        var flag = false;
        var byte0 = 0;
        var byte1 = 0;
        var byte2 = 0;
        var byte3 = 0;
        var byte4 = 0;
        var byte5 = 0;
        for(var k2 = 0; k2 < this.gp.length; k2++)
        {
            for(var i4 = 0; i4 < this.gp[k2].length; i4++)
                this.gp[k2][i4] = 0;

        }

        for(var l2 = 0; l2 < 361; l2++)
        {
            if(ai[0][l2] == 1)
            {
                if(this.bfeatures[4][l2])
                    this.gp[1][l2] = 1;
                else
                    this.gp[0][l2] = 1;
                if(this.bfeatures[5][l2])
                    this.gp[1][l2] = 1;
                else
                    this.gp[0][l2] = 1;
            }
            if(ai[0][l2] == -1)
            {
                if(this.bfeatures[4][l2])
                    this.gp[0][l2] = 1;
                else
                    this.gp[1][l2] = 1;
                if(this.bfeatures[5][l2])
                    this.gp[0][l2] = 1;
                else
                    this.gp[1][l2] = 1;
            }
            if(ai[0][l2] != 0)
                continue;
            if(this.bfeatures[2][l2])
                this.gp[0][l2] = 1;
            if(this.bfeatures[3][l2])
                this.gp[1][l2] = 1;
            if(ai[0][this.uni[l2]] == 1)
            {
                if(ai[0][this.lni[l2]] == 1 && ai[0][this.uni[this.lni[l2]]] == 0)
                    if(!this.bfeatures[2][l2] && (ai[0][this.rni[l2]] == 1 || ai[0][this.dni[l2]] == 1))
                        this.gp[0][this.uni[this.lni[l2]]] = 1;
                    else
                        this.gp[0][l2] = 1;
                if(ai[0][this.rni[l2]] == 1 && ai[0][this.uni[this.rni[l2]]] == 0)
                    if(!this.bfeatures[2][l2] && (ai[0][this.lni[l2]] == 1 || ai[0][this.dni[l2]] == 1))
                        this.gp[0][this.uni[this.rni[l2]]] = 1;
                    else
                        this.gp[0][l2] = 1;
            }
            if(ai[0][this.uni[l2]] == -1)
            {
                if(ai[0][this.lni[l2]] == -1 && ai[0][this.uni[this.lni[l2]]] == 0)
                    if(!this.bfeatures[3][l2] && (ai[0][this.rni[l2]] == -1 || ai[0][this.dni[l2]] == -1))
                        this.gp[1][this.uni[this.lni[l2]]] = 1;
                    else
                        this.gp[1][l2] = 1;
                if(ai[0][this.rni[l2]] == -1 && ai[0][this.uni[this.rni[l2]]] == 0)
                    if(!this.bfeatures[3][l2] && (ai[0][this.lni[l2]] == -1 || ai[0][this.dni[l2]] == -1))
                        this.gp[1][this.uni[this.rni[l2]]] = 1;
                    else
                        this.gp[1][l2] = 1;
            }
            if(ai[0][this.uni[l2]] == 1 && ai[0][this.dni[l2]] == 1 && !this.bfeatures[4][this.uni[l2]] && !this.bfeatures[4][this.dni[l2]])
            {
                if(ai[0][this.rni[l2]] == 0 && ai[0][this.uni[this.rni[l2]]] == 1 && ai[0][this.dni[this.rni[l2]]] == 1)
                    this.gp[0][l2] = 1;
                if(ai[0][this.lni[l2]] == 0 && ai[0][this.rni[l2]] == 0)
                {
                    if(ai[0][this.uni[this.rni[l2]]] == 1 && ai[0][this.dni[this.rni[l2]]] == 0)
                        this.gp[0][l2] = 1;
                    if(ai[0][this.dni[this.rni[l2]]] == 1 && ai[0][this.uni[this.rni[l2]]] == 0)
                        this.gp[0][l2] = 1;
                    if(ai[0][this.uni[this.lni[l2]]] == 1 && ai[0][this.dni[this.lni[l2]]] == 0)
                        this.gp[0][l2] = 1;
                    if(ai[0][this.dni[this.lni[l2]]] == 1 && ai[0][this.uni[this.lni[l2]]] == 0)
                        this.gp[0][l2] = 1;
                }
            }
            if(ai[0][this.lni[l2]] == 1 && ai[0][this.rni[l2]] == 1 && !this.bfeatures[4][this.lni[l2]] && !this.bfeatures[4][this.rni[l2]])
            {
                if(ai[0][this.dni[l2]] == 0 && ai[0][this.lni[this.dni[l2]]] == 1 && ai[0][this.rni[this.dni[l2]]] == 1)
                    this.gp[0][l2] = 1;
                if(ai[0][this.uni[l2]] == 0 && ai[0][this.dni[l2]] == 0)
                {
                    if(ai[0][this.rni[this.uni[l2]]] == 1 && ai[0][this.lni[this.uni[l2]]] == 0)
                        this.gp[0][l2] = 1;
                    if(ai[0][this.lni[this.uni[l2]]] == 1 && ai[0][this.rni[this.uni[l2]]] == 0)
                        this.gp[0][l2] = 1;
                    if(ai[0][this.rni[this.dni[l2]]] == 1 && ai[0][this.lni[this.dni[l2]]] == 0)
                        this.gp[0][l2] = 1;
                    if(ai[0][this.lni[this.dni[l2]]] == 1 && ai[0][this.rni[this.dni[l2]]] == 0)
                        this.gp[0][l2] = 1;
                }
            }
            if(ai[0][this.uni[l2]] == -1 && ai[0][this.dni[l2]] == -1 && !this.bfeatures[4][this.uni[l2]] && !this.bfeatures[4][this.dni[l2]])
            {
                if(ai[0][this.rni[l2]] == 0 && ai[0][this.uni[this.rni[l2]]] == -1 && ai[0][this.dni[this.rni[l2]]] == -1)
                    this.gp[1][l2] = 1;
                if(ai[0][this.lni[l2]] == 0 && ai[0][this.rni[l2]] == 0)
                {
                    if(ai[0][this.uni[this.rni[l2]]] == -1 && ai[0][this.dni[this.rni[l2]]] == 0)
                        this.gp[1][l2] = 1;
                    if(ai[0][this.dni[this.rni[l2]]] == -1 && ai[0][this.uni[this.rni[l2]]] == 0)
                        this.gp[1][l2] = 1;
                    if(ai[0][this.uni[this.lni[l2]]] == -1 && ai[0][this.dni[this.lni[l2]]] == 0)
                        this.gp[1][l2] = 1;
                    if(ai[0][this.dni[this.lni[l2]]] == -1 && ai[0][this.uni[this.lni[l2]]] == 0)
                        this.gp[1][l2] = 1;
                }
            }
            if(ai[0][this.lni[l2]] == -1 && ai[0][this.rni[l2]] == -1 && !this.bfeatures[4][this.lni[l2]] && !this.bfeatures[4][this.rni[l2]])
            {
                if(ai[0][this.dni[l2]] == 0 && ai[0][this.lni[this.dni[l2]]] == -1 && ai[0][this.rni[this.dni[l2]]] == -1)
                    this.gp[1][l2] = 1;
                if(ai[0][this.uni[l2]] == 0 && ai[0][this.dni[l2]] == 0)
                {
                    if(ai[0][this.rni[this.uni[l2]]] == -1 && ai[0][this.lni[this.uni[l2]]] == 0)
                        this.gp[1][l2] = 1;
                    if(ai[0][this.lni[this.uni[l2]]] == -1 && ai[0][this.rni[this.uni[l2]]] == 0)
                        this.gp[1][l2] = 1;
                    if(ai[0][this.rni[this.dni[l2]]] == -1 && ai[0][this.lni[this.dni[l2]]] == 0)
                        this.gp[1][l2] = 1;
                    if(ai[0][this.lni[this.dni[l2]]] == -1 && ai[0][this.rni[this.dni[l2]]] == 0)
                        this.gp[1][l2] = 1;
                }
            }
            if(this.enc[l2] && ai[0][this.euni[l2]] == 1 && ai[2][this.euni[l2]] > 2 && ai[0][this.erni[l2]] == 0 && ai[0][this.euni[this.erni[l2]]] == 0)
            {
                if(ai[0][this.erni[this.erni[l2]]] == 1 && ai[2][this.erni[this.erni[l2]]] > 2)
                {
                    this.gp[0][l2] = 1;
                    this.gp[0][this.erni[l2]] = 1;
                }
                if(ai[0][this.erni[this.erni[l2]]] == 0 && ai[0][this.erni[this.erni[this.erni[l2]]]] == 1 && this.features[13][this.euni[this.erni[this.erni[l2]]]] > 2 && ai[2][this.erni[this.erni[this.erni[l2]]]] > 2)
                {
                    this.gp[0][l2] = 1;
                    this.gp[0][this.erni[l2]] = 1;
                    this.gp[0][this.erni[this.erni[l2]]] = 1;
                }
            }
            if(this.enc[l2] && ai[0][this.euni[l2]] == 1 && ai[2][this.euni[l2]] > 2 && ai[0][this.elni[l2]] == 0 && ai[0][this.euni[this.elni[l2]]] == 0)
            {
                if(ai[0][this.elni[this.elni[l2]]] == 1 && ai[2][this.elni[this.elni[l2]]] > 2)
                {
                    this.gp[0][l2] = 1;
                    this.gp[0][this.elni[l2]] = 1;
                }
                if(ai[0][this.elni[this.elni[l2]]] == 0 && ai[0][this.elni[this.elni[this.elni[l2]]]] == 1 && this.features[13][this.euni[this.elni[this.elni[l2]]]] > 2 && ai[2][this.elni[this.elni[this.elni[l2]]]] > 2)
                {
                    this.gp[0][l2] = 1;
                    this.gp[0][this.elni[l2]] = 1;
                    this.gp[0][this.elni[this.elni[l2]]] = 1;
                }
            }
            if(this.enc[l2] && ai[0][this.euni[l2]] == -1 && ai[2][this.euni[l2]] > 2 && ai[0][this.erni[l2]] == 0 && ai[0][this.euni[this.erni[l2]]] == 0)
            {
                if(ai[0][this.erni[this.erni[l2]]] == -1 && ai[2][this.erni[this.erni[l2]]] > 2)
                {
                    this.gp[1][l2] = 1;
                    this.gp[1][this.erni[l2]] = 1;
                }
                if(ai[0][this.erni[this.erni[l2]]] == 0 && ai[0][this.erni[this.erni[this.erni[l2]]]] == -1 && this.features[14][this.euni[this.erni[this.erni[l2]]]] > 2 && ai[2][this.erni[this.erni[this.erni[l2]]]] > 2)
                {
                    this.gp[1][l2] = 1;
                    this.gp[1][this.erni[l2]] = 1;
                    this.gp[1][this.erni[this.erni[l2]]] = 1;
                }
            }
            if(!this.enc[l2] || ai[0][this.euni[l2]] != -1 || ai[2][this.euni[l2]] <= 2 || ai[0][this.elni[l2]] != 0 || ai[0][this.euni[this.elni[l2]]] != 0)
                continue;
            if(ai[0][this.elni[this.elni[l2]]] == -1 && ai[2][this.elni[this.elni[l2]]] > 2)
            {
                this.gp[1][l2] = 1;
                this.gp[1][this.elni[l2]] = 1;
            }
            if(ai[0][this.elni[this.elni[l2]]] == 0 && ai[0][this.elni[this.elni[this.elni[l2]]]] == -1 && this.features[14][this.euni[this.elni[this.elni[l2]]]] > 2 && ai[2][this.elni[this.elni[this.elni[l2]]]] > 2)
            {
                this.gp[1][l2] = 1;
                this.gp[1][this.elni[l2]] = 1;
                this.gp[1][this.elni[this.elni[l2]]] = 1;
            }
        }

        this.makegroup(this.gp[0], this.gp[2], 0);
        this.makegroup(this.gp[1], this.gp[3], 0);
        for(var i3 = 0; i3 < 361; i3++)
        {
            if(ai[0][i3] == 0 || !this.bfeatures[4][i3])
                continue;
            if(ai[0][i3] == 1)
                this.gp[2][i3] = ai[1][i3];
            if(ai[0][i3] == -1)
                this.gp[3][i3] = ai[1][i3];
        }

        for(var j3 = 0; j3 < 361; j3++)
        {
            for(var j4 = 0; j4 <= 1; j4++)
            {
                if(j4 == 0)
                {
                    byte0 = 3;
                    byte1 = 3;
                    byte2 = 5;
                    byte3 = -1;
                    byte4 = 9;
                    byte5 = 10;
                }
                if(j4 == 1)
                {
                    byte0 = 2;
                    byte1 = 2;
                    byte2 = 4;
                    byte3 = 1;
                    byte4 = 8;
                    byte5 = 9;
                }
                if(ai[0][j3] != 0 || !this.bfeatures[byte0][j3] && this.gp[byte1][j3] != -1)
                    continue;
                if(this.un[j3] && ai[0][this.uni[j3]] == byte3)
                {
                    var flag1 = false;
                    if(!this.bfeatures[byte0][j3] && ai[2][this.uni[j3]] == 2 && j3 == this.features[21][this.uni[j3]] && this.bfeatures[byte0][this.features[22][this.uni[j3]]])
                        flag1 = true;
                    if(!this.bfeatures[byte0][j3] && ai[2][this.uni[j3]] == 2 && j3 == this.features[22][this.uni[j3]] && this.bfeatures[byte0][this.features[21][this.uni[j3]]])
                        flag1 = true;
                    if(!flag1)
                    {
                        this.gp[byte2][this.gp[byte1][this.uni[j3]]]++;
                        if(this.dn[j3] && ai[0][this.dni[j3]] == 0 && this.ln[j3] && ai[0][this.lni[j3]] == 0 && ai[0][this.lni[this.uni[j3]]] != ai[0][this.uni[j3]] && this.rn[j3] && ai[0][this.rni[j3]] == 0 && ai[0][this.rni[this.uni[j3]]] != ai[0][this.uni[j3]])
                        {
                            this.gp[byte2][this.gp[byte1][this.uni[j3]]]++;
                            this.bfeatures[byte4][j3] = true;
                            this.gp[byte5][this.gp[byte1][this.uni[j3]]]++;
                        }
                    }
                }
                if(this.rn[j3] && ai[0][this.rni[j3]] == byte3)
                {
                    var flag2 = false;
                    if(!this.bfeatures[byte0][j3] && ai[2][this.rni[j3]] == 2 && j3 == this.features[21][this.rni[j3]] && this.bfeatures[byte0][this.features[22][this.rni[j3]]])
                        flag2 = true;
                    if(!this.bfeatures[byte0][j3] && ai[2][this.rni[j3]] == 2 && j3 == this.features[22][this.rni[j3]] && this.bfeatures[byte0][this.features[21][this.rni[j3]]])
                        flag2 = true;
                    if(this.gp[byte1][this.rni[j3]] == this.gp[byte1][this.uni[j3]] && ai[0][this.uni[j3]] == byte3)
                        flag2 = true;
                    if(!flag2)
                    {
                        this.gp[byte2][this.gp[byte1][this.rni[j3]]]++;
                        if(this.ln[j3] && ai[0][this.lni[j3]] == 0 && this.un[j3] && ai[0][this.uni[j3]] == 0 && ai[0][this.uni[this.rni[j3]]] != ai[0][this.rni[j3]] && this.dn[j3] && ai[0][this.dni[j3]] == 0 && ai[0][this.dni[this.rni[j3]]] != ai[0][this.rni[j3]])
                        {
                            this.gp[byte2][this.gp[byte1][this.rni[j3]]]++;
                            this.bfeatures[byte4][j3] = true;
                            this.gp[byte5][this.gp[byte1][this.rni[j3]]]++;
                        }
                    }
                }
                if(this.dn[j3] && ai[0][this.dni[j3]] == byte3)
                {
                    var flag3 = false;
                    if(!this.bfeatures[byte0][j3] && ai[2][this.dni[j3]] == 2 && j3 == this.features[21][this.dni[j3]] && this.bfeatures[byte0][this.features[22][this.dni[j3]]])
                        flag3 = true;
                    if(!this.bfeatures[byte0][j3] && ai[2][this.dni[j3]] == 2 && j3 == this.features[22][this.dni[j3]] && this.bfeatures[byte0][this.features[21][this.dni[j3]]])
                        flag3 = true;
                    if(this.gp[byte1][this.dni[j3]] == this.gp[byte1][this.uni[j3]] && ai[0][this.uni[j3]] == byte3)
                        flag3 = true;
                    if(this.gp[byte1][this.dni[j3]] == this.gp[byte1][this.rni[j3]] && ai[0][this.rni[j3]] == byte3)
                        flag3 = true;
                    if(!flag3)
                    {
                        this.gp[byte2][this.gp[byte1][this.dni[j3]]]++;
                        if(this.un[j3] && ai[0][this.uni[j3]] == 0 && this.ln[j3] && ai[0][this.lni[j3]] == 0 && ai[0][this.lni[this.dni[j3]]] != ai[0][this.dni[j3]] && this.rn[j3] && ai[0][this.rni[j3]] == 0 && ai[0][this.rni[this.dni[j3]]] != ai[0][this.dni[j3]])
                        {
                            this.gp[byte2][this.gp[byte1][this.dni[j3]]]++;
                            this.bfeatures[byte4][j3] = true;
                            this.gp[byte5][this.gp[byte1][this.dni[j3]]]++;
                        }
                    }
                }
                if(!this.ln[j3] || ai[0][this.lni[j3]] != byte3)
                    continue;
                var flag4 = false;
                if(!this.bfeatures[byte0][j3] && ai[2][this.lni[j3]] == 2 && j3 == this.features[21][this.lni[j3]] && this.bfeatures[byte0][this.features[22][this.lni[j3]]])
                    flag4 = true;
                if(!this.bfeatures[byte0][j3] && ai[2][this.lni[j3]] == 2 && j3 == this.features[22][this.lni[j3]] && this.bfeatures[byte0][this.features[21][this.lni[j3]]])
                    flag4 = true;
                if(this.gp[byte1][this.lni[j3]] == this.gp[byte1][this.uni[j3]] && ai[0][this.uni[j3]] == byte3)
                    flag4 = true;
                if(this.gp[byte1][this.lni[j3]] == this.gp[byte1][this.rni[j3]] && ai[0][this.rni[j3]] == byte3)
                    flag4 = true;
                if(this.gp[byte1][this.lni[j3]] == this.gp[byte1][this.dni[j3]] && ai[0][this.dni[j3]] == byte3)
                    flag4 = true;
                if(flag4)
                    continue;
                this.gp[byte2][this.gp[byte1][this.lni[j3]]]++;
                if(this.rn[j3] && ai[0][this.rni[j3]] == 0 && this.un[j3] && ai[0][this.uni[j3]] == 0 && ai[0][this.uni[this.lni[j3]]] != ai[0][this.lni[j3]] && this.dn[j3] && ai[0][this.dni[j3]] == 0 && ai[0][this.dni[this.lni[j3]]] != ai[0][this.lni[j3]])
                {
                    this.gp[byte2][this.gp[byte1][this.lni[j3]]]++;
                    this.bfeatures[byte4][j3] = true;
                    this.gp[byte5][this.gp[byte1][this.lni[j3]]]++;
                }
            }

        }

        var i = 0;
        for(var k3 = 0; k3 < 19; k3++)
        {
            for(var k4 = 0; k4 < 19; k4++)
            {
                var j = k3 * 19 + k4;
                var l = j;
                if(this.rn[j])
                    l = this.rni[j];
                var j1 = j;
                if(this.dn[j])
                    j1 = this.dni[j];
                if(ai[0][j] * ai[0][l] == -1)
                {
                    var flag5 = false;
                    var k1;
                    var i2;
                    if(ai[0][j] == 1)
                    {
                        k1 = this.gp[2][j];
                        i2 = this.gp[3][l];
                    } else
                    {
                        k1 = this.gp[2][l];
                        i2 = this.gp[3][j];
                    }
                    for(var l4 = 0; l4 < i; l4++)
                        if(!flag5 && this.gp[6][l4] == k1 && this.gp[7][l4] == i2)
                            flag5 = true;

                    if(!flag5)
                    {
                        this.gp[6][i] = k1;
                        this.gp[7][i] = i2;
                        i++;
                    }
                }
                if(ai[0][j] * ai[0][j1] != -1)
                    continue;
                var flag6 = false;
                var l1;
                var j2;
                if(ai[0][j] == 1)
                {
                    l1 = this.gp[2][j];
                    j2 = this.gp[3][j1];
                } else
                {
                    l1 = this.gp[2][j1];
                    j2 = this.gp[3][j];
                }
                for(var i5 = 0; i5 < i; i5++)
                    if(!flag6 && this.gp[6][i5] == l1 && this.gp[7][i5] == j2)
                        flag6 = true;

                if(!flag6)
                {
                    this.gp[6][i] = l1;
                    this.gp[7][i] = j2;
                    i++;
                }
            }

        }

        for(var l3 = 0; l3 < i; l3++)
        {
            var k = this.gp[6][l3];
            var i1 = this.gp[7][l3];
            this.gp[8][l3] = 2 * (this.gp[4][k] - this.gp[5][i1]);
            if(ai[3][5] == 1)
            {
                this.gp[8][l3]++;
                if(this.gp[10][i1] == 1)
                    this.gp[8][l3] += 2;
                if(this.bfeatures[4][i1])
                    this.gp[8][l3] = 4;
                continue;
            }
            this.gp[8][l3]--;
            if(this.gp[9][k] == 1)
                this.gp[8][l3] -= 2;
            if(this.bfeatures[4][k])
                this.gp[8][l3] = -4;
        }

    }

    this.makebb = function(ai)
    {
        for(var i = 0; i < this.bb.length; i++)
        {
            for(var k = 0; k < this.bb[i].length; k++)
            {
                for(var l = 0; l < this.bb[i][k].length; l++)
                    this.bb[i][k][l] = false;

            }

        }

        for(var j = 0; j < 361; j++)
        {
            if(ai[0][j] == 0)
                this.bb[2][4][j] = true;
            if(this.un[j] && ai[0][this.uni[j]] == 0)
                this.bb[2][0][j] = true;
            if(this.rn[j] && ai[0][this.rni[j]] == 0)
                this.bb[2][1][j] = true;
            if(this.dn[j] && ai[0][this.dni[j]] == 0)
                this.bb[2][2][j] = true;
            if(this.ln[j] && ai[0][this.lni[j]] == 0)
                this.bb[2][3][j] = true;
            if(ai[0][j] == 1)
                this.bb[1][4][j] = true;
            if(this.un[j] && ai[0][this.uni[j]] == 1)
                this.bb[1][0][j] = true;
            if(this.rn[j] && ai[0][this.rni[j]] == 1)
                this.bb[1][1][j] = true;
            if(this.dn[j] && ai[0][this.dni[j]] == 1)
                this.bb[1][2][j] = true;
            if(this.ln[j] && ai[0][this.lni[j]] == 1)
                this.bb[1][3][j] = true;
            if(ai[0][j] == -1)
                this.bb[0][4][j] = true;
            if(this.un[j] && ai[0][this.uni[j]] == -1)
                this.bb[0][0][j] = true;
            if(this.rn[j] && ai[0][this.rni[j]] == -1)
                this.bb[0][1][j] = true;
            if(this.dn[j] && ai[0][this.dni[j]] == -1)
                this.bb[0][2][j] = true;
            if(this.ln[j] && ai[0][this.lni[j]] == -1)
                this.bb[0][3][j] = true;
            if(ai[3][5] == 1)
            {
                if(ai[0][j] == 1)
                    this.bb[3][4][j] = true;
                if(this.un[j] && ai[0][this.uni[j]] == 1)
                    this.bb[3][0][j] = true;
                if(this.rn[j] && ai[0][this.rni[j]] == 1)
                    this.bb[3][1][j] = true;
                if(this.dn[j] && ai[0][this.dni[j]] == 1)
                    this.bb[3][2][j] = true;
                if(this.ln[j] && ai[0][this.lni[j]] == 1)
                    this.bb[3][3][j] = true;
                if(ai[0][j] == -1)
                    this.bb[4][4][j] = true;
                if(this.un[j] && ai[0][this.uni[j]] == -1)
                    this.bb[4][0][j] = true;
                if(this.rn[j] && ai[0][this.rni[j]] == -1)
                    this.bb[4][1][j] = true;
                if(this.dn[j] && ai[0][this.dni[j]] == -1)
                    this.bb[4][2][j] = true;
                if(this.ln[j] && ai[0][this.lni[j]] == -1)
                    this.bb[4][3][j] = true;
                continue;
            }
            if(ai[0][j] == -1)
                this.bb[3][4][j] = true;
            if(this.un[j] && ai[0][this.uni[j]] == -1)
                this.bb[3][0][j] = true;
            if(this.rn[j] && ai[0][this.rni[j]] == -1)
                this.bb[3][1][j] = true;
            if(this.dn[j] && ai[0][this.dni[j]] == -1)
                this.bb[3][2][j] = true;
            if(this.ln[j] && ai[0][this.lni[j]] == -1)
                this.bb[3][3][j] = true;
            if(ai[0][j] == 1)
                this.bb[4][4][j] = true;
            if(this.un[j] && ai[0][this.uni[j]] == 1)
                this.bb[4][0][j] = true;
            if(this.rn[j] && ai[0][this.rni[j]] == 1)
                this.bb[4][1][j] = true;
            if(this.dn[j] && ai[0][this.dni[j]] == 1)
                this.bb[4][2][j] = true;
            if(this.ln[j] && ai[0][this.lni[j]] == 1)
                this.bb[4][3][j] = true;
        }

    }

    this.makefeatures = function(ai)
    {
        var byte0 = 0;
        var byte1 = 0;
        var byte2 = 0;
        var byte5 = 0;
        var byte8 = 0;
        var byte11 = 0;
        var byte14 = 0;
        var byte15 = 0;
        var byte16 = 0;
        var byte17 = 0;
        for(var i12 = 0; i12 <= 10; i12++)
        {
            for(var l17 = 0; l17 < this.features[i12].length; l17++)
                this.features[i12][l17] = 0;

        }

        for(var j12 = 0; j12 < this.bfeatures.length; j12++)
        {
            for(var i18 = 0; i18 < this.bfeatures[j12].length; i18++)
                this.bfeatures[j12][i18] = false;

        }

        this.makebb(ai);
        for(var k12 = 0; k12 < 361; k12++)
        {
            for(var j18 = 0; j18 <= 3; j18++)
            {
                if(this.bb[2][j18][k12])
                    this.features[7][k12]++;
                if(this.bb[3][j18][k12])
                    this.features[8][k12]++;
                if(this.bb[4][j18][k12])
                    this.features[9][k12]++;
            }

        }

        for(var l12 = 0; l12 < 361; l12++)
        {
            if(!this.bb[2][4][l12])
                continue;
            if(this.bb[3][0][l12] || this.bb[4][0][l12])
            {
                var j4 = ai[1][this.uni[l12]];
                this.features[4][j4]++;
                if(this.features[4][j4] == 1)
                    this.features[21][j4] = l12;
                if(this.features[4][j4] == 2)
                    this.features[22][j4] = l12;
                if(this.features[4][j4] == 3)
                    this.features[23][j4] = l12;
                if(this.features[4][j4] == 4)
                    this.features[24][j4] = l12;
            }
            if(this.bb[3][1][l12] || this.bb[4][1][l12])
            {
                var k4 = ai[1][this.rni[l12]];
                if(k4 != ai[1][this.uni[l12]])
                {
                    this.features[4][k4]++;
                    if(this.features[4][k4] == 1)
                        this.features[21][k4] = l12;
                    if(this.features[4][k4] == 2)
                        this.features[22][k4] = l12;
                    if(this.features[4][k4] == 3)
                        this.features[23][k4] = l12;
                    if(this.features[4][k4] == 4)
                        this.features[24][k4] = l12;
                }
            }
            if(this.bb[3][2][l12] || this.bb[4][2][l12])
            {
                var l4 = ai[1][this.dni[l12]];
                if(l4 != ai[1][this.uni[l12]] && l4 != ai[1][this.rni[l12]])
                {
                    this.features[4][l4]++;
                    if(this.features[4][l4] == 1)
                        this.features[21][l4] = l12;
                    if(this.features[4][l4] == 2)
                        this.features[22][l4] = l12;
                    if(this.features[4][l4] == 3)
                        this.features[23][l4] = l12;
                    if(this.features[4][l4] == 4)
                        this.features[24][l4] = l12;
                }
            }
            if(!this.bb[3][3][l12] && !this.bb[4][3][l12])
                continue;
            var i5 = ai[1][this.lni[l12]];
            if(i5 == ai[1][this.uni[l12]] || i5 == ai[1][this.rni[l12]] || i5 == ai[1][this.dni[l12]])
                continue;
            this.features[4][i5]++;
            if(this.features[4][i5] == 1)
                this.features[21][i5] = l12;
            if(this.features[4][i5] == 2)
                this.features[22][i5] = l12;
            if(this.features[4][i5] == 3)
                this.features[23][i5] = l12;
            if(this.features[4][i5] == 4)
                this.features[24][i5] = l12;
        }

        for(var i13 = 0; i13 < 361; i13++)
            if(!this.bb[2][4][i13])
            {
                var j5 = ai[1][i13];
                this.features[21][i13] = this.features[21][j5];
                this.features[22][i13] = this.features[22][j5];
                this.features[23][i13] = this.features[23][j5];
                this.features[24][i13] = this.features[24][j5];
            }

        for(var j13 = 0; j13 < 361; j13++)
        {
            this.features[11][j13] = 0;
            this.features[12][j13] = 0;
        }

        for(var k13 = 0; k13 < 361; k13++)
        {
            for(var k18 = 0; k18 <= 1; k18++)
            {
                if(k18 == 1)
                {
                    if(ai[3][5] == 1)
                    {
                        byte0 = 1;
                        byte1 = -1;
                    } else
                    {
                        byte0 = -1;
                        byte1 = 1;
                    }
                    byte2 = 11;
                    byte5 = 29;
                    byte8 = 30;
                    byte11 = 31;
                    byte14 = 12;
                    byte15 = 32;
                    byte16 = 33;
                    byte17 = 34;
                }
                if(k18 == 0)
                {
                    if(ai[3][5] == 1)
                    {
                        byte0 = -1;
                        byte1 = 1;
                    } else
                    {
                        byte0 = 1;
                        byte1 = -1;
                    }
                    byte2 = 12;
                    byte5 = 32;
                    byte8 = 33;
                    byte11 = 34;
                    byte14 = 11;
                    byte15 = 29;
                    byte16 = 30;
                    byte17 = 31;
                }
                if(this.bb[2][4][k13])
                {
                    if(this.bb[2][0][k13])
                    {
                        if(this.features[byte2][k13] < 3)
                            this.features[byte2][k13]++;
                        if(this.features[byte2][k13] == 1)
                            this.features[byte5][k13] = this.uni[k13];
                        if(this.features[byte2][k13] == 2)
                            this.features[byte8][k13] = this.uni[k13];
                        if(this.features[byte2][k13] == 3)
                            this.features[byte11][k13] = this.uni[k13];
                    }
                    if(this.bb[2][1][k13])
                    {
                        if(this.features[byte2][k13] < 3)
                            this.features[byte2][k13]++;
                        if(this.features[byte2][k13] == 1)
                            this.features[byte5][k13] = this.rni[k13];
                        if(this.features[byte2][k13] == 2)
                            this.features[byte8][k13] = this.rni[k13];
                        if(this.features[byte2][k13] == 3)
                            this.features[byte11][k13] = this.rni[k13];
                    }
                    if(this.bb[2][2][k13])
                    {
                        if(this.features[byte2][k13] < 3)
                            this.features[byte2][k13]++;
                        if(this.features[byte2][k13] == 1)
                            this.features[byte5][k13] = this.dni[k13];
                        if(this.features[byte2][k13] == 2)
                            this.features[byte8][k13] = this.dni[k13];
                        if(this.features[byte2][k13] == 3)
                            this.features[byte11][k13] = this.dni[k13];
                    }
                    if(this.bb[2][3][k13])
                    {
                        if(this.features[byte2][k13] < 3)
                            this.features[byte2][k13]++;
                        if(this.features[byte2][k13] == 1)
                            this.features[byte5][k13] = this.lni[k13];
                        if(this.features[byte2][k13] == 2)
                            this.features[byte8][k13] = this.lni[k13];
                        if(this.features[byte2][k13] == 3)
                            this.features[byte11][k13] = this.lni[k13];
                    }
                    if(this.un[k13] && ai[0][this.uni[k13]] == byte0 && ai[2][this.uni[k13]] > 1)
                    {
                        var i10 = ai[2][this.uni[k13]];
                        if(i10 > 4)
                            i10 = 4;
                        for(var j19 = 1; j19 <= i10; j19++)
                        {
                            if(this.features[(21 + j19) - 1][this.uni[k13]] == k13)
                                continue;
                            var flag = false;
                            var j = this.features[(21 + j19) - 1][this.uni[k13]];
                            for(var l21 = 1; l21 <= this.features[byte2][k13]; l21++)
                                if(j == this.features[(byte5 + l21) - 1][k13])
                                    flag = true;

                            if(flag || this.features[byte2][k13] >= 3)
                                continue;
                            this.features[byte2][k13]++;
                            if(this.features[byte2][k13] == 1)
                                this.features[byte5][k13] = j;
                            if(this.features[byte2][k13] == 2)
                                this.features[byte8][k13] = j;
                            if(this.features[byte2][k13] == 3)
                                this.features[byte11][k13] = j;
                        }

                    }
                    if(this.rn[k13] && ai[0][this.rni[k13]] == byte0 && ai[2][this.rni[k13]] > 1)
                    {
                        var j10 = ai[2][this.rni[k13]];
                        if(j10 > 4)
                            j10 = 4;
                        for(var k19 = 1; k19 <= j10; k19++)
                        {
                            if(this.features[(21 + k19) - 1][this.rni[k13]] == k13)
                                continue;
                            var flag1 = false;
                            var k = this.features[(21 + k19) - 1][this.rni[k13]];
                            for(var i22 = 1; i22 <= this.features[byte2][k13]; i22++)
                                if(k == this.features[(byte5 + i22) - 1][k13])
                                    flag1 = true;

                            if(flag1 || this.features[byte2][k13] >= 3)
                                continue;
                            this.features[byte2][k13]++;
                            if(this.features[byte2][k13] == 1)
                                this.features[byte5][k13] = k;
                            if(this.features[byte2][k13] == 2)
                                this.features[byte8][k13] = k;
                            if(this.features[byte2][k13] == 3)
                                this.features[byte11][k13] = k;
                        }

                    }
                    if(this.dn[k13] && ai[0][this.dni[k13]] == byte0 && ai[2][this.dni[k13]] > 1)
                    {
                        var k10 = ai[2][this.dni[k13]];
                        if(k10 > 4)
                            k10 = 4;
                        for(var l19 = 1; l19 <= k10; l19++)
                        {
                            if(this.features[(21 + l19) - 1][this.dni[k13]] == k13)
                                continue;
                            var flag2 = false;
                            var l = this.features[(21 + l19) - 1][this.dni[k13]];
                            for(var j22 = 1; j22 <= this.features[byte2][k13]; j22++)
                                if(l == this.features[(byte5 + j22) - 1][k13])
                                    flag2 = true;

                            if(flag2 || this.features[byte2][k13] >= 3)
                                continue;
                            this.features[byte2][k13]++;
                            if(this.features[byte2][k13] == 1)
                                this.features[byte5][k13] = l;
                            if(this.features[byte2][k13] == 2)
                                this.features[byte8][k13] = l;
                            if(this.features[byte2][k13] == 3)
                                this.features[byte11][k13] = l;
                        }

                    }
                    if(this.ln[k13] && ai[0][this.lni[k13]] == byte0 && ai[2][this.lni[k13]] > 1)
                    {
                        var l10 = ai[2][this.lni[k13]];
                        if(l10 > 4)
                            l10 = 4;
                        for(var i20 = 1; i20 <= l10; i20++)
                        {
                            if(this.features[(21 + i20) - 1][this.lni[k13]] == k13)
                                continue;
                            var flag3 = false;
                            var i1 = this.features[(21 + i20) - 1][this.lni[k13]];
                            for(var k22 = 1; k22 <= this.features[byte2][k13]; k22++)
                                if(i1 == this.features[(byte5 + k22) - 1][k13])
                                    flag3 = true;

                            if(flag3 || this.features[byte2][k13] >= 3)
                                continue;
                            this.features[byte2][k13]++;
                            if(this.features[byte2][k13] == 1)
                                this.features[byte5][k13] = i1;
                            if(this.features[byte2][k13] == 2)
                                this.features[byte8][k13] = i1;
                            if(this.features[byte2][k13] == 3)
                                this.features[byte11][k13] = i1;
                        }

                    }
                }
                if(ai[0][k13] != byte0 || ai[2][k13] != 1)
                    continue;
                ai[1][361] = -1;
                var j1 = this.features[21][k13];
                var flag4 = false;
                if(this.un[k13] && j1 == this.uni[k13])
                    flag4 = true;
                if(this.rn[k13] && j1 == this.rni[k13])
                    flag4 = true;
                if(this.dn[k13] && j1 == this.dni[k13])
                    flag4 = true;
                if(this.ln[k13] && j1 == this.lni[k13])
                    flag4 = true;
                if(this.un[k13] && ai[0][this.uni[k13]] == -ai[0][k13] && ai[1][this.uni[k13]] == ai[1][this.uni[j1]])
                    flag4 = true;
                if(this.un[k13] && ai[0][this.uni[k13]] == -ai[0][k13] && ai[1][this.uni[k13]] == ai[1][this.rni[j1]])
                    flag4 = true;
                if(this.un[k13] && ai[0][this.uni[k13]] == -ai[0][k13] && ai[1][this.uni[k13]] == ai[1][this.dni[j1]])
                    flag4 = true;
                if(this.un[k13] && ai[0][this.uni[k13]] == -ai[0][k13] && ai[1][this.uni[k13]] == ai[1][this.lni[j1]])
                    flag4 = true;
                if(this.rn[k13] && ai[0][this.rni[k13]] == -ai[0][k13] && ai[1][this.rni[k13]] == ai[1][this.uni[j1]])
                    flag4 = true;
                if(this.rn[k13] && ai[0][this.rni[k13]] == -ai[0][k13] && ai[1][this.rni[k13]] == ai[1][this.rni[j1]])
                    flag4 = true;
                if(this.rn[k13] && ai[0][this.rni[k13]] == -ai[0][k13] && ai[1][this.rni[k13]] == ai[1][this.dni[j1]])
                    flag4 = true;
                if(this.rn[k13] && ai[0][this.rni[k13]] == -ai[0][k13] && ai[1][this.rni[k13]] == ai[1][this.lni[j1]])
                    flag4 = true;
                if(this.dn[k13] && ai[0][this.dni[k13]] == -ai[0][k13] && ai[1][this.dni[k13]] == ai[1][this.uni[j1]])
                    flag4 = true;
                if(this.dn[k13] && ai[0][this.dni[k13]] == -ai[0][k13] && ai[1][this.dni[k13]] == ai[1][this.rni[j1]])
                    flag4 = true;
                if(this.dn[k13] && ai[0][this.dni[k13]] == -ai[0][k13] && ai[1][this.dni[k13]] == ai[1][this.dni[j1]])
                    flag4 = true;
                if(this.dn[k13] && ai[0][this.dni[k13]] == -ai[0][k13] && ai[1][this.dni[k13]] == ai[1][this.lni[j1]])
                    flag4 = true;
                if(this.ln[k13] && ai[0][this.lni[k13]] == -ai[0][k13] && ai[1][this.lni[k13]] == ai[1][this.uni[j1]])
                    flag4 = true;
                if(this.ln[k13] && ai[0][this.lni[k13]] == -ai[0][k13] && ai[1][this.lni[k13]] == ai[1][this.rni[j1]])
                    flag4 = true;
                if(this.ln[k13] && ai[0][this.lni[k13]] == -ai[0][k13] && ai[1][this.lni[k13]] == ai[1][this.dni[j1]])
                    flag4 = true;
                if(this.ln[k13] && ai[0][this.lni[k13]] == -ai[0][k13] && ai[1][this.lni[k13]] == ai[1][this.lni[j1]])
                    flag4 = true;
                if(!flag4 || this.features[byte14][j1] >= 3)
                    continue;
                this.features[byte14][j1]++;
                if(this.features[byte14][j1] == 1)
                    this.features[byte15][j1] = k13;
                if(this.features[byte14][j1] == 2)
                    this.features[byte16][j1] = k13;
                if(this.features[byte14][j1] == 3)
                    this.features[byte17][j1] = k13;
            }

        }

        for(var l13 = 0; l13 < 361; l13++)
        {
            for(var l18 = 0; l18 <= 1; l18++)
            {
                if(l18 == 1)
                {
                    if(ai[3][5] == 1)
                    {
                        byte0 = 1;
                        byte1 = -1;
                    } else
                    {
                        byte0 = -1;
                        byte1 = 1;
                    }
                    var byte3 = 11;
                    var byte6 = 29;
                    var byte9 = 30;
                    var byte12 = 31;
                    byte14 = 12;
                    byte15 = 32;
                    byte16 = 33;
                    byte17 = 34;
                }
                if(l18 == 0)
                {
                    if(ai[3][5] == 1)
                    {
                        byte0 = -1;
                        byte1 = 1;
                    } else
                    {
                        byte0 = 1;
                        byte1 = -1;
                    }
                    var byte4 = 12;
                    var byte7 = 32;
                    var byte10 = 33;
                    var byte13 = 34;
                    byte14 = 11;
                    byte15 = 29;
                    byte16 = 30;
                    byte17 = 31;
                }
                if(ai[0][l13] != byte0 || ai[2][l13] != 1)
                    continue;
                if(this.bb[2][0][l13])
                {
                    this.features[byte14][l13] = this.features[byte14][this.uni[l13]];
                    this.features[byte15][l13] = this.features[byte15][this.uni[l13]];
                    this.features[byte16][l13] = this.features[byte16][this.uni[l13]];
                    this.features[byte17][l13] = this.features[byte17][this.uni[l13]];
                }
                if(this.bb[2][1][l13])
                {
                    this.features[byte14][l13] = this.features[byte14][this.rni[l13]];
                    this.features[byte15][l13] = this.features[byte15][this.rni[l13]];
                    this.features[byte16][l13] = this.features[byte16][this.rni[l13]];
                    this.features[byte17][l13] = this.features[byte17][this.rni[l13]];
                }
                if(this.bb[2][2][l13])
                {
                    this.features[byte14][l13] = this.features[byte14][this.dni[l13]];
                    this.features[byte15][l13] = this.features[byte15][this.dni[l13]];
                    this.features[byte16][l13] = this.features[byte16][this.dni[l13]];
                    this.features[byte17][l13] = this.features[byte17][this.dni[l13]];
                }
                if(this.bb[2][3][l13])
                {
                    this.features[byte14][l13] = this.features[byte14][this.lni[l13]];
                    this.features[byte15][l13] = this.features[byte15][this.lni[l13]];
                    this.features[byte16][l13] = this.features[byte16][this.lni[l13]];
                    this.features[byte17][l13] = this.features[byte17][this.lni[l13]];
                }
                if(l13 == this.features[byte15][l13])
                {
                    if(this.features[byte14][l13] > 0)
                        this.features[byte14][l13]--;
                    this.features[byte15][l13] = this.features[byte16][l13];
                    this.features[byte16][l13] = this.features[byte17][l13];
                }
                if(l13 == this.features[byte16][l13])
                {
                    if(this.features[byte14][l13] > 0)
                        this.features[byte14][l13]--;
                    this.features[byte16][l13] = this.features[byte17][l13];
                }
                if(l13 == this.features[byte17][l13] && this.features[byte14][l13] > 0)
                    this.features[byte14][l13]--;
                if(this.un[l13] && ai[0][this.uni[l13]] == byte1)
                {
                    var i11 = ai[2][this.uni[l13]];
                    if(i11 > 3)
                        i11 = 3;
                    for(var j20 = 1; j20 <= i11; j20++)
                    {
                        var flag5 = false;
                        var k1 = this.features[(21 + j20) - 1][this.uni[l13]];
                        for(var l22 = 1; l22 <= this.features[byte14][l13]; l22++)
                            if(k1 == this.features[(byte15 + l22) - 1][l13])
                                flag5 = true;

                        if(k1 == this.uni[l13])
                            flag5 = true;
                        if(k1 == this.rni[l13])
                            flag5 = true;
                        if(k1 == this.dni[l13])
                            flag5 = true;
                        if(k1 == this.lni[l13])
                            flag5 = true;
                        if(flag5 || this.features[byte14][l13] >= 3)
                            continue;
                        this.features[byte14][l13]++;
                        if(this.features[byte14][l13] == 1)
                            this.features[byte15][l13] = k1;
                        if(this.features[byte14][l13] == 2)
                            this.features[byte16][l13] = k1;
                        if(this.features[byte14][l13] == 3)
                            this.features[byte17][l13] = k1;
                    }

                }
                if(this.rn[l13] && ai[0][this.rni[l13]] == byte1)
                {
                    var j11 = ai[2][this.rni[l13]];
                    if(j11 > 3)
                        j11 = 3;
                    for(var k20 = 1; k20 <= j11; k20++)
                    {
                        var flag6 = false;
                        var l1 = this.features[(21 + k20) - 1][this.rni[l13]];
                        for(var i23 = 1; i23 <= this.features[byte14][l13]; i23++)
                            if(l1 == this.features[(byte15 + i23) - 1][l13])
                                flag6 = true;

                        if(l1 == this.uni[l13])
                            flag6 = true;
                        if(l1 == this.rni[l13])
                            flag6 = true;
                        if(l1 == this.dni[l13])
                            flag6 = true;
                        if(l1 == this.lni[l13])
                            flag6 = true;
                        if(flag6 || this.features[byte14][l13] >= 3)
                            continue;
                        this.features[byte14][l13]++;
                        if(this.features[byte14][l13] == 1)
                            this.features[byte15][l13] = l1;
                        if(this.features[byte14][l13] == 2)
                            this.features[byte16][l13] = l1;
                        if(this.features[byte14][l13] == 3)
                            this.features[byte17][l13] = l1;
                    }

                }
                if(this.dn[l13] && ai[0][this.dni[l13]] == byte1)
                {
                    var k11 = ai[2][this.dni[l13]];
                    if(k11 > 3)
                        k11 = 3;
                    for(var l20 = 1; l20 <= k11; l20++)
                    {
                        var flag7 = false;
                        var i2 = this.features[(21 + l20) - 1][this.dni[l13]];
                        for(var j23 = 1; j23 <= this.features[byte14][l13]; j23++)
                            if(i2 == this.features[(byte15 + j23) - 1][l13])
                                flag7 = true;

                        if(i2 == this.uni[l13])
                            flag7 = true;
                        if(i2 == this.rni[l13])
                            flag7 = true;
                        if(i2 == this.dni[l13])
                            flag7 = true;
                        if(i2 == this.lni[l13])
                            flag7 = true;
                        if(flag7 || this.features[byte14][l13] >= 3)
                            continue;
                        this.features[byte14][l13]++;
                        if(this.features[byte14][l13] == 1)
                            this.features[byte15][l13] = i2;
                        if(this.features[byte14][l13] == 2)
                            this.features[byte16][l13] = i2;
                        if(this.features[byte14][l13] == 3)
                            this.features[byte17][l13] = i2;
                    }

                }
                if(this.ln[l13] && ai[0][this.lni[l13]] == byte1)
                {
                    var l11 = ai[2][this.lni[l13]];
                    if(l11 > 3)
                        l11 = 3;
                    for(var i21 = 1; i21 <= l11; i21++)
                    {
                        var flag8 = false;
                        var j2 = this.features[(21 + i21) - 1][this.lni[l13]];
                        for(var k23 = 1; k23 <= this.features[byte14][l13]; k23++)
                            if(j2 == this.features[(byte15 + k23) - 1][l13])
                                flag8 = true;

                        if(j2 == this.uni[l13])
                            flag8 = true;
                        if(j2 == this.rni[l13])
                            flag8 = true;
                        if(j2 == this.dni[l13])
                            flag8 = true;
                        if(j2 == this.lni[l13])
                            flag8 = true;
                        if(flag8 || this.features[byte14][l13] >= 3)
                            continue;
                        this.features[byte14][l13]++;
                        if(this.features[byte14][l13] == 1)
                            this.features[byte15][l13] = j2;
                        if(this.features[byte14][l13] == 2)
                            this.features[byte16][l13] = j2;
                        if(this.features[byte14][l13] == 3)
                            this.features[byte17][l13] = j2;
                    }

                }
                if(this.un[l13] && ai[0][this.uni[l13]] == byte0 && this.features[byte14][l13] < 3)
                {
                    var flag9 = false;
                    if(this.features[byte14][l13] >= 1 && this.features[byte15][l13] == this.uni[l13])
                        flag9 = true;
                    if(this.features[byte14][l13] >= 2 && this.features[byte16][l13] == this.uni[l13])
                        flag9 = true;
                    if(!flag9)
                    {
                        this.features[byte14][l13]++;
                        if(this.features[byte14][l13] == 1)
                            this.features[byte15][l13] = this.uni[l13];
                        if(this.features[byte14][l13] == 2)
                            this.features[byte16][l13] = this.uni[l13];
                        if(this.features[byte14][l13] == 3)
                            this.features[byte17][l13] = this.uni[l13];
                    }
                }
                if(this.rn[l13] && ai[0][this.rni[l13]] == byte0 && this.features[byte14][l13] < 3)
                {
                    var flag10 = false;
                    if(this.features[byte14][l13] >= 1 && this.features[byte15][l13] == this.rni[l13])
                        flag10 = true;
                    if(this.features[byte14][l13] >= 2 && this.features[byte16][l13] == this.rni[l13])
                        flag10 = true;
                    if(!flag10)
                    {
                        this.features[byte14][l13]++;
                        if(this.features[byte14][l13] == 1)
                            this.features[byte15][l13] = this.rni[l13];
                        if(this.features[byte14][l13] == 2)
                            this.features[byte16][l13] = this.rni[l13];
                        if(this.features[byte14][l13] == 3)
                            this.features[byte17][l13] = this.rni[l13];
                    }
                }
                if(this.dn[l13] && ai[0][this.dni[l13]] == byte0 && this.features[byte14][l13] < 3)
                {
                    var flag11 = false;
                    if(this.features[byte14][l13] >= 1 && this.features[byte15][l13] == this.dni[l13])
                        flag11 = true;
                    if(this.features[byte14][l13] >= 2 && this.features[byte16][l13] == this.dni[l13])
                        flag11 = true;
                    if(!flag11)
                    {
                        this.features[byte14][l13]++;
                        if(this.features[byte14][l13] == 1)
                            this.features[byte15][l13] = this.dni[l13];
                        if(this.features[byte14][l13] == 2)
                            this.features[byte16][l13] = this.dni[l13];
                        if(this.features[byte14][l13] == 3)
                            this.features[byte17][l13] = this.dni[l13];
                    }
                }
                if(this.ln[l13] && ai[0][this.lni[l13]] == byte0 && this.features[byte14][l13] < 3)
                {
                    var flag12 = false;
                    if(this.features[byte14][l13] >= 1 && this.features[byte15][l13] == this.lni[l13])
                        flag12 = true;
                    if(this.features[byte14][l13] >= 2 && this.features[byte16][l13] == this.lni[l13])
                        flag12 = true;
                    if(!flag12)
                    {
                        this.features[byte14][l13]++;
                        if(this.features[byte14][l13] == 1)
                            this.features[byte15][l13] = this.lni[l13];
                        if(this.features[byte14][l13] == 2)
                            this.features[byte16][l13] = this.lni[l13];
                        if(this.features[byte14][l13] == 3)
                            this.features[byte17][l13] = this.lni[l13];
                    }
                }
                if(this.un[l13] && this.rn[this.uni[l13]] && ai[0][this.uni[this.rni[l13]]] == byte0 && ai[0][this.uni[l13]] == -ai[0][this.rni[l13]])
                {
                    var flag13 = false;
                    if(this.features[byte14][l13] >= 1 && this.features[byte15][l13] == this.uni[this.rni[l13]])
                        flag13 = true;
                    if(this.features[byte14][l13] >= 2 && this.features[byte16][l13] == this.uni[this.rni[l13]])
                        flag13 = true;
                    if(!flag13)
                    {
                        this.features[byte14][l13]++;
                        if(this.features[byte14][l13] == 1)
                            this.features[byte15][l13] = this.uni[this.rni[l13]];
                        if(this.features[byte14][l13] == 2)
                            this.features[byte16][l13] = this.uni[this.rni[l13]];
                        if(this.features[byte14][l13] == 3)
                            this.features[byte17][l13] = this.uni[this.rni[l13]];
                    }
                }
                if(this.un[l13] && this.ln[this.uni[l13]] && ai[0][this.uni[this.lni[l13]]] == byte0 && ai[0][this.uni[l13]] == -ai[0][this.lni[l13]])
                {
                    var flag14 = false;
                    if(this.features[byte14][l13] >= 1 && this.features[byte15][l13] == this.uni[this.lni[l13]])
                        flag14 = true;
                    if(this.features[byte14][l13] >= 2 && this.features[byte16][l13] == this.uni[this.lni[l13]])
                        flag14 = true;
                    if(!flag14)
                    {
                        this.features[byte14][l13]++;
                        if(this.features[byte14][l13] == 1)
                            this.features[byte15][l13] = this.uni[this.lni[l13]];
                        if(this.features[byte14][l13] == 2)
                            this.features[byte16][l13] = this.uni[this.lni[l13]];
                        if(this.features[byte14][l13] == 3)
                            this.features[byte17][l13] = this.uni[this.lni[l13]];
                    }
                }
                if(this.dn[l13] && this.rn[this.dni[l13]] && ai[0][this.dni[this.rni[l13]]] == byte0 && ai[0][this.dni[l13]] == -ai[0][this.rni[l13]])
                {
                    var flag15 = false;
                    if(this.features[byte14][l13] >= 1 && this.features[byte15][l13] == this.dni[this.rni[l13]])
                        flag15 = true;
                    if(this.features[byte14][l13] >= 2 && this.features[byte16][l13] == this.dni[this.rni[l13]])
                        flag15 = true;
                    if(!flag15)
                    {
                        this.features[byte14][l13]++;
                        if(this.features[byte14][l13] == 1)
                            this.features[byte15][l13] = this.dni[this.rni[l13]];
                        if(this.features[byte14][l13] == 2)
                            this.features[byte16][l13] = this.dni[this.rni[l13]];
                        if(this.features[byte14][l13] == 3)
                            this.features[byte17][l13] = this.dni[this.rni[l13]];
                    }
                }
                if(!this.dn[l13] || !this.ln[this.dni[l13]] || ai[0][this.dni[this.lni[l13]]] != byte0 || ai[0][this.dni[l13]] != -ai[0][this.lni[l13]])
                    continue;
                var flag16 = false;
                if(this.features[byte14][l13] >= 1 && this.features[byte15][l13] == this.dni[this.lni[l13]])
                    flag16 = true;
                if(this.features[byte14][l13] >= 2 && this.features[byte16][l13] == this.dni[this.lni[l13]])
                    flag16 = true;
                if(flag16)
                    continue;
                this.features[byte14][l13]++;
                if(this.features[byte14][l13] == 1)
                    this.features[byte15][l13] = this.dni[this.lni[l13]];
                if(this.features[byte14][l13] == 2)
                    this.features[byte16][l13] = this.dni[this.lni[l13]];
                if(this.features[byte14][l13] == 3)
                    this.features[byte17][l13] = this.dni[this.lni[l13]];
            }

        }

        if(ai[3][5] == 1)
        {
            for(var i14 = 0; i14 < 361; i14++)
            {
                this.features[13][i14] = this.features[11][i14];
                this.features[14][i14] = this.features[12][i14];
                this.features[15][i14] = this.features[29][i14];
                this.features[16][i14] = this.features[30][i14];
                this.features[17][i14] = this.features[31][i14];
                this.features[18][i14] = this.features[32][i14];
                this.features[19][i14] = this.features[33][i14];
                this.features[20][i14] = this.features[34][i14];
            }

        } else
        {
            for(var j14 = 0; j14 < 361; j14++)
            {
                this.features[14][j14] = this.features[11][j14];
                this.features[13][j14] = this.features[12][j14];
                this.features[18][j14] = this.features[29][j14];
                this.features[19][j14] = this.features[30][j14];
                this.features[20][j14] = this.features[31][j14];
                this.features[15][j14] = this.features[32][j14];
                this.features[16][j14] = this.features[33][j14];
                this.features[17][j14] = this.features[34][j14];
            }

        }
        for(var k14 = 0; k14 < 361; k14++)
        {
            if(ai[0][k14] != 0 || this.features[7][k14] > 1)
                continue;
            if(this.features[13][k14] == 0)
                this.bfeatures[0][k14] = true;
            if(this.features[14][k14] == 0)
                this.bfeatures[1][k14] = true;
            if(this.features[13][k14] <= 1)
                this.bfeatures[3][k14] = true;
            if(this.features[14][k14] <= 1)
                this.bfeatures[2][k14] = true;
        }

        for(var l14 = 0; l14 < 361; l14++)
        {
            if(ai[0][l14] == 1 && ai[2][l14] == 1 && ai[0][this.uni[l14]] != 1 && ai[0][this.rni[l14]] != 1 && ai[0][this.dni[l14]] != 1 && ai[0][this.lni[l14]] != 1 && this.features[21][l14] != ai[3][6] && ai[0][this.uni[this.features[21][l14]]] != -1 && ai[0][this.rni[this.features[21][l14]]] != -1 && ai[0][this.dni[this.features[21][l14]]] != -1 && ai[0][this.lni[this.features[21][l14]]] != -1)
                this.bfeatures[2][this.features[21][l14]] = false;
            if(ai[0][l14] == -1 && ai[2][l14] == 1 && ai[0][this.uni[l14]] != -1 && ai[0][this.rni[l14]] != -1 && ai[0][this.dni[l14]] != -1 && ai[0][this.lni[l14]] != -1 && this.features[21][l14] != ai[3][6] && ai[0][this.uni[this.features[21][l14]]] != 1 && ai[0][this.rni[this.features[21][l14]]] != 1 && ai[0][this.dni[this.features[21][l14]]] != 1 && ai[0][this.lni[this.features[21][l14]]] != 1)
                this.bfeatures[3][this.features[21][l14]] = false;
        }

        if(ai[3][5] == 1)
        {
            for(var i15 = 0; i15 < 361; i15++)
            {
                this.bfeatures[10][i15] = this.bfeatures[2][i15];
                this.bfeatures[11][i15] = this.bfeatures[3][i15];
            }

        } else
        {
            for(var j15 = 0; j15 < 361; j15++)
            {
                this.bfeatures[10][j15] = this.bfeatures[3][j15];
                this.bfeatures[11][j15] = this.bfeatures[2][j15];
            }

        }
        var i = 0;
        for(var k15 = 0; k15 < 19; k15++)
        {
            for(var i19 = 0; i19 < 19; i19++)
            {
                var k2 = k15 * 19 + i19;
                var l3 = k2;
                if(this.rn[k2])
                    l3 = this.rni[k2];
                var i4 = k2;
                if(this.dn[k2])
                    i4 = this.dni[k2];
                if(ai[0][k2] * ai[0][l3] == -1)
                {
                    var flag17 = false;
                    var k5;
                    var i8;
                    if(ai[1][k2] < ai[1][l3])
                    {
                        k5 = ai[1][k2];
                        i8 = ai[1][l3];
                    } else
                    {
                        i8 = ai[1][k2];
                        k5 = ai[1][l3];
                    }
                    for(var j21 = 0; j21 < i; j21++)
                        if(!flag17 && this.features[1][2 * j21] == k5 && this.features[1][2 * j21 + 1] == i8)
                            flag17 = true;

                    if(!flag17)
                    {
                        this.features[1][2 * i] = k5;
                        this.features[1][2 * i + 1] = i8;
                        i++;
                    }
                }
                if(ai[0][k2] * ai[0][i4] != -1)
                    continue;
                var flag18 = false;
                var l5;
                var j8;
                if(ai[1][k2] < ai[1][i4])
                {
                    l5 = ai[1][k2];
                    j8 = ai[1][i4];
                } else
                {
                    j8 = ai[1][k2];
                    l5 = ai[1][i4];
                }
                for(var k21 = 0; k21 < i; k21++)
                    if(!flag18 && this.features[1][2 * k21] == l5 && this.features[1][2 * k21 + 1] == j8)
                        flag18 = true;

                if(!flag18)
                {
                    this.features[1][2 * i] = l5;
                    this.features[1][2 * i + 1] = j8;
                    i++;
                }
            }

        }

        for(var l15 = 0; l15 < i; l15++)
        {
            var i6 = this.features[1][2 * l15];
            var k8 = this.features[1][2 * l15 + 1];
            if(ai[2][i6] == 1 && i6 != ai[3][7])
            {
                this.features[2][k8]++;
                var k9 = i6;
                if(this.features[2][k8] == 1)
                    this.features[5][k8] = k9;
                if(this.features[2][k8] == 2)
                    this.features[6][k8] = k9;
            }
            if(ai[2][k8] == 1 && k8 != ai[3][7])
            {
                this.features[2][i6]++;
                var l9 = k8;
                if(this.features[2][i6] == 1)
                    this.features[5][i6] = l9;
                if(this.features[2][i6] == 2)
                    this.features[6][i6] = l9;
            }
            if(ai[2][i6] == 2)
                this.features[3][k8]++;
            if(ai[2][k8] == 2)
                this.features[3][i6]++;
        }

        for(var i16 = 0; i16 < 361; i16++)
        {
            if(ai[0][i16] == 0 || i16 != ai[1][i16])
                continue;
            if(this.bb[3][4][i16] && ai[2][i16] >= 2 && this.features[11][this.features[21][i16]] < this.features[11][this.features[22][i16]])
            {
                var l2 = this.features[21][i16];
                this.features[21][i16] = this.features[22][i16];
                this.features[22][i16] = l2;
            }
            if(this.bb[4][4][i16] && ai[2][i16] >= 2 && this.features[12][this.features[21][i16]] < this.features[12][this.features[22][i16]])
            {
                var i3 = this.features[21][i16];
                this.features[21][i16] = this.features[22][i16];
                this.features[22][i16] = i3;
            }
            if(ai[2][i16] == 1 && this.bb[4][4][i16])
                this.bfeatures[4][i16] = true;
            if(ai[2][i16] == 1 && this.bb[3][4][i16] && this.bfeatures[11][this.features[21][i16]] && this.features[2][i16] == 0)
                this.bfeatures[4][i16] = true;
            if(ai[2][i16] == 1 && this.bb[3][4][i16] && this.bfeatures[11][this.features[21][i16]] && this.features[2][i16] == 1 && this.features[21][this.features[5][i16]] == this.features[21][i16])
                this.bfeatures[4][i16] = true;
            if(ai[2][i16] == 1 && this.bb[3][4][i16] && this.features[2][i16] == 1 && this.bfeatures[11][this.features[21][i16]] && (this.features[7][this.features[21][i16]] >= 2 || this.features[7][this.features[21][i16]] == 1 && (this.bb[4][0][this.features[21][i16]] && ai[2][this.uni[this.features[21][i16]]] > 2 || this.bb[4][1][this.features[21][i16]] && ai[2][this.rni[this.features[21][i16]]] > 2 || this.bb[4][2][this.features[21][i16]] && ai[2][this.dni[this.features[21][i16]]] > 2 || this.bb[4][3][this.features[21][i16]] && ai[2][this.lni[this.features[21][i16]]] > 2)) && this.features[11][this.features[21][this.features[5][i16]]] <= 2 && !this.bb[4][0][this.features[5][i16]] && !this.bb[4][1][this.features[5][i16]] && !this.bb[4][2][this.features[5][i16]] && !this.bb[4][3][this.features[5][i16]] && (this.features[21][i16] - this.features[5][i16]) * (this.features[21][i16] - this.features[5][i16]) != 1 && (this.features[21][i16] - this.features[5][i16]) * (this.features[21][i16] - this.features[5][i16]) != 361)
                this.bfeatures[4][i16] = true;
            if(ai[2][i16] == 1 && this.bb[3][4][i16] && this.features[2][i16] == 1 && this.features[21][this.features[5][i16]] == this.features[21][i16] && this.features[11][this.features[21][i16]] == 2 && ((this.features[29][this.features[21][i16]] - this.features[30][this.features[21][i16]]) * (this.features[29][this.features[21][i16]] - this.features[30][this.features[21][i16]]) == 1 || (this.features[29][this.features[21][i16]] - this.features[30][this.features[21][i16]]) * (this.features[29][this.features[21][i16]] - this.features[30][this.features[21][i16]]) == 361) && (this.features[11][this.features[29][this.features[21][i16]]] == 1 || this.features[11][this.features[30][this.features[21][i16]]] == 1))
                this.bfeatures[4][i16] = true;
            if(ai[2][i16] == 1 && this.bb[3][4][i16] && this.features[2][i16] == 1 && this.features[21][this.features[5][i16]] == this.features[21][i16] && this.features[11][this.features[21][i16]] == 2 && this.features[12][this.features[29][this.features[21][i16]]] >= 3 && this.bb[2][4][this.features[29][this.features[21][i16]]] && this.features[11][this.features[30][this.features[21][i16]]] <= 2)
            {
                this.bfeatures[4][i16] = true;
                if(this.bb[4][0][this.features[21][i16]] && ai[2][this.uni[i16]] == 2)
                    this.bfeatures[4][i16] = false;
                if(this.bb[4][1][this.features[21][i16]] && ai[2][this.rni[i16]] == 2)
                    this.bfeatures[4][i16] = false;
                if(this.bb[4][2][this.features[21][i16]] && ai[2][this.dni[i16]] == 2)
                    this.bfeatures[4][i16] = false;
                if(this.bb[4][3][this.features[21][i16]] && ai[2][this.lni[i16]] == 2)
                    this.bfeatures[4][i16] = false;
            }
            if(ai[2][i16] == 1 && this.bb[3][4][i16] && this.features[2][i16] == 1 && this.features[21][this.features[5][i16]] == this.features[21][i16] && this.features[11][this.features[21][i16]] == 2 && this.features[12][this.features[30][this.features[21][i16]]] >= 3 && this.bb[2][4][this.features[30][this.features[21][i16]]] && this.features[11][this.features[29][this.features[21][i16]]] <= 2)
            {
                this.bfeatures[4][i16] = true;
                if(this.bb[4][0][this.features[21][i16]] && ai[2][this.uni[i16]] == 2)
                    this.bfeatures[4][i16] = false;
                if(this.bb[4][1][this.features[21][i16]] && ai[2][this.rni[i16]] == 2)
                    this.bfeatures[4][i16] = false;
                if(this.bb[4][2][this.features[21][i16]] && ai[2][this.dni[i16]] == 2)
                    this.bfeatures[4][i16] = false;
                if(this.bb[4][3][this.features[21][i16]] && ai[2][this.lni[i16]] == 2)
                    this.bfeatures[4][i16] = false;
            }
            if(ai[2][i16] == 1 && this.bb[3][4][i16] && this.features[2][i16] == 1 && this.features[21][this.features[5][i16]] == this.features[21][i16] && this.features[11][this.features[21][i16]] == 2 && this.features[11][this.features[29][this.features[21][i16]]] <= 2 && this.features[9][this.features[30][this.features[21][i16]]] >= 2)
                this.bfeatures[4][i16] = true;
            if(ai[2][i16] == 1 && this.bb[3][4][i16] && this.features[2][i16] == 1 && this.features[21][this.features[5][i16]] == this.features[21][i16] && this.features[11][this.features[21][i16]] == 2 && this.features[11][this.features[30][this.features[21][i16]]] <= 2 && this.features[9][this.features[29][this.features[21][i16]]] >= 2)
                this.bfeatures[4][i16] = true;
            if(ai[2][i16] == 2 && this.bb[3][4][i16] && this.features[2][i16] == 0 && this.features[3][i16] == 0 && this.features[11][this.features[21][i16]] == 1 && this.features[11][this.features[22][i16]] == 1 && !this.bfeatures[10][this.features[21][i16]] && !this.bfeatures[10][this.features[22][i16]])
                this.bfeatures[4][i16] = true;
            if(ai[2][i16] == 2 && this.bb[3][4][i16] && this.features[2][i16] == 0 && this.features[3][i16] == 0 && this.features[11][this.features[21][i16]] == 1 && this.features[11][this.features[22][i16]] == 1 && ((this.features[21][i16] - this.features[22][i16]) * (this.features[21][i16] - this.features[22][i16]) == 1 || (this.features[21][i16] - this.features[22][i16]) * (this.features[21][i16] - this.features[22][i16]) == 361))
                this.bfeatures[4][i16] = true;
            if(ai[2][i16] == 2 && this.bb[4][4][i16] && this.features[12][this.features[21][i16]] <= 2 && this.features[2][i16] == 0 && !this.bfeatures[11][this.features[22][i16]])
                this.bfeatures[4][i16] = true;
            if(ai[2][i16] == 2 && this.bb[4][4][i16] && this.features[12][this.features[22][i16]] <= 2 && this.features[2][i16] == 0 && !this.bfeatures[11][this.features[21][i16]])
                this.bfeatures[4][i16] = true;
            if(ai[2][i16] == 2 && this.bb[4][4][i16] && this.features[2][i16] == 0 && (this.bfeatures[10][this.features[21][i16]] || this.bfeatures[10][this.features[22][i16]]) && ((this.features[21][i16] - this.features[22][i16]) * (this.features[21][i16] - this.features[22][i16]) == 1 || (this.features[21][i16] - this.features[22][i16]) * (this.features[21][i16] - this.features[22][i16]) == 361))
                this.bfeatures[4][i16] = true;
            if(ai[2][i16] == 2 && this.bb[4][4][i16] && this.features[2][i16] == 1 && this.features[3][i16] == 0 && this.features[11][this.features[21][this.features[5][i16]]] >= 3 && this.features[12][this.features[21][i16]] == 1 && this.features[12][this.features[22][i16]] == 1 && (this.features[11][this.features[21][i16]] >= 3 || this.features[11][this.features[22][i16]] >= 3))
                this.bfeatures[4][i16] = true;
            if(ai[2][i16] == 2 && this.bb[4][4][i16] && this.features[2][i16] == 1 && this.features[21][this.features[5][i16]] == this.features[21][i16] && this.features[11][this.features[21][i16]] >= 2 && this.features[12][this.features[22][i16]] <= 2)
                this.bfeatures[4][i16] = true;
            if(ai[2][i16] == 2 && this.bb[4][4][i16] && this.features[2][i16] == 1 && this.features[21][this.features[5][i16]] == this.features[22][i16] && this.features[11][this.features[22][i16]] >= 2 && this.features[12][this.features[21][i16]] <= 2)
                this.bfeatures[4][i16] = true;
            if(ai[2][i16] == 2 && this.bb[4][4][i16] && this.features[2][i16] == 1 && this.features[21][this.features[5][i16]] == this.features[21][i16] && this.features[12][this.features[21][i16]] <= 2 && !this.bfeatures[11][this.features[22][i16]])
                this.bfeatures[4][i16] = true;
            if(ai[2][i16] == 2 && this.bb[4][4][i16] && this.features[2][i16] == 1 && this.features[21][this.features[5][i16]] == this.features[22][i16] && this.features[12][this.features[22][i16]] <= 2 && !this.bfeatures[11][this.features[21][i16]])
                this.bfeatures[4][i16] = true;
            if(ai[2][i16] != 2 || !this.bb[3][4][i16] || this.features[2][i16] != 1 || this.features[3][i16] != 0 || this.features[21][this.features[5][i16]] != this.features[21][i16] || this.features[11][this.features[21][i16]] != 2 || this.features[11][this.features[22][i16]] > 1 || this.features[12][this.features[22][i16]] < 3)
                continue;
            if(this.features[22][i16] != this.features[29][this.features[21][i16]] && this.features[11][this.features[29][this.features[21][i16]]] == 1)
                this.bfeatures[4][i16] = true;
            if(this.features[22][i16] != this.features[30][this.features[21][i16]] && this.features[11][this.features[30][this.features[21][i16]]] == 1)
                this.bfeatures[4][i16] = true;
        }

        for(var j16 = 0; j16 < 361; j16++)
        {
            if(!this.enc[j16] || ai[0][j16] != 0 || ai[0][this.erni[j16]] != 0 || ai[0][this.elni[j16]] != 0)
                continue;
            if(this.bb[2][4][this.euni[j16]] && this.bb[1][4][this.euni[this.euni[j16]]] && ai[2][this.euni[this.euni[j16]]] > 2)
            {
                if(ai[0][this.erni[this.euni[j16]]] == 1 && ai[2][this.erni[this.euni[j16]]] > 2 && this.features[13][this.elni[this.euni[j16]]] > 2)
                    this.bfeatures[2][this.euni[j16]] = true;
                if(ai[0][this.elni[this.euni[j16]]] == 1 && ai[2][this.elni[this.euni[j16]]] > 2 && this.features[13][this.erni[this.euni[j16]]] > 2)
                    this.bfeatures[2][this.euni[j16]] = true;
            }
            if(ai[0][this.euni[j16]] != 0 || ai[0][this.euni[this.euni[j16]]] != -1 || ai[2][this.euni[this.euni[j16]]] <= 2)
                continue;
            if(ai[0][this.erni[this.euni[j16]]] == -1 && ai[2][this.erni[this.euni[j16]]] > 2 && this.features[14][this.elni[this.euni[j16]]] > 2)
                this.bfeatures[3][this.euni[j16]] = true;
            if(ai[0][this.elni[this.euni[j16]]] == -1 && ai[2][this.elni[this.euni[j16]]] > 2 && this.features[14][this.erni[this.euni[j16]]] > 2)
                this.bfeatures[3][this.euni[j16]] = true;
        }

        for(var k16 = 0; k16 < 361; k16++)
        {
            if(!this.enc[k16] || ai[0][k16] != 0 || ai[0][this.erni[k16]] != 0 || ai[0][this.elni[k16]] != 0)
                continue;
            if(this.bb[3][4][this.euni[k16]] && ai[2][this.euni[k16]] == 1 && this.features[2][ai[1][this.euni[k16]]] == 0)
            {
                var j3 = ai[1][this.euni[k16]];
                if(this.features[12][this.elni[k16]] > 2 && this.features[11][this.erni[k16]] <= 2)
                    this.bfeatures[4][j3] = true;
                if(this.features[12][this.erni[k16]] > 2 && this.features[11][this.elni[k16]] <= 2)
                    this.bfeatures[4][j3] = true;
            }
            if(!this.bb[4][4][this.euni[k16]] || ai[2][this.euni[k16]] != 2 || this.features[2][ai[1][this.euni[k16]]] != 0 || this.features[11][this.elni[k16]] <= 2 && this.features[11][this.erni[k16]] <= 2)
                continue;
            var flag19 = false;
            var k3 = ai[1][this.euni[k16]];
            if(k16 != this.features[21][k3] && this.features[11][this.features[21][k3]] >= 2)
                flag19 = true;
            if(k16 != this.features[22][k3] && this.features[11][this.features[22][k3]] >= 2)
                flag19 = true;
            if(this.features[11][this.elni[k16]] <= 2 && this.bb[3][4][this.elni[this.euni[k16]]] && this.features[12][this.elni[k16]] >= 3)
                flag19 = false;
            if(this.features[11][this.erni[k16]] <= 2 && this.bb[3][4][this.erni[this.euni[k16]]] && this.features[12][this.erni[k16]] >= 3)
                flag19 = false;
            if(this.features[11][this.elni[k16]] <= 2 && this.bb[2][4][this.elni[this.euni[k16]]] && this.features[11][this.elni[this.euni[k16]]] <= 2)
                flag19 = false;
            if(this.features[11][this.erni[k16]] <= 2 && this.bb[2][4][this.erni[this.euni[k16]]] && this.features[11][this.erni[this.euni[k16]]] <= 2)
                flag19 = false;
            if(flag19)
                this.bfeatures[4][k3] = true;
        }

        for(var l16 = 0; l16 < 361; l16++)
        {
            if(!this.enc[l16] || ai[0][l16] != 0 || ai[0][this.erni[l16]] != 0 || ai[0][this.elni[l16]] != 0)
                continue;
            if(ai[0][this.euni[l16]] == 1 && ai[2][this.euni[l16]] == 2 && ai[0][this.euni[this.euni[l16]]] == -1 && this.features[2][ai[1][this.euni[l16]]] == 0 && this.features[2][ai[1][this.euni[this.euni[l16]]]] > 0)
            {
                var j6 = ai[1][this.euni[l16]];
                var l8 = ai[1][this.euni[this.euni[l16]]];
                if(this.features[21][j6] != l16 && this.features[14][this.features[21][j6]] > 1)
                {
                    this.bfeatures[5][j6] = true;
                    this.bfeatures[6][l8] = true;
                }
                if(this.features[22][j6] != l16 && this.features[14][this.features[22][j6]] > 1)
                {
                    this.bfeatures[5][j6] = true;
                    this.bfeatures[6][l8] = true;
                }
            }
            if(ai[0][this.euni[l16]] != -1 || ai[2][this.euni[l16]] != 2 || ai[0][this.euni[this.euni[l16]]] != 1 || this.features[2][ai[1][this.euni[l16]]] != 0 || this.features[2][ai[1][this.euni[this.euni[l16]]]] <= 0)
                continue;
            var k6 = ai[1][this.euni[l16]];
            var i9 = ai[1][this.euni[this.euni[l16]]];
            if(this.features[21][k6] != l16 && this.features[13][this.features[21][k6]] > 1)
            {
                this.bfeatures[5][k6] = true;
                this.bfeatures[6][i9] = true;
            }
            if(this.features[22][k6] != l16 && this.features[13][this.features[22][k6]] > 1)
            {
                this.bfeatures[5][k6] = true;
                this.bfeatures[6][i9] = true;
            }
        }

        if(ai[3][6] >= 0 && ai[3][5] == 1)
            this.bfeatures[4][ai[3][1]] = false;
        if(ai[3][6] >= 0 && ai[3][5] == 0)
            this.bfeatures[4][ai[3][0]] = false;
        for(var i17 = 0; i17 < 361; i17++)
        {
            if(ai[0][i17] == 0 || this.features[2][i17] <= 1 || ai[2][i17] <= 1)
                continue;
            var l6 = this.features[5][i17];
            var j9 = this.features[6][i17];
            if(this.features[2][l6] == 0 && this.features[2][j9] == 0 && this.features[21][l6] != this.features[21][j9])
            {
                this.bfeatures[5][l6] = true;
                this.bfeatures[6][i17] = true;
            }
        }

        for(var j17 = 0; j17 < 361; j17++)
        {
            if(ai[0][j17] != 0 && this.bfeatures[4][ai[1][j17]])
                this.bfeatures[4][j17] = true;
            if(ai[0][j17] != 0 && this.bfeatures[5][ai[1][j17]])
                this.bfeatures[5][j17] = true;
            if(ai[0][j17] != 0 && this.bfeatures[6][ai[1][j17]])
                this.bfeatures[6][j17] = true;
        }

        for(var k17 = 0; k17 < 361; k17++)
        {
            if(!this.bb[2][4][k17] || this.bfeatures[11][k17])
                continue;
            if(this.bb[4][0][k17] && ai[2][this.uni[k17]] == 2)
            {
                var i7 = ai[1][this.uni[k17]];
                this.bfeatures[7][this.features[21][i7]] = true;
                this.bfeatures[7][this.features[22][i7]] = true;
            }
            if(this.bb[4][1][k17] && ai[2][this.rni[k17]] == 2)
            {
                var j7 = ai[1][this.rni[k17]];
                this.bfeatures[7][this.features[21][j7]] = true;
                this.bfeatures[7][this.features[22][j7]] = true;
            }
            if(this.bb[4][2][k17] && ai[2][this.dni[k17]] == 2)
            {
                var k7 = ai[1][this.dni[k17]];
                this.bfeatures[7][this.features[21][k7]] = true;
                this.bfeatures[7][this.features[22][k7]] = true;
            }
            if(this.bb[4][3][k17] && ai[2][this.lni[k17]] == 2)
            {
                var l7 = ai[1][this.lni[k17]];
                this.bfeatures[7][this.features[21][l7]] = true;
                this.bfeatures[7][this.features[22][l7]] = true;
            }
        }

        this.makegp(ai);
        this.makeeyevals(ai);
    }

    this.makeeyevals = function(ai)
    {
        var flag = false;
        var flag1 = false;
        var flag2 = false;
        var flag3 = false;
        for(var k1 = 0; k1 <= 361; k1++)
        {
            this.features[25][k1] = 0;
            this.features[26][k1] = 0;
            this.features[27][k1] = 0;
            this.features[28][k1] = 0;
        }

        for(var l1 = 0; l1 < 361; l1++)
        {
            var i = 0;
            var j = 0;
            var k = 0;
            var i1 = 0;
            if(this.uni[this.rni[l1]] < 361 && ai[0][this.uni[this.rni[l1]]] == 0)
            {
                if(!this.bfeatures[2][this.uni[this.rni[l1]]])
                    i++;
                if(!this.bfeatures[3][this.uni[this.rni[l1]]])
                    j++;
            }
            if(this.uni[this.rni[l1]] < 361 && ai[0][this.uni[this.rni[l1]]] == 1 && !this.bfeatures[4][this.uni[this.rni[l1]]])
                i1++;
            if(this.uni[this.rni[l1]] < 361 && ai[0][this.uni[this.rni[l1]]] == -1 && !this.bfeatures[4][this.uni[this.rni[l1]]])
                k++;
            if(this.uni[this.lni[l1]] < 361 && ai[0][this.uni[this.lni[l1]]] == 0)
            {
                if(!this.bfeatures[2][this.uni[this.lni[l1]]])
                    i++;
                if(!this.bfeatures[3][this.uni[this.lni[l1]]])
                    j++;
            }
            if(this.uni[this.lni[l1]] < 361 && ai[0][this.uni[this.lni[l1]]] == 1 && !this.bfeatures[4][this.uni[this.lni[l1]]])
                i1++;
            if(this.uni[this.lni[l1]] < 361 && ai[0][this.uni[this.lni[l1]]] == -1 && !this.bfeatures[4][this.uni[this.lni[l1]]])
                k++;
            if(this.dni[this.rni[l1]] < 361 && ai[0][this.dni[this.rni[l1]]] == 0)
            {
                if(!this.bfeatures[2][this.dni[this.rni[l1]]])
                    i++;
                if(!this.bfeatures[3][this.dni[this.rni[l1]]])
                    j++;
            }
            if(this.dni[this.rni[l1]] < 361 && ai[0][this.dni[this.rni[l1]]] == 1 && !this.bfeatures[4][this.dni[this.rni[l1]]])
                i1++;
            if(this.dni[this.rni[l1]] < 361 && ai[0][this.dni[this.rni[l1]]] == -1 && !this.bfeatures[4][this.dni[this.rni[l1]]])
                k++;
            if(this.dni[this.lni[l1]] < 361 && ai[0][this.dni[this.lni[l1]]] == 0)
            {
                if(!this.bfeatures[2][this.dni[this.lni[l1]]])
                    i++;
                if(!this.bfeatures[3][this.dni[this.lni[l1]]])
                    j++;
            }
            if(this.dni[this.lni[l1]] < 361 && ai[0][this.dni[this.lni[l1]]] == 1 && !this.bfeatures[4][this.dni[this.lni[l1]]])
                i1++;
            if(this.dni[this.lni[l1]] < 361 && ai[0][this.dni[this.lni[l1]]] == -1 && !this.bfeatures[4][this.dni[this.lni[l1]]])
                k++;
            if(this.inner[l1])
            {
                if(k == 0 && i <= 1)
                    this.features[25][l1] = 4;
                if(k == 0 && i == 2)
                    this.features[25][l1] = 3;
                if(k == 1 && i == 0)
                    this.features[25][l1] = 4;
                if(k == 1 && i == 1)
                    this.features[25][l1] = 3;
                if(i1 == 0 && j <= 1)
                    this.features[26][l1] = 4;
                if(i1 == 0 && j == 2)
                    this.features[26][l1] = 3;
                if(i1 == 1 && j == 0)
                    this.features[26][l1] = 4;
                if(i1 == 1 && j == 1)
                    this.features[26][l1] = 3;
                continue;
            }
            if(k == 0 && i == 0)
                this.features[25][l1] = 4;
            if(k == 0 && i == 1)
                this.features[25][l1] = 3;
            if(i1 == 0 && j == 0)
                this.features[26][l1] = 4;
            if(i1 == 0 && j == 1)
                this.features[26][l1] = 3;
        }

        for(var i2 = 0; i2 < 361; i2++)
        {
            if(ai[0][i2] != 0)
                continue;
            if(this.features[13][i2] == 0 && this.features[26][i2] == 4)
                this.features[28][i2] = 1024;
            if(this.features[13][i2] == 0 && this.features[26][i2] == 3)
                this.features[28][i2] = 512;
            if(this.features[14][i2] == 0 && this.features[25][i2] == 4)
                this.features[27][i2] = 1024;
            if(this.features[14][i2] == 0 && this.features[25][i2] == 3)
                this.features[27][i2] = 512;
            if(this.features[13][i2] == 1 && this.features[26][i2] == 4)
                this.features[28][i2] = 682;
            if(this.features[13][i2] == 1 && this.features[26][i2] == 3)
                this.features[28][i2] = 341;
            if(this.features[14][i2] == 1 && this.features[25][i2] == 4)
                this.features[27][i2] = 682;
            if(this.features[14][i2] == 1 && this.features[25][i2] == 3)
                this.features[27][i2] = 341;
            if(this.features[13][i2] == 2 && this.features[26][i2] == 4)
                this.features[28][i2] = 341;
            if(this.features[13][i2] == 2 && this.features[26][i2] == 3)
                this.features[28][i2] = 170;
            if(this.features[14][i2] == 2 && this.features[25][i2] == 4)
                this.features[27][i2] = 341;
            if(this.features[14][i2] == 2 && this.features[25][i2] == 3)
                this.features[27][i2] = 170;
        }

        for(var j2 = 0; j2 < 361; j2++)
        {
            if(ai[0][j2] != 0)
                continue;
            if(this.rn[j2] && this.features[27][j2] >= 512 && this.features[27][this.rni[j2]] >= 512)
            {
                this.features[27][j2] = 512;
                this.features[27][this.rni[j2]] = 512;
            }
            if(this.un[j2] && this.features[27][j2] >= 512 && this.features[27][this.uni[j2]] >= 512)
            {
                this.features[27][j2] = 512;
                this.features[27][this.uni[j2]] = 512;
            }
            if(this.rn[j2] && this.features[28][j2] >= 512 && this.features[28][this.rni[j2]] >= 512)
            {
                this.features[28][j2] = 512;
                this.features[28][this.rni[j2]] = 512;
            }
            if(this.un[j2] && this.features[28][j2] >= 512 && this.features[28][this.uni[j2]] >= 512)
            {
                this.features[28][j2] = 512;
                this.features[28][this.uni[j2]] = 512;
            }
        }

        for(var k2 = 0; k2 < 361; k2++)
        {
            if(ai[0][k2] != 0)
                continue;
            if(this.features[27][k2] < 502 && this.features[27][this.uni[k2]] == 0 && this.features[27][this.rni[k2]] == 0 && this.features[27][this.dni[k2]] == 0 && this.features[27][this.lni[k2]] == 0)
                this.features[27][k2] = 0;
            if(this.features[28][k2] < 502 && this.features[28][this.uni[k2]] == 0 && this.features[28][this.rni[k2]] == 0 && this.features[28][this.dni[k2]] == 0 && this.features[28][this.lni[k2]] == 0)
                this.features[28][k2] = 0;
        }

        for(var l2 = 0; l2 < 361; l2++)
        {
            if(ai[0][l2] == 1)
            {
                var j1 = 0;
                if(this.un[l2] && ai[0][this.uni[l2]] == 1)
                    j1++;
                if(this.un[l2] && ai[0][this.uni[l2]] == 0)
                    this.features[28][this.uni[l2]] = 0;
                if(this.rn[l2] && ai[0][this.rni[l2]] == 1)
                    j1++;
                if(this.rn[l2] && ai[0][this.rni[l2]] == 0)
                    this.features[28][this.rni[l2]] = 0;
                if(this.dn[l2] && ai[0][this.dni[l2]] == 1)
                    j1++;
                if(this.dn[l2] && ai[0][this.dni[l2]] == 0)
                    this.features[28][this.dni[l2]] = 0;
                if(this.ln[l2] && ai[0][this.lni[l2]] == 1)
                    j1++;
                if(this.ln[l2] && ai[0][this.lni[l2]] == 0)
                    this.features[28][this.lni[l2]] = 0;
                if(j1 == 0 && this.features[26][l2] == 4)
                    this.features[28][l2] = 1024;
                if(j1 == 0 && this.features[26][l2] == 3)
                    this.features[28][l2] = 512;
                if(j1 == 1 && this.features[26][l2] == 4)
                    this.features[28][l2] = 512;
            }
            if(ai[0][l2] != -1)
                continue;
            var l = 0;
            if(this.un[l2] && ai[0][this.uni[l2]] == -1)
                l++;
            if(this.un[l2] && ai[0][this.uni[l2]] == 0)
                this.features[27][this.uni[l2]] = 0;
            if(this.rn[l2] && ai[0][this.rni[l2]] == -1)
                l++;
            if(this.rn[l2] && ai[0][this.rni[l2]] == 0)
                this.features[27][this.rni[l2]] = 0;
            if(this.dn[l2] && ai[0][this.dni[l2]] == -1)
                l++;
            if(this.dn[l2] && ai[0][this.dni[l2]] == 0)
                this.features[27][this.dni[l2]] = 0;
            if(this.ln[l2] && ai[0][this.lni[l2]] == -1)
                l++;
            if(this.ln[l2] && ai[0][this.lni[l2]] == 0)
                this.features[27][this.lni[l2]] = 0;
            if(l == 0 && this.features[25][l2] == 4)
                this.features[27][l2] = 1024;
            if(l == 0 && this.features[26][l2] == 3)
                this.features[27][l2] = 512;
            if(l == 1 && this.features[26][l2] == 4)
                this.features[27][l2] = 512;
        }

    }

    this.makefeatures2 = function(ai)
    {
        this.makelinkscores(ai);
        for(var i = 0; i < 361; i++)
        {
            this.features2[0][i] = this.finalscores[i];
            this.features2[1][i] = 1024 - this.finalscores[i];
            if(ai[0][i] == 1)
            {
                this.features2[0][i] = 1024;
                if(this.bfeatures[5][i])
                    this.features2[1][i] = 1024;
            }
            if(ai[0][i] == -1)
            {
                this.features2[1][i] = 1024;
                if(this.bfeatures[5][i])
                    this.features2[0][i] = 1024;
            }
            if(ai[0][i] != 0)
                continue;
            if(this.gp[0][i] == 1)
                this.features2[0][i] = 1024;
            if(this.gp[1][i] == 1)
                this.features2[1][i] = 1024;
        }

        for(var j = 0; j < 361; j++)
        {
            if(this.enc[j] && ai[0][j] == 0 && ai[3][5] == 1 && this.features[13][j] >= 2)
            {
                if(ai[0][this.erni[j]] == -1 && ai[2][this.erni[j]] <= 2)
                    this.features2[1][j] = 0;
                if(ai[0][this.elni[j]] == -1 && ai[2][this.elni[j]] <= 2)
                    this.features2[1][j] = 0;
                if(this.features[13][j] > 2 && ai[0][this.euni[j]] == 0 && ai[0][this.euni[this.euni[j]]] == 1)
                {
                    if(ai[0][this.erni[this.euni[j]]] != -1 && this.features[13][this.erni[j]] > 2)
                    {
                        this.features2[1][j] = this.features2[1][this.euni[this.euni[j]]];
                        this.features2[1][this.euni[j]] = this.features2[1][this.euni[this.euni[j]]];
                    }
                    if(ai[0][this.elni[this.euni[j]]] != -1 && this.features[13][this.elni[j]] > 2)
                    {
                        this.features2[1][j] = this.features2[1][this.euni[this.euni[j]]];
                        this.features2[1][this.euni[j]] = this.features2[1][this.euni[this.euni[j]]];
                    }
                }
            }
            if(!this.enc[j] || ai[0][j] != 0 || ai[3][5] != 0 || this.features[14][j] < 2)
                continue;
            if(ai[0][this.erni[j]] == 1 && ai[2][this.erni[j]] <= 2)
                this.features2[0][j] = 0;
            if(ai[0][this.elni[j]] == 1 && ai[2][this.elni[j]] <= 2)
                this.features2[0][j] = 0;
            if(this.features[14][j] <= 2 || ai[0][this.euni[j]] != 0 || ai[0][this.euni[this.euni[j]]] != -1)
                continue;
            if(ai[0][this.erni[this.euni[j]]] != 1 && this.features[14][this.erni[j]] > 2)
            {
                this.features2[0][j] = this.features2[0][this.euni[this.euni[j]]];
                this.features2[0][this.euni[j]] = this.features2[0][this.euni[this.euni[j]]];
            }
            if(ai[0][this.elni[this.euni[j]]] != 1 && this.features[14][this.elni[j]] > 2)
            {
                this.features2[0][j] = this.features2[0][this.euni[this.euni[j]]];
                this.features2[0][this.euni[j]] = this.features2[0][this.euni[this.euni[j]]];
            }
        }

    }

    this.maketested = function(ai)
    {
        var flag = false;
        var flag1 = false;
        for(var j1 = 0; j1 < 361; j1++)
        {
            this.distances[1][j1] = 361;
            this.distances[0][j1] = 361;
        }

        label0:
        for(var k1 = 0; k1 < 361; k1++)
        {
            if(ai[0][k1] == 0)
                continue;
            var i = k1 % 19;
            var j = k1 / 19;
            var i2 = i - 4;
            do
            {
                if(i2 > i + 4)
                    continue label0;
                for(var j2 = j - 4; j2 < j + 4; j2++)
                {
                    if(i2 < 0 || j2 < 0 || i2 >= 19 || j2 >= 19)
                        continue;
                    var i1 = 19 * j2 + i2;
                    var k = i - i2;
                    if(k < 0)
                        k = -k;
                    var l = j - j2;
                    if(l < 0)
                        l = -l;
                    k += l;
                    if(ai[0][k1] == 1 && this.distances[1][i1] > k)
                        this.distances[1][i1] = k;
                    if(ai[0][k1] == -1 && this.distances[0][i1] > k)
                        this.distances[0][i1] = k;
                }

                i2++;
            } while(true);
        }

        for(var l1 = 0; l1 < 361; l1++)
        {
            this.tested[l1] = false;
            if(ai[0][l1] == 0)
                this.tested[l1] = true;
            if(this.edge[l1] && this.distances[1][l1] > 2 && this.distances[0][l1] > 2)
                this.tested[l1] = false;
            if(ai[3][5] == 1 && this.edgenhr[l1] && this.distances[0][l1] > 4)
                this.tested[l1] = false;
            if(ai[3][5] == 0 && this.edgenhr[l1] && this.distances[1][l1] > 4)
                this.tested[l1] = false;
            if(ai[3][5] == 1 && this.distances[1][l1] == 1 && this.distances[0][l1] > 3)
                this.tested[l1] = false;
            if(ai[3][5] == 0 && this.distances[0][l1] == 1 && this.distances[1][l1] > 3)
                this.tested[l1] = false;
            if(ai[0][l1] == 0)
            {
                if(this.un[l1] && ai[0][this.uni[l1]] != 0 && ai[2][ai[1][this.uni[l1]]] < 3)
                    this.tested[l1] = true;
                if(this.dn[l1] && ai[0][this.dni[l1]] != 0 && ai[2][ai[1][this.dni[l1]]] < 3)
                    this.tested[l1] = true;
                if(this.rn[l1] && ai[0][this.rni[l1]] != 0 && ai[2][ai[1][this.rni[l1]]] < 3)
                    this.tested[l1] = true;
                if(this.ln[l1] && ai[0][this.lni[l1]] != 0 && ai[2][ai[1][this.lni[l1]]] < 3)
                    this.tested[l1] = true;
            }
            var byte0;
            if(ai[3][5] == 1)
                byte0 = 1;
            else
                byte0 = -1;
            var flag2 = true;
            if(ai[0][this.uni[l1]] == 0)
                flag2 = false;
            if(ai[0][this.rni[l1]] == 0)
                flag2 = false;
            if(ai[0][this.dni[l1]] == 0)
                flag2 = false;
            if(ai[0][this.lni[l1]] == 0)
                flag2 = false;
            if(ai[0][this.uni[l1]] == byte0 && ai[2][this.uni[l1]] > 1)
                flag2 = false;
            if(ai[0][this.rni[l1]] == byte0 && ai[2][this.rni[l1]] > 1)
                flag2 = false;
            if(ai[0][this.dni[l1]] == byte0 && ai[2][this.dni[l1]] > 1)
                flag2 = false;
            if(ai[0][this.lni[l1]] == byte0 && ai[2][this.lni[l1]] > 1)
                flag2 = false;
            if(ai[0][this.uni[l1]] == -byte0 && ai[2][this.uni[l1]] == 1)
                flag2 = false;
            if(ai[0][this.rni[l1]] == -byte0 && ai[2][this.rni[l1]] == 1)
                flag2 = false;
            if(ai[0][this.dni[l1]] == -byte0 && ai[2][this.dni[l1]] == 1)
                flag2 = false;
            if(ai[0][this.lni[l1]] == -byte0 && ai[2][this.lni[l1]] == 1)
                flag2 = false;
            if(flag2)
                this.tested[l1] = false;
        }

        if(ai[3][6] >= 0)
            this.tested[ai[3][6]] = false;
        this.tested[361] = true;
    }

    this.makeverdict = function()
    {
        var i = 0;
        var j = 0;
        var k = 0;
        var l = 0;
        var f = 0.0;
        var flag = false;
        for(var j2 = 0; j2 < 361; j2++)
            switch(this.board[0][j2])
            {
            default:
                break;

            case 0: // '\0'
                var i1 = this.finalscores[j2] - 512;
                var j1 = i1;
                if(j1 < 0)
                    j1 = -j1;
                i1 = i1 + (i1 * j1 >> 9) >> 1;
                var k1 = 1024;
                var l1 = 0;
                if(this.un[j2] && k1 > this.finalscores[this.uni[j2]])
                    k1 = this.finalscores[this.uni[j2]];
                if(this.rn[j2] && k1 > this.finalscores[this.rni[j2]])
                    k1 = this.finalscores[this.rni[j2]];
                if(this.dn[j2] && k1 > this.finalscores[this.dni[j2]])
                    k1 = this.finalscores[this.dni[j2]];
                if(this.ln[j2] && k1 > this.finalscores[this.lni[j2]])
                    k1 = this.finalscores[this.lni[j2]];
                if(this.un[j2] && l1 < this.finalscores[this.uni[j2]])
                    l1 = this.finalscores[this.uni[j2]];
                if(this.rn[j2] && l1 < this.finalscores[this.rni[j2]])
                    l1 = this.finalscores[this.rni[j2]];
                if(this.dn[j2] && l1 < this.finalscores[this.dni[j2]])
                    l1 = this.finalscores[this.dni[j2]];
                if(this.ln[j2] && l1 < this.finalscores[this.lni[j2]])
                    l1 = this.finalscores[this.lni[j2]];
                var i2 = 1024 - (l1 - k1);
                i2 = i2 * i2 >> 10;
                j1 = 512 + (i1 * i2 >> 10);
                this.verdict[j2] = 0;
                if(j1 > 768)
                {
                    this.verdict[j2] = 1;
                    i++;
                }
                if(j1 < 256)
                {
                    this.verdict[j2] = -1;
                    j++;
                }
                if(verdict[j2] == 0 && this.finalscores[j2] - this.board[4][j2] > 204)
                {
                    this.verdict[j2] = 1;
                    i++;
                }
                if(verdict[j2] == 0 && this.board[4][j2] - this.finalscores[j2] > 204)
                {
                    this.verdict[j2] = -1;
                    j++;
                }
                break;

            case 1: // '\001'
                var flag1 = false;
                if(this.finalprobs[j2] > 409)
                    flag1 = true;
                if(finalscores[j2] - this.board[4][j2] > 204)
                    flag1 = true;
                if(flag1)
                {
                    this.verdict[j2] = 1;
                } else
                {
                    this.verdict[j2] = -1;
                    k++;
                    j++;
                }
                break;

            case -1: 
                var flag2 = false;
                if(this.finalprobs[j2] > 409)
                    flag2 = true;
                if(this.board[4][j2] - this.finalscores[j2] > 204)
                    flag2 = true;
                if(flag2)
                {
                    this.verdict[j2] = -1;
                } else
                {
                    this.verdict[j2] = 1;
                    l++;
                    i++;
                }
                break;
            }

        f = (i + l + this.board[3][2]) - (j + k + this.board[3][3]);
        if(this.handicap == 0)
            if(this.board[3][8] == 1)
                f = (f - 6.5);
            else
                f = (f + 6.5);
        if(f > 0.0)
            this.message = "De computer wvar met " + f + " punt verschil.";
        if(f == 0.0)
            this.message = "Gelijkspel!";
        if(f < 0.0)
            this.message = "Jij wvar met " + -f + " punt verschil.";
    }
}
