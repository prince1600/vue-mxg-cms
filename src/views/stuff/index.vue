<template>
  <div>
    <!-- 搜索区 -->
    <el-form :inline="true" :model="searchMap" ref="searchForm" style="margin-top: 20px">
      <el-form-item prop="username">
        <el-input v-model="searchMap.username" placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item prop="name">
        <el-input v-model="searchMap.name" placeholder="姓名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getList">查询</el-button>
        <el-button @click="resetSearchForm">重置</el-button>
        <el-button type="primary" @click="openDialog">新增员工</el-button>
      </el-form-item>
    </el-form>
    <!-- table -->
    <el-table :data="tableData" height="350" border style="width: 100%">
      <el-table-column type="index" label="序号" width="80"></el-table-column>
      <el-table-column prop="username" label="账号" width="180"></el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="age" label="年龄" width="80"></el-table-column>
      <el-table-column prop="phone" label="电话"></el-table-column>
      <el-table-column prop="salary" label="工资"></el-table-column>
      <el-table-column prop="hiredate" label="入职时间"></el-table-column>
      <el-table-column label="操作" width="160">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row.id)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      style="margin-top: 20px"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
    <!-- dialog -->
    <el-dialog title="编辑员工" :visible.sync="dialogFormVisible" width="33%">
      <el-form ref="editDialog" :model="pojo" :rules="rules" style="width: 350px">
        <el-form-item label="账号" :label-width="formLabelWidth" prop="username">
          <el-input v-model="pojo.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="姓名" :label-width="formLabelWidth" prop="name">
          <el-input v-model="pojo.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="年龄" :label-width="formLabelWidth" prop="age">
          <el-input v-model="pojo.age" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth" prop="phone">
          <el-input v-model="pojo.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="工资" :label-width="formLabelWidth" prop="salary">
          <el-input v-model="pojo.salary" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="入职时间" :label-width="formLabelWidth" prop="hiredate">
          <el-date-picker
            v-model="pojo.hiredate"
            type="date"
            placeholder="选择日期"
            style="width:270px"
          ></el-date-picker>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">提 交</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import stuffApi from "@/api/stuff";
export default {
  data() {
    return {
      formLabelWidth: "80px",
      dialogFormVisible: false,
      total: 0,
      tableData: [],
      searchMap: {
        name: "",
        username: ""
      },
      pojo: {
        username: "",
        name: "",
        age: "",
        phone: "",
        salary: "",
        hiredate: ""
      },
      rules: {
        username: [
          { required: true, message: "请输员工账号", trigger: "blur" }
        ],
        name: [{ required: true, message: "请输入员工姓名", trigger: "blur" }]
      },
      currentPage: 1,
      pageSize: 10
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      stuffApi
        .search(this.currentPage, this.pageSize, this.searchMap)
        .then(res => {
          if (res.data.flag) {
            this.total = res.data.data.total;
            this.tableData = res.data.data.rows;
          }
        });
    },
    resetSearchForm() {
      this.$refs.searchForm.resetFields();
      this.getList();
    },
    openDialog() {
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs.editDialog.resetFields();
      });
    },
    handleSubmit() {
      this.$refs.editDialog.validate(valid => {
        if (valid) {
          if (this.pojo.id) {
            stuffApi.update(this.pojo.id, this.pojo).then(res => {
              this.$message({
                type: res.data.flag ? "success" : "error",
                message: res.data.message
              });
              this.dialogFormVisible = false;
            });
          } else {
            stuffApi.addStuff(this.pojo).then(res => {
              this.$message({
                type: res.data.flag ? "success" : "error",
                message: res.data.message + "，初始密码：123456"
              });
              this.pojo = {
                username: "",
                name: "",
                age: "",
                phone: "",
                salary: "",
                hiredate: ""
              };
              this.dialogFormVisible = false;
            });
          }
        }
      });
    },
    handleEdit(id) {
      this.openDialog();
      stuffApi.getById(id).then(res => {
        if (res.data.flag) {
          this.pojo = res.data.data;
        } else {
        }
      });
    },
    handleDelete(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          stuffApi.delete(id).then(res => {
            if (res.data.flag) {
              this.$message.success(res.data.message);
            } else {
              this.$message.error(res.data.message);
            }
          });
        })
        .catch();
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getList();
    }
  }
};
</script>

<style>
</style>