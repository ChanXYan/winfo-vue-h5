<template>
  <div class="no-data">
    <div>
      <img v-lazy="require('../assets/imgs/404.png')" alt />
    </div>
    <p>找不到该页面</p>
  </div>
</template>

<script>
export default {

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.no-data {
  width: 100%;
  text-align: center;
  margin-top: 100px;
  overflow: hidden;
  > div {
    width: 300px;
    margin: 0 auto;
    > img {
      width: 100%;
    }
  }
  > p {
    color: #999;
    font-size: 24px;
    width: 350px;
    margin: 50px auto;
    line-height: 40px;
  }
}
</style>
