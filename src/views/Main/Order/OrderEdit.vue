<template>
  <Pane class="order-edit">
    <div slot="title">修改订单信息</div>
    <div slot="content" class="content">
      <!-- 修改信息 -->
      <el-form :model="detailData" label-width="80px" size="middle">
        <!-- 订单号 -->
        <el-form-item label="订单号">
          <el-input v-model="detailData.orderNo" disabled></el-input>
        </el-form-item>

        <!-- 下单时间 -->
        <el-form-item label="下单时间">
          <el-input v-model="detailData.orderTime" disabled></el-input>
        </el-form-item>

        <!-- 手机号 -->
        <el-form-item label="手机号">
          <el-input v-model="detailData.orderNo" disabled></el-input>
        </el-form-item>

        <!-- 收货人 -->
        <el-form-item label="收货人">
          <el-input v-model="detailData.consignee"></el-input>
        </el-form-item>

        <!-- 配送地址 -->
        <el-form-item label="配送地址">
          <el-input v-model="detailData.deliverAddress"></el-input>
        </el-form-item>

        <!-- 送达时间 -->
        <el-form-item label="送达时间">
          <el-date-picker v-model="detailData.deliveryTime" type="datetime" placeholder="选择日期时间"></el-date-picker>
        </el-form-item>

        <!-- 用户备注 -->
        <el-form-item label="用户备注">
          <el-input v-model="detailData.remarks"></el-input>
        </el-form-item>

        <!-- 订单金额 -->
        <el-form-item label="订单金额">
          <el-input v-model="detailData.orderAmount"></el-input>
        </el-form-item>

        <!-- 订单状态 -->
        <el-form-item label="订单状态">
          <el-input v-model="detailData.orderState"></el-input>
        </el-form-item>
      </el-form>

      <!-- 按钮 -->
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="exitEdit">取 消</el-button>
        <el-button type="primary" @click="checkEditData" size="small">修改</el-button>
      </div>
    </div>
  </Pane>
</template>

<script>
import Pane from "@/components/Pane.vue";
import local from "@/utils/local";
import { editOrderInfo } from "@/api/order";

export default {
  components: {
    Pane
  },

  data() {
    return {
      detailData: {
        orderNo: "",
        orderTime: [],
        deliverAddress: "",
        deliveryTime: [],
        remarks: "",
        orderAmount: 0,
        consignee: "",
        phone: "",
        orderState: ""
      }
    };
  },

  methods: {
    //   数据回填
    getDtaFromList() {
      this.detailData = local.get("orderInfo");
      //   console.log(this.detailData);
    },

    // 发送 ajax  修改数据
    async checkEditData() {
      let { code } = await editOrderInfo({
        id: this.detailData.id,
        orderNo: this.detailData.orderNo,
        orderTime: this.detailData.orderTime,
        deliverAddress: this.detailData.deliverAddress,
        deliveryTime: this.detailData.deliveryTime,
        remarks: this.detailData.remarks,
        orderAmount: this.detailData.orderAmount,
        consignee: this.detailData.consignee,
        phone: this.detailData.phone,
        orderState: this.detailData.orderState
      });
      if (code === 0) {
        this.$router.push("/order/order-list");
      }
    },

    //  取消修改
    exitEdit() {
      this.$router.push("/order/order-list");
    }
  },

  created() {
    this.getDtaFromList();
  }
};
</script>

<style lang="less" scoped>
.order-edit {
  margin-top: 30px;
  margin-bottom: 20px;
  .content {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-bottom: 30px;
    /deep/ .el-form {
      // display: flex;
      /deep/ .el-input {
        width: 400px;
      }
    }
    .dialog-footer {
      margin-top: 30px;
    }
  }
}
</style>