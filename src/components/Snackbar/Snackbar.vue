<template>
  <div class="snackbars">
    <div class="grid">
      <div class="top-panel">
        <span>Toasts &amp; Snackbars Generator</span>
      </div>
      <div class="main">
        <div class="side-bar">
          <div class="snackbar-option">
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
                <md-checkbox class="md-primary" id="hideButton" name="hideButton" v-model="hideButton">Hide button</md-checkbox>
              </div>
            </div>
          </div>
          <side-footer specUrl="https://material.googleplex.com/components/snackbars-toasts.html" howto="snackbars-toasts"></side-footer>
        </div>
        <div class="content" :class="screen + ' ' + hideButton +' screen'">
          <div class="snackbar" id="snackbar">
            <div class="snackbar-content" id="snackbar-content" contenteditable v-on:keyup="changed" v-on:blur="changed" v-on:paste="changed" v-on:delete="changed" v-on:focus="changed">
              {{this.content}}
            </div>
            <div class="snackbar-action" v-if="!hideButton">
              <div class='snackbar-button-input' id="snackbar-button" contenteditable v-on:keyup="changedButton" v-on:blur="changedButton" v-on:paste="changedButton" v-on:delete="changedButton" v-on:focus="changedButton">{{this.button}}</div>
            </div>
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

import SideFooter from './../Shared/SideFooter';

export default {
  name: 'Snackbar',
  components: {
    SideFooter,
  },
  methods: {
    handleTitleChange(e) {
      this.dTitle = e.target.value;
    },
    handleBodyChange(e) {
      this.dBody = e.target.value;
    },
    updateSize() {
      this.dButtonOneSize = this.dButtonOne.length;
    },
    changed(event) {
      clearTimeout(this.timeoutId);
      const vm = this;
      this.timeoutId = setTimeout(() => {
        vm.content = event.target.textContent.trim();
      }, vm.timeoutDuration);
    },
    changedButton(event) {
      clearTimeout(this.timeoutId);
      const vm = this;
      this.timeoutId = setTimeout(() => {
        vm.button = event.target.textContent.trim();
      }, vm.timeoutDuration);
    },
    hideButton() {
      this.hideButton = !this.hideButton;
    },
    handle() {
      const data = {
        content: this.content,
        button: this.button.toUpperCase(),
        screen: this.screen,
        width: document.getElementById('snackbar').offsetWidth,
        contentWidth: document.getElementById('snackbar-content').offsetWidth,
        buttonWidth: document.getElementById('snackbar-button') ? document.getElementById('snackbar-button').offsetWidth : 0,
        hideButton: this.hideButton,
      };

      window.MDData = encodeURI(JSON.stringify(data));
      window.location.hash = 'submit';

      this.$ga.set('checkProtocolTask', (gadata) => {
        gadata.set('location', 'http://sketch-material.googleplex.com');
      });
      this.$ga.event('snackbars panel', 'submit', this.screen, this.hideTitle);
    },
  },
  data() {
    return {
      content: 'Content of the snackbar goes here...',
      button: 'UNDO',
      screen: 'desktop',
      hideButton: false,
      timeoutId: null,
      timeoutDuration: 20,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>

.mobile {
  .snackbar {
    width: 320px;
  }
}

.desktop {
  .snackbar {
    .snackbar-content {
      margin-right: 48px;
    }
  }
}

.true {
  .snackbar {
    .snackbar-content {
      margin-right: 0;
    }
  }
}

.snackbar {
  background: #323232;
  font-size: 14px;
  min-width: 288px;
  max-width: 568px;
  border-radius: 2px;
  padding: 14px 24px;
  display: inline-flex;
  margin: 0 auto;
  align-items: center;
  margin-bottom: 140px;
  -webkit-user-select: auto !important;

  .snackbar-content {
    color: #fff;
    flex: 1;
    margin-right: 24px;
    min-width: 173px;
    .snackbar-content-input {
      border: 0;
      width: 100%;
      font-family: Roboto-Regular;
      font-size: 14px;
      background: transparent;
      color: #fff;
      max-width: 520px;
      resize: none;
    }
  }
  .snackbar-action, .snackbar-button-input {
    font-family: Roboto-Medium;
    font-size: 14px;
    color: #80CBC4;
    letter-spacing: 0.5px;
    background: transparent;
    border: 0;
  }
}


.snackbar-option {
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

.md-snackbar {
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
  display: flex;
  align-items: center;
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
