function getElement(selection) {
  const element = document.querySelector(selection);
  if (element) {
    return element;
  }
  throw new Error(
    `Please check "${selection}" selector, no such element exists`
  );
}


function Gallery(element) {
  this.container = element;
  this.list = [...element.querySelectorAll('.img')];
  this.modal = getElement('.modal');
  this.modalImg = getElement('.main-img');
  this.imageName = getElement('.image-name')
  this.modalImages = getElement('.modal-images');
  this.closeBtn = getElement('.close-btn')
  this.prevBtn = getElement('.prev-btn')
  this.nextBtn = getElement('.next-btn')
  this.closeModal = this.closeModal.bind(this);
  this.nextImg = this.nextImg.bind(this);
  this.prevImg = this.prevImg.bind(this);
  this.chooseImage = this.chooseImage.bind(this);

  // bind functions
  this.container.addEventListener('click', (e) => {
    if (e.target.classList.contains('img'))
    this.openModal(e.target, this.list)
  })
}

Gallery.prototype.openModal = function(selectedImage, list) {
  this.setMainImage(selectedImage);
  this.modalImages.innerHTML = list.map(image => {
    return  `<img src="${image.src}" alt="" class="${selectedImage.dataset.id === image.dataset.id ? "modal-img selected" : "modal-img"}" data-id="${image.dataset.id}" alt="city" title="${image.title}"/>`;
  }).join('')
  this.modal.classList.add('open');
  this.closeBtn.addEventListener('click', this.closeModal)
  this.nextBtn.addEventListener('click', this.nextImg)
  this.prevBtn.addEventListener('click', this.prevImg)
  this.modalImages.addEventListener('click', this.chooseImage);
}

Gallery.prototype.setMainImage = function(selectedImage) {
  this.modalImg.src = selectedImage.src;
  this.imageName.textContent = selectedImage.title;
}

Gallery.prototype.closeModal = function() {
  this.modal.classList.remove('open');
  this.closeBtn.removeEventListener('click', this.closeModal)
  this.nextBtn.removeEventListener('click', this.nextImg)
  this.prevBtn.removeEventListener('click', this.prevImg)
  this.modalImages.removeEventListener('click', this.chooseImage);
}

Gallery.prototype.nextImg = function() {
  const selected = this.modalImages.querySelector('.selected');
  const next = selected.nextElementSibling || this.modalImages.firstElementChild;
  selected.classList.remove('selected');
  next.classList.add('selected');
  this.setMainImage(next);
}

Gallery.prototype.prevImg = function() {
  const selected = this.modalImages.querySelector('.selected');
  const prev = selected.previousElementSibling || this.modalImages.lastElementChild;
  selected.classList.remove('selected');
  prev.classList.add('selected');
  this.setMainImage(prev);
}

Gallery.prototype.chooseImage = function(e) {
  if (e.target.classList.contains('modal-img')) {
    const selected = this.modalImages.querySelector('.selected');
    selected.classList.remove('selected');
    e.target.classList.add('selected')
    this.setMainImage(e.target);
  }
}

const nature = new Gallery(getElement('.nature'))
const city = new Gallery(getElement('.city'))