<template>
  <div class="field" :style="{ width: field.width + '%'}">
    <div class="field-preview" v-bind:class="{ active: field.isEditMode }" v-on:click="enableEdit(rowIndex, fieldIndex)">
      <div class="field-acitons">
        <!--<md-button class="md-icon-button" @click.native="enableEdit()"><md-icon>edit</md-icon></md-button>-->
        <md-button class="md-icon-button" @click.native="removeField()"><md-icon>delete</md-icon></md-button>
      </div>
      <div class="field-edit-preview">

        <div v-if="field.type == 'text'">
          <md-input-container v-bind:class="{'md-input-invalid': field.hasError}">
            <label> {{field.label}} </label>
            <md-input v-model="field.value" :placeholder="field.placeholder"></md-input>
            <span class="md-help-text" v-bind:class="{'md-error': field.hasError}">{{field.helpText}}</span>
          </md-input-container>
        </div>

        <div v-if="field.type == 'textarea'">
          <md-input-container v-bind:class="{'md-input-invalid': field.hasError}">
            <label> {{field.label}} </label>
            <md-textarea v-model="field.value" :placeholder="field.placeholder" :maxlength="field.counter"></md-textarea>
            <span class="md-help-text">{{field.helpText}}</span>
          </md-input-container>
        </div>

        <div v-if="field.type == 'dropdown'" class="select-prev">
          <md-input-container v-bind:class="{'md-input-invalid': field.hasError}">
            <label> {{field.label}} </label>
            <md-select name="movie" id="movie" v-model="field.optionValue">
              <md-option :id="'r-select-' + optionIndex" v-for="(option, optionIndex) in field.options" v-bind:key="optionIndex" :value="option.label">{{option.label}}</md-option>
            </md-select>
            <span class="md-help-text">{{field.helpText}}</span>
          </md-input-container>
        </div>

        <div class="radio-buttons" v-if="field.type == 'radio'" v-bind:class="{'md-input-invalid': field.hasError}">
            <label> {{field.label}} </label>
            <md-radio v-model="field.optionValue" :id="'r-option-' + optionIndex" :name="field.label" v-for="(option, optionIndex) in field.options" v-bind:key="optionIndex" :md-value="option.value">{{option.label}}</md-radio>
            <span class="md-help-text">{{field.helpText}}</span>
        </div>

        <div class="checkbox" v-if="field.type == 'checkbox'" v-bind:class="{'md-input-invalid': field.hasError}">
          <label> {{field.label}} </label>
          <md-checkbox v-model="option.isChecked" v-for="(option, optionIndex) in field.options" v-bind:key="optionIndex">{{option.label}}</md-checkbox>
          <span class="md-help-text">{{field.helpText}}</span>
        </div>
      </div>
    </div>
    <transition name="fade">
      <div class="field-edit" v-if="field.isEditMode">
        <div class="input-container">
          <md-input-container style="width: 60%;" class="mini-select">
            <label for="">Type</label>
            <md-select name="movie" id="movie" v-model="field.type" md-menu-class="mini-select">
              <md-option value="text">Text</md-option>
              <md-option value="textarea">Text area</md-option>
              <md-option value="dropdown">Dropdown</md-option>
              <md-option value="radio">Radio buttons</md-option>
              <md-option value="checkbox">Checkbox</md-option>
            </md-select>
          </md-input-container>
        </div>
        <div class="input-container">
          <label for="">Label</label>
          <div class="field-input">
            <input type="text" v-model="field.label" class="nm-input">
          </div>
        </div>
        <div class="input-container">
          <label for="">Placeholder</label>
          <div class="field-input">
            <input type="text" v-model="field.placeholder" class="nm-input">
          </div>
        </div>
        <div class="input-container">
          <label for="">Help text</label>
          <div class="field-input">
            <input type="text" v-model="field.helpText" class="nm-input">
          </div>
        </div>
        <div class="input-container">
          <div class="field-input">
            <label for="">
              <input type="checkbox" v-model="field.hasError"></input>Has error?
            </label>
          </div>
        </div>
        <div class="input-container" v-if="field.type != 'radio' && field.type != 'checkbox' && field.type != 'dropdown'">
          <label for="">Value</label>
          <div class="field-input">
            <input type="text" v-if="field.type != 'textarea'" v-model="field.value" class="nm-input">
            <textarea style="height: 80px;" type="text" v-if="field.type == 'textarea'" v-model="field.value" class="nm-input"></textarea>
          </div>
        </div>

        <div class="input-container" v-if="field.type == 'textarea'" >
          <label for="">Max length</label>
          <div class="field-input">
            <input type="number" v-model="field.counter" step="5" class="nm-input mini">
          </div>
        </div>


        <!--<div class="input-container">
          <label for="">Width</label>
          <div class="field-input">
            <input type="number" v-model="field.width" step="5" min='0' max="100" class="nm-input mini">
            <input type="range" step="5" v-model="field.width"  min='0' max="100" class="nm-input">
          </div>
        </div>-->

        <!--<div v-if="field.type == 'radio' || field.type == 'checkbox'" >
          <div class="input-container">
            <label for="">Options layout</label>
            <div class="field-input">
              <label><input type="radio" name="options-layout" value="h" v-model="field.optionsLayout"> Horizontal</label>
              <label><input type="radio" name="options-layout" value="v" v-model="field.optionsLayout"> Vertical</label>
            </div>
          </div>
        </div>-->

        <div v-if="field.type == 'radio' || field.type == 'checkbox' || field.type == 'dropdown'">
          <div class="input-container">
            <label for="">Options </label>
            <div class="options-container list-item" v-for="(option, optionIndex) in field.options" v-bind:item="option" v-bind:key="optionIndex">
              <div class="field-input-type">

                <md-radio v-if="field.type == 'radio' || field.type == 'dropdown'" v-model="field.optionValue" :id="'r-option-' + optionIndex" name="option" :md-value="option.value"></md-radio>

                <md-checkbox v-if="field.type == 'checkbox'" v-model="option.isChecked" :id="'r-option-' + optionIndex" name="option" :md-value="option.value"></md-checkbox>
              </div>
              <div class="field-input">
                <input type="text" v-model="option.label" class="nm-input" @focus="$event.target.select()">
              </div>
              <div class="option-actions">
                <md-button class="md-icon-button" @click.native="removeOption(optionIndex)" tabindex="-1">
                  <md-icon>delete</md-icon>
                </md-button>
              </div>
            </div>

            <div class="add-option" @click="addAnotherOption(field)"> + Add another option</div>
          </div>
        </div>

        <div class="input-container">
          <label for=""></label>
          <div class="field-input">
            <!--<md-button class="md-raised md-primary m0" @click.native="doneEditing(rowIndex, fieldIndex)">Done</md-button>-->
          </div>
        </div>
        </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'Field',
  props: ['field', 'rowIndex', 'fieldIndex'],
  methods: {
    removeOption(optionIndex) {
      this.field.options.splice(optionIndex, 1);
    },
    addAnotherOption() {
      const option = {
        label: `Option ${this.field.options.length + 1}`,
        value: `Option ${this.field.options.length + 1}`,
        isChecked: false,
      };

      this.field.options.push(option);
    },
    removeField() {
      this.rows[this.rowIndex].fields.splice(this.fieldIndex, 1);
      if (this.rows[this.rowIndex].fields.length === 0) {
        this.rows.splice(this.rowIndex, 1);
      }
    },
    enableEdit() {
      this.hideAllEditPanels();
      this.field.isEditMode = true;
    },
    hideAllEditPanels() {
      for (let i = 0; i < this.rows.length; i += 1) {
        for (let j = 0; j < this.rows[i].fields.length; j += 1) {
          this.rows[i].fields[j].isEditMode = false;
        }
      }
    },
  },
  computed: {
    rows() {
      return this.$store.state.form.rows;
    },
  },
};
</script>

