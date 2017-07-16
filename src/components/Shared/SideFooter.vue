<template>
  <div class="side-footer">
    <ul>
      <li> <a v-on:click="link" :href="specUrl">Spec</a></li>
      <li> <a v-on:click="link" :href="howToUrl">How to?</a></li>
      <li> <a v-on:click="link" href="https://sketch-material.googleplex.com/contact" style="margin-right: 32px">Feedback</a> <a v-on:click="link" href="https://sketch-material.googleplex.com" class="small muted">{{this.version}}</a></li>
    </ul>
  </div>
</template>

<script>

export default {
  name: 'sideFooter',
  mounted() {
    this.$http.get('https://raw.githubusercontent.com/websiddu/versions/master/sketch-material.json').then((response) => {
      this.version = JSON.parse(response.body).version;
    }, (err) => {
      console.log(err);
    });
  },
  props: ['specUrl', 'howto'],
  methods: {
    link(e) {
      e.preventDefault();
      window.currentLink = encodeURI(JSON.stringify(e.target.href));
      window.location.hash = 'changeLink';
    },
  },
  computed: {
    howToUrl() {
      return `https://sketch-material.googleplex.com/help#${this.howto}`;
    },
  },
  data() {
    return {
      version: 1.0,
    };
  },
};

</script>

<style scoped lang="scss">
  .side-footer {
    position: absolute;
    bottom: 0;
    ul {
      list-style-type: none;
      margin: 0;
      padding: 0;
      font-size: 12px;
      margin-bottom: 8px;
      li {
        padding: 2px 16px;
        margin: 0;
        .small {
          font-size: 10px;
          color: #888;
        }
      }
    }
  }
</style>
