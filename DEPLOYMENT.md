# 🚀 部署说明 - GitHub Pages

## 📋 部署前检查清单

在部署到GitHub之前，请确保以下文件都已正确创建：

### ✅ 必需文件
- [x] `index.html` - 首页
- [x] `work.html` - 作品集页面
- [x] `about.html` - 关于页面
- [x] `resume.html` - 简历页面
- [x] `css/common.css` - 通用样式
- [x] `css/home.css` - 首页样式
- [x] `css/about.css` - 关于页面样式
- [x] `css/resume.css` - 简历页面样式
- [x] `js/common.js` - 通用功能
- [x] `js/home.js` - 首页功能
- [x] `js/about.js` - 关于页面功能
- [x] `js/resume.js` - 简历页面功能
- [x] `README.md` - 项目说明

## 🔧 GitHub部署步骤

### 1. 创建GitHub仓库
```bash
# 在GitHub上创建新仓库
# 仓库名称: your-username.github.io
# 确保仓库是公开的
```

### 2. 初始化本地Git仓库
```bash
# 进入项目目录
cd your-portfolio-directory

# 初始化Git仓库
git init

# 添加远程仓库
git remote add origin https://github.com/your-username/your-username.github.io.git
```

### 3. 添加文件到Git
```bash
# 添加所有文件
git add .

# 提交更改
git commit -m "Initial commit: Portfolio website with Bootstrap"

# 推送到GitHub
git push -u origin main
```

### 4. 启用GitHub Pages
1. 进入GitHub仓库页面
2. 点击 `Settings` 标签
3. 在左侧菜单中找到 `Pages`
4. 在 `Source` 部分选择 `Deploy from a branch`
5. 选择 `main` 分支和 `/ (root)` 文件夹
6. 点击 `Save`

### 5. 等待部署完成
- GitHub Pages通常需要几分钟时间部署
- 部署完成后，你的网站将在 `https://your-username.github.io` 上线

## 🌐 自定义域名（可选）

如果你想使用自定义域名：

1. 在GitHub Pages设置中添加自定义域名
2. 在你的域名提供商处添加CNAME记录
3. 等待DNS传播完成（可能需要24-48小时）

## 📱 测试部署

部署完成后，请测试以下功能：

### 页面导航
- [ ] 首页 (`index.html`) 正常显示
- [ ] 作品集页面 (`work.html`) 正常显示
- [ ] 关于页面 (`about.html`) 正常显示
- [ ] 简历页面 (`resume.html`) 正常显示
- [ ] 导航链接正常工作
- [ ] 响应式设计在不同设备上正常

### 功能测试
- [ ] Bootstrap样式正常加载
- [ ] 按钮交互正常
- [ ] 滚动动画正常
- [ ] 联系表单正常（如果实现）
- [ ] 下载和打印功能正常（简历页面）

## 🐛 常见问题解决

### 样式不显示
- 检查Bootstrap CDN链接是否正常
- 确保CSS文件路径正确
- 检查浏览器控制台是否有错误

### 页面无法访问
- 确认GitHub Pages已启用
- 检查仓库是否为公开
- 等待部署完成（可能需要几分钟）

### 导航链接失效
- 检查HTML文件中的链接路径
- 确保文件名大小写正确
- 验证GitHub Pages的URL结构

## 🔄 更新网站

每次更新代码后：

```bash
# 添加更改
git add .

# 提交更改
git commit -m "Update: 描述你的更改"

# 推送到GitHub
git push origin main
```

GitHub Pages会自动重新部署你的网站。

## 📞 获取帮助

如果遇到问题：

1. 检查GitHub Pages设置
2. 查看GitHub Actions日志
3. 在GitHub Issues中搜索类似问题
4. 联系GitHub支持

## 🎉 部署成功

恭喜！你的作品集网站现在已经成功部署到GitHub Pages。

访问 `https://your-username.github.io` 查看你的网站！

---

**提示**: 记得在README.md中更新你的实际GitHub用户名和网站链接。
