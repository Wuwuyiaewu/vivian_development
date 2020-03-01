<template>
  <div
    class="mask"
    :class="{'visiable':cart}"
  />
</template>


<style lang="scss" scoped>
.mask {
  position: fixed;
  z-index: 100;
  top: 0px;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  margin-left: -100%;
}
.visiable {
  margin-left: 0;
}
</style>

<script>
export default {
  props: {
      cart: Boolean
  },
  data() {
    return {
      cartshow: this.cart
    };
  },
  methods: {}
};
</script>