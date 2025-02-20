<template>
  <div class="search-box">
    <div class="search-engine-select">
      <div class="current-engine" @click="toggleEngineList">
        <img :src="currentEngine.icon" :alt="currentEngine.name" class="engine-icon">
        <span class="engine-name">{{ currentEngine.name }}</span>
        <i class="fa fa-caret-down"></i>
      </div>
      <div class="engine-list" v-if="showEngineList">
        <div v-for="engine in searchEngines" 
             :key="engine.name" 
             class="engine-item"
             @click="selectEngine(engine)">
          <img :src="engine.icon" :alt="engine.name" class="engine-icon">
          <span>{{ engine.name }}</span>
        </div>
      </div>
    </div>
    <div class="search-input-wrapper">
      <input type="text" 
             v-model="searchQuery" 
             :placeholder="'在 ' + currentEngine.name + ' 中搜索...'"
             @keyup.enter="performSearch">
      <button @click="performSearch">
        <i class="fa fa-search"></i>
      </button>
    </div>
  </div>
</template>

<script>
import itemsData from '../assets/data.json'

export default {
  name: 'SearchBox',
  data() {
    const defaultSearchEngines = [
      {
        name: 'Google',
        icon: 'https://www.google.com/favicon.ico',
        url: 'https://www.google.com/search?q='
      },
      {
        name: 'Bing',
        icon: 'https://www.bing.com/favicon.ico',
        url: 'https://www.bing.com/search?q='
      },
      {
        name: 'Baidu',
        icon: 'https://www.baidu.com/favicon.ico',
        url: 'https://www.baidu.com/s?wd='
      }
    ];

    // Get search engines from data.json
    const searchEngines = itemsData.searchEngines || defaultSearchEngines;

    return {
      searchQuery: '',
      showEngineList: false,
      currentEngine: null,
      searchEngines
    }
  },
  created() {
    // The first engine in the list is always the default
    this.currentEngine = this.searchEngines[0];
  },
  methods: {
    toggleEngineList() {
      this.showEngineList = !this.showEngineList;
      // Close dropdown when clicking outside
      if (this.showEngineList) {
        document.addEventListener('click', this.closeDropdown);
      }
    },
    closeDropdown(event) {
      // Check if click is outside the dropdown
      if (!event.target.closest('.search-engine-select')) {
        this.showEngineList = false;
        document.removeEventListener('click', this.closeDropdown);
      }
    },
    selectEngine(engine) {
      this.currentEngine = engine;
      this.showEngineList = false;
      document.removeEventListener('click', this.closeDropdown);
    },
    performSearch() {
      if (this.searchQuery.trim()) {
        const searchUrl = this.currentEngine.url + encodeURIComponent(this.searchQuery)
        window.open(searchUrl, '_blank')
      }
    }
  }
}
</script>

<style scoped>
.search-box {
  display: flex;
  max-width: 600px;
  margin: 20px auto;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.search-engine-select {
  position: relative;
  padding: 8px;
  border-right: 1px solid #eee;
  min-width: 120px;
}

.current-engine {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 4px;
  white-space: nowrap;
  min-width: 100px;
  height: 40px;
}

.engine-icon {
  width: 20px;
  height: 20px;
  margin-right: 4px;
}

.engine-name {
  margin-right: 8px;
  font-size: 16px;
  line-height: 1.5;
}

.fa-caret-down {
  margin-left: auto;
}

.engine-list {
  position: absolute;
  top: 100%;
  left: 0;
  min-width: 120px;
  width: 100%;
  background: #fff;
  border: 1px solid #eee;
  border-radius: 4px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.engine-item {
  display: flex;
  align-items: center;
  padding: 8px 12px;
  cursor: pointer;
  white-space: nowrap;
}

.engine-item:hover {
  background: #f5f5f5;
}

.engine-item span {
  font-size: 16px;
  line-height: 1.5;
}

.search-input-wrapper {
  flex: 1;
  display: flex;
  align-items: center;
  padding: 8px;
}

input {
  flex: 1;
  border: none;
  outline: none;
  padding: 8px;
  font-size: 16px;
  line-height: 1.5;
  height: 40px;
}

button {
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
  color: #666;
}

button:hover {
  color: #333;
}
</style> 