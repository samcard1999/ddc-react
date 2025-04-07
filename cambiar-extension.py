import os

def cambiar_extensiones_a_jpeg():
    # Obtener la ruta actual
    ruta_actual = os.getcwd()
    
    # Recorrer todos los archivos en la ruta actual
    for nombre_archivo in os.listdir(ruta_actual):
        # Construir la ruta completa del archivo
        ruta_completa = os.path.join(ruta_actual, nombre_archivo)
        
        # Verificar si es un archivo (no directorio)
        if os.path.isfile(ruta_completa):
            # Separar nombre y extensión
            nombre_base, extension = os.path.splitext(nombre_archivo)
            
            # Construir el nuevo nombre con extensión .jpeg
            nuevo_nombre = nombre_base + ".jpeg"
            nueva_ruta = os.path.join(ruta_actual, nuevo_nombre)
            
            # Renombrar el archivo
            try:
                os.rename(ruta_completa, nueva_ruta)
                print(f"Renombrado: {nombre_archivo} -> {nuevo_nombre}")
            except Exception as e:
                print(f"Error al renombrar {nombre_archivo}: {str(e)}")

if __name__ == "__main__":
    print("ADVERTENCIA: Este script cambiará todas las extensiones de archivo en el directorio actual a .jpeg")
    confirmacion = input("¿Desea continuar? (s/n): ").lower()
    
    if confirmacion == 's':
        cambiar_extensiones_a_jpeg()
        print("Proceso completado.")
    else:
        print("Operación cancelada.")