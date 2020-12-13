<template>
  <div>
    <Category></Category>
    <!-- 属性 -->
    <el-card class="box-card" style="margin: 20px 0">
      <el-button type="primary" disabled>
        <i class="el-icon-plus"></i>
        <span>添加属性</span>
      </el-button>
      <el-table :data="attrsData" border style="width: 100%">
        <el-table-column
          prop="date"
          label="序号"
          width="80"
          align="center"
          type="index"
        >
        </el-table-column>
        <el-table-column prop="name" label="属性值名称" width="150">
        </el-table-column>
        <el-table-column prop="address" label="属性值列表"> </el-table-column>
        <el-table-column prop="address" label="操作" width="150">
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import Category from "./Category";

export default {
  name: "AttrList",
  data() {
    return {
      attrsData: [],
    };
  },
  components: {
    Category,
  },
};
</script>
