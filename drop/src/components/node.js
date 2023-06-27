
// const EVENTS = {
//     CLICK: 'on-node-click',
//     MOUSEOUT: 'on-node-mouseout',
//     MOUSEOVER: 'on-node-mouseover',
//     DRAGSTART: 'on-node-drag-start',
//     DRAGOVER: 'on-node-drag-over',
//     DROP: 'on-node-drop'
//   };
  
//   function createListener(handler, data) {
//     const execute = (cb, e, ...args) => {
//       if (typeof cb === 'function') {
//         // fixed bug #48, #73
//         const className = e.target && e.target.className;
//         if (typeof className === 'string' && className.indexOf('org-tree-node-btn') > -1) return;
  
//         cb.apply(null, [e, ...args]);
//       }
//     };
  
//     return function (e) {
//       if (Array.isArray(handler)) {
//         for (const cb of handler) {
//           execute(cb, e, data);
//         }
//       } else {
//         execute(handler, e, data);
//       }
//     };
//   }
  
//   // Check if the node is a leaf node
//   const isLeaf = (data, prop) => {
//     return !(Array.isArray(data[prop]) && data[prop].length > 0);
//   };
  
//   // Render node
//   export function renderNode(h, data, context) {
//     const { props } = context;
//     const cls = ['org-tree-node'];
//     const childNodes = [];
//     const children = data[props.props.children];
  
//     if (isLeaf(data, props.props.children)) {
//       cls.push('is-leaf');
//     } else if (props.collapsable && !data[props.props.expand]) {
//       cls.push('collapsed');
//     }
  
//     childNodes.push(renderLabel(h, data, context));
  
//     if (!props.collapsable || data[props.props.expand]) {
//       childNodes.push(renderChildren(h, children, context));
//     }
  
//     return h('div', {
//       class: cls.join(' ')
//     }, childNodes);
//   }
  
//   // Render expand/collapse button
//   export function renderBtn(h, data, { props, listeners }) {
//     const expandHandler = listeners[EVENTS.CLICK];
  
//     let cls = ['org-tree-node-btn'];
  
//     if (data[props.props.expand]) {
//       cls.push('expanded');
//     }
  
//     return h('span', {
//       class: cls.join(' '),
//       onClick: (e) => expandHandler && expandHandler(e, data)
//     });
//   }
  
//   // Render label node
//   export function renderLabel(h, data, context) {
//     const { props, listeners } = context;
//     const label = data[props.props.label];
//     const renderContent = props.renderContent;
  
//     // Event handlers
//     const clickHandler = listeners[EVENTS.CLICK];
//     const mouseOutHandler = listeners[EVENTS.MOUSEOUT];
//     const mouseOverHandler = listeners[EVENTS.MOUSEOVER];
//     const dragStartHandler = listeners[EVENTS.DRAGSTART];
//     const dragOverHandler = listeners[EVENTS.DRAGOVER];
//     const dropHandler = listeners[EVENTS.DROP];
  
//     const childNodes = [];
//     if (typeof renderContent === 'function') {
//       let vnode = renderContent(h, data);
  
//       vnode && childNodes.push(vnode);
//     } else {
//       childNodes.push(label);
//     }
  
//     if (props.collapsable && !isLeaf(data, props.props.children)) {
//       childNodes.push(renderBtn(h, data, context));
//     }
  
//     const cls = ['org-tree-node-label-inner'];
//     let { labelWidth, labelClassName, selectedClassName, selectedKey } = props;
  
//     if (typeof labelWidth === 'number') {
//       labelWidth += 'px';
//     }
  
//     if (typeof labelClassName === 'function') {
//       labelClassName = labelClassName(data);
//     }
  
//     labelClassName && cls.push(labelClassName);
  
//     // Add selected class and key from props
//     if (typeof selectedClassName === 'function') {
//       selectedClassName = selectedClassName(data);
//     }
  
//     selectedClassName && selectedKey && data[selectedKey] && cls.push(selectedClassName);
  
//     return h('div', {
//       class: 'org-tree-node-label',
//       draggable: true,
//       onDragstart: createListener(dragStartHandler, data),
//       onDragover: createListener(dragOverHandler, data),
//       onDrop: createListener(dropHandler, data)
//     }, [
//       h('div', {
//         class: cls.join(' '),
//         style: { width: labelWidth },
//         onClick: createListener(clickHandler, data),
//         onMouseout: createListener(mouseOutHandler, data),
//         onMouseover: createListener(mouseOverHandler, data),
//       }, childNodes)
//     ]);
//   }
  
//   // Render node children
//   export function renderChildren(h, list, context) {
//     if (Array.isArray(list) && list.length) {
//       const children = list.map(item => {
//         return renderNode(h, item, context);
//       });
  
//       return h('div', {
//         class: 'org-tree-node-children'
//       }, children);
//     }
//     return '';
//   }
  
//   export function render(h, context) {
//     const { props } = context;
  
//     return renderNode(h, props.data, context);
//   }
  
//   export default {
//     render
//   };
  