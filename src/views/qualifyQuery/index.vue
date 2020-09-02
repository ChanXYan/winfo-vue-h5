<!-- 资质查询 -->
<template>
  <div class="container">
    <van-tabs
      class="tabs"
      v-model="active"
      color="#0176FF"
      title-active-color="#0176FF"
      @change="changeTab"
    >
      <van-tab v-for="(item,index) in tabs" :key="'tab'+index" :title="item.label"></van-tab>
    </van-tabs>
    <!-- 船员证书 -->
    <div v-if="active === 0" class="content content1">
      <div class="list">
        <div class="item">
          <span>身份证号码</span>
          <div class="value">
            <van-field v-model="idCard" clearable placeholder="请输入身份证号码" />
          </div>
        </div>
        <div class="item">
          <span>证书号码</span>
          <div class="value">
            <van-field v-model="cerNo" clearable placeholder="请输入证书号码" />
          </div>
        </div>
        <div class="item">
          <span>证书类型</span>
          <div class="value" @click="showCertifyType= true">
            {{certifyType.toString() ||'请选择'}}
            <span class="iconfont icondown ml10"></span>
          </div>
        </div>

        <div class="item dxcode">
          <div class="value">
            <van-field v-model="dxcode" clearable placeholder="请输入验证码" />
          </div>
          <img :src="require('../../assets/imgs/404.png')" alt />
        </div>
      </div>
      <van-button class="query-btn" type="primary" @click="onComfirm">查询</van-button>
    </div>
    <!-- 船员成绩 -->
    <div v-if="active === 1" class="content content2">
      <div class="list">
        <div class="item">
          <span>身份证号码</span>
          <div class="value">
            <van-field v-model="idCard" clearable placeholder="请输入身份证号码" />
          </div>
        </div>
        <div class="item">
          <span>准考证号码</span>
          <div class="value">
            <van-field v-model="examNo" clearable placeholder="请输入准考证号码" />
          </div>
        </div>
        <div class="item">
          <span>考试类型</span>
          <div class="value">
            <van-radio-group icon-size="15" v-model="examType" direction="horizontal">
              <van-radio name="1">合格证考试</van-radio>
              <van-radio name="2">适任考试</van-radio>
            </van-radio-group>
          </div>
        </div>
        <div class="item">
          <span>考试类别</span>
          <div class="value">
            <van-radio-group icon-size="15" v-model="examSort" direction="horizontal">
              <van-radio name="1">理论</van-radio>
              <van-radio name="2">评估</van-radio>
            </van-radio-group>
          </div>
        </div>

        <div class="item dxcode">
          <div class="value">
            <van-field v-model="dxcode" clearable placeholder="请输入验证码" />
          </div>
          <img :src="require('../../assets/imgs/404.png')" alt />
        </div>
      </div>
      <van-button class="query-btn" type="primary" @click="onComfirm">查询</van-button>
    </div>

    <!-- 适任考试计划 -->
    <div v-if="active === 2" class="content content3">
      <div class="list">
        <div class="item">
          <span>考试类型</span>
          <div class="value">
            <van-field v-model="idCard" clearable placeholder="请输入考试类型" />
          </div>
        </div>
        <div class="item">
          <span>考试科目</span>
          <div class="value">
            <van-field v-model="cerNo" clearable placeholder="请输入考试科目" />
          </div>
        </div>
        <div class="item">
          <span>制定机构</span>
          <div class="value">
            <van-field v-model="cerNo" clearable placeholder="请输入制定机构" />
          </div>
        </div>
        <div class="item">
          <span>考试时间</span>
          <div class="value">
            <div class="time">
              {{ksStartTime || '开始时间'}}
              <span class="m50">-</span>
              {{ksEndTime || '结束时间'}}
            </div>
            <van-icon v-if="ksStartTime && ksEndTime" class="pl20 pr20" name="clear" />
          </div>
        </div>
        <div class="item">
          <span>报名时间</span>
          <div class="value">
            <div class="time">
              {{bmStartTime || '开始时间'}}
              <span class="m50">-</span>
              {{bmEndTime || '结束时间'}}
            </div>
            <van-icon v-if="bmEndTime && bmStartTime" class="pl20 pr20" name="clear" />
          </div>
        </div>
        <div class="item dxcode">
          <div class="value">
            <van-field v-model="dxcode" clearable placeholder="请输入验证码" />
          </div>
          <img :src="require('../../assets/imgs/404.png')" alt />
        </div>
      </div>

      <van-button class="query-btn" type="primary" @click="onComfirm">查询</van-button>
      <p>适任考试计划可能会有调整，实际报名时请以海事局公布信息为准！</p>
    </div>

    <!-- 船员考试科目 -->
    <div v-if="active === 3" class="content content4">
      <ul class="lists">
        <li v-for="(item,index) in examList" :key="'item'+index" class="list">
          <div class="title">{{item.title}}</div>
          <ul>
            <li v-for="(o,idx) in item.list" :key="'o'+idx" @click="toDetail(o)">
              <p>{{o.label}}</p>
              <span class="iconfont iconright"></span>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <!-- 验船师考区查询 -->
    <div v-if="active === 4" class="content content5">
      <ul class="list5">
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
    <!-- 免考考生公示 -->
    <div v-if="active === 5" class="content content6">
      <div class="list">
        <div class="item">
          <span>姓名</span>
          <div class="value">
            <van-field v-model="name" clearable placeholder="请输入姓名" />
          </div>
        </div>
        <div class="item">
          <span>身份证号</span>
          <div class="value">
            <van-field v-model="idCard" clearable placeholder="请输入身份证号码" />
          </div>
        </div>

        <div class="item">
          <span>报考等级</span>
          <div class="value">
            <van-field v-model="level" clearable placeholder="请输入身份证号码" />
          </div>
        </div>
      </div>
      <van-button class="query-btn" type="primary" @click="onComfirm">查询</van-button>
    </div>

    <alertDetail :show="showDetail5" :type="4" @close="showDetail5 = false"></alertDetail>

    <queryPicker
      :show="showCertifyType"
      :type="3"
      :list="certifyTypeList"
      :values="certifyType"
      propName="certifyType"
      @close="showCertifyType=false"
      @onComfirm="onComfirmPick"
    ></queryPicker>

    <van-calendar
      :min-date="new Date(2012, 0, 1)"
      v-model="showBmCalendar"
      type="range"
      :default-date="[bmStartTime,bmEndTime]"
      color="#07c160"
      @confirm="chooseBmDate"
    />
    <van-calendar
      :min-date="new Date(2012, 0, 1)"
      v-model="showBmCalendar"
      type="range"
      :default-date="[ksStartTime,ksEndTime]"
      color="#07c160"
      @confirm="chooseKsDate"
    />
  </div>
