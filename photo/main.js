gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
  // --- 1. Data Structure ---
  const photoData = [
    {
      date: "2024-01",
      sectionId: "section-1",
      text: {
        title: "The Beginning",
        description: "In a distant kingdom, bordered by ancient oaks and morning mist, lay the Enchanted Forest. It was said that deep within its depths lay a millennial secret, guarded by ancient spirits."
      },
      carousel: [
        {
          subtitle: "The grand moment",
          title: "Le tour",
          description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.",
          btnText: "Explore the tour",
          imageUrl: "https://images.pexels.com/photos/991012/pexels-photo-991012.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
        },
        {
          subtitle: "The big window",
          title: "Minimal window",
          description: "Clear Glass Window With Brown and White Wooden Frame iste natus error sit voluptatem accusantium doloremque laudantium.",
          btnText: "Read the article",
          imageUrl: "https://images.pexels.com/photos/921294/pexels-photo-921294.png?auto=compress&cs=tinysrgb&h=750&w=1260"
        }
      ]
    },
    {
      date: "2024-02",
      sectionId: "section-2",
      text: {
        title: "The Creature",
        description: "As the trees thickened and the light grew scarce, a silhouette appeared. This creature watched over the balance of the forest, protecting all living beings from a forgotten evil."
      },
      carousel: [
        {
          subtitle: "Tropical palms",
          title: "Palms",
          description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.",
          btnText: "Explore the palms",
          imageUrl: "https://images.pexels.com/photos/92733/pexels-photo-92733.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
        }
      ]
    },
    {
      date: "2024-03",
      sectionId: "section-3",
      text: {
        title: "The Challenge",
        description: "Guided by unexpected courage, the adventurer prepared to break the curse that lay upon these lands. The fate of the Enchanted Forest now rested in their hands."
      },
      carousel: [
        {
          subtitle: "Beach",
          title: "The beach",
          description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.",
          btnText: "Explore the beach",
          imageUrl: "https://images.pexels.com/photos/1008732/pexels-photo-1008732.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
        },
        {
          subtitle: "The white building",
          title: "White building",
          description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.",
          btnText: "Read the article",
          imageUrl: "https://images.pexels.com/photos/1029614/pexels-photo-1029614.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
        }
      ]
    }
  ];

  // --- 2. Element Selectors ---
  const timelineContainer = document.querySelector(".timeline-container");
  const storyContainer = document.querySelector(".story-container");
  const timelineProgress = document.createElement('div');
  timelineProgress.className = 'timeline-progress';
  timelineContainer.appendChild(timelineProgress);
  
  const modalOverlay = document.querySelector(".modal-overlay");
  const modalImage = document.querySelector(".modal-image");
  const modalClose = document.querySelector(".modal-close");

  // --- 3. Dynamic Generation ---
  photoData.forEach(data => {
    // A. Generate Timeline Item
    const timelineItem = document.createElement("a");
    timelineItem.className = "timeline-item";
    timelineItem.href = `#${data.sectionId}`;
    timelineItem.dataset.section = data.sectionId;
    timelineItem.innerHTML = `
      <div class="timeline-dot"></div>
      <span class="timeline-date">${data.date}</span>
    `;
    timelineContainer.appendChild(timelineItem);
    
    // B. Generate Story Section
    const section = document.createElement("section");
    section.className = "story-section";
    section.id = data.sectionId;

    let carouselItemsHTML = '';
    data.carousel.forEach((item, index) => {
      carouselItemsHTML += `
        <div class="carousel-item ${index === 0 ? 'active' : ''}">
          <div class="carousel-item__image" style="background-image: url('${item.imageUrl}')"></div>
          <div class="carousel-item__info">
            <h2 class="carousel-item__subtitle">${item.subtitle}</h2>
            <h1 class="carousel-item__title">${item.title}</h1>
            <p class="carousel-item__description">${item.description}</p>
            <a href="#" class="carousel-item__btn">${item.btnText}</a>
          </div>
        </div>
      `;
    });

    section.innerHTML = `
      <div class="text-block">
        <h2>${data.text.title}</h2>
        <p>${data.text.description}</p>
      </div>
      <div class="image-block">
        <div class="carousel">
          <div class="carousel__nav">
            <span class="carousel__arrow carousel__arrow--left">
              <svg class="carousel__icon" width="24" height="24" viewBox="0 0 24 24"><path d="M20,11V13H8L13.5,18.5L12.08,19.92L4.16,12L12.08,4.08L13.5,5.5L8,11H20Z"></path></svg>
            </span>
            <span class="carousel__arrow carousel__arrow--right">
              <svg class="carousel__icon" width="24" height="24" viewBox="0 0 24 24"><path d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z"></path></svg>
            </span>
          </div>
          ${carouselItemsHTML}
        </div>
      </div>
    `;
    storyContainer.appendChild(section);
  });

  // --- 4. Functionality ---

  // A. Carousel Logic
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

    carousel.querySelector('.carousel__arrow--left').addEventListener('click', () => {
      setSlide(current, current - 1);
    });
    
    carousel.querySelector('.carousel__arrow--right').addEventListener('click', () => {
      setSlide(current, current + 1);
    });

    // Add modal click listener to each image
    items.forEach(item => {
        const imgDiv = item.querySelector('.carousel-item__image');
        imgDiv.addEventListener('click', () => {
            const imageUrl = window.getComputedStyle(imgDiv).backgroundImage.slice(4, -1).replace(/"/g, "");
            modalImage.src = imageUrl;
            modalOverlay.classList.add('visible');
        });
    });
  });

  // B. Scroll-based Timeline Activation (GSAP ScrollTrigger)
  const sections = document.querySelectorAll(".story-section");
  const timelineItems = document.querySelectorAll(".timeline-item");

  sections.forEach((section, index) => {
    ScrollTrigger.create({
      trigger: section,
      start: "top center",
      end: "bottom center",
      onToggle: self => {
        timelineItems[index].classList.toggle("active", self.isActive);
      }
    });
  });
  
  // Animate timeline progress bar
  gsap.to(timelineProgress, {
      width: '90%',
      ease: 'none',
      scrollTrigger: {
          trigger: '.story-container',
          start: 'top top',
          end: 'bottom bottom',
          scrub: true
      }
  });

  // C. Modal closing logic
  modalClose.addEventListener("click", () => modalOverlay.classList.remove('visible'));
  modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) {
      modalOverlay.classList.remove('visible');
    }
  });
}); 