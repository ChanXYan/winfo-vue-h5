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
            <van-field v-model="formObj[0].idCard" clearable placeholder="请输入身份证号码" />
          </div>
        </div>
        <div class="item">
          <span>证书号码</span>
          <div class="value">
            <van-field v-model="formObj[0].cerNo" clearable placeholder="请输入证书号码" />
          </div>
        </div>
        <div class="item">
          <span>证书类型</span>
          <div class="value" @click="showCertifyType= true">
            {{formObj[0].certifyType.toString() ||'请选择'}}
            <span class="iconfont icondown ml10"></span>
          </div>
        </div>

        <div class="item dxcode">
          <div class="value">
            <van-field v-model="formObj[0].dxcode" clearable placeholder="请输入验证码" />
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
            <van-field v-model="formObj[1].idCard" clearable placeholder="请输入身份证号码" />
          </div>
        </div>
        <div class="item">
          <span>准考证号码</span>
          <div class="value">
            <van-field v-model="formObj[1].examNo" clearable placeholder="请输入准考证号码" />
          </div>
        </div>
        <div class="item">
          <span>考试类型</span>
          <div class="value">
            <van-radio-group icon-size="15" v-model="formObj[1].examType" direction="horizontal">
              <van-radio name="1">合格证考试</van-radio>
              <van-radio name="2">适任考试</van-radio>
            </van-radio-group>
          </div>
        </div>
        <div class="item">
          <span>考试类别</span>
          <div class="value">
            <van-radio-group icon-size="15" v-model="formObj[1].examSort" direction="horizontal">
              <van-radio name="1">理论</van-radio>
              <van-radio name="2">评估</van-radio>
            </van-radio-group>
          </div>
        </div>

        <div class="item dxcode">
          <div class="value">
            <van-field v-model="formObj[1].dxcode" clearable placeholder="请输入验证码" />
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
          <div class="value" @click="showExamType= true">
            {{formObj[2].type.toString() ||'请选择'}}
            <span class="iconfont icondown ml10"></span>
          </div>
        </div>
        <div class="item">
          <span>考试科目</span>
          <div class="value" @click="showSubject= true">
            {{formObj[2].subject.toString() ||'请选择'}}
            <span class="iconfont icondown ml10"></span>
          </div>
        </div>
        <div class="item">
          <span>制定机构</span>
          <div class="value">
            <van-field v-model="formObj[2].org" clearable placeholder="请输入制定机构" />
          </div>
        </div>
        <div class="item">
          <span>考试时间</span>
          <div class="value">
            <div class="time" @click="showKsCalendar = true">
              <p>{{ formObj[2].ksStartTime ? ksStart: '开始时间'}}</p>
              <span class="iconfont iconcaret-down"></span>
              <p>{{formObj[2].ksEndTime? ksEnd : '结束时间'}}</p>
              <span class="iconfont iconcaret-down"></span>
            </div>
            <div @click="formObj[2].ksStartTime='';formObj[2].ksEndTime=''">
              <van-icon
                v-if="formObj[2].ksStartTime && formObj[2].ksEndTime"
                class="pl20 pr20"
                name="clear"
              />
            </div>
          </div>
        </div>
        <div class="item">
          <span>报名时间</span>
          <div class="value">
            <div class="time" @click="showBmCalendar = true">
              <p>{{ formObj[2].bmStartTime?bmStart:'开始时间'}}</p>
              <span class="iconfont iconcaret-down"></span>
              <p>{{ formObj[2].bmEndTime? bmEnd: '结束时间'}}</p>
              <span class="iconfont iconcaret-down"></span>
            </div>
            <div @click="formObj[2].bmEndTime='';formObj[2].bmStartTime=''">
              <van-icon
                v-if="formObj[2].bmEndTime && formObj[2].bmStartTime"
                class="pl20 pr20"
                name="clear"
              />
            </div>
          </div>
        </div>
        <div class="item dxcode">
          <div class="value">
            <van-field v-model="formObj[2].dxcode" clearable placeholder="请输入验证码" />
          </div>
          <img :src="require('../../assets/imgs/404.png')" alt />
        </div>
      </div>

      <van-button class="query-btn" type="primary" @click="onComfirm">查询</van-button>
      <p>
        适任考试计划可能会有调整，
        <br />实际报名时请以海事局公布信息为准！
      </p>
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
            <van-field v-model="formObj[5].name" clearable placeholder="请输入姓名" />
          </div>
        </div>
        <div class="item">
          <span>身份证号</span>
          <div class="value">
            <van-field v-model="formObj[5].idCard" clearable placeholder="请输入身份证号码" />
          </div>
        </div>

        <div class="item">
          <span>报考等级</span>
          <div class="value" @click="showLevel= true">
            {{formObj[5].level ||'请选择'}}
            <span class="iconfont icondown ml10"></span>
          </div>
        </div>
      </div>
      <van-button class="query-btn" type="primary" @click="onComfirm">查询</van-button>
    </div>

    <alertDetail :show="showDetail5" :type="4" @close="showDetail5 = false"></alertDetail>
    <!-- 证书类型 多选 -->
    <queryPicker
      :show="showCertifyType"
      :type="3"
      :isSingle="false"
      :list="certifyTypeList"
      :values="formObj[0].certifyType"
      propName="certifyType"
      @close="showCertifyType=false"
      @onComfirm="onComfirmPick"
    ></queryPicker>

    <!-- 报名时间 -->
    <van-calendar
      :min-date="new Date(2012, 0, 1)"
      v-model="showBmCalendar"
      type="range"
      :default-date="[formObj[2].bmStartTime||new Date(),formObj[2].bmEndTime||new Date()]"
      color="#07c160"
      @confirm="chooseBmDate"
    />

    <!-- 考试时间 -->
    <van-calendar
      :min-date="new Date(2012, 0, 1)"
      v-model="showKsCalendar"
      type="range"
      :default-date="[formObj[2].ksStartTime||new Date(), formObj[2].ksEndTime||new Date()]"
      color="#07c160"
      @confirm="chooseKsDate"
    />

    <!-- 报考等级 -->
    <van-popup v-model="showLevel" position="bottom">
      <van-picker
        title
        show-toolbar
        :columns="levelList"
        @confirm="onComfirmLevel"
        @cancel="showLevel=false"
      />
    </van-popup>

    <!-- 考试类型 单选 -->
    <queryPicker
      :show="showExamType"
      :type="2"
      :list="examTypeList"
      :values="formObj[2].type"
      @close="showExamType=false"
      @onComfirm="onComfirmExamType"
    ></queryPicker>
    <!-- 考试科目 单选 -->
    <queryPicker
      :show="showSubject"
      :type="3"
      :list="subjectList"
      :values="formObj[2].subject"
      @close="showSubject=false"
      @onComfirm="onComfirmSubject"
    ></queryPicker>
  </div>
