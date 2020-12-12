<template>
  <div>
    <!-- 添加按钮 -->
    <el-button type="primary" @click="dialogFormVisible = true">
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
    <!-- 提交Dialog -->
    <el-dialog title="添加品牌" :visible.sync="dialogFormVisible">
      <el-form :model="trademarkForm" label-width="100px" :rules="rules">
        <!-- 品牌名称 -->
        <el-form-item label="品牌名称" prop="tmName">
          <el-input
            v-model="trademarkForm.tmName"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <!-- 品牌LOGO -->
        <el-form-item label="品牌LOGO">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="trademarkForm.logoUrl"
              :src="trademarkForm.logoUrl"
              class="avatar"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button>取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false"
          >确 定</el-button
        >
      </div>
    </el-dialog>
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
      dialogFormVisible: false, //对话框显示隐藏
      /* 收集数据 */
      trademarkForm: {
        tmName: "",
        logoUrl: "",
      },
      /* 效验 */
      rules: {
        tmName: [{ required: true, message: "客官,留下姓名", trigger: "blur" }],
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
    /* 分页器相关 */
    handleSizeChange(size) {
      this.showList.size = size;
      this.getPageList(this.showList.current, size);
    },
    handleCurrentChange(current) {
      this.showList.current = current;
      this.getPageList(current, this.showList.size);
    },
    /* 上传图片 */
    handleAvatarSuccess(res) {
      console.log(res);
      // this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
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
.avatar-uploader .el-upload
  border: 1px dashed #d9d9d9
  border-radius: 6px
  cursor: pointer
  position: relative
  overflow: hidden

  :hover
  &
    border-color: #409EFF

.avatar-uploader-icon
  font-size: 28px
  color: #8c939d
  width: 178px
  height: 178px
  line-height: 178px
  text-align: center

.avatar
  width: 178px
  height: 178px
  display: block
</style>
