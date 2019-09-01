<template>
  <div class="header">
    <div class="date_tip" v-if="chooseFlag === 1 || chooseFlag === 2">{{calcDate | dateFilter}}</div>
    <div class="date_tip" v-if="chooseFlag === 3 || chooseFlag === 4">{{calcDate}}</div>
    <div class="date_choose_arrow">
      <span><img class="arrow_left" src="@/assets/images/arrow_left.png" @click="chooseBefore()"></span>
      <span><img class="arrow_right" src="@/assets/images/arrow_right.png" @click="chooseAfter()"></span>
    </div>
    <div class="date_today" @click="chooseToday()" :class="{'activeBtn' : chooseFlag === 1}">今天</div>
    <div class="date_choose_btn">
      <span @click="chooseDay()" :class="{'activeBtn' : chooseFlag === 2}">日</span>
      <span @click="chooseWeek()" :class="{'activeBtn' : chooseFlag === 3}">周</span>
      <span @click="chooseMonth()" :class="{'activeBtn' : chooseFlag === 4}">月</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MyHeader',
  data () {
    return {
      // 1代表当前选中的是今天， 2代表当前选中的是日， 3代表当前选中是周,  4代表当前选中是的月
      chooseFlag: -1,
      currentChooseDate: null,
      oneDayTime: 24 * 60 * 60 * 1000
    }
  },
  created: function () {
    this.currentChooseDate = new Date()
    this.chooseFlag = 1
  },
  methods: {
    chooseToday: function () {
      this.chooseFlag = 1
      this.currentChooseDate = new Date()
    },
    chooseDay: function () {
      this.chooseFlag = 2
    },
    chooseWeek: function () {
      this.chooseFlag = 3
    },
    chooseMonth: function () {
      this.chooseFlag = 4
    },
    chooseBefore: function () {
      if (this.chooseFlag === 1) {
        this.chooseFlag = 2
        this.currentChooseDate = new Date(this.currentChooseDate.getTime() - this.oneDayTime)
      } else if (this.chooseFlag === 2) {
        this.currentChooseDate = new Date(this.currentChooseDate.getTime() - this.oneDayTime)
      } else if (this.chooseFlag === 3) {
        let sameDaylastWeek = this.currentChooseDate.getTime() - this.oneDayTime * 7
        let day = new Date(sameDaylastWeek).getDay()
        day === 0 && (day = 7)
        this.currentChooseDate = new Date(sameDaylastWeek - (day - 1) * this.oneDayTime)
      } else {
        let year = this.currentChooseDate.getFullYear()
        let month = this.currentChooseDate.getMonth()
        if (month === 0) {
          year--
          month = 11
        } else {
          month--
        }
        this.currentChooseDate = this.getMonthFirstDay(year, month)
      }
    },
    chooseAfter: function () {
      if (this.chooseFlag === 1) {
        this.chooseFlag = 2
        this.currentChooseDate = new Date(this.currentChooseDate.getTime() + this.oneDayTime)
      } else if (this.chooseFlag === 2) {
        this.currentChooseDate = new Date(this.currentChooseDate.getTime() + this.oneDayTime)
      } else if (this.chooseFlag === 3) {
        let sameDaylastWeek = this.currentChooseDate.getTime() + this.oneDayTime * 7
        let day = new Date(sameDaylastWeek).getDay()
        day === 0 && (day = 7)
        this.currentChooseDate = new Date(sameDaylastWeek - (day - 1) * this.oneDayTime)
      } else {
        let year = this.currentChooseDate.getFullYear()
        let month = this.currentChooseDate.getMonth()
        if (month === 11) {
          year++
          month = 0
        } else {
          month++
        }
        this.currentChooseDate = this.getMonthFirstDay(year, month)
      }
    },
    getMonthFirstDay: function (year, month) {
      return new Date(year, month, 1)
    },
    getMonDayAndSunDay: function (currentDate) {
      let currentMillisecond = this.currentChooseDate.getTime()
      let day = this.currentChooseDate.getDay()
      day === 0 && (day = 7)
      let MondayTime = currentMillisecond - (day - 1) * this.oneDayTime
      let SundayTime = currentMillisecond + (7 - day) * this.oneDayTime
      return {MondayDate: new Date(MondayTime), SundayDate: new Date(SundayTime)}
    },
    formatDate: function (date) {
      date < 10 && (date = '0' + date)
      return date
    }
  },
  computed: {
    calcDate: function () {
      let calcDate = null
      if ([1, 2].includes(this.chooseFlag)) {
        calcDate = this.currentChooseDate
      } else if (this.chooseFlag === 3) {
        let weekObj = this.getMonDayAndSunDay(this.currentChooseDate)
        let year = weekObj.MondayDate.getFullYear()
        let month = this.formatDate(weekObj.MondayDate.getMonth() + 1)
        let monDay = this.formatDate(weekObj.MondayDate.getDate())
        let sunDay = this.formatDate(weekObj.SundayDate.getDate())
        calcDate = `${year}-${month}-${monDay}~${sunDay}`
      } else {
        let month = this.currentChooseDate.getMonth() + 1
        month < 10 && (month = `0${month}`)
        let year = this.currentChooseDate.getFullYear()
        calcDate = `${year}-${month}`
      }
      return calcDate
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  border-bottom: 1px solid rgb(229, 229, 229);
}
.date_tip {
  min-width: 120px;
  margin: 0 10px;
  height: 100%;
  line-height: 50px;
  text-align: center;
}
.date_choose_arrow {
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin: 0 10px;
}
.date_choose_arrow img {
  height: 25px;
  cursor: pointer;
  box-sizing: border-box;
}
.date_choose_arrow span:hover img{
  border: 1px solid #2BBFF3;
}
.date_today {
  margin: 0 10px;
  border: 1px solid #CCC;
  width: 50px;
  text-align: center;
  cursor: pointer;
}
.date_choose_btn span {
  width: 40px;
  display: inline-block;
  text-align: center;
  border: 1px solid #ccc;
  box-sizing: border-box;
  cursor: pointer;
}
.activeBtn {
  background-color: #2BBFF3;
  color: #FFFFFF;
}
</style>
