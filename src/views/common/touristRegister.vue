<template>
  <section class="topic">
    <section class="content">
      <header>
        <h2>请选择一个主题</h2>
        <mt-button type="danger" @click="handleLogin" :disabled="!selected">确认登录</mt-button>
      </header>
      <ul class="list" v-if="topicList.length > 0">
        <li
          v-for="item in topicList"
          :key="item.id"
          :class="selected == item.value ? 'selected' :''"
          @click="handleClick(item)"
        >
          <span>{{item.label}}</span>
        </li>
      </ul>
    </section>
  </section>
</template>

<script>
import API from "@/api";
import { setToken } from "@/utils";
export default {
  data() {
    return {
      selected: "",
      topicList: []
    };
  },
  mounted() {
    this.getAllTopic();
  },
  methods: {
    /**
     * 获取所有主题
     */
    async getAllTopic() {
      const res = await API.getPolicyTopic();
      this.topicList = res.data.records;
      console.log("topic", res.data);
    },

    async handleLogin() {
      const res = await API.touristRegister(this.selected);

      setToken(res.data.username);
      localStorage.setItem("select_topic", JSON.stringify(this.selected));
      localStorage.setItem("user", res.data.username);
      this.$store.commit("SELECT_TAB", "Subscription");
      this.$store.commit("SELECT_NAVBAR", 1);
      this.$store.commit("SELECT_TOPIC", this.selected);
      this.$router.push("Subscription");

      console.log("res", res);
    },

    handleClick(item) {
      if (this.selected == item.value) {
        this.selected = "";
      } else {
        this.selected = item.value;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.content {
  background: #fff;
  padding: 15px 1rem;

  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
  }

  h2 {
    margin: 0;
    font-size: 1.3rem;
  }

  .list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin: 0 -5px;

    li {
      position: relative;
      flex: 0 0 33.33%;
      padding: 0 5px;
      margin: 0 0 10px;
      height: 50px;

      &.selected {
        span {
          background: #fae9e9;
          border-color: #b83539;
        }
      }

      span {
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        background: #f4f4f4;
        padding: 0 14px;
        height: 100%;
        border: 1px solid #eee;
      }

      .mint-toast-icon {
        position: absolute;
        right: -3px;
        top: -6px;
        color: #777;
        font-size: 1.4rem;
      }
    }
  }

  .mint-button {
    font-size: 1rem;
    height: 32px;
  }
}

.field-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 200px 30px;

  p {
    width: 100%;
  }

  .mint-button {
    width: 100%;
  }
}

h2 {
  margin: 0;
}

select {
  border: 1px solid #ddd;
  background: #eee;
  padding: 10px;
  width: 100%;
  margin: 20px 0;
  border-radius: 4px;

  option {
    font-weight: normal;
    display: block;
    white-space: pre;
    min-height: 1.2em;
    padding: 0px 2px 1px;
  }
}
</style>
