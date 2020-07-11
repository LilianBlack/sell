<template>
  <div class="shop">
    <Pane>
      <div slot="title">店铺管理</div>
      <div slot="content">
        <el-form ref="form" :model="form" label-width="80px">
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
              v-model="textarea"
            ></el-input>
          </div>

          <div class="good-pic">
            <span class="pic-title">店铺头像</span>
            <el-upload action="#" list-type="picture-card" :auto-upload="false">
              <i slot="default" class="el-icon-plus"></i>
              <div slot="file" slot-scope="{file}">
                <img class="el-upload-list__item-thumbnail" :src="file.url" alt />
                <span class="el-upload-list__item-actions">
                  <span
                    class="el-upload-list__item-preview"
                    @click="handlePictureCardPreview(file)"
                  >
                    <i class="el-icon-zoom-in"></i>
                  </span>
                  <span
                    v-if="!disabled"
                    class="el-upload-list__item-delete"
                    @click="handleDownload(file)"
                  >
                    <i class="el-icon-download"></i>
                  </span>
                  <span
                    v-if="!disabled"
                    class="el-upload-list__item-delete"
                    @click="handleRemove(file)"
                  >
                    <i class="el-icon-delete"></i>
                  </span>
                </span>
              </div>
            </el-upload>
          </div>

          <div class="good-pic">
            <span class="pic-title">店铺图片</span>
            <el-upload action="#" list-type="picture-card" :auto-upload="false">
              <i slot="default" class="el-icon-plus"></i>
              <div slot="file" slot-scope="{file}">
                <img class="el-upload-list__item-thumbnail" :src="file.url" alt />
                <span class="el-upload-list__item-actions">
                  <span
                    class="el-upload-list__item-preview"
                    @click="handlePictureCardPreview(file)"
                  >
                    <i class="el-icon-zoom-in"></i>
                  </span>
                  <span
                    v-if="!disabled"
                    class="el-upload-list__item-delete"
                    @click="handleDownload(file)"
                  >
                    <i class="el-icon-download"></i>
                  </span>
                  <span
                    v-if="!disabled"
                    class="el-upload-list__item-delete"
                    @click="handleRemove(file)"
                  >
                    <i class="el-icon-delete"></i>
                  </span>
                </span>
              </div>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt />
            </el-dialog>
          </div>

          <el-form-item label="配送费">
            <el-input class="good-title" v-model="form.name"></el-input>
          </el-form-item>

          <el-form-item label="配送时间">
            <el-input class="good-title" v-model="form.name"></el-input>
          </el-form-item>

          <el-form-item label="配送描述">
            <el-input class="good-title" placeholder="蜂鸟专送" v-model="form.name"></el-input>
          </el-form-item>

          <el-form-item label="店铺评分">
            <el-input class="good-title" v-model="form.name"></el-input>
          </el-form-item>

          <el-form-item label="销量">
            <el-input class="good-title" placeholder="销量" v-model="form.name"></el-input>
          </el-form-item>

          <div>
            <span class="des-title">活动</span>
            <el-checkbox-group v-model="checkList">
              <el-checkbox label="复选框 A"></el-checkbox>
              <el-checkbox label="复选框 B"></el-checkbox>
              <el-checkbox label="复选框 C"></el-checkbox>
              <el-checkbox label="禁用"></el-checkbox>
              <el-checkbox label="选中且禁用"></el-checkbox>
            </el-checkbox-group>
          </div>

          <div>
            <span class="des-title">营业时间</span>
            <el-time-picker
              is-range
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              placeholder="选择时间范围"
            ></el-time-picker>
          </div>
        </el-form>
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
      // 名称 分类
      form: {
        name: "",
        region: ""
      },
      // 计数器
      num: 1,
      // 上传图片
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      //   文本域
      textarea: "",
      checkList: ["选中且禁用", "复选框 A"]
    };
  },
  methods: {
    //   计数器
    handleChange(value) {
      console.log(value);
    },
    //   上传
    handleRemove(file) {
      console.log(file);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleDownload(file) {
      console.log(file);
    },
    onSubmit() {
      console.log("submit!");
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