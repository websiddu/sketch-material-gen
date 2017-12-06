<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  mounted() {
    window.oncontextmenu = this.handleContextMenu;
  },
  methods: {
    handleContextMenu(evt) {
      if (!evt.altKey) {
        evt.preventDefault();
      }
    },
  },
};
</script>

<style lang="scss">
$timing-funciton: cubic-bezier(.62,.28,.23,.99);

.top-panel {
  height: 40px;
  background: #3f51b5;
  color: #fff;
  display: flex;
  align-items: center;
  padding: 0 16px;
  font-size: 16px;
  font-weight: 500;
  -webkit-user-select: none;

  .top-panel-title {
    flex: 1;
  }

  .top-panel-actions {
    display: flex;
    align-items: center;
    &.left {
      margin-left: -8px;
    }
    a {
      display: flex;
      align-items: center;
      color: #fff;
      margin-right: 8px;
      &:hover {
        text-decoration: none !important;
      }
    }
    i {
      font-size: 18px;
      transition: all 0.2s $timing-funciton;
      &:hover {
        cursor: pointer;
        transition: all 0.2s $timing-funciton;
        transform: scale(1.03);
      }
      &:active {
        cursor: pointer;
        transition: all 0.2s $timing-funciton;
        transform: scale(0.95);
      }
    }
  }
}

.page-content {
  position: fixed;
  left: 0;
  right: 0;
  top: 40px;
  bottom: 0;
  overflow-y: auto;
  background: #ECEFF1;
}



// Layout styles
.top-panel {
  height: 40px;
  background: #3f51b5;
  color: #fff;
  display: flex;
  align-items: center;
  padding: 0 16px;
  font-size: 16px;
  font-weight: 500;
  -webkit-user-select: none;
}

.main {
  display: flex;
  flex-direction: row;
  position: fixed;
  left: 0;
  right: 0;
  top: 40px;
  bottom: 0;
}

.side-bar {
  width: 160px;
  background: #f8f8f8;
  border-right: solid 1px #e0e0e0;
}

.content {
  flex: 1;
}

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

.muted {
  color: #666;
}

.footer {
  background: #fff;
  position: fixed;
  border-top: solid 1px #e0e0e0;
  bottom: 0;
  left: 160px;
  right: 0;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 12px;
}

</style>
