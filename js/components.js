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

customElements.define('special-footer', SpecialFooter)**/

/**
 * Sección para el LOADER
 */
class SpecialLoader extends HTMLElement {
    async connectedCallback() {
        // Bloquear scroll en o que esta el loader
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';
        
        const htmlFile = '/pages/pag-loader/loader.html';
        try {
            const response = await fetch(htmlFile);
            if (!response.ok) throw new Error('Network response was not ok');
            const content = await response.text();
            this.innerHTML = content;
            
            window.addEventListener('load', () => {
                this.classList.add('hidden');
                
                setTimeout(() => {
                    // Restaurar scroll
                    document.body.style.overflow = '';
                    document.documentElement.style.overflow = '';
                    this.remove();
                }, 300);
            });
            
        } catch (error) {
            console.error('Failed to load the loader:', error);
            // Restaurar scroll si falla la pagina y el usuario no se quede sin poder hacer scroll
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
            this.remove();
        }
    }
}
customElements.define('special-loader', SpecialLoader);


