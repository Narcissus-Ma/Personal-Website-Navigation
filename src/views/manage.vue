<template>
  <div class="page-container">
    <div class="main-content">
      <nav class="navbar user-info-navbar" role="navigation">
        <ul class="user-info-menu left-links list-inline list-unstyled">
          <li class="hidden-sm hidden-xs">
            <router-link to="/" class="btn btn-white btn-sm">返回首页</router-link>
          </li>
        </ul>
      </nav>

      <div class="row">
        <div class="col-md-12">
          <div class="panel panel-default">
            <div class="panel-heading">
              <h3 class="panel-title">添加网站</h3>
            </div>
            <div class="panel-body">
              <form @submit.prevent="handleSubmit" class="form-horizontal">
                <div class="form-group">
                  <label class="col-sm-2 control-label">分类</label>
                  <div class="col-sm-10">
                    <select v-model="form.categoryIndex" class="form-control">
                      <option v-for="(category, index) in categories" 
                              :key="index" 
                              :value="index">
                        {{ category.name }}
                      </option>
                    </select>
                  </div>
                </div>

                <div class="form-group">
                  <label class="col-sm-2 control-label">网站名称</label>
                  <div class="col-sm-10">
                    <input type="text" v-model="form.title" class="form-control" required>
                  </div>
                </div>

                <div class="form-group">
                  <label class="col-sm-2 control-label">网站链接</label>
                  <div class="col-sm-10">
                    <input type="url" v-model="form.url" class="form-control" required>
                  </div>
                </div>

                <div class="form-group">
                  <label class="col-sm-2 control-label">Logo链接</label>
                  <div class="col-sm-10">
                    <input type="url" v-model="form.logo" class="form-control" required>
                  </div>
                </div>

                <div class="form-group">
                  <label class="col-sm-2 control-label">描述</label>
                  <div class="col-sm-10">
                    <input type="text" v-model="form.desc" class="form-control">
                  </div>
                </div>

                <div class="form-group">
                  <div class="col-sm-offset-2 col-sm-10">
                    <button type="submit" class="btn btn-info">添加</button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <!-- Category Management -->
          <div class="panel panel-default">
            <div class="panel-heading">
              <h3 class="panel-title">分类管理</h3>
            </div>
            <div class="panel-body">
              <!-- Add new category form -->
              <form @submit.prevent="handleCategorySubmit" class="form-horizontal">
                <div class="form-group">
                  <label class="col-sm-2 control-label">分类名称</label>
                  <div class="col-sm-10">
                    <input type="text" v-model="categoryForm.name" class="form-control" required>
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-sm-2 control-label">英文名称</label>
                  <div class="col-sm-10">
                    <input type="text" v-model="categoryForm.en_name" class="form-control" required>
                  </div>
                </div>
                <div class="form-group">
                  <label class="col-sm-2 control-label">图标类名</label>
                  <div class="col-sm-10">
                    <input type="text" v-model="categoryForm.icon" class="form-control" required placeholder="例如: linecons-star">
                  </div>
                </div>
                <div class="form-group">
                  <div class="col-sm-offset-2 col-sm-10">
                    <button type="submit" class="btn btn-info">添加分类</button>
                  </div>
                </div>
              </form>

              <!-- Category list -->
              <table class="table mt-4">
                <thead>
                  <tr>
                    <th>图标</th>
                    <th>分类名称</th>
                    <th>英文名称</th>
                    <th>网站数量</th>
                    <th>操作</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(category, index) in categories" :key="index">
                    <td><i :class="category.icon"></i></td>
                    <td>
                      <div v-if="editingCategory === index">
                        <input type="text" v-model="category.name" class="form-control input-sm">
                      </div>
                      <span v-else>{{ category.name }}</span>
                    </td>
                    <td>
                      <div v-if="editingCategory === index">
                        <input type="text" v-model="category.en_name" class="form-control input-sm">
                      </div>
                      <span v-else>{{ category.en_name }}</span>
                    </td>
                    <td>{{ category.web ? category.web.length : 0 }}</td>
                    <td>
                      <button v-if="editingCategory === index" 
                              class="btn btn-success btn-sm" 
                              @click="saveCategory()">
                        保存
                      </button>
                      <button v-else 
                              class="btn btn-primary btn-sm" 
                              @click="editCategory(index)">
                        编辑
                      </button>
                      <button class="btn btn-danger btn-sm" 
                              @click="deleteCategory(index)"
                              :disabled="categories.length <= 1">
                        删除
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Search Engines Management -->
          <div class="panel panel-default">
            <div class="panel-heading">
              <h3 class="panel-title">搜索引擎管理</h3>
            </div>
            <div class="panel-body">
              <!-- Add default engine selector -->
              <div class="form-horizontal">
                <div class="form-group">
                  <label class="col-sm-2 control-label">默认搜索引擎</label>
                  <div class="col-sm-10">
                    <select v-model="defaultEngine" class="form-control" @change="handleDefaultEngineChange">
                      <option v-for="(engine, index) in searchEngines" 
                              :key="index" 
                              :value="index">
                        {{ engine.name }}
                      </option>
                    </select>
                  </div>
                </div>
              </div>

              <hr>

              <form @submit.prevent="handleSearchEngineSubmit" class="form-horizontal">
                <div class="form-group">
                  <label class="col-sm-2 control-label">引擎名称</label>
                  <div class="col-sm-10">
                    <input type="text" v-model="searchEngineForm.name" class="form-control" required>
                  </div>
                </div>

                <div class="form-group">
                  <label class="col-sm-2 control-label">图标链接</label>
                  <div class="col-sm-10">
                    <input type="url" v-model="searchEngineForm.icon" class="form-control" required>
                  </div>
                </div>

                <div class="form-group">
                  <label class="col-sm-2 control-label">搜索URL</label>
                  <div class="col-sm-10">
                    <input type="text" v-model="searchEngineForm.url" class="form-control" required>
                    <small class="help-block">使用 {query} 作为搜索关键词的占位符</small>
                  </div>
                </div>

                <div class="form-group">
                  <div class="col-sm-offset-2 col-sm-10">
                    <button type="submit" class="btn btn-info">添加搜索引擎</button>
                  </div>
                </div>
              </form>

              <table class="table mt-4">
                <thead>
                  <tr>
                    <th>图标</th>
                    <th>名称</th>
                    <th>搜索URL</th>
                    <th>操作</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(engine, index) in searchEngines" :key="index">
                    <td><img :src="engine.icon" alt="" style="width: 20px; height: 20px;"></td>
                    <td>{{ engine.name }}</td>
                    <td>{{ engine.url }}</td>
                    <td>
                      <button class="btn btn-danger btn-sm" 
                              @click="deleteSearchEngine(index)">
                        删除
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- 网站列表 -->
          <div class="panel panel-default">
            <div class="panel-heading">
              <h3 class="panel-title">网站列表</h3>
            </div>
            <div class="panel-body">
              <div v-for="(category, categoryIndex) in categories" :key="categoryIndex">
                <h4>{{ category.name }}</h4>
                <table class="table">
                  <thead>
                    <tr>
                      <th>网站名称</th>
                      <th>链接</th>
                      <th>描述</th>
                      <th>移动到分类</th>
                      <th>操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(site, siteIndex) in category.web" :key="siteIndex">
                      <td>
                        <template v-if="editingSite && editingSite.categoryIndex === categoryIndex && editingSite.siteIndex === siteIndex">
                          <input type="text" v-model="editingSite.data.title" class="form-control input-sm">
                        </template>
                        <template v-else>
                          {{ site.title }}
                        </template>
                      </td>
                      <td>
                        <template v-if="editingSite && editingSite.categoryIndex === categoryIndex && editingSite.siteIndex === siteIndex">
                          <input type="url" v-model="editingSite.data.url" class="form-control input-sm">
                        </template>
                        <template v-else>
                          {{ site.url }}
                        </template>
                      </td>
                      <td>
                        <template v-if="editingSite && editingSite.categoryIndex === categoryIndex && editingSite.siteIndex === siteIndex">
                          <input type="text" v-model="editingSite.data.desc" class="form-control input-sm">
                        </template>
                        <template v-else>
                          {{ site.desc }}
                        </template>
                      </td>
                      <td>
                        <select class="form-control input-sm" 
                                @change="moveWebsite(categoryIndex, siteIndex, $event.target.value)"
                                :value="categoryIndex">
                          <option v-for="(cat, idx) in categories" 
                                  :key="idx" 
                                  :value="idx"
                                  :disabled="idx === categoryIndex">
                            {{ cat.name }}
                          </option>
                        </select>
                      </td>
                      <td>
                        <template v-if="editingSite && editingSite.categoryIndex === categoryIndex && editingSite.siteIndex === siteIndex">
                          <button class="btn btn-success btn-sm" @click="saveSiteEdit()">
                            保存
                          </button>
                          <button class="btn btn-default btn-sm" @click="cancelSiteEdit()">
                            取消
                          </button>
                        </template>
                        <template v-else>
                          <button class="btn btn-primary btn-sm" 
                                  @click="editSite(categoryIndex, siteIndex)">
                            编辑
                          </button>
                          <button class="btn btn-danger btn-sm" 
                                  @click="deleteSite(categoryIndex, siteIndex)">
                            删除
                          </button>
                        </template>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import itemsData from '../assets/data.json'

