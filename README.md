# taro-h5-progressdashboard
SVG画图，h5支持，微信小程序暂不支持，后续会写一个canvas版本的兼容微信小程序emmm

```jsx
yarn add taro-h5-progressdashboard
```
<font color=#00ffff size=16>由于引用 `node_modules` 的模块，默认不会编译，所以需要额外给 H5 配置 `esnextModules`，在 taro 项目的 `config/index.js` 中新增如下配置项：</font>
```jsx
h5: {
  esnextModules: ['taro-ui']
}
````
一些props:

radius | 半径大小 | number,

openWidth | 底缺口线条长度 | number,

strokeWidth | 线条宽度 | number,

strokeColor | 进度色, '#fff'

trailColor | 背景色, '#fff'

animatable | 动画渐进 | boolean,

percent | 进度值 | number | 必传

text数字颜色 | '#fff'

textContent内容 | '#fff' | '考试通过'

![image](https://github.com/catXiaoXiao/taro-h5-progressDashboard/blob/master/ProgressDashboard/logo1.png)

```jsx
import ProgressDashboard from 'taro-h5-progressdashboard'
<ProgressDashboard percent={percent} />


