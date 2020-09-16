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
          <div :class="['value',certifyTypeView ? 'wrap':'']" @click="showCertifyType= true">
            <!-- formObj[0].certifyType.toString()  -->
            {{certifyTypeView||'请选择'}}
            <span class="iconfont icondown ml10"></span>
          </div>
        </div>

        <div class="item dxcode">
          <div class="value">
            <van-field v-model="formObj[0].dxcode" clearable placeholder="请输入验证码" />
          </div>
          <img v-lazy="dxcodeImg" @click="getDxcodeImg" alt />
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
            <van-checkbox-group icon-size="15" v-model="formObj[1].examType" direction="horizontal">
              <van-checkbox name="P">合格证考试</van-checkbox>
              <van-checkbox name="S">适任考试</van-checkbox>
            </van-checkbox-group>
          </div>
        </div>
        <div class="item">
          <span>考试类别</span>
          <div class="value">
            <van-checkbox-group icon-size="15" v-model="formObj[1].examSort" direction="horizontal">
              <van-checkbox name="L">理论</van-checkbox>
              <van-checkbox name="S">评估</van-checkbox>
            </van-checkbox-group>
          </div>
        </div>

        <div class="item dxcode">
          <div class="value">
            <van-field v-model="formObj[1].dxcode" clearable placeholder="请输入验证码" />
          </div>
          <img v-lazy="dxcodeImg" @click="getDxcodeImg" alt />
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
            {{kslx ||'请选择'}}
            <span class="iconfont icondown ml10"></span>
          </div>
        </div>
        <div class="item">
          <span>考试科目</span>
          <div class="value" @click="kslx ? showSubject= true:toast('请先选择考试类型')">
            {{kskm ||'请选择'}}
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
        <!-- <div class="item dxcode">
          <div class="value">
            <van-field v-model="formObj[2].dxcode" clearable placeholder="请输入验证码" />
          </div>
          <img v-lazy="dxcodeImg" @click="getDxcodeImg" alt />
        </div>-->
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
          <div class="title">{{item.roomName}}</div>
          <ul>
            <li>
              <span>联系人：</span>
              <p>{{item.name}}</p>
            </li>
            <li>
              <span>联系电话：</span>
              <p>{{item.phone}}</p>
            </li>
            <li>
              <span>联系邮箱：</span>
              <p>{{item.email}}</p>
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
      :type="1"
      :list="subjectList"
      propName="subject"
      :values="formObj[2].subject"
      @close="showSubject=false"
      @onComfirm="onComfirmSubject"
    ></queryPicker>
  </div>
</template>

<script>
import api from '../../api'
import alertDetail from '../../components/orgQuery/alertDetail'
import { idCardMatch, certificateMatch } from '../../utils/matchStr'
import { format } from 'date-fns'
import queryPicker from '../../components/queryPicker'
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



