/*
 * @Author: linkenzone
 * @Date: 2021-06-11 17:41:26
 * @Descripttion: Do not edit
 */
import vtkURLExtract from 'vtk.js/Sources/Common/Core/URLExtract'

import getRootContainer from './getRootContainer'
import preventDefaults from './preventDefaults'

import style from './ItkVtkViewer.module.css'
// Mousetrap是一个简单的Javascript键盘快捷键库。
import Mousetrap from 'mousetrap'

const MOUSETRAP = new Mousetrap()

/**
 * @description: 核心方法 createFileDragAndDrop
 * @param {*} container
 * @param {*} onDataChange
 * @return {*}
 */
function createFileDragAndDrop(container, onDataChange) {
  // 获取 底座的 DOM 元素
  const myContainer = getRootContainer(container)
  // 创建新的DOM元素
  const fileContainer = document.createElement('div')
  // 创建获取文件的 DOM 元素
  fileContainer.innerHTML = `<div class="${style.bigFileDrop}"/><input type="file" class="file" style="display: none;" multiple/>`
  // 嵌入 文件框
  myContainer.appendChild(fileContainer)

  // 获取 Input的 DOM元素
  const fileInput = fileContainer.querySelector('input')

  // 绑定 快捷键
  MOUSETRAP.bind('enter', event => {
    fileInput.click()
  })

  return new Promise(resolve => {
    function handleFile(e) {
      // 如果事件可以被取消，就取消事件（即取消事件的預設行為）
      preventDefaults(e)
      // 解除绑定
      MOUSETRAP.unbind('enter')
      console.log('handleFile e', e)

      // 物件被用來保存使用者於拖放操作過程中的資料，其中可能包含了一至多項資料以及多種資料類型。
      const dataTransfer = e.dataTransfer
      console.log('handleFile dataTransfer', dataTransfer)

      const files = e.target.files || dataTransfer.files
      // 获取 文件
      console.log('handleFile files', files)
      // 删除文件框
      myContainer.removeChild(fileContainer)

      const use2D = !!vtkURLExtract.extractURLParameters().use2D
      console.log(
        'handleFile vtkURLExtract.extractURLParameters().use2D',
        use2D
      )

      resolve(
        onDataChange(myContainer, { files, use2D }).catch(error => {
          const message =
            'An error occurred while loading the file:\n\n' + error.message
          alert(message)
          createFileDragAndDrop(container, onDataChange)
        })
      )
    }

    fileInput.addEventListener('change', handleFile)
    fileContainer.addEventListener('drop', handleFile)
    fileContainer.addEventListener('click', e => fileInput.click())
    fileContainer.addEventListener('dragover', preventDefaults)
  })
}

export default createFileDragAndDrop
