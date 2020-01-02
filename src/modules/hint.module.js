const hintModule = {
    el: document.getElementById('hint-module'),
    init: () => {
        hintModule.el.innerText = `CTRL + E to go to the omnibar`,
        document.onkeydown = e => {
            var modalroot = document.getElementsByClassName('modal')[0];
            if ($(modalroot).hasClass('blip') || e.key.length > 1)
                return;
            
            modalroot.classList.add('blip');
            setTimeout(() => {
                modalroot.classList.remove('blip');
            }, 1500);
        }
    }
};
$(document).ready(function() {
    hintModule.init();
});
