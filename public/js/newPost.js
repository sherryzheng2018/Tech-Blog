document.querySelector("form#signup").addEventListener("submit",(e)=>{
    e.preventDefault();
    const fetchObj = {
        password: document.querySelector("#signup-password").value,
        username: document.querySelector("#signup-username").value,
    }
    fetch("/api/users",{
        method:"POST",
        body:JSON.stringify(fetchObj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(!res.ok){
            return alert("trumpet sound")
        } else {
            res.json().then(data=>{
                location.href = `/dashboard/${data.id}`
            })
        }
    })
})