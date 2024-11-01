
// Video capture
const cameraStream = document.getElementById('camera-stream');
const captureButton = document.getElementById('capture-button');

async function setupCamera() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        cameraStream.srcObject = stream;
    } catch (error) {
        console.error("Camera access denied:", error);
        alert("Please enable camera access to use this feature.");
    }
}

captureButton.addEventListener("click", () => {
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    canvas.width = cameraStream.videoWidth;
    canvas.height = cameraStream.videoHeight;
    context.drawImage(cameraStream, 0, 0, canvas.width, canvas.height);
    const imageData = canvas.toDataURL("image/png");
    console.log("Captured image data:", imageData);
    alert("Frame captured!");
});

// Save user information
function saveInfo() {
    const formElements = document.getElementById("user-form").elements;
    const userData = {};

    for (let i = 0; i < formElements.length; i++) {
        if (formElements[i].type !== "button") {
            userData[formElements[i].name] = formElements[i].value;
        }
    }

    localStorage.setItem("userData", JSON.stringify(userData));
    alert("User information saved!");
}


// Subscription form handling
document.getElementById("subscription-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    localStorage.setItem("subscriberEmail", email);
    document.getElementById("subscription-status").textContent = 
        `Subscribed with email: ${email}`;
    alert("Thank you for subscribing!");
});

// Initialize features
window.onload = () => {
    setupCamera();
};

function handlePayment(method) {
    // Simulate transaction processing
    setTimeout(() => {
        alert(`Payment via ${method} is successful!`);
        displaySuccessMessage();
        addOrderedItem();
    }, 1000); // Simulate a short delay
}

function displaySuccessMessage() {
    document.getElementById('payment-options').style.display = 'none';
    document.getElementById('success-message').style.display = 'block';
}

function redirectToShop() {
    window.location.href = 'shop.html';
}

// Function to display modal with 'OK' button
// Function to add an item to localStorage and display transaction success
// Function to add an item to localStorage and display transaction success
function processPayment(method) {
    alert(`Payment successful via ${method}`);

    // Retrieve item data to store (assuming this data is set previously in your shop)
    const item = "Sample Item"; // Replace with actual item data from your shop

    // Retrieve or initialize orderedItems array in localStorage
    let orderedItems = JSON.parse(localStorage.getItem('orderedItems')) || [];
    
    // Add new item to the array and update localStorage
    orderedItems.push(item);
    localStorage.setItem('orderedItems', JSON.stringify(orderedItems));

    // Show transaction success modal
    const modal = document.getElementById('transaction-modal');
    modal.style.display = 'flex';
}

// Close modal and redirect to shop page
function closeModal() {
    const modal = document.getElementById('transaction-modal');
    modal.style.display = 'none';
    window.location.href = "shop.html";
}

// On page load for user.html, load and display ordered items from localStorage
function displayOrderedItems() {
    const orderedItemsContainer = document.getElementById('ordered-items');
    const orderedItems = JSON.parse(localStorage.getItem('orderedItems')) || [];

    // Clear existing items and add all ordered items to the container
    orderedItemsContainer.innerHTML = ''; // Ensure it starts clean
    orderedItems.forEach(item => {
        const itemElement = document.createElement('p');
        itemElement.textContent = item;
        itemElement.classList.add('ordered-item');
        orderedItemsContainer.appendChild(itemElement);
    });
}

// Call displayOrderedItems() if on user.html
if (window.location.pathname.includes("user.html")) {
    displayOrderedItems();
}

function showTransactionSuccess() {
    alert("Transaction successful!");
    setTimeout(() => {
        window.location.href = "shop.html";
    }, 2000); // Redirects to shop.html after 2 seconds
}


function toggleDropdown() {
    const dropdown = document.getElementById("userDropdown");
    dropdown.style.display = dropdown.style.display === "flex" ? "none" : "flex";
}

// Close the dropdown if clicked outside
window.onclick = function(event) {
    const dropdown = document.getElementById("userDropdown");
    if (!event.target.closest('.user-icon') && dropdown.style.display === "flex") {
        dropdown.style.display = "none";
    }
};


function loginWithGoogle() {
    // Initialize Google Sign-In API code
    alert("Google sign-in placeholder");
}

function loginWithFacebook() {
    // Initialize Facebook SDK API code
    alert("Facebook sign-in placeholder");
}
