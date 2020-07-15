<template>
  <div class="goods-list">
    <Pane>
      <div slot="title">商品列表</div>
      <div slot="content">
        <!-- 数据查询表单 -->
        <el-form :model="searchForm" label-width="100px" :inline="true">
          <!-- 搜索名字 -->
          <el-form-item label="商品名称">
            <el-input v-model="searchForm.name"></el-input>
          </el-form-item>

          <!-- 选择 类型-->
          <el-form-item label="商品分类">
            <el-select v-model="searchForm.category">
              <el-option v-for="v in cates" :key="v.cateName" :value="v.cateName">{{v.cateName}}</el-option>
            </el-select>
          </el-form-item>

          <el-button type="primary" size="middle" @click="search">搜索</el-button>
          <el-button type="success" size="middle" @click="reset">重置</el-button>
        </el-form>

        <!-- 数据展示表格 -->
        <el-table :data="tableData" style="width: 100%">
          <!-- 折叠面板内部的列 -->
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="商品 ID">
                  <span>{{ props.row.id }}</span>
                </el-form-item>
                <el-form-item label="商品名称">
                  <span>{{ props.row.name }}</span>
                </el-form-item>

                <el-form-item label="所属分类">
                  <span>{{ props.row.category }}</span>
                </el-form-item>
                <el-form-item label="商品价格">
                  <span>{{ props.row.price }}</span>
                </el-form-item>

                <el-form-item label="创建时间">
                  <span>{{ props.row.ctime }}</span>
                </el-form-item>

                <el-form-item label="商品评价">
                  <span>{{ props.row.rating }}</span>
                </el-form-item>

                <el-form-item label="商品销量">
                  <span>{{ props.row.sellCount }}</span>
                </el-form-item>

                <el-form-item label="商品描述">
                  <span>{{ props.row.goodsDesc }}</span>
                </el-form-item>
                <el-form-item label="商品图片">
                  <span>
                    <img :src="imgBase  + props.row.imgUrl" style="width:150px;" alt />
                  </span>
                </el-form-item>
              </el-form>
            </template>
          </el-table-column>

          <!-- 显示的列 -->
          <el-table-column label="商品名称" prop="name"></el-table-column>
          <el-table-column label="所属分类" prop="category"></el-table-column>
          <el-table-column label="商品价格" prop="price"></el-table-column>
          <el-table-column label="商品图片">
            <template slot-scope="scope">
              <img :src="imgBase +scope.row.imgUrl" style="width:100px;" alt />
            </template>
          </el-table-column>
          <el-table-column label="商品描述" prop="goodsDesc"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="small" type="primary" @click="handleEdit(scope.row)">编辑</el-button>
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

        <!-- 编辑商品信息  蒙层 -->
        <el-dialog title="修改信息" :visible.sync="editState">
          <el-form :model="editForm">
            <el-form-item label="修改商品名" label-width="100px">
              <el-input v-model="editForm.name" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item label="修改分类" label-width="100px">
              <el-select v-model="editForm.category" placeholder="请选择用户组">
                <el-option label="超级管理员" value="superManager"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="修改价格" label-width="100px">
              <el-input v-model="editForm.price" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item label="修改描述" label-width="100px">
              <el-input v-model="editForm.goodsDesc" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item label="点击修改图片" label-width="100px">
              <el-upload
                class="avatar-uploader"
                action="http://127.0.0.1:5000/goods/goods_img_upload"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload"
              >
                <img
                  v-if="editForm.imgUrl"
                  :src="imgBase + editForm.imgUrl"
                  class="avatar"
                  style="width:150px;"
                />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
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
import local from "@/utils/local";
import { getGoodsList, delGood, editGood, getCateName } from "@/api/goods";

export default {
  components: {
    Pane
  },

  data() {
    return {
      tableData: [],
      currentPage: 1,
      pageSize: 5,
      total: 10,
      imgBase: "http://127.0.0.1:5000/upload/imgs/goods_img/",
      imgUrl: "",
      editForm: {
        id: "",
        name: "",
        category: "",
        price: "",
        ctime: "",
        rating: "",
        sellCount: "",
        goodsDesc: "",
        imgUrl: ""
      },

      cates: [],
      searchForm: {
        name: "",
        cate: ""
      },
      editState: false //默认不显示模态框
    };
  },

  methods: {
    //   获取数据列表
    async getList() {
      let { total, data } = await getGoodsList({
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        name: this.searchForm.name,
        category: this.searchForm.category
      });

      if (!data.length && this.currentPage != 1) {
        this.currentPage -= 1;
        this.getList();
      }
      if (total) {
        this.tableData = data;
        this.total = total;
      }
    },

    // 搜索  查询
    search() {
      this.getList();
    },

    // 重置搜索框
    reset() {
      (this.searchForm = {}), this.getList();
    },

    // 获取 商品类别 数组
    async getCates() {
      let { categories } = await getCateName();
      //   console.log("cates=====", categories);
      this.cates = categories;
    },

    // 编辑数据
    handleEdit(row) {
      this.editState = true;
      local.set("goodrow", row);

      //   回填数据
      //   this.editForm = { ...row };
      this.editForm = { ...local.get("goodrow") };
    },

    // 上传的照片  格式检查
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG / PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },

    // 接收上传图片成功的响应数据
    handleAvatarSuccess(res) {
      let { code, imgUrl, msg } = res;
      if (code === 0) {
        this.$message({ type: "success", message: msg });
        this.editForm.imgUrl = imgUrl;
      }
    },

    // 提交请求   修改数据
    checkEdit() {
      this.editState = false;
      editGood({
        name: this.editForm.name,
        category: this.editForm.category,
        price: this.editForm.price,
        imgUrl: this.editForm.imgUrl,
        goodsDesc: this.editForm.goodsDesc,
        id: this.editForm.id
      });
      //   刷新
      this.getList();
    },

    // 删除商品
    handleDelete(id) {
      // 删除前进行询问
      this.$confirm("确定要删除数据", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          let { code } = await delGood({ id }); // 发送删除请求[形参id和后台要求的数据同名 可以省略一个]
          if (code === 0) {
            this.getList(); //重新渲染
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    handleSizeChange(size) {
      this.pageSize = size;
      this.getList();
    },

    handleCurrentChange(page) {
      this.currentPage = page;
      this.getList();
    }
  },

  created() {
    this.getList();
    this.getCates();
  }
};
</script>
<style lang="less" scoped>
.goods-list {
  margin-top: 20px;

  .my-pagination {
    margin-top: 30px;
  }
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  /deep/ .el-dialog {
    width: 550px;
    /deep/ .el-input {
      width: 300px;
    }
  }
}
</style>;
