/*
 * @Author: linkenzone
 * @Date: 2021-06-14 22:25:11
 * @Descripttion: Do not edit
 */
/**
 * @description: 层层获取 root 的 dom元素
 * @param {*} container
 * @return {*}
 */
function getRootContainer(container) {
  const workContainer = document.querySelector('.content')
  const rootBody = document.querySelector('body')

  return container || workContainer || rootBody
}

export default getRootContainer
