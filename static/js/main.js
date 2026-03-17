// Set darkmode
document.getElementById('mode').addEventListener('click', () => {
    const isDark = document.body.classList.contains('dark');

    if (isDark) {
        // Switch to light mode
        document.documentElement.classList.remove('dark');
        document.documentElement.classList.add('light');
        document.body.classList.remove('dark');
        localStorage.setItem('theme', 'light');
    } else {
        // Switch to dark mode
        document.documentElement.classList.remove('light');
        document.documentElement.classList.add('dark');
        document.body.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    }
});

// enforce local storage setting but also fallback to user-agent preferences
// (Note: Early script in base.html handles most cases, this is for fallback)
if (localStorage.getItem('theme') === 'dark' || (!localStorage.getItem('theme') && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
  document.documentElement.classList.add('dark');
  document.body.classList.add('dark');
} else if (localStorage.getItem('theme') === 'light') {
  document.documentElement.classList.add('light');
}

// Sidebar collapsible functionality
document.addEventListener('DOMContentLoaded', function() {
  // Initialize sidebar state from localStorage
  const sidebarState = JSON.parse(localStorage.getItem('sidebarState') || '{}');

  // Function to auto-expand sections containing active links
  function autoExpandActiveSection() {
    const activeLinks = document.querySelectorAll('.docs-link.active');

    activeLinks.forEach(activeLink => {
      // Find the parent section that contains this active link
      let parentSection = activeLink.closest('.sidebar-list');

      if (parentSection && parentSection.id) {
        // Find the header that controls this section
        const sectionHeader = document.querySelector(`[data-target="${parentSection.id}"]`);

        if (sectionHeader) {
          // Force expand this section and update state
          sectionHeader.classList.remove('collapsed');
          parentSection.classList.remove('collapsed');
          sidebarState[parentSection.id] = true;
        }
      }
    });

    // Save updated state
    localStorage.setItem('sidebarState', JSON.stringify(sidebarState));
  }

  // Set up collapsible sections (main and nested level)
  const collapsibleHeaders = document.querySelectorAll('.sidebar-header.collapsible, .nested-header.collapsible');

  collapsibleHeaders.forEach(header => {
    const targetId = header.getAttribute('data-target');
    const targetList = document.getElementById(targetId);

    if (targetList) {
      // Restore state from localStorage (default to expanded)
      const isCollapsed = sidebarState[targetId] === false;

      if (isCollapsed) {
        header.classList.add('collapsed');
        targetList.classList.add('collapsed');
      }

      // Add click handler
      header.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();

        const isCurrentlyCollapsed = header.classList.contains('collapsed');

        if (isCurrentlyCollapsed) {
          // Expand
          header.classList.remove('collapsed');
          targetList.classList.remove('collapsed');
          sidebarState[targetId] = true;
        } else {
          // Collapse
          header.classList.add('collapsed');
          targetList.classList.add('collapsed');
          sidebarState[targetId] = false;
        }

        // Save state to localStorage
        localStorage.setItem('sidebarState', JSON.stringify(sidebarState));
      });
    }
  });

  // Auto-expand sections containing active links after all sections are initialized
  autoExpandActiveSection();

  // Code block copy buttons
  document.querySelectorAll('pre > code').forEach(codeEl => {
    const pre = codeEl.parentElement;

    const btn = document.createElement('button');
    btn.classList.add('btn-clipboard', 'copy-status');
    btn.setAttribute('aria-label', 'Copy to clipboard');

    const wrapper = document.createElement('div');
    wrapper.classList.add('doks-clipboard');
    wrapper.appendChild(btn);
    pre.parentNode.insertBefore(wrapper, pre);

    btn.addEventListener('click', () => {
      navigator.clipboard.writeText(codeEl.textContent).then(() => {
        btn.focus();
        setTimeout(() => btn.blur(), 2000);
      });
    });
  });
});
