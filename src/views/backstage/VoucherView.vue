<template>
  <VueLoading :active="isloading" :z-index="1060"></VueLoading>
  <div class="container">
    <div class="text-end mt-4">
      <button class="btn btn-primary" @click="openModel('new')">
        建立優惠卷
      </button>
    </div>
    <div class="text-end mt-4">
      <table class="table mt-4">
        <thead>
          <tr>
            <th width="120">名稱</th>
            <th width="120">折扣百分比</th>
            <th width="120">到期日</th>
            <th width="120">是否啟用</th>
            <th width="120">編輯</th>
          </tr>
        </thead>
        <tbody>
            <tr v-for="item in voucher" :key="item.id">
              <td>{{ item.title }}</td>
              <td>{{ item.percent }}%</td>
              <td>{{ $date.date(item.due_date) }}</td>
              <td>
                  <span class="text-success" v-if="item.is_enabled === 1">啟用</span>
                  <span v-else>未啟用</span>
              </td>
              <td>
                <div class="btn-group">
                <button type="button" class="btn btn-outline-primary btn-sm"
                @click="openModel('edit', item)">
                  編輯
                </button>
                <button type="button" class="btn btn-outline-danger btn-sm"
                @click="openModel('dele', item)">
                  刪除
                </button>
                </div>
              </td>
            </tr>
        </tbody>
      </table>
    </div>
  </div>
  <PaginationModal :pages="pages" @emit-Pages="getVoucherData"></PaginationModal>
  <VoucherModal :is-New="isNew" :temp-Voucher="tempVoucher" @edit-Voucher="editVoucher" ref="voucher"></VoucherModal>
  <DelProductModal @del-item="delProduct" :temp-Voucher="tempVoucher" ref="deModal"></DelProductModal>
</template>
<script>
import axios from 'axios';
import Swal from 'sweetalert2';
import VoucherModal from '@/components/VoucherModal.vue';
import DelProductModal from '@/components/DelProductModal.vue';
import PaginationModal from '../../components/PaginationModal.vue';
const { VITE_URL, VITE_PATH } = import.meta.env;
export default {
  data () {
    return {
      voucher: {},
      tempVoucher: {
        title: '',
        is_enabled: 0,
        percent: 100,
        code: ''
      },
      isNew: false,
      pages: {},
      isloading: false
    };
  },
  methods: {
    cheakLongin () {
      axios.post(`${VITE_URL}/api/user/check`)
        .then((res) => {
          this.getVoucherData();
        })
        .catch((err) => {
          this.$router.push('/login');
          Swal.fire({
            toast: true,
            position: 'center',
            showConfirmButton: false,
            timer: 1500,
            icon: 'error',
            title: err.response.data.message
          });
        });
    },
    getVoucherData () {
      this.isloading = true;
      axios.get(`${VITE_URL}/api/${VITE_PATH}/admin/coupons`)
        .then((res) => {
          this.isloading = false;
          this.voucher = res.data.coupons;
          this.pages = res.data.pagination;
        })
        .catch((err) => {
          this.isloading = false;
          Swal.fire({
            toast: true,
            position: 'center',
            showConfirmButton: false,
            timer: 1500,
            title: err.response.data.message
          });
        });
    },
    openModel (isNew, item) {
      if (isNew === 'new') {
        this.isNew = true;
        this.tempVoucher = {
          due_date: new Date().getTime() / 1000
        };
        this.$refs.voucher.modelOpen();
      } else if (isNew === 'edit') {
        this.isNew = false;
        this.tempVoucher = { ...item };
        this.$refs.voucher.modelOpen();
      } else if (isNew === 'dele') {
        this.tempVoucher = { ...item };
        this.$refs.deModal.modelOpen();
      }
    },
    editVoucher () {
      let url = `${VITE_URL}/api/${VITE_PATH}/admin/coupon`;
      let http = 'post';

      if (!this.isNew) {
        this.isloading = true;
        url = `${VITE_URL}/api/${VITE_PATH}/admin/coupon/${this.tempVoucher.id}`;
        http = 'put';
      }
      this.isloading = true;
      axios[http](url, { data: this.tempVoucher })
        .then((res) => {
          Swal.fire({
            toast: true,
            position: 'center',
            showConfirmButton: false,
            timer: 1500,
            icon: 'success',
            title: '編輯成功'
          });
          this.isloading = false;
          this.$refs.voucher.modalClose();
          this.getVoucherData();
        })
        .catch((err) => {
          this.isloading = false;
          Swal.fire({
            toast: true,
            position: 'center',
            showConfirmButton: false,
            timer: 1500,
            icon: 'error',
            title: err.response.data.message
          });
        });
    },
    delProduct () {
      this.isloading = true;
      axios.delete(`${VITE_URL}/api/${VITE_PATH}/admin/coupon/${this.tempVoucher.id}`)
        .then((res) => {
          this.isloading = false;
          this.$refs.deModal.modalClose();
          this.getVoucherData();
          Swal.fire({
            toast: true,
            position: 'center',
            showConfirmButton: false,
            timer: 1500,
            icon: 'success',
            title: '已刪除'
          });
        })
        .catch((err) => {
          this.isloading = false;
          Swal.fire({
            toast: true,
            position: 'center',
            showConfirmButton: false,
            timer: 1500,
            icon: 'error',
            title: err.response.data.message
          });
        });
    }
  },
  mounted () {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)kawaToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    axios.defaults.headers.common.Authorization = token;
    this.cheakLongin();
  },
  components: {
    VoucherModal,
    DelProductModal,
    PaginationModal
  }
};
</script>

<style scoped></style>
