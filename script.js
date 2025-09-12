document.addEventListener("DOMContentLoaded", () => {
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })

  // Enhanced intersection observer for fade-in animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible")
        // Stagger animation for child elements
        const children = entry.target.querySelectorAll(
          ".skill-card, .experience-card, .education-card, .project-card, .language-item",
        )
        children.forEach((child, index) => {
          setTimeout(() => {
            child.style.opacity = "1"
            child.style.transform = "translateY(0)"
          }, index * 100)
        })
      }
    })
  }, observerOptions)

  // Observe all content sections
  document.querySelectorAll(".content-section").forEach((section) => {
    observer.observe(section)
  })

  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset
    const heroPattern = document.querySelector(".hero-pattern")
    if (heroPattern) {
      heroPattern.style.transform = `translateY(${scrolled * 0.3}px) rotate(${scrolled * 0.01}deg)`
    }
  })

  const heroName = document.querySelector(".hero-name")
  if (heroName) {
    const text = heroName.textContent
    heroName.textContent = ""
    let i = 0

    const typeWriter = () => {
      if (i < text.length) {
        heroName.textContent += text.charAt(i)
        i++
        setTimeout(typeWriter, 80)
      } else {
        // Add blinking cursor effect
        const cursor = document.createElement("span")
        cursor.textContent = "_"
        cursor.style.animation = "blink 1s infinite"
        cursor.style.color = "var(--color-neon-cyan)"
        heroName.appendChild(cursor)
      }
    }

    // Start typing effect after a short delay
    setTimeout(typeWriter, 1000)
  }

  document.querySelectorAll(".skill-tag").forEach((tag) => {
    tag.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-3px) scale(1.05)"
      this.style.boxShadow = "0 0 15px var(--color-neon-cyan)"
    })

    tag.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)"
      this.style.boxShadow = "0 0 10px var(--color-neon-cyan)"
    })
  })

  document.querySelectorAll(".project-card").forEach((card) => {
    card.addEventListener("click", function (e) {
      if (!e.target.closest("a")) {
        const link = this.querySelector(".project-link")
        if (link) {
          // Add click effect
          this.style.transform = "scale(0.98)"
          setTimeout(() => {
            this.style.transform = ""
            link.click()
          }, 150)
        }
      }
    })
  })

  function createDataStream() {
    const stream = document.createElement("div")
    stream.className = "data-stream"
    stream.style.left = Math.random() * window.innerWidth + "px"
    stream.style.animationDelay = Math.random() * 2 + "s"
    document.body.appendChild(stream)

    setTimeout(() => {
      stream.remove()
    }, 3000)
  }

  // Create data streams periodically
  setInterval(createDataStream, 2000)

  document.querySelectorAll(".section-header h2").forEach((header) => {
    header.addEventListener("mouseenter", function () {
      const originalText = this.textContent
      const chars = "01ABCDEFGHIJKLMNOPQRSTUVWXYZ"
      let iterations = 0

      const interval = setInterval(() => {
        this.textContent = originalText
          .split("")
          .map((char, index) => {
            if (index < iterations) {
              return originalText[index]
            }
            return chars[Math.floor(Math.random() * chars.length)]
          })
          .join("")

        if (iterations >= originalText.length) {
          clearInterval(interval)
        }

        iterations += 1 / 3
      }, 30)
    })
  })

  const cursor = document.createElement("div")
  cursor.style.cssText = `
    position: fixed;
    width: 20px;
    height: 20px;
    background: radial-gradient(circle, var(--color-neon-cyan) 0%, transparent 70%);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9999;
    mix-blend-mode: screen;
    transition: transform 0.1s ease-out;
  `
  document.body.appendChild(cursor)

  document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX - 10 + "px"
    cursor.style.top = e.clientY - 10 + "px"
  })

  // Initialize animations for elements already in view
  setTimeout(() => {
    const visibleSections = document.querySelectorAll(".content-section")
    visibleSections.forEach((section) => {
      const rect = section.getBoundingClientRect()
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        section.classList.add("visible")
      }
    })
  }, 100)
})
