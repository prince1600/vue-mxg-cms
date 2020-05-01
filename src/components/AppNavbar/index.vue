<template>
  <div class="navbar">
    <el-menu
      :router="true"
      default-active="/home/"
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >    
      <el-menu-item index="/home">
        <i class="el-icon-s-home"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-menu-item index="/member/">
        <i class="el-icon-s-custom"></i>
        <span slot="title">会员管理</span>
      </el-menu-item>
      <el-menu-item index="/supplier/">
        <i class="el-icon-truck"></i>
        <span slot="title">供应商管理</span>
      </el-menu-item>
      <el-menu-item index="/goods/">
        <i class="el-icon-s-goods"></i>
        <span slot="title">商品管理</span>
      </el-menu-item>
      <el-menu-item index="/stuff/">
        <i class="el-icon-s-grid"></i>
        <span slot="title">员工管理</span>
      </el-menu-item>

    </el-menu>
  </div>
</template>

<style scoped>
    /* 注意element-ui中的标签名，在样式中要写成类名 */
    .el-menu {
        border-right: none;
    }
</style>