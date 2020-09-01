<!-- 资质查询 -->
<template>
  <div class="container">
    <van-tabs class="tabs" v-model="active" color="#0176FF" title-active-color="#0176FF">
      <van-tab v-for="(item,index) in tabs" :key="'tab'+index" :title="item.label"></van-tab>
    </van-tabs>

    <!-- 船员考试科目 -->
    <div v-if="active === 3" class="content content4">
      <ul class="lists">
        <li v-for="(item,index) in examList" :key="'item'+index" class="list">
          <div class="title">{{item.title}}</div>
          <ul>
            <li v-for="(o,idx) in item.list" :key="'o'+idx" @click="toDetail(o)">
              <!-- <van-cell class="cell" :title="o.label" is-link to="index" /> -->
              <p>{{o.label}}</p>
              <span class="iconfont iconright"></span>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <!-- 验船师考区查询 -->
    <div v-if="active === 4" class="content content5">
      <ul class="list">
        <li v-for="(item,index) in ycsList" :key="'item'+index" class="item">
          <div class="title">{{item.title}}</div>
          <ul>
            <li>
              <span>联系人：</span>
              <p>{{item.person}}</p>
            </li>
            <li>
              <span>联系电话：</span>
              <p>{{item.phone}}</p>
            </li>
            <li>
              <span>联系邮箱：</span>
              <p>{{item.mail}}</p>
            </li>
            <li>
              <span>联系地址：</span>
              <p>{{item.address}}</p>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <div v-if="active === 5" class="content content6">
      <ul>
        <li>
          <span>姓名</span>
          <div></div>
        </li>
        <li>
          <span>身份证号</span>
          <div></div>
        </li>
        <li>
          <span>姓名</span>
          <div></div>
        </li>
        <li>
          <span>姓名</span>
          <div></div>
        </li>
      </ul>
    </div>

    <alertDetail show="showDetail5" :type="4"></alertDetail>
  </div>
</template>

<script>

const tabs = [{
  label: '船员证书',
  value: 1
}, {
  label: '船员成绩',
  value: 2
}, {
  label: '适任考试计划',
  value: 3
}, {
  label: '船员考试科目',
  value: 4
}, {
  label: '验船师考区查询',
  value: 5
}, {
  label: '免考考生公示',
  value: 6
}]

const examList = [{
  title: '海船船员考试科目',
  list: [{
    label: '驾驶',
    value: 1
  }, {
    label: '轮机',
    value: 2
  }, {
    label: '无线电',
    value: 3
  }, {
    label: '电子电气',
    value: 4
  }, {
    label: '适任证书再有效',
    value: 5
  }, {
    label: '科目及格分数线',
    value: 6
  }]
}, {
  title: '内河船员考试科目',
  list: [{
    label: '驾驶',
    value: 7
  }, {
    label: '轮机',
    value: 8
  }]
}, {
  title: '内河船员考试科目',
  list: [{
    label: '引航员考试科目',
    value: 9
  }]
}]

//验船师list
const ycsList = [{
  title: '天津海事局考区',
  person: '张平',
  phone: '022-58876835',
  mail: 'cbjyglc@tjmsa.gov.cn',
  address: '天津市河西区解放南路369号'
}, {
  title: '天津海事局考区',
  person: '张平',
  phone: '022-58876835',
  mail: 'cbjyglc@tjmsa.gov.cn',
  address: '天津市河西区解放南路369号'
}]

export default {
  components: {

  },
  data () {
    //这里存放数据
    return {
      tabs,
      active: 3,
      examList,
      ycsList,
    };
  },
  computed: {},
  watch: {},
  methods: {
    toDetail (o) {
      this.$router.push({
        path: '/qualifyQuery1',
        query: {
          type: o.value
        }
      })
    }
  },
  created () {

  },
  mounted () {

  },
  beforeCreate () { },
  beforeMount () { },
  beforeUpdate () { },
  updated () { },
  beforeDestroy () { },
  destroyed () { },
  activated () { },
}
</script>
<style lang='less' scoped>
.container {
  background: #f5f7fa;
  width: 100vw;
  height: 100vh;

  .content4 {
    .lists {
      .list {
        width: 100%;

        .title {
          padding: 0 30px;
          line-height: 70px;

          font-size: 24px;
        }
        > ul {
          > li {
            color: #333333;
            font-size: 30px;
            padding: 0 30px;
            height: 88px;
            line-height: 88px;
            background: #fff;
            display: flex;
            align-content: center;
            border-bottom: 1px solid #f5f7fa;
            > p {
              flex: 1;
            }
          }
          > li:active {
            background: rgba(0, 0, 0, 0.1);
          }
        }
      }
    }
  }

  .content5 {
    .list {
      margin: 0 auto;
      width: 718px;
      .item {
        padding: 0 20px 10px;
        background: #ffffff;
        box-shadow: 0px 2px 8px 0px rgba(5, 60, 113, 0.2);
        border-radius: 8px;
        margin-top: 20px;
        .title {
          line-height: 70px;
          font-size: 30px;
          font-weight: 500;
          color: #333333;
          border-bottom: 1px solid #eee;
        }
        > ul {
          margin-top: 10px;
          font-size: 24px;
          > li {
            height: 50px;
            line-height: 50px;
            display: flex;
            > span {
              color: #333;
            }
          }
        }
      }
    }
  }
}
</style>