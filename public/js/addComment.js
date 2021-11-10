document.querySelector("#add-comment").addEventListener("submit",evt=>{
    evt.preventDefault();
    const fetchObj = {
        blog:document.querySelector("#blog-id").value,
        comment:document.querySelector("#comment").value,
    }
    console.log(fetchObj);
    fetch("/api/comment",{
        method:"POST",
        body:JSON.stringify(fetchObj),
        headers:{
            "Content-Type":"application/json"
        }
    }).then(res=>{
        if(res.ok){
           location.href="/"
        } else {
            alert("trumpet sound")
        }
    })
})