import Reveal from './Reveal'
import './styles/Contact.css'


function Contact() {

    return (
        <div className="contact">

            <div className="grad"></div>

            <Reveal>
                <h1>Contact<span>.</span></h1>
            </Reveal>

            <Reveal>
                <p>Send me an email if you want to connect! You can also find me on <a href="https://www.instagram.com/adityaaaooo" target="_blank"><span>Instagram</span></a> or <a href="https://www.linkedin.com/in/aditya-nambidi/" target="_blank"><span>Linkedin</span></a></p>
            </Reveal>

            <Reveal>
                <div className='email'>
                    <span class="material-symbols-outlined">
                        mail
                    </span>
                    <p><a href={"mailto:adityanambidi344@gmail.com?subject=" + "i am such a big fan of yours"} target="_blank">adityanambidi344@gmail.com</a></p>
                </div>
            </Reveal>

        </div>
    )

}


export default Contact;