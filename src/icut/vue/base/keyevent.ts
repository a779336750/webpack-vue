// @ts-ignore
import Mousetrap from 'mousetrap';

export default function () {
    // 禁止浏览器缩放
    document.body.addEventListener('wheel', e => {
        if (e.ctrlKey) {
            e.preventDefault();
        }
    }, {passive: false});

    Mousetrap.bind(['space', 'alt', 'ctrl'], (event: any) => {
        event.preventDefault();
    }, 'keydown');

    Mousetrap.bind(['space', 'alt', 'ctrl'], (event: any) => {
        event.preventDefault();
    }, 'keyup');

    Mousetrap.bind(['ctrl+z', 'command+z'], (event: any) => {
        if (window.Ktu.historyManager.undoAble()) {
            window.Ktu.historyManager.undo();
        }
        event.preventDefault();
    });

    Mousetrap.bind(['ctrl+y', 'command+y', 'ctrl+shift+z', 'command+shift+z'], (event: any) => {
        if (window.Ktu.historyManager.redoAble()) {
            window.Ktu.historyManager.redo();
        }
        event.preventDefault();
    });
    // @ts-ignore
    Mousetrap.init();
};
