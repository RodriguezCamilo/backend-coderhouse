const form = document.getElementById("form")

form.addEventListener('submit', async (e) =>{
    e.preventDefault()
    const datForm = new FormData(e.target)
    const newUser = Object.fromEntries(datForm)
    try {
        await fetch('/api/sessions/register', {
            method: 'POST',
            redirect: 'follow',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser)
        })
        .then(response =>{
            if (response.ok)window.location.href = response.url
        })
        .catch(error=>{
            throw(error)
        })

    } catch (error) {
        console.error(error);
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Hubo un error al intentar iniciar sesión'
        })
    }
})

