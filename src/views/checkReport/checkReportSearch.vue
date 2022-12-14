<template>
  <div class="container">
    <div class="top">
      <div class="tabs">
        <div
          v-for="(item,index) in tabs"
          :class="{'tab':true,'active': item.key === activeTab}"
          :key="'tab'+index"
          @click="clickTab(item)"
        >{{item.tab}}</div>
      </div>
      <van-search class="my-search" v-model="keyword" shape="round" placeholder="请输入中英文船名或MMSI搜索" />
      <van-calendar
        :min-date="new Date(2012, 0, 1)"
        v-model="showCalendar"
        type="range"
        :default-date="[startTime||new Date(),endTime||new Date()]"
        color="#07c160"
        @confirm="chooseDate"
      />
      <div class="timeWrap">
        <div class="title">时间筛选</div>
        <div class="times">
          <div class="timeChoose" @click="showCalendar = true">
            <span class="iconfont iconcalendar"></span>
            <p class="time">{{start || '开始时间'}}</p>
            <p class="mr10 ml10">-</p>
            <p class="time">{{end || '结束时间'}}</p>
          </div>
          <div class="p20 close" @click="startTime='';endTime=''">
            <van-icon v-if="startTime && endTime" class="pl20 pr20" name="clear" />
          </div>
          <div class="search" @click="search">搜索</div>
        </div>
      </div>
    </div>

    <div v-if="type === 'history' && historyList && (historyList.length !== 0)" class="history">
      <div class="title">
        <div class="pt30 pl30">历史记录</div>
        <div class="clear-history pt30 pr30" @click="deleteHistoryApi">
          <span class="iconfont icondelete"></span>
        </div>
      </div>

      <div v-if="historyList && historyList.length" class="list pl30 pr30">
        <div
          v-for="(item,index) in historyList"
          :key="'item' + index"
          class="item"
          @click="clickHistory(item)"
        >{{item}}</div>
      </div>
    </div>

    <!-- fsc -->
    <div class="resultList" v-if="(type === 'result' && activeTab===1 && fscList.length !== 0)">
      <div v-for="(item) in fscList" :key="item.inspectNo" class="list" @click="toDetail(item)">
        <div class="top">
          <div class="title">{{item.shipNameEn || '-'}}</div>
          <div class="time">{{item.inspect_date || '-'}}</div>
        </div>
        <div class="content">
          <div class="contentWrap">
            <div class="item">
              <p class="label">检查机构：</p>
              <div class="value">{{item.orgName || '-'}}</div>
            </div>
            <div class="item">
              <p class="label">检查港口：</p>
              <div class="value">{{item.port_name || '--'}}</div>
            </div>
            <div class="item">
              <p class="label">未关闭缺陷：</p>
              <div class="value">{{item.unclosed_defect_num}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 现场监督 -->
    <div class="resultList" v-if="(type === 'result' && activeTab===2 && siteList.length !== 0)">
      <div v-for="(item) in siteList" :key="item.inspectNo" class="list" @click="toDetail(item)">
        <div class="top">
          <div class="title">{{item.ship_name_cn}}</div>
          <div class="time">{{item.inspect_date}}</div>
        </div>
        <div class="content">
          <div class="contentWrap">
            <div class="item">
              <p class="label">检查机构：</p>
              <div class="value">{{item.orgName || '--'}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <empty
      v-if="type==='history'? historyList.length === 0 : activeTab === 1 ? fscList.length === 0 : siteList.length === 0"
      msg="暂无搜索结果，请确认船名或MMSI无误"
    />
  </div>
</template>

<script>
import { format } from 'date-fns'
import axios from 'axios'
import api from '../../api/index'
import empty from '@/components/empty.vue'
export default {
  name: 'checkReportSearch',
  components: {
    empty
  },
  data () {
    return {
      keyword: '',
      activeTab: 1,
      showCalendar: false,
      startTime: null,
      endTime: null,
      apiObj: {},
      tabs: [{
        tab: 'FSC检查',
        key: 1
      }, {
        tab: '现场监督检查',
        key: 2
      }
      ],
      historyList: [],
      siteList: [],
      fscList: [],
      type: 'history',//history result
    }
  },
  computed: {
    start: function () {
      return this.startTime ? format(this.startTime, 'yyyy-MM-dd') : ''
    },
    end: function () {
      return this.endTime ? format(this.endTime, 'yyyy-MM-dd') : ''
    },
  },
  mounted () {
    this.searchHistory()
  },
  activated () {
    let { token } = this.$route.query
    if (token) {
      this.ls.set('token', token)
    }
  },
  methods: {
    clickTab (item) {
      this.activeTab = item.key
      this.search(false)
    },
    search (flag = true) {
      if (flag) {
        this.type = 'result'
      }
      let { start, end, keyword, activeTab } = this
      let params = {
        startTime: start ? start + ' 00:00:00' : '',
        endTime: end ? end + ' 23:59:59' : '',
        keyword
      }
      activeTab === 1 ? this.fscApi(params) : this.siteApi(params)
    },
    chooseDate (e) {
      let [startTime, endTime] = e
      this.startTime = startTime
      this.endTime = endTime
      this.showCalendar = false
    },
    clickHistory (item) {
      this.keyword = item
      this.search()
    },
    fscApi (params) {
      let { siteApi } = this.apiObj
      siteApi && siteApi.cancel()

      let self = this
      api.flagStateControlQuery(params, {
        cancelToken: new axios.CancelToken(function executor (c) {
          self.apiObj.fscApi = {}
          self.apiObj.fscApi.cancel = c
        })
      }).then(res => {
        if (res.code === 10000) {
          this.fscList = res.datas.map(item => {
            let { flagStateControl, flagStateControlDetail, flagStateControlDetailList } = item
            return { ...flagStateControl, flagStateControlDetail, flagStateControlDetailList }
          })
        } else {
          this.toast(res.msg)
        }
      })
    },
    siteApi (params) {
      let self = this

      let { fscApi } = this.apiObj
      fscApi && fscApi.cancel()

      api.siteSupervisionQuery(params, {
        cancelToken: new axios.CancelToken(function executor (c) {
          self.apiObj.siteApi = {}
          self.apiObj.siteApi.cancel = c
        })
      }).then(res => {
        if (res.code === 10000) {
          this.siteList = res.datas.map(item => {
            let { siteSupervisionDetail, siteSupervisionDetailList, siteSupervisionReport } = item
            return { ...siteSupervisionReport, siteSupervisionDetail, siteSupervisionDetailList }
          })
        } else {
          this.toast(res.msg)
        }
      })
    },
    searchHistory () {
      api.searchHistory().then(res => {
        if (res.code === 10000) {
          this.historyList = res.datas
        } else {
          this.toast(res.msg)
        }
      })
    },
    toDetail (item) {
      let { activeTab } = this
      let params = activeTab === 1 ? {
        activeTab,
        info: {
          name: item.shipNameEn,
          mmsi: item.mmsi,
          ...item
        },
        list: item.flagStateControlDetailList,

      } : {
          activeTab,
          info: {
            name: item.ship_name_cn,
            mmsi: item.mmsi,
            ...item
          },
          list: item.siteSupervisionDetailList
        }

      // 存储路径参数
      this.ls.set('routeParams', params)

      this.$router.push({
        name: 'checkReportDetail',
        query: {
          type: activeTab,
          mmsi: item.mmsi,
          endTime: item.inspect_date
        }
      })
    },
    deleteHistoryApi () {
      api.deleteHistory().then(res => {
        if (res.code === 10000) {
          this.toast('已清空')
          this.historyList = []
        } else {
          this.toast(res.msg)
        }
      })
    }
  },
  beforeDestroy () {
    let { fscApi, siteApi } = this.apiObj

    fscApi.cancel()
    siteApi.cancel()
  },
};
</script>

<style scoped lang="less">
.container {
  width: 100vw;
  min-height: 100vh;
  background: #f5f8fa;
  /deep/ .my-search {
    width: 95vw;
    height: 68px;
    margin: 20px auto 30px;
    border-radius: 68px;
    padding: 0 10px;
    font-size: 30px;
    background: #f0f4f5;
  }
  .top {
    background: #fff;
  }
  .tabs {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 30px;
    padding-bottom: 10px;

    .tab {
      width: 335px;
      height: 88px;
      line-height: 88px;
      font-size: 30px;
      text-align: center;
      background: #e6ecf0;
      color: #626466;
      border-radius: 8px;
      &.active {
        background: linear-gradient(
          90deg,
          rgba(2, 174, 255, 1),
          rgba(1, 118, 255, 1)
        );
        color: #fff;
        box-shadow: 0px 2px 8px 0px rgba(0, 74, 128, 0.2);
      }
    }
  }

  .timeWrap {
    padding: 0 30px;

    .title {
      font-size: 20px;
      color: #888;
      margin-bottom: 20px;
    }
    .times {
      display: flex;
      align-items: center;
      .timeChoose {
        display: flex;
        align-items: center;
        font-size: 30px;
        color: #b2b2b2;
        height: 74px;
        line-height: 74px;
        > span {
          color: #0176ff;
          font-size: 35px;
          margin-right: 10px;
        }
        .time {
          width: 220px;
          text-align: center;
        }
      }
      .search {
        color: #0176ff;
        font-size: 30px;
        flex: 1;
        text-align: right;
        padding-right: 10px;
      }
    }
  }

  .history {
    .title {
      font-size: 26px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #b2b2b2;
      display: flex;
      font-weight: bold;

      margin-bottom: 20px;
    }
    .clear-history {
      flex: 1;
      text-align: right;
      > span {
        font-size: 30px;
      }
    }

    .list {
      position: relative;
      display: flex;
      flex-wrap: wrap;
      font-size: 24px;

      .item {
        padding: 15px;
        border: 1px solid #ccc;
        border-radius: 4px;
        margin-right: 30px;
        margin-bottom: 30px;
      }
    }
  }

  .resultList {
    width: 718px;
    margin: 0 auto;
    padding-bottom: 20px;

    .list {
      position: relative;
      width: 100%;
      // height: 180px;
      border-radius: 8px;
      background: #fff;
      padding: 0 15px;
      box-sizing: border-box;
      box-shadow: 0px 2px 8px 0px rgba(5, 60, 113, 0.2);
      margin-top: 20px;

      .top {
        height: 94px;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 10px;
        border-bottom: 1px solid #eee;

        .title {
          font-size: 36px;
          font-family: PingFang SC;
          font-weight: bold;
          flex: 1;
        }

        .time {
          font-size: 24px;
          font-family: PingFang SC;
          font-weight: bold;
        }
      }

      .content {
        display: flex;
        flex-wrap: wrap;
        padding: 0 20px;
        // height: 85px;
        justify-content: center;
        align-items: center;
      }

      .contentWrap {
        display: flex;
        flex-wrap: wrap;
        // margin-bottom: 20px;
        flex: 1;
      }

      .item {
        display: flex;
        // flex: 1;
        width: 50%;
        font-size: 24px;
        height: 60px;
        line-height: 60px;
        font-family: PingFang SC;
        font-weight: 400;

        .label {
          color: #888;
        }
      }
    }
  }

  .van-field__value {
    display: flex;
    align-items: center;
  }
}
</style>
