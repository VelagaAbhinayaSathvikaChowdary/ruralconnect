// =====================
// Authentication
// =====================

// Check if user is logged in; redirect to login page if not
function requireLogin() {
  if (!localStorage.getItem('currentUser')) {
    // In real backend: check token/session instead
    alert("Please login to continue.");
    window.location.href = "login.html";
  }
}

// Logout functionality
const logoutBtns = [
  document.getElementById('logoutBtn'),
  document.getElementById('logoutBtn2'),
  document.getElementById('logoutBtn3')
];

logoutBtns.forEach(btn => {
  if(btn){
    btn.addEventListener('click', () => {
      localStorage.removeItem('currentUser');
      window.location.href = "login.html";
    });
  }
});

// Signup
const signupForm = document.getElementById('signupForm');
if (signupForm) {
  signupForm.addEventListener('submit', e => {
    e.preventDefault();

    // In real backend: POST /signup
    const userData = {
      name: document.getElementById('signupName').value,
      email: document.getElementById('signupEmail').value,
      password: document.getElementById('signupPassword').value
    };

    localStorage.setItem('userEmail', userData.email);
    localStorage.setItem('userPassword', userData.password);
    alert("Signup successful! Please login.");
    window.location.href = "login.html";
  });
}

// Login
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const pass = document.getElementById('loginPassword').value;

    const savedEmail = localStorage.getItem('userEmail');
    const savedPass = localStorage.getItem('userPassword');

    // In real backend: POST /login and get token
    if (email === savedEmail && pass === savedPass) {
      localStorage.setItem('currentUser', email);
      window.location.href = "home.html";
    } else {
      alert("Invalid credentials!");
    }
  });
}

// =====================
// Upload Functionality
// =====================

const uploadForm = document.getElementById('uploadForm');
if (uploadForm) {
  uploadForm.addEventListener('submit', e => {
    e.preventDefault();
    
    const upload = {
      type: document.getElementById('type').value,
      name: document.getElementById('name').value,
      description: document.getElementById('desc').value,
      price: document.getElementById('price').value || "N/A",
      address: document.getElementById('address').value,
      phone: document.getElementById('phone').value,
      likes: 0
    };

    // For demo: store in localStorage
    let uploads = JSON.parse(localStorage.getItem('userUploads') || '[]');
    uploads.push(upload);
    localStorage.setItem('userUploads', JSON.stringify(uploads));

    // In real backend: POST /uploads

    alert("Uploaded successfully!");
    e.target.reset();
  });
}

// =====================
// Modal for Card Details
// =====================

function openModal(item) {
  const modal = document.getElementById('infoModal');
  if(!modal) return;

  document.getElementById('modalTitle').textContent = item.name;
  document.getElementById('modalDesc').textContent = item.description;
  document.getElementById('modalPrice').textContent = "Price: ₹" + item.price;
  document.getElementById('modalAddress').textContent = "Address: " + (item.address || "N/A");
  document.getElementById('modalPhone').textContent = "Phone: " + (item.phone || "N/A");

  const likeBtn = document.getElementById('likeBtn');
  const dislikeBtn = document.getElementById('dislikeBtn');

  // Initialize counters if undefined
  item.likes = item.likes || 0;
  item.dislikes = item.dislikes || 0;

  likeBtn.textContent = `❤️ Like (${item.likes})`;
  dislikeBtn.textContent = `💔 Dislike (${item.dislikes})`;

  // Like button click
  likeBtn.onclick = () => {
    item.likes++;
    likeBtn.textContent = `❤️ Like (${item.likes})`;
    saveItem(item);
  };

  // Dislike button click
  dislikeBtn.onclick = () => {
    item.dislikes++;
    dislikeBtn.textContent = `💔 Dislike (${item.dislikes})`;
    saveItem(item);
  };

  modal.style.display = "block";
}

