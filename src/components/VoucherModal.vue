<template>
  <div id="VoucherModal" ref="VoucherModal" class="modal fade" tabindex="-1" aria-labelledby="VoucherModalLabel"
    aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 id="VoucherModalLabel" class="modal-title">
            <span v-if="isNew">新增優惠卷</span>
            <span v-else>編輯優惠卷</span>
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>

        <div class="modal-body">
              <div class="mb-3">
                <label for="title" class="form-label">優惠卷標題</label>
                <input v-model="emitVoucher.title" id="title" type="text" class="form-control" placeholder="請輸入優惠卷標題">
              </div>

                <div class="mb-3">
                  <label for="coupon_code" class="form-label">優惠碼</label>
                  <input v-model="emitVoucher.code" id="coupon_code" type="text" class="form-control"
                    placeholder="請輸入優惠碼">
                </div>

              <div class="mb-3">
                <label for="due_date">使用期限</label>
                <input v-model="due_date" id="due_date" type="date" class="form-control">
              </div>

              <div class="mb-3">
                <label for="title" class="form-label">折扣</label>
                <input v-model.number="emitVoucher.percent" id="title" type="text" class="form-control" placeholder="請輸入折扣百分比">
              </div>

              <div class="mb-3">
                <div class="form-check">
                  <input :true-value="1" :false-value="0"
                  v-model="emitVoucher.is_enabled" id="is_enabled" class="form-check-input" type="checkbox">
                  <label class="form-check-label" for="is_enabled">是否啟用</label>
                </div>
              </div>
          </div>
          <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
            取消
          </button>
          <button type="button" class="btn btn-primary" @click="$emit('edit-Voucher', emitVoucher)">
            確認
          </button>
        </div>
        </div>
      </div>
  </div>
</template>

<script>
// import axios from 'axios';
import 'bootstrap/scss/bootstrap.scss';
import { Modal } from 'bootstrap';
// const { VITE_URL, VITE_PATH } = import.meta.env;
export default {
  data () {
    return {
      voucher: null,
      emitVoucher: {},
      due_date: ''
    };
  },
  props: ['tempVoucher', 'isNew'],
  methods: {
    modelOpen () {
      this.voucher.show();
    },
    modalClose () {
      this.voucher.hide();
    }
  },
  mounted () {
    this.voucher = new Modal(this.$refs.VoucherModal);
    this.emitVoucher = this.tempVoucher;
  },
  watch: {
    tempProducts () {
      this.emitVoucher = this.tempVoucher;
      const dateAndTime = new Date(this.tempVoucher.due_date * 1000)
        .toISOString().split('T');
      [this.due_date] = dateAndTime;
    },
    due_date () {
      this.emitVoucher.due_date = Math.floor(new Date(this.due_date) / 1000);
    }
  }
};
</script>
