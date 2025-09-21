// Function to load and inject HTML components into specified containers
async function loadComponent(containerId, fileName) {
    const containerElement = document.getElementById(containerId); // Get the container element by ID
    if (containerElement) {
        try {
            const response = await fetch(`component/${fileName}`); // Fetch the HTML file
            const content = await response.text(); // Get the text content
            containerElement.innerHTML = content; // Inject the content into the container
        } catch (error) {
            console.error(`Error loading component ${fileName}:`, error);
        }
    }
}

// Inject all common components when loading the page
document .addEventListener("DOMContentLoaded", () => { 
    loadComponent("navbar", "navbar.html");
    loadComponent("footer", "footer.html");
});