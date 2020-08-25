<template>
  <div class="container">
    <div class="top">
      <div class="title">海巡09206</div>
      <ul class="list">
        <li>
          <span>船舶识别号：</span>
          <p>2</p>
        </li>
        <li>
          <span>MMSI：</span>
          <p>2132</p>
        </li>
        <li>
          <span>船舶种类：</span>
          <p>12312</p>
        </li>
      </ul>
    </div>

    <!-- 检查信息 -->
    <van-collapse class="wrap" v-model="activeNames1">
      <van-collapse-item title="检查信息" name="1">
        <ul v-if="Object.keys(siteSupervisionDetail).length" class="content">
          <li>
            <span>检查日期：</span>
            <p>{{item.addDateTime || '-'}}</p>
          </li>
          <li>
            <span>检查机构：</span>
            <p>{{item.comment_code}}</p>
          </li>
          <li>
            <span>缺陷数量：</span>
            <p></p>
          </li>
          <li>
            <span>安检类型：</span>
            <p></p>
          </li>
          <li>
            <span>缺陷数：</span>
            <p></p>
          </li>
          <li>
            <span>未关闭缺陷数：</span>
            <p></p>
          </li>

          <li>
            <span>检查港口：</span>
            <p></p>
          </li>
          <li>
            <span>滞留标志：</span>
            <p></p>
          </li>
          <li>
            <span>纠正标志：</span>
            <p></p>
          </li>
          <li>
            <span>初查复查标志：</span>
            <p></p>
          </li>
          <li>
            <span>安全检查行动：</span>
            <p></p>
          </li>
          <li>
            <span>其他说明：</span>
            <p></p>
          </li>
          <li>
            <span>检查员：</span>
            <p></p>
          </li>
          <li>
            <span>实习检查员：</span>
            <p></p>
          </li>
          <li>
            <span>备注：</span>
            <p></p>
          </li>
          <li>
            <span>是否专项安检：</span>
            <p></p>
          </li>
          <li>
            <span>专项安检类型：</span>
            <p></p>
          </li>
          <li>
            <span>通过专项安检：</span>
            <p></p>
          </li>
          <li>
            <span>船长姓名：</span>
            <p></p>
          </li>
          <li>
            <span>船长联系方式：</span>
            <p></p>
          </li>
          <li>
            <span>船长证书号码：</span>
            <p></p>
          </li>
          <li>
            <span>优先等级：</span>
            <p></p>
          </li>
          <li>
            <span>船舶风险属性：</span>
            <p></p>
          </li>
          <li>
            <span>航次编码：</span>
            <p></p>
          </li>
        </ul>
      </van-collapse-item>
    </van-collapse>
    <!-- 缺陷信息 -->
    <van-collapse class="wrap" v-model="activeNames2">
      <van-collapse-item title="缺陷信息" name="1">
        <ul class="defect-info">
          <li>
            <h1>2 法定证书文书配备及记录是否齐全</h1>
            <div class="list">
              <span>检查结果：</span>
              <p></p>
            </div>
            <div class="list">
              <span>问题描述：</span>
              <p></p>
            </div>
            <div class="list">
              <span>处理决定：</span>
              <p></p>
            </div>
          </li>
        </ul>
      </van-collapse-item>
    </van-collapse>
  </div>
</template>

<script>
export default {
  data () {
    return {
      activeNames1: [],
      activeNames2: [],
      siteSupervisionDetail: {}, //检查信息
      siteSupervisionDetailList: [] //缺陷
    }
  },
  mounted () {

  },
}
</script>

<style scope lang="less">
.container {
  width: 100vw;
  min-height: 100vh;
  overflow: hidden;
  background: #efeff4;
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
        > span {
          color: #808080;
        }
      }
    }
  }

  .wrap {
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
      > span {
        display: block;
        color: #808080;
        width: 250px;
      }
      > p {
        color: #404040;
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
      }
      .list {
        font-size: 30px;
        line-height: 50px;
      }
    }
  }
}
</style>