</template>

<script>
import alertDetail from '../../components/orgQuery/alertDetail'
import { idCardMatch } from '../../utils/matchStr'
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

const certifyTypeList = [
  {
    label: '合格证',
    value: 1
  }, {
    label: '适任证',
    value: 2
  }, {
    label: '健康证明',
    value: 3
  }, {
    label: '海员证',
    value: 4
  }, {
    label: '技术资格证',
    value: 5
  }, {
    label: '海船船员内河航线行驶资格证明',
    value: 6
  }, {
    label: '特定航线江海直达船舶船员行驶资格证明',
    value: 7
  }
]
import queryPicker from '../../components/queryPicker'
export default {
  components: {
    alertDetail, queryPicker
  },
  data () {
    //这里存放数据
    return {
      tabs,
      active: 0,
      examList,
      ycsList,
      certifyTypeList,
      showCertifyType: false,
      showDetail5: false,
      idCard: '',
      cerNo: '',//证书号码
      dxcode: '',
      certifyType: [],//证书类型
      examNo: '',//准考证号码
      examType: '',//考试类型
      examSort: '',//考试类别
      name: '',//考生姓名
      level: '',//报考等级
      ksStartTime: '',
      ksEndTime: '',
      bmStartTime: '',
      bmEndTime: ''
    };
  },
  computed: {

  },
  watch: {},
  methods: {
    toDetail (o) {
      this.$router.push({
        path: '/showPdf',
        query: {
          type: o.value
        }
      })
    },
    changeTab () {
      this.idCard = ''
    },

    chooseBmDate () { },
    chooseKsDate () { },
    onComfirm () {
      let { active, } = this

      switch (active) {
        case 0:
          this.crewApi()
          break
        case 1:
          this.crewExamApi()
          break
        case 2:
          break
        case 5:
          this.freeStudentApi()
          break
      }

    },
    crewApi () {
      let { idCard, cerNo, certifyType, dxcode } = this

      if (!idCard) {
        this.toast('请填写身份证')
        return
      }

      if (!idCardMatch.test(idCard)) {
        this.toast('身份证格式不正确')
        return
      }
      if (!cerNo) {
        this.toast('请填写证书号码')
        return
      }
      if (cerNo.length > 20) {
        this.toast('证书号码不能超过20位') //！！！
        return
      }
      if (!certifyType) {
        this.toast('请填写证书类型')
        return
      }
      if (!dxcode) {
        this.toast('请填写验证码')
        return
      }

      // 请求接口
    },
    crewExamApi () {
      let { idCard, examNo, examType, examSort, dxcode } = this

      if (!idCard) {
        this.toast('请填写身份证')
        return
      }
      if (!idCardMatch.test(idCard)) {
        this.toast('身份证格式不正确')
        return
      }
      if (!examNo) {
        this.toast('请填写准考证号')
        return
      }
      if (!examType) {
        this.toast('请选择考试类型')
        return
      }
      if (!examSort) {
        this.toast('请选择考试类别')
        return
      }
      if (!dxcode) {
        this.toast('请填写验证码')
        return
      }
    },
    onComfirmPick (o, prop) {
      this[prop] = [...o]
      console.log(prop, this)
    },
    freeStudentApi () {
      let { name, idCard, level } = this
      if (!name) {
        this.toast('请填写姓名')
        return
      }
      if (!idCard) {
        this.toast('请填写身份证')
        return
      }
      if (!idCardMatch.test(idCard)) {
        this.toast('身份证格式不正确')
        return
      }
      if (!level) {
        this.toast('请选择报考等级')
        return
      }
      //请求接口
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
  .m50 {
    margin: 0 50px;
  }

  .list {
    padding: 0 30px;
    background: #fff;
    .item {
      display: flex;
      align-items: center;
      line-height: 88px;
      color: #666;
      font-size: 24px;
      border-bottom: 1px solid #f5f7fa;
      > span {
        width: 180px;
      }
      .value {
        line-height: 88px;
        text-align: right;
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        .time {
          display: flex;
          justify-content: flex-end;
          align-items: center;
        }
      }
    }
  }

  .dxcode {
    > img {
      width: 189px;
      height: 68px;
    }
  }

  .content {
    border-top: 20px solid #f5f7fa;
  }

  .content3 {
    > p {
      margin-top: 30px;
      font-size: 24px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #969899;
      text-align: center;
    }
  }
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
    .list5 {
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

  .query-btn {
    width: 690px;
    height: 80px;
    background: #0176ff;
    border-radius: 6px;
    margin: 60px 30px 10px;
  }

  /deep/ .van-field__control {
    text-align: right;
  }

  /deep/ .dxcode .van-field__control {
    text-align: left !important;
  }

  /deep/ .van-cell {
    padding-left: 0;
    padding-right: 0;
  }
  /deep/ .van-radio-group--horizontal {
    display: flex;
    justify-content: flex-end;
  }
}
</style>