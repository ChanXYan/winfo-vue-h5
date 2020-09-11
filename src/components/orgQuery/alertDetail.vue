<!-- 机构查询详情弹窗 -->
<template >
  <van-dialog v-model="show" title :showConfirmButton="false">
    <div class="alertDetail">
      <div class="top">
        <span :class="[ 'iconfont', iconObj[type],'mr20' ]"></span>
        {{info.orgName}}
        <van-icon class="close p30" name="cross" size="20" @click="onclose" />
      </div>
      <!-- 服务/外派机构 -->
      <div v-if="type=== 1" class="content">
        <div class="contentWrap">
          <ul class="info">
            <li>
              <span>联系人：</span>
              <p>{{info.linkMan}}</p>
            </li>
            <li>
              <span>办公电话：</span>
              <p>{{info.officePhone}}</p>
            </li>
            <li>
              <span>机构地址：</span>
              <p>{{info.orgAddr}}</p>
            </li>
            <li>
              <span>邮政编码：</span>
              <p>{{info.postalCode}}</p>
            </li>
          </ul>

          <ul class="lists" v-for="item in info.list" :key="item.cy_dwlx">
            <li>
              <div class="top">{{item.org}}</div>
              <ul class="ct">
                <li>主管海事机构：{{item.briefName}}</li>
                <li>许可资质批准日期：{{item.cy_qfrqStr}}</li>
                <li>许可资质有效日期：{{item.cy_jzrqStr}}</li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
      <!-- 体检机构 -->
      <div v-if="type=== 2" class="content">
        <div class="contentWrap">
          <ul class="info">
            <li>
              <span>主检医师：</span>
              <p>{{info.doctor}}</p>
            </li>
            <li>
              <span>办公电话：</span>
              <p>{{info.officePhone}}</p>
            </li>
            <li>
              <span>机构地址：</span>
              <p>{{info.orgAddr}}</p>
            </li>
            <li>
              <span>核验机构：</span>
              <p>{{info.checkOrg}}</p>
            </li>
            <li>
              <span>上报时间：</span>
              <p>{{info.reportTime}}</p>
            </li>
            <li>
              <span>备 注：</span>
              <p>{{info.remark}}</p>
            </li>
          </ul>
        </div>
      </div>
      <!-- 培训机构 -->
      <div v-if="type=== 3" class="content">
        <div class="contentWrap">
          <ul class="info">
            <li>
              <span>联系人：</span>
              <p>{{info.linkMan}}</p>
            </li>
            <li>
              <span>办公电话：</span>
              <p>{{info.officePhone }}</p>
            </li>
            <li>
              <span>机构地址：</span>
              <p>{{info.orgAddr}}</p>
            </li>
            <li>
              <span>许可签发：</span>
              <p>{{info.startDate}}</p>
            </li>
            <li>
              <span>许可截止：</span>
              <p>{{info.endDate}}</p>
            </li>
          </ul>

          <ul class="lists" v-for="(item,index) in info.list" :key="'item'+index">
            <li>
              <div class="top">{{item.item_code}}</div>
              <ul class="ct row">
                <li>培训规模：{{item.train_org_cod}}</li>
                <li>主管机关：{{item.maritime_agency}}</li>
              </ul>
            </li>
          </ul>
        </div>
      </div>

      <!-- 验船师免考考生公示 -->
      <div v-if="type=== 4" class="content">
        <div class="contentWrap">
          <ul class="info">
            <li>
              <span>姓名：</span>
              <p>{{info.name}}</p>
            </li>
            <li>
              <span>性别：</span>
              <p>{{info.phone}}</p>
            </li>
            <li>
              <span>身份证号：</span>
              <p>{{info.idCardNo}}</p>
            </li>
            <li>
              <span>服务单位：</span>
              <p>{{info.serviceUnit}}</p>
            </li>
            <li>
              <span>注册日期：</span>
              <p>{{info.registerDate}}</p>
            </li>
            <li>
              <span>电子邮件：</span>
              <p>{{info.mail}}</p>
            </li>
            <li>
              <span>邮政编码：</span>
              <p>{{info.postalCode}}</p>
            </li>
            <li>
              <span>工作年数：</span>
              <p>{{info.workYear}}</p>
            </li>
            <li>
              <span>电话号码：</span>
              <p>{{info.phone}}</p>
            </li>
            <li>
              <span>毕业院校：</span>
              <p>{{info.graduateSchool}}</p>
            </li>
            <li>
              <span>毕业时间：</span>
              <p>{{info.graduateTime}}</p>
            </li>
            <li>
              <span>所学专业：</span>
              <p>{{info.major}}</p>
            </li>
          </ul>
        </div>
      </div>

      <div v-if="type=== 5" class="content">
        <div class="contentWrap">
          <ul class="info">
            <li>
              <span>制定机构：</span>
              <p>{{info.org}}</p>
            </li>
            <li>
              <span>考试地点：</span>
              <p>{{info.examPlace}}</p>
            </li>
            <li>
              <span>考试类型：</span>
              <p>{{info.examType}}</p>
            </li>
            <li>
              <span>报名时间：</span>
              <p>{{info.signTime}}</p>
            </li>
            <li>
              <span>考试时间：</span>
              <p>{{info.examTime}}</p>
            </li>
            <li>
              <span>是否允许分支局报名：</span>
              <p>{{info.isAllow}}</p>
            </li>
            <li>
              <span>院校列表：</span>
              <p>{{info.schoolList}}</p>
            </li>
            <li>
              <span>缴费截止时间：</span>
              <p>{{info.deadline}}</p>
            </li>
            <li>
              <span>考试状态：</span>
              <p>{{info.examStatus}}</p>
            </li>
            <li>
              <span>考试计划：</span>
              <p>{{info.examPlan}}</p>
            </li>
          </ul>
        </div>
      </div>

      <!-- 船员成绩 -->
      <div v-if="type=== 6" class="content">
        <div class="contentWrap">
          <ul class="info">
            <li>
              <span>准考证号码：</span>
              <p>{{info.admissionNo}}</p>
            </li>
            <li>
              <span>考试科目：</span>
              <p>{{info.examSubject}}</p>
            </li>
            <li>
              <span>科目类别：</span>
              <p>{{info.subjectCategory}}</p>
            </li>
            <li>
              <span>考试成绩：</span>
              <p>{{info.examScore}}</p>
            </li>
          </ul>
        </div>
      </div>

      <!-- 船员证书 -->
      <div v-if="type=== 7" class="content">
        <div class="contentWrap">
          <ul class="info">
            <li v-for="(item,index) in list" :key="'item'+index">
              <span>{{item.props}}</span>
              <p :class="{'pass':item.value==='有效' }">{{item.value}}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </van-dialog>
