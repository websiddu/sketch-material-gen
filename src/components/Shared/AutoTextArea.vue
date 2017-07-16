<template>
  <textarea @input="handleChange" >{{ val }}</textarea>
</template>

<script>

import autosize from 'autosize';

export default {
  name: 'AutoTextArea',
  props: ['handle-change', 'val'],
  mounted() {
    autosize(this.$el);
  },
};

</script>
