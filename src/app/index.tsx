import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type Registro = {
  id: string;
  numero: number;
  hora: string;
};

export default function App() {
  const [contador, setContador] = useState(0);
  const [registros, setRegistros] = useState<Registro[]>([]);

  const incrementarContador = () => {
    const nuevoContador = contador + 1;
    const ahora = new Date();
    const horaFormateada = ahora.toLocaleTimeString();

    // Actualizamos el contador
    setContador(nuevoContador);

    // Creamos el nuevo registro y lo anteponemos (equivalente a insertBefore)
    const nuevoRegistro = {
      id: Date.now().toString(),
      numero: nuevoContador,
      hora: horaFormateada,
    };

    setRegistros([nuevoRegistro, ...registros]);
  };

    // Reto 1: reiniciar todo a cero
  const reiniciar = () => {
    setContador(0);
    setRegistros([]);
  };

  return (
    <View style={estilos.body}>
      <View style={estilos.container}>
        {/* Título y descripción */}
        <Text style={estilos.h1}>Interactividad con el DOM</Text>
        <Text style={estilos.description}>
          Haz clic en el botón para incrementar el contador y registrar la hora
          exacta del evento en la tabla.
        </Text>

        {/* Contador dinámico */}
        <Text style={estilos.counterBox}>{contador}</Text>

        {/* Botón disparador de eventos */}
                <View style={estilos.filaBotones}>
          <TouchableOpacity
            style={estilos.btnClick}
            onPress={incrementarContador}
          >
            <Text style={estilos.btnText}>¡Haz Clic Aquí!</Text>
          </TouchableOpacity>

          <TouchableOpacity style={estilos.btnReset} onPress={reiniciar}>
            <Text style={estilos.btnText}>Reiniciar</Text>
          </TouchableOpacity>
        </View>

        {/* Tabla de registros */}
        <View style={estilos.tableContainer}>
          {/* Cabecera de la tabla */}
          <View style={estilos.tableHeader}>
            <Text style={[estilos.th, estilos.cellNumero]}>Nº Clic</Text>
            <Text style={[estilos.th, estilos.cellHora]}>Hora</Text>
          </View>

          {/* Cuerpo de la tabla con scroll */}
          <ScrollView style={estilos.tableBody}>
            {registros.map((item, index) => (
              <View
                key={item.id}
                style={[estilos.tr, index % 2 === 0 ? estilos.trEven : null]}
              >
                <Text style={[estilos.td, estilos.cellNumero]}>
                  {item.numero}
                </Text>
                <Text style={[estilos.td, estilos.cellHora]}>{item.hora}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

const estilos = StyleSheet.create({
  body: {
    flex: 1,
    backgroundColor: "#f4f7f6",
    justifyContent: "center",
    padding: 16,
  },
  container: {
    backgroundColor: "#ffffff",
    borderRadius: 14,
    padding: 24,
    alignItems: "center",
    // Sombra iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    // Sombra Android
    elevation: 6,
  },
  h1: {
    fontSize: 24,
    fontWeight: "700",
    color: "#2c3e50",
    marginBottom: 8,
    textAlign: "center",
  },
  description: {
    fontSize: 14,
    color: "#555555",
    textAlign: "center",
    marginBottom: 16,
  },
  counterBox: {
    fontSize: 64,
    fontWeight: "700",
    color: "#3498db",
    marginBottom: 12,
  },
  btnClick: {
    backgroundColor: "#2ecc71",
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 8,
    elevation: 4,
    shadowColor: "#2ecc71",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
  },
  btnText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "600",
  },
    containerAlto: {
    backgroundColor: "#fff4e5",
  },
  counterAlto: {
    color: "#e67e22",
  },
  tableContainer: {
    alignSelf: "stretch",
    marginTop: 24,
    borderWidth: 1,
    borderColor: "#e1e4e8",
    borderRadius: 6,
    overflow: "hidden",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#f6f8fa",
    borderBottomWidth: 1,
    borderBottomColor: "#e1e4e8",
  },
  th: {
    paddingVertical: 10,
    fontWeight: "600",
    color: "#6b7280",
    textAlign: "center",
  },
  tableBody: {
    maxHeight: 240,
  },
  tr: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#e1e4e8",
  },
  trEven: {
    backgroundColor: "#fafbfc",
  },
  td: {
    paddingVertical: 10,
    color: "#2c3e50",
    textAlign: "center",
  },
  cellNumero: {
    flex: 1,
  },
  cellHora: {
    flex: 2,
  },

    filaBotones: {
    flexDirection: "row",
    gap: 12,
  },
  btnReset: {
    backgroundColor: "#e74c3c",
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 8,
    elevation: 4,
    shadowColor: "#e74c3c",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
  }
});
