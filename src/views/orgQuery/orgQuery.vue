<template>
  <div class="container">
    <van-tabs class="tabs" v-model="active" color="#0176FF" title-active-color="#0176FF">
      <van-tab title="服务/外派机构"></van-tab>
      <van-tab title="体检机构"></van-tab>
      <van-tab title="培训机构"></van-tab>
    </van-tabs>

    <div v-if="active === 0" class="content">
      <div class="list">
        <autocomplete
          title="机构名称"
          v-model="param[0].orgName"
          placeholder="请输入机构名称"
          :tipList="orgNames"
        />
        <div class="item">
          <span>许可资质</span>
          <div class="value" @click="showQualification = true">
            {{ qualificationName || '请选择' }}
            <span class="iconfont icondown ml10"></span>
          </div>
        </div>
        <div class="item">
          <span>所在省份</span>
          <div class="value" @click="showProvince = true">
            {{ provinceNames[0] || '请选择' }}
            <span class="iconfont icondown ml10"></span>
          </div>
        </div>

        <!-- <div class="item">
          <span>请输入验证码</span>
          <div class="value verif">
            <van-field v-model="param[0].code" />
            <img class="verif-img" @click="refreshCode" :src="dxcodeImg" alt />
          </div>
        </div>-->
      </div>
      <van-button class="query-btn" type="primary" @click="querySever">查询</van-button>
    </div>

    <div v-if="active === 1" class="content">
      <div class="list">
        <div class="item">
          <span>体检机构名称</span>
          <div class="value">
            <van-field maxlength="30" v-model="param[1].orgName" placeholder="请输入机构名称" />
          </div>
        </div>
        <div class="item">
          <span>有效标志</span>
          <div class="value checkbox">
            <van-checkbox v-model="param[1].valid">有效</van-checkbox>
          </div>
        </div>
        <div class="item">
          <span>单位所在省份</span>
          <div class="value" @click="showProvince = true">
            {{ provinceNames[1] || '请选择' }}
            <span class="iconfont icondown ml10"></span>
          </div>
        </div>
        <div class="item">
          <span>辖区</span>
          <div class="value" @click="showJurisdiction = true">
            {{ jurisdictionName || '请选择' }}
            <span class="iconfont icondown ml10"></span>
          </div>
        </div>

        <div class="item">
          <span>一检两证</span>
          <div class="value checkbox">
            <van-checkbox v-model="param[1].oneCheckTwo">开启</van-checkbox>
          </div>
        </div>

        <!-- <div class="item">
          <span>请输入验证码</span>
          <div class="value verif">
            <van-field v-model="param[1].code" />
            <img class="verif-img" v-lazy="dxcodeImg" @click="refreshCode" alt />
          </div>
        </div>-->
      </div>
      <van-button class="query-btn" type="primary" @click="queryExamination()">查询</van-button>
    </div>

    <div v-if="active === 2" class="content">
      <div class="list">
        <div class="item">
          <span>培训机构名称</span>
          <div class="value">
            <van-field v-model="param[2].orgName" placeholder="请输入机构名称" />
          </div>
        </div>
        <div class="item">
          <span>培训项目名称</span>
          <div class="value" @click="showTraining = true">
            {{ trainingName || '请选择' }}
            <span class="iconfont icondown ml10"></span>
          </div>
        </div>
        <div class="item">
          <span>所在省份</span>
          <div class="value" @click="showProvince = true">
            {{ provinceNames[2] || '请选择' }}
            <span class="iconfont icondown ml10"></span>
          </div>
        </div>

        <!-- <div class="item">
          <span>请输入验证码</span>
          <div class="value verif">
            <van-field v-model="param[2].code" />
            <img class="verif-img" v-lazy="dxcodeImg" @click="refreshCode" alt />
          </div>
        </div>-->
      </div>
      <van-button class="query-btn" type="primary" @click="queryTrain()">查询</van-button>
    </div>
    <!-- 资质多选 -->
    <queryPicker
      :show="showQualification"
      :type="3"
      :isSingle="false"
      :list="qualificationList"
      :values="param[0].dwlxarr"
      propName="dwlxarr"
      @close="showQualification = false"
      @onComfirm="onConfirmshowQualification"
    ></queryPicker>
    <!-- 省份 -->
    <queryPicker
      :show="showProvince"
      :type="1"
      :values="param[active].provinceCode"
      @onComfirm="onConfirmProvince"
      :list="provinceList"
      @close="showProvince = false"
    ></queryPicker>
    <!-- 辖区 -->
    <van-popup v-model="showJurisdiction" position="bottom">
      <van-picker
        title
        show-toolbar
        :columns="jurisdictionList"
        value-key="label"
        @confirm="onConfirmJurisdiction"
        @cancel="showJurisdiction = false"
      />
    </van-popup>
    <!-- 培训项目 -->
    <queryPicker
      :show="showTraining"
      :type="4"
      :list="trainingList"
      :values="param[2].trainProject"
      @close="showTraining = false"
      @onComfirm="onConfirmTraining"
    />
  </div>
