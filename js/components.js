// Function to load and inject HTML components into specified containers
class SpecialHeader extends HTMLElement {
    async connectedCallback() {
        const htmlFile = '/pages/pag-navbar/navbar.html'; // Replace with the actual path to your HTML file
        try {
            const response = await fetch(htmlFile);
            if (!response.ok) throw new Error('Network response was not ok');

            const content = await response.text();
            console.log('Fetched content:', content);
            this.innerHTML = content;
        } catch (error) {
            console.error('Failed to load the HTML file:', error);
            this.innerHTML = '<p>Error loading content</p>';
        }
    }
}

customElements.define('special-header', SpecialHeader);

/**class SpecialFooter extends HTMLElement {
    async connectedCallback() {
        const htmlFile = '/pages/pag-navbar/footer.html'; // Replace with the actual path to your HTML file
        try {
            const response = await fetch(htmlFile);
            if (!response.ok) throw new Error('Network response was not ok');

            const content = await response.text();
            console.log('Fetched content:', content);
            this.innerHTML = content;
        } catch (error) {
            console.error('Failed to load the HTML file:', error);
            this.innerHTML = '<p>Error loading content</p>';
        }
    }
}

customElements.define('special-footer', SpecialFooter);**/