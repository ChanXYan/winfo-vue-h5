<template>
  <div class="no-data">
    <div>
      <img v-lazy="require('../assets/imgs/no-data.png')" alt />
      <!-- <img src="../assets/imgs/no-data.png" alt /> -->
    </div>
    <p>{{msg}}</p>
  </div>
</template>

<script>
export default {
  props: {
    msg: String
  }
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
