<template>
  <div class="boxed-container">
    <nav class="navbar horizontal-menu navbar-fixed-top">
      <div class="navbar-inner">
        <div class="navbar-brand">
          <router-link to="/" class="logo">
            <img src="../assets/images/personal-general-logo.png" width="178" alt="" class="hidden-xs">
            <img src="../assets/images/personal-general-logo.png" width="178" alt="" class="visible-xs">
          </router-link>
        </div>
        <div class="navbar-mobile-clear"></div>
        <a href="https://github.com/Narcissus-Ma/Personal-Website-Navigation" target="_blank">
           <img style="position: absolute; top: 0; right: 0; border: 0; width: 85px;"
               src="../assets/images/user-logo.jpg"
               alt="Fork me on GitHub">
        </a>
      </div>
    </nav>

    <div class="page-container">
      <div class="main-content" style="">
        <div class="row">
          <div class="col-md-12">
            <div class="panel panel-default">
              <!-- 关于网站 -->
              <h4 class="text-gray">关于网站</h4>
              <div class="panel-body">
                <div class="row">
                  <div class="col-sm-12">
                    <blockquote>
                      <p>有一段时间我发现我的收藏夹越来越多，很难找到某个不常用的网站。
                        所以就有了这个网站，这里收集的基本都是我自己浏览器收藏夹里的网站，我平时用的相对比较多的一些都在这里。</p>
                      <br />
                    </blockquote>
                  </div>
                </div>
                
                <!-- 联系作者 -->
                <h4 class="text-gray">联系作者</h4>
                <div class="row">
                  <div class="col-sm-12">
                    <blockquote>
                      <div class="row">
                        <div class="col-sm-4 text-center">
                          <img :src="'https://img1.tucang.cc/api/image/show/3617da2bbb6b3c32bdacde706e91fcb7'" 
                               alt="WeChat QR Code" 
                               class="qr-code"
                               @error="handleQRError">
                          <p class="text-muted" style="margin-top: 10px;">扫描二维码添加作者微信</p>
                        </div>
                        <div class="col-sm-8">
                          <p>如果您有想要添加的网站，或者有任何问题或建议，欢迎通过以下方式联系我：</p>
                          <ul class="contact-list">
                            <li><i class="fa fa-weixin"></i> 微信：扫描左侧二维码</li>
                            <li><i class="fa fa-envelope"></i> 邮箱：577008637@qq.com</li>
                            <li><i class="fa fa-github"></i> GitHub：<a href="https://github.com/Narcissus-Ma" target="_blank">@Narcissus-Ma</a></li>
                            <li>
                              <i class="fa fa-coffee"></i>
                              <a href="#" @click.prevent="showDonateModal = true">请作者喝咖啡</a>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </blockquote>
                  </div>
                </div>

                <!-- 打赏二维码弹窗 -->
                <div class="modal-overlay" v-if="showDonateModal" @click="showDonateModal = false">
                  <div class="modal-content" @click.stop>
                    <div class="modal-header">
                      <h3>请作者喝咖啡</h3>
                      <button class="close-button" @click="showDonateModal = false">&times;</button>
                    </div>
                    <div class="modal-body">
                      <div class="qr-code-grid">
                        <div class="qr-code-item">
                          <img :src="wechatPayQR" alt="微信支付" class="donate-qr">
                          <p>微信支付</p>
                        </div>
                        <div class="qr-code-item">
                          <img :src="alipayQR" alt="支付宝" class="donate-qr">
                          <p>支付宝</p>
                        </div>
                      </div>
                      <p class="donate-text">感谢您的支持！</p>
                    </div>
                  </div>
                </div>

                <!-- 关于站长 -->
                <h4 class="text-gray">关于站长</h4>
                <div class="row">
                  <div class="col-sm-4">
                    <div class="xe-widget xe-conversations box2 label-info"
                         onclick="window.open('https://blog.narcissus2ma.us.kg/', '_blank')"
                         data-toggle="tooltip"
                         data-placement="bottom"
                         title=""
                         data-original-title="https://blog.narcissus2ma.us.kg/">
                      <div class="xe-comment-entry">
                        <a class="xe-user-img">
                          <img :src="authorImg" class="img-circle" width="40">
                        </a>
                        <div class="xe-comment">
                          <a href="#" class="xe-user-name overflowClip_1">
                            <strong>Narcissus</strong>
                          </a>
                          <p class="overflowClip_2"> A frontend programmer who knows a bit about backend.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-8">
                    <div class="row">
                      <div class="col-sm-12">
                        <br />
                        <blockquote>
                          <p>
                            这是一个公益项目，由原作者：Designer. Viggo.<a href="https://github.com/WebStackPage/WebStackPage.github.io"> 开源 </a>
                            <iframe src="https://ghbtns.com/github-btn.html?user=WebStackPage&repo=WebStackPage.github.io&type=star&count=true"
                                    frameborder="0" scrolling="0" width="100px" height="20px"></iframe> 的。你也可以拿来制作自己的网址导航。如果你有更好的想法，可以通过他的个人网站
                            <a href="http://www.viggoz.com">
                              <span class="label label-info" data-toggle="tooltip"
                                    data-placement="left" title=""
                                    data-original-title="Hello I am a Tooltip">viggoz.com</span>
                            </a>中的联系他。
                          </p>
                        </blockquote>
                      </div>
                    </div>
                    <br>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  </div>
