<template>
  <div class="accounts-list">
    <Pane>
      <!-- 标题 -->
      <div slot="title" class="title">账户列表</div>

      <div slot="content">
        <!-- 表格 -->
        <el-table
          style="text-align:center;"
          ref="accList"
          :data="tableData"
          tooltip-effect="dark"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" :span="4"></el-table-column>
          <el-table-column prop="account" label="账号" :span="4"></el-table-column>
          <el-table-column prop="userGroup" label="用户组" :span="4"></el-table-column>
          <el-table-column label="创建时间" :span="4">
            <template slot-scope="scope">{{ scope.row.ctime }}</template>
          </el-table-column>
          <el-table-column class="my-table-button" prop="operation" label="操作" :span="4">
            <template slot-scope="scope">
              <el-button size="small" @click="openEditDialog(scope.row)">编辑</el-button>
              <el-button size="small" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <div class="block my-pagination">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[3, 5, 10, 20]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          ></el-pagination>
        </div>

        <!-- 按钮 -->
        <div style="margin-top: 20px">
          <el-button type="danger" @click="batchDelete">批量删除</el-button>
          <el-button type="primary" @click="cancleChecked">取消选择</el-button>
        </div>

        <!-- 编辑用户信息  蒙层 -->
        <el-dialog title="修改信息" :visible.sync="editState">
          <el-form :model="editForm">
            <el-form-item label="修改用户名" label-width="100px">
              <el-input v-model="editForm.account" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="修改用户组" label-width="100px">
              <el-select v-model="editForm.userGroup" placeholder="请选择用户组">
                <el-option label="超级管理员" value="超级管理员"></el-option>
                <el-option label="管理员" value="普通管理员"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="editState = false">取 消</el-button>
            <el-button type="primary" @click="checkEdit">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </Pane>
  </div>
</template>

<script>
import Pane from "@/components/Pane.vue";
import {
  getAccountList,
  delAccount,
  batchDeleteAcc,
  editAccountInfo
} from "@/api/account";
import moment from "moment";

export default {
  components: {
    Pane
  },

  data() {
    return {
      currentPage: 1,
      pageSize: 3,
      total: 0,
      tableData: [],
      editState: false, // 默认蒙层关闭
      editForm: { account: "", userGroup: "" }
    };
  },

  methods: {
    //   每页长度改变的时候   自动传参到函数中
    handleSizeChange(size) {
      this.pageSize = size;
      this.getAccountData();
    },

    //    当前页面改变时
    handleCurrentChange(page) {
      this.currentPage = page;
      this.getAccountData();
    },

    // 获取用户列表的数据
    async getAccountData() {
      // 需要参数[对象]： 当前页、每一页的数量
      let { total, data } = await getAccountList({
        currentPage: this.currentPage,
        pageSize: this.pageSize
      });

      // 处理时间格式
      data.forEach(v => {
        v.ctime = moment(v.ctime).format("YYYY-MM-DD   hh:mm:ss");
      });

      //   解决删除数据候的bug[展示空数据页]
      if (!data.length && this.currentPage != 1) {
        this.currentPage--;
        this.getAccountData();
      }
      //   渲染数据
      this.total = total;
      this.tableData = data;
    },

    handleDelete(id) {
      // 删除前进行询问
      this.$confirm("确定要删除数据", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let { code } = await delAccount({ id }); // 发送删除请求[形参id和后台要求的数据同名 可以省略一个]
          if (code === 0) {
            this.getAccountData(); //重新渲染
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    // 每当选项改变  获取到被选中每一行的id
    handleSelectionChange(rows) {
      this.ids = rows.map(v => v.id);
    },

    // 批量删除
    batchDelete() {
      // 删除前先看看是否有选中项
      if (!this.ids) {
        this.$message.error("你还什么都没有选择哦");
      } else {
        //删除前询问
        this.$confirm("确定要删除？", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(async () => {
            //   发送请求 -- 批量删除
            let { code } = await batchDeleteAcc({
              ids: JSON.stringify(this.ids) //ids 是个数组   要先进行处理
            });
            //   console.log("code===", code);   //如果不等待异步执行完【 await async】--- code是undefined
            if (code === 0) {
              this.getAccountData();
            }
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      }
    },

    // 取消选择
    cancleChecked() {
      // 调用vue表格的方法---清除用户选择
      this.$refs.accList.clearSelection();
    },

    // 编辑信息蒙层--信息回填
    openEditDialog(row) {
      this.editState = true; //打开蒙层
      console.log("row=======", row);
      console.log("row=======", row.id);
      console.log("row=======", row.account);
      console.log("row=======", row.userGroup);
      this.editForm = { ...row }; //将row对象的内容拷贝给editForm
    },

    // 编辑信息后， 点击确认发送ajax   问题：怎么拿到id
    // 【 this.editForm = { ...row }; 这一步已经拿到了id  只是在data(){}里面没有写明】
    async checkEdit() {
      let { code } = await editAccountInfo({
        id: this.editForm.id,
        account: this.editForm.account,
        userGroup: this.editForm.userGroup
      });
      if (code === 0) {
        this.editState = false;
        this.getAccountData(); //重新渲染列表
      }
    }
  },

  created() {
    this.getAccountData();
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
  /deep/ .el-dialog {
    width: 35%;
    /deep/ .el-select,
    .el-input {
      width: 70%;
      /deep/ .el-input--suffix {
        width: 100%;
      }
    }
  }
}
</style>