const verifyEmailTemplate = ({name,url})=>{
    return`
<p>Olá, ${name}!</p>    
<p>Obrigado por colaborar em nossa feira cultural e realizar o registro do site!</p>   
<a href=${url} style="color:black;background :orange;margin-top : 10px,padding:20px,display:block">
    Verificar E-mail
</a>
`
}

export default verifyEmailTemplate