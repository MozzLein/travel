const registPassword = document.querySelector('#registerPassword')
const registPasswordConfirm = document.querySelector('#registerPasswordConfirm')

registPasswordConfirm.addEventListener('keyup', () => {
    if(registPassword.value !== registPasswordConfirm.value){
        registPasswordConfirm.classList.add('bg-danger')
    }else{
        registPasswordConfirm.classList.remove('border-danger')
    }
})