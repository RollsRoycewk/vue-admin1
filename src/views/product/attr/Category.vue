<template>
  <!-- 分类选择列表 -->
  <el-card class="box-card">
    <el-form :inline="true" :model="category" class="demo-form-inline">
      <el-form-item label="一级分类">
        <el-select
          v-model="category.category1Id"
          placeholder="请选择"
          @change="category1Click"
          :disabled="disabled"
        >
          <el-option
            :label="c1.name"
            :value="c1.id"
            v-for="c1 in category1DataList"
            :key="c1.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select
          v-model="category.category2Id"
          placeholder="请选择"
          @change="category2Click"
          :disabled="disabled"
        >
          <el-option
            :label="c2.name"
            :value="c2.id"
            v-for="c2 in category2DataList"
            :key="c2.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="三级分类">
        <el-select
          v-model="category.category3Id"
          placeholder="请选择"
          @change="category3Click"
          :disabled="disabled"
        >
          <el-option
            :label="c3.name"
            :value="c3.id"
            v-for="c3 in category3DataList"
            :key="c3.id"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script>
export default {
  name: "Category",
  props: ["disabled"],
  data() {
    return {
      category: {
        category1Id: "",
        category2Id: "",
        category3Id: "",
      },
      category1DataList: [],
      category2DataList: [],
      category3DataList: [],
    };
  },
  methods: {
    async category1Click(e) {
      const res = await this.$API.attr.getCategory2Data(e);
      if (res.ok) {
        this.$message.success("二级目录数据获取成功");
        this.category2DataList = res.data;
      } else {
        this.$message.success("二级目录数据获取失败");
      }
    },
    async category2Click(e) {
      const res = await this.$API.attr.getCategory3Data(e);
      if (res.ok) {
        this.$message.success("三级目录数据获取成功");
        this.category3DataList = res.data;
      } else {
        this.$message.success("三级目录数据获取失败");
      }
    },
    async category3Click(category3Id) {
      const category = {
        ...this.category,
        category3Id,
      };
      this.$emit("getAttr", category);
    },
  },
  async mounted() {
    const res = await this.$API.attr.getCategory1Data();
    if (res.ok) {
      this.$message.success("一级目录数据获取成功");
      this.category1DataList = res.data;
    } else {
      this.$message.success("一级目录数据获取失败");
    }
  },
};
</script>

<style>
</style>