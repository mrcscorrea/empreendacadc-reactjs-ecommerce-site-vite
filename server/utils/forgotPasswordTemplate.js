const forgotPasswordTemplate = ({ name, otp })=>{
    return `
<div>
    <p>Olá, ${name}</p>
    <p>Notamos que você esqueceu sua senha e solicitou o código de verificação.</p>
    <div style="background:yellow; font-size:20px;padding:20px;text-align:center;font-weight : 800;">
        ${otp}
    </div>
    <p>Esse é seu código de alteração de senha, ele possui validade de 1 hora, utilize ele no site.</p>
    <br/>
    </br>
    <p>Atenciosamente,</p>
    <p>Equipe de Desenvolvimento.</p>
</div>
    `
}

export default forgotPasswordTemplate