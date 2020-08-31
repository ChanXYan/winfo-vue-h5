<template>
  <div class="container">
    <div class="top">
      <div class="title">{{info.name}}</div>
      <ul class="list">
        <li>
          <span>船舶识别号：</span>
          <p>{{info.ship_id || '-'}}</p>
        </li>
        <li>
          <span>MMSI：</span>
          <p>{{info.mmsi}}</p>
        </li>
        <li>
          <span>船舶种类：</span>
          <p>{{info.ship_type || '-'}}</p>
        </li>
      </ul>
    </div>

    <!-- 检查信息 -->
    <van-collapse class="wrap" v-model="activeNames1">
      <van-collapse-item title="检查信息" name="1">
        <ul class="content">
          <li>
            <span>检查日期：</span>
            <p>{{info.inspect_date ||'-'}}</p>
          </li>
          <li>
            <span>检查机构：</span>
            <p>{{info.orgName|| '-'}}</p>
          </li>
          <li>
            <span>安检类型：</span>
            <p>{{info.inspect_type|| '-'}}</p>
          </li>
          <li>
            <span>缺陷数：</span>
            <p>{{info.defect_num|| '-'}}</p>
          </li>
          <li>
            <span>未关闭缺陷数：</span>
            <p>{{info.unclosed_defect_num|| '-'}}</p>
          </li>

          <li v-if="tab === 1">
            <span>检查港口：</span>
            <p>{{info.port_name|| '-'}}</p>
          </li>
          <li>
            <span>滞留标志：</span>
            <p>{{info.detention_mark|| '-'}}</p>
          </li>
          <li>
            <span>纠正标志：</span>
            <p>{{info.correct_mark|| '-'}}</p>
          </li>
          <li>
            <span>初查复查标志：</span>
            <p>{{info.initial_inspect_mark ?'是':'否'}}</p>
          </li>
          <li v-if="tab === 1">
            <span>安全检查行动：</span>
            <p>{{info.inspect_action|| '-'}}</p>
          </li>
          <li>
            <span>其他说明：</span>
            <p>{{info.other_desc|| '-'}}</p>
          </li>
          <li>
            <span>检查员：</span>
            <p>{{info.inspector_name || '-'}}</p>
          </li>
          <li v-if="tab === 1">
            <span>实习检查员：</span>
            <p>{{info.pratice_inspector_name || '-'}}</p>
          </li>
          <li>
            <span>备注：</span>
            <p>{{info.remark || '-'}}</p>
          </li>
          <li>
            <span>是否专项安检：</span>
            <p>{{info.is_special_inspect ? '是':'否'}}</p>
          </li>
          <li>
            <span>专项安检类型：</span>
            <p>{{info.special_inspect_type }}</p>
          </li>
          <li>
            <span>通过专项安检：</span>
            <p>{{info.is_passed ?'是':'否'}}</p>
          </li>
          <li>
            <span>船长姓名：</span>
            <p>{{ '-'}}</p>
          </li>
          <li v-if="tab === 1">
            <span>船长联系方式：</span>
            <p>{{info.captain_phone || '-'}}</p>
          </li>
          <li v-if="tab === 1">
            <span>船长证书号码：</span>
            <p>{{info.captain_cert_no|| '-'}}</p>
          </li>
          <li v-if="tab === 1">
            <span>优先等级：</span>
            <p>{{info.priority_order|| '-'}}</p>
          </li>
          <li v-if="tab === 1">
            <span>船舶风险属性：</span>
            <p>{{info.risk_attribute|| '-'}}</p>
          </li>
          <li v-if="tab === 1">
            <span>航次编码：</span>
            <p>{{info.voyage_id || '-'}}</p>
          </li>
        </ul>
      </van-collapse-item>
    </van-collapse>
    <!-- 缺陷信息 -->
    <van-collapse v-if="tab === 1" class="wrap" v-model="activeNames2">
      <van-collapse-item title="缺陷信息" name="1">
        <ul class="defect-info">
          <li v-for="(item,index) in list" :key="'list'+index">
            <h1>{{item.defect_code}} {{item.defect_desc}}</h1>
            <div class="list">
              <span>依据：</span>
              <p>{{item.enforce_foundation|| '-'}}</p>
            </div>
            <div class="list">
              <span>处理决定：</span>
              <p>{{item.comment_desc|| '-'}}</p>
            </div>
          </li>
        </ul>
      </van-collapse-item>
    </van-collapse>

    <van-collapse v-if="tab === 2" class="wrap" v-model="activeNames2">
      <van-collapse-item title="检查内容" name="1">
        <ul class="defect-info">
          <li v-for="(item,index) in list" :key="'list'+index">
            <h1>{{item.seq_no}} {{item.content_desc}}</h1>
            <div class="list">
              <span>检查结果：</span>
              <p>{{item.enforce_foundation|| '-'}}</p>
            </div>
            <div class="list">
              <span>问题描述：</span>
              <p>{{item.description|| '-'}}</p>
            </div>
            <div class="list">
              <span>处理决定：</span>
              <p>{{item.comment_desc|| '-'}}</p>
            </div>
          </li>
        </ul>
      </van-collapse-item>
    </van-collapse>
  </div>
