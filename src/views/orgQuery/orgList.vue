<!-- 机构查询列表 -->
<template>
  <div class="container">
    <!-- 服务/外派机构 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="loadData"
      class="list"
      v-if="type === 1"
    >
      <div v-for="(item,index) in list" :key="index" @click="clickItem(item)" class="item">
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
    </van-list>
    <!-- 体检机构 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="loadData"
      class="list"
      v-if="type === 2"
    >
      <div v-for="item in list" :key="item.dwdm" @click="clickItem(item)" class="item">
        <div class="top">{{ item.orgName }}</div>
        <div class="content">
          <div class="left">
            <div class="item mb20">
              <span>主检医师：</span>
              <div class="value">{{ item.doctor }}</div>
            </div>
            <div class="item">
              <span>核验机构：</span>
              <div class="value">{{ item.checkOrg }}</div>
            </div>
          </div>
          <div class="right">详情</div>
        </div>
      </div>
    </van-list>
    <!-- 培训机构 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="loadData"
      class="list"
      v-if="type === 3"
    >
      <div v-for="item in list" :key="item.dwdm" @click="clickItem(item)" class="item">
        <div class="top">{{ item.orgName }}</div>
        <div class="content">
          <div class="left">
            <div class="item mb20">
              <span>联系人：</span>
              <div class="value">{{ item.linkMan }}</div>
            </div>
            <div class="item">
              <span>办公电话：</span>
              <div class="value">{{ item.officePhone }}</div>
            </div>
          </div>
          <div class="right">详情</div>
        </div>
      </div>
    </van-list>
    <alertDetail :show="showDetail" :info="info" :type="type" @close="showDetail = false" />
  </div>
</template>

<script>
import api from '@/api'
import alertDetail from '../../components/orgQuery/alertDetail'

export default {
  components: {
    alertDetail,
  },
  data () {
    return {
      loading: false,
      showDetail: false,
      finished: false,
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
        } else if (this.type === 3) {
          this.$set(item, 'list', await api.trainProj({ dwdm: item.dwdm }))
        }
      }
    },
    async getServiceOrg () {
      const { datas } = await api.getServiceOrg({ page: this.page, ...this.reqParams })
      this.loading = false
      if (!datas?.list?.length) {
        this.finished = true
        return
      }
      this.list.push(...datas.list)
      this.page++
      if (this.page >= datas.totalPage) this.finished = true
    },
    async getExaminationData () {
      const { datas } = await api.getExaminationData({ page: this.page, ...this.reqParams })
      this.loading = false
      if (!datas?.list?.length) {
        this.finished = true
        return
      }
      this.list.push(...datas.list)
      this.page++
      if (this.page >= datas.totalPage) this.finished = true
    },
    async getTrain () {
      const { datas } = await api.getTrain({ page: this.page, ...this.reqParams })
      this.loading = false
      if (!datas?.list?.length) {
        this.finished = true
        return
      }
      this.list.push(...datas.list)
      this.page++
      if (this.page >= datas.totalPage) this.finished = true
    },
    async loadData () {
      switch (this.type) {
        case 1:
          await this.getServiceOrg()
          break
        case 2:
          await this.getExaminationData()
          break
        case 3:
          await this.getTrain()
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
  },
  async mounted () {
    this.reqParams = this.$route.query
    this.type = +this.reqParams.type
    delete this.reqParams.type

    const titleMap = { 1: '服务/外派机构', 2: '体检机构', 3: '培训机构' }
    document.title = titleMap[this.type]

    this.getOrgDict()
  },
}
</script>

<style lang="less" scoped>
.container {
  height: 100vh;
  background: #f5f8fa;
  .list {
    padding: 0 15px;
    padding-top: 30px;
    background: #f5f8fa;
    > .item {
      width: 720px;
      padding: 0 16px;
      background: #ffffff;
      box-shadow: 0px 2px 8px 0px rgba(5, 60, 113, 0.2);
      border-radius: 8px;
      margin-bottom: 30px;
      .top {
        padding: 25px 0;
        padding-left: 11px;
        line-height: 1.3;
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
