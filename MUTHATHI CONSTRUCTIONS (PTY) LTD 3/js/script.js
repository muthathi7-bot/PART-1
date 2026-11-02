// Muthathi Constructions - Part 3 JavaScript
// All interactive features start here. Nothing runs until the page is ready.

document.addEventListener('DOMContentLoaded', function () {

    // 1. Hamburger menu on mobile
    // Toggles the nav open and closed. Closes when a link is clicked.
    var hamburger = document.querySelector('.hamburger');
    var mainNav = document.getElementById('main-nav');
    if (hamburger && mainNav) {
        hamburger.addEventListener('click', function () {
            var isOpen = mainNav.classList.toggle('open');
            hamburger.classList.toggle('open', isOpen);
            hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });

        mainNav.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                mainNav.classList.remove('open');
                hamburger.classList.remove('open');
                hamburger.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // 2. Time-based greeting on homepage
    // Says good morning, afternoon, or evening depending on the hour.
    var greetingEl = document.getElementById('greeting');
    if (greetingEl) {
        var hour = new Date().getHours();
        var greeting;
        if (hour < 12) {
            greeting = 'Good morning, and welcome to Muthathi Constructions.';
        } else if (hour < 18) {
            greeting = 'Good afternoon, and welcome to Muthathi Constructions.';
        } else {
            greeting = 'Good evening, and welcome to Muthathi Constructions.';
        }
        greetingEl.textContent = greeting;
    }

    // 3. Featured service on services page
    // Picks a different service each day of the week.
    var featuredServiceEl = document.getElementById('featured-service');
    if (featuredServiceEl) {
        var services = [
            { name: 'General Construction', desc: 'Full builds from foundation to finish, delivered on schedule.' },
            { name: 'Renovations', desc: 'Modern updates for homes and offices. Extensions, remodels, and more.' },
            { name: 'Painting and Finishing', desc: 'Flawless interior and exterior finishes that protect your property.' },
            { name: 'Paving', desc: 'Durable driveways, walkways, and patios that stand up to daily use.' },
            { name: 'Building Maintenance', desc: 'Keep your property in top shape with regular upkeep and repairs.' }
        ];
        var dayIndex = new Date().getDay() % services.length;
        var featured = services[dayIndex];
        featuredServiceEl.innerHTML = '<h3>Featured This Week: ' + featured.name + '</h3><p>' + featured.desc + '</p>';
    }

    // 4. Search filter on services page
    // Hides cards that do not match the text typed in the search box.
    var searchInput = document.getElementById('service-search');
    if (searchInput) {
        var serviceCards = document.querySelectorAll('.service-card');
        var noResults = document.getElementById('no-results');

        searchInput.addEventListener('input', function () {
            var term = this.value.toLowerCase().trim();
            var visibleCount = 0;
            serviceCards.forEach(function (card) {
                var text = card.textContent.toLowerCase();
                if (term === '' || text.indexOf(term) !== -1) {
                    card.style.display = '';
                    visibleCount++;
                } else {
                    card.style.display = 'none';
                }
            });
            if (noResults) {
                noResults.style.display = visibleCount === 0 ? 'block' : 'none';
            }
        });
    }

    // 5. Lightbox for gallery images
    // Click any gallery image to open a full-screen preview. Escape closes it.
    var galleryImages = document.querySelectorAll('.gallery-img');
    if (galleryImages.length > 0) {
        var lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = '<span class="lightbox-close" aria-label="Close image">&times;</span><img class="lightbox-img" src="" alt="">';
        document.body.appendChild(lightbox);

        var lightboxImg = lightbox.querySelector('.lightbox-img');
        var closeBtn = lightbox.querySelector('.lightbox-close');

        function openLightbox(img) {
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt;
            lightbox.classList.add('active');
        }

        function closeLightbox() {
            lightbox.classList.remove('active');
            lightboxImg.src = '';
        }

        galleryImages.forEach(function (img) {
            img.addEventListener('click', function () { openLightbox(img); });
            img.setAttribute('tabindex', '0');
            img.addEventListener('keydown', function (e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openLightbox(img);
                }
            });
        });

        closeBtn.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', function (e) {
            if (e.target === lightbox) closeLightbox();
        });
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') closeLightbox();
        });
    }

    // 6. Accordion for project details
    // Only one section stays open at a time. Button text switches between Show and Hide.
    var accordionButtons = document.querySelectorAll('.accordion-toggle');
    if (accordionButtons.length > 0) {
        accordionButtons.forEach(function (button) {
            button.addEventListener('click', function () {
                var content = this.nextElementSibling;
                var isOpen = content.classList.contains('open');

                document.querySelectorAll('.accordion-content').forEach(function (c) {
                    c.classList.remove('open');
                });
                document.querySelectorAll('.accordion-toggle').forEach(function (b) {
                    b.textContent = 'Show Project Details';
                    b.setAttribute('aria-expanded', 'false');
                });

                if (!isOpen) {
                    content.classList.add('open');
                    this.textContent = 'Hide Project Details';
                    this.setAttribute('aria-expanded', 'true');
                }
            });
        });
    }

    // 7. Interactive map on contact page
    // Leaflet draws the map. Two markers show the two offices.
    var mapEl = document.getElementById('office-map');
    if (mapEl && typeof L !== 'undefined') {
        var map = L.map('office-map').setView([-22.95, 30.48], 11);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors',
            maxZoom: 18
        }).addTo(map);

        L.marker([-22.95, 30.48])
            .addTo(map)
            .bindPopup('<strong>Muthathi Constructions - Head Office</strong><br>123 Main Street, Thohoyandou, 0950')
            .openPopup();

        L.marker([-23.15, 30.85])
            .addTo(map)
            .bindPopup('<strong>Muthathi Constructions - Regional Office</strong><br>45 Church Street, Elim, 0955');

        L.control.scale().addTo(map);
    }

    // 8. Get directions button
    // Opens Google Maps directions to the head office in a new tab.
    var directionsBtn = document.getElementById('directions-btn');
    if (directionsBtn) {
        directionsBtn.addEventListener('click', function () {
            window.open('https://www.google.com/maps/dir/?api=1&destination=Thohoyandou,Limpopo,South+Africa', '_blank', 'noopener');
        });
    }

    // 9. Scroll animations
    // Sections fade in when they enter the screen. Uses IntersectionObserver.
    var animatedSections = document.querySelectorAll('.animate-on-scroll');
    if (animatedSections.length > 0 && 'IntersectionObserver' in window) {
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });
        animatedSections.forEach(function (section) { observer.observe(section); });
    } else {
        animatedSections.forEach(function (section) { section.classList.add('visible'); });
    }

    // 10. Enquiry form
    // Validates fields, calculates a cost range, and sends data with fetch().
    var enquiryForm = document.getElementById('enquiry-form');
    if (enquiryForm) {
        enquiryForm.addEventListener('submit', function (e) {
            e.preventDefault();
            handleEnquirySubmit(enquiryForm);
        });
    }

    function handleEnquirySubmit(form) {
        var fullname = document.getElementById('fullname');
        var email = document.getElementById('email');
        var phone = document.getElementById('phone');
        var category = document.getElementById('category');
        var location = document.getElementById('location');
        var description = document.getElementById('description');
        var responseBox = document.getElementById('form-response');
        var submitBtn = form.querySelector('.submit-button');
        var isValid = true;

        // Clear old errors before validating again
        form.querySelectorAll('.error-message').forEach(function (el) { el.remove(); });
        form.querySelectorAll('input, select, textarea').forEach(function (el) { el.classList.remove('invalid'); });

        function showError(field, msg) {
            field.classList.add('invalid');
            var error = document.createElement('span');
            error.className = 'error-message';
            error.textContent = msg;
            field.parentNode.appendChild(error);
            isValid = false;
        }

        if (fullname.value.trim().length < 2) showError(fullname, 'Please enter your full name.');

        var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email.value.trim())) showError(email, 'Please enter a valid email address.');

        var phonePattern = /^[0-9+\s\-()]{10,}$/;
        if (!phonePattern.test(phone.value.trim())) showError(phone, 'Please enter a valid phone number (at least 10 digits).');

        if (category.value === '') showError(category, 'Please select a service.');

        if (description.value.trim().length < 10) showError(description, 'Please describe your project (at least 10 characters).');

        if (!isValid) {
            responseBox.textContent = 'Please fix the errors above and try again.';
            responseBox.className = 'form-response error';
            return;
        }

        // Base price range for each service
        var baseEstimates = {
            'general-construction': [50000, 500000],
            'renovations': [20000, 150000],
            'painting-finishing': [8000, 45000],
            'paving': [15000, 80000],
            'maintenance': [2500, 25000]
        };

        // Bigger cities cost slightly more
        var locationLower = (location.value || '').toLowerCase();
        var locationMultiplier = 1;
        if (locationLower.indexOf('johannesburg') !== -1 || locationLower.indexOf('sandton') !== -1) {
            locationMultiplier = 1.15;
        } else if (locationLower.indexOf('pretoria') !== -1) {
            locationMultiplier = 1.05;
        } else if (locationLower.indexOf('polokwane') !== -1) {
            locationMultiplier = 1.10;
        }

        // Longer descriptions suggest bigger projects
        var sizeMultiplier = 1;
        var descLength = description.value.trim().length;
        if (descLength > 200) sizeMultiplier = 1.3;
        else if (descLength > 100) sizeMultiplier = 1.15;

        var base = baseEstimates[category.value];
        var minEst = Math.round(base[0] * locationMultiplier * sizeMultiplier);
        var maxEst = Math.round(base[1] * locationMultiplier * sizeMultiplier);

        var categoryText = category.options[category.selectedIndex].text;
        var formatter = new Intl.NumberFormat('en-ZA', { style: 'currency', currency: 'ZAR', maximumFractionDigits: 0 });

        // Show spinner while sending
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="spinner"></span>Sending...';

        var payload = {
            fullname: fullname.value.trim(),
            email: email.value.trim(),
            phone: phone.value.trim(),
            category: categoryText,
            location: location.value.trim(),
            description: description.value.trim()
        };

        // Send data with fetch. If it fails, still show the estimate locally.
        fetch('https://httpbin.org/post', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        })
        .then(function (response) {
            return response.json();
        })
        .then(function () {
            responseBox.innerHTML =
                '<strong>Thank you, ' + payload.fullname + '.</strong><br>' +
                'Your enquiry for <strong>' + categoryText + '</strong> has been received.<br>' +
                '<strong>Estimated cost:</strong> ' + formatter.format(minEst) + ' to ' + formatter.format(maxEst) + '<br>' +
                '<em>(Based on ' + (payload.location || 'your area') + ' and project scope.)</em><br>' +
                'We will contact you at <strong>' + payload.email + '</strong> within 48 hours.';
            responseBox.className = 'form-response success';
            form.reset();
        })
        .catch(function () {
            responseBox.innerHTML =
                '<strong>Thank you, ' + payload.fullname + '.</strong><br>' +
                'Your enquiry has been received locally.<br>' +
                '<strong>Estimated cost:</strong> ' + formatter.format(minEst) + ' to ' + formatter.format(maxEst) + '<br>' +
                'We will contact you at <strong>' + payload.email + '</strong> within 48 hours.';
            responseBox.className = 'form-response success';
            form.reset();
        })
        .finally(function () {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Submit Quote Request';
        });
    }

    // 11. Contact form
    // Validates fields, sends with fetch, and builds a mailto link as backup.
    var contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            handleContactSubmit(contactForm);
        });
    }

    function handleContactSubmit(form) {
        var fullname = document.getElementById('contact-name');
        var email = document.getElementById('contact-email');
        var messageType = document.getElementById('contact-type');
        var message = document.getElementById('contact-message');
        var responseBox = document.getElementById('contact-response');
        var submitBtn = form.querySelector('.submit-button');
        var isValid = true;

        form.querySelectorAll('.error-message').forEach(function (el) { el.remove(); });
        form.querySelectorAll('input, select, textarea').forEach(function (el) { el.classList.remove('invalid'); });

        function showError(field, msg) {
            field.classList.add('invalid');
            var error = document.createElement('span');
            error.className = 'error-message';
            error.textContent = msg;
            field.parentNode.appendChild(error);
            isValid = false;
        }

        if (fullname.value.trim().length < 2) showError(fullname, 'Please enter your full name.');

        var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email.value.trim())) showError(email, 'Please enter a valid email address.');

        if (message.value.trim().length < 10) showError(message, 'Please write a message (at least 10 characters).');

        if (!isValid) {
            responseBox.textContent = 'Please fix the errors above and try again.';
            responseBox.className = 'form-response error';
            return;
        }

        var payload = {
            fullname: fullname.value.trim(),
            email: email.value.trim(),
            type: messageType.value,
            message: message.value.trim()
        };

        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="spinner"></span>Sending...';

        fetch('https://httpbin.org/post', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        })
        .then(function () {
            var subject = encodeURIComponent(payload.type + ' from ' + payload.fullname);
            var body = encodeURIComponent(
                'Name: ' + payload.fullname + '\n' +
                'Email: ' + payload.email + '\n' +
                'Type: ' + payload.type + '\n\n' +
                'Message:\n' + payload.message
            );
            var mailtoLink = 'mailto:info@muthathiconstructions.co.za?subject=' + subject + '&body=' + body;

            responseBox.innerHTML =
                '<strong>Thank you, ' + payload.fullname + '.</strong><br>' +
                'Your message has been received.<br>' +
                '<a href="' + mailtoLink + '">Click here to also send it directly to our inbox</a>.';
            responseBox.className = 'form-response success';
        })
        .catch(function () {
            var subject = encodeURIComponent(payload.type + ' from ' + payload.fullname);
            var body = encodeURIComponent(
                'Name: ' + payload.fullname + '\n' +
                'Email: ' + payload.email + '\n' +
                'Type: ' + payload.type + '\n\n' +
                'Message:\n' + payload.message
            );
            var mailtoLink = 'mailto:info@muthathiconstructions.co.za?subject=' + subject + '&body=' + body;

            responseBox.innerHTML =
                '<strong>Thank you, ' + payload.fullname + '.</strong><br>' +
                '<a href="' + mailtoLink + '">Click here to open the message in your email app and send it</a>.';
            responseBox.className = 'form-response success';
        })
        .finally(function () {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';
        });
    }
});