</template>

<script>
import alertDetail from '../../components/orgQuery/alertDetail'
import { idCardMatch } from '../../utils/matchStr'
import { format } from 'date-fns'
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

const subjectList = [
  {
    label: '航海英语',
    value: 1
  }, {
    label: '船舶操纵与避碰',
    value: 2
  }, {
    label: '航海学',
    value: 3
  }, {
    label: '船舶管理（驾驶）',
    value: 4
  }, {
    label: '船舶结构与货运',
    value: 5
  }, {
    label: '船舶辅机',
    value: 6
  }
]
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

const examTypeList = [
  {
    title: '海船考试类型',
    list: [{
      label: '船长和高级船员适任考试',
      value: '1'
    }, {
      label: '普通和高级船员适任考试',
      value: '2'
    }, {
      label: 'GMDSS适任考试',
      value: '3'
    }, {
      label: '非自航船适任考试',
      value: '4'
    }, {
      label: '海港引航员适任考试',
      value: '5'
    }]
  },
  {
    title: '内河考试类型',
    list: [{
      label: '内河全国统考（长江）',
      value: '6'
    }, {
      label: '内河全国统考（珠江）',
      value: '7'
    }, {
      label: '内河全国统考（黑龙江）',
      value: '8'
    }, {
      label: '内河非全国统考',
      value: '9'
    }, {
      label: '内河引航员考试',
      value: '10'
    }]
  }
]

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
      formObj: {
        0: {
          idCard: '',
          cerNo: '',
          certifyType: [],//证书类型
          dxcode: ''
        },
        1: {
          idCard: '',
          examNo: '',//准考证号码
          examType: '',//考试类型
          examSort: '',//考试类别
          dxcode: ''
        },
        2: {
          type: [],
          subject: [],
          org: '',
          ksStartTime: '',
          ksEndTime: '',
          bmStartTime: '',
          bmEndTime: '',
          dxcode: ''
        },
        5: {
          name: '',
          idCard: '',
          level: ''
        }

      },
      certifyTypeList,
      showExamType: false,
      examTypeList,
      showCertifyType: false,
      showDetail5: false,
      showBmCalendar: false,
      showKsCalendar: false,
      showSubject: false,
      subjectList,
      showLevel: false,
      levelList: ['A', 'B', 'C', 'D'],
    };
  },

  computed: {
    bmStart: function () {
      return this.formObj[2].bmStartTime ? format(this.formObj[2].bmStartTime, 'yyyy-MM-dd') : ''
    },
    bmEnd: function () {
      return this.formObj[2].bmEndTime ? format(this.formObj[2].bmEndTime, 'yyyy-MM-dd') : ''
    },
    ksStart: function () {
      return this.formObj[2].ksStartTime ? format(this.formObj[2].ksStartTime, 'yyyy-MM-dd') : ''
    },
    ksEnd: function () {
      return this.formObj[2].ksEndTime ? format(this.formObj[2].ksEndTime, 'yyyy-MM-dd') : ''
    }
  },
  watch: {
    $route (to, from) {
      if (to.name === 'qualifyQuery' && from.name !== 'showPdf') {
        // 不从详情进来的页面， 都是初始化参数
        this.active = 0
        this.formObj = {
          0: {
            idCard: '',
            cerNo: '',
            certifyType: [],//证书类型
            dxcode: ''
          },
          1: {
            idCard: '',
            examNo: '',//准考证号码
            examType: '',//考试类型
            examSort: '',//考试类别
            dxcode: ''
          },
          2: {
            type: [],
            subject: [],
            org: '',
            ksStartTime: '',
            ksEndTime: '',
            bmStartTime: '',
            bmEndTime: '',
            dxcode: ''
          },
          5: {
            name: '',
            idCard: '',
            level: ''
          }

        }
      }
    },
  },
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

    chooseBmDate (e) {
      const [start, end] = e
      this.showBmCalendar = false
      this.formObj[2].bmStartTime = start
      this.formObj[2].bmEndTime = end
    },
    chooseKsDate (e) {
      const [start, end] = e
      this.showKsCalendar = false
      this.formObj[2].ksStartTime = start
      this.formObj[2].ksEndTime = end
      this.formObj = { ...this.formObj }
    },
    onComfirmLevel (e) {
      this.formObj[5].level = e
      this.formObj = { ...this.formObj }
      this.showLevel = false

    },
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
          this.examPlanApi()
          break
        case 5:
          this.freeStudentApi()
          break
      }

    },
    crewApi () {
      let { idCard, cerNo, certifyType, dxcode } = this.formObj[0]

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
      if (certifyType.length === 0) {
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
      let { idCard, examNo, examType, examSort, dxcode } = this.formObj[1]

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
      if (examType.length === 0) {
        this.toast('请选择考试类型')
        return
      }
      if (examSort.length === 0) {
        this.toast('请选择考试类别')
        return
      }
      if (!dxcode) {
        this.toast('请填写验证码')
        return
      }
    },
    examPlanApi () {
      let { type, subject, org, ksStartTime, ksEndTime, bmStartTime, bmEndTime, dxcode } = this.formObj[2]
      if (type.length === 0) {
        this.toast('请选择考试类型')
        return
      }

      if (subject.length === 0) {
        this.toast('请填写考试科目')
        return
      }

      if (!org) {
        this.toast('请填写制定机构')
        return
      }

      if (!ksStartTime || !ksEndTime) {
        this.toast('请选择考试时间')
        return
      }

      if (!bmStartTime || !bmEndTime) {
        this.toast('请选择报名时间')
        return
      }
      if (!dxcode) {
        this.toast('请填写验证码')
        return
      }
    },
    onComfirmExamType (o) {
      this.formObj[2].type = [...o]
      this.formObj = { ...this.formObj }
      this.showExamType = false
    },
    onComfirmPick (o) {
      this.formObj[0].certifyType = [...o]
      this.formObj = { ...this.formObj }
      this.showCertifyType = false
    },
    onComfirmSubject (o) {
      this.formObj[2].subject = [...o]
      this.formObj = { ...this.formObj }
      this.showSubject = false
    },
    freeStudentApi () {
      let { name, idCard, level } = this.formObj[5]
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
    margin: 0 15px;
    color: #ccc;
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
          width: 100%;
          > p {
            flex: 1;
            text-align: center;
          }
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
    border-top: 15px solid #f5f7fa;
  }

  .content3 {
    > p {
      margin-top: 30px;
      line-height: 40px;
      padding: 0 20px;
      font-size: 24px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #969899;
      text-align: center;
    }
  }
  .content4 {
    .lists {
      background: #f5f7fa;
      .list {
        background: transparent;
        width: 100%;
        padding: 0;
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