</template>

<script>
import Footer from '../components/Footer.vue'

export default {
  name: 'About',
  components: {
    Footer
  },
  data() {
    return {
      authorImg: './assets/images/logos/viggoz.png',
      wechatQR: './assets/images/wechat-qr.jpg',
      wechatPayQR: 'https://img1.tucang.cc/api/image/show/247b85df82d26ba81be19f0b4da5d61f',
      alipayQR: 'https://img1.tucang.cc/api/image/show/35aa760f2a898ea748aecd8fda32f674',
      showDonateModal: false,
      contactInfo: {
        email: 'your.email@example.com',
        github: 'your-username'
      }
    }
  },
  methods: {
    handleQRError(e) {
      // If QR code fails to load, replace with a placeholder
      e.target.src = 'https://via.placeholder.com/200x200?text=QR+Code'
    }
  }
}
</script>

<style scoped>
.qr-code {
  max-width: 200px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.contact-list {
  list-style: none;
  padding-left: 0;
  margin-top: 15px;
}

.contact-list li {
  margin-bottom: 10px;
  font-size: 16px;
}

.contact-list li i {
  width: 20px;
  margin-right: 10px;
  color: #666;
}

.contact-list li a {
  color: #3498db;
  text-decoration: none;
}

.contact-list li a:hover {
  text-decoration: underline;
}

blockquote {
  border-left: 4px solid #3498db;
}

.text-gray {
  color: #666;
  border-bottom: 2px solid #eee;
  padding-bottom: 10px;
  margin-top: 30px;
}

/* QR code container styles */
.qr-code-container {
  background: #f8f9fa;
  padding: 15px;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.qr-code-container:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.qr-code {
  max-width: 200px;
  width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.qr-code:hover {
  transform: scale(1.02);
}

/* Enhanced contact list styles */
.contact-list {
  list-style: none;
  padding-left: 0;
  margin-top: 15px;
}

.contact-list li {
  margin-bottom: 15px;
  font-size: 16px;
  display: flex;
  align-items: center;
  transition: transform 0.2s ease;
}

.contact-list li:hover {
  transform: translateX(5px);
}

.contact-list li i {
  width: 24px;
  margin-right: 10px;
  color: #3498db;
}

.contact-list li a {
  color: #3498db;
  text-decoration: none;
  transition: color 0.2s ease;
}

.contact-list li a:hover {
  color: #2980b9;
  text-decoration: none;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 12px;
  padding: 20px;
  max-width: 500px;
  width: 90%;
  position: relative;
  animation: modalFadeIn 0.3s ease;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}

.modal-header h3 {
  margin: 0;
  color: #333;
  font-size: 1.5em;
}

.close-button {
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #666;
  padding: 0 8px;
  transition: color 0.2s ease;
}

.close-button:hover {
  color: #333;
}

.qr-code-grid {
  display: flex;
  justify-content: space-around;
  gap: 20px;
  margin: 20px 0;
}

.qr-code-item {
  text-align: center;
}

.donate-qr {
  width: 180px;
  height: 180px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.donate-qr:hover {
  transform: scale(1.05);
}

.qr-code-item p {
  margin-top: 10px;
  color: #666;
  font-size: 14px;
}

.donate-text {
  text-align: center;
  margin-top: 20px;
  color: #666;
  font-size: 16px;
}

@keyframes modalFadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Ensure modal is scrollable on mobile */
@media (max-width: 768px) {
  .modal-content {
    width: 95%;
    max-height: 90vh;
    overflow-y: auto;
  }
  
  .qr-code-grid {
    flex-direction: column;
    align-items: center;
  }
  
  .donate-qr {
    width: 150px;
    height: 150px;
  }
}
</style>
