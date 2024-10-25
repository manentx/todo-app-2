import Header from "../components/sections/Header";
import Label from "../components/custom/Label";
import Input from "../components/custom/Input";
import { useState } from "react";
import Button from "../components/custom/Button";

function ContactUs() {
  const [message, setMessage] = useState<string>("");
  const [messageSent, setMessageSent] = useState<boolean>(false);
  /*const messageSpedito = () => {
    <div className="text-cyan-600">Messaggio Spedito!</div>
  }*/

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
