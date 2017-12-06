import Vue from 'vue';
import Vuex from 'vuex';
import colors from './md-color';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    colors,
    field: {
      label: 'Label...',
      type: 'text',
      isEditMode: true,
      value: 'Text field value',
      helpText: 'This is the help text',
      counter: 300,
      width: 100,
      placeholder: 'Placeholder...',
      optionsLayout: 'v',
      optionValue: 'Option 1',
      hasError: false,
      options: [
        {
          label: 'Option 1',
          value: 'Option 1',
          isChecked: false,
        },
        {
          label: 'Option 2',
          value: 'Option 2',
          isChecked: false,
        },
      ],
    },
    form: {
      rows: [
        {
          fields: [
            {
              type: 'text',
              isEditMode: true,
              width: 100,
              label: 'Label',
              placeholder: 'Placeholder',
              helpText: 'Help text or Error',
              counter: 300,
              value: 'Value',
              optionsLayout: 'v',
              optionValue: 'Option 1',
              hasError: false,
              options: [
                {
                  label: 'Option 1',
                  value: 'Option 1',
                  isChecked: false,
                },
                {
                  label: 'Option 2',
                  value: 'Option 2',
                  isChecked: false,
                },
              ],
            },
          ],
        },
      ],
    },
  },
});
