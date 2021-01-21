import Vue from "vue";

const punchesEnum = {
  999: "隨便出",
  0: "布",
  1: "剪刀",
  2: "石頭"
};
var app = new Vue({
  el: ".game-group",
  data: {
    recommendInfo: punchesEnum[999],
    paperCount: 3,
    scissorsCount: 3,
    stoneCount: 3,
    paperWinRate: 33.3,
    paperDrawRate: 33.3,
    paperNoLoseRate: 66.6,
    scissorsNoLoseRate: 66.6,
    stoneNoLoseRate: 66.6,
    scissorsWinRate: 33.3,
    scissorsDrawRate: 33.3,
    stoneWinRate: 33.3,
    stoneDrawRate: 33.3,
    allCount: 9
  },
  methods: {
    add: function(punchName) {
      if (punchName === "paper") {
        this.paperCount += 1;
      } else if (punchName === "scissors") {
        this.scissorsCount += 1;
      } else if (punchName === "stone") {
        this.stoneCount += 1;
      }
      this.allCount += 1;
      app.countPaperRate();
      app.countScissorsRate();
      app.countStoneRate();
      app.recommendCompute();
    },
    sub: function(punchName) {
      if (punchName === "paper") {
        this.paperCount -= 1;
      } else if (punchName === "scissors") {
        this.scissorsCount -= 1;
      } else if (punchName === "stone") {
        this.stoneCount -= 1;
      }
      this.allCount -= 1;
      app.countPaperRate();
      app.countScissorsRate();
      app.countStoneRate();
      app.recommendCompute();
    },
    reset: function() {
      this.paperCount = 3;
      this.scissorsCount = 3;
      this.stoneCount = 3;
      this.allCount = 9;
      this.recommendInfo = punchesEnum[999];
      app.countPaperRate();
      app.countScissorsRate();
      app.countStoneRate();
    },
    countPaperRate: function() {
      this.paperWinRate = ((this.stoneCount / this.allCount) * 100).toFixed(1);
      this.paperDrawRate = ((this.paperCount / this.allCount) * 100).toFixed(1);
      this.paperNoLoseRate = (
        parseFloat(this.paperWinRate) + parseFloat(this.paperDrawRate)
      ).toFixed(1);
    },
    countScissorsRate: function() {
      this.scissorsWinRate = ((this.paperCount / this.allCount) * 100).toFixed(
        1
      );
      this.scissorsDrawRate = (
        (this.scissorsCount / this.allCount) *
        100
      ).toFixed(1);
      this.scissorsNoLoseRate = (
        parseFloat(this.scissorsWinRate) + parseFloat(this.scissorsDrawRate)
      ).toFixed(1);
    },
    countStoneRate: function() {
      this.stoneWinRate = ((this.scissorsCount / this.allCount) * 100).toFixed(
        1
      );
      this.stoneDrawRate = ((this.stoneCount / this.allCount) * 100).toFixed(1);
      this.stoneNoLoseRate = (
        parseFloat(this.stoneWinRate) + parseFloat(this.stoneDrawRate)
      ).toFixed(1);
    },
    getMaxWinRate: function() {
      let paper = parseFloat(this.paperWinRate);
      let scissors = parseFloat(this.scissorsWinRate);
      let stone = parseFloat(this.stoneWinRate);
      let maxWinRate = Math.max(paper, scissors, stone);
      // 0: paper, 1: scissors, 2: stone
      let punchList = [paper, scissors, stone];
      let result = [];
      for (let i = 0; i < 3; i++) {
        if (punchList[i] === maxWinRate) {
          result.push(i);
        }
      }
      return result;
    },
    getMaxDrawRate: function() {
      let paper = parseFloat(this.paperDrawRate);
      let scissors = parseFloat(this.scissorsDrawRate);
      let stone = parseFloat(this.stoneDrawRate);
      let maxDrawRate = Math.max(paper, scissors, stone);
      // 0: paper, 1: scissors, 2: stone
      let punchList = [paper, scissors, stone];
      let result = [];
      for (let i = 0; i < 3; i++) {
        if (punchList[i] === maxDrawRate) {
          result.push(i);
        }
      }
      return result;
    },
    recommendCompute: function() {
      // 0: paper, 1: scissors, 2: stone
      let maxWinRates = this.getMaxWinRate();
      let maxDrawRates = this.getMaxDrawRate();
      console.log(maxWinRates);
      console.log(maxDrawRates);
      if (maxWinRates.length > 1) {
        if (maxWinRates.length === 3) {
          this.recommendInfo = punchesEnum[999];
          return;
        }
        if (maxDrawRates.length > 1) {
          let result = "";
          for (let i = 0; i < maxDrawRates.length; i++) {
            if (maxWinRates.indexOf(maxDrawRates[i]) >= 0) {
              result += `${punchesEnum[maxDrawRates[i]]} `;
              console.log(punchesEnum[maxDrawRates[i]]);
            }
          }
          this.recommendInfo = result;
        } else {
          this.recommendInfo = punchesEnum[maxDrawRates[0]];
        }
      } else {
        this.recommendInfo = punchesEnum[maxWinRates[0]];
      }
    }
  }
});
