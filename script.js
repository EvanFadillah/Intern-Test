// Menyimpan kursus dan materi terkaitnya
let courses = {};

// Form Element
const courseTitleInput = document.getElementById('course-title');
const courseDescInput = document.getElementById('course-desc');
const courseDurationInput = document.getElementById('course-duration');
const addButton = document.querySelector('form button');

// Course list container
const courseList = document.querySelector('.course-list');

// Function untuk membuat item course baru
function createCourseItem(title, description, duration) {
    // Membuat container item course
    const courseItem = document.createElement('div');
    courseItem.classList.add('course-tables');
    
    // Sembunyikan dlu
    courseItem.style.display = 'none';

    // Membuat text container
    const textContainer = document.createElement('div');
    textContainer.classList.add('text-container');

    // Tambah title
    const courseTitle = document.createElement('h3');
    courseTitle.textContent = title;

    // Tambah description
    const courseDesc = document.createElement('p');
    courseDesc.id = 'description';
    courseDesc.textContent = description;

    // Tambah duration
    const courseDuration = document.createElement('p');
    courseDuration.id = 'duration';
    courseDuration.innerHTML = `<span id="time-val">${duration}</span> Hours`;

    // Gabung text elements ke text container
    textContainer.appendChild(courseTitle);
    textContainer.appendChild(courseDesc);
    textContainer.appendChild(courseDuration);

    // Buat container icon
    const iconContainer = document.createElement('div');
    iconContainer.classList.add('icon-container');

    // Tambahkan edit icon
    const editIcon = document.createElement('i');
    editIcon.classList.add('fa-solid', 'fa-pen-to-square');
    // Tambahkan event listener untuk fitur edit
    editIcon.addEventListener('click', () => editCourseItem(courseItem, title, description, duration));

    // Tambahkan delete icon
    const deleteIcon = document.createElement('i');
    deleteIcon.classList.add('fa-solid', 'fa-trash');
    // Tambahkan event listener untuk fitur delete
    deleteIcon.addEventListener('click', () => courseItem.remove());

    // Gabung icons ke icon container
    iconContainer.appendChild(editIcon);
    iconContainer.appendChild(deleteIcon);

    // Gabung text container dan icon container ke course item
    courseItem.appendChild(textContainer);
    courseItem.appendChild(iconContainer);

    // Tambahkan event listener ke course item untuk menampilkan detail di course-container
    courseItem.addEventListener('click', () => displayCourseDetails(title, description, duration));

    return courseItem;
}

// Function untuk menampilkan detail course di course-container
function displayCourseDetails(title, description, duration) {
    const courseTitleElement = document.querySelector('.chosen-container #course-title');
    const courseDescElement = document.querySelector('.chosen-container #course-desc');
    const courseDurationElement = document.querySelector('.chosen-container #course-duration');

    const chosenContainer = document.querySelector('.chosen-container');

    // Update dengan detail course yang dipilih
    courseTitleElement.textContent = title;
    courseDescElement.textContent = description;
    courseDurationElement.textContent = `${duration} Hours`;

    // Tampilkan chosen-container jika sebelumnya disembunyikan
    chosenContainer.style.display = 'flex';

    // Tampilkan materi yang terkait dengan kursus ini
    displayMaterials(title);
}

// Function untuk menampilkan materi yang terkait dengan kursus tertentu
function displayMaterials(courseTitle) {
    const materialList = document.querySelector('.material-list .material-box');
    materialList.innerHTML = ''; // Bersihkan list sebelum menambahkan materi baru

    if (courses[courseTitle] && courses[courseTitle].materials) {
        courses[courseTitle].materials.forEach(material => {
            const materialItem = createMaterialItem(material.title, material.description, material.link);
            materialList.appendChild(materialItem);
        });
    }
}

// Function untuk membuat item materi baru
function createMaterialItem(title, description, link) {
    const materialItem = document.createElement('div');
    materialItem.classList.add('material-tables');

    const textContainer = document.createElement('div');
    textContainer.classList.add('text-container');

    const materialTitle = document.createElement('h3');
    materialTitle.textContent = title;

    const materialDesc = document.createElement('p');
    materialDesc.textContent = description;

    const materialLink = document.createElement('p');
    const linkElement = document.createElement('a');
    linkElement.href = link;
    linkElement.textContent = 'Visit material';
    linkElement.target = '_blank';
    materialLink.appendChild(linkElement);

    textContainer.appendChild(materialTitle);
    textContainer.appendChild(materialDesc);
    textContainer.appendChild(materialLink);

    const iconContainer = document.createElement('div');
    iconContainer.classList.add('icon-container');

    const editIcon = document.createElement('i');
    editIcon.classList.add('fa-solid', 'fa-pen-to-square');
    // Tambahkan fitur edit jika diperlukan

    const deleteIcon = document.createElement('i');
    deleteIcon.classList.add('fa-solid', 'fa-trash');
    deleteIcon.addEventListener('click', () => materialItem.remove());

    iconContainer.appendChild(editIcon);
    iconContainer.appendChild(deleteIcon);

    materialItem.appendChild(textContainer);
    materialItem.appendChild(iconContainer);

    return materialItem;
}

// Function untuk handle course baru
function addCourse() {
    // Ambil value inputnya 
    const title = courseTitleInput.value.trim();
    const description = courseDescInput.value.trim();
    const duration = courseDurationInput.value;

    // Cek inputs
    if (title && description && duration >= 0) {
        // Buat item course baru
        const courseItem = createCourseItem(title, description, duration);

        // Tampilkan course 
        courseItem.style.display = 'flex';

        // Tambah course baru ke course list
        courseList.appendChild(courseItem);

        // Simpan data kursus
        courses[title] = {
            description: description,
            duration: duration,
            materials: []
        };

        // Clearkan input
        courseTitleInput.value = '';
        courseDescInput.value = '';
        courseDurationInput.value = '';
    } else {
        alert('Please fill out all fields with valid values.');
    }
}

// Function untuk handle editing course item
function editCourseItem(courseItem, oldTitle, oldDescription, oldDuration) {
    // Terisi dengan value yang lama
    courseTitleInput.value = oldTitle;
    courseDescInput.value = oldDescription;
    courseDurationInput.value = oldDuration;

    // Hapus value yang lama
    courseItem.remove();
}

// Function untuk handle materi baru
function addMaterial() {
    const materialTitleInput = document.getElementById('material-title');
    const materialDescInput = document.getElementById('material-desc');
    const materialLinkInput = document.getElementById('material-link');

    const courseTitle = document.querySelector('.chosen-container #course-title').textContent;

    if (!courseTitle) {
        alert('Please select a course first.');
        return;
    }

    const title = materialTitleInput.value.trim();
    const description = materialDescInput.value.trim();
    const link = materialLinkInput.value.trim();

    if (title && description && link) {
        const materialItem = createMaterialItem(title, description, link);

        // Tambahkan materi ke kursus yang dipilih
        courses[courseTitle].materials.push({
            title: title,
            description: description,
            link: link
        });

        // Tampilkan materi baru di list
        const materialList = document.querySelector('.material-list .material-box');
        materialList.appendChild(materialItem);

        // Clearkan input
        materialTitleInput.value = '';
        materialDescInput.value = '';
        materialLinkInput.value = '';
    } else {
        alert('Please fill out all fields with valid values.');
    }
}

// Tambah event listener ke Add button
addButton.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent form submission jika kosong
    addCourse();
});

const materialAddButton = document.querySelector('.material-input form button');
materialAddButton.addEventListener('click', (event) => {
    event.preventDefault(); // Prevent form submission jika kosong
    addMaterial();
});
