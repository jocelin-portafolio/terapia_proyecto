/**
 * APLICACIÓN DE INTERACTIVIDAD - TIERRA DE ENCUENTRO
 * Desarrollado con JavaScript Vanilla (ES6+)
 */

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================================================
    // 1. COMPORTAMIENTO DEL HEADER Y NAVBAR
    // ==========================================================================
    const header = document.getElementById('mainHeader');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const navbarToggler = document.querySelector('.navbar-toggler');

    // Cambiar estilo de la cabecera al hacer scroll
    const handleScrollHeader = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', handleScrollHeader);
    handleScrollHeader(); // Ejecución inicial

    // Cerrar el menú móvil al hacer clic en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbarCollapse.classList.contains('show')) {
                // Instancia de Bootstrap Collapse
                const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                if (bsCollapse) {
                    bsCollapse.hide();
                }
            }
        });
    });

    // Active Link Scroll Spy (Alternativa manual nativa de Bootstrap Scrollspy)
    const sections = document.querySelectorAll('section[id]');
    const handleScrollSpy = () => {
        const scrollY = window.scrollY;
        
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 120; // Offset para el header
            const sectionId = current.getAttribute('id');
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelector(`.navbar-nav a[href*=${sectionId}]`)?.classList.add('active');
            } else {
                document.querySelector(`.navbar-nav a[href*=${sectionId}]`)?.classList.remove('active');
            }
        });
    };
    window.addEventListener('scroll', handleScrollSpy);

    // ==========================================================================
    // 2. ANIMACIONES AL HACER SCROLL (Intersection Observer)
    // ==========================================================================
    const revealItems = document.querySelectorAll('.scroll-reveal');
    
    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal-active');
                    observer.unobserve(entry.target); // Dejar de observar una vez revelado
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        });

        revealItems.forEach(item => {
            revealObserver.observe(item);
        });
    } else {
        // Fallback si el navegador no soporta Intersection Observer
        revealItems.forEach(item => {
            item.classList.add('reveal-active');
        });
    }

    // ==========================================================================
    // 3. CONTADORES NUMÉRICOS ANIMADOS (Stats Count Up)
    // ==========================================================================
    const counters = document.querySelectorAll('.counter');
    
    const animateCounters = (counterElement) => {
        const target = +counterElement.getAttribute('data-target');
        const duration = 2000; // Duración total en ms
        const increment = target / (duration / 16); // ~60fps
        let current = 0;

        const updateCount = () => {
            current += increment;
            if (current < target) {
                counterElement.innerText = Math.ceil(current);
                setTimeout(updateCount, 16);
            } else {
                // Asegurar valor final exacto y formateado
                counterElement.innerText = target.toLocaleString('es-ES') + (target >= 100 ? '+' : '');
            }
        };
        updateCount();
    };

    // Observador para activar contadores solo cuando entren en pantalla
    const statsSection = document.getElementById('stats');
    if (statsSection && 'IntersectionObserver' in window) {
        const statsObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    counters.forEach(counter => animateCounters(counter));
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        statsObserver.observe(statsSection);
    } else {
        // Fallback contadores inmediatos
        counters.forEach(counter => {
            const target = counter.getAttribute('data-target');
            counter.innerText = target + '+';
        });
    }

    // ==========================================================================
    // 4. WIDGET INTERACTIVO DE DONACIONES (Calculadora de Impacto)
    // ==========================================================================
    const slider = document.getElementById('donationRange');
    const sliderValDisplay = document.getElementById('slider-val-display');
    const impactAmount = document.getElementById('impact-amount');
    const impactTitle = document.getElementById('impact-title');
    const impactDesc = document.getElementById('impact-desc');
    const presetButtons = document.querySelectorAll('.btn-outline-donation');
    const donationForm = document.getElementById('donationForm');

    // Umbrales de Impacto (Donaciones en USD)
    const impactData = [
        {
            min: 5,
            max: 19,
            title: "Material Didáctico y Semillas",
            desc: "Financias la compra de materiales de integración sensorial y semillas orgánicas para el huerto terapéutico grupal de un taller semanal."
        },
        {
            min: 20,
            max: 44,
            title: "Alimentación del Caballo de Terapia",
            desc: "Sostienes la alimentación balanceada, el cuidado preventivo y el herraje básico semanal de un caballo coterapeuta (como 'Manolo' o 'Estrella')."
        },
        {
            min: 45,
            max: 89,
            title: "Sesión de Especialidad Médica Completa",
            desc: "Patrocinas una sesión de equinoterapia o terapia ocupacional al aire libre, guiada por profesionales clínicos titulados, para un niño en lista de espera."
        },
        {
            min: 90,
            max: 149,
            title: "Beca de Terapia Mensual Completa",
            desc: "Patrocinas el tratamiento continuo mensual (4 sesiones completas presenciales en la naturaleza) para un niño becado de familias en extrema vulnerabilidad."
        },
        {
            min: 150,
            max: 200,
            title: "Patrocinador de Impacto Social Alto",
            desc: "Financias becas continuas para 2 niños por un mes completo, incluyendo la asistencia a los talleres grupales recreativos los fines de semana."
        }
    ];

    // Actualiza la visualización y descripción de impacto según el valor numérico
    const updateDonationImpact = (value) => {
        const val = parseInt(value, 10);
        
        // Actualizar textos
        sliderValDisplay.innerText = `$${val} USD/mes`;
        impactAmount.innerText = `$${val} USD`;

        // Buscar el rango de impacto correspondiente
        const impact = impactData.find(item => val >= item.min && val <= item.max) || impactData[impactData.length - 1];
        
        impactTitle.innerText = impact.title;
        impactDesc.innerText = impact.desc;

        // Sincronizar el slider visual
        slider.value = val;

        // Resaltar el botón preset si el valor coincide exactamente
        presetButtons.forEach(btn => {
            const btnVal = parseInt(btn.getAttribute('data-value'), 10);
            if (btnVal === val) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    };

    // Evento para el Slider de rango
    slider.addEventListener('input', (e) => {
        updateDonationImpact(e.target.value);
    });

    // Eventos para los Botones Preset
    presetButtons.forEach(button => {
        button.addEventListener('click', () => {
            const presetVal = button.getAttribute('data-value');
            updateDonationImpact(presetVal);
        });
    });

    // Inicializar el impacto en $10 (valor inicial por defecto del HTML)
    updateDonationImpact(10);

    // ==========================================================================
    // 5. VALIDACIÓN EN TIEMPO REAL Y ENVÍO DE FORMULARIOS (Vanilla JS)
    // ==========================================================================

    // Función auxiliar para validar correos
    const isValidEmail = (email) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase().trim());
    };

    // --- FORMULARIO DE APADRINAMIENTO/DONACIÓN ---
    const donorNameInput = document.getElementById('donorName');
    const donorEmailInput = document.getElementById('donorEmail');

    // Validación interactiva al perder foco o teclear
    const validateField = (input, validationFn, feedbackEl = null) => {
        const isValid = validationFn(input.value);
        if (isValid) {
            input.classList.remove('is-invalid');
            input.classList.add('is-valid');
            return true;
        } else {
            input.classList.remove('is-valid');
            input.classList.add('is-invalid');
            return false;
        }
    };

    donorNameInput.addEventListener('input', () => {
        validateField(donorNameInput, (val) => val.trim().length >= 3);
    });
    donorEmailInput.addEventListener('input', () => {
        validateField(donorEmailInput, (val) => isValidEmail(val));
    });

    donationForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Validar todos los campos del formulario
        const isNameValid = validateField(donorNameInput, (val) => val.trim().length >= 3);
        const isEmailValid = validateField(donorEmailInput, (val) => isValidEmail(val));

        if (isNameValid && isEmailValid) {
            const submitBtn = donationForm.querySelector('button[type="submit"]');
            const originalBtnHtml = submitBtn.innerHTML;
            
            // Simular carga de envío API
            submitBtn.disabled = true;
            submitBtn.innerHTML = `<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Procesando Donación...`;

            setTimeout(() => {
                // Recuperar datos para el modal
                const finalAmount = slider.value;
                const finalEmail = donorEmailInput.value;

                document.getElementById('modal-donation-value').innerText = `$${finalAmount} USD`;
                document.getElementById('modal-donor-email').innerText = finalEmail;

                // Mostrar Modal de Éxito de Bootstrap
                const donationSuccessModal = new bootstrap.Modal(document.getElementById('donationSuccessModal'));
                donationSuccessModal.show();

                // Restaurar e inicializar formulario
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnHtml;
                donationForm.reset();
                donorNameInput.classList.remove('is-valid', 'is-invalid');
                donorEmailInput.classList.remove('is-valid', 'is-invalid');
                updateDonationImpact(10); // Volver al default
            }, 1800);
        }
    });

    // --- FORMULARIO DE CONTACTO ---
    const contactForm = document.getElementById('contactForm');
    const contactName = document.getElementById('contactName');
    const contactEmail = document.getElementById('contactEmail');
    const contactSubject = document.getElementById('contactSubject');
    const contactMessage = document.getElementById('contactMessage');
    const contactPrivacy = document.getElementById('contactPrivacy');

    contactName.addEventListener('input', () => validateField(contactName, (val) => val.trim().length >= 3));
    contactEmail.addEventListener('input', () => validateField(contactEmail, (val) => isValidEmail(val)));
    contactSubject.addEventListener('change', () => validateField(contactSubject, (val) => val !== ''));
    contactMessage.addEventListener('input', () => validateField(contactMessage, (val) => val.trim().length >= 10));
    contactPrivacy.addEventListener('change', () => {
        if (contactPrivacy.checked) {
            contactPrivacy.classList.remove('is-invalid');
            contactPrivacy.classList.add('is-valid');
        } else {
            contactPrivacy.classList.remove('is-valid');
            contactPrivacy.classList.add('is-invalid');
        }
    });

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Validar todos los campos antes de enviar
        const nValid = validateField(contactName, (val) => val.trim().length >= 3);
        const eValid = validateField(contactEmail, (val) => isValidEmail(val));
        const sValid = validateField(contactSubject, (val) => val !== '');
        const mValid = validateField(contactMessage, (val) => val.trim().length >= 10);
        const pValid = contactPrivacy.checked;
        
        if (!pValid) {
            contactPrivacy.classList.add('is-invalid');
        }

        if (nValid && eValid && sValid && mValid && pValid) {
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnHtml = submitBtn.innerHTML;

            // Simular estado de envío
            submitBtn.disabled = true;
            submitBtn.innerHTML = `<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> Enviando Mensaje...`;

            setTimeout(() => {
                // Rellenar datos en modal de éxito
                document.getElementById('modal-contact-name').innerText = contactName.value;
                
                // Obtener texto del motivo
                const selectedOptionText = contactSubject.options[contactSubject.selectedIndex].text;
                document.getElementById('modal-contact-subject').innerText = `"${selectedOptionText}"`;

                // Mostrar modal de éxito
                const contactSuccessModal = new bootstrap.Modal(document.getElementById('contactSuccessModal'));
                contactSuccessModal.show();

                // Limpiar formulario y estados de validación
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnHtml;
                contactForm.reset();
                [contactName, contactEmail, contactSubject, contactMessage, contactPrivacy].forEach(el => {
                    el.classList.remove('is-valid', 'is-invalid');
                });
            }, 1500);
        }
    });

    // --- FORMULARIO DE NEWSLETTER (BOLETÍN EN FOOTER) ---
    const newsletterForm = document.getElementById('newsletterForm');
    const newsletterEmail = document.getElementById('newsletterEmail');

    newsletterEmail.addEventListener('input', () => {
        const isValid = isValidEmail(newsletterEmail.value);
        if (isValid) {
            newsletterEmail.classList.remove('is-invalid');
            newsletterEmail.classList.add('is-valid');
        } else {
            newsletterEmail.classList.remove('is-valid');
        }
    });

    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailVal = newsletterEmail.value;

        if (isValidEmail(emailVal)) {
            newsletterEmail.value = '';
            newsletterEmail.classList.remove('is-valid', 'is-invalid');
            
            // Reemplazar input temporalmente con un mensaje de éxito bonito
            const parent = newsletterForm.parentElement;
            const successAlert = document.createElement('div');
            successAlert.className = 'alert alert-success alert-dismissible fade show rounded-pill py-2 px-3 small border-0 mt-2';
            successAlert.innerHTML = `
                <i class="bi bi-check-circle-fill me-1"></i> ¡Suscrito con éxito!
                <button type="button" class="btn-close py-2" data-bs-dismiss="alert" aria-label="Close"></button>
            `;
            parent.appendChild(successAlert);

            // Borrar la alerta en 4 segundos
            setTimeout(() => {
                if (successAlert) {
                    const bsAlert = bootstrap.Alert.getOrCreateInstance(successAlert);
                    bsAlert.close();
                }
            }, 4000);
        } else {
            newsletterEmail.classList.add('is-invalid');
        }
    });

});
