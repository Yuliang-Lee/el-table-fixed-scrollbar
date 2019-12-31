/**
 * table 使用的指令，当 table 列较多时，会出现横向滚动条
 * 添加了这个指令，能使底部滚动条不仅仅显示在表格底部，而是会在表格中间出现
 * @param {Number} [startFixed] 表示 table 上边框离浏览器窗口多少px开始fix底部滚动条,默认 0
 * @param {String} [container] 默认 window，table 所属滚动父节点
 */
const ElementTableCtx = Symbol('__ElementTableBottomCtx')

function createScrollBar(root) {
  const docfrag = document.createDocumentFragment()
  const scrollWrap = document.createElement('div')
  const scroll = document.createElement('div')
  scrollWrap.style.position = 'absolute'
  scrollWrap.style.top = '9999px'
  scrollWrap.style.width = '100%'
  scrollWrap.style.height = '14px'
  scrollWrap.style.zIndex = '102'
  scrollWrap.style.display = 'block'
  scrollWrap.style.overflowX = 'scroll'
  scrollWrap.style.border = '1px solid #ccc'
  scrollWrap.style.backgroundColor = '#fff'
  scrollWrap.style.padding = '2px 0'
  scrollWrap.classList.add('scroll-wrap')
  scroll.classList.add('scroll-body')
  scroll.style.height = '1px'
  scrollWrap.appendChild(scroll)
  docfrag.appendChild(scrollWrap)
  root.appendChild(docfrag)

  return scrollWrap
}

export default function install(Vue) {
  Vue.directive('fixed-bottom-scrollbar', {
    bind(el, binding, vnode) {

    },
    inserted(el, binding, vnode) {
      let { startFixed = 0, container = window } = binding.value || {}
      const bodyWrapper = el.querySelector('.el-table__body-wrapper')
      const scrollWrap = createScrollBar(el)

      if (typeof container === 'string') {
        container = document.querySelector(container)
      }

      if (typeof startFixed !== 'number') {
        throw TypeError('fixed-header needs number value')
      }

      const bodyScroll = function bodyScroll() {
        bodyWrapper.scrollLeft = this.scrollLeft
      }
      scrollWrap.addEventListener('scroll', bodyScroll)

      const windowScroll = () => {
        const pos = el.getBoundingClientRect()
        const screenHeight = window.innerHeight
        if (pos.top - startFixed < 0 && pos.bottom > screenHeight) {
          if (el[ElementTableCtx].fixed) {
            scrollWrap.style.top = screenHeight - pos.top - 16 + 'px'
          } else {
            scrollWrap.style.top = screenHeight - pos.top - 16 + 'px'
            scrollWrap.scrollLeft = bodyWrapper.scrollLeft
            el[ElementTableCtx].fixed = true
          }
        } else {
          scrollWrap.style.top = '9999px'
          el[ElementTableCtx].fixed = false
        }
      }
      container.addEventListener('scroll', windowScroll)
      const windowResizeHandler = () => {
        windowScroll()
      }
      window.addEventListener('resize', windowResizeHandler)

      el[ElementTableCtx] = {
        scrollWrap,
        container,
        bodyScroll,
        windowScroll,
        windowResizeHandler
      }
    },
    componentUpdated(el, binding, vnode) {
      setTimeout(() => {
        // const { startFixed } = binding.value || {}
        const tableWrapper = el.querySelector('.el-table__body')
        const scrollBody = el.querySelector('.scroll-body')
        const scrollWrap = el.querySelector('.scroll-wrap')
        scrollBody.style.width = tableWrapper.clientWidth + 'px'

        const pos = el.getBoundingClientRect()
        const screenHeight = window.innerHeight
        if (pos.bottom > screenHeight && tableWrapper.clientWidth > scrollWrap.clientWidth) {
          scrollWrap.style.top = screenHeight - pos.top - 16 + 'px'
        } else {
          scrollWrap.style.visibility = 'hidden'
        }
      }, 150)
    },
    unbind(el) {
      const { windowScroll, bodyScroll, windowResizeHandler, scrollWrap, container } = el[ElementTableCtx]
      scrollWrap.removeEventListener('scroll', bodyScroll)
      container.removeEventListener('scroll', windowScroll)
      container.removeEventListener('resize', windowResizeHandler)
      el[ElementTableCtx] = null
    }
  })
}
