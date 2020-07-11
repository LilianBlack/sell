<template>
  <div class="personal">
    <Pane>
      <div slot="title">管理员信息</div>
      <div slot="content">
        <div class="perInfo" v-for="(v,i) in tableData" :key="i">
          <div class="title">{{v.title}}:</div>
          <div class="val">{{v.val}}</div>
        </div>
        <div class="avatorBox">
          <div class="title">管理员头像</div>
          <img :src="avatarUrl" alt />
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
      avatarUrl: require("../../../assets/imgs/c1.jpg"),
      tableData: [
        { title: "管理员ID", val: "123" },
        { title: "账号", val: "小百里" },
        { title: "用户组", val: "超级管理员" },
        { title: "创建时间", val: "2020-7-10" }
      ]
    };
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
    img {
      width: 200px;
      height: 200px;
    }
  }
}
</style>