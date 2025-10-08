// Function to load and inject navbar HTML components into specified containers
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

// Function to load and inject footer HTML components into specified containers
class SpecialFooter extends HTMLElement {
    async connectedCallback() {
        const htmlFile = '/pages/pag-footer/footer.html'; // Replace with the actual path to your HTML file
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

customElements.define('special-footer', SpecialFooter);

/**
 * Sección para el LOADER
 */
class SpecialLoader extends HTMLElement {
    async connectedCallback() {
        // Bloquear scroll mientras está el loader
        //esto con la finalidad de que no salgan las barrachas laterales e inferior
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';

        //aquí se contiene al html loader
        const htmlFile = '/pages/pag-loader/loader.html';
        //Realiza una petición de red (asíncrona) para obtener el contenido del archivo loader.html. El await pausa la ejecución hasta que la respuesta se recibe
        try {
            const response = await fetch(htmlFile);
            if (!response.ok) throw new Error('Network response was not ok');
            const content = await response.text();
            this.innerHTML = content;

            // Variable de control para ejecutar solo una vez
            let loaderHidden = false;

            // Función para ocultar el loader
            const hideLoader = () => {
                //Si el loader ya está oculto (loaderHidden es true), termina la función inmediatamente para evitar ejecuciones duplicadas
                if (loaderHidden) return;
                loaderHidden = true;

                console.log('Ocultando loader');
                this.classList.add('hidden');

                //Restaura el scroll de la pagina a su valor por defecto, permitiendo que el usuario se desplace
                setTimeout(() => {
                    document.body.style.overflow = '';
                    document.documentElement.style.overflow = '';
                    this.remove();
                }, 300);
            };

            // Timeout mínimo para ver la animación
            const minLoadTime = setTimeout(() => {
                hideLoader();
            }, 2500); // se verá la animación por mínimo 2.5 segundos

            // Timeout máximo, se coloca por seguridad en caso de que tarde en cargar que este 3 segundos
            const maxLoadTime = setTimeout(() => {
                console.log('Timeout máximo alcanzado');
                hideLoader();
            }, 3000); // maximo tendra 3.0 segundos

            // Cuando el DOM esté completamente listo
            if (document.readyState === 'complete' || document.readyState === 'interactive') {
                // Si ya está listo, esperar el mínimo
                setTimeout(hideLoader, 800);
            } else {
                document.addEventListener('DOMContentLoaded', () => {
                    // DOM listo, esperar solo el mínimo
                    setTimeout(hideLoader, 800);
                });
            }

            // Limpiar timeouts si se oculta antes
            this.addEventListener('transitionend', () => {
                clearTimeout(minLoadTime);
                clearTimeout(maxLoadTime);
            });

        } catch (error) {
            console.error('Failed to load the loader:', error);
            // Restaurar scroll si falla
            document.body.style.overflow = '';
            document.documentElement.style.overflow = '';
            this.remove();
        }
    }
}
customElements.define('special-loader', SpecialLoader);

