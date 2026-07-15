import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/contact-schema";
export async function POST(request:Request){
 try{
  const body:unknown=await request.json();
  const parsed=contactSchema.safeParse(body);
  if(!parsed.success)return NextResponse.json({message:"Revisa los campos marcados e inténtalo de nuevo."},{status:400});
  if(parsed.data.website)return NextResponse.json({message:"Solicitud recibida."});
  const webhook=process.env.CONTACT_WEBHOOK_URL;
  if(!webhook)return NextResponse.json({message:"El formulario aún no está conectado. Usa el correo o WhatsApp configurado."},{status:503});
  const response=await fetch(webhook,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({...parsed.data,website:undefined,source:"vexoralabs.shop",receivedAt:new Date().toISOString()})});
  if(!response.ok)return NextResponse.json({message:"El servicio de contacto no respondió. Inténtalo más tarde."},{status:502});
  return NextResponse.json({message:"Recibimos tu proyecto. Vexora se pondrá en contacto contigo."});
 }catch{return NextResponse.json({message:"No pudimos procesar la solicitud."},{status:500});}
}
