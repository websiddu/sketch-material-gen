<template>
  <div class="dialogs">
    <div class="grid">
      <div class="top-panel">
        <span>Dialog Generator</span>
      </div>
      <div class="main">
        <div class="side-bar">
          <div class="dialog-option">
            <div class="option-field">
              <label for="">Screen</label>
              <div class="options">
                <md-radio class="md-primary" v-model="screen" id="my-test1" name="Mobile" md-value="mobile">Mobile</md-radio>
                <md-radio class="md-primary" v-model="screen" id="my-test2" name="Desktop" md-value="desktop">Desktop</md-radio>
              </div>
            </div>
            <hr style="margin-top: 16px;">
            <div class="option-field">
              <div class="options">
                <md-checkbox class="md-primary" id="hideTitle" name="hideTitle" v-model="hideTitle">Hide title</md-checkbox>
              </div>
            </div>
          </div>
          <side-footer specUrl="https://material.io/guidelines/components/dialogs.html" howto="dialogs"></side-footer>
        </div>
        <div class="content">
          <div :class="screen + ' screen'">
            <div class="md-dialog-container md-theme-default md-active">
              <div class="md-dialog">
                <div class="md-dialog-title md-title" v-if="!hideTitle">
                  <AutoTextArea class='md-dialog-title-input' rows='1' :handle-change='handleTitleChange' :val='dTitle'></AutoTextArea>
                </div>
                <div class="md-dialog-content">
                  <AutoTextArea class='md-dialog-body-input' rows='1' :handle-change='handleBodyChange' :val='dBody'></AutoTextArea>
                </div>
                <div class="md-dialog-actions">
                <input type="text" class="md-button-input stretchy" v-model='dButtonOne'></input>
                <input type="text" class="md-button-input stretchy" v-model='dButtonTwo'></input>
              </div>
            </div>
            <div class="md-backdrop md-dialog-backdrop md-active"></div></div>
          </div>
        </div>
      </div>
      <div class="footer">
        <md-button class="md-raised md-accent" @click.native="handle">Generate</md-button>
      </div>
    </div>
  </div>
</template>

<script>
import AutoTextArea from './../Shared/AutoTextArea';
import SideFooter from './../Shared/SideFooter';

export default {
  name: 'Dialogs',
  components: {
    AutoTextArea,
    SideFooter,
  },
  methods: {
    link(e) {
      e.preventDefault();
      window.currentLink = encodeURI(JSON.stringify(e.target.href));
      window.location.hash = 'changeLink';
    },
    handleTitleChange(e) {
      this.dTitle = e.target.value;
    },
    handleBodyChange(e) {
      this.dBody = e.target.value;
    },
    updateSize() {
      this.dButtonOneSize = this.dButtonOne.length;
    },
    handle() {
      const data = {
        dTitle: this.dTitle,
        dBody: this.dBody,
        dButtonOne: this.dButtonOne.toUpperCase(),
        dButtonTwo: this.dButtonTwo.toUpperCase(),
        screen: this.screen,
        hideTitle: this.hideTitle,
      };
      window.MDData = encodeURI(JSON.stringify(data));
      window.location.hash = 'submit';

      this.$ga.set('checkProtocolTask', (gadata) => {
        gadata.set('location', 'https://websiddu.github.io/sketch-material/');
      });
      this.$ga.event('dialogs panel', 'submit', this.screen, this.hideTitle);
    },
  },
  data() {
    return {
      dTitle: 'Title...',
      dBody: 'Content of the dialog goes here...',
      dButtonOne: 'ACCEPT',
      dButtonTwo: 'CANCEL',
      isMobile: true,
      dButtonOneSize: 2,
      screen: 'mobile',
      hideTitle: undefined,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>

.dialog-option {
  padding: 16px;
  hr {
    margin-top: 16px;
    border-top: solid 1px rgba(0, 0, 0, 0.19);
  }
  .md-radio {
    margin-bottom: 4px;
  }
}

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

.md-dialog {
  background: #fff;
  transition: all 0.33s cubic-bezier(0.4, 0.0, 1, 1);
}

.md-dialog-title-input {
  font-family: Roboto-Medium;
  font-size: 20px;
  color: rgba(0,0,0,0.87);
  letter-spacing: 0;
  line-height: 24px;
  border: 0;
  resize: none;
  width: 100%;
}

.md-dialog-body-input {
  font-family: Roboto-Regular;
  font-size: 16px;
  color: rgba(0,0,0,0.54);
  line-height: 24px;
  border: 0;
  resize: none;
  width: 100%;
}

.md-button-input {
  font-family: Roboto-Medium;
  font-size: 14px;
  color: #4184F3;
  letter-spacing: 0.5px;
  padding: 10px 8px;
  width: auto;
  border: 0;
  text-transform: uppercase;
}

.md-dialog-container, .md-dialog-backdrop {
  position: absolute;
}

.md-dialog-actions {
  display: block;
  input {
    float: right;
  }
}

.screen {
  width: 360px * 0.9;
  height: 640px * 0.9;
  position: relative;
  margin: 0 auto;
  box-shadow: 0 16px 24px 2px rgba(0,0,0,0.14), 0 6px 30px 5px rgba(0,0,0,0.12), 0 8px 10px 0 rgba(0,0,0,0.20);
  background: url('../../assets/img/dialog-mobile-bg.png') no-repeat;
  background-size: contain;

  transition: all 0.33s cubic-bezier(0.4, 0.0, 1, 1);

  &.desktop {
    width: 100%;
    transition: all 0.33s cubic-bezier(0.4, 0.0, 1, 1);
    background: url('../../assets/img/dialog-desktop-bg.png') no-repeat;
    background-size: cover;
    .md-dialog {
      min-width: 80%;
    }
  }

  img {
    max-height: 100%;
  }
}

.md-dialog {
  min-width: 280px * 0.9;
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
