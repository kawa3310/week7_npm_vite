<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary bg-opacity-75">
    <div class="container-fluid">
      <a class="navbar-brand" href="#"></a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <RouterLink to="/" class="nav-link">前台購物</RouterLink>
          <RouterLink to="/login" class="nav-link">使用者登入</RouterLink>
          <RouterLink to="/product" class="nav-link">後台產品列</RouterLink>
          <RouterLink to="/order" class="nav-link">後台訂單</RouterLink>
          <RouterLink to="/voucher" class="nav-link">優惠卷</RouterLink>
          <button class="btn" @click.prevent="loginOut">登出</button>
        </div>
      </div>
    </div>
  </nav>
</template>
<script>
import 'bootstrap/scss/bootstrap.scss';
import axios from 'axios';
import Swal from 'sweetalert2';
const { VITE_URL } = import.meta.env;
export default {
  data () {
    return {
    };
  },
  methods: {
    loginOut () {
      console.log('沒有');
      axios.post(`${VITE_URL}/logout`)
        .then(() => {
          document.cookie = 'kawaToken=; expires=Thu, 18 Dec 2003 12:00:00 UTC; path=/natural/dist;';
          alert('登出成功');
          this.$router.push('/login');
        })
        .catch((err) => {
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
  }
};
</script>