<style scoped lang="scss">

$timing-funciton: cubic-bezier(.62,.28,.23,.99);

.field {
  transition: width $timing-funciton 0.7s;
}

.input-container {
  display: flex;
  padding: 8px;
  flex-direction: column;

  label {
    color: #333;
    padding-right: 24px;
    font-size: 12px;
  }

  .nm-input {
    border: solid 1px #ddd;
    font-size: 12px;
    height: 28px;
    width: 100%;
    padding: 0 4px;
    border-radius: 2px;
    &:focus {
      user-select: all;
    }
    &.mini {
      width: 25%;
    }
  }

  .field-input {
    flex: 1;
  }
}

.radio-buttons, .checkbox {
  label {
    display: block;
    font-size: 12px;
    color: rgba(0, 0, 0, .54);
  }

  .md-help-text {
    display: block;
    font-size: 12px;
    color: rgba(0, 0, 0, .54);
  }

  .md-radio, .md-checkbox {
    display: flex;
  }
}

.md-input-container.md-input-invalid .md-error {
  transform: translate3d(0, -8px, 0);
}

.md-button.m0 {
  margin: 0;
}

.select-prev {
  .md-count {
    display: none;
  }
}


.field-edit-preview {
  // pointer-events: none !important;
}

.field-edit {
  padding: 16px;
  // box-shadow: 0 16px 24px 2px rgba(0, 0, 0, .14), 0 6px 30px 5px rgba(0, 0, 0, .12), 0 8px 10px -5px rgba(0, 0, 0, .2);
  border-left: solid 1px #ddd;
  position: fixed;
  right: 0;
  top: 42px;
  bottom: 64px;
  min-width: 280px;
  background: #f8f8f8;
  z-index: 999;
  overflow-y: scroll;
}

