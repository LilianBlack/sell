<template>
  <div class="goods-cate">
    <Pane>
      <div slot="title">
        商品分类
        <el-button style="float: right; " type="primary">操作按钮</el-button>
      </div>
      <div slot="content">
        <!-- 表格 -->
        <el-table style="text-align:center;" ref="accList" :data="tableData" tooltip-effect="dark">
          <el-table-column prop="sequenceNum" label="序号" :span="4"></el-table-column>
          <el-table-column prop="cateName" label="分类名称" :span="4"></el-table-column>
          <el-table-column label="是否启用" :span="4">
            <template slot-scope="scope">
              <el-switch
                :active-value="1"
                :inactive-value="0"
                v-model="scope.row.mySwitch"
                active-color="#13ce66"
                inactive-color="#ff4949"
              ></el-switch>
            </template>
          </el-table-column>
          <el-table-column class="my-table-button" prop="operation" label="操作" :span="4">
            <el-button size="small" @click="editFun">编辑</el-button>
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
  methods: {
    handleSizeChange() {},
    handleCurrentChange() {},
    editFun() {
      console.log("1");
      //   this.switchControl = !this.switchControl;
    }
  },
  data() {
    return {
      currentPage: 1,
      value: true,
      tableData: [
        {
          sequenceNum: 1,
          cateName: "热销榜",
          mySwitch: 1
          //   switchControl: true
        },
        {
          sequenceNum: 1,
          cateName: "热销榜",
          mySwitch: 1
          //   switchControl: true
        },
        {
          sequenceNum: 1,
          cateName: "热销榜",
          mySwitch: 1
          //   switchControl: false
        }
      ]
    };
  }
};
</script>

<style lang="less" scoped>
.goods-cate {
  margin-top: 20px;
  .my-pagination {
    margin-top: 30px;
  }
}
</style>