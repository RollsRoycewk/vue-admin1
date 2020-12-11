<template>
  <div>
    <!-- 添加按钮 -->
    <el-button type="primary">
      <i class="el-icon-plus"></i>
      添加
    </el-button>
    <!-- 表格 -->
    <el-table
      :data="trademarkTableData"
      border
      style="width: 100%"
      class="trademarl-table"
    >
      <el-table-column
        prop="date"
        label="序号"
        width="80"
        align="center"
        type="index"
      >
      </el-table-column>
      <el-table-column prop="tmName" label="品牌名称"> </el-table-column>
      <el-table-column prop="address" label="品牌LOGO">
        <template slot-scope="scope">
          <img :src="scope.row.logoUrl" class="trademarl-image" />
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <!-- 修改按钮 -->
        <el-button type="warning" size="mini">
          <i class="el-icon-edit"></i>
          <span>修改</span>
        </el-button>
        <!-- 删除按钮 -->
        <el-button type="danger" size="mini">
          <i class="el-icon-delete"></i>
          <span>删除</span>
        </el-button>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination
      class="trademarl-pagination"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="1"
      :page-sizes="[3, 5, 15, 20]"
      :page-size="100"
      layout=" prev, pager, next, jumper,sizes, total"
      :total="400"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "TrademarkList",
  data() {
    return {
      trademarkTableData: [],
    };
  },
  async mounted() {
    const res = await this.$API.trademark.getPageList(1, 3);
    if (res.code === 200) {
      this.$message.success("数据加载成功");
      // 数据复制给data
      this.trademarkTableData = res.data.records;
    } else {
      this.$message.error("数据加载失败");
    }
    console.log(res);
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
  },
};
</script>

<style lang="sass">
.trademarl-table
  margin: 20px 0
.trademarl-image
  width: 100px
  height: 60px
.trademarl-pagination
  text-align: right
.el-pagination__sizes
  margin-left: 250px
</style>
