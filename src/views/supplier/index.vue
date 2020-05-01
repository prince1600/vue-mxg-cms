<template>
  <div>
    <!-- 搜索表单 -->
    <el-form
      ref="searchForm"
      :inline="true"
      :model="searchMap"
      class="demo-form-inline"
      style="margin-top: 10px"
    >
      <el-form-item prop="name">
        <el-input v-model="searchMap.name" placeholder="供应商名称"></el-input>
      </el-form-item>
      <el-form-item prop="linkman">
        <el-input v-model="searchMap.linkman" placeholder="联系人"></el-input>
      </el-form-item>
      <el-form-item prop="phone" v-if="!isDialog">
        <el-input v-model="searchMap.phone" placeholder="联系电话"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getData">查询</el-button>
        <el-button @click="resetForm('searchForm')" v-if="!isDialog">重置</el-button>
        <el-button type="primary" @click="resetForm('editForm')" v-if="!isDialog">添加供应商</el-button>
      </el-form-item>
    </el-form>
    <!-- 列表信息 -->
    <el-table :data="tableData" style="width: 100%" border height="380"
     :highlight-current-row = "isDialog ? true : false"
    @current-change="handleCurrentRowChange">
      <el-table-column type="index" label="序号" width="100"></el-table-column>
      <el-table-column prop="name" label="供应商名称" width="250"></el-table-column>
      <el-table-column prop="phone" label="联系电话" width="250" ></el-table-column>
      <el-table-column prop="remark" label="备注" width="250" v-if="!isDialog"></el-table-column>
      <el-table-column label="操作" width="180" v-if="!isDialog">
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
      :page-sizes="[10, 20, 30, 40]"
      :page-size="100"
      :layout="isDialog?'prev, pager, next':'total, sizes, prev, pager, next, jumper'"
      :total="400"
    ></el-pagination>
    <!-- 弹出对话框 -->
    <el-dialog title="编辑供应商" :visible.sync="dialogFormVisible" width="33%">
      <el-form :model="pojo" style="width:350px" :rules="rules" ref="editForm">
        <el-form-item label="供应商名称" :label-width="formLabelWidth" prop="name">
          <el-input v-model="pojo.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系人" :label-width="formLabelWidth" prop="linkman">
          <el-input v-model="pojo.linkman" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" :label-width="formLabelWidth" prop="phone">
          <el-input v-model="pojo.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth" prop="remark">
          <el-input v-model="pojo.remark" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitData">提 交</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import supplierApi from "@/api/supplier";
export default {
  props: {
    isDialog: Boolean
  },
  data() {
    return {
      formLabelWidth: "100px",
      dialogFormVisible: false,
      tableData: [],
      currentPage: 1,
      pageSize: 10,
      searchMap: {
        name: "",
        linkman: "",
        phone: ""
      },
      pojo: {
        name: "",
        linkman: "",
        phone: "",
        remark: "",
        id: ""
      },
      rules: {
        name: [{ required: true, message: "请输入名称", trigger: "blur" }],
        phone: [{ required: true, message: "请输入电话号码", trigger: "blur" }]
      }
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      supplierApi
        .search(this.currentPage, this.pageSize, this.searchMap)
        .then(res => {
          this.tableData = res.data.data.rows;
        });
    },
    handleEdit(id) {
      supplierApi.getById(id).then(res => {
        if (res.data.flag) {
          this.pojo = res.data.data;
        } else {
          this.$message.error("稍后再试");
          return;
        }
        this.dialogFormVisible = true;
      });
    },
    handleDelete(id) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          supplierApi.delete(id).then(res => {
              if (res.data.flag) {
                  this.$message.success('删除成功')
                  this.getData()
              } else {
                  this.$message.error('删除失败，稍后再试')
              }
          })         
        }).catch(() => {});
      },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getData();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getData();
    },
    handleCurrentRowChange(currentRow){
      this.$emit('getSonData',{
        name: currentRow.name,
        id: currentRow.id
      })
    },
    resetForm(formName) {
      if (formName == "editForm") {
        this.dialogFormVisible = true;
      }
      this.$nextTick(() => {
        this.$refs[formName].resetFields();
      });
    },
    submitData() {
      this.$refs["editForm"].validate(valide => {
        if (valide) {
          if (this.pojo.id === "") {
            supplierApi.addSupplier(this.pojo).then(res => {
              this.$message({
                type: res.data.flag ? "success" : "error",
                message: res.data.message
              });
              this.dialogFormVisible = false;
            });
          } else {
            supplierApi.update(this.pojo.id, this.pojo).then(res => {
              this.$message({
                type: res.data.flag ? "success" : "error",
                message: res.data.message
              });
              this.pojo = {
                name: "",
                linkman: "",
                phone: "",
                remark: "",
                id: ""
              };
              this.dialogFormVisible = false;
            });
          }
          this.getData()
        }
      });
    }
  }
};
</script>