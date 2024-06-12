import { Editor } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import BubbleMenu from '@tiptap/extension-bubble-menu';
import { debounce } from 'throttle-debounce';
import { MyElement } from './components/hello-lit';
import { CustomText } from './components/Extension';

const editor = new Editor({
  element: document.querySelector('.element'),
  extensions: [
    StarterKit,
    // NodeView,
    CustomText,
    // BubbleMenu.configure({
    //   element: document.querySelector('.menu'),
    // }),
  ],
  onTransaction(transaction) { 
    console.log('transaction', editor.getJSON());
  },

  content: `
    <p>This is still the text editor you’re used to, but enriched with node views.</p>
    <node-view></node-view>
    <p>Did you see that? That’s a JavaScript node view. We are really living in the future.</p>
  `,
});


//---------------------------------------------------
const videoInputEl = document.getElementById('video-input');
const videoSuggestionsEl = document.getElementById('video-suggestions');
let videoSuggestions = [];

const syncArrayToList = () => {
  videoSuggestionsEl.innerHTML = '';

  videoSuggestions.forEach((videoSuggestion) => {
    const buttonEl = document.createElement('button');
    const listItem = document.createElement('li');
    buttonEl.textContent = videoSuggestion.label;
    listItem.appendChild(buttonEl);
    videoSuggestionsEl.appendChild(listItem);
  });
};

const videoInputEl_onInput = debounce(1000, async (event) => {
  // await new Promise((resolve) => setTimeout(resolve, 3000));
  // console.log(movies);
  const res = [
    {
      label: `suggestion ${Math.random().toString().slice(-2)}`,
      data: { link: 'https://www.youtube.com/watch?v=m4L20t8Dvlg' },
    },
    {
      label: `suggestion ${Math.random().toString().slice(-2)}`,
      data: { link: 'https://www.youtube.com/watch?v=m4L20t8Dvlg' },
    },
    {
      label: `suggestion ${Math.random().toString().slice(-2)}`,
      data: { link: 'https://www.youtube.com/watch?v=m4L20t8Dvlg' },
    },
  ];
  videoSuggestions = [...res];
  console.warn('wakekeke', videoSuggestions);
  syncArrayToList();
});

videoInputEl.addEventListener('input', videoInputEl_onInput);

// document.body.appendChild(document.createElement('my-element'));
