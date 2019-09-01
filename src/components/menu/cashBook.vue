<template>
  <div class="cash_book">
    <div class="cash_list_operator">
      <img src="@/assets/images/add.png" @click="createAccount()">
    </div>
    <template>
      <el-table stripe :data="tableData" :show-summary="true" style="width: 100%;" height="calc(100% - 110px)">
        <el-table-column type="index" width="50" label="#">
        </el-table-column>
        <el-table-column prop="des" label="费用描述" min-width="300">
        </el-table-column>
        <el-table-column prop="spend" label="费用（元）" width="180">
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
      <el-dialog title="增加费用" :close-on-click-modal="false" :visible.sync="dialogVisible" width="30%" @close="closeDialog()">
        <el-form :model="accountForm" :rules="rules" ref="accountForm" label-width="60px">
          <el-form-item label="金额" prop="spend">
            <el-input v-model.number="accountForm.spend" type="number" @input="rulsFormValidate('accountForm')"></el-input>
          </el-form-item>
          <el-form-item label="描述" prop="des">
            <el-input v-model="accountForm.des" @input="rulsFormValidate('accountForm')"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" :disabled="isDisableToSave" @click="saveAccount()">保存</el-button>
        </span>
      </el-dialog>
    </template>
  </div>
</template>

<script>
import { eventBus } from '@/eventBus.js'
export default {
  name: 'CashBook',
  data () {
    return {
      dialogVisible: false,
      isCreateAccount: false,
      activeRowIndex: -1,
      isDisableToSave: true,
      accountForm: {
        spend: '',
        des: ''
      },
      rules: {
        spend: [
          {required: true, message: '请输入花费金额'},
          {type: 'number', min: Number.EPSILON, message: '金额必须是大于0的数值'}
        ],
        des: [
          {required: true, message: '请填写花费描述'}
        ]
      },
      tableData: [{
        des: '买早饭',
        spend: '3.5'
      }, {
        des: '乘地铁上班',
        spend: '5'
      }, {
        des: '共享单车',
        spend: '1.5'
      }, {
        des: '吃午饭',
        spend: '18'
      }, {
        des: '乘地铁下班',
        spend: '5'
      }, {
        des: '吃晚饭',
        spend: '14'
      }]
    }
  },
  methods: {
    createAccount: function () {
      this.accountForm = {
        spend: '',
        des: ''
      }
      this.dialogVisible = true
      this.isCreateAccount = true
      // 避免上来就校验
      setTimeout(() => {
        this.$refs['accountForm'].clearValidate()
      })
    },
    editTask: function (rowIndex) {
      let editData = this.tableData[rowIndex]
      this.accountForm.spend = Number(editData['spend'])
      this.accountForm.des = editData['des']
      this.dialogVisible = true
      this.activeRowIndex = rowIndex
    },
    deleteTask: function (rowIndex) {
      this.tableData.splice(rowIndex, 1)
    },
    closeDialog: function () {
      this.isDisableToSave = true
      this.isCreateAccount = false
      this.activeRowIndex = -1
    },
    saveAccount: function () {
      this.dialogVisible = false
      if (this.isCreateAccount) {
        this.tableData.push({
          des: this.accountForm.des,
          spend: this.accountForm.spend
        })
      } else {
        this.tableData[this.activeRowIndex]['des'] = this.accountForm.des
        this.tableData[this.activeRowIndex]['spend'] = this.accountForm.spend
      }
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
    eventBus.$emit('leafNavChange', 2)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .cash_book {
    height: 100%;
    width: 100%;
    padding: 0 20px;
    overflow: hidden;
    box-sizing: border-box;
  }
  .cash_list_operator {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    width: calc(100% - 40px);
    height: 60px;
    padding-left: 20px;
    box-sizing: border-box;
  }
  .cash_list_operator img {
    height: 30px;
    cursor: pointer;
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
</style>
