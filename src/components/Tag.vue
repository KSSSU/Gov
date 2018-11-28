<template>
  <section class="wrap">
    <mt-header :title="title" fixed>
      <span @click="goBack" slot="left">
        <mt-button icon="back"></mt-button>
      </span>
    </mt-header>

    <div style="padding-top: 40px">
      <list
        :selected="selected"
        :page="page"
        :pages="pages"
        :dataList="list"
        :loading="loading"
        @onCreated="init"
        @onLoadMore="loadMore"
      ></list>
    </div>
  </section>
</template>

<script>
import API from "@/api";
import List from "./List";
export default {
  data() {
    return {
      title: "",
      selected: 0,
      loading: false,
      page: 1,
      pages: 1,
      list: []
    };
  },
  components: {
    List
  },
  methods: {
    /**
     * 初始化
     */
    init() {
      this.loading = true;
      this.fetchData(this.page);
    },

    async fetchData() {
      let res = "";
      const { commonId, commonName, selected } = JSON.parse(
        localStorage.getItem("tag")
      );
      let id = commonId;
      this.title = commonName;
      this.selected = selected;
      console.log(this.selected);

      switch (this.selected) {
        case 1:
          res = await API.getGeneralTag(id);
          break;
        case 2:
          res = await API.getGeneralTag(id);
          break;
        case 3:
          res = await API.getDeclarationTag(id);
          break;
        case 4:
          res = await API.getAnalyzingTag(id);
          break;
        case 5:
          res = await API.getPolicyInfoTag(id);
          break;
        default:
          res = await API.getGeneralTag(id);
      }

      this.pages = res.data.pages;
      this.list = this.list.concat(res.data.records);

      // 设为false时触发无限滚动
      this.loading = false;

      console.log("tag", res);
    },

    /*
     * 载入更多
     */
    loadMore() {
      this.loading = true;
      this.page++;
      if (this.page <= this.pages) {
        this.fetchData();
      }
    },

    /**
     * 回退前一个页面
     */
    goBack() {
      this.$router.go("-1");
    }
  }
};
</script>

<style lang="scss" scoped>
ul {
  padding-top: 40px;
}
</style>
