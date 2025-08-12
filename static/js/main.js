// Set darkmode
document.getElementById('mode').addEventListener('click', () => {

    document.body.classList.toggle('dark');
    localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
  
});
  
// enforce local storage setting but also fallback to user-agent preferences
if (localStorage.getItem('theme') === 'dark' || (!localStorage.getItem('theme') && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
  
  document.body.classList.add('dark');
  
}

// Sidebar collapsible functionality
document.addEventListener('DOMContentLoaded', function() {
  // Initialize sidebar state from localStorage
  const sidebarState = JSON.parse(localStorage.getItem('sidebarState') || '{}');

  // Set up collapsible sections (main level)
  const collapsibleHeaders = document.querySelectorAll('.sidebar-header.collapsible, .nested-header.collapsible');

  collapsibleHeaders.forEach(header => {
    const targetId = header.getAttribute('data-target');
    const targetList = document.getElementById(targetId);

    if (targetList) {
      // Restore state from localStorage
      const isCollapsed = sidebarState[targetId] === false; // default to expanded

      if (isCollapsed) {
        header.classList.add('collapsed');
        targetList.classList.add('collapsed');
      }

      // Add click handler
      header.addEventListener('click', function() {
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
