<template>
  <div>
    <!-- 搜索区 -->
    <el-form
      ref="searchForm"
      :inline="true"
      :model="searchMap"
      class="demo-form-inline"
      style="margin-top: 15px"
    >
      <el-form-item prop="name">
        <el-input v-model="searchMap.name" placeholder="商品名称"></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input v-model="searchMap.code" placeholder="商品编号"></el-input>
      </el-form-item>
      <el-form-item prop="supplierName">
        <el-input
          @click.native="supplierOptions"
          readonly
          v-model="searchMap.supplierName"
          placeholder="选择供应商"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getList">查询</el-button>
        <el-button @click="$refs.searchForm.resetFields()">重置</el-button>
        <el-button type="primary" @click="handleAdd">添加商品</el-button>
      </el-form-item>
    </el-form>
    <!-- table区 -->
    <el-table :data="dataList" border style="width: 100%" height="350">
      <el-table-column type="index" label="序号"></el-table-column>
      <el-table-column prop="name" label="商品名"></el-table-column>
      <el-table-column prop="code" label="编号"></el-table-column>
      <el-table-column prop="spec" label="规格"></el-table-column>
      <el-table-column prop="retailPrice" label="零售价"></el-table-column>
      <el-table-column prop="purchasePrice" label="进货价"></el-table-column>
      <el-table-column prop="storageNum" label="库存数量"></el-table-column>
      <el-table-column prop="supplierName" label="供应商"></el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <div>
            <el-row>
              <el-button size="mini" @click="handleEdit(scope.row.id)">编辑</el-button>
              <el-button type="danger" size="mini" @click="handleDelete(scope.row.id)">删除</el-button>
            </el-row>
          </div>
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
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
    <!-- 对话框1 -->
    <el-dialog title="查找供应商" :visible.sync="dialogFormVisible1" width="45%">
      <Supplier :isDialog="true" @getSonData="getSonData"></Supplier>
    </el-dialog>
    <!-- 对话框2 -->
    <el-dialog title="编辑商品" :visible.sync="dialogFormVisible2" width="35%">
      <el-form
        :model="pojo"
        :rules="rules"
        ref="editForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item prop="name" label="商品名称">
          <el-input v-model="pojo.name" style="width: 280px"></el-input>
        </el-form-item>
        <el-form-item prop="code" label="商品编码">
          <el-input v-model="pojo.code" style="width: 280px"></el-input>
        </el-form-item>
        <el-form-item prop="spec" label="商品规格">
          <el-input v-model="pojo.spec" style="width: 280px"></el-input>
        </el-form-item>
        <el-form-item prop="retailPrice" label="零售价格">
          <el-input v-model="pojo.retailPrice" style="width: 280px"></el-input>
        </el-form-item>
        <el-form-item prop="purchasePrice" label="进货价格">
          <el-input v-model="pojo.purchasePrice" style="width: 280px"></el-input>
        </el-form-item>
        <el-form-item prop="storageNum" label="商品库存">
          <el-input v-model="pojo.storageNum" style="width: 280px"></el-input>
        </el-form-item>
        <el-form-item prop="supplierName" label="供应商">
          <el-input
            v-model="pojo.supplierName"
            style="width: 280px"
            readonly
            @click.native="dialogFormVisible1 = true"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitEdit">提交</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import Supplier from "../supplier";
import goodsApi from "@/api/goods";
export default {
  components: { Supplier },
  data() {
    return {
      dialogFormVisible1: false,
      dialogFormVisible2: false,
      total: 0,
      currentPage: 1,
      pageSize: 10,
      dataList: [],
      searchMap: {
        name: "",
        code: "",
        supplierName: ""
      },
      isToSearch: false,
      pojo: {
        name: "",
        code: "",
        spec: "",
        retailPrice: "",
        purchasePrice: "",
        storageNum: "",
        supplierName: ""
      },
      rules: {
        name: [{ required: true, message: "请输入商品名称", trigger: "blur" }],
        code: [{ required: true, message: "请输入商品编码", trigger: "blur" }],
        retailPrice: [
          { required: true, message: "请输入零售价", trigger: "blur" }
        ]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      goodsApi
        .getPageList(this.currentPage, this.pageSize, this.searchMap)
        .then(res => {
          if (res.data.flag) {
            this.dataList = res.data.data.rows;
            this.total = res.data.data.total;
          } else {
            this.$message.error(res.data.message);
          }
        });
    },
    handleDelete(id) {
      this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          goodsApi.delete(id).then(res => {
              this.$message({
                type: res.data.flag? 'success' : 'error',
                message: res.data.message
            });
            this.getList()
          })  
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    handleEdit(id) {
      this.handleAdd();
      goodsApi.getById(id).then(res => {
        if (res.data.flag) {
          this.pojo = res.data.data;
        } else {
        }
      });
    },
    handleAdd() {
      this.dialogFormVisible2 = true;
      this.$nextTick(() => {
        this.$refs.editForm.resetFields();
      });
    },
    submitEdit() {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          if (this.pojo.id) {
            goodsApi.update(this.pojo.id, this.pojo).then(res => {
              if (res.data.flag) {
                this.$message.success(res.data.message);
                this.dialogFormVisible2 = false;
                this.getList()
              } else {
                this.$message.error(res.data.message);
              }
            });
          } else {
            goodsApi.addGoods(this.pojo).then(res => {
              if (res.data.flag) {
                this.$message.success(res.data.message);
                this.dialogFormVisible2 = false;
                this.getList()
              } else {
                this.$message.error(res.data.message);
              }
            });
          }
        } else {}
      });
      this.pojo = {
        name: "",
        code: "",
        spec: "",
        retailPrice: "",
        purchasePrice: "",
        storageNum: "",
        supplierName: ""
      }
    },
    supplierOptions() {
      this.isToSearch = true;
      this.dialogFormVisible1 = true;
    },
    
    handleSizeChange(val) {
      this.pageSize = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getList();
    },
    getSonData(data) {
      if (this.isToSearch) {
        this.searchMap.supplierName = data.name;
        this.isToSearch = false;
      } else {
        this.pojo.supplierName = data.name;
      }
      this.dialogFormVisible1 = false;
    }
  }
};
</script>