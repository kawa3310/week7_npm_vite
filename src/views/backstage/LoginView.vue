<template>
  <div class="container">
                <div class="row justify-content-center">
                    <h1 class="h3 mb-3 mt-3 font-weight-normal">
                        請先登入
                    </h1>
                    <div class="col-8">
                        <form id="form" class="form-signin"
                        @submit.prevent="login">
                            <div class="form-floating mb-3">
                                <input v-model="user.username"
                                type="email" class="form-control" id="username" placeholder="name@example.com"
                                    required autofocus>
                                <label for="username">Email address</label>
                            </div>
                            <div class="form-floating">
                                <input v-model="user.password"
                                type="password" class="form-control" id="password" placeholder="Password"
                                    required>
                                <label for="password">Password</label>
                            </div>
                            <button class="btn btn-lg btn-primary w-100 mt-3" type="submit">
                                登入
                            </button>
                        </form>
                    </div>
                </div>
                <p class="mt-5 mb-3 text-muted">
                    &copy; 2021~∞ - 六角學院
                </p>
            </div>
</template>
<script>
import axios from 'axios';
import Swal from 'sweetalert2';
const { VITE_URL } = import.meta.env;
export default {
  data () {
    return {
      user: {
        username: '',
        password: ''
      }
    };
  },
  methods: {
    login () {
      axios.post(`${VITE_URL}/admin/signin`, this.user)
        .then((res) => {
          const { token, expired } = res.data;
          document.cookie = `kawaToken=${token}; expires = ${new Date(expired)}; path=/`;
          this.$router.push('/product');
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

<style scoped>
</style>
