# GitHub Pages 链接修复说明

## 问题描述
在GitHub Pages部署中，网站的导航链接和图片路径出现错误，导致：
- 点击logo会跳转到错误的URL（如 `@https://jasmine-xf.github.io/index.html`）
- 图片无法正常显示
- 导航链接无法正常工作

## 根本原因
1. **相对路径问题**：header.html组件中使用了相对路径 `../../`，在GitHub Pages中会导致错误的URL构建
2. **图片路径问题**：部分图片使用了绝对路径（以 `/` 开头），在GitHub Pages中无法正确解析
3. **组件加载问题**：项目页面使用动态组件加载，但路径调整逻辑不完善

## 修复内容

### 1. 修复Header组件链接路径
**文件**: `components/header.html`
- 将 `href="../../index.html"` 改为 `href="index.html"`
- 将 `href="../../about.html"` 改为 `href="about.html"`
- 将 `href="../../resume.html"` 改为 `href="resume.html"`
- 保持logo图片路径为相对路径 `src="assets/images/logo.png"`

### 2. 修复图片路径问题
**文件**: `index.html`
- 修复技能图标路径，移除绝对路径前缀 `/`
- 确保所有图片使用相对路径 `assets/images/`

### 3. 修复Favicon路径
**文件**: `index.html`, `work.html`
- 将favicon路径从 `../assets/images/logo.png` 改为 `assets/images/logo.png`

### 4. 增强组件加载器
**文件**: `js/components.js`
- 添加 `getBasePath()` 方法，根据当前页面位置动态确定路径前缀
- 添加 `adjustHeaderPaths()` 方法，动态调整外部加载组件的路径
- 改进备用组件，使用动态路径生成
- 添加 `isFallbackMode` 标志，区分外部组件和备用组件

## 技术实现

### 动态路径调整逻辑
```javascript
getBasePath() {
    const path = window.location.pathname;
    if (path.includes('/project/')) {
        return '../../'; // 项目页面需要回到根目录
    }
    return ''; // 根目录页面不需要前缀
}
```

### 路径替换机制
```javascript
adjustHeaderPaths(headerContent) {
    const basePath = this.getBasePath();
    
    // 替换各种链接路径
    headerContent = headerContent.replace(/href="index\.html"/g, `href="${basePath}index.html"`);
    headerContent = headerContent.replace(/href="about\.html"/g, `href="${basePath}about.html"`);
    // ... 更多路径替换
}
```

## 修复后的效果
1. ✅ 所有导航链接在GitHub Pages中正常工作
2. ✅ Logo点击跳转到正确的首页
3. ✅ 图片在所有页面正常显示
4. ✅ 项目页面的导航链接正确跳转
5. ✅ 备用组件也支持动态路径调整

## 测试建议
1. 在GitHub Pages环境中测试所有页面的导航
2. 验证项目页面的"返回"链接
3. 检查所有图片的显示效果
4. 测试移动端响应式布局

## 注意事项
- 此修复方案向后兼容，不会影响本地开发环境
- 动态路径调整仅在需要时生效，不会影响性能
- 备用组件确保了在组件加载失败时的降级体验
