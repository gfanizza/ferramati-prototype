/**
 * AREA TECNICA — Ferramati
 * Interactivity: tabs, document filtering, form validation, GA4 events
 */

(function () {
  'use strict';

  // ═══════════════════════════════════════════════════
  // AUTH TABS — Register / Login switching
  // ═══════════════════════════════════════════════════

  var tabs = document.querySelectorAll('.ta-auth-tab');
  var panels = document.querySelectorAll('.ta-auth-panel');
  var switchToLogin = document.getElementById('switch-to-login');
  var switchToRegister = document.getElementById('switch-to-register');

  function activateTab(tabId) {
    tabs.forEach(function (tab) {
      var isTarget = tab.id === tabId;
      tab.classList.toggle('active', isTarget);
      tab.setAttribute('aria-selected', isTarget ? 'true' : 'false');
    });
    panels.forEach(function (panel) {
      var controlledBy = document.querySelector('[aria-controls="' + panel.id + '"]');
      panel.classList.toggle('active', controlledBy && controlledBy.id === tabId);
    });
  }

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      activateTab(tab.id);
    });
  });

  if (switchToLogin) {
    switchToLogin.addEventListener('click', function (e) {
      e.preventDefault();
      activateTab('tab-login');
    });
  }
  if (switchToRegister) {
    switchToRegister.addEventListener('click', function (e) {
      e.preventDefault();
      activateTab('tab-register');
    });
  }

  // Hero "Accedi" button deep-links to login tab
  var heroLoginBtn = document.querySelector('[data-tab="login"]');
  if (heroLoginBtn) {
    heroLoginBtn.addEventListener('click', function (e) {
      e.preventDefault();
      activateTab('tab-login');
      document.getElementById('registrazione').scrollIntoView({ behavior: 'smooth' });
    });
  }

  // ═══════════════════════════════════════════════════
  // DOCUMENT CATALOG FILTERING
  // ═══════════════════════════════════════════════════

  var filterProduct = document.getElementById('filter-product');
  var filterType = document.getElementById('filter-type');
  var filterAccess = document.getElementById('filter-access');
  var filterLang = document.getElementById('filter-lang');
  var catalogGrid = document.getElementById('catalog-grid');

  function filterDocuments() {
    if (!catalogGrid) return;

    var product = filterProduct ? filterProduct.value : '';
    var type = filterType ? filterType.value : '';
    var access = filterAccess ? filterAccess.value : '';
    var lang = filterLang ? filterLang.value : '';

    var cards = catalogGrid.querySelectorAll('.ta-doc-card');
    var visibleCount = 0;

    cards.forEach(function (card) {
      var show = (!product || card.dataset.product === product)
        && (!type || card.dataset.type === type)
        && (!access || card.dataset.access === access)
        && (!lang || card.dataset.lang === lang);

      card.style.display = show ? '' : 'none';
      if (show) visibleCount++;
    });

    // Empty state
    var emptyState = catalogGrid.querySelector('.ta-empty');
    if (visibleCount === 0 && !emptyState) {
      var empty = document.createElement('div');
      empty.className = 'ta-empty';
      empty.innerHTML = '<p class="ta-empty__text">Nessun documento corrisponde ai filtri selezionati.</p>';
      catalogGrid.appendChild(empty);
    } else if (visibleCount > 0 && emptyState) {
      emptyState.remove();
    }

    trackEvent('document_catalog_filter', {
      filter_product: product || 'all',
      filter_type: type || 'all',
      filter_access: access || 'all',
      results_count: visibleCount
    });
  }

  [filterProduct, filterType, filterAccess, filterLang].forEach(function (el) {
    if (el) el.addEventListener('change', filterDocuments);
  });

  // ═══════════════════════════════════════════════════
  // FORM VALIDATION
  // ═══════════════════════════════════════════════════

  function showError(input, message) {
    clearError(input);
    input.style.borderColor = 'var(--color-error)';
    var error = document.createElement('span');
    error.className = 'ta-form__error';
    error.style.cssText = 'font-size:11px; color:var(--color-error); margin-top:4px; display:block;';
    error.textContent = message;
    input.parentNode.appendChild(error);
  }

  function clearError(input) {
    input.style.borderColor = '';
    var existing = input.parentNode.querySelector('.ta-form__error');
    if (existing) existing.remove();
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  var signupForm = document.getElementById('signup-form');
  if (signupForm) {
    var signupStartTracked = false;
    signupForm.querySelectorAll('input, select').forEach(function (input) {
      input.addEventListener('focus', function () {
        if (!signupStartTracked) {
          signupStartTracked = true;
          trackEvent('technical_area_signup_start');
        }
      });
    });

    signupForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var valid = true;
      signupForm.querySelectorAll('[required]').forEach(function (field) {
        clearError(field);
        if (field.type === 'checkbox' && !field.checked) {
          showError(field, 'Questo campo è obbligatorio');
          valid = false;
        } else if (field.type === 'email' && !validateEmail(field.value)) {
          showError(field, 'Inserisci un indirizzo email valido');
          valid = false;
        } else if (field.type !== 'checkbox' && !field.value.trim()) {
          showError(field, 'Campo obbligatorio');
          valid = false;
        }
      });

      var pw1 = document.getElementById('reg-password');
      var pw2 = document.getElementById('reg-password2');
      if (pw1 && pw2 && pw1.value !== pw2.value) {
        showError(pw2, 'Le password non coincidono');
        valid = false;
      }
      if (pw1 && pw1.value.length > 0 && pw1.value.length < 8) {
        showError(pw1, 'La password deve contenere almeno 8 caratteri');
        valid = false;
      }

      if (valid) {
        trackEvent('technical_area_signup_complete', {
          user_role: document.getElementById('reg-ruolo').value,
          country: document.getElementById('reg-paese').value,
          marketing_optin: signupForm.querySelector('[name="marketing"]').checked
        });
        alert('Registrazione completata. Controlla la tua email per verificare l\'account.');
      } else {
        trackEvent('form_error', { form_id: 'signup-form' });
      }
    });
  }

  var loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var valid = true;
      var emailField = document.getElementById('login-email');
      var passField = document.getElementById('login-password');
      clearError(emailField);
      clearError(passField);

      if (!validateEmail(emailField.value)) {
        showError(emailField, 'Inserisci un indirizzo email valido');
        valid = false;
      }
      if (!passField.value.trim()) {
        showError(passField, 'Inserisci la password');
        valid = false;
      }

      if (valid) {
        trackEvent('technical_area_login');
        window.location.href = 'dashboard.html';
      } else {
        trackEvent('form_error', { form_id: 'login-form' });
      }
    });
  }

  // Password reset toggle
  var forgotLink = document.getElementById('forgot-password-link');
  var resetPanel = document.getElementById('password-reset');
  if (forgotLink && resetPanel) {
    forgotLink.addEventListener('click', function (e) {
      e.preventDefault();
      resetPanel.style.display = resetPanel.style.display === 'none' ? 'block' : 'none';
    });
  }

  // ═══════════════════════════════════════════════════
  // FILE UPLOAD (invia-elaborati page)
  // ═══════════════════════════════════════════════════

  var dropzone = document.querySelector('.ta-dropzone');
  var fileInput = document.querySelector('.ta-dropzone__input');
  var fileList = document.querySelector('.ta-file-list');
  var uploadedFiles = [];

  if (dropzone && fileInput) {
    var allowedExtensions = ['.pdf', '.dwg', '.dxf', '.zip', '.jpg', '.jpeg', '.png', '.xls', '.xlsx'];
    var maxFileSize = 25 * 1024 * 1024;
    var maxFiles = 5;

    dropzone.addEventListener('click', function () { fileInput.click(); });

    dropzone.addEventListener('dragover', function (e) {
      e.preventDefault();
      dropzone.classList.add('dragover');
    });
    dropzone.addEventListener('dragleave', function () {
      dropzone.classList.remove('dragover');
    });
    dropzone.addEventListener('drop', function (e) {
      e.preventDefault();
      dropzone.classList.remove('dragover');
      handleFiles(e.dataTransfer.files);
    });

    fileInput.addEventListener('change', function () {
      handleFiles(fileInput.files);
      fileInput.value = '';
    });

    function handleFiles(files) {
      Array.from(files).forEach(function (file) {
        if (uploadedFiles.length >= maxFiles) {
          alert('Puoi caricare un massimo di ' + maxFiles + ' file per richiesta.');
          return;
        }
        var ext = '.' + file.name.split('.').pop().toLowerCase();
        if (!allowedExtensions.includes(ext)) {
          alert('Formato non ammesso: ' + ext + '. Formati consentiti: PDF, DWG, DXF, ZIP, JPG, PNG, XLS, XLSX.');
          return;
        }
        if (file.size > maxFileSize) {
          alert('Il file "' + file.name + '" supera il limite di 25 MB.');
          return;
        }
        uploadedFiles.push(file);
        renderFileList();
      });
    }

    function renderFileList() {
      if (!fileList) return;
      fileList.innerHTML = '';
      uploadedFiles.forEach(function (file, index) {
        var item = document.createElement('div');
        item.className = 'ta-file-item';
        item.innerHTML =
          '<span class="ta-file-item__name">' + file.name + '</span>' +
          '<span class="ta-file-item__size">' + formatSize(file.size) + '</span>' +
          '<button class="ta-file-item__remove" data-index="' + index + '" aria-label="Rimuovi file">&times;</button>';
        fileList.appendChild(item);
      });
      fileList.querySelectorAll('.ta-file-item__remove').forEach(function (btn) {
        btn.addEventListener('click', function () {
          uploadedFiles.splice(parseInt(btn.dataset.index), 1);
          renderFileList();
        });
      });
    }

    function formatSize(bytes) {
      if (bytes < 1024) return bytes + ' B';
      if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
      return (bytes / 1048576).toFixed(1) + ' MB';
    }
  }

  // ═══════════════════════════════════════════════════
  // PROJECT UPLOAD FORM
  // ═══════════════════════════════════════════════════

  var projectForm = document.getElementById('project-upload-form');
  if (projectForm) {
    var uploadStartTracked = false;
    projectForm.querySelectorAll('input, select, textarea').forEach(function (input) {
      input.addEventListener('focus', function () {
        if (!uploadStartTracked) {
          uploadStartTracked = true;
          trackEvent('technical_project_upload_start');
        }
      });
    });

    projectForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var valid = true;
      projectForm.querySelectorAll('[required]').forEach(function (field) {
        clearError(field);
        if (field.type === 'checkbox' && !field.checked) {
          showError(field, 'Questo campo è obbligatorio');
          valid = false;
        } else if (field.type !== 'checkbox' && !field.value.trim()) {
          showError(field, 'Campo obbligatorio');
          valid = false;
        }
      });

      if (uploadedFiles.length === 0) {
        alert('Carica almeno un file per inviare la richiesta.');
        valid = false;
      }

      if (valid) {
        trackEvent('technical_project_upload_complete', {
          project_type: (projectForm.querySelector('[name="tipologia"]') || {}).value || '',
          product_interest: (projectForm.querySelector('[name="prodotto"]') || {}).value || '',
          project_phase: (projectForm.querySelector('[name="fase"]') || {}).value || '',
          file_count: uploadedFiles.length
        });
        alert('Richiesta inviata con successo. L\'ufficio tecnico Ferramati ti ricontatterà a breve.');
      }
    });
  }

  // ═══════════════════════════════════════════════════
  // DOWNLOAD TRACKING
  // ═══════════════════════════════════════════════════

  document.addEventListener('click', function (e) {
    var btn = e.target.closest('.ta-doc-card__footer .btn');
    if (!btn) return;
    var card = btn.closest('.ta-doc-card');
    if (!card) return;
    var title = card.querySelector('.ta-doc-card__title');

    if (card.dataset.access === 'public') {
      trackEvent('document_download', {
        document_title: title ? title.textContent : '',
        product_category: card.dataset.product,
        document_type: card.dataset.type,
        access_level: 'public',
        language: card.dataset.lang
      });
    } else {
      trackEvent('reserved_document_request', {
        document_title: title ? title.textContent : '',
        product_category: card.dataset.product,
        access_level: card.dataset.access
      });
    }
  });

  // Page view
  trackEvent('technical_area_view');

  // ═══════════════════════════════════════════════════
  // GA4/GTM EVENT HELPER
  // ═══════════════════════════════════════════════════

  function trackEvent(eventName, params) {
    params = params || {};
    if (window.dataLayer) {
      window.dataLayer.push(Object.assign({ event: eventName }, params));
    }
    if (window.gtag) {
      window.gtag('event', eventName, params);
    }
    console.log('[GA4]', eventName, params);
  }

})();
