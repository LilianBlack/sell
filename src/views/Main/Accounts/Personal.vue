<template>
  <div class="personal">
    <Pane>
      <div slot="title">管理员信息</div>
      <div slot="content">
        <div class="perInfo">
          <div class="title">管理员ID</div>
          <div class="val">{{tableData.id}}</div>
        </div>

        <div class="perInfo">
          <div class="title">账号</div>
          <div class="val">{{tableData.account}}</div>
        </div>

        <div class="perInfo">
          <div class="title">用户组</div>
          <div class="val">{{tableData.userGroup}}</div>
        </div>

        <div class="perInfo">
          <div class="title">创建时间</div>
          <div class="val">{{tableData.ctime}}</div>
        </div>

        <div class="avatorBox">
          <div class="title">管理员头像</div>
          <el-upload
            class="avatar-uploader"
            action="http://127.0.0.1:5000/users/avatar_upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imgUrl" :src="imgBase + imgUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
        <el-button @click="confirmModify" type="primary" size="small">确认修改</el-button>
      </div>
    </Pane>
  </div>
</template>

<script>
import Pane from "@/components/Pane.vue";
import local from "@/utils/local";
import moment from "moment";
import { editUserAvator } from "@/api/account";

export default {
  components: {
    Pane
  },
  data() {
    return {
      imgBase: "http://127.0.0.1:5000/upload/imgs/acc_img/",
      imgUrl: "",
      tableData: {}
    };
  },
  methods: {
    //   获取数据
    getInfo() {
      let info = local.get("user");
      info.ctime = moment(info.ctime).format("YYYY-MM-DD hh:mm:ss");
      this.tableData = info;
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
        this.imgUrl = imgUrl;
      }
    },
    // 确认修改图片
    async confirmModify() {
      let { code } = await editUserAvator({ imgUrl: this.imgUrl });
      if (code === 0) {
        // bus中介传送   修改面包屑的头像
        this.$bus.$emit("update_avatar");
      }
    }
  },

  created() {
    //   获取数据
    this.getInfo();
  }
};
</script>

<style lang="less" scoped>
.personal {
  margin-top: 20px;
  .perInfo {
    display: flex;
    border-bottom: 1px solid #eee;
    padding: 15px 0;
    .title {
      padding-right: 20px;
    }
  }
  .avatorBox {
    padding: 15px 0;
    display: flex;
    .title {
      padding-right: 20px;
      line-height: 200px;
    }
    /deep/ .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409eff;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
  }
}
</style>