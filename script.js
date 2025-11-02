let userUploads = [];
let publicTools = [
  { name: "Tractor", description: "Good condition tractor for rent", price: 500, address: "Village Road", phone: "9876543210" },
  { name: "Hammer", description: "Basic hammer for carpentry", price: 50, address: "Main Street", phone: "9123456780" }
];
let publicSkills = [
  { name: "Plumbing", description: "Pipe fitting and maintenance", price: 200, address: "Workshop Area", phone: "9988776655" },
  { name: "Tailoring", description: "Basic stitching classes", price: 300, address: "Community Hall", phone: "9090909090" }
];

// --- Modal Logic ---
function openModal(item) {
  const modal = document.getElementById('infoModal');
  document.getElementById('modalTitle').textContent = item.name;
  document.getElementById('modalDesc').textContent = item.description;
  document.getElementById('modalPrice').textContent = "Price: ₹" + item.price;
  document.getElementById('modalAddress').textContent = "Address: " + (item.address || "N/A");
  document.getElementById('modalPhone').textContent = "Phone: " + (item.phone || "N/A");
  modal.style.display = "block";
}
function closeModal() {
  document.getElementById('infoModal').style.display = "none";
}

// --- Home Page ---
function populateHome() {
  const toolsContainer = document.getElementById('tools');
  const skillsContainer = document.getElementById('skills');

  if(toolsContainer){
    toolsContainer.innerHTML = '';
    publicTools.forEach(tool => {
      const div = document.createElement('div');
      div.className = 'card';
      div.innerHTML = `<h3>${tool.name}</h3><p>${tool.description}</p><p>₹${tool.price}</p>`;
      div.addEventListener('click', () => openModal(tool));
      toolsContainer.appendChild(div);
    });
  }

  if(skillsContainer){
    skillsContainer.innerHTML = '';
    publicSkills.forEach(skill => {
      const div = document.createElement('div');
      div.className = 'card';
      div.innerHTML = `<h3>${skill.name}</h3><p>${skill.description}</p><p>₹${skill.price}</p>`;
      div.addEventListener('click', () => openModal(skill));
      skillsContainer.appendChild(div);
    });
  }
}

// --- Upload Page ---
const uploadForm = document.getElementById('uploadForm');
if(uploadForm){
  uploadForm.addEventListener('submit', e => {
    e.preventDefault();
    const type = e.target.type.value;
    const name = e.target.name.value;
    const description = e.target.description.value;
    const price = e.target.price.value;
    const address = e.target.address.value;
    const phone = e.target.phone.value;

    const newItem = { type, name, description, price, address, phone };
    userUploads.push(newItem);

    alert("Upload added successfully!");
    e.target.reset();
  });
}

// --- Profile Page ---
function populateProfile(){
  const myTools = document.getElementById('myTools');
  const mySkills = document.getElementById('mySkills');

  if(myTools){
    myTools.innerHTML = '';
    userUploads.filter(u=>u.type==='tool').forEach(tool=>{
      const div = document.createElement('div');
      div.className='card';
      div.innerHTML=`<h3>${tool.name}</h3><p>${tool.description}</p><p>₹${tool.price}</p>`;
      div.addEventListener('click', () => openModal(tool));
      myTools.appendChild(div);
    });
  }

  if(mySkills){
    mySkills.innerHTML = '';
    userUploads.filter(u=>u.type==='skill').forEach(skill=>{
      const div = document.createElement('div');
      div.className='card';
      div.innerHTML=`<h3>${skill.name}</h3><p>${skill.description}</p><p>₹${skill.price}</p>`;
      div.addEventListener('click', () => openModal(skill));
      mySkills.appendChild(div);
    });
  }
}
