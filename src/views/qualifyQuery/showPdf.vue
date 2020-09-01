<template>
  <div id="pdfvuer">
    <!-- <div id="buttons" class="ui grey three item inverted bottom fixed menu transition hidden">
      <a class="item" @click="page > 1 ? page-- : 1">
        <i class="left chevron icon"></i>
        Back
      </a>
      <a class="ui active item">
        {{page}} / {{ numPages ? numPages : '∞' }}
      </a>
      <a class="item" @click="page < numPages ? page++ : 1">
        Forward
        <i class="right chevron icon"></i>
      </a>
    </div>
    
    -->
    <pdf
      :src="pdfdata"
      v-for="i in numPages"
      :key="i"
      :id="i"
      :page="i"
      :scale.sync="scale"
      style="width:100%;margin:20px auto;"
    >
      <template slot="loading">loading content here...</template>
    </pdf>
    <div id="buttons" class="ui grey three item inverted bottom fixed menu transition hidden">
      <button class="ml20 btn mr20" @click="scale -= scale > 0.2 ? 0.1 : 0">
        <i class="left chevron icon" />
        -
      </button>
      <!-- <a class="btn">{{ formattedZoom }} %</a> -->
      <button class="btn" @click="scale += scale < 2 ? 0.1 : 0">
        +
        <i class="right chevron icon" />
      </button>
    </div>
  </div>
</template>

<script>
import pdfvuer from 'pdfvuer'


export default {
  components: {
    pdf: pdfvuer
  },
  data () {
    return {
      page: 1,
      numPages: 0,
      pdfdata: undefined,
      errors: [],
      scale: 'page-width',
      type: 1
    }
  },
  computed: {
    formattedZoom () {
      return Number.parseInt(this.scale * 100);
    },
  },
  mounted () {
    this.type = this.$route.query.type
    this.getPdf()
  },
  watch: {
    show: function (s) {
      if (s) {
        this.getPdf();
      }
    },
    page: function (p) {
      if (window.pageYOffset <= this.findPos(document.getElementById(p)) || (document.getElementById(p + 1) && window.pageYOffset >= this.findPos(document.getElementById(p + 1)))) {
        document.getElementById(p).scrollIntoView();
      }
    }
  },
  methods: {
    getPdf () {
      var self = this;
      // let url = `./pdfs/${self.type}.pdf`
      let url = `./test${self.type}.pdf`

      self.pdfdata = pdfvuer.createLoadingTask(url);
      self.pdfdata.then(pdf => {
        self.numPages = pdf.numPages;

      });
    },
    findPos (obj) {
      return obj.offsetTop;
    }
  }
}
</script>

<style lang="css" scoped>
#buttons {
  position: fixed;
  bottom: 0;
  background: #fff;
  width: 100%;
  /* height: 5vh; */
  padding: 10px;
  margin-left: 0 !important;
  margin-right: 0 !important;
}
/* Page content */
.content {
  padding: 16px;
}
.btn {
  width: 70px;
  height: 70px;
  border-radius: 10px;
  font-size: 30px;
  box-shadow: 0 0 5px #ccc;
}
</style>