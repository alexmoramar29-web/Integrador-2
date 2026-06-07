import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

export interface DatosRegistro {
  username: string;
  full_name: string;
  email: string;
  password_hash: string;
}

export const enviarRegistroBD = async (datos: DatosRegistro) => {
  try {
    // PASO 1: Guardar en la Bóveda Segura de Supabase (Authentication)
    // Aquí la contraseña real se encripta y se oculta para siempre
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: datos.email,
      password: datos.password_hash,
    });

    if (authError) throw authError;

    // PASO 2: Guardar su perfil en tu tabla para usarlo en la app
    // OJO: Ya NO mandamos la contraseña real aquí
    const { error: dbError } = await supabase
      .from('users')
      .insert([
        { 
          username: datos.username, 
          full_name: datos.full_name, 
          email: datos.email, 
          password_hash: '🔒 ENCRIPTADO Y PROTEGIDO' // Texto de censura
        }
      ]);

    if (dbError) throw dbError;

    return { 
      exito: true, 
      mensaje: '¡Usuario registrado de forma 100% segura! 🚀', 
    };

  } catch (error: any) {
    console.error("🚨 Error en el registro:", error);
    return { exito: false, mensaje: error.message || "Error al conectar" };
  }
};