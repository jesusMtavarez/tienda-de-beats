
document.addEventListener('DOMContentLoaded', () => {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const cartCount = document.querySelector('.cart-count');
    const cartItemsContainer = document.getElementById('cartItems');
    const subtotalEl = document.getElementById('subtotal');
    const ivaEl = document.getElementById('iva');
    const totalEl = document.getElementById('total');
    const discountEl = document.getElementById('discount');
    const couponInput = document.getElementById('couponCode');
    let discountPercent = 0;

    function updateCartCount() {
        if (cartCount) {
            cartCount.textContent = cart.length;
        }
    }

    function addToCart(item) {
        item.quantity = 1;
        cart.push(item);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        alert(`${item.name} è stato aggiunto al carrello!`);
        renderCart();
    }

    function calculateTotals() {
        const subtotal = cart.reduce((sum, item) =>
            sum + (parseFloat(item.price.replace('$', '')) * item.quantity), 0);
        const iva = subtotal * 0.22;
        const discount = subtotal * (discountPercent / 100);
        const total = subtotal + iva - discount;

        subtotalEl.textContent = subtotal.toFixed(2);
        ivaEl.textContent = iva.toFixed(2);
        discountEl.textContent = `-${discount.toFixed(2)}`;
        totalEl.textContent = total.toFixed(2);
    }

    function removeFromCart(index) {
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        renderCart();
    }

    function updateQuantity(index, newQuantity) {
        cart[index].quantity = parseInt(newQuantity) || 1;
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
    }

    function applyCoupon() {
        const code = couponInput.value.trim().toUpperCase();
        if (code === 'SCONTO10') {
            discountPercent = 10;
            alert('Hai ottenuto uno sconto del 10%!');
        } else {
            discountPercent = 0;
            alert('Codice non valido.');
        }
        calculateTotals();
    }

    function renderCart() {
        if (!cartItemsContainer) return;

        cartItemsContainer.innerHTML = '';
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="empty-cart">Il carrello è vuoto.</p>';
        } else {
            cart.forEach((item, index) => {
                const cartItem = document.createElement('div');
                cartItem.classList.add('cart-item');
                cartItem.innerHTML = `
                    <span>${item.name} (${item.type})</span>
                    <span>${item.price}</span>
                    <input type="number" min="1" value="${item.quantity}" class="quantity-input" data-index="${index}">
                    <button class="remove-btn" data-index="${index}">Rimuovi</button>
                `;
                cartItemsContainer.appendChild(cartItem);
            });

            document.querySelectorAll('.remove-btn').forEach(button => {
                button.addEventListener('click', () => {
                    const index = button.getAttribute('data-index');
                    removeFromCart(index);
                });
            });

            document.querySelectorAll('.quantity-input').forEach(input => {
                input.addEventListener('change', () => {
                    const index = input.getAttribute('data-index');
                    updateQuantity(index, input.value);
                });
            });
        }

        calculateTotals();
    }

    // Pulsante applica coupon
    const couponBtn = document.getElementById('applyCouponBtn');
    if (couponBtn) couponBtn.addEventListener('click', applyCoupon);

    // Aggiunta beat al carrello
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const beatCard = button.closest('.beat-card');
            if (beatCard) {
                const beatName = beatCard.querySelector('.beat-title')?.textContent || 'Beat';
                const beatPrice = beatCard.querySelector('.beat-price')?.textContent || '$0.00';
                const beatItem = {
                    type: 'beat',
                    name: beatName,
                    price: beatPrice
                };
                addToCart(beatItem);
            }
        });
    });

    // Aggiunta servizi al carrello
    const services = [
        { name: 'Instrumental Composition', price: '$299.99' },
        { name: 'Mezcla', price: '$199.99' },
        { name: 'Mastering', price: '$149.99' }
    ];

    document.querySelectorAll('.service-card').forEach((card, index) => {
        const addButton = document.createElement('button');
        addButton.textContent = 'Aggiungi al Carrello';
        addButton.classList.add('add-to-cart');
        addButton.style.cssText = `
            margin-top: 20px;
            background: #ff5500;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 20px;
            cursor: pointer;
            transition: background 0.3s;
        `;
        addButton.addEventListener('mouseover', () => addButton.style.background = '#ff3300');
        addButton.addEventListener('mouseout', () => addButton.style.background = '#ff5500');
        addButton.addEventListener('click', () => {
            const serviceItem = {
                type: 'service',
                name: services[index].name,
                price: services[index].price
            };
            addToCart(serviceItem);
        });
        card.appendChild(addButton);
    });

    // Riproduzione beat (simulata)
    document.querySelectorAll('.play-btn').forEach(button => {
        button.addEventListener('click', () => {
            const beatCard = button.closest('.beat-card');
            const beatName = beatCard?.querySelector('.beat-title')?.textContent || 'Beat';
            alert(`Riproduzione anteprima di "${beatName}" (simulata)`);
        });
    });

    //pay musica
    document.querySelectorAll('.play-btn0').forEach(button => {
        button.addEventListener('click', () => {
            const audio = document.getElementById('audio-preview0');
            if (audio.paused) {
                audio.play();
            } else {
                audio.pause();
            }
        });
    });
    document.querySelectorAll('.play-btn1').forEach(button => {
        button.addEventListener('click', () => {
            const audio = document.getElementById('audio-preview1');
            if (audio.paused) {
                audio.play();
            } else {
                audio.pause();
            }
        });
    });
    document.querySelectorAll('.play-btn2').forEach(button => {
        button.addEventListener('click', () => {
            const audio = document.getElementById('audio-preview2');
            if (audio.paused) {
                audio.play();
            } else {
                audio.pause();
            }
        });
    });
    document.querySelectorAll('.play-btn3').forEach(button => {
        button.addEventListener('click', () => {
            const audio = document.getElementById('audio-preview3');
            if (audio.paused) {
                audio.play();
            } else {
                audio.pause();
            }
        });
    });
    document.querySelectorAll('.play-btn4').forEach(button => {
        button.addEventListener('click', () => {
            const audio = document.getElementById('audio-preview4');
            if (audio.paused) {
                audio.play();
            } else {
                audio.pause();
            }
        });
    });
    document.querySelectorAll('.play-btn5').forEach(button => {
        button.addEventListener('click', () => {
            const audio = document.getElementById('audio-preview5');
            if (audio.paused) {
                audio.play();
            } else {
                audio.pause();
            }
        });
    });
    document.querySelectorAll('.play-btn6').forEach(button => {
        button.addEventListener('click', () => {
            const audio = document.getElementById('audio-preview6');
            if (audio.paused) {
                audio.play();
            } else {
                audio.pause();
            }
        });
    });
    document.querySelectorAll('.play-btn7').forEach(button => {
        button.addEventListener('click', () => {
            const audio = document.getElementById('audio-preview7');
            if (audio.paused) {
                audio.play();
            } else {
                audio.pause();
            }
        });
    });
    document.querySelectorAll('.play-btn8').forEach(button => {
        button.addEventListener('click', () => {
            const audio = document.getElementById('audio-preview8');
            if (audio.paused) {
                audio.play();
            } else {
                audio.pause();
            }
        });
    });
    document.querySelectorAll('.play-btn9').forEach(button => {
        button.addEventListener('click', () => {
            const audio = document.getElementById('audio-preview9');
            if (audio.paused) {
                audio.play();
            } else {
                audio.pause();
            }
        });
    });
    document.querySelectorAll('.play-btn10').forEach(button => {
        button.addEventListener('click', () => {
            const audio = document.getElementById('audio-preview10');
            if (audio.paused) {
                audio.play();
            } else {
                audio.pause();
            }
        });
    });

    // Contatto
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();

            if (!name || !email || !subject || !message) {
                alert('Per favore, compila tutti i campi.');
                return;
            }

            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                alert('Inserisci un indirizzo email valido.');
                return;
            }

            const formData = { name, email, subject, message, timestamp: new Date().toISOString() };
            const contacts = JSON.parse(localStorage.getItem('contacts') || '[]');
            contacts.push(formData);
            localStorage.setItem('contacts', JSON.stringify(contacts));

            alert(`Messaggio inviato con successo!`);
            contactForm.reset();
        });
    }

    //contactos 2
    document.querySelector('.contact-form form').addEventListener('submit', async function(e) {
        e.preventDefault();
    
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

     
    
        try {
            const response = await fetch('http://localhost:3000/send-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, subject, message })
            });
    
            if (response.ok) {
                alert('Messaggio inviato con successo!');
            } else {
                alert('Errore nell\'invio del messaggio.');
            }
        } catch (error) {
            console.error('Errore:', error);
            alert('Errore di connessione.');
        }

      

        
    });
    

    // Inizializzazione
    updateCartCount();
    renderCart();
});

