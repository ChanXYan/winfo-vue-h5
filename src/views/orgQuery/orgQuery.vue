
<template>
  <div class="container">
    <van-tabs class="tabs" v-model="active" color="#0176FF" title-active-color="#0176FF">
      <van-tab title="服务/外派机构"></van-tab>
      <van-tab title="体检机构"></van-tab>
      <van-tab title="培训机构"></van-tab>
    </van-tabs>

    <div v-if="active === 0" class="content">
      <div class="list">
        <div class="item">
          <span>机构名称</span>
          <div class="value field-tip" @blur="isFocus=false">
            <van-field
              class="tip-field"
              v-model="param[0].org"
              placeholder="请输入机构名称"
              @focus="isFocus=true"
              @click="handleTip"
            />
            <div class="tip-warp">
              <div class="tip-item" v-for="i in matchingOrg" :key="i" @click="tapTip(i)">{{i}}</div>
            </div>
          </div>
        </div>
        <div class="item">
          <span>许可资质</span>
          <div class="value" @click="showQualification= true">
            {{param[0].qualification ||'请选择'}}
            <span class="iconfont icondown ml10"></span>
          </div>
        </div>
        <div class="item">
          <span>所在省份</span>
          <div class="value" @click="showProvince= true">
            {{param[0].province ||'请选择'}}
            <span class="iconfont icondown ml10"></span>
          </div>
        </div>

        <div class="item">
          <span>请输入验证码</span>
          <div class="value verif">
            <van-field v-model="param[0].verif" />
            <img class="verif-img" src="../../assets/imgs/code.jpg" />
          </div>
        </div>
      </div>
      <van-button class="query-btn" type="primary" @click="queryData(active)">查询</van-button>
    </div>

    <div v-if="active === 1" class="content">
      <div class="list">
        <div class="item">
          <span>体检机构名称</span>
          <div class="value">
            <van-field maxlength="30" v-model="param[1].org" placeholder="请输入机构名称" />
          </div>
        </div>
        <div class="item">
          <span>有效标志</span>
          <div class="value checkbox">
            <van-checkbox v-model="param[1].validFlag">有效</van-checkbox>
          </div>
        </div>
        <div class="item">
          <span>单位所在省份</span>
          <div class="value" @click="showProvince= true">
            {{param[1].province ||'请选择'}}
            <span class="iconfont icondown ml10"></span>
          </div>
        </div>
        <div class="item">
          <span>辖区</span>
          <div class="value" @click="showJurisdiction= true">
            {{param[1].jurisdiction ||'请选择'}}
            <span class="iconfont icondown ml10"></span>
          </div>
        </div>

        <div class="item">
          <span>一检两证</span>
          <div class="value checkbox">
            <van-checkbox v-model="param[1].openTwo">开启</van-checkbox>
          </div>
        </div>

        <div class="item">
          <span>请输入验证码</span>
          <div class="value verif">
            <van-field v-model="param[1].verif" />
            <img class="verif-img" src="../../assets/imgs/code.jpg" />
          </div>
        </div>
      </div>
      <van-button class="query-btn" type="primary" @click="queryData(active)">查询</van-button>
    </div>

    <div v-if="active === 2" class="content">
      <div class="list">
        <div class="item">
          <span>培训机构名称</span>
          <div class="value">
            <van-field v-model="param[2].org" placeholder="请输入机构名称" />
          </div>
        </div>
        <div class="item">
          <span>培训项目名称</span>
          <div class="value" @click="showTraining= true">
            {{param[2].training ||'请选择'}}
            <span class="iconfont icondown ml10"></span>
          </div>
        </div>
        <div class="item">
          <span>所在省份</span>
          <div class="value" @click="showProvince= true">
            {{param[2].province ||'请选择'}}
            <span class="iconfont icondown ml10"></span>
          </div>
        </div>

        <div class="item">
          <span>请输入验证码</span>
          <div class="value verif">
            <van-field v-model="param[2].verif" />
            <img class="verif-img" src="../../assets/imgs/code.jpg" />
          </div>
        </div>
      </div>
      <van-button class="query-btn" type="primary" @click="queryData(active)">查询</van-button>
    </div>

    <!-- 资质picker -->
    <van-popup v-model="showQualification" position="bottom">
      <van-picker
        title
        show-toolbar
        :columns="qualificationList"
        @confirm="onConfirmshowQualification"
        @cancel="showQualification=false"
      />
    </van-popup>
    <!-- 省份 -->
    <van-popup v-model="showProvince" position="bottom">
      <van-picker
        title
        show-toolbar
        :columns="provinceList"
        @confirm="onConfirmProvince"
        @cancel="showProvince=false"
      />
    </van-popup>
    <!-- 辖区 -->
    <van-popup v-model="showJurisdiction" position="bottom">
      <van-picker
        title
        show-toolbar
        :columns="jurisdictionList"
        @confirm="onConfirmJurisdiction"
        @cancel="showJurisdiction=false"
      />
    </van-popup>
    <!-- 培训项目 -->
    <van-popup v-model="showTraining" position="bottom">
      <van-picker
        title
        show-toolbar
        :columns="trainingList"
        @confirm="onConfirmTraining"
        @cancel="showTraining=false"
      />
    </van-popup>
  </div>
