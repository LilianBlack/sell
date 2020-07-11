<template>
  <div class="add-goods">
    <Pane>
      <div slot="title">商品添加</div>
      <div slot="content">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="商品名称" placeholder="商品名称">
            <el-input class="good-title" v-model="form.name"></el-input>
          </el-form-item>

          <el-form-item label="商品分类" placeholder="请选择商品分类">
            <el-select v-model="form.region" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>

          <div class="good-price">
            <span class="price-title">商品价格</span>
            <el-input-number v-model="num" @change="handleChange" :min="1" :max="10" label="描述文字"></el-input-number>
          </div>

          <div class="good-pic">
            <span class="pic-title">商品图片</span>
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

          <div class="good-describe">
            <span class="des-title">商品描述</span>
            <el-input
              class="des-area"
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
              v-model="textarea"
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
      textarea: ""
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