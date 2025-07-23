gsap.registerPlugin(ScrollTrigger);

// --- 1. Data Structure ---
const photoData = [
  {
    date: "16/01/2024",
    displayDate: "16 Jan",
    sectionId: "section-1",
    title: "The Beginning",
    description: "In a distant kingdom, bordered by ancient oaks and morning mist, lay the Enchanted Forest. It was said that deep within its depths lay a millennial secret, guarded by ancient spirits.",
    carousel: [
      {
        subtitle: "The grand moment",
        title: "Le tour",
        description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.",
        imageUrl: "https://images.pexels.com/photos/991012/pexels-photo-991012.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
      },
      {
        subtitle: "The big window",
        title: "Minimal window",
        description: "Clear Glass Window With Brown and White Wooden Frame iste natus error sit voluptatem accusantium doloremque laudantium.",
        imageUrl: "https://images.pexels.com/photos/921294/pexels-photo-921294.png?auto=compress&cs=tinysrgb&h=750&w=1260"
      }
    ]
  },
  {
    date: "28/02/2024",
    displayDate: "28 Feb",
    sectionId: "section-2",
    title: "The Creature",
    description: "As the trees thickened and the light grew scarce, a silhouette appeared. This creature watched over the balance of the forest, protecting all living beings from a forgotten evil.",
    carousel: [
      {
        subtitle: "Tropical palms",
        title: "Palms",
        description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.",
        imageUrl: "https://images.pexels.com/photos/92733/pexels-photo-92733.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
      },
      {
        subtitle: "Forest guardian",
        title: "Ancient Oak",
        description: "Deep in the forest stands an ancient oak, its branches reaching toward the sky like protective arms watching over all creatures below.",
        imageUrl: "https://images.pexels.com/photos/1632790/pexels-photo-1632790.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
      },
      {
        subtitle: "Mystical path",
        title: "Forest Trail",
        description: "A winding path through the enchanted forest, where every step reveals new mysteries and ancient secrets waiting to be discovered.",
        imageUrl: "https://images.pexels.com/photos/1578662/pexels-photo-1578662.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
      }
    ]
  },
  {
    date: "20/03/2024",
    displayDate: "20 Mar",
    sectionId: "section-3",
    title: "The Challenge",
    description: "Guided by unexpected courage, the adventurer prepared to break the curse that lay upon these lands. The fate of the Enchanted Forest now rested in their hands.",
    carousel: [
      {
        subtitle: "Beach",
        title: "The beach",
        description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.",
        imageUrl: "https://images.pexels.com/photos/1008732/pexels-photo-1008732.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
      },
      {
        subtitle: "The white building",
        title: "White building",
        description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.",
        imageUrl: "https://images.pexels.com/photos/1029614/pexels-photo-1029614.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
      }
    ]
  }
];

// --- 2. Generate Story Content ---
function generateStoryContent() {
  const storyContainer = document.querySelector('.story-container');

  photoData.forEach((data, index) => {
    // Generate story section for carousel
    const section = document.createElement('section');
    section.className = 'story-section';
    section.id = data.sectionId;
    section.innerHTML = `
      <div class="image-block">
        <div class="carousel">
          ${data.carousel.length > 1 ? generateCarouselNav() : ''}
          ${generateCarouselItems(data.carousel)}
        </div>
      </div>
    `;
    storyContainer.appendChild(section);
  });
}

function generateCarouselNav() {
  return `
    <div class="carousel__nav">
      <span class="carousel__arrow carousel__arrow--left">
        <svg class="carousel__icon" width="24" height="24" viewBox="0 0 24 24">
          <path d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z"></path>
        </svg>
      </span>
      <span class="carousel__arrow carousel__arrow--right">
        <svg class="carousel__icon" width="24" height="24" viewBox="0 0 24 24">
          <path d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z"></path>
        </svg>
      </span>
    </div>
  `;
}

function generateCarouselItems(carouselData) {
  return carouselData.map((item, index) => `
    <div class="carousel-item ${index === 0 ? 'active' : ''}">
      <div class="carousel-item__image" style="background-image: url('${item.imageUrl}')"></div>
      <div class="carousel-item__info">
        <h2 class="carousel-item__subtitle">${item.subtitle}</h2>
        <h1 class="carousel-item__title">${item.title}</h1>
        <p class="carousel-item__description">${item.description}</p>
      </div>
    </div>
  `).join('');
}

// --- 3. Initialize Everything ---
document.addEventListener('DOMContentLoaded', function () {
  generateStoryContent();
  initCarousels();
  initModal();
  initScrollTriggers();
});

// --- 4. Carousel Functionality ---
function initCarousels() {
  document.querySelectorAll('.carousel').forEach(carousel => {
    let current = 0;
    const items = carousel.querySelectorAll('.carousel-item');
    const total = items.length;

    function setSlide(prev, next) {
      if (next >= total) next = 0;
      if (next < 0) next = total - 1;
      items[prev].classList.remove('active');
      items[next].classList.add('active');
      current = next;
    }

    // Only add navigation event listeners if there are multiple items
    if (total > 1) {
      const leftArrow = carousel.querySelector('.carousel__arrow--left');
      const rightArrow = carousel.querySelector('.carousel__arrow--right');

      if (leftArrow && rightArrow) {
        leftArrow.addEventListener('click', () => {
          setSlide(current, current - 1);
        });

        rightArrow.addEventListener('click', () => {
          setSlide(current, current + 1);
        });
      }
    }

    // Add modal click listener to each image
    items.forEach(item => {
      const imgDiv = item.querySelector('.carousel-item__image');
      imgDiv.addEventListener('click', () => {
        const imageUrl = window.getComputedStyle(imgDiv).backgroundImage.slice(4, -1).replace(/"/g, "");
        const modalImage = document.querySelector(".modal-image");
        const modalOverlay = document.querySelector(".modal-overlay");
        modalImage.src = imageUrl;
        modalOverlay.classList.add('visible');
      });
    });
  });
}

// --- 5. Modal Functionality ---
function initModal() {
  const modalOverlay = document.querySelector(".modal-overlay");
  const modalClose = document.querySelector(".modal-close");

  if (modalClose) {
    modalClose.addEventListener("click", () => modalOverlay.classList.remove('visible'));
  }

  if (modalOverlay) {
    modalOverlay.addEventListener("click", (e) => {
      if (e.target === modalOverlay) {
        modalOverlay.classList.remove('visible');
      }
    });
  }
}

// --- 6. GSAP ScrollTrigger Animations ---
function initScrollTriggers() {
  // Animate story sections on scroll
  gsap.utils.toArray('.story-section').forEach((section) => {
    gsap.fromTo(section,
      {
        opacity: 0,
        y: 100
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );
  });

  // Animate carousel items
  gsap.utils.toArray('.carousel-item').forEach((item) => {
    gsap.fromTo(item.querySelector('.carousel-item__info'),
      {
        opacity: 0,
        x: 50
      },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: item,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    );
  });
}