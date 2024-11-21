const rooms = [
    {
        id: 1,
        name: "Standard Room",
        description: "Cozy room with essential amenities",
        price: 50,
        maxGuests: 2,
        image: "standard-room.jpg",
        amenities: ["Free Wi-Fi", "TV", "Private Bathroom"],
        availableRooms: 10
    },
    {
        id: 2,
        name: "Deluxe Room",
        description: "Spacious room with premium features",
        price: 80,
        maxGuests: 3,
        image: "deluxe-room.jpg",
        amenities: ["King Size Bed", "Mini Bar", "City View"],
        availableRooms: 5
    },
    {
        id: 3,
        name: "Executive Suite",
        description: "Luxury suite with premium services",
        price: 150,
        maxGuests: 4,
        image: "executive-suite.jpg", 
        amenities: ["Living Room", "Jacuzzi", "Personal Concierge"],
        availableRooms: 3
    }
];

let cart = [];

function displayRooms() {
    const container = document.getElementById('rooms-container');
    rooms.forEach(room => {
        const roomCard = document.createElement('div');
        roomCard.classList.add('room-card');
        
        // Generate guest select options based on max guests
        const guestOptions = Array.from({length: room.maxGuests}, (_, i) => 
            `<option value="${i+1}">${i+1} Guest${i+1 > 1 ? 's' : ''}</option>`
        ).join('');
        
        roomCard.innerHTML = `
            <img src="${room.image}" alt="${room.name}">
            <h3>${room.name}</h3>
            <p>${room.description}</p>
            <p>Price: $${room.price}/night</p>
            <p>Available Rooms: ${room.availableRooms}</p>
            <ul>${room.amenities.map(amenity => `<li>${amenity}</li>`).join('')}</ul>
            
            <div class="room-booking">
                <select id="guests-${room.id}" class="guest-select">
                    <option value="">Select Guests</option>
                    ${guestOptions}
                </select>
                <button onclick="addToCart(${room.id})">Add to Cart</button>
            </div>
        `;
        container.appendChild(roomCard);
    });
}

function addToCart(roomId) {
    const room = rooms.find(r => r.id === roomId);
    const guestSelect = document.getElementById(`guests-${roomId}`);
    const selectedGuests = guestSelect.value;
    
    if (!selectedGuests) {
        alert("Please select number of guests");
        return;
    }
    
    if (room.availableRooms > 0) {
        const cartItem = {
            ...room,
            guests: parseInt(selectedGuests)
        };
        
        cart.push(cartItem);
        room.availableRooms--;
        updateCart();
    } else {
        alert("Sorry, no rooms available!");
    }
}

function updateCart() {
    const cartList = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const bookingDetails = document.getElementById('booking-details');
    
    cartList.innerHTML = '';
    bookingDetails.innerHTML = '';
    let total = 0;
    
    cart.forEach((room, index) => {
        // Cart list item
        const li = document.createElement('li');
        li.textContent = `${room.name} - ${room.guests} Guest(s) - $${room.price}`;
        cartList.appendChild(li);
        
        // Booking details section
        const detailDiv = document.createElement('div');
        detailDiv.innerHTML = `
            <h4>${room.name} (${room.guests} Guest${room.guests > 1 ? 's' : ''})</h4>
            <input type="hidden" name="room-${index}" value="${room.id}">
            <input type="hidden" name="guests-${index}" value="${room.guests}">
        `;
        bookingDetails.appendChild(detailDiv);
        
        total += room.price;
    });
    
    cartTotal.textContent = total;
}

document.getElementById('booking-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }
    
    const fullName = document.getElementById('full-name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    
    const totalCost = cart.reduce((sum, room) => sum + room.price, 0);
    
    const bookingDetails = `
    Booking Confirmation:
    Name: ${fullName}
    Email: ${email}
    Phone: ${phone}
    
    Rooms Booked:
    ${cart.map(room => `${room.name} (${room.guests} Guest${room.guests > 1 ? 's' : ''})`).join('\n')}
    
    Total Rooms: ${cart.length}
    Total Cost: $${totalCost}
    `;
    
    alert(bookingDetails);
    cart = [];
    updateCart();
    this.reset();
});

window.onload = displayRooms;