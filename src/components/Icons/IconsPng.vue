<template>
  <div class="container">
    <div class="search">
      <input type="text" autofocus v-model="query">
      <div class="search-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48">
          <path d="M31 28h-1.59l-.55-.55C30.82 25.18 32 22.23 32 19c0-7.18-5.82-13-13-13S6 11.82 6 19s5.82 13 13 13c3.23 0 6.18-1.18 8.45-3.13l.55.55V31l10 9.98L40.98 38 31 28zm-12 0c-4.97 0-9-4.03-9-9s4.03-9 9-9 9 4.03 9 9-4.03 9-9 9z" fill='#888'/>
          <path d="M0 0h48v48H0z" fill="none"/>
        </svg>
      </div>
      <div class="color-picker">
      <div data-id="grey600" v-bind:style="{'background-color': colors[selectedColor]}" class="color selectedColor"></div>
        <md-select name="color" id="color" v-model="selectedColor">
          <md-option :value="key" v-for="(color, key) in colors" :key="color">
            <div class="color" v-bind:style="{'background-color': color}"></div>
          </md-option>
        </md-select>
      </div>
    </div>
    <div class="search-results" id="search-results" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="200">
      <div class="padding"></div>
        <div class="groups">
          <div v-for="(group, key) in groupBy(iconsToShow)">
            <div class="group-title">
              {{groupName(key)}}
              <br />
            </div>
            <div class="cells">
              <div v-for="icon of group" class="cell">
                  <img class="animated fadeIn" :data-name='icon.image' :src="basePath + 'google-assets/' + icon.image" alt="">
                  <div class="icon-name">{{icon.name}}</div>
              </div>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as _ from 'lodash';

export default {
  name: 'Icons',
  methods: {
    groupName(key) {
      const group = this.groups.find((item) => {
        if (item.data.id === key) {
          return true;
        }
        return null;
      });
      return group.data.name;
    },
    groupBy(rows) {
      return _.groupBy(rows, 'group_id');
    },
    loadMore() {
      const nextPage = this.searchResults.slice(this.iconsToShow.length,
        this.iconsToShow.length + this.paginationSize);
      if (nextPage.length > 0) {
        this.iconsToShow = this.iconsToShow.concat(nextPage);
      }
    },
    loadData() {
      this.$http.get('./static/icons.png.json').then((response) => {
        this.icons = response.body.icons;
        this.groups = response.body.groups;
        this.basePath = response.body.base_path;

        this.searchResults = this.icons;
        this.iconsToShow = this.icons.slice(0, this.paginationSize);
      }, (response) => {
        console.log(response);
      });
    },
    isGlif(groupId) {
      const groups = ['avatars_and_widgets', 'alphabet_logos', 'internal_logos',
        'non_material_product_logos', 'product_logos'];
      return !groups.includes(groupId);
    },
    dragEnd(icon) {
      const isGlif = this.isGlif(icon.group_id);
      const colorExtension = isGlif ? `_${this.selectedColor}` : '';
      const data = {
        name: icon.id + colorExtension,
        colorName: this.selectedColor,
        colorValue: this.colors[this.selectedColor],
        isGlif,
      };
      this.$ga.event('icons panel', 'dragged', data.name);
      window.draggedIcon = encodeURI(JSON.stringify(data));
      window.location.hash = 'drag-end';
    },
    handleBlur() {
      window.location.hash = 'onWindowDidBlur';
    },
  },
  watch: {
    query(val) {
      // if (!val) {
      //   this.searchResults = this.icons;
      //   return;
      // }
      const searchResults = this.icons.filter((icon) => {
        const nameSearch = icon.name.toLowerCase().indexOf(val.toLowerCase()) > -1;
        const keywords = icon.keywords.join(' ');
        let isKeyword = true;
        const queryWords = val.split(' ');

        for (let i = 0; i < queryWords.length; i += 1) {
          if (keywords.indexOf(queryWords[i]) === -1) {
            isKeyword = false;
          }
        }
        return nameSearch || isKeyword;
      });
      this.searchResults = searchResults;
      this.iconsToShow = searchResults.slice(0, this.paginationSize);
    },
  },
  computed: {

  },
  mounted() {
    this.loadData();
    // window.onblur = this.handleBlur;
  },
  data() {
    return {
      icons: [],
      icon: null,
      iconsToShow: [],
      groups: [],
      basePath: '',
      query: '',
      searchResults: [],
      paginationSize: 100,
      selectedColor: 'grey600',
      colors: {
        grey600: '#757575',
        black: '#000000',
        white: '#FFFFFF',
        googblue: '#4285F4',
      },
    };
  },
};

