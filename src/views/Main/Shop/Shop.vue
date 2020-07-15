<template>
  <div class="shop">
    <Pane>
      <div slot="title" class="title">
        <span>店铺管理</span>
        <el-button
          :type=" isEdit? ' success' : 'primary' "
          @click="changeEdit"
        >{{ isEdit? '保存' : '编辑'}}</el-button>
      </div>
      <div slot="content">
        <el-form ref="form" :model="form" label-width="80px" :disabled="!isEdit">
          <el-form-item label="店铺名称" placeholder="粥品">
            <el-input class="good-title" v-model="form.name"></el-input>
          </el-form-item>

          <div class="good-describe">
            <span class="des-title">店铺公告</span>
            <el-input
              class="des-area"
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
              v-model="form.bulletin"
              autosize
            ></el-input>
          </div>

          <div class="good-pic">
            <span class="pic-title">店铺头像</span>
            <el-upload
              class="avatar-uploader"
              action="http://127.0.0.1:5000/shop/upload"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="form.avatar" :src="form.avatar" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>

          <div class="good-pic">
            <span class="pic-title">店铺图片</span>
            <el-upload
              action="http://127.0.0.1:5000/shop/upload"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              :on-success="handleUpload"
              :file-list="fileList"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt />
            </el-dialog>
          </div>

          <el-form-item class="deliveryCost" label="配送费">
            <el-input class="good-title" v-model="form.deliveryPrice"></el-input>
          </el-form-item>

          <el-form-item label="配送时间">
            <el-input class="good-title" v-model="form.deliveryTime"></el-input>
          </el-form-item>

          <el-form-item label="配送描述">
            <el-input class="good-title" placeholder="蜂鸟专送" v-model="form.description"></el-input>
          </el-form-item>

          <el-form-item label="店铺评分">
            <el-input class="good-title" v-model="form.score"></el-input>
          </el-form-item>

          <el-form-item label="销量">
            <el-input class="good-title" placeholder="销量" v-model="form.sellCount"></el-input>
          </el-form-item>

          <div class="activites">
            <span class="des-title">活动</span>
            <el-checkbox-group v-model="form.supports">
              <el-checkbox label="在线支付满28减5"></el-checkbox>
              <el-checkbox label="VC无限橙果汁全场8折"></el-checkbox>
              <el-checkbox label="单人精彩套餐"></el-checkbox>
              <el-checkbox label="特价饮品8折抢购"></el-checkbox>
              <el-checkbox label="单人特色套餐"></el-checkbox>
            </el-checkbox-group>
          </div>

          <div class="openingHour">
            <span class="des-title">营业时间</span>
            <el-date-picker
              is-range
              v-model="form.date"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </div>
        </el-form>
      </div>
    </Pane>
  </div>
</template>

<script>
import Pane from "@/components/Pane.vue";
import { getShopData, editShop } from "@/api/shop";

export default {
  components: {
    Pane
  },
  data() {
    return {
      // 名称 分类
      form: {
        name: "",
        bulletin: "",

        // 头像
        avatar: "",
        // 图片
        pics: [],

        deliveryPrice: "",
        deliveryTime: "",
        description: "",
        score: "",
        sellCount: "",
        supports: [],
        date: []
      },
      // 计数器
      num: 1,
      // 上传图片
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      //   文本域
      textarea: "",
      checkList: ["选中且禁用", "复选框 A"],

      //   是否启用编辑   默认只读
      isEdit: false,

      //   图片的基础路径
      baseImgUrl: "http://127.0.0.1:5000/upload/shop/",

      // 多图存储的数组
      fileList: [] // { url: "" } 文件列表的上传 格式   对象数组
    };
  },
  methods: {
    //  获取商铺数据  回填
    async getData() {
      let { code, data } = await getShopData();
      if (data) {
        //   处理图片数据
        data.avatar = this.baseImgUrl + data.avatar;
        // 多图 处理为对象数组
        this.fileList = data.pics.map(v => ({ url: this.baseImgUrl + v }));

        // 赋值渲染
        this.form = data;
      }
    },

    // 改变编辑或者只读状态
    async changeEdit() {
      this.isEdit = !this.isEdit;
      if (!this.isEdit) {
        //   点击修改  发送ajax  修改数据
        // 处理图片组
        this.form.pics = this.fileList.map(v => {
          return v.url.substr(this.baseImgUrl.length);
        });

        let { code } = await editShop({
          id: this.form.id,
          name: this.form.name,
          bulletin: this.form.bulletin,
          avatar: JSON.stringify(
            this.form.avatar.substr(this.baseImgUrl.length)
          ),
          deliveryPrice: this.form.deliveryPrice,
          deliveryTime: this.form.deliveryTime,
          description: this.form.description,
          score: this.form.score,
          sellCount: this.form.sellCount,
          supports: JSON.stringify(this.form.supports),
          date: JSON.stringify(this.form.date),
          pics: JSON.stringify(this.form.pics)
        });
        if (code === 0) {
          this.getData();
        }
      }
    },

    // 头像上传 成功后    照片回填
    handleAvatarSuccess(res) {
      let { code, msg, imgUrl } = res;
      if (code === 0) {
        this.$message({
          type: "info",
          message: msg
        });
        this.form.avatar = this.baseImgUrl + imgUrl;
        console.log(imgUrl);
      }
    },

    // 上传图片前 的格式限制
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },

    //   多图上传 --- 删除图片后
    handleRemove(res) {
      // 删除 数组中 对应id的对象
      this.fileList.forEach((v, i) => {
        if (v.uid === res.uid) {
          this.fileList.splice(i, 1);
        }
      });
    },

    // 多图----上传照片后
    handleUpload(response) {
      // 将新图片 放进数组
      this.fileList.push({ url: this.baseImgUrl + response.imgUrl });
    },

    //    图片的预览
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  },

  created() {
    this.getData();
  }
};
</script>

<style lang="less" scoped>
.shop {
  margin-top: 30px;
  margin-bottom: 30px;
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .el-form {
    /deep/ .el-input,
    /deep/ .el-textarea__inner {
      width: 400px;
    }
    /deep/ .avatar {
      width: 150px;
    }
    .good-describe {
      display: flex;
      margin-top: 20px;
      .des-title {
        width: 80px;
        margin-right: 5px;
        margin-bottom: 30px;
      }
    }
    .good-pic {
      display: flex;
      margin-top: 20px;
      .pic-title {
        width: 80px;
      }
    }
    .deliveryCost {
      margin-top: 20px;
    }
    .activites {
      display: flex;
      .des-title {
        width: 70px;
        text-align: right;
        margin-right: 10px;
      }
      /deep/ .el-checkbox-group {
        width: 400px;
        /deep/ .el-checkbox {
          margin-bottom: 20px;
        }
      }
    }
    .openingHour {
      margin-top: 20px;
      .des-title {
        width: 80px;
        margin-right: 15px;
      }
    }
  }
}
</style>