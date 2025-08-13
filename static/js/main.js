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
});
