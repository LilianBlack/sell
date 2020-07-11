<template>
  <div class="goods-list">
    <Pane>
      <div slot="title">商品列表</div>
      <div slot="content"></div>
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
      activeName: "1",
      tableData: [{}]
    };
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    }
  }
};
</script>
<style lang="less" scoped>
.goods-list {
  margin-top: 20px;
}
</style>;
