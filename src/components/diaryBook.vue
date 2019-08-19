<template>
  <div class="diary_book">
    <div class="diary_wrapper">
      <div class="tool_bar">
        <img src="@/assets/images/add.png" @click="createDiary()">
        <img src="@/assets/images/save.png" @click="saveDiary()">
        <img src="@/assets/images/editDiary.png" @click="editDiary()">
      </div>
      <input class="diary_title"
        v-if="(isCreateNew && activeIndex === -1) || activeIndex > -1"
        :disabled="!isCanEdit" type="text"
        placeholder="请输入日记的标题"
        v-model="activeDiaryTitle"
        :class="{'no_border': activeDiaryTitle !== '', 'edit_mode': isCanEdit}"
      >
      <div class="divider" v-if="(isCreateNew && activeIndex === -1) || activeIndex > -1"></div>
      <textarea class="diary_content" v-if="(isCreateNew && activeIndex === -1) || activeIndex > -1" :disabled="!isCanEdit" v-model="activeDiaryContent" :class="{'edit_mode': isCanEdit}"></textarea>
    </div>
    <div class="diary_list">
      <div class="diary_list_tool_bar">
        <div>今天的日志：</div>
        <img src="@/assets/images/deleteDiary.png" @click="deleteDiary()">
      </div>
      <div class="diary_list_wrapper">
        <div class="diary_item" v-for="(item, index) of diaryList" :key="index" @click="chooseDiary(index)" :class="{'active': activeIndex === index}">
          <span>{{item.title}}</span>
          <span style="width:130px;">{{item.createTime | dateFilter}}</span>
        </div>
      </div>
    </div>
    <el-dialog title="您有更改未保存，确认保存吗？" :close-on-press-escape="false" :close-on-click-modal="false" :show-close="false" :visible.sync="dialogVisible" width="30%">
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialog(false)">取 消</el-button>
        <el-button type="primary" @click="closeDialog(true)">保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { eventBus } from '@/eventBus.js'