// Save updated item to localStorage
function saveItem(item){
  let uploads = JSON.parse(localStorage.getItem('userUploads') || '[]');
  const index = uploads.findIndex(u => u.name === item.name && u.type === item.type);
  if(index !== -1){
    uploads[index] = item;
    localStorage.setItem('userUploads', JSON.stringify(uploads));
  }

  // For backend: replace with PATCH /uploads/:id to update likes/dislikes
}


function closeModal() {
  const modal = document.getElementById('infoModal');
  if(modal) modal.style.display = "none";
}

// =====================
// Home Page Population
// =====================

const publicTools = [
  {name:"Lawn Mower", description:"Electric lawn mower", price:1500, address:"Village A", phone:"1234567890", type:"tool", likes:0},
  {name:"Hammer Set", description:"Complete hammer kit", price:500, address:"Village B", phone:"9876543210", type:"tool", likes:0}
];

const publicSkills = [
  {name:"Basic Carpentry", description:"Learn to make wooden furniture", price:200, address:"Village C", phone:"1112223333", type:"skill", likes:0},
  {name:"Computer Basics", description:"Learn MS Office & internet", price:300, address:"Village D", phone:"4445556666", type:"skill", likes:0}
];

function populateHome() {
  requireLogin();
  const toolsContainer = document.getElementById('tools');
  const skillsContainer = document.getElementById('skills');
  if(!toolsContainer || !skillsContainer) return;

  toolsContainer.innerHTML = '';
  skillsContainer.innerHTML = '';

  const uploads = JSON.parse(localStorage.getItem('userUploads') || '[]');

  const allTools = [...publicTools, ...uploads.filter(u => u.type === "tool")];
  const allSkills = [...publicSkills, ...uploads.filter(u => u.type === "skill")];

  allTools.forEach(item => {
    const div = document.createElement('div');
    div.className = "card";
    div.innerHTML = `<h3>${item.name}</h3><p>${item.description}</p><p>₹${item.price}</p>`;
    div.addEventListener('click', () => openModal(item));
    toolsContainer.appendChild(div);
  });

  allSkills.forEach(item => {
    const div = document.createElement('div');
    div.className = "card";
    div.innerHTML = `<h3>${item.name}</h3><p>${item.description}</p><p>₹${item.price}</p>`;
    div.addEventListener('click', () => openModal(item));
    skillsContainer.appendChild(div);
  });
}
function populateProfile() {
  requireLogin();
  const container = document.getElementById('uploadsContainer');
  if(!container) return;
  container.innerHTML = '';
  const uploads = JSON.parse(localStorage.getItem('userUploads') || '[]');
  uploads.forEach(item => {
    const div = document.createElement('div');
    div.className = "card";
    div.innerHTML = `<h3>${item.name}</h3>
                     <p>${item.description}</p>
                     <p>₹${item.price}</p>
                     <p>Address: ${item.address || 'N/A'}</p>
                     <p>Phone: ${item.phone || 'N/A'}</p>`;
    div.addEventListener('click', () => openModal(item));
    container.appendChild(div);
  });
}

// =====================
// Search & Filter
// =====================

const searchInput = document.getElementById('searchInput');
const filterType = document.getElementById('filterType');

if(searchInput && filterType){
  const filterCards = () => {
    const query = searchInput.value.toLowerCase();
    const type = filterType.value;
    document.querySelectorAll('#tools .card, #skills .card').forEach(card => {
      const text = card.innerText.toLowerCase();
      if(type === 'all'){
        card.style.display = text.includes(query) ? 'block' : 'none';
      } else {
        const isTool = card.parentElement.id === 'tools';
        if((type==='tool' && isTool) || (type==='skill' && !isTool)){
          card.style.display = text.includes(query) ? 'block' : 'none';
        } else card.style.display = 'none';
      }
    });
  };

  searchInput.addEventListener('input', filterCards);
  filterType.addEventListener('change', filterCards);
}