let examTypeObj = {}
let certTypeObj = {}
let subjectObj = {}

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
      ycsList: [],
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
          examType: [],//考试类型
          examSort: [],//考试类别
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
      dxcodeImg: '',
      certifyTypeList: [],
      showExamType: false,
      examTypeList: [],
      showCertifyType: false,
      showDetail5: false,
      showBmCalendar: false,
      showKsCalendar: false,
      showSubject: false,
      subjectList: [],
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
    },
    kslx: function () {
      let temp = this.calcDate(this.formObj[2].type, examTypeObj)
      return temp.toString()
    },
    kskm: function () {
      let temp = this.calcDate(this.formObj[2].subject, subjectObj)
      return temp.toString()
    },
    certifyTypeView: function () {
      let temp = this.calcDate(this.formObj[0].certifyType, certTypeObj)
      return temp ? temp.join('、') : ''
    }
  },
  watch: {
    $route (to, from) {
      const hasCatchPage = ['crewCertificate', 'showPdf', 'crewScore', 'examPlan', 'exemption']
      if (to.name === 'qualifyQuery' && !hasCatchPage.includes(from.name)) {
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
    /**
     * 将 [value1,value2,...] 换成 [label1,label2,...]进行展示
     */
    calcDate (a, b) {
      let temp = a.map(item => b[item])

      return temp
    },
    toDetail (o) {
      this.$router.push({
        path: '/showPdf',
        query: {
          type: o.value
        }
      })
    },
    //获取验证码
    getDxcodeImg () {
      api.getValidateImage().then(res => {
        let temp = this.transformArrayBufferToBase64(res)
        this.dxcodeImg = `data:image/png;base64,${temp}`
      })
    },
    //转  ArrayBuffer 成 base64
    transformArrayBufferToBase64 (buffer) {
      let binary = '';
      let bytes = new Uint8Array(buffer);
      for (var len = bytes.byteLength, i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
      }
      return window.btoa(binary);
    },
    changeTab () {
      let filterList = [0, 1, 2]
      if (filterList.includes(this.active)) {
        this.formObj[this.active].dxcode = ''
      }
      this.updateCodeImg()
    },
    async updateCodeImg () {
      await this.init()
      this.getDxcodeImg()
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
    // 点击查询
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
    // 船员证书
    crewApi () {
      let { idCard, cerNo, certifyType, dxcode } = this.formObj[0]

      if (!(idCard || cerNo)) {
        this.toast('身份证、证书号码至少填写一项目!')
        return
      }

      if (idCard && !idCardMatch.test(idCard)) {
        this.toast('身份证格式不正确')
        return
      }

      if (cerNo && !certificateMatch.test(cerNo)) {
        this.toast('证书号码格式不正确')
        return
      }

      if (!dxcode) {
        this.toast('请填写验证码')
        return
      }
      if (dxcode.length !== 4) {
        this.toast('验证码错误')
        return
      }
      let parmas = {
        certificateNo: cerNo,//证书号码
        certificateType: certifyType.toString(),//证书类型 
        code: dxcode,
        idCardNo: idCard
      }
      api.getCrewCert(parmas).then(async res => {
        if (res.code === 10000) {
          this.ls.set('CrewCert', res.datas)

          this.$router.push({
            name: 'crewCertificate'
          })
        } else {
          this.toast(res.msg)
          await this.sleep()
          this.updateCodeImg()
        }
      })
    },
    alertInfo () {
      this.$dialog.alert({
        title: '',
        message: `未查询到符合条件的考试成绩信息，\r\n请确认查询条件是否正确`,
        confirmButtonColor: '#0176FF'
      })
    },
    // 船员成绩
    crewExamApi () {

      let { idCard, examNo, examType, examSort, dxcode } = this.formObj[1]
      let examSortList = ["L", "S"]
      let examTypeList = ["P", "S"]
      if (!(idCard || examNo)) {
        this.toast('身份证、准考证号至少填写一项目!')
        return
      }
      if (idCard && !idCardMatch.test(idCard)) {
        this.toast('身份证格式不正确')
        return
      }
      if (examNo && !certificateMatch.test(examNo)) {
        this.toast('准考证号格式不正确')
        return
      }


      if (!dxcode) {
        this.toast('请填写验证码')
        return
      }
      if (dxcode.length !== 4) {
        this.toast('验证码错误')
        return
      }

      let params = {
        admissionNo: examNo,
        code: dxcode,
        examType: examType.length ? examType.toString() : examTypeList.toString(),
        idCardNo: idCard,
        subjType: examSort.length ? examSort.toString() : examSortList.toString(),
      }


      this.getCrewExamApi(params)

    },
    //船员成绩
    getCrewExamApi (params) {

      api.getCrewExam(params).then(async res => {

        if (res.code === 10000) {
          let { hgzExam, srExam } = res.datas
          this.ls.set('srExam', srExam.map(item => ({ ...item, orgName: item.examNo })))
          this.ls.set('hgzExam', hgzExam.map(item => ({ ...item, orgName: item.examNo })))
          this.$router.push({
            name: 'crewScore',
          })
        } else {
          this.toast(res.msg)
          await this.sleep()
          this.updateCodeImg()
        }
      })
    },
    //适任考试
    examPlanApi () {
      let { type, subject, org, ksStart, ksEnd, bmStart, bmEnd, dxcode } = this.formObj[2]
      // if (type.length === 0) {
      //   this.toast('请选择考试类型')
      //   return
      // }

      // if (subject.length === 0) {
      //   this.toast('请填写考试科目')
      //   return
      // }

      // if (!org) {
      //   this.toast('请填写制定机构')
      //   return
      // }

      // if (org && org.length > 16) {
      //   this.toast('制定机构只能在16个字以内')
      //   return
      // }

      // if (!ksStartTime || !ksEndTime) {
      //   this.toast('请选择考试时间')
      //   return
      // }

      // if (!bmStartTime || !bmEndTime) {
      //   this.toast('请选择报名时间')
      //   return
      // }
      // if (!dxcode) {
      //   this.toast('请填写验证码')
      //   return
      // }
      // if (dxcode.length !== 4) {
      //   this.toast('验证码错误')
      //   return
      // }
      let params = {
        page: 1,
        size: 10,
        examEndTime: ksStart,//考试
        examStartTime: ksEnd,
        applyEndTime: bmStart,
        applyStartTime: bmEnd,//报名
        orgName: org,// 制定机构
        examType: type.toString(),//	考试类型(传对应的代码编号)
        examSubject: subject.toString(),//考试科目(传对应的代码编号)
        // code: dxcode,//验证码
      }


      api.getExamPlan(params).then(async res => {
        if (res.code === 10000) {
          this.ls.set('examPlan', params)
          this.$router.push({
            path: '/examPlan'
          })
        } else {
          this.toast(res.msg)
          await this.sleep()
          this.updateCodeImg()
        }
      })

    },
    //获取考试科目
    ueryExamSubjList () {
      api.ueryExamSubjList({
        'lycxQO.exam_type': this.formObj[2].type[0]
      }).then(res => {
        this.subjectList = res.map(item => ({
          label: item.value,
          value: item.key
        }))

        subjectObj = {}
        this.subjectList.map(item => {
          subjectObj[item.value] = item.label
        })

        let param = this.formObj[2].type[0]
        this.ls.set(`subjectList${param}`, this.subjectList)
        this.ls.set(`subjectObj${param}`, subjectObj)
      })
    },
    //考试场所
    getExamRoomPublicApi () {

      api.getExamRoomPublic().then(res => {
        if (res.code === 10000) {
          this.ycsList = res.datas
        } else {
          this.toast(res.msg)
        }
      })
    },
    getExamDict () {
      api.getExamDict().then(res => {
        if (res.code === 10000) {
          let { examTypeList, certTypeList } = res.datas
          this.examTypeList = examTypeList
          this.certifyTypeList = certTypeList

          examTypeObj = {}
          examTypeList.map(item => {
            item.list.length && item.list.map(o => {
              examTypeObj[o.value] = o.label
            })
          })

          certTypeObj = {}
          certTypeList.map(item => {
            certTypeObj[item.value] = item.label
          })


        }
      })
    },
    onComfirmExamType (o) {
      this.formObj[2].type = [...o]
      this.formObj = { ...this.formObj }
      this.showExamType = false
      this.formObj[2].subject = []

      if (o.length) {
        let subjectList = this.ls.get(`subjectList${o[0]}`)
        if (subjectList && subjectList.length) {
          this.subjectList = subjectList
          subjectObj = this.ls.get(`subjectObj${o[0]}`)
        } else {
          this.ueryExamSubjList()
        }

      }

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
      // if (!name) {
      //   this.toast('请填写姓名')
      //   return
      // }
      if (name && name.length > 5) {
        this.toast('姓名不能超过5个字')
        return
      }
      // if (!idCard) {
      //   this.toast('请填写身份证')
      //   return
      // }
      if (idCard && !idCardMatch.test(idCard)) {
        this.toast('身份证格式不正确')
        return
      }
      // if (!level) {
      //   this.toast('请选择报考等级')
      //   return
      // }
      //请求接口
      let params = {
        idCardNo: idCard,
        level,
        name
      }

      api.getExamPublic(params).then(res => {
        if (res.code === 10000) {
          this.ls.set('ExamPublic', res.datas)
          this.$router.push({
            path: '/exemption',
          })
        } else {
          this.toast(res.msg)
        }
      })
    },
    // 获取验证码cookie
    init () {
      return new Promise(resolve => {
        api.scoreInit().then(() => {
          resolve(true)
        })
      })
    }

  },

  created () {
  },
  mounted () {


  },
  beforeCreate () {

  },
  beforeMount () {

  },
  beforeUpdate () { },
  updated () { },
  beforeDestroy () {

  },
  destroyed () {

  },
  activated () {
    this.updateCodeImg()
    this.getExamDict()
    //获取验船师列表
    this.getExamRoomPublicApi()

  },
  deactivated () {

  }
}
</script>
<style lang='less' scoped>
.container {
  background: #f5f7fa;
  width: 100vw;
  min-height: 100vh;
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

      .wrap {
        line-height: 50px;
        text-align: left;
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
    padding-bottom: 20px;
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