.field-preview {
  padding: 8px 16px;
  position: relative;
  transition: all $timing-funciton 0.33s;
  border-radius: 4px;

  input, label, span {
    pointer-events: none;
  }

  &:hover {
    background: #f8f8f8;
    cursor: pointer;
    .field-acitons {
      opacity: 1;
    }
  }
  &.active {
    box-shadow: 0 0 5px #888;
    border-radius: 3px;
    background: #fefefe;
  }
}

.field-acitons {
  position: absolute;
  right: 0;
  top: 0;
  opacity: 0;
  z-index: 99;
  background: #e0e0e0;
  border-radius: 0 0 0 4px;
  transition: opacity $timing-funciton 0.3s;

  .md-button {
    margin: 0;
  }

  .md-icon {
    color: #757575;
    transform: scale(0.9);
  }

}


.md-input-container .md-help-text {
  display: block!important;
  left: 0;
  transform: translate3d(0,-8px,0);
  transition: all .3s cubic-bezier(.55,0,.55,.2);

  // height: 20px;
  position: absolute;
  bottom: -32px;
  font-size: 12px;
  color: #757575;
}

.add-option {
  font-size: 12px;
  margin: 8px 0;
  padding: 0 8px;
  display: flex;
  align-items: center;
  height: 32px;
  border: dashed 1px #eee;
  cursor: pointer;
  &:hover {
    background: #f8f8f8;
  }
}

.options-container {
  display: flex;
  align-content: center;
  align-items: center;
}

.option-actions {
  margin-right: -16px;
  .md-button {
    transform: scale(0.8);
    color: #757575;
  }
}

.fade-enter-active, .fade-leave-active {
  transition: all 0.4s $timing-funciton;
}

.fade-enter, .fade-leave-to {
  transform: translate3d(100%, 0, 0);
}

.fade-leave, .fade-enter-to {
  transform: translate3d(0, 0, 0);
}

@keyframes slideInRight {
  from {
    transform: translate3d(100%, 0, 0);
    visibility: visible;
  }

  to {
    transform: translate3d(0, 0, 0);
  }
}

.slideInRight {
  animation-name: slideInRight;
  animation-duration: 0.4s;
  animation-fill-mode: both;
  animation-timing-function: $timing-funciton;
}


.md-input-invalid {
  label {
    color: red;
  }
  .md-help-text {
    color: red;
  }
}

.md-theme-default.md-input-container.md-input-invalid input {
  color: rgba(0,0,0,.87);
}

</style>

<style lang="scss">
.mini-select {
  .md-list-item .md-list-item-container {
    min-height: 32px;
    font-size: 13px;
  }

  .md-select .md-select-value {
    font-size: 13px;
  }
}
</style>
