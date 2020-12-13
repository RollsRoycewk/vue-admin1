<template>
  <div>
    <!-- 添加按钮 -->
    <el-button type="primary" @click="add">
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
        <template v-slot="{ row }">
          <el-button type="warning" size="mini" @click="upBrandData(row)">
            <i class="el-icon-edit"></i>
            <span>修改</span>
          </el-button>
          <!-- 删除按钮 -->

          <el-button type="danger" size="mini" @click="delBrand(row)">
            <i class="el-icon-delete"></i>
            <span>删除</span>
          </el-button>
        </template>
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
      <el-form
        :model="trademarkForm"
        label-width="100px"
        :rules="rules"
        ref="ruleForm"
      >
        <!-- 品牌名称 -->
        <el-form-item label="品牌名称" prop="tmName">
          <el-input
            v-model="trademarkForm.tmName"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <!-- 品牌LOGO -->
        <el-form-item label="品牌LOGO" prop="logoUrl">
          <el-upload
            class="avatar-uploader"
            :action="`${$BASE_API}/admin/product/fileUpload`"
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
          <span>只能上传jpg/png文件，且不超过50kb</span>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitInfo">确 定</el-button>
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
        logoUrl: [{ required: true, message: "客官,留下艳照" }],
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
      this.trademarkForm.logoUrl = res.data;
    },
    beforeAvatarUpload(file) {
      const imageType = ["image/jpeg", "image/png"];
      // 是否包含这些
      const isJPG = imageType.indexOf(file.type) > -1;
      const isLt2M = file.size / 1024 < 1000;

      if (!isJPG) {
        this.$message.error("上传品牌LOGO只能是JPG/JPEG/PNG格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传品牌LOGO大小不能超过50kb");
      }
      return isJPG && isLt2M;
    },
    /* 提交上传信息 */
    submitInfo() {
      this.$refs["ruleForm"].validate(async (valid) => {
        if (valid) {
          const { trademarkForm } = this;

          // 判断是不是更新
          const isUpdata = trademarkForm.id;

          if (isUpdata) {
            const tm = this.trademarkTableData.find(
              (item) => item.id === trademarkForm.id
            );
            if (
              tm.tmName === trademarkForm.tmName &&
              tm.logoUrl === trademarkForm.logoUrl
            ) {
              this.$message.warning("数据没有发生变化");
              return;
            }
          }

          let result;
          if (isUpdata) {
            result = await this.$API.trademark.updataPageList(
              this.trademarkForm
            );
          } else {
            result = await this.$API.trademark.addPageList(this.trademarkForm);
          }

          if (result.code === 200) {
            this.$message.success("品牌上传成功");
            this.dialogFormVisible = false;
            // 添加完成重新请求页面,让数据加载出来
            this.getPageList(this.showList.current, this.showList.size);
          }
        } else {
          this.$message.error("请填写完整品牌信息");
          return false;
        }
      });
    },
    /* 删除品牌 */
    delBrand(row) {
      this.$confirm(
        `此操作将永久删除>>>${row.tmName}<<<品牌, 是否继续?`,
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(async () => {
          const res = await this.$API.trademark.delPageList(row.id);
          if (res.ok) {
            this.$message.success("数据删除成功");
            // 重新请求页面
            this.getPageList(this.showList.current, this.showList.size);
          } else {
            this.$message.error("数据删除失败");
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    /* 修改品牌数据 */
    upBrandData(row) {
      this.$refs.ruleForm && this.$refs.ruleForm.clearValidate();
      this.dialogFormVisible = true;
      // 点击修改的时候让之前的数据显示出来
      this.trademarkForm = { ...row };
    },
    /* 添加按钮 */
    add() {
      this.$refs.ruleForm && this.$refs.ruleForm.clearValidate();
      this.dialogFormVisible = true;
      this.trademarkForm = {
        tmName: "",
        logoUrl: "",
      };
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
