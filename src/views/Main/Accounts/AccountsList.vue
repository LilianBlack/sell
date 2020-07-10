<template>
  <div class="accounts-list">
    <!-- 标题 -->
    <div class="title">账户列表</div>
    <el-divider></el-divider>

    <!-- 表格 -->
    <el-table ref="accList" :data="tableData" tooltip-effect="dark" style="width: 100%">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="acc" label="账号" width="120"></el-table-column>
      <el-table-column prop="group" label="用户组" width="120"></el-table-column>
      <el-table-column label="创建时间" width="120">
        <template slot-scope="scope">{{ scope.row.date }}</template>
      </el-table-column>
      <el-table-column prop="operation" label="操作" width="120"></el-table-column>
      <el-table-column>
        <el-button size="small">编辑</el-button>
        <el-button size="small" type="danger">删除</el-button>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
      ></el-pagination>
    </div>

    <!-- 按钮 -->
    <div style="margin-top: 20px">
      <el-button type="danger">批量删除</el-button>
      <el-button type="primary">取消选择</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentPage: 1,
      tableData: [
        {
          acc: "zzz",
          group: "管理员",
          date: "2020-7-8"
        },
        {
          acc: "zzz",
          group: "管理员",
          date: "2020-7-8"
        },
        {
          acc: "zzz",
          group: "管理员",
          date: "2020-7-8"
        },
        {
          acc: "zzz",
          group: "管理员",
          date: "2020-7-8"
        }
      ],
      multipleSelection: []
    };
  },
  methods: {
    handleSizeChange() {},
    handleCurrentChange() {}
  }
};
</script>

<style lang="less" scoped>
.accounts-list {
  background: #fff;
  margin-top: 30px;
  padding: 20px;
  .title {
    padding-left: 30px;
    padding-top: 24px;
  }
}
</style>