export default {
  name: 'Manage',
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

    // Ensure we're using the correct data structure
    let categories = [];
    let searchEngines = defaultSearchEngines;

    if (itemsData.categories) {
      categories = itemsData.categories;
      searchEngines = itemsData.searchEngines || defaultSearchEngines;
    } else if (Array.isArray(itemsData)) {
      categories = itemsData;
    }

    return {
      categories,
      searchEngines,
      defaultEngine: 0,
      editingCategory: null,
      editingSite: null,
      categoryForm: {
        name: '',
        en_name: '',
        icon: 'linecons-star'
      },
      form: {
        categoryIndex: 0,
        title: '',
        url: '',
        logo: 'https://img1.tucang.cc/api/image/show/e1306a391e2a2a324370bfee481f497b',
        desc: ''
      },
      searchEngineForm: {
        name: '',
        icon: '',
        url: ''
      }
    }
  },
  methods: {
    handleSubmit() {
      // 创建新网站对象
      const newSite = {
        title: this.form.title,
        url: this.form.url,
        logo: this.form.logo,
        desc: this.form.desc
      }

      // 添加到选中的分类中
      this.categories[this.form.categoryIndex].web.push(newSite)

      // 保存到文件
      this.saveToFile()

      // 重置表单
      this.form.title = ''
      this.form.url = ''
      this.form.logo = ''
      this.form.desc = ''

      alert('添加成功!')
    },

    deleteSite(categoryIndex, siteIndex) {
      if(confirm('确定要删除这个网站吗?')) {
        this.categories[categoryIndex].web.splice(siteIndex, 1)
        this.saveToFile()
      }
    },

    async saveToFile() {
      try {
        // Always save in the new format
        const dataToSave = {
          categories: this.categories,
          searchEngines: this.searchEngines
        };
        
        const response = await fetch('http://localhost:3000/api/save', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(dataToSave)
        })
        
        const result = await response.json()
        if(response.ok) {
          alert('保存成功!')
        } else {
          throw new Error(result.error)
        }
      } catch(error) {
        alert('保存失败: ' + error.message)
      }
    },

    handleDefaultEngineChange() {
      // Reorder the search engines array to put the default engine first
      const selectedEngine = this.searchEngines[this.defaultEngine];
      this.searchEngines = [
        selectedEngine,
        ...this.searchEngines.filter((_, index) => index !== this.defaultEngine)
      ];
      this.defaultEngine = 0; // Reset to 0 since the selected engine is now first
      this.saveToFile();
    },

    handleSearchEngineSubmit() {
      const newEngine = {
        name: this.searchEngineForm.name,
        icon: this.searchEngineForm.icon,
        url: this.searchEngineForm.url
      };

      // Add the new engine at the end of the list
      this.searchEngines.push(newEngine);

      // Reset form
      this.searchEngineForm.name = ''
      this.searchEngineForm.icon = ''
      this.searchEngineForm.url = ''

      // Save to file
      this.saveToFile()
      alert('搜索引擎添加成功!')
    },

    deleteSearchEngine(index) {
      if(confirm('确定要删除这个搜索引擎吗?')) {
        // Don't allow deleting if it's the last engine
        if (this.searchEngines.length <= 1) {
          alert('至少需要保留一个搜索引擎！');
          return;
        }
        
        this.searchEngines.splice(index, 1);
        // If we deleted the default engine, set the first one as default
        if (index === 0) {
          this.defaultEngine = 0;
        }
        this.saveToFile();
      }
    },

    handleCategorySubmit() {
      const newCategory = {
        name: this.categoryForm.name,
        en_name: this.categoryForm.en_name,
        icon: this.categoryForm.icon,
        web: []
      };

      this.categories.push(newCategory);
      this.saveToFile();

      // Reset form
      this.categoryForm.name = '';
      this.categoryForm.en_name = '';
      this.categoryForm.icon = 'linecons-star';

      alert('分类添加成功!');
    },

    editCategory(index) {
      this.editingCategory = index;
    },

    saveCategory() {
      this.editingCategory = null;
      this.saveToFile();
    },

    deleteCategory(index) {
      if (this.categories.length <= 1) {
        alert('必须保留至少一个分类！');
        return;
      }

      if (confirm('确定要删除这个分类吗？该分类下的所有网站也会被删除！')) {
        this.categories.splice(index, 1);
        // Update category index if needed
        if (this.form.categoryIndex >= this.categories.length) {
          this.form.categoryIndex = this.categories.length - 1;
        }
        this.saveToFile();
      }
    },

    // Add method to move website between categories
    moveWebsite(fromCategoryIndex, siteIndex, toCategoryIndex) {
      const site = this.categories[fromCategoryIndex].web[siteIndex];
      this.categories[fromCategoryIndex].web.splice(siteIndex, 1);
      this.categories[toCategoryIndex].web.push(site);
      this.saveToFile();
    },

    editSite(categoryIndex, siteIndex) {
      const site = this.categories[categoryIndex].web[siteIndex];
      this.editingSite = {
        categoryIndex,
        siteIndex,
        data: {
          title: site.title,
          url: site.url,
          desc: site.desc,
          logo: site.logo
        }
      };
    },

    saveSiteEdit() {
      if (!this.editingSite) return;
      
      const { categoryIndex, siteIndex, data } = this.editingSite;
      const site = this.categories[categoryIndex].web[siteIndex];
      
      // Update the site data
      site.title = data.title;
      site.url = data.url;
      site.desc = data.desc;
      site.logo = data.logo;
      
      // Save changes
      this.saveToFile();
      
      // Clear editing state
      this.editingSite = null;
    },

    cancelSiteEdit() {
      this.editingSite = null;
    }
  }
}
</script>

