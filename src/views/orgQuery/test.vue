
<template>
  <div class="container">
    <div>
      <button @click="show1 =!show1">显示多选</button>
      {{values}}
    </div>

    <div class="mt30">
      <button @click="show2 =!show2">显示二维单选选</button>
      {{values1}}
    </div>

    <div class="mt30">
      <button @click="show3 =!show3">显示一维单选</button>
      {{values2}}
    </div>

    <div class="mt30">
      <button @click="show4 =!show4">显示二维单选（滚动）</button>
      {{values2}}
    </div>
    <queryPicker
      :show="show1"
      :type="3"
      :list="list1"
      :values="values"
      @close="show1=false"
      @onComfirm="onComfirm1"
    ></queryPicker>
    <queryPicker
      :show="show2"
      :type="2"
      :list="list2"
      :values="values1"
      @close="show2=false"
      @onComfirm="onComfirm2"
    ></queryPicker>
    <queryPicker :show="show3" :type="1" :list="list3" :values="values2" @close="show3=false"></queryPicker>
    <queryPicker
      :show="show4"
      :type="4"
      :list="list2"
      :values="values1"
      @close="show4=false"
      @onComfirm="onComfirm2"
    ></queryPicker>
    <div>
      1
      <br />1
      <br />1
      <br />1
      <br />1
      <br />1
      <br />1
      <br />1
      <br />1
      <br />1
      <br />1
      <br />1
      <br />1
      <br />1
      <br />1
      <br />1
      <br />1
      <br />1
      <br />1
      <br />1
      <br />1
      <br />
      <br />1
      <br />1
      <br />1
      <br />1
      <br />1
      <br />1
      <br />1
      <br />1
      <br />1
      <br />1
      <br />1
      <br />1
      <br />1
      <br />1
      <br />1
      <br />1
      <br />1
      <br />1
      <br />1
      <br />1
      <br />
      <br />1
      <br />1
      <br />1
      <br />1
      <br />1
      <br />1
      <br />1
      <br />1
      <br />1
      <br />1
      <br />1
      <br />1
      <br />1
      <br />1
      <br />1
      <br />1
      <br />1
      <br />1
      <br />1
      <br />1
      <br />
      <br />1
      <br />1
      <br />1
      <br />1
      <br />1
      <br />1
      <br />1
      <br />1
      <br />1
      <br />1
      <br />1
      <br />1
      <br />1
      <br />1
      <br />1
      <br />1
      <br />1
      <br />1
      <br />1
      <br />1
      <br />
    </div>
  </div>
</template>

<script>
import queryPicker from '../../components/queryPicker'
export default {
  components: {
    queryPicker
  },
  data () {
    return {
      show1: false,
      show2: false,
      show3: false,
      show4: false,
      values: [1, 2],
      values1: ['2'],
      values2: ['1'],
      list1: [
        {
          label: '合格证',
          value: 1
        }, {
          label: '适任证',
          value: 2
        }, {
          label: '健康证明',
          value: 3
        }, {
          label: '海员证',
          value: 4
        }, {
          label: '技术资格证',
          value: 5
        }, {
          label: '海船船员内河航线行驶资格证明',
          value: 6
        }, {
          label: '特定航线江海直达船舶船员行驶资格证明',
          value: 7
        }
      ],
      list2: [
        {
          title: '海船考试类型',
          list: [{
            label: '船长和高级船员适任考试',
            value: '1'
          }, {
            label: '普通和高级船员适任考试',
            value: '2'
          }, {
            label: 'GMDSS适任考试',
            value: '3'
          }, {
            label: '非自航船适任考试',
            value: '4'
          }, {
            label: '海港引航员适任考试',
            value: '5'
          }]
        },
        {
          title: '内河考试类型',
          list: [{
            label: '内河全国统考（长江）',
            value: '6'
          }, {
            label: '内河全国统考（珠江）',
            value: '7'
          }, {
            label: '内河全国统考（黑龙江）',
            value: '8'
          }, {
            label: '内河非全国统考',
            value: '9'
          }, {
            label: '内河引航员考试',
            value: '10'
          }]
        }
      ],
      list3: [
        {
          label: '航海英语',
          value: 1
        }, {
          label: '船舶操纵与避碰',
          value: 2
        }, {
          label: '航海学',
          value: 3
        }, {
          label: '船舶管理（驾驶）',
          value: 4
        }, {
          label: '船舶结构与货运',
          value: 5
        }, {
          label: '船舶辅机',
          value: 6
        }, {
          label: '航海英语',
          value: 1
        }, {
          label: '船舶操纵与避碰',
          value: 2
        }, {
          label: '航海学',
          value: 3
        }, {
          label: '船舶管理（驾驶）',
          value: 4
        }, {
          label: '船舶结构与货运',
          value: 5
        }, {
          label: '船舶辅机',
          value: 6
        }, {
          label: '航海英语',
          value: 1
        }, {
          label: '船舶操纵与避碰',
          value: 2
        }, {
          label: '航海学',
          value: 3
        }, {
          label: '船舶管理（驾驶）',
          value: 4
        }, {
          label: '船舶结构与货运',
          value: 5
        }, {
          label: '船舶辅机',
          value: 6
        }
      ]
    };
  },
  computed: {},
  methods: {
    onComfirm1 (o) {
      this.values = [...o]
    },
    onComfirm2 (o) {
      this.values1 = [...o]
    },

  },
  created () {


  },
  watch: {

  },
  mounted () {

  },
  activated () {


  },
  beforeDestroy () { },
  destroyed () { },

}
</script>
<style lang='scss' scoped>
.container {
  width: 100vw;
  height: 100vh;
  background: #f5f8fa;
  color: #333;
  .listWrap {
    width: 100%;
    height: 50px;
    overflow: hidden;
    .list {
      overflow: auto;
      width: 100%;
      height: 100%;
    }
  }
}
</style>