<template>
  <NavbarModal></NavbarModal>
  <RouterView />
</template>

<script>
import NavbarModal from './components/NavbarModal.vue';
export default {
  data () {
    return {};
  },
  components: {
    NavbarModal
  }
};
</script>

<style lang="scss">
</style>
