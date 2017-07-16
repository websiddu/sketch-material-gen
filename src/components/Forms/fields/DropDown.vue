<template>
  <div class="field">
    <div class="field-preview" v-if="!field.isEditMode">
      <div class="field-acitons">
        <md-button class="md-icon-button" @click.native="enableEdit"><md-icon>edit</md-icon></md-button>
      </div>
      <md-input-container>
        <label>{{field.label}}</label>
        <md-input v-model="field.value"></md-input>
      </md-input-container>
    </div>
    <div class="field-edit" v-if="field.isEditMode">
      <md-input-container>
        <label>Input Label</label>
        <md-input v-model="field.label"></md-input>
      </md-input-container>
      <md-input-container>
        <label>Value</label>
        <md-input v-model="field.value"></md-input>
      </md-input-container>
      <md-input-container>
        <label>Help or Error text</label>
        <md-input v-model="field.helpText"></md-input>
      </md-input-container>
      <div class="field-edit-acitons">
        <md-button class="md-primary" @click.native="doneEdit">Done</md-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DropDown',
  methods: {
    doneEdit() {
      this.field.isEditMode = false;
    },
    enableEdit() {
      this.field.isEditMode = true;
    },
  },
  data() {
    return {
      field: {
        isEditMode: false,
        label: 'Text label',
        value: '',
        helpText: '',
      },
    };
  },
};
</script>

<style scoped lang='scss'>

.field {
  position: relative;
}

.field-acitons {
  position: absolute;
  right: 0;
  top: 0;
  display: none;
}

.field-preview {
  padding: 24px;
  &:hover {
    background: #f8f8f8;
    .field-acitons {
      display: block;
    }
  }
}

.field-edit {
  padding: 24px;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, .14), 0 3px 1px -2px rgba(0, 0, 0, .2), 0 1px 5px 0 rgba(0, 0, 0, .12);
  border-radius: 2px;
}

.field-edit-acitons {
  .md-button {
    margin: 0;
  }
}

</style>
