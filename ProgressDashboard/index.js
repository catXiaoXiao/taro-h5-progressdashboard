import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
let addPercent = null
export default class ProgressDashboard extends Taro.Component {
  state = {
    percent: 0,
  }
  componentDidMount() {
    const { percent, animatable } = this.props
    if (animatable && percent !== this.state.percent) {
      this.changePercent(percent)
    }
  }
  componentWillReceiveProps(nextProps) {
    const { percent: oldData, animatable } = this.props
    const { percent: newData } = nextProps
    if (animatable && oldData !== newData) {
      this.changePercent(newData)
    }
  }
  changePercent = percent => {
    let initNumber = 0
    if (addPercent) clearInterval(addPercent)
    if (percent === 0) {
      this.setState({ percent: 0 })
      return
    }
    addPercent = setInterval(() => {
      if (initNumber >= percent) {
        clearInterval(addPercent)
        return
      }
      initNumber = initNumber + 1
      this.setState({
        percent: initNumber,
      })
    }, 10)
  }
  render() {
    const {
      radius,
      openWidth,
      strokeWidth,
      trailColor,
      strokeColor,
      animatable,
      textColor,
      textContent,
    } = this.props
    const percent = animatable ? this.state.percent : this.props.percent
    const pathString = `M 50,50 m 0,${radius}
    a ${radius},${radius} 0 1 1 0,-${2 * radius}
    a ${radius},${radius} 0 1 1 0,${2 * radius}`
    const len = Math.PI * 2 * radius
    const trailPathStyle = {
      stroke: trailColor,
      strokeDasharray: `${len - openWidth}px ${len}px`,
      strokeDashoffset: `-${openWidth / 2}px`,
      transition: 'stroke-dashoffset 0.3s ease 0s, stroke 0.3s ease',
    }
    const strokePathStyle = {
      stroke: strokeColor,
      strokeDasharray: `${(percent / 100) * (len - openWidth)}px ${len}px`,
      strokeDashoffset: `-${openWidth / 2}px`,
      transition: 'stroke-dashoffset 0.3s ease 0s, stroke 0.3s ease',
    }
    return (
      <View className={'proDashboard'}>
        <svg viewBox="0 0 100 100">
          <path
            d={pathString}
            strokeWidth={strokeWidth}
            fillOpacity="0"
            strokeLinecap="round"
            stroke={trailColor}
            style={trailPathStyle}
          />
          <text
            x="50%"
            y="48%"
            stroke={textColor}
            dominant-baseline="text-before-edge"
            style={{
              fill: textColor,
              textAnchor: 'middle',
              dominantBaseline: 'middle',
              fontSize: '29px',
            }}
          >
            {percent}
          </text>
          <text
            x="50%"
            y="75%"
            dominant-baseline="text-before-edge"
            style={{
              fill: textColor,
              textAnchor: 'middle',
              dominantBaseline: 'middle',
              fontSize: '7px',
              opacity: 0.8,
            }}
          >
            {textContent}
          </text>
          <path
            d={pathString}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            fillOpacity="0"
            strokeLinecap="round"
            style={strokePathStyle}
          />
        </svg>
      </View>
    )
  }
}

ProgressDashboard.defaultProps = {
  radius: 45,
  openWidth: 85,
  strokeWidth: 5,
  strokeColor: '#fff',
  trailColor: 'rgba(255,255,255,0.2)',
  animatable: true,
  textColor: '#fff',
  textContent: '考试通过',
}
