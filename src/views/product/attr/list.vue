<template>
  <div>
    <Category @getAttr="getAttrsData"></Category>
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
        <el-table-column prop="attrName" label="属性值名称" width="150">
        </el-table-column>
        <el-table-column prop="attrValueList" label="属性值列表">
          <template v-slot="{ row }">
            <el-tag
              v-for="attrValue in row.attrValueList"
              :key="attrValue.id"
              style="margin-left: 5px"
              >{{ attrValue.valueName }}</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column prop="address" label="操作" width="150">
          <el-button type="primary" size="mini">
            <i class="el-icon-edit"></i>
          </el-button>
          <el-button type="danger" size="mini">
            <i class="el-icon-delete"></i>
          </el-button>
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
  methods: {
    async getAttrsData(category) {
      const res = await this.$API.attr.getCategoryAttrsData(category);
      if (res.ok) {
        this.$message.success("所有属性数据获取成功");
        this.attrsData = res.data;
      } else {
        this.$message.success("所有属性数据获取失败");
      }
    },
  },
  components: {
    Category,
  },
};
</script>
