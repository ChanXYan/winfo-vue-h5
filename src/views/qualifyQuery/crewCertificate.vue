<!-- 1船员证书 2船员成绩 详情 -->
<template>
  <div class="container">
    <div class="list" v-for="(item,index) in list" :key="'item'+index">
      <van-divider
        class="line"
        :style="{ color: '#B2B2B2', borderColor: '#DBDBDB', padding: '0 16px' }"
      >{{item.title}}</van-divider>
      <div v-for="(o,i) in item.list" :key="'o'+i" @click="clickItem(o,index)" class="item">
        <div class="top">{{o.certNo}}</div>
        <div class="content">
          <div class="left">
            <div class="item">
              <span>{{form[index][0]}}</span>
              <div class="value">{{o.p1}}</div>
            </div>
            <div class="item mb20">
              <span>{{form[index][1]}}</span>
              <div class="value">{{o.p2}}</div>
            </div>
          </div>
          <div class="right">详情</div>
        </div>
      </div>
    </div>

    <alertDetail
      :type="7"
      :list="activeItem"
      :info="info"
      :show="showDetail"
      @close="showDetail=false"
    ></alertDetail>
  </div>
</template>

<script>
import alertDetail from '../../components/orgQuery/alertDetail'

export default {
  components: {
    alertDetail,
  },
  data () {
    //这里存放数据
    return {
      showDetail: false,
      type: 1,
      list: [],
      info: {},
      activeItem: [],
      form: {
        0: {
          0: '姓名:',
          1: '证书状态:',
        },
        1: {
          0: '签发日期:',
          1: '证书状态:'
        },
        2: {
          0: '证书职务:',
          1: '证书状态:'
        },
        3: {
          0: '工作部门:',
          1: '证书状态:'
        },
        4: {
          0: '姓名:',
          1: '证书状态:'
        },
        5: {
          0: '姓名:',
          1: '证书状态:'
        },
        6: {
          0: '姓名:',
          1: '证书状态:'
        }
      }
    };
  },
  computed: {},
  watch: {},
  methods: {
    clickItem (item, index) {

      this.showDetail = true
      this.info = { orgName: item.certNo }
      switch (index) {
        case 0:
          // 合格证
          this.activeItem = [{
            props: '姓名:',
            value: item.name
          }, {
            props: '身份证号码:',
            value: item.idCardNo
          }, {
            props: '签发机关:',
            value: item.issueOrg
          }, {
            props: '签发日期:',
            value: item.issueDate
          }, {
            props: '有效日期:',
            value: item.validDate
          }, {
            props: '证书状态:',
            value: item.certStatus
          }]
          break;
        case 1:
          // 合格证项目
          this.activeItem = [{
            props: '签发机关:',
            value: item.issueOrg
          }, {
            props: '签发日期:',
            value: item.issueDate
          }, {
            props: '有效日期:',
            value: item.validDate
          }, {
            props: '证书状态:',
            value: item.certStatus
          }]
          break;
        case 2:
          // 适任证
          this.activeItem = [{
            props: '证书类别:',
            value: item.certType
          }, {
            props: '证书等级:',
            value: item.certLevel
          }, {
            props: '证书职务:',
            value: item.certDuty
          }, {
            props: '签发机关:',
            value: item.issueOrg
          }, {
            props: '签发日期:',
            value: item.issueDate
          }, {
            props: '有效日期:',
            value: item.validDate
          }, {
            props: '证书状态:',
            value: item.certStatus
          }]
          break;
        case 3:
          // 健康证明
          this.activeItem = [{
            props: '证书印刷号:',
            value: item.certPrintNo
          }, {
            props: '工作部门:',
            value: item.workDivision
          }, {
            props: '职责限制:',
            value: item.dutyLimit
          }, {
            props: '体验机构:',
            value: item.examineOrg
          }, {
            props: '主检医师:',
            value: item.mainDoctor
          }, {
            props: '签发日期:',
            value: item.issueDate
          }, {
            props: '有效日期:',
            value: item.validDate
          }, {
            props: '授权海关机关:',
            value: item.issueOrg
          }, {
            props: '证书状态:',
            value: item.certStatus
          }]
          break;
        case 4:
          // 海员证
          this.activeItem = [{
            props: '姓名:',
            value: item.name
          }, {
            props: '身份证号码:',
            value: item.idCardNo
          }, {
            props: '签发机关:',
            value: item.issueOrg
          }, {
            props: '签发日期:',
            value: item.issueDate
          }, {
            props: '有效日期:',
            value: item.validDate
          }, {
            props: '证书状态:',
            value: item.certStatus
          },]
          break;
        case 5:
          // 技术资格证
          this.activeItem = [{
            props: '姓名:',
            value: item.name
          }, {
            props: '身份证号码:',
            value: item.idCardNo
          }, {
            props: '专业名称:',
            value: item.majorName
          }, {
            props: '类别:',
            value: item.type
          }, {
            props: '资格级别:',
            value: item.qualityLevel
          }, {
            props: '签发机关:',
            value: item.issueOrg
          }, {
            props: '签发日期:',
            value: item.issueDate
          }, {
            props: '批准日期:',
            value: item.approveDate
          }, {
            props: '证书状态:',
            value: item.certStatus
          },]
          break;
        case 6:
          //海船船员
          this.activeItem = [{
            props: '姓名:',
            value: item.name
          }, {
            props: '身份证号码:',
            value: item.idCardNo
          }, {
            props: '签发机关:',
            value: item.issueOrg
          }, {
            props: '签发日期:',
            value: item.issueDate
          }, {
            props: '有效日期:',
            value: item.validDate
          }, {
            props: '证书状态:',
            value: item.certStatus
          }]
          break;
      }


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
  activated () {
    let list = this.ls.get('CrewCert')
    this.list = list.map((item, index) => {
      let { title, list } = item
      let res = list.length ? item.list.map((o) => {
        if (index === 0) {
          return { ...o, p1: o.name, p2: o.certStatus }
        }
        if (index === 1) {
          return { ...o, p1: o.issueDate, p2: o.certStatus }
        }
        if (index === 2) {
          return { ...o, p1: o.certDuty, p2: o.certStatus }
        }
        if (index === 3) {
          return { ...o, p1: o.workDivision, p2: o.certStatus }
        }
        if (index === 4) {
          return { ...o, p1: o.name, p2: o.certStatus }
        }
        if (index === 5) {
          return { ...o, p1: o.name, p2: o.certStatus }
        }
        if (index === 6) {
          return { ...o, p1: o.name, p2: o.certStatus }
        }
      }) : []
      return { title, list: res }
    })

  }
}
</script>
<style lang='less' scoped>
.container {
  background: #f5f8fa;
  overflow: hidden;
  padding-bottom: 20px;
  .line {
    font-size: 24px;
  }
  .list {
    padding: 0 15px;
    > .item {
      width: 720px;
      padding: 0 15px;
      background: #ffffff;
      box-shadow: 0px 2px 8px 0px rgba(5, 60, 113, 0.2);
      border-radius: 8px;
      margin-bottom: 30px;
      .top {
        line-height: 94px;
        font-size: 36px;
        font-weight: bold;
        color: #000000;
        border-bottom: 1px solid #e6e6e6;
      }
      .content {
        display: flex;
        height: 135px;
        align-items: center;
        justify-content: center;
        .left {
          flex: 1;
          .item {
            line-height: 45px;
            .value {
              margin-left: 10px;
            }
          }
        }
        .right {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          text-align: right;
          font-size: 24px;
          margin-right: 30px;
          height: 100%;
          color: #0176ff;
        }
        .item {
          display: flex;
          font-size: 24px;
          > span {
            color: #888888;
          }
        }
      }
    }
    > .item:last-of-type {
      margin: 0;
    }
  }

  .van-divider {
    margin: 0;
    height: 40px;
  }
}
</style>