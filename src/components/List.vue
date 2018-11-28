<template>
  <ul
    class="list"
    v-infinite-scroll="loadMore"
    infinite-scroll-disabled="loading"
    infinite-scroll-distance="10"
  >
    <li
      v-for="item in dataList"
      :key="item.declareId || item.generalId || item.explainId || item.informationId"
    >
      <header
        @click="toDetail(item.declareId || item.generalId || item.explainId || item.informationId, item.declareStatus)"
      >
        <h2>{{item.declareTitle || item.generalTitle || item.explainTitle || item.informationTitle}}</h2>
      </header>

      <div class="line-container">
        <span class="dispatch">
          <span v-if="item.explainSource">{{item.explainSource}}</span>
          <span
            v-else
            v-for="dispatch in (item.dispatchs || item.declareDispatchList || item.explainOrganizationList)"
            :key="dispatch.commonId"
          >{{dispatch.commonName}}</span>
        </span>
        <span>{{formatDate(item.declarePublishTime || item.generalPublishTime || item.explainPublishTime || item.informationPublishTime)}}</span>
      </div>

      <ul class="tag">
        <li
          v-for="tag in (item.declareTagList || item.tags || item.explainTagList || item.informationTag)"
          :key="tag.commonId"
          @click="toTagList(tag)"
        >{{tag.commonName}}</li>
      </ul>
    </li>
    <li v-if="page <= pages" style="text-align: center; padding: 15px 0;">
      <mt-spinner type="triple-bounce" color="#ccc"></mt-spinner>
    </li>
    <li v-else style="text-align: center; padding: 15px 0; color: #bbb">{{tipText}}</li>
  </ul>
</template>

<script>
export default {
  props: {
    selected: {
      type: Number
    },
    tipText: {
      type: String,
      default: "没有数据了"
    },
    page: {
      type: Number
    },
    pages: {
      type: Number
    },
    loading: {
      type: Boolean
    },
    dataList: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  data() {
    return {};
  },
  created() {
    this.$emit("onCreated");
  },
  methods: {
    /**
     * 滚动载入更多
     */
    loadMore() {
      this.$emit("onLoadMore");
    },

    /**
     * 跳转到详情页
     * @param {Number} id 政策的ID
     * @param {String} declareFlag 一个申报政策的标记，用来区分通用政策和申报政策的API请求
     */
    toDetail(id, declareFlag) {
      this.$router.push({
        name: "Detail",
        params: { id, declareFlag, selected: this.selected }
      });
    },

    toTagList(tag) {
      console.log("tag", tag);
      tag.selected = this.selected;

      localStorage.setItem("tag", JSON.stringify(tag));

      this.$router.push({
        name: "Tag",
        params: {
          id: tag.commonId,
          title: tag.commonName,
          selected: this.selected
        }
      });
    },

    /**
     * 格式化日期
     * @param {date} String 日期
     */
    formatDate(date) {
      return date ? date.substr(0, 10).replace(/-/g, ".") : "";
    }
  }
};
</script>

<style lang="scss" scoped>
.list {
  list-style: none;
  margin: 0 1rem;
  padding: 0;

  li {
    border-bottom: 1px solid #eee;
    padding: 15px 0;
  }

  .line-container {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    font-size: 0.85rem;
    color: #999;
    margin: 8px 0 0;
  }

  h2 {
    font-size: 1rem;
    color: #444;
    margin: 0 0 0.5rem;
  }

  .dispatch {
    display: flex;
    flex-direction: column;
  }

  .tag {
    display: flex;
    flex-wrap: wrap;
    margin: 5px 0 0;

    li {
      padding: 3px 6px;
      background: #f0f0f0;
      margin: 5px 5px 0 0;
      font-size: 0.9rem;
      border-radius: 4px;
      color: #777;
    }
  }
}
</style>
