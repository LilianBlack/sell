<template>
  <div class="accounts-list">
    <Pane>
      <!-- 标题 -->
      <div slot="title" class="title">账户列表</div>

      <div slot="content">
        <!-- 表格 -->
        <el-table style="text-align:center;" ref="accList" :data="tableData" tooltip-effect="dark">
          <el-table-column type="selection" :span="4"></el-table-column>
          <el-table-column prop="acc" label="账号" :span="4"></el-table-column>
          <el-table-column prop="group" label="用户组" :span="4"></el-table-column>
          <el-table-column label="创建时间" :span="4">
            <template slot-scope="scope">{{ scope.row.date }}</template>
          </el-table-column>
          <el-table-column class="my-table-button" prop="operation" label="操作" :span="4">
            <el-button size="small">编辑</el-button>
            <el-button size="small" type="danger">删除</el-button>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <div class="block my-pagination">
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
    </Pane>
  </div>
</template>

<script>
import Pane from "@/components/Pane.vue";

export default {
  components: {
    Pane
  },
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
  margin-top: 30px;
  .my-table-button {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .my-pagination {
    margin-top: 20px;
  }
}
</style>