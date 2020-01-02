const bookmarkModule = {
    el: document.getElementById('bookmarks-module'),
    defaults: {
        children: [
            { url: 'https://imgur.com/', title: 'Imgur' },
            { url: 'http://youtube.com/', title: 'YouTube' },
            { url: 'https://www.google.com/', title: 'Google' },
            { url: 'https://plex.tv/', title: 'Plex' },
            { url: 'http://stackoverflow.com/', title: 'StackOverflow' }
        ]
    },
    recursiveFind: (nodes) => {
        const targetFolder = nodes.find(c => c.title === 'favs');
        if (targetFolder) {
            return targetFolder;
        }

        for (let i = 0; i < nodes.length; i++) {
            const node = nodes[i];
            const hasChildren = !!Object.keys(node).find(key => key === 'children');
            if (hasChildren) {
                const result = bookmarkModule.recursiveFind(node.children);
                if (result) return result;
            }
        }
        return null;
    },
    render: (favsFolder) => {
        var html = favsFolder.children.map(fav => {
            const r = `
            <a href="${fav.url}" class="bookmark">
                <img class="favicon" src="chrome://favicon/size/256@1x/${fav.url}" alt=${fav.title}></img>
                <p>${fav.title}</p>
            </a>`;
            return r;
        }).join('');
        var bar = `<div class="bookmark-bar">${html}</div>`;
        bookmarkModule.el.innerHTML = bar;
    },
    init: () => {
        if (!chrome || !chrome.bookmarks) {
            bookmarkModule.render(bookmarkModule.defaults);
        } else {
            chrome.bookmarks.getTree((treeNodes) => {
                const favoritefolder = bookmarkModule.recursiveFind(treeNodes);
                if (!!favoritefolder) {
                    bookmarkModule.render(favoritefolder);
                } else {
                    bookmarkModule.render(bookmarkModule.defaults);
                    bookmarkModule.el.innerHTML += `<span class="no-bookmarks">make a bookmark folder named 'favs' for the bookmarks contained in that to be displayed here</span>`;
                }
            });
        }
    }
};

$(document).ready(function() {
    bookmarkModule.init();
});
