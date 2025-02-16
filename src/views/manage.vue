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
                      <th>操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(site, siteIndex) in category.web" :key="siteIndex">
                      <td>{{ site.title }}</td>
                      <td>{{ site.url }}</td>
                      <td>{{ site.desc }}</td>
                      <td>
                        <button class="btn btn-danger btn-sm" 
                                @click="deleteSite(categoryIndex, siteIndex)">
                          删除
                        </button>
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
    return {
      categories: itemsData,
      form: {
        categoryIndex: 0,
        title: '',
        url: '',
        logo: '',
        desc: ''
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
        const response = await fetch('http://localhost:3000/api/save', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.categories)
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
    }
  }
}
</script>

<style scoped>
.form-group {
  margin-bottom: 15px;
}
</style> 