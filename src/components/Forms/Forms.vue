<template>
  <div class="forms-page">
    <div class="top-panel">
      <span>Form Generator</span>
    </div>
    <div class="form-editor">
      <div class="form">
        <div class="row" v-for="(row, rowIndex) in rows" v-bind:index="rowIndex" v-bind:key="rowIndex">
          <div class="col" v-for="(field, fieldIndex) in row.fields" v-bind:item="field" v-bind:index="fieldIndex" v-bind:key="fieldIndex">
            <Field :field="field" :row-index='rowIndex' field-index='fieldIndex'></Field>
            <div class="row-actions">
              <md-button class="md-icon-button" @click.native="addNewRowField(rowIndex)"><md-icon>add</md-icon></md-button>
            </div>
          </div>
        </div>
        <div class="row-l" style="margin-top: 16px;">
          <div class="col-l">
            <md-button class="md-raised md-primary m0" @click.native="addNewRowField()"> Add </md-button>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="left-footer">
        <md-button class="" id="json" @click.native="openDialog('import')">Import</md-button>
        <md-button class="" id="export" @click.native="openDialog('export')">Export</md-button>
      </div>
      <div class="right-footer">
        <md-button class="md-raised md-accent" @click.native="handle">Generate</md-button>
      </div>
    </div>

    <md-dialog md-open-from="#export" md-close-to="#export" ref="export">
      <md-dialog-title>JSON</md-dialog-title>

      <md-dialog-content>
        <div class="json-viewer">
          <textarea name="" id="" cols="30" rows="10" v-model="getFormData" autofocus readonly @focus="$event.target.select()"></textarea>
        </div>
      </md-dialog-content>

      <md-dialog-actions>
        <div style="flex: 1;font-size: 13px;">
          Copy content and paste it in a safe place!
        </div>
        <md-button class="md-primary" @click.native="closeDialog('export')">Done</md-button>
      </md-dialog-actions>
    </md-dialog>



    <md-dialog md-open-from="#import" md-close-to="#import" ref="import">
      <md-dialog-title>JSON</md-dialog-title>

      <md-dialog-content>
        <div class="json-viewer">
          <textarea name="" id="" cols="30" rows="10" v-model="jsonData" autofocus placeholder="Paste your data in JSON format..."></textarea>
        </div>
      </md-dialog-content>

      <md-dialog-actions>
        <div class="error">{{error}}</div>
        <md-button class="md-primary" @click.native="closeDialog('import')">Cancel</md-button>
        <md-button class="md-primary" @click.native="importJSON('import')">Import</md-button>
      </md-dialog-actions>
    </md-dialog>

  </div>

</template>

<script>
import Field from './Field';

export default {
  name: 'Forms',
  components: {
    Field,
  },
  methods: {
    handle() {
      window.MDData = encodeURI(JSON.stringify(this.$store.state.form));
      window.location.hash = 'submit';
      this.$ga.set('checkProtocolTask', (gadata) => {
        gadata.set('location', 'https://websiddu.github.io/sketch-material');
      });
      this.$ga.event('froms panel', 'submit');
    },
    importJSON(ref) {
      this.error = '';
      try {
        const parsedData = JSON.parse(this.jsonData);
        this.$store.state.form = parsedData;
        this.$refs[ref].close();
      } catch (e) {
        this.error = 'Bummer!! Your data seems not proper!';
      }
    },
    openDialog(ref) {
      this.$refs[ref].open();
    },
    closeDialog(ref) {
      this.error = '';
      this.$refs[ref].close();
    },
    hideAllEditPanels() {
      for (let i = 0; i < this.rows.length; i += 1) {
        for (let j = 0; j < this.rows[i].fields.length; j += 1) {
          this.rows[i].fields[j].isEditMode = false;
        }
      }
    },
    addNewRowField(rowIndex) {
      this.hideAllEditPanels();

      const field = JSON.parse(JSON.stringify(this.$store.state.field));
      if (rowIndex >= 0) {
        this.rows[rowIndex].fields.push(field);
      } else {
        this.rows.push({
          fields: [field],
        });
      }
    },
  },
  computed: {
    rows() {
      return this.$store.state.form.rows;
    },
    getFormData() {
      return JSON.stringify(this.$store.state.form, null, 2);
    },
  },
  data() {
    return {
      empty: '',
      jsonData: '',
      error: '',
    };
  },
};
</script>

<style scoped lang="scss">

.form-editor {
  overflow-y: auto;
  position: fixed;
  top: 42px;
  left: 0;
  right: 0;
  bottom: 64px;
}

.form {
  background: #fff;
  width: 600px;
  margin: 0 20px;
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

.row {
  border: solid 1px transparent;
  padding: 8px 48px 8px 8px;
  position: relative;
  display: flex;

  &:hover {
    // border: dotted 1px #CE93D8;
  }

}

.col {
  // flex: 1;
  width: 100%;
  // border: solid 1px transparent;
  &:hover {
    // border: dotted 1px #F48FB1;
  }
}

.row-actions {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translate(0, -50%);
}

.footer {
  background: #fff;
  position: fixed;
  border-top: solid 1px #e0e0e0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 64px;

  display: flex;
  align-items: center;


  padding-right: 12px;

  .left-footer {

  }

  .right-footer {
    flex: 1;
    display: flex;
    justify-content: flex-end;
  }

}

.json-viewer {
  width: 500px;
  height: 300px;
  textarea {
    border: 0;
    font-size: 13px;
    width: 100%;
    height: 100%;
    border-radius: 4px;
    border: solid 1px #eee;
    font-family: "Roboto Mono", "Courier New", Courier, monospace;
  }
}

.error {
  color: red;
  text-align: left;
  flex: 1;
  font-size: 13px;
}

</style>
