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
      :current-page="showList.current"
      :page-sizes="[3, 5, 15, 20]"
      :page-size="showList.size"
      layout=" prev, pager, next, jumper,sizes, total"
      :total="showList.total"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  name: "TrademarkList",
  data() {
    return {
      // 表格数据
      trademarkTableData: [],
      // 展示数据
      showList: {
        total: 1, // 总数
        size: 3, // 每页数量
        current: 1, // 当前页数
      },
    };
  },
  mounted() {
    this.getPageList(this.showList.current, this.showList.size);
  },
  methods: {
    /* 获取表格数据,公用函数 */
    async getPageList(page, limit) {
      const res = await this.$API.trademark.getPageList(page, limit);
      if (res.code === 200) {
        this.$message.success("数据加载成功");
        // 数据复制给data
        this.trademarkTableData = res.data.records;
        // 总数
        this.showList.total = res.data.total;
        // 每页数量
        this.showList.size = res.data.size;
        // 当前页数
        this.showList.current = res.data.current;
      } else {
        this.$message.error("数据加载失败");
      }
    },
    handleSizeChange(size) {
      this.showList.size = size;
      this.getPageList(this.showList.current, size);
    },
    handleCurrentChange(current) {
      this.showList.current = current;
      this.getPageList(current, this.showList.size);
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
