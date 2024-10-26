import Header from "../components/sections/Header";
import Label from "../components/custom/Label";
import Input from "../components/custom/Input";
import { useState } from "react";
import Button from "../components/custom/Button";

/* Possibile implementazione: utilizzare SendGrid per inviare effettivamente una mail
  https://www.twilio.com/docs/sendgrid

  Ad esempio si potrebbe trasformare il form nel tipico form di inserimento contatti (mail, nome e cognome) e far si che, quando
  il pulsante 'Fissa una call' viene premuto, il sistema invii in automatico una mail all'amministratore (quindi la tua mail) che notifichi il fatto che 
  è avvenuta una nuova richiesta di call. 

  Cioè l'utente compila il form (per fissare un incontro) e tu ricevi una mail (inviata programmaticamente)
  del tipo: 'Un nuovo utente ha richiesto di fissare una call. L'utente si chiama Mario Rossi e ha mail mariorossi@gmail.com

  Inoltre, tramite un selettore, si può anche indicare la tipologia di richiesta che l'utente vuole effettuare. Ad esempio 'Richiesta informazioni', 'Problema tecnico', 
  'Appuntamento conoscitivo'. 
*/
function ContactUs() {
  const [message, setMessage] = useState<string>("");
  const [messageSent, setMessageSent] = useState<boolean>(false);
  
  /*const messageSpedito = () => {
    <div className="text-cyan-600">Messaggio Spedito!</div>
  }*/
    // Feedback: di solito le funzioni che gestiscono degli eventi iniziano con 'on...'. Potresti trasformarla in un 'onSendMessageClick' o simili
    const messaggeSentToMe = () => {
      setMessageSent(true);
    }
  return (

    //aggiungere un input di inserimento di email e controllare che il formato della mail sia correta
    <div className="grid grid-rows-12 h-screen">
      <Header title="Contact us" />
      <div>
        <form onSubmit={event => event.preventDefault()} className="flex flex-col shadow-[0_12px_20px_rgba(100,100,100,_0.3)] space-y-8 p-6 border-2 rounded-xl w-full" action="text">
         <Label className="text-2xl text-center " title="Scrivici un email...!"/>
         <Input type="text" className="" value={message} setValue={setMessage} placeholder="Inserisci il tuo messaggio qui..."/>
         <Button disabled={message.trim().length >= 4 ? false : true} title="Invia" onClick={messaggeSentToMe}></Button>
         {
             // FEEDBACK: Il controllo può essere effettuato togliendo il triplo-uguale
             // FEEDBACK: Il div che visualizza il messaggio può essere raccolto in un componente a parte, rendendo il codice più leggibile. 
             // Il componente potrebbe chiamarsi MessageSentBox
             // Ovviamente la condizione dovrebbe cambiare, mostrando il componente solo se messageSent è true
            (messageSent === true) ? 
            <div className="text-green-500">Messaggio spedito!</div> : 
            null
          }
        </form>
      </div>
    </div>
   
  );
}

export default ContactUs;
