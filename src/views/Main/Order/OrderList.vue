<template>
  <div class="order-statistcs">
    <div class="my-form">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="订单号">
          <el-input placeholder="订单号" v-model="form.orderNo"></el-input>
        </el-form-item>

        <el-form-item label="收货人">
          <el-input placeholder="收货人" v-model="form.consignee"></el-input>
        </el-form-item>

        <el-form-item label="手机号">
          <el-input placeholder="手机号" v-model="form.phone"></el-input>
        </el-form-item>

        <el-form-item label="订单状态">
          <el-select v-model="form.orderState" placeholder="订单状态">
            <el-option label="已受理" value="已受理"></el-option>
            <el-option label="已完成" value="已完成"></el-option>
            <el-option label="派送中" value="派送中"></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <div class="block">
        <span class="demonstration">下单时间</span>
        <el-date-picker
          v-model="form.orderTime"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd  HH:mm:ss"
        ></el-date-picker>
        <el-button @click="search" type="primary">查询</el-button>
        <el-button @click="reset" type="success">重置</el-button>
      </div>
    </div>

    <el-table class="my-table" :data="tableData" border style="width: 100%">
      <el-table-column fixed prop="orderNo" label="订单号" width="100"></el-table-column>
      <el-table-column prop="orderTime" label="下单时间" width="170"></el-table-column>
      <el-table-column prop="phone" label="手机号" width="120"></el-table-column>
      <el-table-column prop="consignee" label="收货人" width="120"></el-table-column>
      <el-table-column prop="deliverAddress" label="配送地址" width="200"></el-table-column>
      <el-table-column prop="deliveryTime" label="送达时间" width="170"></el-table-column>
      <el-table-column prop="remarks" label="用户备注" width="120"></el-table-column>
      <el-table-column prop="orderAmount" label="订单金额" width="120"></el-table-column>
      <el-table-column prop="orderState" label="订单状态" width="120"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleClickView(scope.row)" type="text" size="small">查看</el-button>
          <!-- 修改为单独打开一个组件 -->
          <el-button @click="handleClickEdit(scope.row)" type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="my-pagination">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        layout="total, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>

    <!-- 查看  订单信息  蒙层 []-->
    <el-dialog title="查看订单信息" :visible.sync="lookState">
      <!-- 表单表格切换 -->
      <el-form
        :model="detailData"
        :disabled="!isEdit"
        :class="{clearBorder: !isEdit}"
        label-width="80px"
        size="small"
      >
        <!-- 订单号 -->
        <el-form-item label="订单号">
          <el-input v-model="detailData.orderNo"></el-input>
        </el-form-item>

        <!-- 下单时间 -->
        <el-form-item label="下单时间">
          <el-input v-model="detailData.orderTime"></el-input>
        </el-form-item>

        <!-- 手机号 -->
        <el-form-item label="手机号">
          <el-input v-model="detailData.orderNo"></el-input>
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
          <el-input v-model="detailData.deliveryTime"></el-input>
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
        <el-button @click="lookState = false" size="mini">取 消</el-button>
        <!-- <el-button type="primary" @click="checkEditData" v-if="isEdit" size="mini">修改</el-button> -->
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getOrderInfo, editOrderInfo } from "@/api/order";
import moment from "moment";
import local from "@/utils/local";

export default {
  methods: {
    //   搜索
    search() {
      //   console.log("form==", this.form);
      //   console.log("form==", JSON.stringify(this.form.orderTime));
      // 发送 ajax  查询
      this.getList();
    },

    //   清空数据
    reset() {
      this.form = {};
      this.search(); //重置以后  需要重新呈现全部结果
    },

    // 点击 查看 单条数据
    handleClickView(row) {
      this.lookState = true; //显示蒙层
      this.isEdit = false; //表单状态改为 不 可修改
      this.detailData = row;
      //   console.log("this.detail===", this.detailData);
    },

    // 点击 编辑  当前数据=====跳转到编辑页面
    handleClickEdit(row) {
      // 跳转到编辑页面 【同时传递数据过去：1、会话/本地存储  2、路由传参的params方式   3、路由传参的query方式】
      //   1、本地存储
      local.set("orderInfo", row);
      this.$router.push("/order/order-edit");
    },

    // 当前页发生变化
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getList();
    },

    //获取订单列表
    async getList() {
      let { total, data } = await getOrderInfo({
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        orderNo: this.form.orderNo,
        consignee: this.form.consignee,
        phone: this.form.phone,
        orderState: this.form.orderState,
        date: JSON.stringify(this.form.orderTime)
      });
      //   处理一下时间;
      data.forEach(v => {
        v.orderTime = moment(v.orderTime).format("YYYY-MM-DD  hh:mm:ss");
        v.deliveryTime = moment(v.deliveryTime).format("YYYY-MM-DD  hh:mm:ss");
      });
      this.tableData = data;
      this.total = total;
    }
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 5,
      total: 10,
      form: {
        orderNo: "",
        consignee: "",
        phone: "",
        orderState: "",
        orderTime: []
      },
      tableData: [],
      lookState: false, //查看订单信息的 蒙层状态  默认=不显示
      detailData: [], //被查看的一条数据的详情【蒙层展示内容】
      isEdit: false //点击的是查看则为false  禁用表单，当点击的是编辑则为 true
    };
  },
  created() {
    this.getList();
  }
};
</script>

<style lang="less" scoped>
.order-statistcs {
  background: #fff;
  margin-top: 20px;
  padding: 20px;
  .my-form {
    /deep/ .el-form {
      display: flex;
    }
    .block {
      margin-top: 10px;
      .demonstration {
        margin-right: 15px;
      }
      .el-button {
        margin-left: 20px;
      }
    }
  }
  /deep/ .my-table {
    margin-top: 30px;
    /deep/ .el-table__body {
      overflow-y: scroll;
      height: 400px;
    }
  }
  //   分页
  .my-pagination {
    margin-top: 30px;
  }
  //   模态框
  /deep/ .el-dialog {
    width: 500px;
    .clearBorder {
      /deep/ .el-input__inner {
        border: none;
        background: #fff;
        color: #333;
      }
    }
  }
}
</style>