</template>

<script>
import debounce from 'lodash/debounce'

import api from '@/api'
import queryPicker from '@/components/queryPicker'
import autocomplete from '@/components/autocomplete'

export default {
  name: 'OrgQueryPage',
  components: { queryPicker, autocomplete },
  data () {
    return {
      active: 0,
      show: false,
      loading: false,
      finished: false,
      dxcodeImg: '',
      param: [
        { orgName: '', dwlxarr: [], provinceCode: [''] },
        { valid: true, provinceCode: [''] },
        { trainProject: [''], provinceCode: [''] }
      ],
      orgNames: [],
      isFocus: false,
      selected: [],
      orgNameObj: {},
      // picker数组
      showQualification: false,
      qualificationName: '',
      qualificationList: [],
      showProvince: false,
      provinceNames: ['', '', ''],
      provinceList: [],
      showJurisdiction: false,
      jurisdictionList: [],
      jurisdictionName: '',
      showTraining: false,
      trainingName: '',
      trainingList: []
    }
  },
  computed: {
    matchingOrg () {
      if (!this.isFocus || !this.param[0].org.length || !this.orgNames.length) {
        return []
      }
      return this.orgNames.filter((e) => e.includes(this.param[0].org))
    }
  },
  watch: {
    'param.0.orgName' () {
      this.loadTip(this.param[0].orgName)
    }
  },
  methods: {
    loadTip: debounce(function (str) {
      const params = {
        q: escape(escape(str)),
        limit: 10,
        prompt_type: 'H5',
        timestamp: Date.now()
      }
      api.getDwTip(params).then((tips) => {
        if (!tips) return
        this.orgNames = tips.split('\n').map((e) => e.split('|')[1])
      })
    }, 250),
    onConfirmshowQualification (value) {
      if (!value.length) {
        this.qualificationName = ''
        this.param[0].dwlxarr = ['']
        return
      }
      this.qualificationName = `已选择${value.length}项`
      this.param[0].dwlxarr = value
      this.showQualification = false
    },
    onConfirmProvince (value) {
      if (!value.length) {
        this.provinceNames[this.active] = ''
        this.param[this.active].provinceCode = ['']
        return
      }
      this.provinceNames[this.active] =
        this.provinceList.find(e => e.value === value[0]).label
      this.param[this.active].provinceCode = value
      this.showProvince = false
    },
    onConfirmJurisdiction ({ label, value }) {
      this.jurisdictionName = label
      this.param[1].orgCode = value
      this.showJurisdiction = false
    },
    onConfirmTraining (value) {
      this.param[2].trainProject = value
      if (!value.length) {
        this.trainingName = ''
        return
      }
      for (const v of this.trainingList) {
        const target = v.list.find((item) => item.value == value)
        if (target) {
          this.trainingName = target.label
          break
        }
      }
      this.showTraining = false
    },
    transformArrayBufferToBase64 (buffer) {
      let binary = ''
      let bytes = new Uint8Array(buffer)
      for (var len = bytes.byteLength, i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i])
      }
      return window.btoa(binary)
    },
    getDxcodeImg () {
      api.getValidateImage().then((res) => {
        let temp = this.transformArrayBufferToBase64(res)
        this.dxcodeImg = `data:image/png;base64,${temp}`
      })
    },
    querySever () {
      const dwlxarr = this.param[0].dwlxarr.join()
      const provinceCode = this.param[0].provinceCode[0]

      api.getServiceOrg({ page: 0, ...this.param[0], dwlxarr, provinceCode }).then(({ code, msg }) => {
        console.log(code, msg);
        if (code === 10000) {
          this.$router.push({
            name: 'orgList',
            query: { type: 1, ...this.param[0], dwlxarr, provinceCode }
          })
        } else {
          this.toast(msg)
        }
      })
    },
    queryExamination () {
      const obj = JSON.parse(JSON.stringify(this.param[1]))
      obj.valid = obj.valid ? 1 : 0
      obj.oneCheckTwo = obj.oneCheckTwo ? 1 : undefined
      obj.provinceCode = obj.provinceCode[0]

      api.getExaminationData({ page: 0, ...obj }).then(({ code, msg }) => {
        if (code === 10000) {
          this.$router.push({
            name: 'orgList',
            query: { type: 2, ...obj }
          })
        } else {
          this.toast(msg)
        }
      })
    },
    queryTrain () {
      const params = { ...this.param[2] }
      params.trainProject = params.trainProject[0]
      params.provinceCode = params.provinceCode[0]

      api.getTrain({ page: 0, ...params }).then(({ code, msg }) => {
        if (code === 10000) {
          this.$router.push({
            name: 'orgList',
            query: { type: 3, ...params }
          })
        } else {
          this.toast(msg)
        }
      })
    },
    /** 获取字段词典 */
    getOrgDict (obj) {
      const dict = JSON.parse(sessionStorage.getItem('orgDict'))
      if (dict) {
        this.trainingList = dict.list1
        this.provinceList = dict.list2
        this.qualificationList = dict.list3
        this.jurisdictionList = dict.list4
      } else {
        api.getOrgDict(obj).then(({ datas }) => {
          sessionStorage.setItem('orgDict', JSON.stringify(datas))
          this.trainingList = datas.list1
          this.provinceList = datas.list2
          this.qualificationList = datas.list3
          this.jurisdictionList = datas.list4
        })
      }
    },
    // changeTab () {
    //   this.param[this.active].code = ''
    //   this.refreshCode()
    // },
    // async refreshCode () {
    //   await api.scoreInit()
    //   this.getDxcodeImg()
    // }
  },
  mounted () {
    // this.refreshCode()
    this.getOrgDict()
  },
}
</script>
<style lang="less" scoped>
.container {
  width: 100vw;
  height: 100vh;
  background: #f5f7fa;
  color: #333;
  font-size: 24px;
  .content {
    border-top: 20px solid #f5f7fa;
    .list {
      padding: 0 30px;
      background: #fff;
      .item {
        position: relative;
        display: flex;
        line-height: 88px;
        color: #666;
        font-size: 24px;
        border-bottom: 1px solid #f5f7fa;
        &:last-child {
          border-bottom: 0;
        }
        > span {
          width: 180px;
        }
        .value {
          line-height: 88px;
          text-align: right;
          flex: 1;

          &.checkbox {
            display: flex;
            align-items: center;
            justify-content: flex-end;
          }

          &.verif {
            display: flex;
            .verif-img {
              width: 189px;
              height: 68px;
              align-self: center;
            }
          }

          &.field-tip {
            > .tip-warp {
              z-index: 1;
              position: absolute;
              top: 94px;
              left: 0;
              width: 100%;
              max-height: 360px;
              background: #ffffff;
              box-shadow: 0px 4px 16px 0px rgba(0, 0, 0, 0.1);
              border-radius: 12px;
              overflow: hidden;
              overflow-y: scroll;

              > .tip-item {
                text-align: left;
                padding-left: 22px;
                margin: 0 20px;
                height: 88px;
                width: calc(100%-40px);
                border-bottom: 1px solid #f5f7fa;
              }
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
    margin: 60px 30px;
  }

  .van-field {
    height: 100%;
  }
  /deep/ .van-field__control {
    text-align: right;
  }

  .iconcheck {
    color: #0176ff;
  }
}

/deep/ .van-field__body {
  height: 100%;
}

/deep/ .van-cell::after {
  border: 0;
}
</style>
