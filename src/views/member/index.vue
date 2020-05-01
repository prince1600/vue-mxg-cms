<template>
  <div>
    <!-- 搜索表单域 -->
    <el-form ref="searchForm" :inline="true" :model="searchMap" style="margin-top: 10px">
      <el-form-item prop="cardNum">
        <el-input v-model="searchMap.cardNum" placeholder="会员卡号"></el-input>
      </el-form-item>
      <el-form-item prop="name">
        <el-input v-model="searchMap.name" placeholder="会员名"></el-input>
      </el-form-item>
      <el-form-item prop="payType" >
        <el-select v-model="searchMap.payType" placeholder="支付类型" style="width:140px">
          <el-option
            v-for="option in payTypeOptions"
            :key="option.type"
            :label="option.name"
            :value="option.type"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="birth">
        <el-date-picker
          value-format="yyyy-MM-dd"
          v-model="searchMap.birth"
          type="date"
          placeholder="出生日期"
        ></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getData">查询</el-button>
        <el-button @click="resetForm('searchForm')">重置</el-button>
        <el-button type="primary" @click="openDialog" class="add-member">添加会员</el-button>
      </el-form-item>
    </el-form>
    <!-- 信息列表 -->
    <el-table :data="memberList" stripe height="380">
      <!-- type="index" 显示索引值，从1开始自增 -->
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column prop="name" label="姓名" width="80"></el-table-column>
      <el-table-column prop="birth" label="生日" width="100"></el-table-column>
      <el-table-column prop="cardNum" label="卡号" width="170"></el-table-column>
      <el-table-column prop="phone" label="电话" width="130"></el-table-column>
      <el-table-column prop="integral" label="积分" width="60"></el-table-column>
      <el-table-column prop="money" label="余额" width="80"></el-table-column>
      <el-table-column prop="payType" label="支付方式" width="80">
        <template slot-scope="scope">
          <span>{{scope.row.payType | payTypeFilter}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="地址" width="200"></el-table-column>
      <el-table-column label="操作" width="300">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row.id)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 20, 30]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      style="margin-top: 20px"
    ></el-pagination>
    <!-- 弹窗 -->
    <el-dialog title="编辑会员信息" :visible.sync="dialogFormVisible" width="35%">
      <el-form 
        ref="addMemberForm"
        :model="addFormItems"
        :label-width="formLabelWidth"
        label-position="right"
        style="width:400px"
        :rules="rules">
        <el-form-item label="会员姓名" prop="name">
          <el-input v-model="addFormItems.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="会员卡号" prop="cardNum">
          <el-input v-model="addFormItems.cardNum" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="会员生日" prop="birth">
          <el-date-picker
            value-format="yyyy-MM-dd"
            v-model="addFormItems.birth"
            type="date"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="会员电话" prop="phone">
          <el-input v-model="addFormItems.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="会员积分" prop="integral">
          <el-input v-model="addFormItems.integral" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="会员余额" prop="money">
          <el-input v-model="addFormItems.money" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="支付方式" prop="payType">
          <el-select v-model="addFormItems.payType" placeholder="请选择支付方式">
            <el-option v-for="item in payTypeOptions" :key="item.type" :label="item.name" :value="item.type"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="会员地址" prop="address">
          <el-input type="textarea" v-model="addFormItems.address" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button 
        type="primary"
        @click="addFormItems.id===null ? submitData('addMemberForm') : updateMember(addFormItems.id, addFormItems)">提 交</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import memberApi from "@/api/member";
//payTypeOptions全局变量，若定义在vue内部，过滤器不能引用当前实例
const payTypeOptions = [
  { type: "1", name: "微信" },
  { type: "2", name: "支付宝" },
  { type: "3", name: "银行卡" },
  { type: "4", name: "现金" }
];
export default {
  
  data() {
    return {
      rules: {
          name: [
              {required: true, message: '不能为空', trigger: 'blur'  }
          ],
          cardNum: [
              {required: true, message: '不能为空', trigger: 'blur'  }
          ],
          payType: [
              {required: true, message: '不能为空', trigger: 'change'  }
          ],
      },
      formLabelWidth: "100px",
      total: 0,
      memberList: [],
      currentPage: 1,
      pageSize: 10,
      searchMap: {
        cardNum: "",
        name: "",
        birth: "",
        payType: ""
      },
      addFormItems: {
        id: null,
        cardNum: "",
        name: "",
        birth: "",
        phone: "",
        money: "",
        payType: "",
        address: "",
        integral: ""
      },
      dialogFormVisible: false,
      payTypeOptions
    };
  },
  created() {
    this.getData();
  },
  methods: {
    //打开新增会员弹窗，重置表单，重置id为null
    openDialog(){
        this.addFormItems.id = null
        this.dialogFormVisible = true
        this.$nextTick(() => {this.$refs['addMemberForm'].resetFields()})
        
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getData();
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getData();
    },
    getData() {
      memberApi
        .search(this.currentPage, this.pageSize, this.searchMap)
        .then(res => {
          this.total = res.data.data.total;
          this.memberList = res.data.data.rows;
        });
    },
    handleEdit(id) {
      console.log("编辑" + id);
      this.dialogFormVisible = true
      memberApi.getById(id).then(res => {
          if (res.data.flag) {
              this.addFormItems = res.data.data  
          } else {
              console.log('获取当前用户信息失败')
          }
      })
    },
    handleDelete(id) {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          memberApi.deleteById(id).then(res => {
              const flag = res.data.flag
              if (flag){
                  this.getData()
              } 
              this.$message({
                  message: res.data.message,
                  type: flag? 'success' : 'error'
              })
          })
          
        }).catch(() => {});
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    submitData(formName) {
        this.$refs[formName].validate( valid => {
            if (valid) {
                memberApi.addMember(this.addFormItems).then(res => {
                    if (res.data.flag) {
                        this.$refs['addMemberForm'].resetFields()
                        this.$message('已新增会员信息');
                        this.dialogFormVisible = false
                    } else {
                        this.$message.error('提交失败,请稍后再试');
                    }
                })
            } else {
                return false
            }
        })
    },
    updateMember(id, data) {
        memberApi.update(id, data).then(res => {
                  if (res.data.flag) {
                      this.$message('已更新会员信息');
                  } else {
                      this.$message.error('提交失败,请稍后再试');
                  }
                  this.$refs['addMemberForm'].resetFields()
                  this.dialogFormVisible = false
              })
    }
  },
  filters: {
    payTypeFilter(type) {
      const item = payTypeOptions.find(item => type == item.type);
      return item ? item.name : null;
    }
  }
};
</script>

<style scoped>
.el-table {
  padding: 10px;
}
.add-member {
    margin-left: 25px!important;
}
</style>