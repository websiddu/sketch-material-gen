<template>
  <div class="styles-panel">
    <div class="top-panel">
      <span>Styles</span>
    </div>
    <div class="styles-container">
      <div class="style-group" v-for="styleGroup in styles">

        <div class="style" v-for="style in styleGroup" @click="applyStyles(style)">
          <div class="style-name">
            {{style.name}}
          </div>
          <div class="style-preview">
            <div :style="style.style">{{style.prev}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Styles',
  methods: {
    applyStyles(style) {
      window.appliedStyles = encodeURI(JSON.stringify(style));
      window.location.hash = 'applyStyles';

      this.$ga.set('checkProtocolTask', (gadata) => {
        gadata.set('location', 'http://sketch-material.googleplex.com');
      });
      this.$ga.event('typography panel', 'click', style.name);
    },
  },
  data() {
    return {
      styles: {
        en: [
          {
            name: 'Button',
            prev: 'Medium (ALL CAPS) 14sp',
            style: {
              'font-size': '14px',
              'text-transform': 'uppercase',
              'font-weight': '500',
            },
          },
          {
            name: 'Caption',
            prev: 'Regular 12sp',
            style: {
              'font-size': '12px',
            },
          },
          {
            name: 'Body 1',
            prev: 'Regular 14sp(Device), Regular 13sp (Desktop)',
            style: {
              'font-size': '13px',
              'line-height': '20px',
            },
          },
          {
            name: 'Body 2',
            prev: 'Medium 14sp(Device), Meidum 13sp (Desktop)',
            style: {
              'font-size': '13px',
              'font-weight': 500,
              'line-height': '24px',
            },
          },
          {
            name: 'Subhead',
            prev: 'Regular 16sp(Device), Regular 15sp (Desktop)',
            style: {
              'font-size': '15px',
              'line-height': '24px',
            },
          },
          {
            name: 'Title',
            prev: 'Medium 20sp',
            style: {
              'font-size': '20px',
              'font-weight': 500,
            },
          },
          {
            name: 'Headline',
            prev: 'Regular 24sp',
            style: {
              'font-size': '24px',
              'line-height': '32px',
            },
          },
          {
            name: 'Display 1',
            prev: 'Regular 34sp',
            style: {
              'font-size': '34px',
              'line-height': '40px',
            },
          },
          {
            name: 'Display 2',
            prev: 'Regular 45sp',
            style: {
              'font-size': '45px',
              'line-height': '48px',
            },
          },
          {
            name: 'Display 3',
            prev: 'Regular 56sp',
            style: {
              'font-size': '56px',
              'line-height': '60px',
            },
          },
          {
            name: 'Display 4',
            prev: 'Light 112sp',
            style: {
              'font-size': '112px',
              'line-height': '132px',
              'font-weight': 300,
            },
          },
        ],
      },
    };
  },
};
</script>

<style lang="scss" scoped>
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

.styles-container {
  position: fixed;
  left: 0;
  right: 0;
  top: 40px;
  bottom: 0;
  margin: 0 auto;
  overflow-y: auto;
  overflow-x: hidden;
  padding-top: 24px;
}

.style {
  display: flex;
  align-items: center;
  padding: 8px;
  margin: 0 auto;
  cursor: pointer;
  position: relative;

  &::after{
    content: 'click to apply';
    position: absolute;
    color: #888;
    right: 16px;
    font-size: 12px;
    opacity: 0;
  }

  &:hover {
    background: #ccc;
    &::after{
      opacity: 1;
    }
  }

  .style-name {
    min-width: 120px;
    padding-right: 24px;
    color: #888;
  }
  .style-preview {
    flex: 1;
    div {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      overflow-x: auto;
      width: 100%;
    }
  }
}

</style>