</template>

<script>
import api from '../../api'
export default {
  name: 'checkReportDetail',
  data () {
    return {
      activeNames1: [],
      activeNames2: [],
      info: {},
      list: [],
      tab: 1
    }
  },
  created () {
    // this.init()
  },
  activated () {
    // this.init()
    let { mmsi, endTime, type } = this.$route.query
    let params = {
      keyword: mmsi,
      endTime
    }
    if (+type === 1) {
      this.fscDetailApi(params)
    } else {
      this.siteDetailApi(params)
    }

  },
  mounted () {

  },
  methods: {
    // init () {
    //   let { activeTab, info, list } = this.ls.get('routeParams')

    //   this.tab = activeTab
    //   this.info = info
    //   this.list = list
    // },
    fscDetailApi (params) {

      api.shareFlagStateControl(params).then(res => {
        if (res.code === 10000) {
          let { flagStateControl, flagStateControlDetailList } = res.datas
          this.info = flagStateControl
          this.list = flagStateControlDetailList
        } else {
          this.toast(res.msg)
        }
      })
    },
    siteDetailApi (params) {
      api.shareSiteSupervision(params).then(res => {
        if (res.code === 10000) {
          let { siteSupervisionDetailList, siteSupervisionReport } = res.datas
          this.info = siteSupervisionReport
          this.list = siteSupervisionDetailList
        } else {
          this.toast(res.msg)
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.container {
  width: 100vw;
  min-height: 100vh;
  overflow: hidden;
  background: #efeff4;
  padding-bottom: 20px;
  .top {
    width: 718px;
    background: #fff;
    border-radius: 10px;
    margin: 20px auto 0;
    padding: 30px;
    padding-bottom: 20px;
    box-shadow: 0px 0px 10px 0px rgba(2, 136, 210, 0.2);
    .title {
      font-size: 40px;
      font-weight: 500;
      color: #404040;
      margin-bottom: 20px;
    }

    .list {
      > li {
        display: flex;
        line-height: 45px;
        font-size: 30px;
        > span {
          color: #808080;
          display: inline-block;
          width: 200px;
        }
      }
    }
  }

  /deep/ .wrap {
    width: 717px;
    margin: 20px auto 0;
    overflow: hidden;
    border-radius: 10px;
    box-shadow: 0px 0px 10px 0px rgba(2, 136, 210, 0.2);
    .van-cell {
      height: 58px;
      color: #0276ff;
      .van-cell__title {
        display: flex;
        align-items: center;
        font-size: 18px;
      }
      .van-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
      }
    }
  }

  .content {
    > li {
      line-height: 55px;
      font-size: 30px;
      display: flex;
      > span {
        display: block;
        color: #808080;
        width: 250px;
      }
      > p {
        color: #404040;
        flex: 1;
      }
    }
  }

  .defect-info {
    > li {
      border-bottom: 1px solid #eee;
      padding-bottom: 20px;
      > h1 {
        font-size: 36px;
        font-weight: 400;
        color: #404040;
        margin-top: 10px;
      }
      .list {
        display: flex;
        font-size: 30px;
        line-height: 50px;
      }
    }
  }
}
</style>
