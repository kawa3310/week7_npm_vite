<template>
  <div class="container">
    <div class="text-end mt-4">
      <table class="table mt-4">
        <thead>
          <tr>
            <th width="120">購買日期</th>
            <th width="120">Email</th>
            <th width="120">品項</th>
            <th width="120">應付金額</th>
            <th width="120">付款狀態</th>
            <th width="120">編輯</th>
          </tr>
        </thead>
        <tbody>
          <template  v-for="item in orderData" :key="item.id">
            <tr v-if="orderData.length" :class=" { 'text-secondary': !item.is_paid } ">
            <td>{{ date(item.create_at) }}</td>
            <td>{{ item.user.email }}</td>
            <ul class="list-unstyled">
              <li v-for="item in item.products" :key="item.id">{{ item.product.title }}</li>
            </ul>
            <td>{{ item.total }}</td>
            <td>
              <div class="form-check form-switch">
                <input class="form-check-input" v-model="item.is_paid"
                type="checkbox" role="switch"
                :id="`paidSwitch${item.id}`"
                @change="addOrderStates(item)">
                <label class="form-check-label" :for="`paidSwitch${item.id}`">
                  <span v-if="item.is_paid">已付款</span>
                  <span v-else>未付款</span>
                </label>
              </div>
            </td>
            <div class="btn-group">
              <button type="button" class="btn btn-outline-primary btn-sm" @click="openModel('look', item)">
                查看
              </button>
              <button type="button" class="btn btn-outline-danger btn-sm" @click="openModel('dele', item)">
                刪除
              </button>
            </div>
          </tr>
          </template>
        </tbody>
      </table>
    </div>
  </div>
  <PaginationModal :pages="pages" @emit-Pages="getOrders"></PaginationModal>
  <OrderModal :temp-Order="tempOrder" ref="orderModal" @add-Order-States="addOrderStates"></OrderModal>
  <DelProductModal :item="tempOrder" @del-item="delOrder" ref="deModal"></DelProductModal>
</template>

<script>
import axios from 'axios';
import 'bootstrap/scss/bootstrap.scss';
import PaginationModal from '../../components/paginationmodal.vue';
import OrderModal from '../../components/OrderModal.vue';
import DelProductModal from '../../components/DelProductModal.vue';
const { VITE_URL, VITE_PATH } = import.meta.env;
export default {
  data () {
    return {
      pagination: {},
      orderData: {},
      tempOrder: {},
      pages: 1,
      isNew: false
    };
  },
  methods: {
    cheakLongin () {
      axios.post(`${VITE_URL}/api/user/check`)
        .then((res) => {
          this.getOrders();
        })
        .catch((err) => {
          alert(err.response.data.message);
          this.$router.push('/login');
        });
    },
    getOrders (page = 1) {
      axios.get(`${VITE_URL}/api/${VITE_PATH}/admin/orders?page=${page}`)
        .then((res) => {
          this.orderData = res.data.orders;
          this.page = res.data.pagination;
          console.log(this.orderData);
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
    openModel (states, item) {
      this.isNew = true;
      if (states === 'look') {
        this.isNew = false;
        this.tempOrder = { ...item };
        this.$refs.orderModal.modelOpen();
      } else if (states === 'dele') {
        this.tempOrder = { ...item };
        this.$refs.deModal.modelOpen();
      }
    },
    addOrderStates (item) {
      this.isNew = true;
      const paid = {
        is_paid: item.is_paid
      };
      axios.put(`${VITE_URL}/api/${VITE_PATH}/admin/order/${item.id}`, { data: paid })
        .then((res) => {
          this.isNew = false;
          alert(res.data.message);
          this.$refs.orderModal.modalClose();
          this.getOrders();
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
    delOrder () {
      this.isNew = true;
      axios.delete(`${VITE_URL}/api/${VITE_PATH}/admin/order/${this.tempOrder.id}`)
        .then((res) => {
          this.isNew = false;
          alert(res.data.message);
          this.$refs.deModal.modalClose();
          this.getOrders();
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
    date (time) {
      const localDate = new Date(time * 1000);
      return localDate.toLocaleDateString();
    }
  },
  mounted () {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)kawaToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    axios.defaults.headers.common.Authorization = token;
    this.cheakLongin();
  },
  components: {
    PaginationModal,
    OrderModal,
    DelProductModal
  }
};
</script>