<style scoped>
.form-group {
  margin-bottom: 15px;
}

.mt-4 {
  margin-top: 20px;
}

/* Website list table styles */
.table {
  margin-bottom: 30px;
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
}

.table th {
  background-color: #f5f5f5;
  padding: 12px 8px;
  font-weight: 600;
  text-align: left;
  border-bottom: 2px solid #ddd;
}

.table td {
  padding: 12px 8px;
  vertical-align: middle;
  border-bottom: 1px solid #eee;
  word-break: break-word;
}

/* Fixed column widths for website list tables */
.table th:nth-child(1),
.table td:nth-child(1) {
  width: 20%;  /* Website Name */
}

.table th:nth-child(2),
.table td:nth-child(2) {
  width: 25%;  /* Link */
}

.table th:nth-child(3),
.table td:nth-child(3) {
  width: 25%;  /* Description */
}

.table th:nth-child(4),
.table td:nth-child(4) {
  width: 15%;  /* Move to Category */
}

.table th:nth-child(5),
.table td:nth-child(5) {
  width: 15%;  /* Operation */
  text-align: center;
}

/* Category headings in website list */
.panel-body h4 {
  margin: 25px 0 15px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
  color: #333;
}

/* Select dropdown in website list */
.table select.form-control.input-sm {
  width: 100%;
  max-width: 150px;
  display: inline-block;
}

/* Button spacing in table */
.table .btn {
  margin: 0 3px;
}

/* First category heading should not have top margin */
.panel-body h4:first-child {
  margin-top: 0;
}

/* Ensure consistent text wrapping */
.table td {
  white-space: normal;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Edit mode input styles */
.table .input-sm {
  height: 30px;
  padding: 5px 8px;
}

.table td .form-control {
  width: 100%;
}

/* Adjust button spacing in edit mode */
.table td .btn + .btn {
  margin-left: 5px;
}
</style> 