</template>

<script>
const iconObj = {
  1: 'iconjigou',
  2: 'iconjigou',
  3: 'iconjigou',
  4: 'iconzizhizhengshu',
  5: 'iconzizhizhengshu',
  6: 'iconzizhizhengshu',
  7: 'iconzizhizhengshu',
}
export default {
  props: {
    show: {
      type: Boolean
    },
    type: {
      type: Number,
      default: 4
    },
    info: {
      type: Object,
      default: () => {
        return {}
      }
    },
    list: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    //这里存放数据
    return {
      iconObj,
    };
  },
  methods: {
    onclose () {

      this.$emit('close')
    }
  },
  created () {

  },
  mounted () {

  },
}
</script>
<style lang='less' scoped>
//@import url(); 引入公共css类
.alertDetail {
  height: 760px;
  background: #fff;
  > .top {
    height: 130px;
    background: url("../../assets/imgs/orgQuery/detail-bg.png");
    background-size: 100% 100%;
    line-height: 130px;
    font-size: 30px;
    color: #fff;
    padding-left: 30px;
    display: flex;
    > span {
      font-size: 40px;
    }
    .close {
      flex: 1;
      text-align: right;
    }
  }
  .content {
    height: 620px;
    overflow: hidden;
    .contentWrap {
      height: 100%;
      overflow: auto;

      .info {
        padding: 0 30px;
        margin-bottom: 20px;
        > li {
          line-height: 50px;
          font-size: 24px;
          display: flex;
          > span {
            color: #666666;
            // flex: 1;
            // min-width: 150px;
            display: inline-block;
          }
          > p {
            flex: 1;
            margin-left: 10px;
            // width: 437px;
          }
        }
      }
      .lists {
        margin: 0 30px;

        > li {
          margin-bottom: 15px;
          // height: 233px;
          background: #f0f3f5;
          border-radius: 4px;
          padding: 0 25px 10px;
          font-size: 24px;
          .top {
            line-height: 70px;
            border-bottom: 1px solid #e1e4e6;
          }

          .ct {
            margin-top: 20px;
            > li {
              line-height: 45px;
              font-size: 24px;
            }

            &.row {
              display: flex;
              justify-content: space-between;
            }
          }
        }
      }
    }
  }

  .pass {
    color: #1aae1a;
  }
}
</style>