var app = new Vue({
    el: ".game-group",
    data: {
      recommendInfo: "隨便出",
      paperCount: 3,
      scissorsCount: 3,
      stoneCount: 3,
      paperWinRate: 33.3,
      paperDrawRate: 33.3,
      scissorsWinRate: 33.3,
      scissorsDrawRate: 33.3,
      stoneWinRate: 33.3,
      stoneDrawRate: 33.3,
      allCount: 9
    },
    methods: {
      sub: function (punchName) {
        if (punchName === "paper") {
          this.paperCount -= 1;
        } else if (punchName === "scissors") {
          this.scissorsCount -= 1;
        } else if (punchName === "stone"){
          this.stoneCount -= 1
        };
        this.allCount -= 1;
        app.countPaperRate();
        app.countScissorsRate();
        app.countStoneRate();
        app.recommendCompute();
      },
      reset: function () {
        this.paperCount = 3;
        this.scissorsCount = 3;
        this.stoneCount = 3;
        this.allCount = 9;
        this.recommendInfo = "隨便出";
        app.countPaperRate();
        app.countScissorsRate();
        app.countStoneRate();
      },
      countPaperRate: function () {
        this.paperWinRate = (this.stoneCount / this.allCount * 100).toFixed(1);
        this.paperDrawRate = (this.paperCount / this.allCount * 100).toFixed(1);
      },
      countScissorsRate: function () {
        this.scissorsWinRate = (this.paperCount / this.allCount * 100).toFixed(1);
        this.scissorsDrawRate = (this.scissorsCount / this.allCount * 100).toFixed(1);
      },
      countStoneRate: function () {
        this.stoneWinRate = (this.stoneCount / this.allCount * 100).toFixed(1);
        this.stoneDrawRate = (this.stoneCount / this.allCount * 100).toFixed(1);
      },
      recommendCompute: function (){
        let paper = parseInt(this.paperWinRate);
        let scissors = parseInt(this.scissorsWinRate);
        let stone = parseInt(this.stoneWinRate);
        let recommendResult = Math.max(paper, scissors, stone);
        
        if(recommendResult === paper){
          this.recommendInfo = "布";
        }else if(recommendResult === scissors){
          this.recommendInfo = "剪刀";
        }else if(recommendResult === stone){
          this.recommendInfo = "石頭";
        }
      }
    }
  });
  