<!-- 机构查询列表 -->
<template>
  <div class="container">
    <!-- 服务/外派机构 -->
    <div class="list" v-if="type === 1">
      <div v-for="item in list" :key="item.dwdm" @click="clickItem(item)" class="item">
        <div class="top">{{ item.orgName }}</div>
        <div class="content">
          <div class="left">
            <div class="item mb20">
              <span>联系人：</span>
              <div class="value">{{ item.linkMan }}</div>
            </div>
            <div class="item">
              <span>联系电话：</span>
              <div class="value">{{ item.officePhone }}</div>
            </div>
          </div>
          <div class="right">详情</div>
        </div>
      </div>
    </div>
    <!-- 体检机构 -->
    <div class="list" v-if="type === 2">
      <div v-for="item in list" :key="item.dwdm" @click="clickItem(item)" class="item">
        <div class="top">{{ item.orgName }}</div>
        <div class="content">
          <div class="left">
            <div class="item mb20">
              <span>联系人：</span>
              <div class="value">{{ item.linkMan }}</div>
            </div>
            <div class="item">
              <span>联系电话：</span>
              <div class="value">{{ item.officePhone }}</div>
            </div>
          </div>
          <div class="right">详情</div>
        </div>
      </div>
    </div>
    <!-- 培训机构 -->
    <div class="list" v-if="type === 3">
      <div v-for="item in list" :key="item.dwdm" @click="clickItem(item)" class="item">
        <div class="top">{{ item.orgName }}</div>
        <div class="content">
          <div class="left">
            <div class="item mb20">
              <span>联系人：</span>
              <div class="value">{{ item.linkMan }}</div>
            </div>
            <div class="item">
              <span>联系电话：</span>
              <div class="value">{{ item.officePhone }}</div>
            </div>
          </div>
          <div class="right">详情</div>
        </div>
      </div>
    </div>
    <alertDetail :show="showDetail" :info="info" :type="type" @close="showDetail = false" />
  </div>
</template>

<script>
import BScroll from '@better-scroll/core'
import Pullup from '@better-scroll/pull-up'

import api from '@/api'
import alertDetail from '../../components/orgQuery/alertDetail'

BScroll.use(Pullup)

export default {
  components: {
    alertDetail,
  },
  data () {
    return {
      bscroll: null,
      showDetail: false,
      type: 0,
      page: 0,
      reqParams: {},
      list: [],
      info: {},
      dict: {},
    }
  },
  computed: {},
  watch: {},
  methods: {
    async clickItem (item) {
      this.showDetail = true
      this.info = item
      if (!item.list) {
        if (this.type === 1) {
          this.$set(item, 'list', await api.queryServComp({ dwdm: item.dwdm }))
          if (!item.list.length) return
          item.list.map(e => {
            e.org = this.dict.list3.find(el => el.value === e.cy_dwlx).label
          })
        }
      }
    },
    async getServiceOrg () {
      const { datas } = await api.getServiceOrg({ page: this.page, ...this.reqParams })
      if (!datas.list.length) return
      this.list.push(...datas.list)
      this.page++
      if (this.page * 10 >= datas.totalPage) this.bscroll.closePullUp()
    },
    getExaminationData () {
      api.getExaminationData({ page: this.page, ...this.reqParams }).then((res) => {
        this.list.push(...res.datas.list)
      })
    },
    async loadData () {
      switch (this.type) {
        case 1:
          await this.getServiceOrg()
          break
        case 2:
          break
        case 3:
          break
      }
    },
    getOrgDict (obj) {
      this.dict = JSON.parse(sessionStorage.getItem('orgDict'))
      if (!this.dict) {
        api.getOrgDict(obj).then(({ datas }) => {
          sessionStorage.setItem('orgDict', JSON.stringify(datas))
          this.dict = datas
        })
      }
    },
    async pullingUpHandler () {
      this.isPullUpLoad = true

      await this.loadData()

      this.bscroll.finishPullUp()
      this.bscroll.refresh()
      this.isPullUpLoad = false
    },
  },
  async mounted () {
    this.reqParams = this.$route.query
    this.type = +this.reqParams.type
    delete this.reqParams.type

    const titleMap = { 1: '服务/外派机构', 2: '体检机构', 3: '培训机构' }
    document.title = titleMap[this.type]

    this.getOrgDict()
    this.loadData()
    this.$nextTick(() => {
      this.bscroll = new BScroll('.container', {
        click: true,
        pullUpLoad: true
      })

      this.bscroll.on('pullingUp', this.pullingUpHandler)
    })

  },
}
</script>

<style lang="less" scoped>
.container {
  background: #f5f8fa;
  height: 100vh;
  overflow: hidden;
  .list {
    padding: 0 15px;
    padding-bottom: 40px;
    > .item {
      width: 720px;
      height: 230px;
      padding: 0 16px;
      background: #ffffff;
      box-shadow: 0px 2px 8px 0px rgba(5, 60, 113, 0.2);
      border-radius: 8px;
      margin-top: 30px;
      .top {
        padding-left: 11px;
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
          > div {
            display: flex;
            flex: 1;
          }
        }
        .right {
          flex: 0 1 auto;
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
  }
}
</style>
