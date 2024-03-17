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
          <VForm ref="form" class="col-md-6" v-slot="{ errors }">
              <div class="mb-3">
                  <label for="title" class="form-label">標題</label>
                  <VField id="title" name="標題" type="text" class="form-control"
                      :class="{ 'is-invalid': errors['標題'] }" placeholder="請輸入標題" rules="required"
                      v-model="emitVoucher.title">
                  </VField>
                  <ErrorMessage name="標題" class="invalid-feedback"></ErrorMessage>
              </div>
              <div class="mb-3">
                <label for="coupon_code" class="form-label">優惠碼</label>
                <VField id="coupon_code" name="優惠碼" type="text" class="form-control"
                    :class="{ 'is-invalid': errors['優惠碼'] }" placeholder="請輸入優惠碼" rules="required"
                    v-model="emitVoucher.code">
                </VField>
                <ErrorMessage name="優惠碼" class="invalid-feedback"></ErrorMessage>
              </div>

              <div class="mb-3">
                <label for="due_date">到期日</label>
                <input type="date" class="form-control" id="due_date" v-model="due_date">
              </div>

              <div class="mb-3">
                <label for="price" class="form-label">折扣</label>
                <VField id="price" max="75" name="折扣百分比" type="number" class="form-control"
                    :class="{ 'is-invalid': errors['折扣百分比'] }" placeholder="請輸入折扣百分比" rules="required"
                    v-model="emitVoucher.percent">
                </VField>
                <ErrorMessage name="折扣百分比" class="invalid-feedback"></ErrorMessage>
              </div>

              <div class="mb-3">
                <div class="form-check">
                  <input :true-value="1" :false-value="0"
                  v-model="emitVoucher.is_enabled" id="is_enabled" class="form-check-input" type="checkbox">
                  <label class="form-check-label" for="is_enabled">是否啟用</label>
                </div>
              </div>
          </VForm>
        </div>
          <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
            取消
          </button>
          <button type="button" class="btn btn-primary" @click="$emit('edit-Voucher', emitVoucher)">
            {{ isNew ? '新增優惠卷' : '更新優惠卷' }}
          </button>
        </div>
        </div>
      </div>
  </div>
</template>

<script>

import 'bootstrap/scss/bootstrap.scss';
import { Modal } from 'bootstrap';

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
  },
  watch: {
    tempVoucher () {
      this.emitVoucher = this.tempVoucher;
      const dateTime = new Date(this.emitVoucher.due_date * 1000).toISOString().split('T');
      [this.due_date] = dateTime;
    },
    due_date () {
      this.emitVoucher.due_date = Math.floor(new Date(this.due_date) / 1000);
    }
  }
};
</script>
