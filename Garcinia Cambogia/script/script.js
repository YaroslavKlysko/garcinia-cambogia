window.onload = function () {
    var openElement = function (classToHide, event) {
        document.querySelectorAll(classToHide).forEach(function (item) {
            if (!item.classList.contains('hidden')) {
                item.classList.add('hidden');
            }
        });
        var target = event.target;
        var currentId = target.getAttribute('tag');
        var targetElement = document.getElementById(currentId);
        targetElement?.classList.remove('hidden');
    };

    document.querySelectorAll('.content__name-link').forEach(item =>
        item.addEventListener('click', function (e) {
            openElement('.content__info-product', e);
        })
    );

    document.querySelectorAll('.arcadion').forEach(item =>
        item.addEventListener('click', function (e) {
            openElement('.content__active', e);
        })
    );

    document.querySelectorAll('.content__album-image').forEach(item =>
        item.addEventListener('click', function (e) {
            openElement('.content__popup-photo', e);
        })
    );

    var images = ['./image/product.png', './image/product_0.png', './image/product_1.png'];
    var imgIndex = 1;
    
    setInterval(() => {
        var img = document.getElementById('img');
        img.setAttribute('src', images[imgIndex++]);
        if (imgIndex === images.length) {
            imgIndex = 0;
        };
    }, 4000);

    var footerForm = document.getElementById('footer-form-popup');
    var footerFormClose = document.querySelector('.footer__popup-close');
    openForm = function() {
        footerForm.style.display = "block";
    };
    footerFormClose.onclick = function () {
        footerForm.style.display = "none";
    };

    var form = document.getElementById('form');
    form.addEventListener('submit', formSend);

    function formSend(e) {
        e.preventDefault();

        var error = formValidate(form);
        if (error === 0) {
            form.classList.add('_sending');
        }else {
            alert('Fill in the required fields')
        }
    }

    function formValidate(form) {
        var error = 0;
        var formReq = document.querySelectorAll('._req');

        for (var index = 0; index < formReq.length; index++) {
            var input = formReq[index];
            formRemoveError(input);

            if (input.classList.contains('_email')) {
                if (emailTest(input)) {
                    formAddError(input);
                    error++;
                }
            } else if (input.getAttribute("type") === "checkbox" && input.checked === false) {
                formAddError(input);
                error++; 
            } else {
                if (input.value === '') {
                    formAddError(input);
                    error++;
                }
            };
        };
        return error;
    };

    function formAddError(input) {
        input.parentElement.classList.add('_error');
        input.classList.add('_error');
    };

    function formRemoveError(input) {
        input.parentElement.classList.remove('_error');
        input.classList.remove('_error');
    };

    function emailTest(input) {
        return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,15})+$/.test(input.value);
    };

};
