/*
 * @Author: Junchi Zhao
 * @LastEditors: Junchi Zhao
 * @Description:  表格列内容处理
 */
export default {
    selection: {
      renderHeader: (h, { store , _self }) => {
        return h("el-checkbox",{
          props: {
            disabled: (store.states.data && store.states.data.length === 0) ||  scope._self.disabled,
            indeterminate: store.states.selection.length > 0 && !store.states.isAllSelected,
            value: store.states.isAllSelected
          },
          nativeOn: {
            click: store.toggleAllSelection
          },
        },[])
      },
      renderCell: (h, { row, column, store, $index }) => {
        return  h("el-checkbox",{
          props: {
            disabled: column.selectable ? !column.selectable.call(null, row, $index) : false,
            // indeterminate: store.states.selection.length > 0  && store.isSelected(row) && !store.states.isAllSelected,
            value: store.isSelected(row)
          },
          nativeOn: {
            click: event => event.stopPropagation()
          },
          on: {
            input: () => {
              store.commit('rowSelectedChanged', row)
            }
          }
        },[])
      },
      sortable: false,
      resizable: false
    },
    index: {
      renderHeader: (h, scope) => {
        return h("span",{
          domProps: {
            innerHTML: scope.column.label || '#'
          },
        },[])
      },
      renderCell: (h, { $index, column }) => {
        let i = $index + 1
        const index = column.index
  
        if (typeof index === 'number') {
          i = $index + index
        } else if (typeof index === 'function') {
          i = index($index)
        }
  
        return h("div",{
          domProps: {
            innerHTML: i
          },
        },[])
      },
      sortable: false
    },
    addOnly: {
      renderHeader: (h, scope) => {
        return h("el-button",{
          props: {
            plain: true,
            icon: "el-icon-plus",
            type: "default",
            size: "mini",
            disabled: scope._self.disabled ? scope._self.disabled : false
          },
          'class': {
            editBtn: true
          },
          on: {
            click: () => {
              scope._self.addRow()
            }
          }
        },[])
      },
      renderCell: (h, { $index, column }) => {
        let i = $index + 1
        const index = column.index
  
        if (typeof index === 'number') {
          i = $index + index
        } else if (typeof index === 'function') {
          i = index($index)
        }
  
        return h("div",{
          domProps: {
            innerHTML: i
          },
        },[])
      },
      sortable: false
    },
    edit: {
      renderHeader: (h, scope) => {
        return h("el-button",{
          props: {
            plain: true,
            icon: "el-icon-plus",
            type: "default",
            size: "mini",
            disabled: scope._self.disabled ? scope._self.disabled : false
          },
          'class': {
            editBtn: true
          },
          on: {
            click: () => {
              scope._self.addRow()
            }
          }
        },[])
      },
      renderCell: (h, scope) => {
        return h("el-button",{
          props: {
            plain: true,
            icon: "el-icon-minus",
            type: "default",
            size: "mini",
            disabled: scope._self.disabled ? scope._self.disabled : false
          },
          'class': {
            editBtn: true
          },
          on: {
            click: () => {
              scope._self.deleteRow(scope.row)
            }
          }
        },[])
      },
      sortable: false
    },
    expand: {
      renderHeader: (h, scope) => {
        return h("span",{
          domProps: {
            innerHTML: scope.column.label || ''
          },
        },[])
      },
      renderCell: (h, { row, store }, proxy) => {
        const expanded = store.states.expandRows.indexOf(row) > -1
        return h("div",{
          domProps: {
            innerHTML: scope.column.label || ''
          },
          'class': {
            'el-table__expand-icon': true,
            'el-table__expand-icon--expanded': expanded
          },
          on: {
            click: e => proxy.handleExpandClick(row, e)
          }
        },[
          h("i",{
            'class': {
              'el-icon el-icon-arrow-right': true
            }
          },[])
        ])
      },
      sortable: false,
      resizable: false,
      className: 'el-table__expand-column'
    } ,
    
  }
  