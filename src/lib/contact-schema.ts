import { z } from "zod";
export const contactSchema=z.object({
 name:z.string().min(2,"Escribe tu nombre."),
 brand:z.string().min(2,"Indica el proyecto o marca."),
 contact:z.string().min(4,"Escribe un correo o medio de contacto."),
 type:z.string().min(1,"Selecciona un tipo de proyecto."),
 budget:z.string().min(1,"Selecciona un presupuesto."),
 description:z.string().min(20,"Cuéntanos un poco más (mínimo 20 caracteres).").max(2000),
 idealDate:z.string().optional(),
 website:z.string().max(0).optional(),
});
export type ContactInput=z.infer<typeof contactSchema>;
