# Portfolio Kit - 个人作品集网站

一个基于Bootstrap 5构建的现代化个人作品集网站模板，专为设计师、开发者和创意工作者设计。

## 🎯 功能特性

- **响应式设计**: 使用Bootstrap 5网格系统，完美适配所有设备
- **现代化UI**: 简洁优雅的设计风格，突出作品展示
- **交互体验**: 平滑滚动、悬停效果、动画过渡
- **组件化**: 基于Bootstrap组件的模块化设计
- **性能优化**: 轻量级代码，快速加载

## 🏗️ 技术架构

### 前端框架
- **Bootstrap 5.3.0**: 响应式CSS框架
- **Bootstrap Icons**: 图标库
- **原生JavaScript**: 轻量级交互逻辑

### 文件结构
```
portfolio/
├── index.html          # 首页 (Homepage)
├── work.html           # 作品集页面
├── about.html          # 关于页面
├── css/
│   ├── common.css      # 通用样式
│   └── home.css        # 首页专用样式
├── js/
│   ├── common.js       # 通用功能
│   └── home.js         # 首页专用功能
└── assets/             # 静态资源
```

## 🚀 快速开始

### 1. 克隆项目
```bash
git clone <repository-url>
cd portfolio
```

### 2. 本地预览
直接在浏览器中打开 `index.html` 文件，或使用本地服务器：

```bash
# 使用Python
python -m http.server 8000

# 使用Node.js
npx serve .

# 使用PHP
php -S localhost:8000
```

### 3. 访问网站
打开浏览器访问 `http://localhost:8000`

## 📱 页面结构

### Homepage (index.html)
- **Hero区域**: 个人介绍和主要CTA按钮
- **项目展示**: 三个主要项目的特色展示
- **更多作品**: 项目卡片网格布局
- **联系区域**: 联系表单和社交媒体链接
- **查看所有作品**: 跳转到Work页面的入口

### Work页面 (work.html)
- 与Homepage内容完全一致
- 专门用于作品集展示
- 底部导航链接到其他页面

### 信息架构
```
Level 0: Homepage (首页)
Level 1: Work (作品集) | About (关于) | Resume (简历)
Level 2: 各种Project (在Work页面内部)
```

## 🎨 自定义指南

### 修改内容
1. **个人信息**: 在HTML文件中更新姓名、描述、社交媒体链接
2. **项目信息**: 修改项目标题、描述、标签和图片
3. **颜色主题**: 在CSS中调整Bootstrap变量或自定义样式

### 添加新页面
1. 创建新的HTML文件
2. 复制现有页面的基础结构
3. 引入Bootstrap CSS和JS
4. 添加页面专用样式和脚本

### 修改样式
- **Bootstrap类**: 使用Bootstrap的实用工具类快速调整
- **自定义CSS**: 在对应的CSS文件中添加自定义样式
- **响应式**: 使用Bootstrap的断点类进行响应式调整

## 🔧 开发指南

### Bootstrap组件使用
- **导航栏**: `navbar`, `navbar-expand-lg`, `navbar-light`
- **按钮**: `btn`, `btn-dark`, `btn-outline-dark`
- **卡片**: `card`, `card-body`, `card-title`
- **网格**: `container`, `row`, `col-lg-6`
- **工具类**: `d-flex`, `justify-content-center`, `text-center`

### JavaScript功能
- **导航高亮**: 自动检测当前页面并高亮对应导航项
- **平滑滚动**: 内部链接的平滑滚动效果
- **回到顶部**: 滚动时显示回到顶部按钮
- **滚动动画**: 元素进入视口时的动画效果

### 响应式断点
- **xs**: < 576px (手机)
- **sm**: ≥ 576px (大手机)
- **md**: ≥ 768px (平板)
- **lg**: ≥ 992px (桌面)
- **xl**: ≥ 1200px (大桌面)
- **xxl**: ≥ 1400px (超大桌面)

## 📱 移动端适配

### 导航栏
- 大屏幕: 水平导航菜单
- 小屏幕: 汉堡菜单折叠式导航

### 布局调整
- 项目展示: 大屏幕左右布局，小屏幕垂直布局
- 卡片网格: 大屏幕2列，小屏幕1列
- 设备预览: 响应式尺寸调整

## 🚀 部署说明

### 静态托管
- **GitHub Pages**: 直接推送代码到GitHub仓库
- **Netlify**: 拖拽部署或连接Git仓库
- **Vercel**: 自动部署和预览

### 服务器部署
- 上传所有文件到Web服务器
- 确保服务器支持静态文件服务
- 配置正确的MIME类型

## 🔍 性能优化

### 代码优化
- 使用Bootstrap CDN减少本地文件
- 压缩CSS和JavaScript文件
- 优化图片大小和格式

### 加载优化
- 关键CSS内联
- 延迟加载非关键JavaScript
- 使用WebP格式图片

## 🐛 故障排除

### 常见问题
1. **样式不加载**: 检查Bootstrap CDN链接
2. **响应式失效**: 确保viewport meta标签正确
3. **JavaScript错误**: 检查控制台错误信息

### 调试技巧
- 使用浏览器开发者工具
- 检查网络请求状态
- 验证HTML结构完整性

## 📚 学习资源

### Bootstrap文档
- [Bootstrap 5 官方文档](https://getbootstrap.com/docs/5.3/)
- [Bootstrap Icons](https://icons.getbootstrap.com/)
- [Bootstrap 示例](https://getbootstrap.com/docs/5.3/examples/)

### 响应式设计
- [CSS Grid 指南](https://css-tricks.com/snippets/css/complete-guide-grid/)
- [Flexbox 指南](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)

## 🤝 贡献指南

欢迎提交Issue和Pull Request来改进这个项目！

### 贡献方式
1. Fork项目
2. 创建功能分支
3. 提交更改
4. 推送到分支
5. 创建Pull Request

## 📄 许可证

本项目采用MIT许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

- [Bootstrap团队](https://getbootstrap.com/) - 优秀的CSS框架
- [Figma社区](https://www.figma.com/) - 设计灵感和模板
- 所有贡献者和用户的支持

---

**开始使用**: 克隆项目并打开 `index.html` 开始你的作品集之旅！
