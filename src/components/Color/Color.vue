<template>
  <div class="color-panel">
    <div class="top-panel">
      <span>Color</span>
    </div>
    <div class="color-container">
      <div class="color-page">
        <div class="color-tabs">
          <div class="color-title-color" @click="changeSelection(key)" v-for="(colorGroup, key) in colorGroups" v-bind:key="key" v-bind:style="{ backgroundColor: colorGroup['500'].color}" v-bind:class="{'active': key == selectedColorGroup}"></div>
        </div>

        <div class="color-groups">
          <div class="color-group">
            <div class="color" v-for="(color, colorKey) in colorGroups[selectedColorGroup]" v-bind:key="colorKey" v-bind:style="{ backgroundColor: color.color, color: color.text}" @click="applyColor(color, colorKey, 'fill')">
              <div class="shade">{{colorKey}}</div>
              <!-- <div class="fill" @click="applyColor(color, key, 'fill')">fill</div> -->
              <div class="border" @click="applyColor(color, colorKey, 'border')"><i class="material-icons">border_outer</i></div>
              <div class="hex">{{color.color}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>

export default {
  methods: {
    changeSelection(key) {
      this.selectedColorGroup = key;
    },
    applyColor(color, key, type) {
      event.stopImmediatePropagation();
      const colorData = color;
      colorData.type = type;

      window.appliedColor = encodeURI(JSON.stringify(colorData));
      window.location.hash = 'applyColor';

      this.$ga.set('checkProtocolTask', (gadata) => {
        gadata.set('location', 'https://websiddu.github.io/sketch-material/');
      });
      this.$ga.event('color panel', 'click', `${this.selectedColorGroup} - ${key}`);
    },
  },
  computed: {
    colorGroups() {
      return this.$store.state.colors;
    },
  },
  data() {
    return {
      selectedColorGroup: 'Red',
    };
  },
};
</script>

<style scoped lang="scss">

$timing-funciton: cubic-bezier(.62,.28,.23,.99);

.color-container {
  position: fixed;
  left: 0;
  right: 0;
  top: 40px;
  bottom: 0;
  overflow: hidden;
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

.color-page {
  display: flex;
  flex-direction: row;
}

.color-groups {
  display: flex;
}

.color-group {
  margin-right: 12px;
}

.color-title {
  max-width: 100px;
  min-width: 100px;
  flex: 1;
}

.color {
  padding: 10px 15px 11px;
  display: flex;
  flex: 1;
  justify-content: space-between;
  min-width: 326px;
  font-weight: 500;
  transition: transform 0.2s $timing-funciton;
  align-items: center;

  .shade {
    flex: 1;
  }

  .border {
    font-size: 16px;
    margin-right: 20px;
    line-height: 1;
    visibility: hidden;
    transition: visibility 0.2s $timing-funciton;
  }

  &:hover {
    cursor: pointer;
    transform: scale(1.04);

    .border {
      visibility: visible;
      transition: visibility 0.2s $timing-funciton;
    }
  }

  .shade {

  }

  .hex {
    text-transform: uppercase;
    display: block;
  }
}



.color-title-color {
  width: 24px;
  height: 24px;
  transition: transform 0.2s $timing-funciton;

  &.active {
    transform: scaleX(2.3);
  }

  &:hover {
    cursor: pointer;
    transform: scaleX(2.3);
    transition: transform 0.2s $timing-funciton;
  }
}

.color-tabs {
  display: flex;
  flex-direction: column;
  margin-right: 16px;
  justify-content: space-between;
  height: calc(100vh - 40px);
}

</style>