</script>
<style scoped lang="scss">

$minwidth: 300px;
$cols: 6;
$cell: 60px;
$icon: 32px;
$search-height: 32px;

.container {
  min-width: $minwidth;
  margin: 0 auto;
  background: #fff;
  min-height: 300px;
  font-family: "Roboto", -apple-system, BlinkMacSystemFont, "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", "Helvetica", "Arial", sans-serif;
}

.search {
  background: #3F51B5;
  padding: 16px;
  display: flex;
  // width: $width - 16px - 16px;
  top: 0;
  align-items: center;

  .search-icon {
    position: absolute;
    left: 21px;
    top: 21px;
  }

  input {
    height: $search-height;
    width: 100%;
    border: 0;
    font-size: 13px;
    padding: 8px;
    box-sizing: border-box;
    border-radius: 4px;
    font-family: inherit;
    border: 1px solid rgba(0,0,0,0);
    transition: background 100ms ease-in,
      width 100ms ease-out;
    background: rgba(255,255,255,0.9);
    padding-left: 32px;
    &:focus {
      background: #fff;
      outline: 0;
      box-shadow: 0 1px 1px rgba(255, 255, 255, 0.24);
    }
  }
}

.search-results {
  position: fixed;
  left: 0;
  right: 0;
  top: $search-height + 16 + 16;
  bottom: 0;
  overflow-x: auto;
  // width: $width;
  background: #fff;
}

.icon-name {
  text-align: center;
  color: #757575;
  font-size: 10px;
  margin-top: 5px;
  overflow: hidden;
  text-align: center;
  visibility: hidden;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  height: 22px;
  display: none;
}

.group-title {
  padding: 8px 16px 24px;
  color: #888;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 500;
  &:first-child {
    margin-top: 16px;
  }
}

.cells {
  display: flex;
  flex-wrap: wrap;
  .cell {
    flex-basis: 20%;
    display: flex;
    min-height: $cell;
    align-items: center;
    flex-direction: column;
    margin-bottom: 16px;
    &:hover {
      .icon-name {
        visibility: visible;
        -webkit-user-select: all;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        display: inline;
      }
    }
    img {
      width: $icon;
      display: inline-block;
      margin: 0 auto;
      // opacity: 0;
      transition: all cubic-bezier(0.165, 0.84, 0.44, 1) 0.4s;
      &.ng2-lazyloaded {
        // opacity: 1;
      }
    }
  }
}

.animated {
  animation-duration: 0.4s;
  animation-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1) 0.4s;
}


@-webkit-keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

.fadeIn {
  -webkit-animation-name: fadeIn;
  animation-name: fadeIn;
}


@media only screen and (min-width: 400px) {
  .cells {
    .cell {
      flex-basis: 20%;
    }
  }
}

@media only screen and (min-width: 600px) {
  .cells {
    .cell {
      flex-basis: 12.5%;
    }
  }
}

@media only screen and (min-width: 800px) {
  .cells {
    .cell {
      flex-basis: 10%;
    }
  }
}

@media only screen and (min-width: 1000px) {
  .cells {
    .cell {
      flex-basis: 5%;
    }
  }
}

.color-picker {
  width: 24px;
  margin-left: 16px;
  position: relative;
}

.md-select-content {
  width: 44px !important;
  min-width: 44px !important;
  .md-button {
    min-width: 42px;
    padding: 0 12px;
    min-height: 32px;
  }
}

.md-list-item .md-list-item-container {
  min-height: 32px !important;
  padding: 0 12px !important;
}

.color {
  height: 20px;
  width: 20px;
  border-radius: 20px;
  background: #757575;
  border: solid 3px #f5f5f5;
  cursor: pointer;
  &:hover {
    border: solid 3px #ccc;
  }
}

.selectedColor {
  position: absolute;
  top: 6px;
}

</style>
