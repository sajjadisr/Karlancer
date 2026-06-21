// ============================================
// رفتار و اعتبارسنجی فرم‌های ورود و ثبت‌نام
// ============================================

document.addEventListener('DOMContentLoaded', function () {

    // ---------- نمایش/مخفی‌سازی رمز عبور ----------
    document.querySelectorAll('.toggle-password').forEach(function (btn) {
        btn.addEventListener('click', function () {
            const targetId = btn.dataset.target;
            const input = document.getElementById(targetId);
            if (!input) return;
            const isPassword = input.type === 'password';
            input.type = isPassword ? 'text' : 'password';
            btn.classList.toggle('is-visible', isPassword);
            btn.setAttribute('aria-label', isPassword ? 'مخفی کردن رمز عبور' : 'نمایش رمز عبور');
        });
    });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function showMessage(el, text, type) {
        if (!el) return;
        el.textContent = text;
        el.className = 'auth-message show ' + type;
    }

    function setFieldError(input, errorEl, message) {
        if (!input) return false;
        if (message) {
            input.classList.add('input-error');
            if (errorEl) {
                errorEl.textContent = message;
                errorEl.classList.add('show');
            }
            return true;
        }
        input.classList.remove('input-error');
        if (errorEl) {
            errorEl.classList.remove('show');
        }
        return false;
    }

    function clearErrorOnInput(form) {
        form.querySelectorAll('input').forEach(function (input) {
            input.addEventListener('input', function () {
                input.classList.remove('input-error');
                const errorEl = document.getElementById(input.id + 'Error');
                if (errorEl) errorEl.classList.remove('show');
            });
        });
    }

    // ---------- فرم ورود ----------
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        clearErrorOnInput(loginForm);

        loginForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const emailInput = document.getElementById('loginEmail');
            const passInput = document.getElementById('loginPassword');
            const msgEl = document.getElementById('loginMessage');

            let hasError = false;
            hasError = setFieldError(
                emailInput,
                document.getElementById('loginEmailError'),
                emailInput.value.trim() === '' ? 'لطفاً ایمیل یا شماره موبایل خود را وارد کنید' : ''
            ) || hasError;

            hasError = setFieldError(
                passInput,
                document.getElementById('loginPasswordError'),
                passInput.value.trim() === '' ? 'لطفاً رمز عبور خود را وارد کنید' : ''
            ) || hasError;

            if (hasError) {
                showMessage(msgEl, 'لطفاً خطاهای فرم را برطرف کنید.', 'error');
                return;
            }

            const submitBtn = loginForm.querySelector('.btn-auth-submit');
            const originalText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = 'در حال ورود...';

            setTimeout(function () {
                showMessage(msgEl, 'ورود با موفقیت انجام شد! (این یک نمونه فرانت‌اند بدون اتصال به سرور است)', 'success');
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }, 900);
        });
    }

    // ---------- فرم ثبت‌نام ----------
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        clearErrorOnInput(registerForm);

        registerForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const nameInput = document.getElementById('regName');
            const emailInput = document.getElementById('regEmail');
            const passInput = document.getElementById('regPassword');
            const confirmInput = document.getElementById('regConfirmPassword');
            const termsInput = document.getElementById('agreeTerms');
            const roleInputs = registerForm.querySelectorAll('input[name="accountType"]');
            const msgEl = document.getElementById('registerMessage');

            let hasError = false;

            hasError = setFieldError(
                nameInput,
                document.getElementById('regNameError'),
                nameInput.value.trim() === '' ? 'لطفاً نام و نام خانوادگی را وارد کنید' : ''
            ) || hasError;

            hasError = setFieldError(
                emailInput,
                document.getElementById('regEmailError'),
                !emailRegex.test(emailInput.value.trim()) ? 'ایمیل وارد شده معتبر نیست' : ''
            ) || hasError;

            hasError = setFieldError(
                passInput,
                document.getElementById('regPasswordError'),
                passInput.value.length < 8 ? 'رمز عبور باید حداقل ۸ کاراکتر باشد' : ''
            ) || hasError;

            hasError = setFieldError(
                confirmInput,
                document.getElementById('regConfirmError'),
                confirmInput.value !== passInput.value ? 'رمز عبور و تکرار آن یکسان نیستند' : ''
            ) || hasError;

            const roleSelected = Array.from(roleInputs).some(function (r) { return r.checked; });
            if (!roleSelected) {
                hasError = true;
            }

            if (!termsInput.checked) {
                hasError = true;
            }

            if (hasError) {
                if (!roleSelected) {
                    showMessage(msgEl, 'لطفاً نوع حساب کاربری خود را انتخاب کنید.', 'error');
                } else if (!termsInput.checked) {
                    showMessage(msgEl, 'برای ادامه باید با قوانین و مقررات موافقت کنید.', 'error');
                } else {
                    showMessage(msgEl, 'لطفاً خطاهای فرم را برطرف کنید.', 'error');
                }
                return;
            }

            const submitBtn = registerForm.querySelector('.btn-auth-submit');
            const originalText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = 'در حال ساخت حساب...';

            setTimeout(function () {
                showMessage(msgEl, 'حساب کاربری شما با موفقیت ساخته شد! اکنون می‌توانید وارد شوید.', 'success');
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
                registerForm.reset();
            }, 900);
        });
    }
});
