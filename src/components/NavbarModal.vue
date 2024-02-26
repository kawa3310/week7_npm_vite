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
          <RouterLink to="/product" class="nav-link">後台產品列</RouterLink>
          <RouterLink to="/order" class="nav-link">後台訂單</RouterLink>
          <RouterLink to="/voucher" class="nav-link">優惠卷</RouterLink>
        </div>
      </div>
    </div>
  </nav>
</template>
<script>
import 'bootstrap/scss/bootstrap.scss';
export default {
};
</script>
