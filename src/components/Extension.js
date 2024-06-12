import { mergeAttributes, Node } from '@tiptap/core';
import { Text } from '@tiptap/extension-text';
import { Paragraph } from '@tiptap/extension-paragraph';
import { MyElement } from './hello-lit';

export const CustomText = Node.create({
  // export default Node.create({
  name: 'nodeView',

  group: 'block',

  atom: true,

  addAttributes() {
    return {
      count: {
        default: 0,
      },
      text: {
        default: 'This text is passed from the editor to lit-element lorem ipsum dolor sit amet.',
      },
    };
  },
  onUpdate() {
    console.log('onUpdate');
  },
  parseHTML() {
    return [
      {
        tag: 'node-view',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['node-view', mergeAttributes(HTMLAttributes)];
  },

  addNodeView() {
    return ({ editor, node, getPos }) => {
      const { view } = editor;
      // console.log('view', view);
      // console.log('node', node);
      // console.log('getPos', getPos);
      // Markup
      /*
        <div class="node-view">
          <span class="label">Node view</span>

          <div class="content">
            <button>
              This button has been clicked ${node.attrs.count} times.
            </button>
          </div>
        </div>
      */

      const dom = document.createElement('div');
      dom.classList.add('node-view');
      const label = document.createElement('span');
      label.classList.add('label');
      label.innerHTML = 'Node view';
      const content = document.createElement('div');
      content.classList.add('content');
      const button = document.createElement('button');
      button.innerHTML = `This button has been clicked ${node.attrs.count} times.`;
      button.addEventListener('click', () => {
        if (typeof getPos === 'function') {
          view.dispatch(
            view.state.tr.setNodeMarkup(getPos(), undefined, {
              count: node.attrs.count + 1,
            })
          );

          editor.commands.focus();
        }
      });
      content.append(button);
      const myElement = document.createElement('my-element');
      myElement.text = node.attrs.text;
      myElement.view = view;
      myElement.editor = editor;
      myElement.node = node;
      myElement.getPos = getPos;

      dom.append(label, content, myElement);

      return {
        dom,
      };
    };
  },
});
