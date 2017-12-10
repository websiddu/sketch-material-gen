<template>
  <div class="menus">
    <div class="grid">
      <div class="top-panel">
        <span>Menu Generator</span>
      </div>
      <div class="main">
        <div class="side-bar">
          <div class="option-bar">
            <div class="option-field">
              <label for="">Screen</label>
              <div class="options">
                <md-radio class="md-primary" v-model="screen" name="Mobile" md-value="mobile">Mobile</md-radio>
                <md-radio class="md-primary" v-model="screen" name="Desktop" md-value="desktop">Desktop</md-radio>
              </div>
            </div>
            <br>
            <div class="option-field" v-if="screen == 'desktop'">
              <label for="">Density</label>
              <div class="options">
                <md-radio class="md-primary" v-model="density" name="Normal" md-value="normal">Normal</md-radio>
                <md-radio class="md-primary" v-model="density" name="Dense" md-value="dense">Dense</md-radio>
              </div>
              <br>
            </div>

            <div class="option-field">
              <label for="">Has icon</label>
              <div class="options">
                <md-radio class="md-primary md-dense" v-model="hasIcon" md-value="yes">Yes</md-radio>
                <md-radio class="md-primary md-dense" v-model="hasIcon" md-value="no">No</md-radio>
              </div>
            </div>
            <br>
            <div class="option-field">
                <md-input-container>
                  <label for="width">Width</label>
                  <md-select name="width" id="width" v-model="width">
                    <md-option value="2">2 x 56sp = 112sp (2x) </md-option>
                    <md-option value="3">3 x 56sp = 168sp (3x)</md-option>
                    <md-option value="4">4 x 56sp = 224sp (4x)</md-option>
                    <md-option value="5">5 x 56sp = 280sp (5x)</md-option>
                    <md-option value="6">6 x 56sp = 336sp (6x)</md-option>
                    <md-option value="7">7 x 56sp = 392sp (7x)</md-option>
                  </md-select>
                </md-input-container>

            </div>
          </div>
          <side-footer specUrl="https://material.io/guidelines/components/menus.html" howto="menus"></side-footer>
        </div>
        <div class="content">
          <div class="input">
            <HotTable :root="root" :cells="cells" ref="inputTable" :settings="hotSettings" :data="data" :onModifyData="onModifyData" :onAfterCreateRow="onAfterCreateRow"></HotTable>
          </div>
          <div class="output">
            <div :class="screen + ' w' + width + 'x ' + isDense + ' menu'">
              <div v-for="(item, i) in items" v-bind:key="i">
                <div v-if="item[0] && item[0] == '-'" class="md-divider">
                </div>
                <div class="li" v-if="item[0] && item[0] != '-'">
                  <span class="icon" v-if="hasIcon == 'yes'">
                    <md-icon>casino</md-icon>
                  </span>
                  <span class="text">{{item[0]}}</span>
                  <span class="key">{{item[1]}}</span>
                </div>
              </div>
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
import HotTable from 'vue-handsontable-official';
import SideFooter from './../Shared/SideFooter';

