/*
 * @Author: linkenzone
 * @Date: 2021-06-14 22:25:11
 * @Descripttion: Do not edit
 */
/**
 * @description: 清空Container 下的子元素
 * @param {*} container
 * @return {*}
 */
function emptyContainer(container) {
  if (container) {
    while (container.firstChild) {
      container.removeChild(container.firstChild)
    }
  }
}

export default emptyContainer
