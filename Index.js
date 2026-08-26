class LibroNew {
    constructor(titulo, autor, precio, añoPublicacion, portada) {
        this.titulo = titulo;
        this.autor = autor;
        this.precio = precio;
        this.añoPublicacion = añoPublicacion;
        this.portada = portada;
    }
}

class Mensajes{
    constructor(){
        this.container = this._createMessageContainer();
    }

    _createMessageContainer(){
        const container = document.createElement("div");
        container.id = "messageContainer";
        container.style.cssText = `
            position: fixed;
            top: 80px;
            left: 20px;
            z-index: 1000;
            display: flex;
            flex-direction: column;
            gap: 10px;
            max-width: 360px;
        `;
        document.body.appendChild(container);
        return container;
    }

    mensaje(mensaje, tipo = "success", duracion = 3000){
        const messageDiv = document.createElement("div");
        messageDiv.className = `alert alert-${tipo} alert-dismissible`;
        messageDiv.setAttribute("role", "alert");
        messageDiv.style.cssText = `
            font-size: 1.1rem;
            padding: 16px 18px;
            border-radius: 0.65rem;
            box-shadow: 0 12px 26px rgba(0, 0, 0, 0.12);
            line-height: 1.5;
        `;
        messageDiv.innerHTML = `
            ${mensaje}
            <button type="button" class="btn-close" aria-label="Close"></button>
        `;

        const closeBtn = messageDiv.querySelector('.btn-close');
        closeBtn.addEventListener('click', () => {
            if (messageDiv.parentNode) messageDiv.parentNode.removeChild(messageDiv);
        });

        this.container.appendChild(messageDiv);

        setTimeout(() => {
            if (messageDiv.parentNode) messageDiv.parentNode.removeChild(messageDiv);
        }, duracion);
    }

    mensajeSuccess(mensaje, duracion){
        this.mensaje(mensaje, "success", duracion);
    }
    mensajeError(mensaje, duracion){
        this.mensaje(mensaje, "danger", duracion);
    }
    mensajeInfo(mensaje, duracion){
        this.mensaje(mensaje, "info", duracion);
    }
}

const mensajes = new Mensajes();

const books = [];
const productsGrid = document.getElementById('productsGrid');
const totalBooks = document.getElementById('totalBooks');
const formLibro = document.getElementById('formLibro');
const submitButton = document.querySelector('.btn-submit');
const panelTitle = document.querySelector('.panel-header h3');

let editingIndex = null;
const defaultCover = 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=512&q=80';

function updateCounters() {
    const total = books.length;
    totalBooks.textContent = total;
}

function createBookCard(libro, index) {
    const card = document.createElement('article');
    card.className = 'book-card';
    card.innerHTML = `
        <img src="${libro.portada || defaultCover}" alt="Portada de ${libro.titulo}" onerror="this.src='${defaultCover}'">
        <div class="book-details">
            <div>
                <h4 class="book-title">${libro.titulo}</h4>
                <p class="book-description">Una pieza esencial para tu biblioteca digital, con todos los datos relevantes listos para consulta.</p>
            </div>
            <div class="book-meta">
                <span><strong>Autor:</strong> ${libro.autor}</span>
                <span><strong>Año:</strong> ${libro.añoPublicacion || 'N/A'}</span>
                <span><strong>Precio:</strong> $${libro.precio || '0.00'}</span>
            </div>
            <div class="book-actions">
                <button type="button" class="btn btn-outline-primary btn-edit">Editar</button>
                <button type="button" class="btn btn-outline-danger btn-delete">Eliminar</button>
            </div>
        </div>
    `;

    const editButton = card.querySelector('.btn-edit');
    const deleteButton = card.querySelector('.btn-delete');

    editButton.addEventListener('click', () => editBook(index));
    deleteButton.addEventListener('click', () => deleteBook(index));

    return card;
}

function renderBooks(list) {
    productsGrid.innerHTML = '';

    if (list.length === 0) {
        updateCounters();
        return;
    }

    list.forEach((libro, index) => {
        productsGrid.appendChild(createBookCard(libro, index));
    });

    updateCounters();
}

function resetForm() {
    formLibro.reset();
    document.getElementById('NombreLibro').focus();
}

function enterEditMode(index) {
    const libro = books[index];
    if (!libro) return;

    document.getElementById('NombreLibro').value = libro.titulo;
    document.getElementById('AutorLibro').value = libro.autor;
    document.getElementById('PrecioLibro').value = libro.precio;
    document.getElementById('AñoPublicacion').value = libro.añoPublicacion === 'N/A' ? '' : libro.añoPublicacion;
    document.getElementById('Portada').value = libro.portada === defaultCover ? '' : libro.portada;

    editingIndex = index;
    submitButton.textContent = 'Guardar cambios';
    panelTitle.textContent = 'Editar libro';
    mensajes.mensajeInfo(`✎ Editando "${libro.titulo}"`, 2500);
}

function exitEditMode() {
    editingIndex = null;
    submitButton.textContent = 'Guardar libro';
    panelTitle.textContent = 'Agregar Biblioteca';
}

function deleteBook(index) {
    books.splice(index, 1);
    if (editingIndex !== null) {
        if (editingIndex === index) {
            exitEditMode();
            resetForm();
        } else if (editingIndex > index) {
            editingIndex -= 1;
        }
    }
    renderBooks(books);
    mensajes.mensajeSuccess('✓ Libro eliminado correctamente', 2500);
}

function editBook(index) {
    enterEditMode(index);
}

if (!formLibro) {
    console.error('No se encontró el formulario: id="formLibro"');
} else {
    formLibro.addEventListener('submit', (event) => {
        event.preventDefault();

        const titulo = document.getElementById('NombreLibro').value.trim();
        const autor = document.getElementById('AutorLibro').value.trim();
        const precio = document.getElementById('PrecioLibro').value.trim();
        const añoPublicacion = document.getElementById('AñoPublicacion').value.trim();
        const portada = document.getElementById('Portada').value.trim();

        const libro = new LibroNew(
            titulo || 'Título pendiente',
            autor || 'Autor desconocido',
            precio || '0.00',
            añoPublicacion || 'N/A',
            portada || defaultCover
        );

        const wasEditing = editingIndex !== null;
        if (wasEditing) {
            books[editingIndex] = libro;
            exitEditMode();
        } else {
            books.push(libro);
        }

        resetForm();
        renderBooks(books);

        if (wasEditing) {
            mensajes.mensajeSuccess(`✓ Libro "${libro.titulo}" actualizado`, 2500);
        } else {
            mensajes.mensajeSuccess(`✓ Libro "${libro.titulo}" agregado correctamente`, 2500);
        }
    });
}

renderBooks(books);