export default {
  name: 'DiaryBook',
  data () {
    return {
      activeIndex: 0,
      activeIndexToGo: 0,
      activeDiaryTitle: '',
      activeDiaryContent: '',
      isCanEdit: false,
      isCreateNew: false,
      dialogVisible: false,
      diaryList: [
        {
          title: '第一篇日志',
          content: '我思念我的家乡',
          createTime: '2016-05-03 09:48:00'
        },
        {
          title: '第二篇日志',
          content: '我其实还想上学',
          createTime: '2016-05-03 18:30:00'
        }
      ]
    }
  },
  methods: {
    createDiary: function () {
      if (this.isCanEdit) {
        this.dialogVisible = true
      } else {
        this.isCreateNew = true
        this.isCanEdit = true
        this.activeIndex = -1
        this.activeIndexToGo = -1
        this.activeDiaryTitle = ''
        this.activeDiaryContent = ''
      }
    },
    saveDiary: function () {
      let currentTime = new Date()
      if (!this.isCreateNew) {
        if (this.activeIndex > -1) {
          this.diaryList[this.activeIndex]['title'] = this.activeDiaryTitle
          this.diaryList[this.activeIndex]['content'] = this.activeDiaryContent
          this.diaryList[this.activeIndex]['createTime'] = currentTime
        }
      } else {
        this.diaryList.push({
          title: this.activeDiaryTitle,
          content: this.activeDiaryContent,
          createTime: currentTime
        })
        this.activeIndex = this.diaryList.length - 1
        this.activeIndexToGo = this.diaryList.length - 1
      }
      this.isCanEdit = false
      this.isCreateNew = false
    },
    editDiary: function () {
      if (this.activeIndex > -1) {
        this.isCanEdit = true
      }
    },
    deleteDiary: function () {
      if (this.activeIndex > -1) {
        this.diaryList.splice(this.activeIndex, 1)
        this.activeIndex = -1
        this.activeIndexToGo = -1
        this.activeDiaryTitle = ''
        this.activeDiaryContent = ''
        this.isCanEdit = false
      }
    },
    chooseDiary: function (index) {
      if (this.isCreateNew && (this.activeDiaryTitle !== '' || this.activeDiaryContent !== '')) {
        this.dialogVisible = true
      } else if (!this.isCreateNew && this.activeIndex > -1 && (this.activeDiaryTitle !== this.diaryList[this.activeIndex]['title'] || this.activeDiaryContent !== this.diaryList[this.activeIndex]['content'])) {
        this.dialogVisible = true
      } else {
        this.isCanEdit = false
        this.activeDiaryTitle = this.diaryList[index]['title']
        this.activeDiaryContent = this.diaryList[index]['content']
        this.activeIndex = index
        this.isCreateNew = false
      }
      this.activeIndexToGo = index
    },
    closeDialog: function (isSave) {
      this.dialogVisible = false
      if (isSave) {
        let currentTime = new Date()
        if (this.isCreateNew) {
          this.diaryList.push({
            title: this.activeDiaryTitle,
            content: this.activeDiaryContent,
            createTime: currentTime
          })
        } else {
          this.diaryList[this.activeIndex]['title'] = this.activeDiaryTitle
          this.diaryList[this.activeIndex]['content'] = this.activeDiaryContent
          this.diaryList[this.activeIndex]['createTime'] = currentTime
        }
      }
      this.isCanEdit = false
      this.activeDiaryTitle = this.diaryList[this.activeIndexToGo]['title']
      this.activeDiaryContent = this.diaryList[this.activeIndexToGo]['content']
      this.activeIndex = this.activeIndexToGo
      this.isCreateNew = false
    }
  },
  mounted () {
    eventBus.$emit('leafNavChange', 1)
    this.activeDiaryTitle = this.diaryList[0]['title']
    this.activeDiaryContent = this.diaryList[0]['content']
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .diary_book {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  }
  .diary_wrapper {
    height: 100%;
    flex: 1;
    background-color: #f3efe0;
  }
  .diary_list {
    width: 400px;
    height: 100%;
    background-color: #e9e9e9;
  }
  .diary_wrapper {
    padding: 0px 40px 40px;
    box-sizing: border-box;
    text-align: center;
  }
  .diary_title {
    display: inline-block;
    width: 400px;
    height: 40px;
    line-height: 40px;
    font-size: 20px;
    text-align: center;
    border: 1px dashed gray;
    background: transparent;
  }
  .divider {
    width: 100%;
    height: 0px;
    border-top: 1px dashed gray;
    margin-top: 30px;
  }
  .diary_content{
    height: calc(100% - 160px);
    width: 100%;
    border: none;
    resize: none;
    font-size: 15px;
    background: transparent;
  }
  .tool_bar {
    height: 60px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  }
  .tool_bar img {
    height: 30px;
    cursor: pointer;
  }
  .tool_bar img+img {
    margin-left: 30px;
  }
  .diary_list {
    padding: 15px;
    box-sizing: border-box;
  }
  .diary_list_wrapper {
    padding-left: 20px;
  }
  .diary_item {
    height: 40px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    font-size: 13px;
    font-weight: bold;
    border-bottom: 1px dashed blueviolet;
    cursor: pointer;
  }
  .diary_item span:first-child {
     flex:1;
     overflow: hidden;
     text-overflow: ellipsis;
     white-space: nowrap;
  }
  .active {
    color: #fff;
    background: #409EFF;
  }
  .no_border {
    border: none;
  }
  .edit_mode {
    background: #fff;
  }
  .diary_list_tool_bar {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    margin-bottom: 20px;
  }
  .diary_list_tool_bar img {
    height: 20px;
    cursor: pointer;
  }
  .diary_list_tool_bar div {
    color: blue;
    flex: 1;
  }
</style>
