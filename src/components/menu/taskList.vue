<template>
  <div class="task_list">
    <div class="task_list_operator">
      <img src="@/assets/images/add.png" @click="createTask()">
      <img src="@/assets/images/search.png" @click="searchTask()">
    </div>
    <el-table stripe :data="tableData" style="width: 100%;" height="calc(100% - 110px)">
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
      <el-table-column prop="des" label="任务描述" min-width="300">
      </el-table-column>
      <el-table-column prop="creatTime" label="创建时间" width="300">
        <template slot-scope="scope">
          <div>{{scope.row.creatTime | dateFilterWithTime}}</div>
        </template>
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
    <el-dialog title="新建任务" :close-on-click-modal="false" :visible.sync="dialogVisible" width="30%" @close="closeDialog()">
      <el-form :model="taskForm" :rules="rules" ref="taskForm" label-width="60px">
        <el-form-item label="内容" prop="des">
          <el-input v-model="taskForm.des" @input="rulsFormValidate('taskForm')"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" :disabled="isDisableToSave" @click="saveTask()" >保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { eventBus } from '@/eventBus.js'
export default {
  name: 'TaskList',
  data () {
    return {
      dialogVisible: false,
      activeTaskIndex: -1,
      isDisableToSave: true,
      isCreateTask: false,
      tableData: [
        {
          creatTime: '2016-05-03',
          des: '回家写作业1',
          status: 1,
          remarks: ''
        }, {
          creatTime: '2016-05-03',
          des: '回家写作业2',
          status: 1,
          remarks: ''
        }, {
          creatTime: '2016-05-03',
          des: '回家写作业3',
          status: 0,
          remarks: ''
        }, {
          creatTime: '2016-05-03',
          des: '回家写作业6',
          status: 0,
          remarks: ''
        }, {
          creatTime: '2016-05-03',
          des: '回家写作业4',
          status: 0,
          remarks: ''
        }, {
          creatTime: '2016-05-03',
          des: '回家写作业7',
          status: 0,
          remarks: ''
        }, {
          creatTime: '2016-05-03',
          des: '回家写作业5',
          status: 1,
          remarks: ''
        }],
      taskForm: {
        des: ''
      },
      rules: {
        des: [
          {required: true, message: '请填写任务内容'}
        ]
      }
    }
  },
  methods: {
    createTask: function () {
      this.taskForm = {
        des: ''
      }
      this.dialogVisible = true
      this.isCreateTask = true
      // 避免上来就校验
      setTimeout(() => {
        this.$refs['taskForm'].clearValidate()
      })
    },
    // 编辑当前任务的描述信息
    editTask: function (rowIndex) {
      let editData = this.tableData[rowIndex]
      this.taskForm.des = editData['des']
      this.dialogVisible = true
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
    closeDialog: function () {
      this.isDisableToSave = true
      this.isCreateTask = false
      this.activeTaskIndex = -1
    },
    saveTask: function () {
      let currentTime = new Date()
      if (this.isCreateTask === true) {
        this.isCreateTask = false
        this.tableData.push({
          creatTime: currentTime,
          des: this.taskForm.des,
          status: 0,
          remarks: ''
        })
      } else {
        this.tableData[this.activeTaskIndex].des = this.taskForm.des
        this.tableData[this.activeTaskIndex].creatTime = currentTime
      }
      this.dialogVisible = false
    },
    searchTask: function () {
    },
    rulsFormValidate: function (formName) {
      this.$nextTick(() => {
        this.$refs[formName].validate((valid) => {
          if (!valid) {
            this.isDisableToSave = true
          } else {
            this.isDisableToSave = false
          }
        })
      })
    }
  },
  mounted () {
    eventBus.$emit('leafNavChange', 0)
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
    box-sizing: border-box;
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
