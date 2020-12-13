<template>
  <div>
    <Category @getAttr="getAttrsData"></Category>
    <!-- 属性 -->
    <el-card class="box-card" style="margin: 20px 0">
      <el-button type="primary">
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
          <template v-slot="{ row }">
            <el-button type="primary" size="mini" @click="editAttr(row)">
              <i class="el-icon-edit"></i>
            </el-button>
            <el-button type="danger" size="mini">
              <i class="el-icon-delete"></i>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 修改属性 -->
    <el-card class="box-card">
      <!-- 属性名 -->
      <el-form :inline="true" class="demo-form-inline" :data="attrEditList">
        <el-form-item label="属性名">
          <el-input
            placeholder="类型"
            v-model="attrEditList.attrName"
          ></el-input>
        </el-form-item>
        <!-- 添加按钮 -->
        <el-button type="primary" @click="addAttr">
          <i class="el-icon-plus"></i>
          <span>添加属性值</span>
        </el-button>
        <!-- 属性值列表 -->
        <el-table
          border
          style="width: 100%; margin: 20px 0"
          :data="attrEditList.attrValueList"
        >
          <el-table-column
            prop="date"
            label="序号"
            width="80"
            type="index"
            align="center"
          >
          </el-table-column>
          <el-table-column label="属性值名称">
            <template v-slot="{ row, $index }">
              <el-input
                placeholder="类型"
                v-model="row.valueName"
                size="mini"
                v-if="row.edit"
                @blur="editWatch(row, $index)"
                ref="attrInput"
                autofocus
                @keyup.enter.native="editWatch(row, $index)"
              ></el-input>
              <span
                v-else
                @click="edit(row)"
                style="width: 100%; display: block"
                >{{ row.valueName }}</span
              >
            </template>
          </el-table-column>
          <el-table-column prop="address" label="操作">
            <el-button type="danger" size="mini">
              <i class="el-icon-delete"></i>
            </el-button>
          </el-table-column>
        </el-table>
        <!-- 提交修改 -->
        <el-button type="primary" @click="submitAttr">
          <span>保存</span>
        </el-button>
        <el-button>取消</el-button>
      </el-form>
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
      attrEditList: {
        attrName: "",
        attrValueList: [],
      },
    };
  },
  methods: {
    async getAttrsData(category) {
      this.category = category;
      const res = await this.$API.attr.getCategoryAttrsData(category);
      if (res.ok) {
        this.$message.success("所有属性数据获取成功");
        this.attrsData = res.data;
      } else {
        this.$message.success("所有属性数据获取失败");
      }
    },
    // 获取要修改的数据
    editAttr(row) {
      this.attrEditList = JSON.parse(JSON.stringify(row));
    },
    // edit
    edit(row) {
      this.$set(row, "edit", true);
      this.$nextTick(() => {
        this.$refs.attrInput.focus();
      });
    },
    // 提交
    async submitAttr() {
      const res = await this.$API.attr.getUpdataAttr(this.attrEditList);
      if (res.ok) {
        this.$message.success("所有属性数据获取成功");
        this.getAttrsData(this.category);
      } else {
        this.$message.success("所有属性数据获取失败");
      }
    },
    // 增加
    addAttr() {
      this.attrEditList.attrValueList.push({ edit: true });
      this.$nextTick(() => {
        this.$refs.attrInput.focus();
      });
    },
    // 添加属性如果没有就删除
    editWatch(row, index) {
      if (!row.valueName) {
        this.attrEditList.attrValueList.splice(index, 1);
      }
      row.edit = false;
    },
  },
  // async mounted() {
  //   const res = await this.$API.attr.getCategoryAttrsData({
  //     category1Id: "16",
  //     category2Id: "104",
  //     category3Id: "994",
  //   });
  //   if (res.ok) {
  //     this.$message.success("所有属性数据获取成功");
  //     this.attrsData = res.data;
  //   } else {
  //     this.$message.success("所有属性数据获取失败");
  //   }
  // },
  components: {
    Category,
  },
};
</script>
