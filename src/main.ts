import "./style.css";
import { PROJECTS } from "./projects";

const VIEWS = ["home", "about", "skills", "work", "contact"] as const;
type ViewType = (typeof VIEWS)[number];

function setActiveNav(viewName: string): void {
  document.querySelectorAll<HTMLElement>(".nav-link").forEach((el) => {
    const active = viewName === "project" ? el.dataset.nav === "work" : el.dataset.nav === viewName;
    el.classList.toggle("is-active", active);
  });
}

function hideAllViews(): void {
  document.querySelectorAll<HTMLElement>(".view").forEach((el) => {
    el.classList.remove("view--active");
    el.hidden = true;
  });
}

function showView(name: string): void {
  const target: ViewType = (VIEWS as readonly string[]).includes(name)
    ? (name as ViewType)
    : "home";

  hideAllViews();

  const view = document.getElementById(`view-${target}`);
  if (view) {
    view.classList.add("view--active");
    view.hidden = false;
  }

  setActiveNav(target);

  const hash = target === "home" ? "" : `#${target}`;
  if (location.hash !== hash) {
    history.replaceState(null, "", hash || location.pathname);
  }

  document.title =
    target === "home"
      ? "個人網站"
      : `${view?.querySelector(".page-title")?.textContent || target} · 個人網站`;

  closeMobileMenu();
}

function showProject(slug: string): void {
  const project = PROJECTS[slug];
  if (!project) {
    showView("work");
    return;
  }

  hideAllViews();

  const view = document.getElementById("view-project");
  const titleEl = document.getElementById("project-title");
  const imageEl = document.getElementById("project-image") as HTMLImageElement | null;
  const introEl = document.getElementById("project-intro");

  if (titleEl) titleEl.textContent = project.title;

  if (imageEl) {
    imageEl.src = project.image;
    imageEl.alt = project.title;
    imageEl.onerror = function onProjectImageError() {
      imageEl.onerror = null;
      imageEl.src = project.imageFallback;
    };
  }

  if (introEl) {
    introEl.innerHTML = project.intro.map((text) => `<p>${text}</p>`).join("");
  }

  if (view) {
    view.classList.add("view--active");
    view.hidden = false;
  }

  setActiveNav("project");

  const hash = `#project/${slug}`;
  if (location.hash !== hash) {
    history.replaceState(null, "", hash);
  }

  document.title = `${project.title} · 個人網站`;
  closeMobileMenu();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function parseRoute(): void {
  const hash = location.hash.replace(/^#/, "");

  if (hash.startsWith("project/")) {
    showProject(hash.slice("project/".length));
    return;
  }

  showView(hash || "home");
}

function closeMobileMenu(): void {
  const nav = document.querySelector<HTMLElement>(".main-nav");
  const toggle = document.querySelector<HTMLElement>(".menu-toggle");
  nav?.classList.remove("is-open");
  toggle?.setAttribute("aria-expanded", "false");
}

document.addEventListener("click", (e: MouseEvent) => {
  const target = e.target as HTMLElement | null;
  if (!target) return;

  const projectTrigger = target.closest<HTMLElement>("[data-project]");
  if (projectTrigger && projectTrigger.dataset.project) {
    e.preventDefault();
    showProject(projectTrigger.dataset.project);
    return;
  }

  const navTrigger = target.closest<HTMLElement>("[data-nav]");
  if (!navTrigger || !navTrigger.dataset.nav) return;

  e.preventDefault();
  showView(navTrigger.dataset.nav);
});

document.querySelector(".menu-toggle")?.addEventListener("click", () => {
  const nav = document.querySelector<HTMLElement>(".main-nav");
  const toggle = document.querySelector<HTMLElement>(".menu-toggle");
  const open = nav?.classList.toggle("is-open");
  toggle?.setAttribute("aria-expanded", open ? "true" : "false");
});

window.addEventListener("hashchange", parseRoute);
parseRoute();