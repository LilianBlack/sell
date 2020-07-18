<template>
  <div class="goods-cate">
    <Pane>
      <div slot="title">
        商品分类
        <el-button @click="toAddCate" size="small" style="float: right; " type="primary">添加分类</el-button>
      </div>
      <div slot="content">
        <!-- 表格 -->
        <el-table style="text-align:center;" ref="accList" :data="tableData" tooltip-effect="dark">
          <el-table-column type="index" label="序号" :span="4"></el-table-column>

          <el-table-column label="分类名称" :span="4">
            <template slot-scope="scope">
              <!-- 不可编辑状态 -->
              <span v-if="!scope.row.isEdit">{{scope.row.cateName}}</span>
              <!-- 编辑状态 -->
              <el-input v-else v-model="scope.row.cateName" size="small"></el-input>
            </template>
          </el-table-column>

          <el-table-column label="是否启用" :span="4">
            <template slot-scope="scope">
              <el-switch
                :disabled="!scope.row.isEdit"
                v-model="scope.row.state"
                active-color="#13ce66"
              ></el-switch>
            </template>
          </el-table-column>

          <el-table-column class="my-table-button" label="操作" :span="4">
            <template slot-scope="scope">
              <el-button
                size="small"
                :type="scope.row.isEdit===true? 'success' : 'primary' "
                @click="changeIsedit(scope.row)"
              >{{scope.row.isEdit === true ? '完成':'编辑'}}</el-button>
              <el-button size="small" type="danger" @click="delCurrentRow(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <!-- 分页 -->
        <div class="block my-pagination">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="pageSize"
            :total="total"
            layout="total, prev, pager, next, jumper"
          ></el-pagination>
        </div>

        <!-- 编辑商品信息  蒙层 -->
        <el-dialog title="修改信息" :visible.sync="addState">
          <el-form :model="addCateForm" label-width="100px">
            <!-- 增加 分类 -->
            <el-form-item label="增加分类">
              <el-input v-model="addCateForm.newCateName"></el-input>
            </el-form-item>

            <!-- 分类是否启用 -->
            <el-form-item label="是否启用">
              <!-- <template slot-scope="scope"> -->
              <el-switch v-model="addCateForm.state" active-color="#13ce66" @change="changeState"></el-switch>
              <!-- </template> -->
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="addState = false">取 消</el-button>
            <el-button type="primary" @click="checkAdd">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </Pane>
  </div>
</template>

<script>
import Pane from "@/components/Pane.vue";
import { getGoodsCate, editCate, deleteCate, addCate } from "@/api/goods";

export default {
  components: {
    Pane
  },

  methods: {
    //   当前页改变
    handleCurrentChange(page) {
      this.currentPage = page;
      this.fetchData();
    },
    // 发送ajax 获取 列表  所有的 数据
    async fetchData() {
      let { total, data } = await getGoodsCate({
        currentPage: this.currentPage,
        pageSize: this.pageSize
      });

      // 当前数据为空的时候
      if (!data.length && this.currentPage != 1) {
        this.currentPage -= 1;
        this.fetchData();
      }
      //   设置每一个 状态  都是禁用
      data.forEach(v => {
        v.state = v.state === 1 ? true : false; // 是否启用的状态转化
        console.log(v.state);
        v.isEdit = false; //每一个都默认是  只读状态
      });

      this.tableData = data;
      this.total = total;
    },
    // 修改   单个分类的  编辑状态
    changeIsedit(row) {
      row.isEdit = !row.isEdit;

      if (!row.isEdit) {
        //   点击完成的时候，发送ajax  提交修改请求
        let { code } = editCate({
          id: row.id,
          cateName: row.cateName,
          state: row.state
        });
        if (code === 0) {
          this.fetchData();
        }
      }
    },
    // 删除 分类 数据
    delCurrentRow(id) {
      this.$confirm("你确定要删除吗？", "提示", {
        confirmButtonText: "确定",
        cancleButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let { code } = await deleteCate({ id });
          if (code === 0) {
            this.fetchData();
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    // el-witch 会自动控制开关的状态变化和变化的记录   我不用手动去改变state的值
    changeState() {
      console.log(" this.addCateForm.state =======", this.addCateForm.state);
    },

    // 确定添加 一个分类  发送ajax
    async checkAdd() {
      console.log("addCateForm", this.addCateForm);
      await addCate({
        cateName: this.addCateForm.newCateName,
        state: this.addCateForm.state
      });
      this.addState = false; //关闭模态框
      //   刷新
      this.fetchData();
    },

    // 点击  添加分类   弹出模态框
    toAddCate() {
      this.addState = true;
    }
  },
  data() {
    return {
      currentPage: 1,
      total: 10,
      pageSize: 5,
      tableData: [],
      addState: false, //模态框是否显示
      addCateForm: { newCateName: "", state: true } //新增内容对象
    };
  },

  created() {
    this.fetchData();
  }
};
</script>

<style lang="less" scoped>
.goods-cate {
  margin-top: 20px;
  .my-pagination {
    margin-top: 30px;
  }
  /deep/ .el-dialog {
    width: 500px;
  }
}
</style>