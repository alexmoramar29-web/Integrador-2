import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseKey);

export interface DatosRegistro {
  username: string;
  full_name: string;
  email: string;
  password_hash: string;
}

export const enviarRegistroBD = async (datos: DatosRegistro) => {
  try {
    const { data, error: dbError } = await supabase
      .from('users')
      .insert([
        { 
          username: datos.username, 
          full_name: datos.full_name, 
          email: datos.email, 
          password_hash: datos.password_hash 
        }
      ])
      .select();

    if (dbError) throw dbError;

    return { 
      exito: true, 
      mensaje: '¡Usuario registrado con éxito en la base de datos! 🚀', 
    };

  } catch (error: any) {
    console.error("🚨 Error en el registro:", error);
    return { exito: false, mensaje: error.message || "Error al conectar" };
  }
};

export const loginUsuario = async (correo: string, contrasena: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: correo,
      password: contrasena,
    });

    if (error) throw error;

    return {
      exito: true,
      usuario: data.user,
      sesion: data.session
    };
  } catch (error: any) {
    console.error("🚨 Error en el login:", error);
    return { exito: false, mensaje: error.message || "Error al iniciar sesión" };
  }
};