</template>

<script>

export default {
  name: 'OrgQueryPage',
  components: {
  },
  data () {
    return {
      active: 0,
      show: false,
      loading: false,
      finished: false,
      param: [{
        org: '',
        qualification: ''
      }, {
        // 体检机构
        validFlag: true,
        openTwo: false,
        province: '',
        jurisdiction: ''
      }, {
        training: ''
      }],
      orgNames: ['111', '121', '231', '213123', '321213', 'dsa', 'sad'],
      keyword: '',
      isFocus: false,
      selected: [],
      orgNameObj: {},
      // picker数组
      showQualification: false,
      qualificationList: ['甲级服务机构', '乙级服务机构', '温州', '绍兴', '湖州', '嘉兴', '金华', '衢州', '杭州', '宁波', '温州', '绍兴', '湖州', '嘉兴', '金华', '衢州'],
      showProvince: false,
      provinceList: ['杭州', '宁波', '温州', '绍兴', '湖州', '嘉兴', '金华', '衢州'],
      showJurisdiction: false,
      jurisdictionList: ['杭州', '宁波', '温州', '绍兴', '湖州', '嘉兴', '金华', '衢州'],
      showTraining: false,
      trainingList: ['杭州', '宁波', '温州', '绍兴', '湖州', '嘉兴', '金华', '衢州'],
    };
  },
  computed: {
    matchingOrg () {
      if (!this.isFocus || !this.param[0].org.length || !this.orgNames.length) return []
      return this.orgNames.filter(e => e.includes(this.param[0].org))
    }
  },
  methods: {
    onConfirmshowQualification (value) {
      this.param[0].qualification = value
      this.showQualification = false
    },
    onConfirmProvince (value) {
      this.param[this.active].province = value
      this.showProvince = false
    },
    onConfirmJurisdiction (value) {
      this.param[1].jurisdiction = value
      this.showJurisdiction = false
    },
    onConfirmTraining (value) {
      this.param[2].training = value
      this.showTraining = false
    },
    queryData (type) {
      console.log(type);
    },
    tapTip (str) {
      console.log(str);
      this.param[0].org = str

    },
    fieldBlur (event) {
      console.log(event);
    },
    tipListener (e) {
      console.log(e.target.className)
      if (e.target.className !== 'tip-item'
      ) {
        this.isFocus = false
      }
    },
    handleTip (e) {
      e.stopPropagation()
    }



  },
  created () {


  },
  watch: {

  },
  mounted () {
    document.addEventListener('click', this.tipListener)
  },
  activated () {


  },
  beforeDestroy () {
    document.removeEventListener('click', this.tipListener)
  },
  destroyed () { },

}
</script>
<style lang='less' scoped>
.container {
  width: 100vw;
  height: 100vh;
  background: #fff;
  color: #333;
  font-size: 24px;
  .content {
    border-top: 20px solid #f5f7fa;
    .list {
      padding: 0 30px;
      .item {
        display: flex;
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
            position: relative;

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
</style>