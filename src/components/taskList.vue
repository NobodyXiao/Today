<template>
  <div class="task_list">
    <div class="task_list_operator">
      <img src="@/assets/images/add.png" @click="createTask()">
      <img src="@/assets/images/search.png" @click="searchTask()">
    </div>
    <el-table stripe :data="tableData" style="width: calc(100% - 40px);" height="calc(100% - 110px  )">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-input style="width: calc(100% - 140px);margin-left: 100px;" type="textarea" v-model="props.row.remarks" :autosize=true></el-input>
        </template>
      </el-table-column>
      <el-table-column label="#" width="90" fixed>
        <template slot-scope="scope">
          <el-checkbox :checked="Boolean(scope.row.status)" @change="taskStatusChange($event, scope.$index)"></el-checkbox>
        </template>
      </el-table-column>
      <el-table-column prop="description" label="任务描述" min-width="300">
      </el-table-column>
      <el-table-column prop="creatTime" label="创建时间" width="300">
      </el-table-column>
      <el-table-column prop="status" label="完成状态" width="180">
        <template slot-scope="scope">
          <p>{{scope.row.status == 1 ? "已完成" : "未完成"}}</p>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <div class="operator">
            <img src="@/assets/images/edit.png" alt="edit" @click="editTask(scope.$index)">
            <img src="@/assets/images/delete.png" alt="delete" @click="deleteTask(scope.$index)">
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="任务内容" :visible.sync="dialogVisible" width="30%" :before-close="handleClose" @close="closeDialog()">
      <span style="color:red;" v-if="emptyTextError">任务内容不能为空</span>
      <el-input type="textarea" v-model="activeDes" :autosize=true @change="textChange()" :class="{'empty_text':emptyTextError}"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" :disabled="isDisableToSave" @click="dialogVisible = false">保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'TaskList',
  data () {
    return {
      dialogVisible: false,
      activeTaskIndex: -1,
      activeDes: '',
      isDisableToSave: true,
      emptyTextError: false,
      isCreateTask: false,
      tableData: [
        {
          creatTime: '2016-05-03',
          description: '回家写作业1',
          status: 1,
          remarks: ''
        }, {
          creatTime: '2016-05-03',
          description: '回家写作业2',
          status: 1,
          remarks: ''
        }, {
          creatTime: '2016-05-03',
          description: '回家写作业3',
          status: 0,
          remarks: ''
        }, {
          creatTime: '2016-05-03',
          description: '回家写作业6',
          status: 0,
          remarks: ''
        }, {
          creatTime: '2016-05-03',
          description: '回家写作业4',
          status: 0,
          remarks: ''
        }, {
          creatTime: '2016-05-03',
          description: '回家写作业7',
          status: 0,
          remarks: ''
        }, {
          creatTime: '2016-05-03',
          description: '回家写作业5',
          status: 1,
          remarks: ''
        }]
    }
  },
  methods: {
    // 编辑当前任务的描述信息
    editTask: function (rowIndex) {
      this.dialogVisible = true
      this.activeDes = this.tableData[rowIndex].description
      this.activeTaskIndex = rowIndex
    },
    // 删除当前任务
    deleteTask: function (rowIndex) {
      this.tableData.splice(rowIndex, 1)
    },
    // 切换任务的完成状态
    taskStatusChange: function (event, rowIndex) {
      event ? this.tableData[rowIndex].status = 1 : this.tableData[rowIndex].status = 0
    },
    // 弹出框文本发生变化时，更改save按钮的状态
    textChange: function () {
      let descriptionOrg = ''
      if (this.tableData[this.activeTaskIndex]) {
        descriptionOrg = this.tableData[this.activeTaskIndex].description
      }
      if (this.activeDes === '') {
        this.isDisableToSave = true
        this.emptyTextError = true
      } else if (this.activeDes !== descriptionOrg) {
        this.isDisableToSave = false
        this.emptyTextError = false
      } else {
        this.isDisableToSave = true
        this.emptyTextError = false
      }
    },
    handleClose: function (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    closeDialog: function () {
      this.isDisableToSave = true
      this.emptyTextError = false
      if (this.isCreateTask === true) {
        this.isCreateTask = false
        let currentTime = new Date()
        this.tableData.push({
          creatTime: currentTime,
          description: this.activeDes,
          status: 0,
          remarks: ''
        })
      } else {
        this.tableData[this.activeTaskIndex].description = this.activeDes
      }
    },
    createTask: function () {
      this.isCreateTask = true
      this.dialogVisible = true
      this.activeDes = ''
    },
    searchTask: function () {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .task_list {
    height: 100%;
    width: 100%;
    padding: 0 20px;
    overflow: hidden;
  }
  .operator {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  }
  .operator img {
    height:20px;
    cursor: pointer;
  }
  .operator img+img {
    margin-left: 10px;
  }
  .empty_text {
    border: 1px solid red;
  }
  .task_list_operator {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    width: calc(100% - 40px);
    height: 60px;
    padding-left: 20px;
    box-sizing: border-box;
  }
  .task_list_operator img {
    height: 30px;
    cursor: pointer;
  }
  .task_list_operator img+img {
    margin-left: 30px;
  }
</style>
