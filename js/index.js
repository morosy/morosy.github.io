document.addEventListener("DOMContentLoaded", () => {
    const seeMoreBtn = document.getElementById("see-more-btn");
    const moreContent = document.getElementById("more-content");
    const skillIcons = document.querySelectorAll(".skills-icon-row img");
    const body = document.body;

    // Show native tooltip from alt text on hover.
    skillIcons.forEach((icon) => {
        const altText = icon.getAttribute("alt");
        if (altText && !icon.getAttribute("title")) {
            icon.setAttribute("title", altText);
        }
    });

    if (!seeMoreBtn || !moreContent) {
        return;
    }

    const collapsedLabel = seeMoreBtn.textContent ? seeMoreBtn.textContent.trim() : "More";
    const expandedLabel = seeMoreBtn.dataset.expandedLabel || "Close";
    body.classList.toggle("page-expanded", moreContent.classList.contains("visible"));

    seeMoreBtn.addEventListener("click", () => {
        moreContent.classList.toggle("visible");
        const isExpanded = moreContent.classList.contains("visible");
        body.classList.toggle("page-expanded", isExpanded);
        seeMoreBtn.textContent = isExpanded ? expandedLabel : collapsedLabel;
    });
});

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}
