<!-- 机构查询详情弹窗 -->
<template >
  <van-dialog v-model="show" title :showConfirmButton="false">
    <div class="alertDetail">
      <div class="top">
        <span :class="[ 'iconfont', iconObj[type],'mr20' ]"></span>
        {{info.company}}
        <van-icon class="close p30" name="cross" size="20" @click="onclose" />
      </div>
      <div v-if="type=== 1" class="content">
        <div class="contentWrap">
          <ul class="info">
            <li>
              <span>联系人：</span>
              <p>{{info.person}}</p>
            </li>
            <li>
              <span>办公电话：</span>
              <p>{{info.phone}}</p>
            </li>
            <li>
              <span>机构地址：</span>
              <p>{{info.address}}</p>
            </li>
            <li>
              <span>邮政编码：</span>
              <p>{{info.post}}</p>
            </li>
          </ul>

          <ul class="lists" v-for="(item,index) in info.list" :key="'item'+index">
            <li>
              <div class="top">{{item.org}}</div>
              <ul class="ct">
                <li>主管海事机构：{{item.mainorg}}</li>
                <li>许可资质批准日期：{{item.time1}}</li>
                <li>许可资质有效日期：{{item.time2}}</li>
              </ul>
            </li>
          </ul>
        </div>
      </div>

      <div v-if="type=== 2" class="content">
        <div class="contentWrap">
          <ul class="info">
            <li>
              <span>主检医师：</span>
              <p>{{info.person}}</p>
            </li>
            <li>
              <span>办公电话：</span>
              <p>{{info.phone}}</p>
            </li>
            <li>
              <span>机构地址：</span>
              <p>{{info.address}}</p>
            </li>
            <li>
              <span>核验机构：</span>
              <p>{{info.post}}</p>
            </li>
            <li>
              <span>上报时间：</span>
              <p>{{info.post}}</p>
            </li>
            <li>
              <span>备 注：</span>
              <p>{{info.post}}</p>
            </li>
          </ul>
        </div>
      </div>

      <div v-if="type=== 3" class="content">
        <div class="contentWrap">
          <ul class="info">
            <li>
              <span>联系人：</span>
              <p>{{info.person}}</p>
            </li>
            <li>
              <span>办公电话：</span>
              <p>{{info.phone}}</p>
            </li>
            <li>
              <span>机构地址：</span>
              <p>{{info.address}}</p>
            </li>
            <li>
              <span>许可签发：</span>
              <p>{{info.post}}</p>
            </li>
            <li>
              <span>许可截止：</span>
              <p>{{info.post}}</p>
            </li>
          </ul>

          <ul class="lists" v-for="(item,index) in info.list" :key="'item'+index">
            <li>
              <div class="top">{{item.title}}</div>
              <ul class="ct">
                <li>培训规模：{{item.range}}</li>
                <li>主管机关：{{item.inst}}</li>
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
              <p>{{info.person}}</p>
            </li>
            <li>
              <span>性别：</span>
              <p>{{info.phone}}</p>
            </li>
            <li>
              <span>身份证号：</span>
              <p>{{info.address}}</p>
            </li>
            <li>
              <span>服务单位：</span>
              <p>{{info.post}}</p>
            </li>
            <li>
              <span>注册日期：</span>
              <p>{{info.post}}</p>
            </li>
            <li>
              <span>电子邮件：</span>
              <p>{{info.post}}</p>
            </li>
            <li>
              <span>邮政编码：</span>
              <p>{{info.post}}</p>
            </li>
            <li>
              <span>工作年数：</span>
              <p>{{info.post}}</p>
            </li>
            <li>
              <span>电话号码：</span>
              <p>{{info.post}}</p>
            </li>
            <li>
              <span>毕业院校：</span>
              <p>{{info.post}}</p>
            </li>
            <li>
              <span>毕业时间：</span>
              <p>{{info.post}}</p>
            </li>
            <li>
              <span>所学专业：</span>
              <p>{{info.post}}</p>
            </li>
          </ul>
        </div>
      </div>

      <div v-if="type=== 5" class="content">
        <div class="contentWrap">
          <ul class="info">
            <li>
              <span>制定机构：</span>
              <p>{{info.person}}</p>
            </li>
            <li>
              <span>考试地点：</span>
              <p>{{info.phone}}</p>
            </li>
            <li>
              <span>考试类型：</span>
              <p>{{info.address}}</p>
            </li>
            <li>
              <span>报名时间：</span>
              <p>{{info.post}}</p>
            </li>
            <li>
              <span>考试时间：</span>
              <p>{{info.post}}</p>
            </li>
            <li>
              <span>是否允许分支局报名：</span>
              <p>{{info.post}}</p>
            </li>
            <li>
              <span>院校列表：</span>
              <p>{{info.post}}</p>
            </li>
            <li>
              <span>缴费截止时间：</span>
              <p>{{info.post}}</p>
            </li>
            <li>
              <span>考试状态：</span>
              <p>{{info.post}}</p>
            </li>
            <li>
              <span>考试计划：</span>
              <p>{{info.post}}</p>
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
              <p>{{info.person}}</p>
            </li>
            <li>
              <span>考试科目：</span>
              <p>{{info.person}}</p>
            </li>
            <li>
              <span>科目类别：</span>
              <p>{{info.person}}</p>
            </li>
            <li>
              <span>考试成绩：</span>
              <p>{{info.person}}</p>
            </li>
          </ul>
        </div>
      </div>

      <!-- 船员证书 -->
      <div v-if="type=== 7" class="content">
        <div class="contentWrap">
          <ul class="info">
            <li>
              <span>姓名：</span>
              <p>{{info.person}}</p>
            </li>
            <li>
              <span>身份证号码：</span>
              <p>{{info.person}}</p>
            </li>
            <li>
              <span>签发机关：</span>
              <p>{{info.person}}</p>
            </li>
            <li>
              <span>签发日期：</span>
              <p>{{info.person}}</p>
            </li>
            <li>
              <span>有效日期：</span>
              <p>{{info.person}}</p>
            </li>
            <li>
              <span>证书状态：</span>
              <p>{{info.person}}</p>
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
    }
  },
  data () {
    //这里存放数据
    return {
      iconObj,
      info: {
        company: '深圳中海船员管理有限公司',
        person: '答晓旭',
        phone: '0755-26880978; 0755-26885435',
        address: '广东省深圳市南山区南海大道1052号海翔广场303室',
        post: '518067',
        list: [{
          org: '甲级服务机构',
          mainorg: '天津海事局',
          time1: '2018-03-02',
          time2: '2022-02-02'
        }, {
          org: '甲级服务机构2',
          mainorg: '天津海事局',
          time1: '2018-03-02',
          time2: '2022-02-02'
        }]
      },
      // info: {
      //   company: '深圳中海船员管理有限公司',
      //   person: '答晓旭',
      //   phone: '0755-26880978; 0755-26885435',
      //   address: '广东省深圳市南山区南海大道1052号海翔广场303室',
      //   post: '518067',
      //   list: [{
      //     title: '非自航船舶船员',
      //     range: '4x40',
      //     inst: '天津海事局',
      //   }, {
      //     title: '非自航船舶船员2',
      //     range: '4x40',
      //     inst: '天津海事局',
      //   }]
      // },
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
            // width: 437px;
          }
        }
      }
      .lists {
        width: 570px;
        margin: 0 auto;

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
          }
        }
      }
    }
  }
}
</style>