export default {
  name: 'Menus',
  components: {
    SideFooter,
    HotTable,
  },
  watch: {
  },
  methods: {
    handle() {
      const data = {
        items: this.items,
        isDense: this.isDense,
        screen: this.screen,
        width: this.width,
        hasIcon: this.hasIcon,
      };

      window.MDData = encodeURI(JSON.stringify(data));
      window.location.hash = 'submit';

      this.$ga.set('checkProtocolTask', (gadata) => {
        gadata.set('location', 'https://websiddu.github.io/sketch-material/');
      });
      this.$ga.event('menus panel', 'submit', this.screen, this.isDense);
    },
    onAfterCreateRow() {
      this.data.push(['', '']);
    },
    link(e) {
      e.preventDefault();
      window.currentLink = encodeURI(JSON.stringify(e.target.href));
      window.location.hash = 'changeLink';
    },
    onModifyData() {
      this.items = JSON.parse(JSON.stringify(this.data));
    },
  },
  computed: {
    isDense() {
      if (this.screen === 'mobile') {
        return 'normal';
      }

      return this.density;
    },
  },
  data() {
    return {
      density: 'normal',
      width: '4',
      hasIcon: 'no',
      screen: 'mobile',
      items: null,
      root: 'inputTable',
      cells(row, column) {
        const cellMeta = {};
        const isChecked = this.instance.getDataAtCell(this.instance.toVisualRow(row), column);
        if (column === 0) {
          cellMeta.type = 'checkbox';
          cellMeta.className = `htCenter ${(isChecked ? ' at-risk-checked' : '')}`;
        }
      },
      data: [
        ['Bold', ' '],
        ['Italic', ' '],
        ['Underline', ' '],
        ['-', ' '],
        ['Paragraph sytles', ' '],
        ['', ' '],
        ['', ' '],
        ['', ' '],
        ['', ' '],
        ['', ' '],
        ['', ' '],
        ['', ' ']],
      hotSettings: {
        fillHandle: {
          autoInsertRow: true,
        },
        allowInsertColumn: false,
        manualColumnResize: false,
        colWidths: [190, 85],
        colHeaders: ['Text', 'Shortcut'],
        minSpareCols: 0,
        minSpareRows: 0,
        minRows: 1,
        minCols: 1,
        rowHeaders: false,
        fixedRowsTop: 1,
        width: 275,
        contextMenu: ['row_above', 'row_below', '---------', 'remove_row'],
      },
    };
  },
};
</script>

<style scoped lang='scss'>

.option-bar {
  padding: 16px;
  font-size: 13px;
  hr {
    margin-top: 16px;
    border-top: solid 1px rgba(0, 0, 0, 0.19);
  }
}

.content {
  display: flex;
  margin-bottom: 64px;

  .input {
    width: 40%;
    border-right: solid 1px #eee;
  }
  .output {
    flex: 1;
    align-items: center;
    justify-content: center;
    display: flex;
    overflow-y: auto;
    padding: 54px 0;
  }
}

#input-table {
  width: 100%;
}

.menu {
  box-shadow: 0 1px 5px rgba(0,0,0,.2), 0 2px 2px rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.12);
  min-width: 84px;
  max-width: 392px;
  min-height: 54px;
  border-radius: 2px;
  width: auto;
  margin: 0;
  padding: 4px 0;
  list-style-type: none;
  display: flex;
  flex-direction: column;
  .li {
    min-height: 32px;
    padding: 0 24px;
    display: flex;
    align-items: center;
    line-height: 1;
    margin: 0;
    font-size: 15px;
    &:hover {
      background-color: #eee;
      cursor: pointer;
    }
    .icon {
      color: #757575;
      margin-right: 8px;
      .md-icon {
        font-size: 22px;
      }
    }
    .text {
      flex: 1;
    }
  }

  &.dense {
    .li {
      min-height: 24px;
      padding: 0 24px;
      font-size: 13px;
      .icon {
        .md-icon {
          font-size: 18px;
          min-height: 18px;
          min-width: 18px;
          width: 18px;
          height: 18px;
        }
      }
    }
  }

  &.mobile {
    li {
      padding: 0 16px;
      min-height: 48px;
      font-size: 16px;
    }
    &.dense {
      .li {
        font-size: 14px;
      }
    }
  }

  &.w2x {
    width: 2 * 56px;
  }
  &.w3x {
    width: 3 * 56px;
  }
  &.w4x {
    width: 4 * 56px;
  }
  &.w5x {
    width: 5 * 56px;
  }
  &.w6x {
    width: 6 * 56px;
  }
  &.w7x {
    width: 7 * 56px;
  }
}

</style>

<style lang="scss">
.md-select {
  .md-select-value {
    font-size: 13px !important;
  }
}

.md-list-item .md-list-item-container {
  font-size: 13px !important;
  min-height: 40px !important;
}

.md-radio {
  margin-bottom: 4px;
  margin: 6px 12px 6px 0 !important;
  .md-radio-container {
    width: 18px !important;
    height: 18px !important;
  }
}
</style>
