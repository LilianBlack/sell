<template>
  <div class="add-goods">
    <Pane>
      <div slot="title">商品添加</div>
      <div slot="content">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="商品名称">
            <el-input class="good-title" v-model="form.name" placeholder="商品名称"></el-input>
          </el-form-item>

          <el-form-item label="商品分类">
            <el-select v-model="form.category" placeholder="请选择商品分类">
              <el-option
                v-for="cate in categories"
                :key="cate.cateName"
                :value="cate.cateName"
              >{{cate.cateName}}</el-option>
            </el-select>
          </el-form-item>

          <div class="good-price">
            <span class="price-title">商品价格</span>
            <el-input-number v-model="form.price" @change="handleChange" label="描述文字"></el-input-number>
          </div>

          <div class="good-pic">
            <span class="pic-title">商品图片</span>
            <el-upload
              action="http://127.0.0.1:5000/goods/goods_img_upload"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
              list-type="picture-card"
              :show-file-list="false"
              class="avatar-uploader"
            >
              <img
                v-if="form.imgUrl"
                class="el-upload-list__item-thumbnail"
                :src="imgBase + form.imgUrl"
                style="width:100%; height:100%;"
                alt
              />
              <i v-else slot="default" class="el-icon-plus"></i>
            </el-upload>
          </div>

          <div class="good-describe">
            <span class="des-title">商品描述</span>
            <el-input
              class="des-area"
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
              v-model="form.goodsDesc"
            ></el-input>
          </div>

          <el-form-item>
            <el-button type="primary" @click="onSubmit">添加商品</el-button>
          </el-form-item>
        </el-form>
      </div>
    </Pane>
  </div>
</template>

<script>
import Pane from "@/components/Pane.vue";
import { addGood, getCateName } from "@/api/goods";

export default {
  components: {
    Pane
  },
  data() {
    return {
      imgBase: "http://127.0.0.1:5000/upload/imgs/goods_img/",
      // 名称 分类
      form: {
        name: "",
        category: "",
        price: 20,
        imgUrl: "",
        goodsDesc: ""
      },
      categories: [],
      // 上传图片
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false
    };
  },
  async created() {
    let { categories } = await getCateName();
    this.categories = categories;
  },
  methods: {
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
        this.form.imgUrl = imgUrl;
      }
    },
    //   计数器
    handleChange(value) {
      console.log(value);
    },

    async onSubmit() {
      //   console.log("价格", this.form.price + "");
      let { code } = await addGood({
        name: this.form.name,
        category: this.form.category,
        price: this.form.price, //转字符串
        imgUrl: this.form.imgUrl,
        goodsDesc: this.form.goodsDesc
      });
      if (code === 0) {
        this.$router.push("/goods/goods-list");
      }
    }
  }
};
</script>

<style lang="less" scoped>
.add-goods {
  margin-top: 20px;
  /deep/ .el-form {
    font-size: 14px;
    color: #606266;
    line-height: 40px;
    /deep/ .good-title {
      width: 400px;
    }
    .good-price {
      padding: 0 12px 0 0;
      .price-title {
        width: 80px;
        margin-right: 25px;
      }
    }
    .good-pic {
      display: flex;
      margin-top: 20px;
      .pic-title {
        width: 80px;
      }
    }
    .good-describe {
      display: flex;
      margin-top: 20px;
      .des-title {
        width: 80px;
        margin-right: 5px;
        margin-bottom: 30px;
      }
      .des-area {
        width: 400px;
      }
    }
  }
}
</style>