<template>
  <div class="home">
    <van-button type="primary">主要按钮</van-button>
    <button class="aa">FSC检查</button>
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {},
  mounted() {
    this.toast('aaa')
    this.loading()
    setTimeout(() => {
      this.hideToast()
    }, 2000)
  }
}
</script>

<style scope lang="scss">
.home {
  width: 750px;
  height: 100px;
  background: red;
  .aa {
    width: 335px;
    height: 88px;
    background: #000;
    box-sizing: border-box;
  }
}
</style>
