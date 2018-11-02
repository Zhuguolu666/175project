// components/nation/nation.js
import { nationData } from '../../assets/js/data.js'
const $v = require('../../assets/js/func/visibleBehaviors.js')
Component({
  behaviors: [$v],
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    nationList: nationData,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    
  }
})
